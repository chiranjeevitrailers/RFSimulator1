import React from 'react'
import { DashboardStats } from '../../components/dashboard/DashboardStats'
import { SimpleQuotaAlert } from '../../components/billing/SimpleQuotaDisplay'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

export const DashboardPage: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo, canExecute } = useSimpleBilling()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getGreeting()}, {user?.full_name || 'Engineer'}! 👋
              </h1>
              <p className="text-base-content/70 text-lg">
                Welcome to your 5GLabX Cloud dashboard. Ready to analyze some protocols?
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

      {/* Quota Alert */}
      <SimpleQuotaAlert />

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold">System Status</div>
                <div className="text-sm text-base-content/70">All systems operational</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="font-semibold">Last Activity</div>
                <div className="text-sm text-base-content/70">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-warning" />
              </div>
              <div>
                <div className="font-semibold">Execution Status</div>
                <div className="text-sm text-base-content/70">
                  {canExecute ? 'Ready to execute' : 'Quota exceeded'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <DashboardStats />

      {/* Getting Started (for new users) */}
      {(!quotaInfo || quotaInfo.currentExecutions === 0) && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-xl font-bold mb-4">🚀 Getting Started</h2>
            <p className="text-base-content/70 mb-6">
              New to 5GLabX Cloud? Here's how to get started with your first protocol analysis:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-semibold">Browse Test Suites</h3>
                </div>
                <p className="text-sm text-base-content/70 mb-3">
                  Explore our comprehensive library of 3GPP test cases organized by category.
                </p>
                <a href="/app/test-suites" className="btn btn-primary btn-sm">
                  Browse Now
                </a>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-semibold">Run Your First Test</h3>
                </div>
                <p className="text-sm text-base-content/70 mb-3">
                  Execute a basic attach procedure to see the platform in action.
                </p>
                <a href="/app/test-suites?category=functional" className="btn btn-outline btn-sm">
                  Start Testing
                </a>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <h3 className="font-semibold">Analyze Results</h3>
                </div>
                <p className="text-sm text-base-content/70 mb-3">
                  Use the enhanced log viewer to examine protocol messages and IEs.
                </p>
                <a href="/app/analyzer" className="btn btn-outline btn-sm">
                  Open Analyzer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity Summary */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">📊 Activity Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">This Week</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Test Executions</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Success Rate</span>
                  <span className="font-medium text-success">N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Avg Duration</span>
                  <span className="font-medium">N/A</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">This Month</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Test Executions</span>
                  <span className="font-medium">{quotaInfo?.currentExecutions || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Remaining Quota</span>
                  <span className="font-medium">
                    {quotaInfo?.unlimited ? 'Unlimited' : quotaInfo?.remainingExecutions || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-base-content/70">Plan</span>
                  <span className="font-medium">{quotaInfo?.planName || 'Trial'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage