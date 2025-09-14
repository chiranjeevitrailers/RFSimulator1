import React, { useState, useEffect } from 'react'
import { BarChart3, Activity, TrendingUp, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState({
    totalMessages: 0,
    errorRate: 0,
    avgThroughput: 0,
    successRate: 0
  })

  const [analysisData, setAnalysisData] = useState<any>(null)

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = async () => {
      // In a real implementation, this would fetch from the backend
      const sampleData = {
        totalMessages: 1247,
        errorRate: 2.3,
        avgThroughput: 156.7,
        successRate: 97.7,
        byComponent: {
          'PHY': 456,
          'MAC': 234,
          'RLC': 189,
          'PDCP': 156,
          'RRC': 123,
          'NAS': 89
        },
        byType: {
          'MIB': 45,
          'SIB1': 32,
          'RRCSetup': 28,
          'PDSCH': 156,
          'PUSCH': 134,
          'DL-SCH': 89
        }
      }
      
      setStats({
        totalMessages: sampleData.totalMessages,
        errorRate: sampleData.errorRate,
        avgThroughput: sampleData.avgThroughput,
        successRate: sampleData.successRate
      })
      
      setAnalysisData(sampleData)
    }

    loadDashboardData()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">5GLabX Protocol Analyzer Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time protocol analysis and monitoring</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Messages</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.totalMessages.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Throughput</h3>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.avgThroughput} Kbps</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.errorRate}%</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.successRate}%</p>
        </div>
      </div>

      {/* Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Message Distribution by Component</h3>
          {analysisData?.byComponent && (
            <div className="space-y-3">
              {Object.entries(analysisData.byComponent).map(([component, count]) => (
                <div key={component} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{component}</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {count as number}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Message Types Analysis</h3>
          {analysisData?.byType && (
            <div className="space-y-3">
              {Object.entries(analysisData.byType).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{type}</span>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {count as number}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Real-time Activity</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Real-time protocol analysis will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage