import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import LoadingSpinner from '../common/LoadingSpinner'

export const BillingAdmin: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Fetch billing statistics
  const { data: billingStats, isLoading: statsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['admin-billing-stats', selectedPeriod],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_billing_stats', { period: selectedPeriod })
      
      if (error) throw error
      return data
    }
  })

  // Fetch subscription data
  const { data: subscriptions, isLoading: subscriptionsLoading, refetch: refetchSubscriptions } = useQuery({
    queryKey: ['admin-subscriptions', selectedStatus],
    queryFn: async () => {
      let query = supabase
        .from('subscriptions')
        .select(`
          *,
          profiles (
            id,
            email,
            full_name,
            created_at
          ),
          plans (
            name,
            price,
            exec_limit
          )
        `)
        .order('created_at', { ascending: false })

      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus)
      }

      const { data, error } = await query
      if (error) throw error
      return data
    }
  })

  // Fetch revenue data
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['admin-revenue', selectedPeriod],
    queryFn: async () => {
      // Mock revenue data - in production, this would come from Stripe API
      return {
        totalRevenue: 125000,
        monthlyRecurringRevenue: 45000,
        averageRevenuePerUser: 89.50,
        churnRate: 2.3,
        growthRate: 15.7
      }
    }
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success'
      case 'past_due':
        return 'badge-warning'
      case 'canceled':
        return 'badge-error'
      case 'trialing':
        return 'badge-info'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'past_due':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'canceled':
        return <XCircle className="w-4 h-4 text-error" />
      case 'trialing':
        return <Calendar className="w-4 h-4 text-info" />
      default:
        return <AlertTriangle className="w-4 h-4 text-base-content" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (statsLoading || subscriptionsLoading || revenueLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-base-content/70">
            Monitor subscriptions, revenue, and billing operations
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              refetchStats()
              refetchSubscriptions()
            }}
            className="btn btn-outline btn-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="btn btn-primary btn-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData?.totalRevenue || 0)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+{revenueData?.growthRate || 0}% this month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">MRR</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData?.monthlyRecurringRevenue || 0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+12.5% from last month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">ARPU</p>
                <p className="text-2xl font-bold">{formatCurrency(revenueData?.averageRevenuePerUser || 0)}</p>
              </div>
              <Users className="w-8 h-8 text-info" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-success mr-1" />
              <span className="text-success">+5.2% from last month</span>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Churn Rate</p>
                <p className="text-2xl font-bold">{revenueData?.churnRate || 0}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-error mr-1" />
              <span className="text-error">+0.3% from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Time Period</span>
              </label>
              <select 
                className="select select-bordered"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subscription Status</span>
              </label>
              <select 
                className="select select-bordered"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="past_due">Past Due</option>
                <option value="canceled">Canceled</option>
                <option value="trialing">Trialing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Subscriptions</h2>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Current Period</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions?.map((subscription) => (
                  <tr key={subscription.id}>
                    <td>
                      <div>
                        <div className="font-medium">
                          {subscription.profiles?.full_name || 'No name'}
                        </div>
                        <div className="text-sm text-base-content/70">
                          {subscription.profiles?.email}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="badge badge-outline">
                        {subscription.plans?.name || 'Unknown'}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(subscription.status)}
                        <span className={`badge ${getStatusColor(subscription.status)}`}>
                          {subscription.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono">
                        {subscription.plans?.price || 'Free'}
                      </span>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div>{formatDate(subscription.current_period_start)}</div>
                        <div className="text-base-content/70">
                          to {formatDate(subscription.current_period_end)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">
                        {formatDate(subscription.created_at)}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-ghost btn-xs">
                          View
                        </button>
                        <button className="btn btn-ghost btn-xs">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Billing Actions */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">Billing Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="btn btn-outline">
              <Download className="w-4 h-4" />
              Export Revenue Report
            </button>
            
            <button className="btn btn-outline">
              <Users className="w-4 h-4" />
              Send Payment Reminders
            </button>
            
            <button className="btn btn-outline">
              <AlertTriangle className="w-4 h-4" />
              Review Failed Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingAdmin