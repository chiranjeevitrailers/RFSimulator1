import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  TestTube, 
  Play, 
  Pause, 
  Square, 
  Eye, 
  Download, 
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Activity,
  BarChart3,
  FileText,
  Layers,
  Network,
  Radio,
  MessageSquare,
  Database,
  Cpu,
  Server,
  Router,
  Cloud,
  GitBranch,
  Target,
  Gauge,
  Monitor,
  Zap,
  Shield,
  Globe,
  Car,
  Satellite,
  Smartphone,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Save,
  Share,
  Edit,
  Trash2,
  Copy,
  Info,
  AlertCircle,
  Filter,
  Search,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import { testDataIntegrationService, TestExecutionData, ProtocolMessage, LayerData } from '../../services/TestDataIntegrationService'
import { useSimpleBilling } from '../billing/SimpleBillingProvider'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

interface TestExecutionIntegrationProps {
  executionId?: string
  onExecutionComplete?: (executionId: string) => void
  onNavigateToView?: (view: string, data: any) => void
}

export const TestExecutionIntegration: React.FC<TestExecutionIntegrationProps> = ({
  executionId,
  onExecutionComplete,
  onNavigateToView
}) => {
  const [selectedTestCase, setSelectedTestCase] = useState<any>(null)
  const [executionData, setExecutionData] = useState<TestExecutionData | null>(null)
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<ProtocolMessage | null>(null)
  const [activeView, setActiveView] = useState<'execution' | 'logs' | 'layers' | 'analytics'>('execution')
  const [isRunning, setIsRunning] = useState(false)
  const [faultInjection, setFaultInjection] = useState(false)
  const [customParameters, setCustomParameters] = useState<any>({})

  const { canExecute } = useSimpleBilling()

  // Fetch test case details if executionId is provided
  const { data: testCase, isLoading: testCaseLoading } = useQuery({
    queryKey: ['test-case', executionId],
    queryFn: async () => {
      if (!executionId) return null
      const data = testDataIntegrationService.getExecutionData(executionId)
      if (data) {
        return await TestSuitesAPI.getTestCase(data.testCaseId)
      }
      return null
    },
    enabled: !!executionId
  })

  // Subscribe to execution updates
  useEffect(() => {
    if (!executionId) return

    const unsubscribe = testDataIntegrationService.subscribe(executionId, (data) => {
      setExecutionData(data)
      setIsRunning(data.status === 'RUNNING')
      
      if (data.status === 'PASSED' || data.status === 'FAILED' || data.status === 'CANCELLED') {
        setIsRunning(false)
        if (onExecutionComplete) {
          onExecutionComplete(executionId)
        }
      }
    })

    // Get initial data
    const initialData = testDataIntegrationService.getExecutionData(executionId)
    if (initialData) {
      setExecutionData(initialData)
      setIsRunning(initialData.status === 'RUNNING')
    }

    return unsubscribe
  }, [executionId, onExecutionComplete])

  const handleStartExecution = async () => {
    if (!selectedTestCase) {
      toast.error('No test case selected')
      return
    }

    if (!canExecute) {
      toast.error('You have reached your execution quota limit. Please upgrade your plan.')
      return
    }

    try {
      const newExecutionId = await testDataIntegrationService.startTestExecution(
        selectedTestCase.id,
        {
          ...selectedTestCase.default_parameters,
          ...customParameters
        },
        faultInjection
      )
      
      toast.success('Test execution started!')
      setIsRunning(true)
      
      // Navigate to execution view
      if (onNavigateToView) {
        onNavigateToView('test-execution', { executionId: newExecutionId })
      }
    } catch (error) {
      toast.error('Failed to start test execution')
      console.error('Error:', error)
    }
  }

  const handleStopExecution = async () => {
    if (!executionId) return

    try {
      await testDataIntegrationService.cancelExecution(executionId)
      toast.success('Test execution cancelled')
    } catch (error) {
      toast.error('Failed to cancel execution')
      console.error('Error:', error)
    }
  }

  const handleExportData = (format: 'json' | 'csv' | 'xml' = 'json') => {
    if (!executionId) return

    try {
      testDataIntegrationService.exportExecutionData(executionId, format)
      toast.success(`Data exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error('Failed to export data')
      console.error('Error:', error)
    }
  }

  const handleNavigateToView = (view: string, data: any) => {
    if (onNavigateToView) {
      onNavigateToView(view, data)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-error" />
      case 'RUNNING':
        return <Clock className="w-5 h-5 text-warning animate-spin" />
      case 'CANCELLED':
        return <AlertTriangle className="w-5 h-5 text-base-content/50" />
      default:
        return <Clock className="w-5 h-5 text-base-content/50" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASSED':
        return 'badge-success'
      case 'FAILED':
        return 'badge-error'
      case 'RUNNING':
        return 'badge-warning'
      case 'CANCELLED':
        return 'badge-neutral'
      default:
        return 'badge-neutral'
    }
  }

  const getLayerIcon = (layer: string) => {
    switch (layer) {
      case 'RRC':
        return <Settings className="w-4 h-4" />
      case 'NAS':
        return <MessageSquare className="w-4 h-4" />
      case 'S1AP':
        return <Network className="w-4 h-4" />
      case 'NGAP':
        return <Network className="w-4 h-4" />
      case 'SIP':
        return <Cloud className="w-4 h-4" />
      case 'PHY':
        return <Radio className="w-4 h-4" />
      case 'MAC':
        return <Network className="w-4 h-4" />
      case 'RLC':
        return <Layers className="w-4 h-4" />
      case 'PDCP':
        return <Database className="w-4 h-4" />
      default:
        return <TestTube className="w-4 h-4" />
    }
  }

  const filteredMessages = selectedLayer === 'all' 
    ? executionData?.messages || []
    : executionData?.messages.filter(msg => msg.layer === selectedLayer) || []

  const renderExecutionView = () => (
    <div className="flex-1 flex">
      {/* Left Panel - Message List */}
      <div className="w-1/3 border-r border-base-300 flex flex-col">
        <div className="p-4 border-b border-base-300">
          <h2 className="text-lg font-semibold">Message Flow</h2>
          <p className="text-sm text-base-content/70">
            {filteredMessages.length} messages • {selectedLayer === 'all' ? 'All layers' : selectedLayer}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.length > 0 ? (
            <div className="space-y-1 p-2">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id 
                      ? 'bg-primary text-primary-content' 
                      : 'bg-base-200 hover:bg-base-300'
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{message.messageType}</span>
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    {getLayerIcon(message.layer)}
                    <span>{message.layer} • {message.direction}</span>
                  </div>
                  {message.verdict && (
                    <div className="mt-1">
                      <span className={`badge badge-xs ${
                        message.verdict === 'PASS' ? 'badge-success' : 
                        message.verdict === 'FAIL' ? 'badge-error' : 'badge-warning'
                      }`}>
                        {message.verdict}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-base-content/50">
              <div className="text-center">
                <Zap className="w-12 h-12 mx-auto mb-2" />
                <p>No messages yet</p>
                <p className="text-sm">Start execution to see protocol messages</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Message Details */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-base-300">
          <h2 className="text-lg font-semibold">Message Details</h2>
          <p className="text-sm text-base-content/70">
            {selectedMessage ? `Analyzing ${selectedMessage.messageType}` : 'Select a message to analyze'}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Message Information</h3>
                  <div className="space-y-1 text-sm">
                    <div><strong>Type:</strong> {selectedMessage.messageType}</div>
                    <div><strong>Layer:</strong> {selectedMessage.layer}</div>
                    <div><strong>Direction:</strong> {selectedMessage.direction}</div>
                    <div><strong>Timestamp:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Correlation Keys</h3>
                  <div className="space-y-1 text-sm">
                    {selectedMessage.correlationKeys && Object.entries(selectedMessage.correlationKeys).map(([key, value]) => (
                      <div key={key}><strong>{key}:</strong> {String(value)}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Raw Message</h3>
                <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                  {selectedMessage.rawLog}
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Parsed Message</h3>
                <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedMessage.parsedMessage, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-base-content/50">
              <div className="text-center">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderLogsView = () => (
    <div className="space-y-4">
      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Enhanced Logs View</h2>
          <div className="space-y-2">
            {executionData?.messages.map((message, index) => (
              <div key={message.id} className="flex items-center gap-3 p-3 bg-base-200 rounded">
                <div className="flex-shrink-0">
                  {getLayerIcon(message.layer)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.messageType}</span>
                    <span className="text-sm text-base-content/70">{message.layer}</span>
                    <span className={`badge badge-xs ${
                      message.verdict === 'PASS' ? 'badge-success' : 
                      message.verdict === 'FAIL' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {message.verdict}
                    </span>
                  </div>
                  <div className="text-sm text-base-content/70">
                    {new Date(message.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderLayersView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {executionData?.layers.map((layer) => (
        <div key={layer.layer} className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-2 mb-2">
              {getLayerIcon(layer.layer)}
              <h3 className="card-title text-lg">{layer.layer} Layer</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Messages: </span>
                <span>{layer.messageCount}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Success Rate: </span>
                <span className={`badge badge-xs ${
                  layer.successRate > 90 ? 'badge-success' : 
                  layer.successRate > 70 ? 'badge-warning' : 'badge-error'
                }`}>
                  {layer.successRate.toFixed(1)}%
                </span>
              </div>
              <div className="text-sm">
                <span className="font-medium">Avg Latency: </span>
                <span>{layer.averageLatency.toFixed(0)}ms</span>
              </div>
              <div className="mt-2">
                <button
                  onClick={() => handleNavigateToView(`layer-${layer.layer.toLowerCase()}`, layer)}
                  className="btn btn-sm btn-outline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Layer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderAnalyticsView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Execution Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Messages:</span>
                <span className="font-bold">{executionData?.analytics.totalMessages || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Passed:</span>
                <span className="font-bold text-success">
                  {executionData?.analytics.passedMessages || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Failed:</span>
                <span className="font-bold text-error">
                  {executionData?.analytics.failedMessages || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-bold">
                  {executionData?.analytics.successRate.toFixed(1) || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Layer Distribution</h3>
            <div className="space-y-2">
              {executionData?.analytics.layerDistribution && Object.entries(executionData.analytics.layerDistribution).map(([layer, count]) => (
                <div key={layer} className="flex justify-between">
                  <span>{layer}:</span>
                  <span className="font-bold">{count as number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Avg Latency:</span>
                <span className="font-bold">
                  {executionData?.analytics.averageLatency.toFixed(0) || 0}ms
                </span>
              </div>
              <div className="flex justify-between">
                <span>Throughput:</span>
                <span className="font-bold">
                  {executionData?.analytics.performanceMetrics.throughput || 0} msg/s
                </span>
              </div>
              <div className="flex justify-between">
                <span>Error Rate:</span>
                <span className="font-bold">
                  {executionData?.analytics.performanceMetrics.errorRate.toFixed(1) || 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (testCaseLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">
            {testCase ? `Test Execution: ${testCase.title}` : 'Protocol Test Execution'}
          </h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={isRunning ? handleStopExecution : handleStartExecution}
              className={`btn btn-sm ${isRunning ? 'btn-error' : 'btn-primary'}`}
              disabled={!selectedTestCase || !canExecute}
            >
              {isRunning ? (
                <>
                  <Square size={16} />
                  Stop
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start
                </>
              )}
            </button>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline btn-sm">
                <Filter size={16} />
                Layer
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedLayer('all')}>All Layers</a></li>
                <li><a onClick={() => setSelectedLayer('RRC')}>RRC</a></li>
                <li><a onClick={() => setSelectedLayer('NAS')}>NAS</a></li>
                <li><a onClick={() => setSelectedLayer('S1AP')}>S1AP</a></li>
                <li><a onClick={() => setSelectedLayer('NGAP')}>NGAP</a></li>
                <li><a onClick={() => setSelectedLayer('SIP')}>SIP</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Fault Injection</span>
              <input 
                type="checkbox" 
                className="toggle toggle-primary toggle-sm" 
                checked={faultInjection}
                onChange={(e) => setFaultInjection(e.target.checked)}
                disabled={isRunning}
              />
            </label>
          </div>
          
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline btn-sm">
              <Download size={16} />
              Export
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a onClick={() => handleExportData('json')}>JSON</a></li>
              <li><a onClick={() => handleExportData('csv')}>CSV</a></li>
              <li><a onClick={() => handleExportData('xml')}>XML</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Execution Status */}
      {executionData && (
        <div className="p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon(executionData.status)}
              <div>
                <span className="font-semibold">Execution Status: </span>
                <span className={`badge ${getStatusColor(executionData.status)}`}>
                  {executionData.status}
                </span>
              </div>
              <div>
                <span className="font-semibold">Messages: </span>
                <span>{executionData.messages.length}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <span className="font-semibold">Started: </span>
                <span>{executionData.startTime.toLocaleTimeString()}</span>
              </div>
              {executionData.endTime && (
                <div>
                  <span className="font-semibold">Finished: </span>
                  <span>{executionData.endTime.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Tabs */}
      <div className="flex border-b border-base-300 bg-base-200">
        <button
          onClick={() => setActiveView('execution')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'execution' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-base-content/70 hover:text-base-content'
          }`}
        >
          <TestTube className="w-4 h-4 inline mr-2" />
          Execution
        </button>
        <button
          onClick={() => setActiveView('logs')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'logs' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-base-content/70 hover:text-base-content'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Enhanced Logs
        </button>
        <button
          onClick={() => setActiveView('layers')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'layers' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-base-content/70 hover:text-base-content'
          }`}
        >
          <Layers className="w-4 h-4 inline mr-2" />
          Layer Trace
        </button>
        <button
          onClick={() => setActiveView('analytics')}
          className={`px-4 py-2 text-sm font-medium ${
            activeView === 'analytics' 
              ? 'border-b-2 border-primary text-primary' 
              : 'text-base-content/70 hover:text-base-content'
          }`}
        >
          <BarChart3 className="w-4 h-4 inline mr-2" />
          Analytics
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'execution' && renderExecutionView()}
        {activeView === 'logs' && renderLogsView()}
        {activeView === 'layers' && renderLayersView()}
        {activeView === 'analytics' && renderAnalyticsView()}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t border-base-300 bg-base-200 text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-base-content/30'}`}></div>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
          <span>Messages: {executionData?.messages.length || 0}</span>
          <span>Layer: {selectedLayer}</span>
          {faultInjection && <span className="text-warning">Fault Injection: ON</span>}
        </div>
        <div className="flex items-center gap-4">
          <span>Last update: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default TestExecutionIntegration