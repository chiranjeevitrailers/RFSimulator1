import React, { useState } from 'react'
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
  AlertCircle
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../../hooks/useAuth'

export const ExecutionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('all')
  const { user } = useAuth()

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

  // Mock data for demonstration
  const mockExecutions = [
    {
      id: '1',
      test_cases: {
        title: 'Basic Attach Procedure',
        complexity: 'basic',
        test_suites: { name: 'Functional Tests', suite_type: 'functional' }
      },
      status: 'PASSED',
      started_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      finished_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
      fault_injected: false,
      summary: {
        totalSteps: 4,
        passedSteps: 4,
        failedSteps: 0,
        successRate: 100
      }
    },
    {
      id: '2',
      test_cases: {
        title: 'Intra-eNB Handover',
        complexity: 'intermediate',
        test_suites: { name: 'Mobility Tests', suite_type: 'mobility' }
      },
      status: 'RUNNING',
      started_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      finished_at: null,
      fault_injected: false,
      summary: null
    },
    {
      id: '3',
      test_cases: {
        title: 'IMS Registration',
        complexity: 'advanced',
        test_suites: { name: 'IMS Tests', suite_type: 'ims' }
      },
      status: 'FAILED',
      started_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      finished_at: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 3).toISOString(),
      fault_injected: true,
      summary: {
        totalSteps: 6,
        passedSteps: 4,
        failedSteps: 2,
        successRate: 66.7
      }
    },
    {
      id: '4',
      test_cases: {
        title: 'O-RAN F1 Setup',
        complexity: 'intermediate',
        test_suites: { name: 'O-RAN Tests', suite_type: 'oran' }
      },
      status: 'CANCELLED',
      started_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      finished_at: new Date(Date.now() - 1000 * 60 * 60 * 24 + 1000 * 60 * 2).toISOString(),
      fault_injected: false,
      summary: {
        totalSteps: 3,
        passedSteps: 2,
        failedSteps: 0,
        successRate: 66.7
      }
    }
  ]

  const displayExecutions = executions || mockExecutions

  const filteredExecutions = displayExecutions.filter(execution => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Executions</h1>
        <p className="text-base-content/70">
          Monitor and analyze your test execution history and results.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
        {filteredExecutions.map((execution) => (
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
                  <button className="btn btn-ghost btn-sm">
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

      {filteredExecutions.length === 0 && (
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
            <button className="btn btn-primary">
              <Play size={16} />
              Browse Test Suites
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ExecutionsPage