import { supabase } from '../lib/supabase/client'

export interface TestExecutionData {
  executionId: string
  testCaseId: string
  testCaseName: string
  category: string
  subcategory: string
  status: 'running' | 'completed' | 'failed'
  startedAt: Date
  logs: LogMessage[]
  protocolStats: ProtocolStats[]
  systemMetrics: SystemMetrics[]
}

export interface LogMessage {
  id: string
  timestamp: Date
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'
  component: 'PHY' | 'MAC' | 'RLC' | 'PDCP' | 'RRC' | 'NAS' | 'IMS'
  message: string
  rawData?: any
  parsedData?: any
}

export interface ProtocolStats {
  layer: string
  metricName: string
  metricValue: number
  unit: string
  timestamp: Date
}

export interface SystemMetrics {
  metricType: 'cpu' | 'memory' | 'network' | 'throughput' | 'latency'
  metricName: string
  metricValue: number
  unit: string
  timestamp: Date
}

export class TestExecutionDataFlow {
  private static instance: TestExecutionDataFlow
  private activeExecutions: Map<string, TestExecutionData> = new Map()
  private subscribers: Map<string, (data: TestExecutionData) => void> = new Map()

  static getInstance(): TestExecutionDataFlow {
    if (!TestExecutionDataFlow.instance) {
      TestExecutionDataFlow.instance = new TestExecutionDataFlow()
    }
    return TestExecutionDataFlow.instance
  }

  // Start test execution and begin data flow
  async startTestExecution(testCaseId: string, userId: string): Promise<string> {
    try {
      // Create test execution record
      const { data: execution, error } = await supabase
        .from('test_executions')
        .insert({
          test_case_id: testCaseId,
          user_id: userId,
          status: 'running',
          started_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      // Get test case details
      const { data: testCase, error: testCaseError } = await supabase
        .from('test_cases')
        .select('*')
        .eq('id', testCaseId)
        .single()

      if (testCaseError) throw testCaseError

      // Initialize execution data
      const executionData: TestExecutionData = {
        executionId: execution.id,
        testCaseId: testCaseId,
        testCaseName: testCase.name,
        category: testCase.category,
        subcategory: testCase.subcategory,
        status: 'running',
        startedAt: new Date(),
        logs: [],
        protocolStats: [],
        systemMetrics: []
      }

      // Store active execution
      this.activeExecutions.set(execution.id, executionData)

      // Start data generation based on test case category
      this.startDataGeneration(execution.id, testCase)

      return execution.id
    } catch (error) {
      console.error('Error starting test execution:', error)
      throw error
    }
  }

  // Start data generation for the test case
  private async startDataGeneration(executionId: string, testCase: any) {
    const executionData = this.activeExecutions.get(executionId)
    if (!executionData) return

    // Generate data based on test case category and subcategory
    const dataGenerator = new TestCaseDataGenerator(testCase)
    
    // Start generating logs, stats, and metrics
    dataGenerator.startGeneration((data) => {
      this.updateExecutionData(executionId, data)
    })

    // Simulate test completion after expected duration
    setTimeout(() => {
      this.completeTestExecution(executionId)
    }, testCase.expected_duration * 1000)
  }

  // Update execution data with new information
  private async updateExecutionData(executionId: string, newData: Partial<TestExecutionData>) {
    const executionData = this.activeExecutions.get(executionId)
    if (!executionData) return

    // Update local data
    Object.assign(executionData, newData)

    // Store in Supabase
    if (newData.logs) {
      await this.storeLogMessages(executionId, newData.logs)
    }
    if (newData.protocolStats) {
      await this.storeProtocolStats(executionId, newData.protocolStats)
    }
    if (newData.systemMetrics) {
      await this.storeSystemMetrics(executionId, newData.systemMetrics)
    }

    // Notify subscribers
    this.notifySubscribers(executionId, executionData)
  }

  // Store log messages in Supabase
  private async storeLogMessages(executionId: string, logs: LogMessage[]) {
    const logRecords = logs.map(log => ({
      execution_id: executionId,
      timestamp: log.timestamp.toISOString(),
      level: log.level,
      component: log.component,
      message: log.message,
      raw_data: log.rawData,
      parsed_data: log.parsedData
    }))

    await supabase
      .from('log_messages')
      .insert(logRecords)
  }

  // Store protocol stats in Supabase
  private async storeProtocolStats(executionId: string, stats: ProtocolStats[]) {
    const statRecords = stats.map(stat => ({
      execution_id: executionId,
      layer: stat.layer,
      metric_name: stat.metricName,
      metric_value: stat.metricValue,
      unit: stat.unit,
      timestamp: stat.timestamp.toISOString()
    }))

    await supabase
      .from('protocol_stats')
      .insert(statRecords)
  }

  // Store system metrics in Supabase
  private async storeSystemMetrics(executionId: string, metrics: SystemMetrics[]) {
    const metricRecords = metrics.map(metric => ({
      execution_id: executionId,
      metric_type: metric.metricType,
      metric_name: metric.metricName,
      metric_value: metric.metricValue,
      unit: metric.unit,
      timestamp: metric.timestamp.toISOString()
    }))

    await supabase
      .from('system_metrics')
      .insert(metricRecords)
  }

  // Complete test execution
  private async completeTestExecution(executionId: string) {
    const executionData = this.activeExecutions.get(executionId)
    if (!executionData) return

    // Update status
    executionData.status = 'completed'
    
    // Update in Supabase
    await supabase
      .from('test_executions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        duration: Math.floor((Date.now() - executionData.startedAt.getTime()) / 1000)
      })
      .eq('id', executionId)

    // Notify subscribers
    this.notifySubscribers(executionId, executionData)

    // Remove from active executions
    this.activeExecutions.delete(executionId)
  }

  // Subscribe to execution data updates
  subscribe(executionId: string, callback: (data: TestExecutionData) => void): () => void {
    this.subscribers.set(executionId, callback)
    
    // Return unsubscribe function
    return () => {
      this.subscribers.delete(executionId)
    }
  }

  // Notify subscribers of data updates
  private notifySubscribers(executionId: string, data: TestExecutionData) {
    const callback = this.subscribers.get(executionId)
    if (callback) {
      callback(data)
    }
  }

  // Get execution data
  getExecutionData(executionId: string): TestExecutionData | undefined {
    return this.activeExecutions.get(executionId)
  }

  // Get all active executions
  getActiveExecutions(): TestExecutionData[] {
    return Array.from(this.activeExecutions.values())
  }
}

// Test Case Data Generator
class TestCaseDataGenerator {
  private testCase: any
  private isGenerating: boolean = false
  private dataCallback: ((data: Partial<TestExecutionData>) => void) | null = null

  constructor(testCase: any) {
    this.testCase = testCase
  }

  startGeneration(callback: (data: Partial<TestExecutionData>) => void) {
    this.dataCallback = callback
    this.isGenerating = true
    
    // Start generating data based on test case type
    this.generateData()
  }

  private async generateData() {
    if (!this.isGenerating || !this.dataCallback) return

    // Generate logs based on test case category
    const logs = this.generateLogs()
    if (logs.length > 0) {
      this.dataCallback({ logs })
    }

    // Generate protocol stats
    const protocolStats = this.generateProtocolStats()
    if (protocolStats.length > 0) {
      this.dataCallback({ protocolStats })
    }

    // Generate system metrics
    const systemMetrics = this.generateSystemMetrics()
    if (systemMetrics.length > 0) {
      this.dataCallback({ systemMetrics })
    }

    // Continue generating data
    setTimeout(() => this.generateData(), 1000 + Math.random() * 2000)
  }

  private generateLogs(): LogMessage[] {
    const logs: LogMessage[] = []
    const now = new Date()
    
    // Generate logs based on test case category
    switch (this.testCase.category) {
      case 'phy':
        logs.push(...this.generatePHYLogs(now))
        break
      case 'mac':
        logs.push(...this.generateMACLogs(now))
        break
      case 'rlc':
        logs.push(...this.generateRLCLogs(now))
        break
      case 'pdcp':
        logs.push(...this.generatePDCPLogs(now))
        break
      case 'rrc':
        logs.push(...this.generateRRCLogs(now))
        break
      case 'nas':
        logs.push(...this.generateNASLogs(now))
        break
      case 'ims':
        logs.push(...this.generateIMSLogs(now))
        break
    }

    return logs
  }

  private generatePHYLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'PDSCH: rnti=0x4601 h_id=0 k1=4 prb=[0,87) symb=[1,14) mod=QPSK rv=0 tbs=309 t=135.5us',
      'PUSCH: rnti=0x4601 h_id=0 k2=4 prb=[0,87) symb=[1,14) mod=QPSK rv=0 tbs=309 t=135.5us',
      'PDCCH: rnti=0x4601 cce=0 al=1 tbs=309 t=135.5us',
      'PUCCH: rnti=0x4601 format=1 prb=0 symb=[1,14) t=135.5us'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'PHY',
        message,
        rawData: { rnti: '0x4601', timestamp: timestamp.toISOString() },
        parsedData: this.parsePHYMessage(message)
      })
    })

    return logs
  }

  private generateMACLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'DL PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55',
      'UL PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55',
      'MAC PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'MAC',
        message,
        rawData: { ue: 0, rnti: '0x4601', size: 169 },
        parsedData: this.parseMACMessage(message)
      })
    })

    return logs
  }

  private generateRLCLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'du=0 ue=0 SRB1 DL: TX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55',
      'du=0 ue=0 SRB1 UL: RX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55',
      'du=0 ue=0 DRB1 DL: TX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'RLC',
        message,
        rawData: { du: 0, ue: 0, bearer: 'SRB1' },
        parsedData: this.parseRLCMessage(message)
      })
    })

    return logs
  }

  private generatePDCPLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'PDCP TX: ue=0 drb=1 sn=0 pdu_len=53',
      'PDCP RX: ue=0 drb=1 sn=0 pdu_len=53',
      'PDCP Status: ue=0 drb=1 status=active'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'PDCP',
        message,
        rawData: { ue: 0, drb: 1, sn: 0 },
        parsedData: this.parsePDCPMessage(message)
      })
    })

    return logs
  }

  private generateRRCLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'RRC Connection Setup: ue=0 rnti=0x4601',
      'RRC Connection Reconfiguration: ue=0 rnti=0x4601',
      'RRC Connection Release: ue=0 rnti=0x4601'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'RRC',
        message,
        rawData: { ue: 0, rnti: '0x4601' },
        parsedData: this.parseRRCMessage(message)
      })
    })

    return logs
  }

  private generateNASLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'NAS Attach Request: imsi=123456789012345',
      'NAS Attach Accept: imsi=123456789012345',
      'NAS Service Request: imsi=123456789012345'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'NAS',
        message,
        rawData: { imsi: '123456789012345' },
        parsedData: this.parseNASMessage(message)
      })
    })

    return logs
  }

  private generateIMSLogs(timestamp: Date): LogMessage[] {
    const logs: LogMessage[] = []
    const messages = [
      'SIP INVITE: from=user1@domain.com to=user2@domain.com',
      'SIP 200 OK: from=user2@domain.com to=user1@domain.com',
      'SIP BYE: from=user1@domain.com to=user2@domain.com'
    ]

    messages.forEach(message => {
      logs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(timestamp.getTime() + Math.random() * 1000),
        level: 'INFO',
        component: 'IMS',
        message,
        rawData: { from: 'user1@domain.com', to: 'user2@domain.com' },
        parsedData: this.parseIMSMessage(message)
      })
    })

    return logs
  }

  private generateProtocolStats(): ProtocolStats[] {
    const stats: ProtocolStats[] = []
    const now = new Date()

    // Generate stats based on test case category
    switch (this.testCase.category) {
      case 'phy':
        stats.push({
          layer: 'phy',
          metricName: 'Throughput',
          metricValue: 50 + Math.random() * 50,
          unit: 'Mbps',
          timestamp: now
        })
        break
      case 'mac':
        stats.push({
          layer: 'mac',
          metricName: 'Packet Loss Rate',
          metricValue: Math.random() * 5,
          unit: '%',
          timestamp: now
        })
        break
      // Add more cases as needed
    }

    return stats
  }

  private generateSystemMetrics(): SystemMetrics[] {
    const metrics: SystemMetrics[] = []
    const now = new Date()

    metrics.push(
      {
        metricType: 'cpu',
        metricName: 'CPU Usage',
        metricValue: 20 + Math.random() * 60,
        unit: '%',
        timestamp: now
      },
      {
        metricType: 'memory',
        metricName: 'Memory Usage',
        metricValue: 30 + Math.random() * 40,
        unit: '%',
        timestamp: now
      },
      {
        metricType: 'network',
        metricName: 'Network Throughput',
        metricValue: 100 + Math.random() * 200,
        unit: 'Mbps',
        timestamp: now
      }
    )

    return metrics
  }

  // Message parsing methods
  private parsePHYMessage(message: string): any {
    // Parse PHY message and extract relevant data
    return { parsed: true, message }
  }

  private parseMACMessage(message: string): any {
    // Parse MAC message and extract relevant data
    return { parsed: true, message }
  }

  private parseRLCMessage(message: string): any {
    // Parse RLC message and extract relevant data
    return { parsed: true, message }
  }

  private parsePDCPMessage(message: string): any {
    // Parse PDCP message and extract relevant data
    return { parsed: true, message }
  }

  private parseRRCMessage(message: string): any {
    // Parse RRC message and extract relevant data
    return { parsed: true, message }
  }

  private parseNASMessage(message: string): any {
    // Parse NAS message and extract relevant data
    return { parsed: true, message }
  }

  private parseIMSMessage(message: string): any {
    // Parse IMS message and extract relevant data
    return { parsed: true, message }
  }
}

export default TestExecutionDataFlow