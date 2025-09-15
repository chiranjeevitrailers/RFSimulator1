// Real-Time Data Streaming Service for 5GLabX
// Handles real-time data flow from test executions to frontend

import { supabase } from '../lib/supabase/client'
import { fiveGLabXDataService } from './5GLabXDataService'

export interface RealTimeLog {
  id: string
  timestamp: string
  level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR'
  component: string
  message: string
  raw_data?: any
  parsed_data?: any
}

export interface RealTimeMetric {
  id: string
  timestamp: string
  metric_name: string
  metric_value: number
  metric_unit: string
  category: string
  subcategory: string
}

export interface RealTimeAnalysis {
  id: string
  timestamp: string
  analysis_type: string
  data: any
}

export class RealTimeDataService {
  private subscriptions: Map<string, any> = new Map()
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private executionChannel: any = null

  // ==============================================
  // CONNECTION MANAGEMENT
  // ==============================================

  async connect(): Promise<void> {
    try {
      // Subscribe to execution logs changes
      const logsSubscription = supabase
        .channel('execution_logs')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'execution_logs'
          },
          (payload) => {
            this.handleNewLog(payload.new as any)
          }
        )
        .subscribe()

      // Subscribe to analytics dashboard changes
      const analyticsSubscription = supabase
        .channel('analytics_dashboard')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'analytics_dashboard'
          },
          (payload) => {
            this.handleNewMetric(payload.new as any)
          }
        )
        .subscribe()

      // Subscribe to test execution status changes
      const executionSubscription = supabase
        .channel('test_executions')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'test_executions'
          },
          (payload) => {
            this.handleExecutionUpdate(payload.new as any)
          }
        )
        .subscribe()

      this.subscriptions.set('logs', logsSubscription)
      this.subscriptions.set('analytics', analyticsSubscription)
      this.subscriptions.set('executions', executionSubscription)

      this.isConnected = true
      this.reconnectAttempts = 0

      console.log('Real-time data service connected')
    } catch (error) {
      console.error('Failed to connect to real-time data service:', error)
      this.handleReconnect()
    }
  }

  async disconnect(): Promise<void> {
    try {
      for (const [key, subscription] of this.subscriptions) {
        await supabase.removeChannel(subscription)
      }
      this.subscriptions.clear()
      this.isConnected = false
      console.log('Real-time data service disconnected')
    } catch (error) {
      console.error('Error disconnecting real-time data service:', error)
    }
  }

  private async handleReconnect(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)

    setTimeout(async () => {
      try {
        await this.connect()
      } catch (error) {
        console.error('Reconnection failed:', error)
        this.handleReconnect()
      }
    }, this.reconnectDelay * this.reconnectAttempts)
  }

  /**
   * Connect to live decoded-message stream for a specific execution ID.
   *   – Opens Supabase Realtime broadcast channel `test_log::<execId>`
   *   – Emits `realtime:log` CustomEvent for each payload
   */
  async connectToExecution(execId: string): Promise<void> {
    if (this.executionChannel) {
      await supabase.removeChannel(this.executionChannel)
      this.executionChannel = null
    }

    this.executionChannel = supabase
      .channel(`test_log::${execId}`)
      .on('broadcast', { event: 'log' }, ({ payload }) => {
        const event = new CustomEvent('realtime:log', { detail: payload })
        window.dispatchEvent(event)
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          this.isConnected = true
        }
      })
  }

  /** Disconnect current execution stream */
  async disconnectExecution(): Promise<void> {
    if (this.executionChannel) {
      await supabase.removeChannel(this.executionChannel)
      this.executionChannel = null
      this.isConnected = false
    }
  }

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  private handleNewLog(log: RealTimeLog): void {
    // Emit custom event for new log
    const event = new CustomEvent('realtime:log', {
      detail: log
    })
    window.dispatchEvent(event)
  }

  private handleNewMetric(metric: RealTimeMetric): void {
    // Emit custom event for new metric
    const event = new CustomEvent('realtime:metric', {
      detail: metric
    })
    window.dispatchEvent(event)
  }

  private handleExecutionUpdate(execution: any): void {
    // Emit custom event for execution update
    const event = new CustomEvent('realtime:execution', {
      detail: execution
    })
    window.dispatchEvent(event)
  }

  // ==============================================
  // REAL-TIME DATA GENERATION
  // ==============================================

  async startRealTimeSimulation(executionId: string, testCaseId: string): Promise<void> {
    try {
      // Get test case details
      const { data: testCase } = await supabase
        .from('test_cases')
        .select('*')
        .eq('id', testCaseId)
        .single()

      if (!testCase) {
        throw new Error('Test case not found')
      }

      // Start real-time data generation based on test case category
      const category = testCase.category
      const subcategory = testCase.subcategory

      if (category === 'Protocol Layers') {
        await this.simulateProtocolLayerRealTime(executionId, subcategory)
      } else if (category === 'Core Network') {
        await this.simulateCoreNetworkRealTime(executionId, subcategory)
      } else if (category === 'O-RAN Analysis') {
        await this.simulateORANRealTime(executionId, subcategory)
      } else if (category === 'NB-IoT Analysis') {
        await this.simulateNBIoTRealTime(executionId, subcategory)
      } else if (category === 'C-V2X Analysis') {
        await this.simulateV2XRealTime(executionId, subcategory)
      } else if (category === 'NTN Analysis') {
        await this.simulateNTNRealTime(executionId, subcategory)
      }

    } catch (error) {
      console.error('Error starting real-time simulation:', error)
      throw error
    }
  }

  private async simulateProtocolLayerRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'PHY Layer': 'phy_layer_analysis',
      'MAC Layer': 'mac_layer_analysis',
      'RLC Layer': 'rlc_layer_analysis',
      'PDCP Layer': 'pdcp_layer_analysis',
      'RRC Layer': 'rrc_layer_analysis',
      'NAS Layer': 'nas_layer_analysis',
      'IMS Layer': 'ims_analysis'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 30 seconds
    const startTime = Date.now()
    const duration = 30000 // 30 seconds
    const interval = 1000 // 1 second

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        // Generate sample data
        const sampleData = this.generateRealTimeData(subcategory)
        
        // Insert analysis data
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        // Add execution log
        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} analysis - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        // Add analytics metric
        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Performance`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'Protocol Layers',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private async simulateCoreNetworkRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'AMF': 'amf_analysis',
      'SMF': 'smf_analysis',
      'UPF': 'upf_analysis',
      'AUSF': 'ausf_analysis',
      'UDM': 'udm_analysis'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 25 seconds
    const startTime = Date.now()
    const duration = 25000 // 25 seconds
    const interval = 1500 // 1.5 seconds

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        const sampleData = this.generateRealTimeData(subcategory)
        
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} monitoring - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Status`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'Core Network',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private async simulateORANRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'O-RAN Overview': 'oran_overview',
      'Interfaces': 'oran_interfaces',
      'CU Analysis': 'cu_analysis',
      'DU Analysis': 'du_analysis'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 20 seconds
    const startTime = Date.now()
    const duration = 20000 // 20 seconds
    const interval = 2000 // 2 seconds

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        const sampleData = this.generateRealTimeData(subcategory)
        
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} analysis - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Performance`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'O-RAN Analysis',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private async simulateNBIoTRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'NB-IoT Overview': 'nbiot_overview',
      'NB-IoT Call Flow': 'nbiot_call_flow'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 35 seconds
    const startTime = Date.now()
    const duration = 35000 // 35 seconds
    const interval = 3000 // 3 seconds

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        const sampleData = this.generateRealTimeData(subcategory)
        
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} monitoring - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Status`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'NB-IoT Analysis',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private async simulateV2XRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'V2X Overview': 'v2x_overview',
      'PC5 Sidelink': 'pc5_sidelink'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 28 seconds
    const startTime = Date.now()
    const duration = 28000 // 28 seconds
    const interval = 1200 // 1.2 seconds

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        const sampleData = this.generateRealTimeData(subcategory)
        
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} analysis - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Performance`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'C-V2X Analysis',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private async simulateNTNRealTime(executionId: string, subcategory: string): Promise<void> {
    const tableMap: { [key: string]: string } = {
      'NTN Overview': 'ntn_overview',
      'SIB19 Analysis': 'sib19_analysis'
    }

    const tableName = tableMap[subcategory]
    if (!tableName) return

    // Generate real-time data for 32 seconds
    const startTime = Date.now()
    const duration = 32000 // 32 seconds
    const interval = 1800 // 1.8 seconds

    const intervalId = setInterval(async () => {
      if (Date.now() - startTime >= duration) {
        clearInterval(intervalId)
        return
      }

      try {
        const sampleData = this.generateRealTimeData(subcategory)
        
        await supabase
          .from(tableName)
          .insert({
            execution_id: executionId,
            ...sampleData
          })

        await supabase
          .from('execution_logs')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: subcategory,
            message: `Real-time ${subcategory} monitoring - ${sampleData.raw_data?.status || 'active'}`,
            raw_data: sampleData
          })

        await supabase
          .from('analytics_dashboard')
          .insert({
            execution_id: executionId,
            timestamp: new Date().toISOString(),
            metric_name: `${subcategory} Status`,
            metric_value: sampleData.raw_data?.random_value || Math.random() * 100,
            metric_unit: '%',
            category: 'NTN Analysis',
            subcategory: subcategory,
            raw_data: sampleData
          })

      } catch (error) {
        console.error('Error generating real-time data:', error)
      }
    }, interval)
  }

  private generateRealTimeData(subcategory: string): any {
    const baseData = {
      timestamp: new Date().toISOString(),
      raw_data: {
        timestamp: new Date().toISOString(),
        random_value: Math.random() * 100,
        status: 'active',
        real_time: true
      }
    }

    // Add specific fields based on subcategory with real-time variations
    switch (subcategory) {
      case 'PHY Layer':
        return {
          ...baseData,
          frequency_band: '3.5 GHz',
          modulation_scheme: '256-QAM',
          coding_rate: 0.7 + Math.random() * 0.1,
          signal_strength: -80 + Math.random() * 20,
          snr: 15 + Math.random() * 10,
          throughput_mbps: 100 + Math.random() * 50,
          error_rate: Math.random() * 0.001
        }
      case 'MAC Layer':
        return {
          ...baseData,
          scheduling_algorithm: 'Proportional Fair',
          resource_blocks_allocated: 50 + Math.floor(Math.random() * 50),
          harq_retransmissions: Math.floor(Math.random() * 3),
          buffer_status: Math.floor(Math.random() * 100),
          latency_ms: 1 + Math.random() * 5,
          efficiency_percentage: 85 + Math.random() * 15
        }
      case 'RLC Layer':
        return {
          ...baseData,
          rlc_mode: ['UM', 'AM', 'TM'][Math.floor(Math.random() * 3)],
          sequence_number: Math.floor(Math.random() * 1000),
          pdu_size: 1000 + Math.floor(Math.random() * 1000),
          retransmission_count: Math.floor(Math.random() * 3),
          window_size: 512,
          throughput_mbps: 50 + Math.random() * 50
        }
      case 'PDCP Layer':
        return {
          ...baseData,
          pdcp_sn: Math.floor(Math.random() * 1000),
          ciphering_enabled: true,
          integrity_protection: true,
          compression_ratio: 0.7 + Math.random() * 0.2,
          header_size: 2 + Math.floor(Math.random() * 3),
          payload_size: 1000 + Math.floor(Math.random() * 1000)
        }
      case 'RRC Layer':
        return {
          ...baseData,
          rrc_state: ['IDLE', 'CONNECTED', 'INACTIVE'][Math.floor(Math.random() * 3)],
          procedure_type: 'Registration',
          message_type: 'RRCSetupRequest',
          cell_id: '12345',
          plmn_id: '00101'
        }
      case 'NAS Layer':
        return {
          ...baseData,
          nas_procedure: 'Registration',
          message_type: 'RegistrationRequest',
          security_context: '5G-AKA',
          imsi: '001010123456789',
          guti: '1234567890abcdef'
        }
      case 'IMS Layer':
        return {
          ...baseData,
          session_type: 'VoLTE',
          call_state: 'Established',
          sip_method: 'INVITE',
          response_code: 200,
          media_type: 'audio',
          codec: 'AMR-WB'
        }
      case 'AMF':
        return {
          ...baseData,
          amf_instance_id: 'AMF-001',
          procedure_type: 'Registration',
          message_type: 'RegistrationRequest',
          registration_area: 'RA-001',
          tracking_area: 'TA-001'
        }
      case 'SMF':
        return {
          ...baseData,
          smf_instance_id: 'SMF-001',
          pdu_session_id: Math.floor(Math.random() * 10),
          procedure_type: 'PDU Session Establishment',
          message_type: 'PDUSessionEstablishmentRequest',
          qos_flow_id: Math.floor(Math.random() * 5)
        }
      case 'UPF':
        return {
          ...baseData,
          upf_instance_id: 'UPF-001',
          n3_interface_ip: '192.168.1.1',
          n6_interface_ip: '10.0.0.1',
          packet_count: Math.floor(Math.random() * 10000),
          byte_count: Math.floor(Math.random() * 1000000),
          throughput_mbps: 5 + Math.random() * 5
        }
      case 'AUSF':
        return {
          ...baseData,
          ausf_instance_id: 'AUSF-001',
          authentication_method: '5G-AKA',
          success: Math.random() > 0.1,
          challenge_response: 'challenge_response_data'
        }
      case 'UDM':
        return {
          ...baseData,
          udm_instance_id: 'UDM-001',
          data_type: 'Subscription Data',
          operation_type: 'Retrieve',
          subscription_data: {
            imsi: '001010123456789',
            msisdn: '+1234567890',
            subscription_status: 'active'
          }
        }
      case 'O-RAN Overview':
        return {
          ...baseData,
          oran_version: '2.0',
          interface_type: 'E1',
          node_type: 'CU',
          status: 'active',
          performance_metrics: {
            throughput: 1000 + Math.random() * 500,
            latency: 1 + Math.random() * 2,
            reliability: 99 + Math.random()
          }
        }
      case 'Interfaces':
        return {
          ...baseData,
          interface_name: ['E1', 'F1-C', 'F1-U'][Math.floor(Math.random() * 3)],
          message_type: 'Control Message',
          procedure_type: 'Setup',
          latency_ms: 0.5 + Math.random() * 1.5,
          throughput_mbps: 100 + Math.random() * 100,
          error_count: Math.floor(Math.random() * 5)
        }
      case 'CU Analysis':
        return {
          ...baseData,
          cu_instance_id: 'CU-001',
          cpu_usage: 50 + Math.random() * 30,
          memory_usage: 60 + Math.random() * 20,
          active_sessions: 100 + Math.floor(Math.random() * 200),
          throughput_mbps: 5 + Math.random() * 5
        }
      case 'DU Analysis':
        return {
          ...baseData,
          du_instance_id: 'DU-001',
          cell_id: 'Cell-001',
          active_users: 50 + Math.floor(Math.random() * 100),
          resource_utilization: 70 + Math.random() * 20,
          interference_level: -100 + Math.random() * 20
        }
      case 'NB-IoT Overview':
        return {
          ...baseData,
          coverage_class: 1 + Math.floor(Math.random() * 3),
          repetition_factor: 1 + Math.floor(Math.random() * 8),
          power_level: 20 + Math.floor(Math.random() * 10),
          signal_quality: -100 + Math.random() * 30
        }
      case 'NB-IoT Call Flow':
        return {
          ...baseData,
          procedure_type: 'Attach',
          message_sequence: Math.floor(Math.random() * 10),
          response_time_ms: 1000 + Math.random() * 2000,
          success: Math.random() > 0.1
        }
      case 'V2X Overview':
        return {
          ...baseData,
          vehicle_id: 'Vehicle-' + Math.floor(Math.random() * 1000),
          message_type: 'CAM',
          transmission_power: 20 + Math.floor(Math.random() * 10),
          distance_meters: 100 + Math.random() * 200
        }
      case 'PC5 Sidelink':
        return {
          ...baseData,
          source_id: 'Source-' + Math.floor(Math.random() * 100),
          destination_id: 'Dest-' + Math.floor(Math.random() * 100),
          resource_pool: 'Pool-' + Math.floor(Math.random() * 10),
          modulation_scheme: 'QPSK'
        }
      case 'NTN Overview':
        return {
          ...baseData,
          satellite_id: 'SAT-' + Math.floor(Math.random() * 100),
          orbit_type: 'LEO',
          altitude_km: 500 + Math.random() * 200,
          doppler_shift_hz: -5000 + Math.random() * 10000,
          propagation_delay_ms: 200 + Math.random() * 400
        }
      case 'SIB19 Analysis':
        return {
          ...baseData,
          sib19_content: {
            satellite_info: 'Satellite data',
            timing_info: 'Timing data'
          },
          satellite_info: {
            satellite_id: 'SAT-001',
            orbit_type: 'LEO'
          },
          timing_info: {
            propagation_delay: 300,
            doppler_shift: 1000
          }
        }
      default:
        return baseData
    }
  }

  // ==============================================
  // EVENT LISTENERS
  // ==============================================

  addLogListener(callback: (log: RealTimeLog) => void): () => void {
    const handler = (event: CustomEvent) => {
      callback(event.detail)
    }
    
    window.addEventListener('realtime:log', handler as EventListener)
    
    return () => {
      window.removeEventListener('realtime:log', handler as EventListener)
    }
  }

  addMetricListener(callback: (metric: RealTimeMetric) => void): () => void {
    const handler = (event: CustomEvent) => {
      callback(event.detail)
    }
    
    window.addEventListener('realtime:metric', handler as EventListener)
    
    return () => {
      window.removeEventListener('realtime:metric', handler as EventListener)
    }
  }

  addExecutionListener(callback: (execution: any) => void): () => void {
    const handler = (event: CustomEvent) => {
      callback(event.detail)
    }
    
    window.addEventListener('realtime:execution', handler as EventListener)
    
    return () => {
      window.removeEventListener('realtime:execution', handler as EventListener)
    }
  }

  // ==============================================
  // UTILITY METHODS
  // ==============================================

  isConnectedToRealTime(): boolean {
    return this.isConnected
  }

  getConnectionStatus(): string {
    return this.isConnected ? 'connected' : 'disconnected'
  }

  getReconnectAttempts(): number {
    return this.reconnectAttempts
  }
}

// Export singleton instance
export const realTimeDataService = new RealTimeDataService()