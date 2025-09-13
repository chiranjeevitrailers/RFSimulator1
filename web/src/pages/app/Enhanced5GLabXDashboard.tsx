import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { 
  Zap, 
  TrendingUp, 
  Users, 
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  TestTube,
  Activity,
  Cpu,
  Network,
  Database,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Filter,
  Search,
  Bell,
  Shield,
  Globe,
  Smartphone,
  Wifi,
  Radio,
  Satellite,
  Car,
  Building
} from 'lucide-react'

export const Enhanced5GLabXDashboard: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo, canExecute } = useSimpleBilling()
  const [activeTab, setActiveTab] = useState('overview')
  const [realTimeData, setRealTimeData] = useState({
    activeConnections: 1247,
    messagesProcessed: 45632,
    testExecutions: 23,
    systemHealth: 98.5
  })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const protocolAnalyzers = [
    {
      name: '5G Core Network',
      icon: <Cpu className="w-6 h-6" />,
      components: ['AMF', 'SMF', 'UPF', 'UDM', 'AUSF'],
      status: 'active',
      color: 'bg-blue-500',
      link: '/app/analyzer?protocol=5g-core'
    },
    {
      name: '4G/LTE Network',
      icon: <Network className="w-6 h-6" />,
      components: ['MME', 'SGW', 'PGW', 'HSS'],
      status: 'active',
      color: 'bg-green-500',
      link: '/app/analyzer?protocol=4g-lte'
    },
    {
      name: 'ORAN Interfaces',
      icon: <Radio className="w-6 h-6" />,
      components: ['F1', 'E1', 'O1', 'O2'],
      status: 'active',
      color: 'bg-purple-500',
      link: '/app/analyzer?protocol=oran'
    },
    {
      name: 'NBIoT',
      icon: <Smartphone className="w-6 h-6" />,
      components: ['NPRACH', 'NPUSCH', 'NPDSCH'],
      status: 'active',
      color: 'bg-orange-500',
      link: '/app/analyzer?protocol=nbiot'
    },
    {
      name: 'V2X Communication',
      icon: <Car className="w-6 h-6" />,
      components: ['PC5', 'Uu', 'Sidelink'],
      status: 'active',
      color: 'bg-red-500',
      link: '/app/analyzer?protocol=v2x'
    },
    {
      name: 'NTN Satellite',
      icon: <Satellite className="w-6 h-6" />,
      components: ['SIB19', 'Doppler', 'Timing'],
      status: 'active',
      color: 'bg-indigo-500',
      link: '/app/analyzer?protocol=ntn'
    }
  ]

  const testSuites = [
    {
      name: 'Functional Tests',
      count: 45,
      icon: <TestTube className="w-5 h-5" />,
      description: 'Basic functionality validation',
      link: '/app/test-suites?category=functional'
    },
    {
      name: 'Performance Tests',
      count: 32,
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Load and stress testing',
      link: '/app/test-suites?category=performance'
    },
    {
      name: 'Security Tests',
      count: 18,
      icon: <Shield className="w-5 h-5" />,
      description: 'Security validation',
      link: '/app/test-suites?category=security'
    },
    {
      name: 'Interoperability Tests',
      count: 28,
      icon: <Globe className="w-5 h-5" />,
      description: 'Multi-vendor compatibility',
      link: '/app/test-suites?category=interop'
    }
  ]

  const recentExecutions = [
    {
      id: 'EXE-001',
      name: '5G Attach Procedure',
      status: 'completed',
      duration: '2m 34s',
      timestamp: '2 minutes ago',
      result: 'passed'
    },
    {
      id: 'EXE-002',
      name: 'ORAN F1 Setup',
      status: 'running',
      duration: '1m 12s',
      timestamp: '5 minutes ago',
      result: 'in-progress'
    },
    {
      id: 'EXE-003',
      name: 'V2X Sidelink Test',
      status: 'completed',
      duration: '4m 56s',
      timestamp: '12 minutes ago',
      result: 'passed'
    },
    {
      id: 'EXE-004',
      name: 'NBIoT NPRACH',
      status: 'failed',
      duration: '1m 45s',
      timestamp: '18 minutes ago',
      result: 'failed'
    }
  ]

  const systemMetrics = [
    {
      name: 'Active Connections',
      value: realTimeData.activeConnections.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: <Users className="w-5 h-5" />
    },
    {
      name: 'Messages Processed',
      value: realTimeData.messagesProcessed.toLocaleString(),
      change: '+8%',
      trend: 'up',
      icon: <Activity className="w-5 h-5" />
    },
    {
      name: 'Test Executions',
      value: realTimeData.testExecutions.toString(),
      change: '+3',
      trend: 'up',
      icon: <TestTube className="w-5 h-5" />
    },
    {
      name: 'System Health',
      value: `${realTimeData.systemHealth}%`,
      change: '+0.2%',
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5" />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getGreeting()}, {user?.full_name || 'Engineer'}! 🚀
              </h1>
              <p className="text-base-content/70 text-lg">
                Welcome to your comprehensive 5GLabX Cloud platform. Ready to analyze protocols and run tests?
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

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="card bg-base-200">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-base-content/70">{metric.name}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.trend === 'up' ? 'text-success' : 'text-error'}`}>
                    {metric.change}
                  </p>
                </div>
                <div className="text-primary">
                  {metric.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/app/test-suites" className="btn btn-primary btn-outline">
              <TestTube className="w-4 h-4" />
              Run Tests
            </Link>
            <Link to="/app/analyzer" className="btn btn-secondary btn-outline">
              <Eye className="w-4 h-4" />
              Analyze Logs
            </Link>
            <Link to="/app/executions" className="btn btn-accent btn-outline">
              <Activity className="w-4 h-4" />
              View Results
            </Link>
            <Link to="/app/analytics" className="btn btn-info btn-outline">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* Protocol Analyzers */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Protocol Analyzers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {protocolAnalyzers.map((analyzer, index) => (
              <Link key={index} to={analyzer.link} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${analyzer.color} text-white`}>
                      {analyzer.icon}
                    </div>
                    <h3 className="font-semibold">{analyzer.name}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {analyzer.components.map((component, idx) => (
                      <span key={idx} className="badge badge-sm badge-outline">
                        {component}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-base-content/70">Active</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Test Suites Overview */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Test Suites Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testSuites.map((suite, index) => (
              <Link key={index} to={suite.link} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      {suite.icon}
                    </div>
                    <h3 className="font-semibold">{suite.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">{suite.count}</p>
                  <p className="text-sm text-base-content/70">{suite.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Executions */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Recent Test Executions</h2>
            <Link to="/app/executions" className="btn btn-sm btn-outline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Test Name</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Result</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentExecutions.map((execution, index) => (
                  <tr key={index}>
                    <td className="font-mono text-sm">{execution.id}</td>
                    <td className="font-medium">{execution.name}</td>
                    <td>
                      <span className={`badge ${
                        execution.status === 'completed' ? 'badge-success' :
                        execution.status === 'running' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {execution.status}
                      </span>
                    </td>
                    <td>{execution.duration}</td>
                    <td>
                      <span className={`badge ${
                        execution.result === 'passed' ? 'badge-success' :
                        execution.result === 'failed' ? 'badge-error' :
                        'badge-warning'
                      }`}>
                        {execution.result}
                      </span>
                    </td>
                    <td className="text-sm text-base-content/70">{execution.timestamp}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-xs btn-ghost">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="btn btn-xs btn-ghost">
                          <Download className="w-3 h-3" />
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

      {/* Real-time Monitoring */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Real-time Monitoring</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>WebSocket Connection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-success">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>CLI Integration</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-warning">Partial</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Test Engine</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-success">Ready</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Active Processes</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Message Parser</span>
                  <span className="badge badge-success">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Log Collector</span>
                  <span className="badge badge-success">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Test Executor</span>
                  <span className="badge badge-warning">Idle</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analytics Engine</span>
                  <span className="badge badge-success">Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Information */}
      {quotaInfo && (
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title mb-4">Usage & Quotas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{quotaInfo.used_executions}</p>
                <p className="text-sm text-base-content/70">Tests Executed</p>
                <p className="text-xs text-base-content/50">of {quotaInfo.max_test_executions}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{quotaInfo.used_test_suites}</p>
                <p className="text-sm text-base-content/70">Test Suites</p>
                <p className="text-xs text-base-content/50">of {quotaInfo.max_test_suites}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{quotaInfo.plan_type}</p>
                <p className="text-sm text-base-content/70">Current Plan</p>
                <p className="text-xs text-base-content/50">Upgrade available</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Enhanced5GLabXDashboard