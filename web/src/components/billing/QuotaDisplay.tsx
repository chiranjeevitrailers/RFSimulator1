import React from 'react'
import { useBilling } from './BillingProvider'
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react'

export const QuotaDisplay: React.FC = () => {
  const { quotaInfo, loading, canExecute } = useBilling()

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="loading loading-spinner loading-sm"></div>
        <span className="text-sm">Loading quota...</span>
      </div>
    )
  }

  if (!quotaInfo) {
    return null
  }

  const getStatusIcon = () => {
    if (quotaInfo.unlimited) {
      return <CheckCircle className="w-4 h-4 text-success" />
    }
    if (canExecute) {
      return <CheckCircle className="w-4 h-4 text-success" />
    }
    return <AlertTriangle className="w-4 h-4 text-warning" />
  }

  const getStatusColor = () => {
    if (quotaInfo.unlimited) return 'text-success'
    if (canExecute) return 'text-success'
    return 'text-warning'
  }

  const getProgressValue = () => {
    if (quotaInfo.unlimited) return 0
    if (!quotaInfo.execLimit) return 0
    return (quotaInfo.currentExecutions / quotaInfo.execLimit) * 100
  }

  return (
    <div className="flex items-center gap-3">
      {getStatusIcon()}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            {quotaInfo.planName} Plan
          </span>
          <span className={`font-medium ${getStatusColor()}`}>
            {quotaInfo.unlimited ? (
              'Unlimited'
            ) : (
              `${quotaInfo.currentExecutions} / ${quotaInfo.execLimit}`
            )}
          </span>
        </div>
        
        {!quotaInfo.unlimited && (
          <div className="mt-1">
            <progress 
              className="progress progress-primary w-full h-1" 
              value={getProgressValue()} 
              max="100"
            ></progress>
          </div>
        )}
        
        <div className="text-xs text-base-content/70 mt-1">
          {quotaInfo.unlimited ? (
            'No execution limits'
          ) : quotaInfo.remainingExecutions !== null ? (
            `${quotaInfo.remainingExecutions} executions remaining this month`
          ) : (
            'Quota information unavailable'
          )}
        </div>
      </div>
    </div>
  )
}

export const QuotaBadge: React.FC = () => {
  const { quotaInfo, loading, canExecute } = useBilling()

  if (loading || !quotaInfo) {
    return (
      <div className="badge badge-neutral">
        <Zap className="w-3 h-3" />
        Loading...
      </div>
    )
  }

  const getBadgeColor = () => {
    if (quotaInfo.unlimited) return 'badge-success'
    if (canExecute) return 'badge-success'
    return 'badge-warning'
  }

  const getBadgeText = () => {
    if (quotaInfo.unlimited) return 'Unlimited'
    if (quotaInfo.remainingExecutions === null) return 'Unknown'
    return `${quotaInfo.remainingExecutions} left`
  }

  return (
    <div className={`badge ${getBadgeColor()}`}>
      <Zap className="w-3 h-3" />
      {getBadgeText()}
    </div>
  )
}

export const QuotaAlert: React.FC = () => {
  const { quotaInfo, canExecute } = useBilling()

  if (!quotaInfo || quotaInfo.unlimited || canExecute) {
    return null
  }

  return (
    <div className="alert alert-warning">
      <AlertTriangle className="w-5 h-5" />
      <div>
        <h3 className="font-bold">Quota Exceeded</h3>
        <div className="text-sm">
          You've used all {quotaInfo.execLimit} executions for this month. 
          Upgrade your plan to continue testing.
        </div>
      </div>
      <div>
        <button className="btn btn-sm btn-primary">
          Upgrade Plan
        </button>
      </div>
    </div>
  )
}

export default QuotaDisplay