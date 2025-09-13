import React, { createContext, useContext, useState } from 'react'

interface QuotaInfo {
  planName: string
  currentExecutions: number
  remainingExecutions: number
  unlimited: boolean
}

interface SimpleBillingContextType {
  quotaInfo: QuotaInfo | null
  canExecute: boolean
}

const SimpleBillingContext = createContext<SimpleBillingContextType | undefined>(undefined)

export const useSimpleBilling = () => {
  const context = useContext(SimpleBillingContext)
  if (context === undefined) {
    throw new Error('useSimpleBilling must be used within a SimpleBillingProvider')
  }
  return context
}

interface SimpleBillingProviderProps {
  children: React.ReactNode
}

export const SimpleBillingProvider: React.FC<SimpleBillingProviderProps> = ({ children }) => {
  const [quotaInfo] = useState<QuotaInfo>({
    planName: 'Trial',
    currentExecutions: 0,
    remainingExecutions: 10,
    unlimited: false
  })

  const canExecute = quotaInfo.unlimited || quotaInfo.remainingExecutions > 0

  const value: SimpleBillingContextType = {
    quotaInfo,
    canExecute
  }

  return (
    <SimpleBillingContext.Provider value={value}>
      {children}
    </SimpleBillingContext.Provider>
  )
}