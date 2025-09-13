import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Database,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'

export const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Fetch admin statistics
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Mock data for demonstration
      return {
        totalUsers: 1247,
        activeUsers: 892,
        totalExecutions: 15678,
        executionsToday: 234,
        successRate: 94.2,
        averageExecutionTime: 45.3,
        systemHealth: 'healthy',
        lastBackup: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
      }
    }
  })

  // Fetch recent users
  const { data: recentUsers } = useQuery({
    queryKey: ['recent-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      
      if (error) throw error
      return data
    }
  })

  // Fetch system logs
  const { data: systemLogs } = useQuery({
    queryKey: ['system-logs'],
    queryFn: async () => {
      // Mock system logs
      return [
        {
          id: '1',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          level: 'info',
          message: 'User authentication successful',
          userId: 'user-123',
          ip: '192.168.1.100'
        },
        {
          id: '2',
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          level: 'warning',
          message: 'High execution queue detected',
          userId: null,
          ip: null
        },
        {
          id: '3',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          level: 'error',
          message: 'Database connection timeout',
          userId: null,
          ip: null
        }
      ]
    }
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'system', label: 'System', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'database', label: 'Database', icon: Database }
  ]

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-error'
      case 'warning':
        return 'text-warning'
      case 'info':
        return 'text-info'
      default:
        return 'text-base-content'
    }
  }

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <XCircle className="w-4 h-4 text-error" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'info':
        return <CheckCircle className="w-4 h-4 text-info" />
      default:
        return <Activity className="w-4 h-4 text-base-content" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-base-content/70">
          Monitor system performance, manage users, and oversee platform operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-0">
              <ul className="menu p-4 w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        className={`flex items-center gap-3 ${
                          activeTab === tab.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon size={20} />
                        {tab.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-base-content/70">Total Users</p>
                        <p className="text-2xl font-bold">{stats?.totalUsers}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-success">+12% this month</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-base-content/70">Active Users</p>
                        <p className="text-2xl font-bold">{stats?.activeUsers}</p>
                      </div>
                      <Activity className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-success">+8% this week</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-base-content/70">Total Executions</p>
                        <p className="text-2xl font-bold">{stats?.totalExecutions}</p>
                      </div>
                      <BarChart3 className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-success">+23% this month</span>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-base-content/70">Success Rate</p>
                        <p className="text-2xl font-bold">{stats?.successRate}%</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="w-4 h-4 text-success mr-1" />
                      <span className="text-success">+1.2% this week</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">System Health</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success mb-2">99.9%</div>
                      <p className="text-sm text-base-content/70">Uptime</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-info mb-2">45ms</div>
                      <p className="text-sm text-base-content/70">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-warning mb-2">234</div>
                      <p className="text-sm text-base-content/70">Executions Today</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">Recent System Activity</h3>
                  <div className="space-y-3">
                    {systemLogs?.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                        {getLogLevelIcon(log.level)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-base-content/50">
                            {log.timestamp.toLocaleString()}
                            {log.userId && ` • User: ${log.userId}`}
                            {log.ip && ` • IP: ${log.ip}`}
                          </p>
                        </div>
                        <div className={`badge badge-sm ${getLogLevelColor(log.level)}`}>
                          {log.level}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Joined</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers?.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                                {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <div className="font-medium">{user.full_name || 'No name'}</div>
                              </div>
                            </div>
                          </td>
                          <td>{user.email}</td>
                          <td>
                            <div className={`badge ${
                              user.role === 'trial' ? 'badge-neutral' :
                              user.role === 'pro' ? 'badge-primary' :
                              user.role === 'enterprise' ? 'badge-secondary' :
                              'badge-accent'
                            }`}>
                              {user.role}
                            </div>
                          </td>
                          <td>{new Date(user.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="badge badge-success">Active</div>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <button className="btn btn-ghost btn-xs">View</button>
                              <button className="btn btn-ghost btn-xs">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">System Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Global Fault Rate</span>
                      </label>
                      <input type="range" min="0" max="1" step="0.1" className="range range-primary" />
                      <div className="w-full flex justify-between text-xs px-2">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Max Concurrent Executions</span>
                      </label>
                      <input type="number" className="input input-bordered w-full" defaultValue="10" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">Maintenance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Database Backup</h4>
                        <p className="text-sm text-base-content/70">
                          Last backup: {stats?.lastBackup ? new Date(stats.lastBackup).toLocaleString() : 'Never'}
                        </p>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Run Backup
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Cache Clear</h4>
                        <p className="text-sm text-base-content/70">
                          Clear application cache and temporary files
                        </p>
                      </div>
                      <button className="btn btn-outline btn-sm">
                        Clear Cache
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">Security Monitoring</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Failed Login Attempts</h3>
                    <div className="bg-base-200 rounded-lg p-4">
                      <p className="text-sm text-base-content/70">No recent failed attempts detected</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Rate Limiting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">0</div>
                        <p className="text-sm text-base-content/70">Blocked IPs</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">3</div>
                        <p className="text-sm text-base-content/70">Rate Limited</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-info">1,247</div>
                        <p className="text-sm text-base-content/70">Total Requests</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Database Tab */}
          {activeTab === 'database' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">Database Management</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Database Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">1,247</div>
                        <p className="text-sm text-base-content/70">Total Users</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">15,678</div>
                        <p className="text-sm text-base-content/70">Executions</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">1,000+</div>
                        <p className="text-sm text-base-content/70">Test Cases</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Database Operations</h3>
                    <div className="space-y-3">
                      <button className="btn btn-outline w-full justify-start">
                        <Database size={16} />
                        Run Database Migration
                      </button>
                      <button className="btn btn-outline w-full justify-start">
                        <Shield size={16} />
                        Update Row Level Security
                      </button>
                      <button className="btn btn-outline w-full justify-start">
                        <BarChart3 size={16} />
                        Generate Usage Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage