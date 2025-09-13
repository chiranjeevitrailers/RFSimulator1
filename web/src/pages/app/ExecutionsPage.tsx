import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { 
  Play, 
  Eye, 
  Download, 
  Trash2, 
  Filter, 
  Search, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Zap
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../../components/auth/AuthProvider'
import { ExecutionResults } from '../../components/execution/ExecutionResults'
import LoadingSpinner from '../../components/common/LoadingSpinner'

export const ExecutionsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const [selectedExecution, setSelectedExecution] = useState<string | null>(null)
  const { user } = useAuth()

  // Check if we should show a specific execution
  useEffect(() => {
    const executionId = searchParams.get('execution')
    if (executionId) {
      setSelectedExecution(executionId)
    }
  }, [searchParams])

  // Fetch executions
  const { data: executions, isLoading, refetch } = useQuery({
    queryKey: ['executions', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      const { data, error } = await supabase
        .from('executions')
        .select(`
          *,
          test_cases (
            title,
            complexity,
            test_suites (
              name,
              suite_type
            )
          )
        `)
        .eq('run_by', user.id)
        .order('started_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  const filteredExecutions = executions?.filter(execution => {
    const matchesSearch = execution.test_cases.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.test_cases.test_suites.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || execution.status === statusFilter
    
    const matchesDate = (() => {
      if (dateFilter === 'all') return true
      const executionDate = new Date(execution.started_at)
      const now = new Date()
      
      switch (dateFilter) {
        case 'today':
          return executionDate.toDateString() === now.toDateString()
        case 'week':
          return executionDate > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        case 'month':
          return executionDate > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        default:
          return true
      }
    })()
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-error" />
      case 'RUNNING':
        return <Clock className="w-5 h-5 text-warning animate-spin" />
      case 'CANCELLED':
        return <AlertCircle className="w-5 h-5 text-base-content/50" />
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic':
        return 'badge-success'
      case 'intermediate':
        return 'badge-warning'
      case 'advanced':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const formatDuration = (startedAt: string, finishedAt: string | null) => {
    const start = new Date(startedAt)
    const end = finishedAt ? new Date(finishedAt) : new Date()
    const duration = end.getTime() - start.getTime()
    
    if (duration < 1000) return '< 1s'
    if (duration < 60000) return `${Math.round(duration / 1000)}s`
    return `${Math.round(duration / 60000)}m`
  }

  // If showing specific execution results
  if (selectedExecution) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Execution Results</h1>
            <p className="text-base-content/70">
              Detailed analysis of test execution results
            </p>
          </div>
          <button 
            onClick={() => setSelectedExecution(null)}
            className="btn btn-outline"
          >
            Back to Executions
          </button>
        </div>
        
        <ExecutionResults executionId={selectedExecution} />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Test Executions 📊
              </h1>
              <p className="text-base-content/70 text-lg">
                Monitor and analyze your test execution history and results
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <BarChart3 className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">{executions?.length || 0}</div>
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
                <div className="font-semibold">
                  {executions?.filter(e => e.status === 'PASSED').length || 0}
                </div>
                <div className="text-sm text-base-content/70">Passed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <XCircle className="w-5 h-5 text-error" />
              </div>
              <div>
                <div className="font-semibold">
                  {executions?.filter(e => e.status === 'FAILED').length || 0}
                </div>
                <div className="text-sm text-base-content/70">Failed</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="font-semibold">
                  {executions?.filter(e => e.status === 'RUNNING').length || 0}
                </div>
                <div className="text-sm text-base-content/70">Running</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
          <input
            type="text"
            placeholder="Search executions..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline">
            <Filter size={16} />
            Status
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setStatusFilter('all')}>All Status</a></li>
            <li><a onClick={() => setStatusFilter('PASSED')}>Passed</a></li>
            <li><a onClick={() => setStatusFilter('FAILED')}>Failed</a></li>
            <li><a onClick={() => setStatusFilter('RUNNING')}>Running</a></li>
            <li><a onClick={() => setStatusFilter('CANCELLED')}>Cancelled</a></li>
          </ul>
        </div>
        
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline">
            <Calendar size={16} />
            Date
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a onClick={() => setDateFilter('all')}>All Time</a></li>
            <li><a onClick={() => setDateFilter('today')}>Today</a></li>
            <li><a onClick={() => setDateFilter('week')}>This Week</a></li>
            <li><a onClick={() => setDateFilter('month')}>This Month</a></li>
          </ul>
        </div>
      </div>

      {/* Executions List */}
      <div className="space-y-4">
        {filteredExecutions?.map((execution) => (
          <div key={execution.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(execution.status)}
                    <h3 className="text-lg font-semibold">{execution.test_cases.title}</h3>
                    <div className={`badge ${getStatusColor(execution.status)}`}>
                      {execution.status}
                    </div>
                    <div className={`badge ${getComplexityColor(execution.test_cases.complexity)}`}>
                      {execution.test_cases.complexity}
                    </div>
                    {execution.fault_injected && (
                      <div className="badge badge-warning">Fault Injected</div>
                    )}
                  </div>
                  
                  <div className="text-sm text-base-content/70 mb-3">
                    <span className="font-medium">{execution.test_cases.test_suites.name}</span>
                    <span className="mx-2">•</span>
                    <span>{execution.test_cases.test_suites.suite_type}</span>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-base-content/50">
                    <span>Started: {new Date(execution.started_at).toLocaleString()}</span>
                    {execution.finished_at && (
                      <span>Duration: {formatDuration(execution.started_at, execution.finished_at)}</span>
                    )}
                    {execution.summary && (
                      <span>Success Rate: {execution.summary.successRate}%</span>
                    )}
                  </div>
                  
                  {execution.summary && (
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <span className="text-success">✓ {execution.summary.passedSteps} passed</span>
                      {execution.summary.failedSteps > 0 && (
                        <span className="text-error">✗ {execution.summary.failedSteps} failed</span>
                      )}
                      <span className="text-base-content/50">{execution.summary.totalSteps} total steps</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedExecution(execution.id)}
                    className="btn btn-ghost btn-sm"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="btn btn-ghost btn-sm">
                    <Download size={16} />
                  </button>
                  {execution.status === 'RUNNING' && (
                    <button className="btn btn-error btn-sm">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExecutions?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">No executions found</h3>
          <p className="text-base-content/70 mb-4">
            {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your search terms or filters.'
              : 'Start by running your first test case from the Test Suites page.'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && dateFilter === 'all' && (
            <a href="/app/test-suites" className="btn btn-primary">
              <Play size={16} />
              Browse Test Suites
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default ExecutionsPage