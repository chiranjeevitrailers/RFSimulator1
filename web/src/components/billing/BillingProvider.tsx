import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { BillingAPI } from '../../lib/api/billing'
import type { QuotaInfo } from '../../lib/api/billing'

interface BillingContextType {
  quotaInfo: QuotaInfo | null
  loading: boolean
  canExecute: boolean
  refreshQuota: () => Promise<void>
  createCheckout: (planId: string) => Promise<{ sessionId: string; url: string }>
  getUserSubscription: () => Promise<any>
  getUsageStats: (period?: 'month' | 'week' | 'day') => Promise<any>
}

const BillingContext = createContext<BillingContextType | undefined>(undefined)

export const useBilling = () => {
  const context = useContext(BillingContext)
  if (context === undefined) {
    throw new Error('useBilling must be used within a BillingProvider')
  }
  return context
}

interface BillingProviderProps {
  children: React.ReactNode
}

export const BillingProvider: React.FC<BillingProviderProps> = ({ children }) => {
  const [quotaInfo, setQuotaInfo] = useState<QuotaInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [canExecute, setCanExecute] = useState(false)
  const { user } = useAuth()

  const refreshQuota = async () => {
    if (!user) return

    try {
      setLoading(true)
      const quota = await BillingAPI.getUserQuota(user.id)
      setQuotaInfo(quota)
      setCanExecute(quota.unlimited || (quota.remainingExecutions !== null && quota.remainingExecutions > 0))
    } catch (error) {
      console.error('Error refreshing quota:', error)
    } finally {
      setLoading(false)
    }
  }

  const createCheckout = async (planId: string) => {
    if (!user) throw new Error('No user logged in')
    return await BillingAPI.createCheckout({ planId, userId: user.id })
  }

  const getUserSubscription = async () => {
    if (!user) return null
    return await BillingAPI.getUserSubscription(user.id)
  }

  const getUsageStats = async (period: 'month' | 'week' | 'day' = 'month') => {
    if (!user) return null
    return await BillingAPI.getUsageStats(user.id, period)
  }

  useEffect(() => {
    if (user) {
      refreshQuota()
    } else {
      setQuotaInfo(null)
      setCanExecute(false)
      setLoading(false)
    }
  }, [user])

  const value: BillingContextType = {
    quotaInfo,
    loading,
    canExecute,
    refreshQuota,
    createCheckout,
    getUserSubscription,
    getUsageStats
  }

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  )
}