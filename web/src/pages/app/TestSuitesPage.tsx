import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Search, Filter, Play, Eye, Download, ChevronDown, ChevronRight } from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import type { TestSuite, TestCase } from '../../lib/supabase/types'

export const TestSuitesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null)
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set())

  // Fetch test suites
  const { data: testSuites, isLoading: suitesLoading } = useQuery({
    queryKey: ['test-suites'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('test_suites')
        .select('*')
        .order('name')
      
      if (error) throw error
      return data as TestSuite[]
    }
  })

  // Fetch test cases for selected suite
  const { data: testCases, isLoading: casesLoading } = useQuery({
    queryKey: ['test-cases', selectedSuite],
    queryFn: async () => {
      if (!selectedSuite) return []
      
      const { data, error } = await supabase
        .from('test_cases')
        .select('*')
        .eq('suite_id', selectedSuite)
        .order('title')
      
      if (error) throw error
      return data as TestCase[]
    },
    enabled: !!selectedSuite
  })

  const filteredSuites = testSuites?.filter(suite =>
    suite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suite.description?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const toggleSuite = (suiteId: string) => {
    const newExpanded = new Set(expandedSuites)
    if (newExpanded.has(suiteId)) {
      newExpanded.delete(suiteId)
      if (selectedSuite === suiteId) {
        setSelectedSuite(null)
      }
    } else {
      newExpanded.add(suiteId)
    }
    setExpandedSuites(newExpanded)
  }

  const getSuiteIcon = (suiteType: string) => {
    const icons: Record<string, string> = {
      functional: '🔧',
      mobility: '🔄',
      performance: '📊',
      security: '🔒',
      ims: '📞',
      qos: '⚡',
      oran: '🌐',
      nbiot: '📡',
      ntn: '🛰️',
      v2x: '🚗',
      interrat: '🔄',
      negative: '❌',
      regression: '🔍'
    }
    return icons[suiteType] || '📋'
  }

  const getSuiteColor = (suiteType: string) => {
    const colors: Record<string, string> = {
      functional: 'badge-primary',
      mobility: 'badge-secondary',
      performance: 'badge-accent',
      security: 'badge-error',
      ims: 'badge-info',
      qos: 'badge-warning',
      oran: 'badge-success',
      nbiot: 'badge-neutral',
      ntn: 'badge-ghost',
      v2x: 'badge-primary',
      interrat: 'badge-secondary',
      negative: 'badge-error',
      regression: 'badge-warning'
    }
    return colors[suiteType] || 'badge-neutral'
  }

  if (suitesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test Suite Library</h1>
        <p className="text-base-content/70">
          Browse and execute 1000+ 3GPP-compliant test cases across all major protocol layers.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
          <input
            type="text"
            placeholder="Search test suites..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-outline">
            <Filter size={16} />
            Filter
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>All Types</a></li>
            <li><a>Functional</a></li>
            <li><a>Mobility</a></li>
            <li><a>Performance</a></li>
            <li><a>Security</a></li>
            <li><a>IMS</a></li>
            <li><a>O-RAN</a></li>
            <li><a>NB-IoT</a></li>
            <li><a>V2X</a></li>
            <li><a>NTN</a></li>
          </ul>
        </div>
      </div>

      {/* Test Suites List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuites.map((suite) => (
          <div key={suite.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSuiteIcon(suite.suite_type)}</span>
                  <div>
                    <h3 className="card-title text-lg">{suite.name}</h3>
                    <div className={`badge ${getSuiteColor(suite.suite_type)}`}>
                      {suite.suite_type}
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => toggleSuite(suite.id)}
                >
                  {expandedSuites.has(suite.id) ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
              </div>

              {suite.description && (
                <p className="text-base-content/70 mb-4">{suite.description}</p>
              )}

              <div className="flex items-center gap-2 text-sm text-base-content/50 mb-4">
                {suite.threegpp_release && (
                  <span>3GPP {suite.threegpp_release}</span>
                )}
              </div>

              <div className="card-actions justify-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    if (!expandedSuites.has(suite.id)) {
                      toggleSuite(suite.id)
                    }
                    setSelectedSuite(suite.id)
                  }}
                >
                  <Eye size={16} />
                  View Cases
                </button>
                <button className="btn btn-outline btn-sm">
                  <Download size={16} />
                  Export
                </button>
              </div>

              {/* Expanded Test Cases */}
              {expandedSuites.has(suite.id) && (
                <div className="mt-4 pt-4 border-t border-base-300">
                  {casesLoading ? (
                    <div className="flex justify-center py-4">
                      <div className="loading loading-spinner"></div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {testCases?.map((testCase) => (
                        <div key={testCase.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">{testCase.title}</h4>
                            {testCase.threegpp_ref && (
                              <p className="text-sm text-base-content/50">
                                3GPP Ref: {testCase.threegpp_ref}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <div className={`badge badge-sm ${
                                testCase.complexity === 'basic' ? 'badge-success' :
                                testCase.complexity === 'intermediate' ? 'badge-warning' :
                                'badge-error'
                              }`}>
                                {testCase.complexity}
                              </div>
                              {testCase.expected_duration && (
                                <span className="text-xs text-base-content/50">
                                  ~{testCase.expected_duration}s
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="btn btn-ghost btn-xs">
                              <Eye size={14} />
                            </button>
                            <button className="btn btn-primary btn-xs">
                              <Play size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredSuites.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No test suites found</h3>
          <p className="text-base-content/70">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  )
}

export default TestSuitesPage