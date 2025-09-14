import React, { useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { 
  Play, 
  Pause, 
  Square, 
  Settings, 
  Download, 
  Share, 
  Eye, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Zap,
  TestTube,
  BarChart3,
  Layers,
  FileText,
  Network,
  Radio,
  MessageSquare,
  Database,
  Cpu,
  Server,
  Router,
  Cloud,
  GitBranch,
  Activity,
  TrendingUp,
  AlertCircle,
  Info,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  RefreshCw,
  Save,
  Trash2,
  Edit,
  Copy,
  Target,
  Gauge,
  Monitor
} from 'lucide-react'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

interface TestExecutionEngineProps {
  executionId?: string
}

export const TestExecutionPage: React.FC<TestExecutionEngineProps> = () => {
  const [searchParams] = useSearchParams()
  const executionId = searchParams.get('executionId')
  
  const [isRunning, setIsRunning] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [currentExecutionId, setCurrentExecutionId] = useState<string | null>(executionId)
  const [executionStatus, setExecutionStatus] = useState<any>(null)
  const [faultInjection, setFaultInjection] = useState(false)
  const [customParameters, setCustomParameters] = useState<any>({})
  const [selectedTestCase, setSelectedTestCase] = useState<any>(null)
  const [testCaseSteps, setTestCaseSteps] = useState<any[]>([])
  const [activeView, setActiveView] = useState<'execution' | 'logs' | 'layers' | 'analytics'>('execution')
  
  const { canExecute } = useSimpleBilling()
  const queryClient = useQueryClient()
  const statusIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch execution status if executionId is provided
  const { data: executionData, isLoading: executionLoading } = useQuery({
    queryKey: ['execution', currentExecutionId],
    queryFn: () => currentExecutionId ? TestExecutionAPI.getExecutionStatus(currentExecutionId) : null,
    enabled: !!currentExecutionId,
    refetchInterval: 2000
  })

  // Fetch execution results
  const { data: executionResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['execution-results', currentExecutionId],
    queryFn: () => currentExecutionId ? TestExecutionAPI.getExecutionResults(currentExecutionId) : null,
    enabled: !!currentExecutionId && executionData?.status === 'PASSED' || executionData?.status === 'FAILED'
  })

  // Execute test mutation
  const executeTestMutation = useMutation({
    mutationFn: (params: any) => TestExecutionAPI.executeTest(params),
    onSuccess: (data) => {
      setCurrentExecutionId(data.id)
      setIsRunning(true)
      toast.success('Test execution started!')
      startStatusPolling(data.id)
    },
    onError: (error) => {
      toast.error('Failed to start test execution')
      console.error('Execution error:', error)
    }
  })

  // Cancel execution mutation
  const cancelExecutionMutation = useMutation({
    mutationFn: (execId: string) => TestExecutionAPI.cancelExecution(execId),
    onSuccess: () => {
      setIsRunning(false)
      setCurrentExecutionId(null)
      setExecutionStatus(null)
      toast.success('Test execution cancelled')
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
      }
    },
    onError: (error) => {
      toast.error('Failed to cancel execution')
      console.error('Cancel error:', error)
    }
  })

  // Start status polling
  const startStatusPolling = (execId: string) => {
    if (statusIntervalRef.current) {
      clearInterval(statusIntervalRef.current)
    }

    statusIntervalRef.current = setInterval(async () => {
      try {
        const status = await TestExecutionAPI.getExecutionStatus(execId)
        setExecutionStatus(status)
        
        // Update messages with new ones
        if (status.messages) {
          setMessages(prev => {
            const newMessages = status.messages.filter((msg: any) => 
              !prev.some(prevMsg => prevMsg.id === msg.id)
            )
            return [...prev, ...newMessages]
          })
        }

        // Check if execution is complete
        if (status.status === 'PASSED' || status.status === 'FAILED' || status.status === 'CANCELLED') {
          setIsRunning(false)
          if (statusIntervalRef.current) {
            clearInterval(statusIntervalRef.current)
          }
          
          // Fetch final results
          try {
            const results = await TestExecutionAPI.getExecutionResults(execId)
            setMessages(results.messages || [])
            toast.success(`Test execution ${status.status.toLowerCase()}!`)
          } catch (error) {
            console.error('Error fetching final results:', error)
          }
        }
      } catch (error) {
        console.error('Error polling execution status:', error)
      }
    }, 2000)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
      }
    }
  }, [])

  // Handle test execution
  const handleStart = async () => {
    if (!selectedTestCase) {
      toast.error('No test case selected')
      return
    }

    if (!canExecute) {
      toast.error('You have reached your execution quota limit. Please upgrade your plan.')
      return
    }

    const executionParams = {
      testCaseId: selectedTestCase.id,
      parameters: {
        ...selectedTestCase?.default_parameters,
        ...customParameters
      },
      simulateFault: faultInjection
    }

    executeTestMutation.mutate(executionParams)
  }

  const handleStop = () => {
    if (currentExecutionId) {
      cancelExecutionMutation.mutate(currentExecutionId)
    }
  }

  const handleExport = () => {
    const data = {
      testCase: selectedTestCase,
      execution: executionStatus,
      messages: messages,
      exportTime: new Date().toISOString(),
      totalMessages: messages.length
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-execution-${currentExecutionId || 'test'}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredMessages = selectedLayer === 'all' 
    ? messages 
    : messages.filter(msg => msg.layer === selectedLayer)

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
            {messages.map((message, index) => (
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
      {['PHY', 'MAC', 'RLC', 'PDCP', 'RRC', 'NAS', 'S1AP', 'NGAP', 'SIP'].map((layer) => {
        const layerMessages = messages.filter(msg => msg.layer === layer)
        return (
          <div key={layer} className="card bg-base-100">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-2">
                {getLayerIcon(layer)}
                <h3 className="card-title text-lg">{layer} Layer</h3>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Messages: </span>
                  <span>{layerMessages.length}</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">Status: </span>
                  <span className={`badge badge-xs ${
                    layerMessages.length > 0 ? 'badge-success' : 'badge-neutral'
                  }`}>
                    {layerMessages.length > 0 ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {layerMessages.length > 0 && (
                  <div className="text-sm">
                    <span className="font-medium">Last Message: </span>
                    <span>{new Date(layerMessages[layerMessages.length - 1].timestamp).toLocaleTimeString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
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
                <span className="font-bold">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Passed:</span>
                <span className="font-bold text-success">
                  {messages.filter(m => m.verdict === 'PASS').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Failed:</span>
                <span className="font-bold text-error">
                  {messages.filter(m => m.verdict === 'FAIL').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-bold">
                  {messages.length > 0 ? 
                    Math.round((messages.filter(m => m.verdict === 'PASS').length / messages.length) * 100) 
                    : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Layer Distribution</h3>
            <div className="space-y-2">
              {['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP'].map((layer) => {
                const count = messages.filter(m => m.layer === layer).length
                return (
                  <div key={layer} className="flex justify-between">
                    <span>{layer}:</span>
                    <span className="font-bold">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title">Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-bold">
                  {executionStatus ? 
                    Math.round((Date.now() - new Date(executionStatus.startedAt).getTime()) / 1000) 
                    : 0}s
                </span>
              </div>
              <div className="flex justify-between">
                <span>Messages/sec:</span>
                <span className="font-bold">
                  {executionStatus && messages.length > 0 ? 
                    Math.round(messages.length / ((Date.now() - new Date(executionStatus.startedAt).getTime()) / 1000))
                    : 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (executionLoading) {
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
            {selectedTestCase ? `Test Execution: ${selectedTestCase.title}` : 'Protocol Test Execution'}
          </h1>
          
          <div className="flex items-center gap-2">
            <button
              onClick={isRunning ? handleStop : handleStart}
              className={`btn btn-sm ${isRunning ? 'btn-error' : 'btn-primary'}`}
              disabled={!selectedTestCase || !canExecute || executeTestMutation.isPending}
            >
              {executeTestMutation.isPending ? (
                <>
                  <LoadingSpinner size="sm" />
                  Starting...
                </>
              ) : isRunning ? (
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
          
          <button className="btn btn-ghost btn-sm">
            <Settings size={16} />
          </button>
          <button className="btn btn-ghost btn-sm">
            <Share size={16} />
          </button>
          <button onClick={handleExport} className="btn btn-ghost btn-sm">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Execution Status */}
      {executionStatus && (
        <div className="p-4 border-b border-base-300 bg-base-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {getStatusIcon(executionStatus.status)}
              <div>
                <span className="font-semibold">Execution Status: </span>
                <span className={`badge ${getStatusColor(executionStatus.status)}`}>
                  {executionStatus.status}
                </span>
              </div>
              <div>
                <span className="font-semibold">Progress: </span>
                <span>{executionStatus.currentStep} / {executionStatus.totalSteps}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div>
                <span className="font-semibold">Started: </span>
                <span>{new Date(executionStatus.startedAt).toLocaleTimeString()}</span>
              </div>
              {executionStatus.estimatedCompletion && (
                <div>
                  <span className="font-semibold">ETA: </span>
                  <span>{new Date(executionStatus.estimatedCompletion).toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-2">
            <progress 
              className="progress progress-primary w-full" 
              value={executionStatus.progress} 
              max="100"
            ></progress>
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
          <span>Messages: {messages.length}</span>
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

export default TestExecutionPage