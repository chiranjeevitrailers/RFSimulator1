import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Search, 
  Filter, 
  Play, 
  Eye, 
  Star, 
  Clock, 
  Users,
  ChevronDown,
  ChevronRight,
  TestTube,
  Zap,
  Shield,
  Globe,
  Car,
  Satellite,
  Wifi
} from 'lucide-react'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import { useBilling } from '../billing/BillingProvider'
import LoadingSpinner from '../common/LoadingSpinner'

interface TestSuiteFilters {
  suiteType: string
  complexity: string
  search: string
  threegppRelease: string
}

export const TestSuiteBrowser: React.FC = () => {
  const [filters, setFilters] = useState<TestSuiteFilters>({
    suiteType: 'all',
    complexity: 'all',
    search: '',
    threegppRelease: 'all'
  })
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set())
  const [selectedTestCase, setSelectedTestCase] = useState<any>(null)
  const { canExecute } = useBilling()

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

  const getSuiteIcon = (suiteType: string) => {
    switch (suiteType) {
      case 'functional':
        return <TestTube className="w-5 h-5 text-primary" />
      case 'mobility':
        return <Users className="w-5 h-5 text-secondary" />
      case 'performance':
        return <Zap className="w-5 h-5 text-warning" />
      case 'security':
        return <Shield className="w-5 h-5 text-error" />
      case 'ims':
        return <Globe className="w-5 h-5 text-info" />
      case 'oran':
        return <Wifi className="w-5 h-5 text-accent" />
      case 'nbiot':
        return <Satellite className="w-5 h-5 text-success" />
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
      alert('You have reached your execution quota limit. Please upgrade your plan.')
      return
    }
    
    // Navigate to analyzer with test case
    window.location.href = `/app/analyzer?testCase=${testCase.id}`
  }

  const handleViewTest = (testCase: any) => {
    setSelectedTestCase(testCase)
  }

  if (suitesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
                <input
                  type="text"
                  placeholder="Search test suites and cases..."
                  className="input input-bordered w-full pl-10"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Filter size={16} />
                Suite Type
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'all' }))}>All Types</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'functional' }))}>Functional</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'mobility' }))}>Mobility</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'performance' }))}>Performance</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'security' }))}>Security</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'ims' }))}>IMS</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'oran' }))}>O-RAN</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'nbiot' }))}>NB-IoT</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'v2x' }))}>V2X</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, suiteType: 'ntn' }))}>NTN</a></li>
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Star size={16} />
                Complexity
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setFilters(prev => ({ ...prev, complexity: 'all' }))}>All Levels</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, complexity: 'basic' }))}>Basic</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, complexity: 'intermediate' }))}>Intermediate</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, complexity: 'advanced' }))}>Advanced</a></li>
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Clock size={16} />
                3GPP Release
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setFilters(prev => ({ ...prev, threegppRelease: 'all' }))}>All Releases</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, threegppRelease: 'Release 15' }))}>Release 15</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, threegppRelease: 'Release 16' }))}>Release 16</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, threegppRelease: 'Release 17' }))}>Release 17</a></li>
                <li><a onClick={() => setFilters(prev => ({ ...prev, threegppRelease: 'O-RAN 1.0' }))}>O-RAN 1.0</a></li>
              </ul>
            </div>
          </div>
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
                                  disabled={!canExecute}
                                >
                                  <Play className="w-4 h-4" />
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
                disabled={!canExecute}
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

export default TestSuiteBrowser