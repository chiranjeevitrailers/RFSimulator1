import React, { useState, useEffect, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Zap, 
  Database, 
  Cpu, 
  HardDrive, 
  Network, 
  MemoryStick,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
  BarChart3,
  Activity
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import LoadingSpinner from '../common/LoadingSpinner'

interface PerformanceMetrics {
  executionTime: number
  memoryUsage: number
  cpuUsage: number
  networkLatency: number
  cacheHitRate: number
  databaseQueries: number
  messageProcessingRate: number
  errorRate: number
}

interface OptimizationSuggestion {
  id: string
  type: 'performance' | 'memory' | 'network' | 'database' | 'cache'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  effort: 'low' | 'medium' | 'high'
  estimatedImprovement: string
}

export const PerformanceOptimizer: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [optimizationMode, setOptimizationMode] = useState<'auto' | 'manual'>('auto')

  // Fetch performance metrics
  const { data: performanceMetrics, isLoading: metricsLoading, refetch } = useQuery({
    queryKey: ['performance-metrics', selectedTimeRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_performance_metrics', { time_range: selectedTimeRange })
      
      if (error) throw error
      return data
    },
    refetchInterval: autoRefresh ? 30000 : false
  })

  // Fetch optimization suggestions
  const { data: optimizationSuggestions, isLoading: suggestionsLoading } = useQuery({
    queryKey: ['optimization-suggestions', performanceMetrics],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_optimization_suggestions', { 
          metrics: performanceMetrics,
          mode: optimizationMode 
        })
      
      if (error) throw error
      return data
    },
    enabled: !!performanceMetrics
  })

  // Auto-refresh effect
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refetch()
      }, 30000)
      return () => clearInterval(interval)
    }
  }, [autoRefresh, refetch])

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'executionTime':
        return <Zap className="w-5 h-5" />
      case 'memoryUsage':
        return <MemoryStick className="w-5 h-5" />
      case 'cpuUsage':
        return <Cpu className="w-5 h-5" />
      case 'networkLatency':
        return <Network className="w-5 h-5" />
      case 'cacheHitRate':
        return <Database className="w-5 h-5" />
      case 'databaseQueries':
        return <HardDrive className="w-5 h-5" />
      case 'messageProcessingRate':
        return <Activity className="w-5 h-5" />
      case 'errorRate':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <BarChart3 className="w-5 h-5" />
    }
  }

  const getMetricStatus = (metric: string, value: number) => {
    const thresholds = {
      executionTime: { good: 1000, warning: 5000 },
      memoryUsage: { good: 70, warning: 85 },
      cpuUsage: { good: 70, warning: 85 },
      networkLatency: { good: 100, warning: 500 },
      cacheHitRate: { good: 90, warning: 80 },
      databaseQueries: { good: 100, warning: 500 },
      messageProcessingRate: { good: 1000, warning: 500 },
      errorRate: { good: 1, warning: 5 }
    }

    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'unknown'

    if (metric === 'cacheHitRate' || metric === 'messageProcessingRate') {
      return value >= threshold.good ? 'good' : value >= threshold.warning ? 'warning' : 'critical'
    } else {
      return value <= threshold.good ? 'good' : value <= threshold.warning ? 'warning' : 'critical'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'critical':
        return 'text-error'
      default:
        return 'text-base-content'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-error" />
      default:
        return <BarChart3 className="w-4 h-4 text-base-content" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'badge-error'
      case 'medium':
        return 'badge-warning'
      case 'low':
        return 'badge-success'
      default:
        return 'badge-neutral'
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low':
        return 'text-success'
      case 'medium':
        return 'text-warning'
      case 'high':
        return 'text-error'
      default:
        return 'text-base-content'
    }
  }

  const formatMetricValue = (metric: string, value: number) => {
    switch (metric) {
      case 'executionTime':
        return `${value}ms`
      case 'memoryUsage':
      case 'cpuUsage':
      case 'cacheHitRate':
      case 'errorRate':
        return `${value}%`
      case 'networkLatency':
        return `${value}ms`
      case 'databaseQueries':
        return `${value} queries`
      case 'messageProcessingRate':
        return `${value} msg/s`
      default:
        return value.toString()
    }
  }

  const criticalMetrics = useMemo(() => {
    if (!performanceMetrics) return []
    
    return Object.entries(performanceMetrics).filter(([metric, value]) => 
      getMetricStatus(metric, value as number) === 'critical'
    )
  }, [performanceMetrics])

  const warningMetrics = useMemo(() => {
    if (!performanceMetrics) return []
    
    return Object.entries(performanceMetrics).filter(([metric, value]) => 
      getMetricStatus(metric, value as number) === 'warning'
    )
  }, [performanceMetrics])

  if (metricsLoading || suggestionsLoading) {
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
              <h1 className="text-2xl font-bold">Performance Optimizer</h1>
              <p className="text-base-content/70">
                Monitor and optimize system performance in real-time
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
              
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-outline btn-sm">
                  <Settings className="w-4 h-4" />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={() => setSelectedTimeRange('1h')}>Last Hour</a></li>
                  <li><a onClick={() => setSelectedTimeRange('24h')}>Last 24 Hours</a></li>
                  <li><a onClick={() => setSelectedTimeRange('7d')}>Last 7 Days</a></li>
                  <li><a onClick={() => setSelectedTimeRange('30d')}>Last 30 Days</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalMetrics.length > 0 && (
        <div className="space-y-2">
          {criticalMetrics.map(([metric, value]) => (
            <div key={metric} className="alert alert-error shadow-lg">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <h3 className="font-bold">Critical Performance Issue</h3>
                <div className="text-xs">
                  {metric}: {formatMetricValue(metric, value as number)} - Immediate attention required
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics && Object.entries(performanceMetrics).map(([metric, value]) => {
          const status = getMetricStatus(metric, value as number)
          return (
            <div key={metric} className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center justify-between mb-2">
                  {getMetricIcon(metric)}
                  {getStatusIcon(status)}
                </div>
                
                <div className="space-y-1">
                  <div className={`text-2xl font-bold ${getStatusColor(status)}`}>
                    {formatMetricValue(metric, value as number)}
                  </div>
                  <div className="text-sm text-base-content/70 capitalize">
                    {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </div>
                  <div className="text-xs">
                    Status: <span className={getStatusColor(status)}>{status}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Performance Trends */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Performance Trends</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Overall Performance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-base-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resource Utilization</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-base-200 rounded-full h-2">
                      <div className="bg-warning h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Error Rate</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-base-200 rounded-full h-2">
                      <div className="bg-success h-2 rounded-full" style={{ width: '2%' }}></div>
                    </div>
                    <span className="text-sm font-medium">2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Recent Changes</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span>Message processing rate increased by 15%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-error" />
                  <span>Memory usage increased by 8%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span>Cache hit rate improved by 5%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="w-4 h-4 text-warning" />
                  <span>Network latency increased by 12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Suggestions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Optimization Suggestions</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/70">Mode:</span>
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-outline btn-sm">
                  {optimizationMode === 'auto' ? 'Automatic' : 'Manual'}
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={() => setOptimizationMode('auto')}>Automatic</a></li>
                  <li><a onClick={() => setOptimizationMode('manual')}>Manual</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {optimizationSuggestions?.map((suggestion: OptimizationSuggestion) => (
              <div key={suggestion.id} className="p-4 bg-base-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{suggestion.title}</h3>
                      <div className={`badge ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 mb-2">
                      {suggestion.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span><strong>Impact:</strong> {suggestion.impact}</span>
                      <span><strong>Effort:</strong> 
                        <span className={getEffortColor(suggestion.effort)}> {suggestion.effort}</span>
                      </span>
                      <span><strong>Improvement:</strong> {suggestion.estimatedImprovement}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="btn btn-primary btn-sm">
                      Apply
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Performance Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <Database className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Clear Cache</div>
                <div className="text-sm text-base-content/70">Reset all cached data</div>
              </div>
            </button>
            
            <button className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <RefreshCw className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Restart Services</div>
                <div className="text-sm text-base-content/70">Restart all background services</div>
              </div>
            </button>
            
            <button className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <BarChart3 className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Generate Report</div>
                <div className="text-sm text-base-content/70">Create performance report</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerformanceOptimizer