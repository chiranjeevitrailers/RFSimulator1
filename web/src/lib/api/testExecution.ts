import { supabase } from '../supabase/client'

export interface TestExecutionRequest {
  testCaseId: string
  parameters?: {
    ue?: {
      imsi?: string
      s_tmsi?: string
      rnti?: number
      plmn_id?: string
      tac?: string
      cell_id?: string
    }
    network?: {
      enb_id?: string
      gnb_id?: string
      mme_id?: string
      amf_id?: string
      plmn_id?: string
      tac?: string
      cell_id?: string
    }
  }
  simulateFault?: boolean
}

export interface TestExecutionResponse {
  id: string
  testCaseId: string
  status: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
  startedAt: string
  finishedAt?: string
  faultInjected: boolean
  parameters?: any
  summary?: any
}

export interface TestExecutionStatus {
  id: string
  status: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
  progress: number
  startedAt: string
  estimatedCompletion?: string
  currentStep: number
  totalSteps: number
  messages: Array<{
    id: string
    order: number
    layer: string
    direction: string
    messageType: string
    timestamp: string
    status: 'PASS' | 'FAIL' | 'RUNNING'
  }>
}

export interface TestExecutionResults {
  id: string
  status: 'PASSED' | 'FAILED' | 'CANCELLED'
  startedAt: string
  finishedAt: string
  duration: number
  totalSteps: number
  passedSteps: number
  failedSteps: number
  summary: {
    attachSuccess?: boolean
    authenticationSuccess?: boolean
    contextEstablishmentSuccess?: boolean
    securityActivationSuccess?: boolean
    defaultBearerSetupSuccess?: boolean
  }
  messages: Array<{
    id: string
    order: number
    layer: string
    direction: string
    messageType: string
    timestamp: string
    verdict: 'PASS' | 'FAIL' | 'INCONCLUSIVE'
    correlationKeys: any
  }>
}

export class TestExecutionAPI {
  // Execute a test case
  static async executeTest(request: TestExecutionRequest): Promise<TestExecutionResponse> {
    try {
      // For now, we'll use the API backend
      const response = await fetch('/api/execute/test-case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error executing test:', error)
      throw error
    }
  }

  // Get execution status
  static async getExecutionStatus(executionId: string): Promise<TestExecutionStatus> {
    try {
      const response = await fetch(`/api/execute/status/${executionId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error getting execution status:', error)
      throw error
    }
  }

  // Get execution results
  static async getExecutionResults(executionId: string): Promise<TestExecutionResults> {
    try {
      const response = await fetch(`/api/execute/results/${executionId}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error getting execution results:', error)
      throw error
    }
  }

  // Cancel execution
  static async cancelExecution(executionId: string): Promise<void> {
    try {
      const response = await fetch(`/api/execute/cancel/${executionId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error cancelling execution:', error)
      throw error
    }
  }

  // Get user's executions from Supabase
  static async getUserExecutions(userId: string, limit: number = 50): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('executions')
        .select(`
          *,
          test_cases (
            title,
            complexity,
            test_suites (
              name,
              suite_type
            )
          )
        `)
        .eq('run_by', userId)
        .order('started_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting user executions:', error)
      throw error
    }
  }

  // Preview test case
  static async previewTest(request: Omit<TestExecutionRequest, 'testCaseId'> & { testCaseId: string }): Promise<any> {
    try {
      const response = await fetch('/api/execute/preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.data
    } catch (error) {
      console.error('Error previewing test:', error)
      throw error
    }
  }
}

export default TestExecutionAPI