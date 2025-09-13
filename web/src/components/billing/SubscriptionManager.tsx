import React, { useState, useEffect } from 'react'
import { useBilling } from './BillingProvider'
import { useAuth } from '../auth/AuthProvider'
import { CreditCard, Calendar, Download, AlertTriangle, CheckCircle } from 'lucide-react'
import LoadingSpinner from '../common/LoadingSpinner'

export const SubscriptionManager: React.FC = () => {
  const { quotaInfo, createCheckout, getUserSubscription, getUsageStats } = useBilling()
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<any>(null)
  const [usageStats, setUsageStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (!user) return

      try {
        setLoading(true)
        const [subData, statsData] = await Promise.all([
          getUserSubscription(),
          getUsageStats('month')
        ])
        setSubscription(subData)
        setUsageStats(statsData)
      } catch (error) {
        console.error('Error loading subscription data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, getUserSubscription, getUsageStats])

  const handleUpgrade = async (planId: string) => {
    try {
      setProcessing(true)
      const { url } = await createCheckout(planId)
      window.location.href = url
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setProcessing(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-success'
      case 'past_due':
        return 'text-warning'
      case 'canceled':
        return 'text-error'
      default:
        return 'text-base-content'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'past_due':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'canceled':
        return <AlertTriangle className="w-4 h-4 text-error" />
      default:
        return <AlertTriangle className="w-4 h-4 text-base-content" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">
            <CreditCard className="w-5 h-5" />
            Current Subscription
          </h2>
          
          {subscription ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    {subscription.plan?.name || 'Unknown Plan'}
                  </h3>
                  <p className="text-base-content/70">
                    {subscription.plan?.description || 'No description available'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(subscription.status)}
                    <span className={`font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-base-content/70">
                    {subscription.plan?.price || 'Free'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-base-content/70">Current Period</p>
                  <p className="font-medium">
                    {formatDate(subscription.current_period_start)} - {formatDate(subscription.current_period_end)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Next Billing</p>
                  <p className="font-medium">
                    {formatDate(subscription.current_period_end)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Executions This Month</p>
                  <p className="font-medium">
                    {usageStats?.totalExecutions || 0}
                  </p>
                </div>
              </div>

              {subscription.status === 'past_due' && (
                <div className="alert alert-warning">
                  <AlertTriangle className="w-5 h-5" />
                  <div>
                    <h3 className="font-bold">Payment Required</h3>
                    <div className="text-sm">
                      Your subscription payment failed. Please update your payment method to continue using the service.
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base-content/70 mb-4">
                No active subscription found. You're currently on the trial plan.
              </p>
              <button 
                onClick={() => handleUpgrade('550e8400-e29b-41d4-a716-446655440002')} // Pro plan ID
                className="btn btn-primary"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Pro'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Usage Statistics */}
      {usageStats && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <Calendar className="w-5 h-5" />
              Usage Statistics
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="stat">
                <div className="stat-title">Total Executions</div>
                <div className="stat-value text-primary">{usageStats.totalExecutions}</div>
                <div className="stat-desc">This month</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Success Rate</div>
                <div className="stat-value text-success">{usageStats.successRate}%</div>
                <div className="stat-desc">
                  {usageStats.passedExecutions} passed, {usageStats.failedExecutions} failed
                </div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Avg Duration</div>
                <div className="stat-value text-info">
                  {usageStats.averageExecutionTime ? `${usageStats.averageExecutionTime}s` : 'N/A'}
                </div>
                <div className="stat-desc">Per execution</div>
              </div>
              
              <div className="stat">
                <div className="stat-title">Running</div>
                <div className="stat-value text-warning">{usageStats.runningExecutions}</div>
                <div className="stat-desc">Active tests</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quota Information */}
      {quotaInfo && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">
              <Download className="w-5 h-5" />
              Quota Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Plan</span>
                <span className="badge badge-primary">{quotaInfo.planName}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Executions This Month</span>
                <span className="font-mono">{quotaInfo.currentExecutions}</span>
              </div>
              
              {!quotaInfo.unlimited && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Monthly Limit</span>
                    <span className="font-mono">{quotaInfo.execLimit}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Remaining</span>
                    <span className={`font-mono ${quotaInfo.remainingExecutions === 0 ? 'text-warning' : 'text-success'}`}>
                      {quotaInfo.remainingExecutions}
                    </span>
                  </div>
                  
                  <div className="w-full">
                    <progress 
                      className="progress progress-primary w-full" 
                      value={quotaInfo.currentExecutions} 
                      max={quotaInfo.execLimit}
                    ></progress>
                  </div>
                </>
              )}
              
              {quotaInfo.unlimited && (
                <div className="text-center py-4">
                  <div className="badge badge-success badge-lg">
                    Unlimited Executions
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Options */}
      {(!subscription || subscription.plan?.name !== 'Enterprise') && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Upgrade Your Plan</h2>
            <p className="text-base-content/70 mb-4">
              Unlock more features and higher limits with our Pro or Enterprise plans.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => handleUpgrade('550e8400-e29b-41d4-a716-446655440002')} // Pro plan ID
                className="btn btn-primary flex-1"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing...
                  </>
                ) : (
                  'Upgrade to Pro - $99/month'
                )}
              </button>
              
              <button 
                onClick={() => window.open('/contact', '_blank')}
                className="btn btn-outline flex-1"
              >
                Contact Sales - Enterprise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubscriptionManager