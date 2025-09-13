import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  BarChart3, 
  TestTube, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Zap
} from 'lucide-react'
import { useBilling } from '../billing/BillingProvider'
import { supabase } from '../../lib/supabase/client'
import LoadingSpinner from '../common/LoadingSpinner'

export const DashboardStats: React.FC = () => {
  const { user } = useBilling()

  // Fetch user statistics
  const { data: userStats, isLoading: statsLoading } = useQuery({
    queryKey: ['user-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .rpc('get_user_stats', { user_id: user.id, period: 'month' })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  // Fetch recent executions
  const { data: recentExecutions, isLoading: executionsLoading } = useQuery({
    queryKey: ['recent-executions', user?.id],
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
        .limit(5)
      
      if (error) throw error
      return data || []
    },
    enabled: !!user?.id
  })

  // Fetch test suite statistics
  const { data: suiteStats, isLoading: suiteStatsLoading } = useQuery({
    queryKey: ['suite-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_test_suite_stats')
      
      if (error) throw error
      return data
    }
  })

  if (statsLoading || executionsLoading || suiteStatsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'FAILED':
        return <XCircle className="w-4 h-4 text-error" />
      case 'RUNNING':
        return <Clock className="w-4 h-4 text-warning animate-spin" />
      default:
        return <AlertTriangle className="w-4 h-4 text-base-content/50" />
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

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Executions</p>
                <p className="text-2xl font-bold">{userStats?.totalExecutions || 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">This month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold">{userStats?.successRate || 0}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center text-sm">
              <span className="text-success">
                {userStats?.passedExecutions || 0} passed, {userStats?.failedExecutions || 0} failed
              </span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Avg Duration</p>
                <p className="text-2xl font-bold">
                  {userStats?.averageExecutionTime ? `${userStats.averageExecutionTime}s` : 'N/A'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-info" />
            </div>
            <div className="flex items-center text-sm">
              <span className="text-base-content/70">Per execution</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Test Suites</p>
                <p className="text-2xl font-bold">{suiteStats?.totalSuites || 0}</p>
              </div>
              <TestTube className="w-8 h-8 text-secondary" />
            </div>
            <div className="flex items-center text-sm">
              <span className="text-base-content/70">
                {suiteStats?.totalTestCases || 0} test cases available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Executions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Executions</h2>
            <a href="/app/executions" className="btn btn-outline btn-sm">
              View All
            </a>
          </div>
          
          {recentExecutions && recentExecutions.length > 0 ? (
            <div className="space-y-3">
              {recentExecutions.map((execution) => (
                <div key={execution.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(execution.status)}
                    <div>
                      <h3 className="font-medium">{execution.test_cases?.title || 'Unknown Test'}</h3>
                      <p className="text-sm text-base-content/70">
                        {execution.test_cases?.test_suites?.name || 'Unknown Suite'} • 
                        {execution.test_cases?.complexity || 'Unknown'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className={`badge ${getStatusColor(execution.status)}`}>
                      {execution.status}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {formatDuration(execution.started_at, execution.finished_at)}
                    </div>
                    <div className="text-sm text-base-content/70">
                      {new Date(execution.started_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TestTube className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No executions yet</h3>
              <p className="text-base-content/70 mb-4">
                Start by running your first test case from the Test Suites page.
              </p>
              <a href="/app/test-suites" className="btn btn-primary">
                Browse Test Suites
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/app/test-suites" className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <TestTube className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Browse Test Suites</div>
                <div className="text-sm text-base-content/70">Explore 1000+ 3GPP test cases</div>
              </div>
            </a>
            
            <a href="/app/analyzer" className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <BarChart3 className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">Protocol Analyzer</div>
                <div className="text-sm text-base-content/70">Start live analysis session</div>
              </div>
            </a>
            
            <a href="/app/executions" className="btn btn-outline btn-lg h-auto p-6 flex flex-col items-center gap-3">
              <Clock className="w-8 h-8" />
              <div className="text-center">
                <div className="font-semibold">View History</div>
                <div className="text-sm text-base-content/70">Check execution results</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Test Suite Categories */}
      {suiteStats && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">Test Suite Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(suiteStats.suiteTypeCounts || {}).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-base-200 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{count}</div>
                  <div className="text-sm text-base-content/70 capitalize">
                    {type.replace('_', ' ')} Tests
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardStats