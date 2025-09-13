import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Shield, 
  User, 
  Settings, 
  Play, 
  Eye, 
  Download, 
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../auth/AuthProvider'
import LoadingSpinner from '../common/LoadingSpinner'

interface AuditLog {
  id: string
  user_id: string
  user_email: string
  user_name: string
  action: string
  resource_type: string
  resource_id: string
  resource_name: string
  details: any
  ip_address: string
  user_agent: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'success' | 'failed' | 'warning'
}

export const AuditLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<string>('all')
  const [selectedAction, setSelectedAction] = useState<string>('all')
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [dateRange, setDateRange] = useState<'1d' | '7d' | '30d' | '90d'>('7d')
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)
  
  const { user } = useAuth()

  // Fetch audit logs
  const { data: auditLogs, isLoading, refetch } = useQuery({
    queryKey: ['audit-logs', searchTerm, selectedUser, selectedAction, selectedSeverity, selectedStatus, dateRange],
    queryFn: async () => {
      if (!user?.id) return []
      
      let query = supabase
        .from('audit_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1000)

      // Apply filters
      if (searchTerm) {
        query = query.or(`action.ilike.%${searchTerm}%,resource_name.ilike.%${searchTerm}%,details::text.ilike.%${searchTerm}%`)
      }
      
      if (selectedUser !== 'all') {
        query = query.eq('user_id', selectedUser)
      }
      
      if (selectedAction !== 'all') {
        query = query.eq('action', selectedAction)
      }
      
      if (selectedSeverity !== 'all') {
        query = query.eq('severity', selectedSeverity)
      }
      
      if (selectedStatus !== 'all') {
        query = query.eq('status', selectedStatus)
      }
      
      // Date range filter
      const dateThreshold = new Date()
      switch (dateRange) {
        case '1d':
          dateThreshold.setDate(dateThreshold.getDate() - 1)
          break
        case '7d':
          dateThreshold.setDate(dateThreshold.getDate() - 7)
          break
        case '30d':
          dateThreshold.setDate(dateThreshold.getDate() - 30)
          break
        case '90d':
          dateThreshold.setDate(dateThreshold.getDate() - 90)
          break
      }
      query = query.gte('timestamp', dateThreshold.toISOString())

      const { data, error } = await query
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  // Fetch unique users for filter
  const { data: users } = useQuery({
    queryKey: ['audit-log-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('user_id, user_email, user_name')
        .order('user_name')
      
      if (error) throw error
      
      // Get unique users
      const uniqueUsers = data.reduce((acc: any[], log: any) => {
        if (!acc.find(u => u.user_id === log.user_id)) {
          acc.push({
            user_id: log.user_id,
            user_email: log.user_email,
            user_name: log.user_name
          })
        }
        return acc
      }, [])
      
      return uniqueUsers
    }
  })

  // Fetch unique actions for filter
  const { data: actions } = useQuery({
    queryKey: ['audit-log-actions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('action')
        .order('action')
      
      if (error) throw error
      
      // Get unique actions
      const uniqueActions = [...new Set(data.map((log: any) => log.action))]
      return uniqueActions
    }
  })

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'login':
      case 'logout':
        return <User className="w-4 h-4" />
      case 'create':
      case 'update':
      case 'delete':
        return <Edit className="w-4 h-4" />
      case 'execute':
      case 'run':
        return <Play className="w-4 h-4" />
      case 'view':
      case 'read':
        return <Eye className="w-4 h-4" />
      case 'download':
      case 'export':
        return <Download className="w-4 h-4" />
      case 'settings':
      case 'configure':
        return <Settings className="w-4 h-4" />
      case 'invite':
      case 'remove':
        return <Shield className="w-4 h-4" />
      default:
        return <Info className="w-4 h-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'badge-error'
      case 'high':
        return 'badge-warning'
      case 'medium':
        return 'badge-info'
      case 'low':
        return 'badge-success'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-error" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      default:
        return <Info className="w-4 h-4 text-base-content" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'badge-success'
      case 'failed':
        return 'badge-error'
      case 'warning':
        return 'badge-warning'
      default:
        return 'badge-neutral'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      relative: getRelativeTime(date)
    }
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Severity', 'Status', 'IP Address'].join(','),
      ...auditLogs.map(log => [
        log.timestamp,
        log.user_name,
        log.action,
        log.resource_name,
        log.severity,
        log.status,
        log.ip_address
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Audit Logs</h1>
              <p className="text-base-content/70">
                Monitor and track all system activities and user actions
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button onClick={handleExport} className="btn btn-outline btn-sm">
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button onClick={() => refetch()} className="btn btn-outline btn-sm">
                <Clock className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={16} />
              <input
                type="text"
                placeholder="Search logs..."
                className="input input-bordered w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full">
                <User size={16} />
                User
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedUser('all')}>All Users</a></li>
                {users?.map((user) => (
                  <li key={user.user_id}>
                    <a onClick={() => setSelectedUser(user.user_id)}>
                      {user.user_name || user.user_email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full">
                <Filter size={16} />
                Action
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedAction('all')}>All Actions</a></li>
                {actions?.map((action) => (
                  <li key={action}>
                    <a onClick={() => setSelectedAction(action)}>
                      {action}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full">
                <AlertTriangle size={16} />
                Severity
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedSeverity('all')}>All Severities</a></li>
                <li><a onClick={() => setSelectedSeverity('critical')}>Critical</a></li>
                <li><a onClick={() => setSelectedSeverity('high')}>High</a></li>
                <li><a onClick={() => setSelectedSeverity('medium')}>Medium</a></li>
                <li><a onClick={() => setSelectedSeverity('low')}>Low</a></li>
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full">
                <CheckCircle size={16} />
                Status
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedStatus('all')}>All Status</a></li>
                <li><a onClick={() => setSelectedStatus('success')}>Success</a></li>
                <li><a onClick={() => setSelectedStatus('failed')}>Failed</a></li>
                <li><a onClick={() => setSelectedStatus('warning')}>Warning</a></li>
              </ul>
            </div>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline w-full">
                <Calendar size={16} />
                Date Range
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setDateRange('1d')}>Last 24 Hours</a></li>
                <li><a onClick={() => setDateRange('7d')}>Last 7 Days</a></li>
                <li><a onClick={() => setDateRange('30d')}>Last 30 Days</a></li>
                <li><a onClick={() => setDateRange('90d')}>Last 90 Days</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>IP Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs?.map((log) => {
                  const timestamp = formatTimestamp(log.timestamp)
                  return (
                    <tr key={log.id}>
                      <td>
                        <div className="text-sm">
                          <div>{timestamp.date}</div>
                          <div className="text-base-content/50">{timestamp.time}</div>
                          <div className="text-xs text-base-content/50">{timestamp.relative}</div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                              <span className="text-xs">
                                {log.user_name?.charAt(0) || log.user_email?.charAt(0) || 'U'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-sm">{log.user_name || 'Unknown'}</div>
                            <div className="text-xs text-base-content/50">{log.user_email}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span className="text-sm">{log.action}</span>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm">
                          <div className="font-medium">{log.resource_name}</div>
                          <div className="text-xs text-base-content/50">{log.resource_type}</div>
                        </div>
                      </td>
                      <td>
                        <div className={`badge ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <div className={`badge ${getStatusColor(log.status)}`}>
                            {log.status}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-sm font-mono">{log.ip_address}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="btn btn-ghost btn-xs"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          
          {auditLogs?.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No audit logs found</h3>
              <p className="text-base-content/70">
                Try adjusting your search criteria or date range.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Log Details Modal */}
      {selectedLog && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">Audit Log Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Timestamp:</strong> {formatTimestamp(selectedLog.timestamp).date} {formatTimestamp(selectedLog.timestamp).time}</div>
                    <div><strong>User:</strong> {selectedLog.user_name} ({selectedLog.user_email})</div>
                    <div><strong>Action:</strong> {selectedLog.action}</div>
                    <div><strong>Resource:</strong> {selectedLog.resource_name} ({selectedLog.resource_type})</div>
                    <div><strong>Resource ID:</strong> {selectedLog.resource_id}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Security Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Severity:</strong> 
                      <span className={`badge ${getSeverityColor(selectedLog.severity)} ml-2`}>
                        {selectedLog.severity}
                      </span>
                    </div>
                    <div><strong>Status:</strong> 
                      <span className={`badge ${getStatusColor(selectedLog.status)} ml-2`}>
                        {selectedLog.status}
                      </span>
                    </div>
                    <div><strong>IP Address:</strong> {selectedLog.ip_address}</div>
                    <div><strong>User Agent:</strong> 
                      <div className="text-xs text-base-content/50 mt-1 break-all">
                        {selectedLog.user_agent}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Additional Details</h4>
                <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedLog.details, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setSelectedLog(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuditLogs