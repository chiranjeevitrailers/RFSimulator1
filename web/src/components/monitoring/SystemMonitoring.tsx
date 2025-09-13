import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Server, 
  Database, 
  Network, 
  Cpu, 
  MemoryStick, 
  HardDrive,
  Globe,
  Zap,
  Shield,
  Bell,
  Settings,
  RefreshCw,
  Eye,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../auth/AuthProvider'
import LoadingSpinner from '../common/LoadingSpinner'

interface SystemMetrics {
  cpu: {
    usage: number
    cores: number
    load: number[]
  }
  memory: {
    used: number
    total: number
    percentage: number
  }
  disk: {
    used: number
    total: number
    percentage: number
  }
  network: {
    bytesIn: number
    bytesOut: number
    packetsIn: number
    packetsOut: number
  }
  database: {
    connections: number
    maxConnections: number
    queryTime: number
    slowQueries: number
  }
  services: Array<{
    name: string
    status: 'healthy' | 'degraded' | 'down'
    uptime: number
    lastCheck: string
  }>
}

interface Alert {
  id: string
  type: 'system' | 'performance' | 'security' | 'service'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  timestamp: string
  status: 'active' | 'acknowledged' | 'resolved'
  source: string
  metrics?: any
}

interface MonitoringConfig {
  alerts: {
    cpuThreshold: number
    memoryThreshold: number
    diskThreshold: number
    responseTimeThreshold: number
    errorRateThreshold: number
  }
  notifications: {
    email: boolean
    webhook: boolean
    slack: boolean
  }
  retention: {
    metrics: number
    logs: number
    alerts: number
  }
}

export const SystemMonitoring: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'metrics' | 'alerts' | 'services' | 'config'>('overview')
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [alertFilter, setAlertFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all')
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')
  
  const { user } = useAuth()

  // Fetch system metrics
  const { data: systemMetrics, isLoading: metricsLoading, refetch } = useQuery({
    queryKey: ['system-metrics', selectedTimeRange],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .rpc('get_system_metrics', { time_range: selectedTimeRange })
      
      if (error) throw error
      return data as SystemMetrics
    },
    enabled: !!user?.id,
    refetchInterval: autoRefresh ? 30000 : false
  })

  // Fetch alerts
  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['system-alerts', alertFilter, severityFilter],
    queryFn: async () => {
      if (!user?.id) return []
      
      let query = supabase
        .from('system_alerts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100)

      if (alertFilter !== 'all') {
        query = query.eq('status', alertFilter)
      }
      
      if (severityFilter !== 'all') {
        query = query.eq('severity', severityFilter)
      }

      const { data, error } = await query
      if (error) throw error
      return data as Alert[]
    },
    enabled: !!user?.id,
    refetchInterval: autoRefresh ? 10000 : false
  })

  // Fetch monitoring configuration
  const { data: monitoringConfig, isLoading: configLoading } = useQuery({
    queryKey: ['monitoring-config', user?.id],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .from('monitoring_config')
        .select('*')
        .eq('user_id', user.id)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error
      return data as MonitoringConfig
    },
    enabled: !!user?.id
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'degraded':
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case 'down':
        return <XCircle className="w-5 h-5 text-error" />
      default:
        return <Clock className="w-5 h-5 text-base-content" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'badge-success'
      case 'degraded':
        return 'badge-warning'
      case 'down':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-4 h-4 text-error" />
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-info" />
      case 'low':
        return <CheckCircle className="w-4 h-4 text-success" />
      default:
        return <Clock className="w-4 h-4 text-base-content" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'badge-error'
      case 'high':
        return 'badge-warning'
      case 'medium':
        return 'badge-info'
      case 'low':
        return 'badge-success'
      default:
        return 'badge-neutral'
    }
  }

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Server className="w-4 h-4" />
      case 'performance':
        return <Activity className="w-4 h-4" />
      case 'security':
        return <Shield className="w-4 h-4" />
      case 'service':
        return <Globe className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      relative: getRelativeTime(date)
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (metricsLoading || alertsLoading || configLoading) {
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
              <h1 className="text-2xl font-bold">System Monitoring</h1>
              <p className="text-base-content/70">
                Monitor system health, performance, and receive real-time alerts
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
          <Activity className="w-4 h-4" />
          Overview
        </button>
        <button 
          className={`tab ${selectedView === 'metrics' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('metrics')}
        >
          <Server className="w-4 h-4" />
          Metrics
        </button>
        <button 
          className={`tab ${selectedView === 'alerts' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('alerts')}
        >
          <Bell className="w-4 h-4" />
          Alerts
        </button>
        <button 
          className={`tab ${selectedView === 'services' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('services')}
        >
          <Globe className="w-4 h-4" />
          Services
        </button>
        <button 
          className={`tab ${selectedView === 'config' ? 'tab-active' : ''}`}
          onClick={() => setSelectedView('config')}
        >
          <Settings className="w-4 h-4" />
          Config
        </button>
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Time Range:</span>
        <div className="flex gap-2">
          {['1h', '6h', '24h', '7d'].map((range) => (
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
      {selectedView === 'overview' && systemMetrics && (
        <div className="space-y-6">
          {/* System Health Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemMetrics.cpu.usage.toFixed(1)}%</div>
                    <div className="text-sm text-base-content/70">CPU Usage</div>
                  </div>
                </div>
                <div className="mt-2">
                  <progress 
                    className="progress progress-primary w-full" 
                    value={systemMetrics.cpu.usage} 
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                    <MemoryStick className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemMetrics.memory.percentage.toFixed(1)}%</div>
                    <div className="text-sm text-base-content/70">Memory Usage</div>
                  </div>
                </div>
                <div className="mt-2">
                  <progress 
                    className="progress progress-secondary w-full" 
                    value={systemMetrics.memory.percentage} 
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <HardDrive className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemMetrics.disk.percentage.toFixed(1)}%</div>
                    <div className="text-sm text-base-content/70">Disk Usage</div>
                  </div>
                </div>
                <div className="mt-2">
                  <progress 
                    className="progress progress-accent w-full" 
                    value={systemMetrics.disk.percentage} 
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                    <Database className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{systemMetrics.database.connections}</div>
                    <div className="text-sm text-base-content/70">DB Connections</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-base-content/50">
                  {systemMetrics.database.connections}/{systemMetrics.database.maxConnections} max
                </div>
              </div>
            </div>
          </div>

          {/* Active Alerts Summary */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Active Alerts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['critical', 'high', 'medium', 'low'].map((severity) => {
                  const count = alerts?.filter(alert => 
                    alert.severity === severity && alert.status === 'active'
                  ).length || 0
                  
                  return (
                    <div key={severity} className="text-center p-4 bg-base-200 rounded-lg">
                      <div className={`text-2xl font-bold ${getSeverityColor(severity).replace('badge-', 'text-')}`}>
                        {count}
                      </div>
                      <div className="text-sm text-base-content/70 capitalize">
                        {severity} Alerts
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Service Status */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Service Status</h2>
              
              <div className="space-y-3">
                {systemMetrics.services.map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-base-content/70">
                          Uptime: {formatUptime(service.uptime)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`badge ${getStatusColor(service.status)}`}>
                        {service.status}
                      </div>
                      <div className="text-sm text-base-content/50">
                        {formatTimestamp(service.lastCheck).relative}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Tab */}
      {selectedView === 'metrics' && systemMetrics && (
        <div className="space-y-6">
          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="text-lg font-bold mb-4">System Resources</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm">{systemMetrics.cpu.usage.toFixed(1)}%</span>
                    </div>
                    <progress className="progress progress-primary w-full" value={systemMetrics.cpu.usage} max="100"></progress>
                    <div className="text-xs text-base-content/50 mt-1">
                      {systemMetrics.cpu.cores} cores, Load: {systemMetrics.cpu.load.join(', ')}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm">{systemMetrics.memory.percentage.toFixed(1)}%</span>
                    </div>
                    <progress className="progress progress-secondary w-full" value={systemMetrics.memory.percentage} max="100"></progress>
                    <div className="text-xs text-base-content/50 mt-1">
                      {formatBytes(systemMetrics.memory.used)} / {formatBytes(systemMetrics.memory.total)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm">{systemMetrics.disk.percentage.toFixed(1)}%</span>
                    </div>
                    <progress className="progress progress-accent w-full" value={systemMetrics.disk.percentage} max="100"></progress>
                    <div className="text-xs text-base-content/50 mt-1">
                      {formatBytes(systemMetrics.disk.used)} / {formatBytes(systemMetrics.disk.total)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h3 className="text-lg font-bold mb-4">Network & Database</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Network Traffic</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bytes In:</span>
                        <span>{formatBytes(systemMetrics.network.bytesIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bytes Out:</span>
                        <span>{formatBytes(systemMetrics.network.bytesOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packets In:</span>
                        <span>{systemMetrics.network.packetsIn.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Packets Out:</span>
                        <span>{systemMetrics.network.packetsOut.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Database Performance</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Connections:</span>
                        <span>{systemMetrics.database.connections}/{systemMetrics.database.maxConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Query Time:</span>
                        <span>{systemMetrics.database.queryTime}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slow Queries:</span>
                        <span className={systemMetrics.database.slowQueries > 0 ? 'text-warning' : 'text-success'}>
                          {systemMetrics.database.slowQueries}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {selectedView === 'alerts' && (
        <div className="space-y-6">
          {/* Alert Filters */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-outline">
                    <Filter size={16} />
                    Status
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setAlertFilter('all')}>All Status</a></li>
                    <li><a onClick={() => setAlertFilter('active')}>Active</a></li>
                    <li><a onClick={() => setAlertFilter('acknowledged')}>Acknowledged</a></li>
                    <li><a onClick={() => setAlertFilter('resolved')}>Resolved</a></li>
                  </ul>
                </div>
                
                <div className="dropdown">
                  <label tabIndex={0} className="btn btn-outline">
                    <AlertTriangle size={16} />
                    Severity
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setSeverityFilter('all')}>All Severities</a></li>
                    <li><a onClick={() => setSeverityFilter('critical')}>Critical</a></li>
                    <li><a onClick={() => setSeverityFilter('high')}>High</a></li>
                    <li><a onClick={() => setSeverityFilter('medium')}>Medium</a></li>
                    <li><a onClick={() => setSeverityFilter('low')}>Low</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            {alerts?.map((alert) => {
              const timestamp = formatTimestamp(alert.timestamp)
              return (
                <div key={alert.id} className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        {getAlertTypeIcon(alert.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{alert.title}</h3>
                            <div className={`badge ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </div>
                            <div className={`badge ${
                              alert.status === 'active' ? 'badge-error' :
                              alert.status === 'acknowledged' ? 'badge-warning' : 'badge-success'
                            }`}>
                              {alert.status}
                            </div>
                          </div>
                          
                          <p className="text-base-content/70 mb-3">{alert.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-base-content/50">
                            <span>Source: {alert.source}</span>
                            <span>{timestamp.date} {timestamp.time}</span>
                            <span>{timestamp.relative}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        {alert.status === 'active' && (
                          <button className="btn btn-warning btn-sm">
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          {alerts?.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No alerts found</h3>
              <p className="text-base-content/70">
                {alertFilter !== 'all' || severityFilter !== 'all'
                  ? 'Try adjusting your filters to see more alerts.'
                  : 'All systems are running smoothly with no active alerts.'
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Services Tab */}
      {selectedView === 'services' && systemMetrics && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Service Status</h2>
              
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Uptime</th>
                      <th>Last Check</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemMetrics.services.map((service) => (
                      <tr key={service.name}>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(service.status)}
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </td>
                        <td>
                          <div className={`badge ${getStatusColor(service.status)}`}>
                            {service.status}
                          </div>
                        </td>
                        <td>{formatUptime(service.uptime)}</td>
                        <td>{formatTimestamp(service.lastCheck).relative}</td>
                        <td>
                          <button className="btn btn-ghost btn-sm">
                            <Settings className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Config Tab */}
      {selectedView === 'config' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">Monitoring Configuration</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Alert Thresholds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">CPU Threshold (%)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered" 
                        defaultValue={monitoringConfig?.alerts.cpuThreshold || 80}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Memory Threshold (%)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered" 
                        defaultValue={monitoringConfig?.alerts.memoryThreshold || 85}
                      />
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Disk Threshold (%)</span>
                      </label>
                      <input 
                        type="number" 
                        className="input input-bordered" 
                        defaultValue={monitoringConfig?.alerts.diskThreshold || 90}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="checkbox" defaultChecked={monitoringConfig?.notifications.email} />
                      <span>Email Notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="checkbox" defaultChecked={monitoringConfig?.notifications.webhook} />
                      <span>Webhook Notifications</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="checkbox" defaultChecked={monitoringConfig?.notifications.slack} />
                      <span>Slack Notifications</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary">
                    Save Configuration
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SystemMonitoring