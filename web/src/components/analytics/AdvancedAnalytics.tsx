import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  LineChart,
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  Zap,
  Shield,
  Globe,
  Car,
  Satellite
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../auth/AuthProvider'
import LoadingSpinner from '../common/LoadingSpinner'

interface AnalyticsData {
  overview: {
    totalExecutions: number
    successRate: number
    averageDuration: number
    activeUsers: number
    totalTestCases: number
    protocolCoverage: number
  }
  trends: {
    executionsOverTime: Array<{ date: string, count: number, success: number, failed: number }>
    userActivity: Array<{ date: string, activeUsers: number, newUsers: number }>
    protocolUsage: Array<{ protocol: string, count: number, percentage: number }>
  }
  performance: {
    executionTimes: Array<{ testCase: string, averageTime: number, minTime: number, maxTime: number }>
    errorRates: Array<{ category: string, rate: number, count: number }>
    resourceUtilization: Array<{ resource: string, usage: number, capacity: number }>
  }
  insights: Array<{
    id: string
    type: 'performance' | 'usage' | 'trend' | 'anomaly'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
    recommendation: string
    confidence: number
  }>
}

export const AdvancedAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedView, setSelectedView] = useState<'overview' | 'trends' | 'performance' | 'insights'>('overview')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedMetric, setSelectedMetric] = useState<string>('all')
  
  const { user } = useAuth()

  // Fetch analytics data
  const { data: analyticsData, isLoading, refetch } = useQuery({
    queryKey: ['advanced-analytics', selectedTimeRange, selectedMetric],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .rpc('get_advanced_analytics', { 
          time_range: selectedTimeRange,
          metric_filter: selectedMetric === 'all' ? null : selectedMetric
        })
      
      if (error) throw error
      return data as AnalyticsData
    },
    enabled: !!user?.id,
    refetchInterval: autoRefresh ? 60000 : false
  })

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refetch()
      }, 60000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refetch])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <Zap className="w-5 h-5 text-warning" />
      case 'usage':
        return <Users className="w-5 h-5 text-info" />
      case 'trend':
        return <TrendingUp className="w-5 h-5 text-success" />
      case 'anomaly':
        return <AlertTriangle className="w-5 h-5 text-error" />
      default:
        return <Activity className="w-5 h-5 text-primary" />
    }
  }

  const getInsightColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'border-l-error'
      case 'medium':
        return 'border-l-warning'
      case 'low':
        return 'border-l-success'
      default:
        return 'border-l-primary'
    }
  }

  const getProtocolIcon = (protocol: string) => {
    switch (protocol.toLowerCase()) {
      case 'oran':
        return <Globe className="w-4 h-4 text-accent" />
      case 'nbiot':
        return <Satellite className="w-4 h-4 text-success" />
      case 'ntn':
        return <Satellite className="w-4 h-4 text-info" />
      case 'v2x':
        return <Car className="w-4 h-4 text-warning" />
      case 'ims':
        return <Globe className="w-4 h-4 text-info" />
      case 'security':
        return <Shield className="w-4 h-4 text-error" />
      default:
        return <Activity className="w-4 h-4 text-primary" />
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Advanced Analytics</h1>
              <p className="text-base-content/70">
                Comprehensive insights into platform usage, performance, and trends
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text mr-2">Auto Refresh</span>
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary toggle-sm" 
                    checked={autoRefresh}
                    onChange={(e) => setAutoRefresh(e.target.checked)}
                  />
                </label>
              </div>
              
              <button onClick={() => refetch()} className="btn btn-outline btn-sm">
                <RefreshCw className="w-4 h-4" />
              </button>
              
              <button className="btn btn-outline btn-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${selectedView === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('overview')}
        >
          <BarChart3 className="w-4 h-4" />
          Overview
        </button>
        <button 
          className={`tab ${selectedView === 'trends' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('trends')}
        >
          <TrendingUp className="w-4 h-4" />
          Trends
        </button>
        <button 
          className={`tab ${selectedView === 'performance' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('performance')}
        >
          <Activity className="w-4 h-4" />
          Performance
        </button>
        <button 
          className={`tab ${selectedView === 'insights' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('insights')}
        >
          <Eye className="w-4 h-4" />
          Insights
        </button>
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Time Range:</span>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              className={`btn btn-sm ${selectedTimeRange === range ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setSelectedTimeRange(range as any)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && analyticsData && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalExecutions)}</div>
                    <div className="text-sm text-base-content/70">Total Executions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatPercentage(analyticsData.overview.successRate)}</div>
                    <div className="text-sm text-base-content/70">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatDuration(analyticsData.overview.averageDuration)}</div>
                    <div className="text-sm text-base-content/70">Avg Duration</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.activeUsers)}</div>
                    <div className="text-sm text-base-content/70">Active Users</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                    <Activity className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatNumber(analyticsData.overview.totalTestCases)}</div>
                    <div className="text-sm text-base-content/70">Test Cases</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{formatPercentage(analyticsData.overview.protocolCoverage)}</div>
                    <div className="text-sm text-base-content/70">Protocol Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Protocol Usage Distribution */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Protocol Usage Distribution</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analyticsData.trends.protocolUsage.map((protocol) => (
                  <div key={protocol.protocol} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getProtocolIcon(protocol.protocol)}
                      <div>
                        <div className="font-medium">{protocol.protocol}</div>
                        <div className="text-sm text-base-content/70">{protocol.count} executions</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{formatPercentage(protocol.percentage)}</div>
                      <div className="w-20 bg-base-300 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${protocol.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {selectedView === 'trends' && analyticsData && (
        <div className="space-y-6">
          {/* Execution Trends */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Execution Trends</h2>
              
              <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                  <p className="text-base-content/70">Execution trends chart would be displayed here</p>
                  <p className="text-sm text-base-content/50">
                    {analyticsData.trends.executionsOverTime.length} data points available
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Activity Trends */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">User Activity Trends</h2>
              
              <div className="h-64 flex items-center justify-center bg-base-200 rounded-lg">
                <div className="text-center">
                  <Users className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                  <p className="text-base-content/70">User activity trends chart would be displayed here</p>
                  <p className="text-sm text-base-content/50">
                    {analyticsData.trends.userActivity.length} data points available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {selectedView === 'performance' && analyticsData && (
        <div className="space-y-6">
          {/* Execution Performance */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Execution Performance</h2>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Test Case</th>
                      <th>Average Time</th>
                      <th>Min Time</th>
                      <th>Max Time</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.performance.executionTimes.map((execution, index) => (
                      <tr key={index}>
                        <td className="font-medium">{execution.testCase}</td>
                        <td>{formatDuration(execution.averageTime)}</td>
                        <td>{formatDuration(execution.minTime)}</td>
                        <td>{formatDuration(execution.maxTime)}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-base-300 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  execution.averageTime < 1000 ? 'bg-success' :
                                  execution.averageTime < 5000 ? 'bg-warning' : 'bg-error'
                                }`}
                                style={{ width: `${Math.min(100, (execution.averageTime / 10000) * 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">
                              {execution.averageTime < 1000 ? 'Fast' :
                               execution.averageTime < 5000 ? 'Medium' : 'Slow'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Error Rates */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Error Rates by Category</h2>
              
              <div className="space-y-3">
                {analyticsData.performance.errorRates.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        error.rate < 1 ? 'bg-success' :
                        error.rate < 5 ? 'bg-warning' : 'bg-error'
                      }`}></div>
                      <span className="font-medium">{error.category}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-base-content/70">{error.count} errors</span>
                      <span className="font-bold">{formatPercentage(error.rate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {selectedView === 'insights' && analyticsData && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">AI-Powered Insights</h2>
              
              <div className="space-y-4">
                {analyticsData.insights.map((insight) => (
                  <div key={insight.id} className={`p-4 border-l-4 ${getInsightColor(insight.impact)} bg-base-200 rounded-lg`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <h3 className="font-semibold">{insight.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`badge ${
                              insight.impact === 'high' ? 'badge-error' :
                              insight.impact === 'medium' ? 'badge-warning' : 'badge-success'
                            }`}>
                              {insight.impact} impact
                            </div>
                            <div className="badge badge-outline">
                              {formatPercentage(insight.confidence)} confidence
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-base-content/70 mb-3">
                      {insight.description}
                    </p>
                    
                    <div className="bg-base-100 p-3 rounded">
                      <h4 className="font-medium text-sm mb-1">Recommendation:</h4>
                      <p className="text-sm text-base-content/70">{insight.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedAnalytics