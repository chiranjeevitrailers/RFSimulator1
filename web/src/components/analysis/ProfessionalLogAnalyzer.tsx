import React, { useState, useEffect, useRef } from 'react'
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  Download, 
  Filter, 
  Search, 
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Clock,
  Activity,
  BarChart3,
  Layers,
  Network,
  Database,
  MessageSquare,
  Cloud,
  Radio,
  Cpu,
  HardDrive,
  Wifi,
  Signal
} from 'lucide-react'
import { TestExecutionDataFlow, TestExecutionData, LogMessage } from '../../services/TestExecutionDataFlow'

interface ProfessionalLogAnalyzerProps {
  executionId: string
  onClose?: () => void
}

export const ProfessionalLogAnalyzer: React.FC<ProfessionalLogAnalyzerProps> = ({
  executionId,
  onClose
}) => {
  const [executionData, setExecutionData] = useState<TestExecutionData | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [filterLevel, setFilterLevel] = useState<string>('all')
  const [filterComponent, setFilterComponent] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set())
  const [selectedTab, setSelectedTab] = useState<'logs' | 'stats' | 'metrics'>('logs')
  const [autoScroll, setAutoScroll] = useState(true)
  
  const logContainerRef = useRef<HTMLDivElement>(null)
  const dataFlow = TestExecutionDataFlow.getInstance()

  useEffect(() => {
    // Subscribe to execution data updates
    const unsubscribe = dataFlow.subscribe(executionId, (data) => {
      setExecutionData(data)
      
      // Auto-scroll to bottom if enabled
      if (autoScroll && logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
      }
    })

    // Get initial data
    const initialData = dataFlow.getExecutionData(executionId)
    if (initialData) {
      setExecutionData(initialData)
    }

    return unsubscribe
  }, [executionId, autoScroll])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
      case 'FATAL':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'WARN':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'INFO':
        return <Info className="w-4 h-4 text-blue-500" />
      case 'DEBUG':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
      case 'FATAL':
        return 'bg-red-50 border-red-200'
      case 'WARN':
        return 'bg-yellow-50 border-yellow-200'
      case 'INFO':
        return 'bg-blue-50 border-blue-200'
      case 'DEBUG':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'PHY':
        return <Radio className="w-4 h-4 text-purple-500" />
      case 'MAC':
        return <Network className="w-4 h-4 text-blue-500" />
      case 'RLC':
        return <Layers className="w-4 h-4 text-green-500" />
      case 'PDCP':
        return <Database className="w-4 h-4 text-orange-500" />
      case 'RRC':
        return <Settings className="w-4 h-4 text-red-500" />
      case 'NAS':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />
      case 'IMS':
        return <Cloud className="w-4 h-4 text-cyan-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  const filteredLogs = executionData?.logs.filter(log => {
    if (filterLevel !== 'all' && log.level !== filterLevel) return false
    if (filterComponent !== 'all' && log.component !== filterComponent) return false
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }) || []

  const toggleLogExpansion = (logId: string) => {
    const newExpanded = new Set(expandedLogs)
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId)
    } else {
      newExpanded.add(logId)
    }
    setExpandedLogs(newExpanded)
  }

  const exportLogs = () => {
    if (!executionData) return
    
    const logData = {
      executionId: executionData.executionId,
      testCaseName: executionData.testCaseName,
      category: executionData.category,
      subcategory: executionData.subcategory,
      status: executionData.status,
      startedAt: executionData.startedAt,
      logs: executionData.logs,
      protocolStats: executionData.protocolStats,
      systemMetrics: executionData.systemMetrics
    }
    
    const blob = new Blob([JSON.stringify(logData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-execution-${executionData.executionId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!executionData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Activity className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
          <p className="text-base-content/70">Loading execution data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-base-100 border border-base-300 rounded-lg ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-base-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <h2 className="text-lg font-semibold">5GLabX Log Analyzer</h2>
          </div>
          <div className="text-sm text-base-content/70">
            {executionData.testCaseName} - {executionData.category.toUpperCase()}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn btn-sm btn-ghost"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="btn btn-sm btn-ghost"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          
          <button
            onClick={exportLogs}
            className="btn btn-sm btn-ghost"
            title="Export Logs"
          >
            <Download className="w-4 h-4" />
          </button>
          
          {onClose && (
            <button
              onClick={onClose}
              className="btn btn-sm btn-ghost"
              title="Close"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-base-300">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm input-bordered pl-10 w-64"
            />
          </div>

          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="select select-sm select-bordered"
          >
            <option value="all">All Levels</option>
            <option value="DEBUG">DEBUG</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
            <option value="FATAL">FATAL</option>
          </select>

          {/* Component Filter */}
          <select
            value={filterComponent}
            onChange={(e) => setFilterComponent(e.target.value)}
            className="select select-sm select-bordered"
          >
            <option value="all">All Components</option>
            <option value="PHY">PHY</option>
            <option value="MAC">MAC</option>
            <option value="RLC">RLC</option>
            <option value="PDCP">PDCP</option>
            <option value="RRC">RRC</option>
            <option value="NAS">NAS</option>
            <option value="IMS">IMS</option>
          </select>

          {/* Auto-scroll Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Auto-scroll</span>
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-base-300">
        <button
          onClick={() => setSelectedTab('logs')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            selectedTab === 'logs' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-base-content/70 hover:text-base-content'
          }`}
        >
          Logs ({filteredLogs.length})
        </button>
        <button
          onClick={() => setSelectedTab('stats')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            selectedTab === 'stats' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-base-content/70 hover:text-base-content'
          }`}
        >
          Protocol Stats ({executionData.protocolStats.length})
        </button>
        <button
          onClick={() => setSelectedTab('metrics')}
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            selectedTab === 'metrics' 
              ? 'border-primary text-primary' 
              : 'border-transparent text-base-content/70 hover:text-base-content'
          }`}
        >
          System Metrics ({executionData.systemMetrics.length})
        </button>
      </div>

      {/* Content */}
      <div className="h-96 overflow-auto" ref={logContainerRef}>
        {selectedTab === 'logs' && (
          <div className="p-4 space-y-2">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className={`border rounded-lg p-3 ${getLevelColor(log.level)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 mt-0.5">
                    {getLevelIcon(log.level)}
                    {getComponentIcon(log.component)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-base-content/70">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-base-200 rounded">
                        {log.level}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-base-200 rounded">
                        {log.component}
                      </span>
                    </div>
                    
                    <div className="text-sm font-mono break-all">
                      {log.message}
                    </div>
                    
                    {(log.rawData || log.parsedData) && (
                      <button
                        onClick={() => toggleLogExpansion(log.id)}
                        className="mt-2 text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {expandedLogs.has(log.id) ? (
                          <ChevronDown className="w-3 h-3" />
                        ) : (
                          <ChevronRight className="w-3 h-3" />
                        )}
                        {expandedLogs.has(log.id) ? 'Hide' : 'Show'} Details
                      </button>
                    )}
                    
                    {expandedLogs.has(log.id) && (
                      <div className="mt-2 space-y-2">
                        {log.rawData && (
                          <div>
                            <div className="text-xs font-semibold text-base-content/70 mb-1">Raw Data:</div>
                            <pre className="text-xs bg-base-200 p-2 rounded overflow-x-auto">
                              {JSON.stringify(log.rawData, null, 2)}
                            </pre>
                          </div>
                        )}
                        {log.parsedData && (
                          <div>
                            <div className="text-xs font-semibold text-base-content/70 mb-1">Parsed Data:</div>
                            <pre className="text-xs bg-base-200 p-2 rounded overflow-x-auto">
                              {JSON.stringify(log.parsedData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-base-content/70">
                <Activity className="w-8 h-8 mx-auto mb-2" />
                <p>No logs found matching the current filters</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'stats' && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {executionData.protocolStats.map((stat, index) => (
                <div key={index} className="card bg-base-200">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {getComponentIcon(stat.layer.toUpperCase())}
                      <h3 className="font-semibold">{stat.layer.toUpperCase()}</h3>
                    </div>
                    <div className="text-2xl font-bold text-primary">{stat.metricValue}</div>
                    <div className="text-sm text-base-content/70">{stat.metricName}</div>
                    <div className="text-xs text-base-content/50">{stat.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'metrics' && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {executionData.systemMetrics.map((metric, index) => (
                <div key={index} className="card bg-base-200">
                  <div className="card-body p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {metric.metricType === 'cpu' && <Cpu className="w-4 h-4 text-blue-500" />}
                      {metric.metricType === 'memory' && <HardDrive className="w-4 h-4 text-green-500" />}
                      {metric.metricType === 'network' && <Wifi className="w-4 h-4 text-purple-500" />}
                      {metric.metricType === 'throughput' && <Signal className="w-4 h-4 text-orange-500" />}
                      {metric.metricType === 'latency' && <Clock className="w-4 h-4 text-red-500" />}
                      <h3 className="font-semibold">{metric.metricName}</h3>
                    </div>
                    <div className="text-2xl font-bold text-primary">{metric.metricValue}</div>
                    <div className="text-xs text-base-content/50">{metric.unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-base-300 bg-base-200">
        <div className="flex items-center gap-4 text-sm text-base-content/70">
          <span>Status: <span className="font-semibold text-success">{executionData.status}</span></span>
          <span>Started: {executionData.startedAt.toLocaleString()}</span>
          <span>Logs: {executionData.logs.length}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-base-content/70">Live</span>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalLogAnalyzer