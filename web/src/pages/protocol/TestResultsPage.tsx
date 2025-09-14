import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  BarChart3, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  TestTube,
  Play,
  Eye,
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
  Settings,
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
  AlertCircle
} from 'lucide-react'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

interface TestResultsFilters {
  status: string
  testSuite: string
  dateRange: string
  search: string
}

export const TestResultsPage: React.FC = () => {
  const [filters, setFilters] = useState<TestResultsFilters>({
    status: 'all',
    testSuite: 'all',
    dateRange: 'all',
    search: ''
  })
  const [selectedExecution, setSelectedExecution] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'analytics'>('overview')

  // Fetch user executions
  const { data: executions, isLoading: executionsLoading } = useQuery({
    queryKey: ['user-executions', filters],
    queryFn: () => TestExecutionAPI.getUserExecutions('current-user', 100)
  })

  // Fetch test suite stats
  const { data: testSuiteStats, isLoading: statsLoading } = useQuery({
    queryKey: ['test-suite-stats'],
    queryFn: () => TestSuitesAPI.getTestSuiteStats()
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

  const handleExportResults = () => {
    const data = {
      executions: executions,
      exportTime: new Date().toISOString(),
      filters: filters
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-test-results-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Test results exported successfully!')
  }

  const handleViewExecution = (execution: any) => {
    setSelectedExecution(execution)
  }

  const filteredExecutions = executions?.filter(execution => {
    const matchesStatus = filters.status === 'all' || execution.status === filters.status
    const matchesTestSuite = filters.testSuite === 'all' || 
      execution.test_cases?.test_suites?.suite_type === filters.testSuite
    const matchesSearch = filters.search === '' || 
      execution.test_cases?.title?.toLowerCase().includes(filters.search.toLowerCase())
    
    return matchesStatus && matchesTestSuite && matchesSearch
  }) || []

  if (executionsLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Results & Analytics</h1>
          <p className="text-base-content/70">
            Comprehensive analysis of test execution results and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExportResults} className="btn btn-outline">
            <Download className="w-4 h-4" />
            Export Results
          </button>
          <button className="btn btn-primary">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TestTube className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Total Executions</p>
                <p className="text-2xl font-bold">{executions?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Passed</p>
                <p className="text-2xl font-bold text-success">
                  {executions?.filter(e => e.status === 'PASSED').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <XCircle className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Failed</p>
                <p className="text-2xl font-bold text-error">
                  {executions?.filter(e => e.status === 'FAILED').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Activity className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold">
                  {executions?.length > 0 ? 
                    Math.round((executions.filter(e => e.status === 'PASSED').length / executions.length) * 100) 
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search test cases..."
                  className="input input-bordered w-full pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Filter className="w-4 h-4" />
                Status
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setFilters(prev => ({ ...prev, status: 'all' }))}>All Status</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, status: 'PASSED' }))}>Passed</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, status: 'FAILED' }))}>Failed</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, status: 'RUNNING' }))}>Running</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, status: 'CANCELLED' }))}>Cancelled</a></li>
              </ul>
            </div>

            {/* Test Suite Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <TestTube className="w-4 h-4" />
                Test Suite
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'all' }))}>All Suites</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'functional' }))}>Functional</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'performance' }))}>Performance</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'security' }))}>Security</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'oran' }))}>O-RAN</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'nbiot' }))}>NB-IoT</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'v2x' }))}>V2X</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, testSuite: 'ntn' }))}>NTN</a></li>
              </ul>
            </div>

            {/* View Mode */}
            <div className="btn-group">
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`btn ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredExecutions.map((execution) => (
          <div key={execution.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(execution.status)}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {execution.test_cases?.title || 'Unknown Test Case'}
                    </h3>
                    <p className="text-sm text-base-content/70">
                      {execution.test_cases?.test_suites?.name || 'Unknown Suite'} • 
                      {execution.test_cases?.complexity && (
                        <span className={`badge ${getComplexityColor(execution.test_cases.complexity)} ml-2`}>
                          {execution.test_cases.complexity}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`badge ${getStatusColor(execution.status)}`}>
                    {execution.status}
                  </span>
                  <div className="text-sm text-base-content/70">
                    {new Date(execution.started_at).toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleViewExecution(execution)}
                    className="btn btn-ghost btn-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Execution Details */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration: </span>
                  <span>
                    {execution.finished_at ? 
                      Math.round((new Date(execution.finished_at).getTime() - new Date(execution.started_at).getTime()) / 1000) 
                      : 'Running'}s
                  </span>
                </div>
                <div>
                  <span className="font-medium">Test Suite: </span>
                  <span>{execution.test_cases?.test_suites?.suite_type || 'Unknown'}</span>
                </div>
                <div>
                  <span className="font-medium">3GPP Reference: </span>
                  <span>{execution.test_cases?.threegpp_ref || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExecutions.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No test results found</h3>
          <p className="text-base-content/70 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button 
            onClick={() => setFilters({ status: 'all', testSuite: 'all', dateRange: 'all', search: '' })}
            className="btn btn-outline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Execution Details Modal */}
      {selectedExecution && (
        <div className="modal modal-open">
          <div className="modal-box max-w-6xl">
            <h3 className="font-bold text-lg mb-4">
              Execution Details: {selectedExecution.test_cases?.title}
            </h3>
            
            <div className="tabs tabs-boxed mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`tab ${activeTab === 'details' ? 'tab-active' : ''}`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`tab ${activeTab === 'analytics' ? 'tab-active' : ''}`}
              >
                Analytics
              </button>
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-lg">Execution Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className={`badge ${getStatusColor(selectedExecution.status)}`}>
                            {selectedExecution.status}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Started:</span>
                          <span>{new Date(selectedExecution.started_at).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Finished:</span>
                          <span>
                            {selectedExecution.finished_at ? 
                              new Date(selectedExecution.finished_at).toLocaleString() : 
                              'Still running'
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>
                            {selectedExecution.finished_at ? 
                              Math.round((new Date(selectedExecution.finished_at).getTime() - new Date(selectedExecution.started_at).getTime()) / 1000) 
                              : 'Running'}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-lg">Test Case Info</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Test Suite:</span>
                          <span>{selectedExecution.test_cases?.test_suites?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Complexity:</span>
                          <span className={`badge ${getComplexityColor(selectedExecution.test_cases?.complexity || 'basic')}`}>
                            {selectedExecution.test_cases?.complexity || 'Unknown'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>3GPP Reference:</span>
                          <span>{selectedExecution.test_cases?.threegpp_ref || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Duration:</span>
                          <span>{selectedExecution.test_cases?.expected_duration || 'N/A'}s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-lg">Test Case Description</h4>
                    <p className="text-sm text-base-content/70">
                      {selectedExecution.test_cases?.description || 'No description available'}
                    </p>
                  </div>
                </div>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="card-title text-lg">Default Parameters</h4>
                    <pre className="bg-base-100 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(selectedExecution.test_cases?.default_parameters || {}, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-lg">Performance Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Execution Time:</span>
                          <span>
                            {selectedExecution.finished_at ? 
                              Math.round((new Date(selectedExecution.finished_at).getTime() - new Date(selectedExecution.started_at).getTime()) / 1000) 
                              : 'Running'}s
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Time:</span>
                          <span>{selectedExecution.test_cases?.expected_duration || 'N/A'}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span>
                            {selectedExecution.finished_at && selectedExecution.test_cases?.expected_duration ? 
                              Math.round((selectedExecution.test_cases.expected_duration / 
                                Math.round((new Date(selectedExecution.finished_at).getTime() - new Date(selectedExecution.started_at).getTime()) / 1000)) * 100) 
                              : 'N/A'}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-base-200">
                    <div className="card-body">
                      <h4 className="card-title text-lg">Test Suite Statistics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Executions:</span>
                          <span>{executions?.length || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Success Rate:</span>
                          <span>
                            {executions?.length > 0 ? 
                              Math.round((executions.filter(e => e.status === 'PASSED').length / executions.length) * 100) 
                              : 0}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Average Duration:</span>
                          <span>
                            {executions?.length > 0 ? 
                              Math.round(executions.reduce((sum, e) => {
                                if (e.finished_at) {
                                  return sum + (new Date(e.finished_at).getTime() - new Date(e.started_at).getTime()) / 1000
                                }
                                return sum
                              }, 0) / executions.length) 
                              : 0}s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="modal-action">
              <button 
                onClick={() => setSelectedExecution(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  window.open(`/app/protocol/test-execution?executionId=${selectedExecution.id}`, '_blank')
                }}
                className="btn btn-primary"
              >
                <ExternalLink className="w-4 h-4" />
                View Execution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestResultsPage