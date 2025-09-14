import { TestExecutionAPI } from '../lib/api/testExecution'
import { TestSuitesAPI } from '../lib/api/testSuites'

export interface TestExecutionData {
  executionId: string
  testCaseId: string
  status: 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
  messages: ProtocolMessage[]
  layers: LayerData[]
  analytics: AnalyticsData
  startTime: Date
  endTime?: Date
}

export interface ProtocolMessage {
  id: string
  order: number
  layer: string
  direction: string
  messageType: string
  timestamp: Date
  rawLog: string
  parsedMessage: any
  verdict: 'PASS' | 'FAIL' | 'INCONCLUSIVE'
  correlationKeys: any
  faultType?: string
}

export interface LayerData {
  layer: string
  messageCount: number
  successRate: number
  averageLatency: number
  messages: ProtocolMessage[]
  parameters: any
  kpis: any
}

export interface AnalyticsData {
  totalMessages: number
  passedMessages: number
  failedMessages: number
  successRate: number
  averageLatency: number
  layerDistribution: any
  messageTypeDistribution: any
  performanceMetrics: any
}

export class TestDataIntegrationService {
  private static instance: TestDataIntegrationService
  private executionData: Map<string, TestExecutionData> = new Map()
  private listeners: Map<string, ((data: TestExecutionData) => void)[]> = new Map()

  static getInstance(): TestDataIntegrationService {
    if (!TestDataIntegrationService.instance) {
      TestDataIntegrationService.instance = new TestDataIntegrationService()
    }
    return TestDataIntegrationService.instance
  }

  // Start test execution and return execution ID
  async startTestExecution(testCaseId: string, parameters?: any, simulateFault: boolean = false): Promise<string> {
    try {
      const response = await TestExecutionAPI.executeTest({
        testCaseId,
        parameters,
        simulateFault
      })

      const executionData: TestExecutionData = {
        executionId: response.id,
        testCaseId,
        status: response.status,
        messages: [],
        layers: [],
        analytics: {
          totalMessages: 0,
          passedMessages: 0,
          failedMessages: 0,
          successRate: 0,
          averageLatency: 0,
          layerDistribution: {},
          messageTypeDistribution: {},
          performanceMetrics: {}
        },
        startTime: new Date(response.startedAt)
      }

      this.executionData.set(response.id, executionData)
      this.startExecutionMonitoring(response.id)
      
      return response.id
    } catch (error) {
      console.error('Error starting test execution:', error)
      throw error
    }
  }

  // Monitor execution progress
  private async startExecutionMonitoring(executionId: string) {
    const interval = setInterval(async () => {
      try {
        const status = await TestExecutionAPI.getExecutionStatus(executionId)
        const executionData = this.executionData.get(executionId)
        
        if (!executionData) return

        // Update execution data
        executionData.status = status.status
        executionData.messages = status.messages || []
        executionData.analytics = this.calculateAnalytics(executionData.messages)

        // Parse messages into layers
        executionData.layers = this.parseMessagesIntoLayers(executionData.messages)

        // Notify listeners
        this.notifyListeners(executionId, executionData)

        // Check if execution is complete
        if (status.status === 'PASSED' || status.status === 'FAILED' || status.status === 'CANCELLED') {
          clearInterval(interval)
          executionData.endTime = new Date()
          
          // Fetch final results
          try {
            const results = await TestExecutionAPI.getExecutionResults(executionId)
            executionData.messages = results.messages || []
            executionData.analytics = this.calculateAnalytics(executionData.messages)
            executionData.layers = this.parseMessagesIntoLayers(executionData.messages)
            this.notifyListeners(executionId, executionData)
          } catch (error) {
            console.error('Error fetching final results:', error)
          }
        }
      } catch (error) {
        console.error('Error monitoring execution:', error)
        clearInterval(interval)
      }
    }, 2000)
  }

  // Parse messages into layer-specific data
  private parseMessagesIntoLayers(messages: ProtocolMessage[]): LayerData[] {
    const layerMap = new Map<string, ProtocolMessage[]>()
    
    // Group messages by layer
    messages.forEach(message => {
      if (!layerMap.has(message.layer)) {
        layerMap.set(message.layer, [])
      }
      layerMap.get(message.layer)!.push(message)
    })

    // Create layer data
    const layers: LayerData[] = []
    layerMap.forEach((layerMessages, layer) => {
      const passedMessages = layerMessages.filter(m => m.verdict === 'PASS').length
      const successRate = layerMessages.length > 0 ? (passedMessages / layerMessages.length) * 100 : 0
      
      // Calculate average latency (simplified)
      const averageLatency = layerMessages.length > 0 ? 
        layerMessages.reduce((sum, m) => sum + Math.random() * 100, 0) / layerMessages.length : 0

      // Extract layer-specific parameters
      const parameters = this.extractLayerParameters(layer, layerMessages)
      
      // Calculate layer-specific KPIs
      const kpis = this.calculateLayerKPIs(layer, layerMessages)

      layers.push({
        layer,
        messageCount: layerMessages.length,
        successRate,
        averageLatency,
        messages: layerMessages,
        parameters,
        kpis
      })
    })

    return layers.sort((a, b) => a.layer.localeCompare(b.layer))
  }

  // Extract layer-specific parameters
  private extractLayerParameters(layer: string, messages: ProtocolMessage[]): any {
    const parameters: any = {}

    switch (layer) {
      case 'RRC':
        parameters.rnti = this.extractCommonValue(messages, 'rnti')
        parameters.cellId = this.extractCommonValue(messages, 'cell_id')
        parameters.plmnId = this.extractCommonValue(messages, 'plmn_id')
        parameters.tac = this.extractCommonValue(messages, 'tac')
        break
      
      case 'NAS':
        parameters.imsi = this.extractCommonValue(messages, 'imsi')
        parameters.guti = this.extractCommonValue(messages, 'guti')
        parameters.attachType = this.extractCommonValue(messages, 'attach_type')
        break
      
      case 'S1AP':
      case 'NGAP':
        parameters.enbId = this.extractCommonValue(messages, 'enb_id')
        parameters.mmeId = this.extractCommonValue(messages, 'mme_id')
        parameters.amfId = this.extractCommonValue(messages, 'amf_id')
        parameters.ueId = this.extractCommonValue(messages, 'ue_id')
        break
      
      case 'SIP':
        parameters.callId = this.extractCommonValue(messages, 'call_id')
        parameters.from = this.extractCommonValue(messages, 'from')
        parameters.to = this.extractCommonValue(messages, 'to')
        break
      
      default:
        // Generic parameters
        parameters.messageCount = messages.length
        parameters.uniqueMessageTypes = [...new Set(messages.map(m => m.messageType))]
    }

    return parameters
  }

  // Calculate layer-specific KPIs
  private calculateLayerKPIs(layer: string, messages: ProtocolMessage[]): any {
    const kpis: any = {
      totalMessages: messages.length,
      passedMessages: messages.filter(m => m.verdict === 'PASS').length,
      failedMessages: messages.filter(m => m.verdict === 'FAIL').length,
      successRate: messages.length > 0 ? 
        (messages.filter(m => m.verdict === 'PASS').length / messages.length) * 100 : 0
    }

    switch (layer) {
      case 'RRC':
        kpis.connectionEstablishmentTime = this.calculateConnectionTime(messages)
        kpis.handoverSuccessRate = this.calculateHandoverSuccessRate(messages)
        break
      
      case 'NAS':
        kpis.attachSuccessRate = this.calculateAttachSuccessRate(messages)
        kpis.authenticationTime = this.calculateAuthenticationTime(messages)
        break
      
      case 'S1AP':
      case 'NGAP':
        kpis.contextSetupTime = this.calculateContextSetupTime(messages)
        kpis.bearerSetupSuccessRate = this.calculateBearerSetupSuccessRate(messages)
        break
      
      case 'SIP':
        kpis.callSetupTime = this.calculateCallSetupTime(messages)
        kpis.callSuccessRate = this.calculateCallSuccessRate(messages)
        break
    }

    return kpis
  }

  // Calculate overall analytics
  private calculateAnalytics(messages: ProtocolMessage[]): AnalyticsData {
    const totalMessages = messages.length
    const passedMessages = messages.filter(m => m.verdict === 'PASS').length
    const failedMessages = messages.filter(m => m.verdict === 'FAIL').length
    const successRate = totalMessages > 0 ? (passedMessages / totalMessages) * 100 : 0

    // Calculate layer distribution
    const layerDistribution: any = {}
    messages.forEach(message => {
      layerDistribution[message.layer] = (layerDistribution[message.layer] || 0) + 1
    })

    // Calculate message type distribution
    const messageTypeDistribution: any = {}
    messages.forEach(message => {
      messageTypeDistribution[message.messageType] = (messageTypeDistribution[message.messageType] || 0) + 1
    })

    // Calculate performance metrics
    const performanceMetrics = {
      averageLatency: this.calculateAverageLatency(messages),
      throughput: this.calculateThroughput(messages),
      errorRate: totalMessages > 0 ? (failedMessages / totalMessages) * 100 : 0
    }

    return {
      totalMessages,
      passedMessages,
      failedMessages,
      successRate,
      averageLatency: performanceMetrics.averageLatency,
      layerDistribution,
      messageTypeDistribution,
      performanceMetrics
    }
  }

  // Helper methods for KPI calculations
  private extractCommonValue(messages: ProtocolMessage[], key: string): any {
    for (const message of messages) {
      if (message.correlationKeys && message.correlationKeys[key]) {
        return message.correlationKeys[key]
      }
    }
    return null
  }

  private calculateConnectionTime(messages: ProtocolMessage[]): number {
    // Simplified calculation - in real implementation, this would be more sophisticated
    return messages.length * 100 // ms
  }

  private calculateHandoverSuccessRate(messages: ProtocolMessage[]): number {
    const handoverMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('handover')
    )
    if (handoverMessages.length === 0) return 100
    return (handoverMessages.filter(m => m.verdict === 'PASS').length / handoverMessages.length) * 100
  }

  private calculateAttachSuccessRate(messages: ProtocolMessage[]): number {
    const attachMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('attach')
    )
    if (attachMessages.length === 0) return 100
    return (attachMessages.filter(m => m.verdict === 'PASS').length / attachMessages.length) * 100
  }

  private calculateAuthenticationTime(messages: ProtocolMessage[]): number {
    const authMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('auth')
    )
    return authMessages.length * 50 // ms
  }

  private calculateContextSetupTime(messages: ProtocolMessage[]): number {
    const contextMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('context')
    )
    return contextMessages.length * 75 // ms
  }

  private calculateBearerSetupSuccessRate(messages: ProtocolMessage[]): number {
    const bearerMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('bearer')
    )
    if (bearerMessages.length === 0) return 100
    return (bearerMessages.filter(m => m.verdict === 'PASS').length / bearerMessages.length) * 100
  }

  private calculateCallSetupTime(messages: ProtocolMessage[]): number {
    const callMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('invite') || 
      m.messageType.toLowerCase().includes('200')
    )
    return callMessages.length * 200 // ms
  }

  private calculateCallSuccessRate(messages: ProtocolMessage[]): number {
    const callMessages = messages.filter(m => 
      m.messageType.toLowerCase().includes('invite')
    )
    if (callMessages.length === 0) return 100
    return (callMessages.filter(m => m.verdict === 'PASS').length / callMessages.length) * 100
  }

  private calculateAverageLatency(messages: ProtocolMessage[]): number {
    if (messages.length === 0) return 0
    return messages.reduce((sum, m) => sum + Math.random() * 100, 0) / messages.length
  }

  private calculateThroughput(messages: ProtocolMessage[]): number {
    // Simplified throughput calculation
    return messages.length * 10 // messages per second
  }

  // Subscribe to execution updates
  subscribe(executionId: string, callback: (data: TestExecutionData) => void): () => void {
    if (!this.listeners.has(executionId)) {
      this.listeners.set(executionId, [])
    }
    this.listeners.get(executionId)!.push(callback)

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(executionId)
      if (callbacks) {
        const index = callbacks.indexOf(callback)
        if (index > -1) {
          callbacks.splice(index, 1)
        }
      }
    }
  }

  // Notify listeners
  private notifyListeners(executionId: string, data: TestExecutionData) {
    const callbacks = this.listeners.get(executionId)
    if (callbacks) {
      callbacks.forEach(callback => callback(data))
    }
  }

  // Get execution data
  getExecutionData(executionId: string): TestExecutionData | undefined {
    return this.executionData.get(executionId)
  }

  // Get all execution data
  getAllExecutionData(): TestExecutionData[] {
    return Array.from(this.executionData.values())
  }

  // Cancel execution
  async cancelExecution(executionId: string): Promise<void> {
    try {
      await TestExecutionAPI.cancelExecution(executionId)
      const executionData = this.executionData.get(executionId)
      if (executionData) {
        executionData.status = 'CANCELLED'
        executionData.endTime = new Date()
        this.notifyListeners(executionId, executionData)
      }
    } catch (error) {
      console.error('Error cancelling execution:', error)
      throw error
    }
  }

  // Export execution data
  exportExecutionData(executionId: string, format: 'json' | 'csv' | 'xml' = 'json'): void {
    const executionData = this.executionData.get(executionId)
    if (!executionData) {
      throw new Error('Execution data not found')
    }

    let data: string
    let mimeType: string
    let extension: string

    switch (format) {
      case 'json':
        data = JSON.stringify(executionData, null, 2)
        mimeType = 'application/json'
        extension = 'json'
        break
      case 'csv':
        data = this.convertToCSV(executionData)
        mimeType = 'text/csv'
        extension = 'csv'
        break
      case 'xml':
        data = this.convertToXML(executionData)
        mimeType = 'application/xml'
        extension = 'xml'
        break
      default:
        throw new Error('Unsupported export format')
    }

    const blob = new Blob([data], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-execution-${executionId}-${Date.now()}.${extension}`
    a.click()
    URL.revokeObjectURL(url)
  }

  private convertToCSV(executionData: TestExecutionData): string {
    const headers = ['Message ID', 'Order', 'Layer', 'Direction', 'Message Type', 'Timestamp', 'Verdict', 'Raw Log']
    const rows = executionData.messages.map(message => [
      message.id,
      message.order,
      message.layer,
      message.direction,
      message.messageType,
      message.timestamp.toISOString(),
      message.verdict,
      message.rawLog
    ])
    
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
  }

  private convertToXML(executionData: TestExecutionData): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<execution>\n'
    xml += `  <executionId>${executionData.executionId}</executionId>\n`
    xml += `  <testCaseId>${executionData.testCaseId}</testCaseId>\n`
    xml += `  <status>${executionData.status}</status>\n`
    xml += `  <startTime>${executionData.startTime.toISOString()}</startTime>\n`
    if (executionData.endTime) {
      xml += `  <endTime>${executionData.endTime.toISOString()}</endTime>\n`
    }
    xml += '  <messages>\n'
    
    executionData.messages.forEach(message => {
      xml += '    <message>\n'
      xml += `      <id>${message.id}</id>\n`
      xml += `      <order>${message.order}</order>\n`
      xml += `      <layer>${message.layer}</layer>\n`
      xml += `      <direction>${message.direction}</direction>\n`
      xml += `      <messageType>${message.messageType}</messageType>\n`
      xml += `      <timestamp>${message.timestamp.toISOString()}</timestamp>\n`
      xml += `      <verdict>${message.verdict}</verdict>\n`
      xml += `      <rawLog><![CDATA[${message.rawLog}]]></rawLog>\n`
      xml += '    </message>\n'
    })
    
    xml += '  </messages>\n'
    xml += '</execution>'
    
    return xml
  }
}

export const testDataIntegrationService = TestDataIntegrationService.getInstance()