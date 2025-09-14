import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  TestTube, 
  Play, 
  Eye, 
  Filter, 
  Search, 
  Settings, 
  Download, 
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Activity,
  BarChart3,
  FileText,
  Code,
  Database,
  Network,
  Cpu,
  Radio,
  Smartphone,
  Car,
  Satellite,
  Globe,
  Shield,
  Star,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share
} from 'lucide-react'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

interface TestSuiteFilters {
  suiteType: string
  complexity: string
  search: string
  threegppRelease: string
}

export const TestSuitesPage: React.FC = () => {
  const [filters, setFilters] = useState<TestSuiteFilters>({
    suiteType: 'all',
    complexity: 'all',
    search: '',
    threegppRelease: 'all'
  })
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set())
  const [selectedTestCase, setSelectedTestCase] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { canExecute } = useSimpleBilling()
  const queryClient = useQueryClient()

  // Fetch test suites
  const { data: testSuites, isLoading: suitesLoading } = useQuery({
    queryKey: ['test-suites', filters.suiteType, filters.threegppRelease, filters.search],
    queryFn: () => TestSuitesAPI.getTestSuites({
      suiteType: filters.suiteType === 'all' ? undefined : filters.suiteType,
      threegppRelease: filters.threegppRelease === 'all' ? undefined : filters.threegppRelease,
      search: filters.search || undefined
    })
  })

  // Fetch test cases for expanded suites
  const { data: testCases, isLoading: casesLoading } = useQuery({
    queryKey: ['test-cases', Array.from(expandedSuites), filters.complexity, filters.search],
    queryFn: async () => {
      if (expandedSuites.size === 0) return []
      
      const allCases = await Promise.all(
        Array.from(expandedSuites).map(suiteId => 
          TestSuitesAPI.getTestCases(suiteId, {
            complexity: filters.complexity === 'all' ? undefined : filters.complexity,
            search: filters.search || undefined
          })
        )
      )
      
      return allCases.flat()
    },
    enabled: expandedSuites.size > 0
  })

  // Execute test mutation
  const executeTestMutation = useMutation({
    mutationFn: (testCaseId: string) => TestExecutionAPI.executeTest({
      testCaseId,
      parameters: selectedTestCase?.default_parameters,
      simulateFault: false
    }),
    onSuccess: (data) => {
      toast.success('Test execution started!')
      // Navigate to test execution page
      window.location.href = `/app/protocol/test-execution?executionId=${data.id}`
    },
    onError: (error) => {
      toast.error('Failed to start test execution')
      console.error('Execution error:', error)
    }
  })

  const getSuiteIcon = (suiteType: string) => {
    switch (suiteType) {
      case 'functional':
        return <TestTube className="w-5 h-5 text-primary" />
      case 'mobility':
        return <Activity className="w-5 h-5 text-secondary" />
      case 'performance':
        return <Zap className="w-5 h-5 text-warning" />
      case 'security':
        return <Shield className="w-5 h-5 text-error" />
      case 'ims':
        return <Globe className="w-5 h-5 text-info" />
      case 'oran':
        return <Network className="w-5 h-5 text-accent" />
      case 'nbiot':
        return <Smartphone className="w-5 h-5 text-success" />
      case 'v2x':
        return <Car className="w-5 h-5 text-warning" />
      case 'ntn':
        return <Satellite className="w-5 h-5 text-info" />
      default:
        return <TestTube className="w-5 h-5 text-base-content" />
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

  const toggleSuite = (suiteId: string) => {
    const newExpanded = new Set(expandedSuites)
    if (newExpanded.has(suiteId)) {
      newExpanded.delete(suiteId)
    } else {
      newExpanded.add(suiteId)
    }
    setExpandedSuites(newExpanded)
  }

  const handleExecuteTest = (testCase: any) => {
    if (!canExecute) {
      toast.error('You have reached your execution quota limit. Please upgrade your plan.')
      return
    }
    
    setSelectedTestCase(testCase)
    executeTestMutation.mutate(testCase.id)
  }

  const handleViewTest = (testCase: any) => {
    setSelectedTestCase(testCase)
  }

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Database className="w-4 h-4" /> },
    { id: 'functional', name: 'Functional', icon: <TestTube className="w-4 h-4" /> },
    { id: 'performance', name: 'Performance', icon: <Activity className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'interop', name: 'Interoperability', icon: <Globe className="w-4 h-4" /> },
    { id: 'stress', name: 'Stress Testing', icon: <Zap className="w-4 h-4" /> }
  ]

  const protocols = [
    { id: 'all', name: 'All Protocols', icon: <Network className="w-4 h-4" /> },
    { id: '5g', name: '5G Core', icon: <Cpu className="w-4 h-4" /> },
    { id: '4g', name: '4G/LTE', icon: <Network className="w-4 h-4" /> },
    { id: 'oran', name: 'ORAN', icon: <Radio className="w-4 h-4" /> },
    { id: 'nbiot', name: 'NBIoT', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'v2x', name: 'V2X', icon: <Car className="w-4 h-4" /> },
    { id: 'ntn', name: 'NTN', icon: <Satellite className="w-4 h-4" /> },
    { id: 'ims', name: 'IMS', icon: <Globe className="w-4 h-4" /> }
  ]

  if (suitesLoading) {
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
          <h1 className="text-3xl font-bold">Test Suites Library</h1>
          <p className="text-base-content/70">
            Comprehensive collection of 5G/4G protocol test cases and validation suites
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Create Test Suite
          </button>
          <button className="btn btn-outline">
            <Upload className="w-4 h-4" />
            Import
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search test suites, tags, or descriptions..."
                  className="input input-bordered w-full pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, suiteType: category.id }))}
                      className={`flex items-center gap-2 ${filters.suiteType === category.id ? 'active' : ''}`}
                    >
                      {category.icon}
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Protocol Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Network className="w-4 h-4" />
                Protocol
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {protocols.map(protocol => (
                  <li key={protocol.id}>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, threegppRelease: protocol.id }))}
                      className={`flex items-center gap-2 ${filters.threegppRelease === protocol.id ? 'active' : ''}`}
                    >
                      {protocol.icon}
                      {protocol.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* View Mode */}
            <div className="btn-group">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-base-content/70">
          Showing {testSuites?.length || 0} test suites
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-success" />
            {testSuites?.filter(s => s.status === 'ready').length || 0} Ready
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-warning" />
            {testSuites?.filter(s => s.status === 'running').length || 0} Running
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-error" />
            {testSuites?.filter(s => s.status === 'failed').length || 0} Failed
          </span>
        </div>
      </div>

      {/* Test Suites */}
      <div className="space-y-4">
        {testSuites?.map((suite) => (
          <div key={suite.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleSuite(suite.id)}
                    className="btn btn-ghost btn-sm"
                  >
                    {expandedSuites.has(suite.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {getSuiteIcon(suite.suite_type)}
                  
                  <div>
                    <h3 className="text-lg font-semibold">{suite.name}</h3>
                    <p className="text-sm text-base-content/70">{suite.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="badge badge-outline">
                    {suite.suite_type}
                  </div>
                  <div className="badge badge-neutral">
                    {suite.threegpp_release}
                  </div>
                </div>
              </div>
              
              {/* Test Cases (when expanded) */}
              {expandedSuites.has(suite.id) && (
                <div className="mt-4 border-t border-base-300 pt-4">
                  {casesLoading ? (
                    <div className="flex items-center justify-center p-4">
                      <LoadingSpinner size="sm" />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {testCases
                        ?.filter(testCase => testCase.suite_id === suite.id)
                        .map((testCase) => (
                          <div key={testCase.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <TestTube className="w-4 h-4 text-base-content/50" />
                              <div>
                                <h4 className="font-medium">{testCase.title}</h4>
                                <p className="text-sm text-base-content/70">
                                  {testCase.threegpp_ref} • {testCase.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <div className={`badge ${getComplexityColor(testCase.complexity)}`}>
                                {testCase.complexity}
                              </div>
                              
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleViewTest(testCase)}
                                  className="btn btn-ghost btn-sm"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                                
                                <button
                                  onClick={() => handleExecuteTest(testCase)}
                                  className="btn btn-primary btn-sm"
                                  disabled={!canExecute || executeTestMutation.isPending}
                                >
                                  {executeTestMutation.isPending ? (
                                    <LoadingSpinner size="sm" />
                                  ) : (
                                    <Play className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      
                      {testCases?.filter(testCase => testCase.suite_id === suite.id).length === 0 && (
                        <div className="text-center py-4 text-base-content/50">
                          No test cases found matching your filters.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {testSuites?.length === 0 && (
        <div className="text-center py-12">
          <TestTube className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No test suites found</h3>
          <p className="text-base-content/70 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button 
            onClick={() => setFilters({ suiteType: 'all', complexity: 'all', search: '', threegppRelease: 'all' })}
            className="btn btn-outline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Test Case Details Modal */}
      {selectedTestCase && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">{selectedTestCase.title}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Test Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>3GPP Reference:</strong> {selectedTestCase.threegpp_ref}</div>
                    <div><strong>Complexity:</strong> 
                      <span className={`badge ${getComplexityColor(selectedTestCase.complexity)} ml-2`}>
                        {selectedTestCase.complexity}
                      </span>
                    </div>
                    <div><strong>Expected Duration:</strong> {selectedTestCase.expected_duration}s</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-base-content/70">{selectedTestCase.description}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Default Parameters</h4>
                <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedTestCase.default_parameters, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setSelectedTestCase(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setSelectedTestCase(null)
                  handleExecuteTest(selectedTestCase)
                }}
                className="btn btn-primary"
                disabled={!canExecute || executeTestMutation.isPending}
              >
                <Play className="w-4 h-4" />
                Execute Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestSuitesPage