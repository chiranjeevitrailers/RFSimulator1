import { supabase } from '../supabase/client'

export interface CreateCheckoutRequest {
  planId: string
  userId: string
}

export interface CreateCheckoutResponse {
  sessionId: string
  url: string
}

export interface QuotaInfo {
  planName: string
  execLimit: number | null
  currentExecutions: number
  remainingExecutions: number | null
  unlimited: boolean
}

export class BillingAPI {
  // Create Stripe checkout session
  static async createCheckout(request: CreateCheckoutRequest): Promise<CreateCheckoutResponse> {
    try {
      const response = await fetch('/api/create-checkout', {
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
      return data
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  // Get user quota information
  static async getUserQuota(userId: string): Promise<QuotaInfo> {
    try {
      const response = await fetch('/api/quota-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.quotaInfo
    } catch (error) {
      console.error('Error getting user quota:', error)
      throw error
    }
  }

  // Get user subscription from Supabase
  static async getUserSubscription(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error
      }

      return data
    } catch (error) {
      console.error('Error getting user subscription:', error)
      throw error
    }
  }

  // Get all available plans
  static async getPlans(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('exec_limit', { ascending: true })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting plans:', error)
      throw error
    }
  }

  // Check if user can execute tests
  static async canExecuteTest(userId: string): Promise<boolean> {
    try {
      const quotaInfo = await this.getUserQuota(userId)
      return quotaInfo.unlimited || (quotaInfo.remainingExecutions !== null && quotaInfo.remainingExecutions > 0)
    } catch (error) {
      console.error('Error checking execution permission:', error)
      return false
    }
  }

  // Get usage statistics
  static async getUsageStats(userId: string, period: 'month' | 'week' | 'day' = 'month'): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('executions')
        .select('*')
        .eq('run_by', userId)
        .gte('started_at', this.getPeriodStart(period))
        .order('started_at', { ascending: false })

      if (error) throw error

      const stats = {
        total: data?.length || 0,
        passed: data?.filter(exec => exec.status === 'PASSED').length || 0,
        failed: data?.filter(exec => exec.status === 'FAILED').length || 0,
        running: data?.filter(exec => exec.status === 'RUNNING').length || 0,
        cancelled: data?.filter(exec => exec.status === 'CANCELLED').length || 0,
        successRate: 0
      }

      if (stats.total > 0) {
        stats.successRate = (stats.passed / stats.total) * 100
      }

      return stats
    } catch (error) {
      console.error('Error getting usage stats:', error)
      throw error
    }
  }

  private static getPeriodStart(period: string): string {
    const now = new Date()
    let start: Date

    switch (period) {
      case 'day':
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
      default:
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        break
    }

    return start.toISOString()
  }
}

export default BillingAPI