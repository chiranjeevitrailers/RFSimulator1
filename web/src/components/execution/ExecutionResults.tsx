import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Download, 
  Share, 
  Eye, 
  Filter, 
  Search, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Zap
} from 'lucide-react'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import { supabase } from '../../lib/supabase/client'
import LoadingSpinner from '../common/LoadingSpinner'

interface ExecutionResultsProps {
  executionId: string
}

export const ExecutionResults: React.FC<ExecutionResultsProps> = ({ executionId }) => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch execution results
  const { data: executionResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['execution-results', executionId],
    queryFn: () => TestExecutionAPI.getExecutionResults(executionId)
  })

  // Fetch execution details from database
  const { data: executionDetails, isLoading: detailsLoading } = useQuery({
    queryKey: ['execution-details', executionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('executions')
        .select(`
          *,
          test_cases (
            title,
            complexity,
            description,
            test_suites (
              name,
              suite_type
            )
          )
        `)
        .eq('id', executionId)
        .single()
      
      if (error) throw error
      return data
    }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-error" />
      case 'CANCELLED':
        return <AlertTriangle className="w-5 h-5 text-warning" />
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
      case 'CANCELLED':
        return 'badge-warning'
      default:
        return 'badge-neutral'
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'PASS':
        return 'badge-success'
      case 'FAIL':
        return 'badge-error'
      case 'INCONCLUSIVE':
        return 'badge-warning'
      default:
        return 'badge-neutral'
    }
  }

  const filteredMessages = executionResults?.messages?.filter((message: any) => {
    const matchesLayer = selectedLayer === 'all' || message.layer === selectedLayer
    const matchesSearch = !searchTerm || 
      message.messageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.layer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesLayer && matchesSearch
  }) || []

  const handleExport = () => {
    const data = {
      execution: executionDetails,
      results: executionResults,
      exportTime: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-execution-${executionId}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (resultsLoading || detailsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!executionResults || !executionDetails) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Execution Not Found</h3>
        <p className="text-base-content/70">
          The requested execution could not be found or you don't have permission to view it.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Execution Summary */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(executionResults.status)}
              <div>
                <h1 className="text-2xl font-bold">{executionDetails.test_cases?.title}</h1>
                <p className="text-base-content/70">
                  {executionDetails.test_cases?.test_suites?.name} • 
                  {executionDetails.test_cases?.complexity}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={`badge ${getStatusColor(executionResults.status)}`}>
                {executionResults.status}
              </div>
              <button onClick={handleExport} className="btn btn-outline btn-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="btn btn-outline btn-sm">
                <Share className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="stat">
              <div className="stat-title">Duration</div>
              <div className="stat-value text-primary">{executionResults.duration}s</div>
              <div className="stat-desc">
                {new Date(executionResults.startedAt).toLocaleString()} - 
                {new Date(executionResults.finishedAt).toLocaleString()}
              </div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Total Steps</div>
              <div className="stat-value text-secondary">{executionResults.totalSteps}</div>
              <div className="stat-desc">
                {executionResults.passedSteps} passed, {executionResults.failedSteps} failed
              </div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Success Rate</div>
              <div className="stat-value text-success">
                {Math.round((executionResults.passedSteps / executionResults.totalSteps) * 100)}%
              </div>
              <div className="stat-desc">Overall performance</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Messages</div>
              <div className="stat-value text-info">{executionResults.messages.length}</div>
              <div className="stat-desc">Protocol messages captured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Summary */}
      {executionResults.summary && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Test Summary</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(executionResults.summary).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  {value ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-error" />
                  )}
                  <div>
                    <div className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {value ? 'Success' : 'Failed'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Message Analysis */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Message Analysis</h2>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={16} />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="input input-bordered input-sm pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Message List */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold mb-3">Message Flow</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMessages.map((message, index) => (
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
                      <span className="text-xs opacity-70">#{index + 1}</span>
                    </div>
                    <div className="text-xs opacity-70 mb-1">
                      {message.layer} • {message.direction}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge badge-xs ${getVerdictColor(message.verdict)}`}>
                        {message.verdict}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-3">Message Details</h3>
              
              {selectedMessage ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Message Information</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong>Type:</strong> {selectedMessage.messageType}</div>
                        <div><strong>Layer:</strong> {selectedMessage.layer}</div>
                        <div><strong>Direction:</strong> {selectedMessage.direction}</div>
                        <div><strong>Timestamp:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</div>
                        <div><strong>Verdict:</strong> 
                          <span className={`badge ${getVerdictColor(selectedMessage.verdict)} ml-2`}>
                            {selectedMessage.verdict}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Correlation Keys</h4>
                      <div className="space-y-1 text-sm">
                        {selectedMessage.correlationKeys && Object.entries(selectedMessage.correlationKeys).map(([key, value]) => (
                          <div key={key}><strong>{key}:</strong> {String(value)}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Raw Message</h4>
                    <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                      {selectedMessage.rawLog}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Parsed Message</h4>
                    <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedMessage.parsedMessage, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-base-content/50">
                  <div className="text-center">
                    <Eye className="w-12 h-12 mx-auto mb-2" />
                    <p>Select a message to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{executionResults.duration}s</div>
              <div className="text-sm text-base-content/70">Total Duration</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <MessageSquare className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {executionResults.messages.length > 0 
                  ? Math.round(executionResults.duration / executionResults.messages.length * 100) / 100
                  : 0
                }s
              </div>
              <div className="text-sm text-base-content/70">Avg per Message</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <Zap className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">
                {executionResults.messages.length > 0 
                  ? Math.round(executionResults.messages.length / executionResults.duration * 100) / 100
                  : 0
                }
              </div>
              <div className="text-sm text-base-content/70">Messages/sec</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutionResults