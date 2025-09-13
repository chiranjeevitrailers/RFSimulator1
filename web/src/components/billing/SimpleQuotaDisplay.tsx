import React from 'react'
import { useSimpleBilling } from './SimpleBillingProvider'

export const SimpleQuotaDisplay: React.FC = () => {
  const { quotaInfo } = useSimpleBilling()

  if (!quotaInfo) return null

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-base-content/70">Plan</span>
        <span className="font-medium">{quotaInfo.planName}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-base-content/70">Executions</span>
        <span className="font-medium">
          {quotaInfo.unlimited ? 'Unlimited' : `${quotaInfo.remainingExecutions} remaining`}
        </span>
      </div>
      
      {!quotaInfo.unlimited && (
        <div className="w-full bg-base-300 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${((quotaInfo.currentExecutions / (quotaInfo.currentExecutions + quotaInfo.remainingExecutions)) * 100)}%` 
            }}
          ></div>
        </div>
      )}
    </div>
  )
}

export const SimpleQuotaAlert: React.FC = () => {
  const { quotaInfo, canExecute } = useSimpleBilling()

  if (!quotaInfo || canExecute) return null

  return (
    <div className="alert alert-warning">
      <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
      <div>
        <h3 className="font-bold">Execution Quota Exceeded</h3>
        <div className="text-xs">You've reached your execution limit. Upgrade your plan to continue testing.</div>
      </div>
    </div>
  )
}