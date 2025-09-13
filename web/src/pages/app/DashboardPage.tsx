import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Activity,
  TestTube,
  BarChart3
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../../hooks/useAuth'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  // Fetch user's recent executions
  const { data: recentExecutions } = useQuery({
    queryKey: ['recent-executions', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      const { data, error } = await supabase
        .from('executions')
        .select(`
          *,
          test_cases (
            title,
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
      return data
    },
    enabled: !!user?.id
  })

  // Fetch user's execution stats
  const { data: executionStats } = useQuery({
    queryKey: ['execution-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .rpc('get_user_quota_info', { user_id: user.id })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  // Mock data for demo
  const mockStats = {
    totalExecutions: 47,
    passedExecutions: 42,
    failedExecutions: 3,
    runningExecutions: 2,
    successRate: 89.4,
    thisMonth: 12,
    lastMonth: 8
  }

  const mockRecentExecutions = [
    {
      id: '1',
      test_cases: {
        title: 'Basic Attach Procedure',
        test_suites: { name: 'Functional Tests', suite_type: 'functional' }
      },
      status: 'PASSED',
      started_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      finished_at: new Date(Date.now() - 1000 * 60 * 25).toISOString()
    },
    {
      id: '2',
      test_cases: {
        title: 'Intra-eNB Handover',
        test_suites: { name: 'Mobility Tests', suite_type: 'mobility' }
      },
      status: 'RUNNING',
      started_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      finished_at: null
    },
    {
      id: '3',
      test_cases: {
        title: 'IMS Registration',
        test_suites: { name: 'IMS Tests', suite_type: 'ims' }
      },
      status: 'FAILED',
      started_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      finished_at: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60 * 3).toISOString()
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PASSED':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'FAILED':
        return <XCircle className="w-5 h-5 text-error" />
      case 'RUNNING':
        return <Clock className="w-5 h-5 text-warning" />
      default:
        return <Activity className="w-5 h-5 text-base-content/50" />
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.full_name || user?.email}!
        </h1>
        <p className="text-base-content/70">
          Here's what's happening with your protocol analysis today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Executions</p>
                <p className="text-2xl font-bold">{mockStats.totalExecutions}</p>
              </div>
              <Play className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+{mockStats.thisMonth - mockStats.lastMonth} this month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold">{mockStats.successRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+2.1% from last month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Running Tests</p>
                <p className="text-2xl font-bold">{mockStats.runningExecutions}</p>
              </div>
              <Activity className="w-8 h-8 text-warning" />
            </div>
            <div className="text-sm text-base-content/50">
              Active executions
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">This Month</p>
                <p className="text-2xl font-bold">{mockStats.thisMonth}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+50% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Info */}
      {executionStats && (
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h3 className="card-title mb-4">Usage & Quota</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-base-content/70">Current Plan</p>
                <p className="text-lg font-semibold">{executionStats.planName}</p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Executions This Month</p>
                <p className="text-lg font-semibold">
                  {executionStats.currentExecutions}
                  {executionStats.execLimit && ` / ${executionStats.execLimit}`}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Remaining</p>
                <p className="text-lg font-semibold">
                  {executionStats.unlimited ? 'Unlimited' : executionStats.remainingExecutions}
                </p>
              </div>
            </div>
            {!executionStats.unlimited && executionStats.execLimit && (
              <div className="mt-4">
                <progress 
                  className="progress progress-primary w-full" 
                  value={executionStats.currentExecutions} 
                  max={executionStats.execLimit}
                ></progress>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Executions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4">Recent Executions</h3>
            <div className="space-y-4">
              {mockRecentExecutions.map((execution) => (
                <div key={execution.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(execution.status)}
                    <div>
                      <p className="font-medium">{execution.test_cases.title}</p>
                      <p className="text-sm text-base-content/70">
                        {execution.test_cases.test_suites.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`badge ${getStatusColor(execution.status)}`}>
                      {execution.status}
                    </div>
                    <p className="text-xs text-base-content/50 mt-1">
                      {new Date(execution.started_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-outline btn-sm">View All</button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="btn btn-primary w-full justify-start">
                <TestTube size={20} />
                Start New Analysis
              </button>
              <button className="btn btn-outline w-full justify-start">
                <Play size={20} />
                Browse Test Suites
              </button>
              <button className="btn btn-outline w-full justify-start">
                <BarChart3 size={20} />
                View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage