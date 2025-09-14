// Protocol Data Service - Connects frontend to backend API
class ProtocolDataService {
  private baseUrl: string

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(url, { ...defaultOptions, ...options })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  // Dashboard data
  async getDashboardData() {
    return this.request('/protocol/dashboard')
  }

  // Logs data
  async getLogs(filters: {
    layer?: string
    level?: string
    channel?: string
    search?: string
    limit?: number
  } = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })
    
    const queryString = params.toString()
    const endpoint = queryString ? `/protocol/logs?${queryString}` : '/protocol/logs'
    
    return this.request(endpoint)
  }

  // Enhanced logs data
  async getEnhancedLogs(filters: {
    layer?: string
    channel?: string
    messageType?: string
    direction?: string
    search?: string
  } = {}) {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })
    
    const queryString = params.toString()
    const endpoint = queryString ? `/protocol/enhanced-logs?${queryString}` : '/protocol/enhanced-logs'
    
    return this.request(endpoint)
  }

  // Layer trace data
  async getLayerTrace(layer: string) {
    return this.request(`/protocol/layer-trace/${layer}`)
  }

  // Call flows data
  async getCallFlows() {
    return this.request('/protocol/call-flows')
  }

  // Analytics data
  async getAnalytics(timeRange: string = '1h') {
    return this.request(`/protocol/analytics?timeRange=${timeRange}`)
  }

  // O-RAN data
  async getOranOverview() {
    return this.request('/protocol/oran/overview')
  }

  // Layer-specific data
  async getLayerData(layer: string) {
    return this.request(`/protocol/layers/${layer}`)
  }

  // Core network component data
  async getCoreComponentData(component: string) {
    return this.request(`/protocol/core/${component}`)
  }

  // NB-IoT specific data
  async getNBIoTData(type: string) {
    return this.request(`/protocol/nbiot/${type}`)
  }

  // V2X specific data
  async getV2XData(type: string) {
    return this.request(`/protocol/v2x/${type}`)
  }

  // NTN specific data
  async getNTNData(type: string) {
    return this.request(`/protocol/ntn/${type}`)
  }
}

// Create singleton instance
export const protocolDataService = new ProtocolDataService()

// Export for use in components
export default protocolDataService