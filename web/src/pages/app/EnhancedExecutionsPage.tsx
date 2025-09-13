import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { 
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Filter,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  TestTube,
  Zap,
  Database,
  Network,
  Cpu,
  Radio,
  Smartphone,
  Car,
  Satellite,
  Globe,
  Shield,
  FileText,
  Code,
  Settings,
  Trash2,
  Edit,
  Copy,
  Share,
  Bookmark,
  TrendingUp,
  Users,
  Timer,
  Target,
  Layers
} from 'lucide-react'

export const EnhancedExecutionsPage: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo, canExecute } = useSimpleBilling()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedProtocol, setSelectedProtocol] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  const executions = [
    {
      id: 'EXE-001',
      name: '5G Attach Procedure Validation',
      testSuite: 'TS-001',
      protocol: '5g-core',
      status: 'completed',
      result: 'passed',
      startTime: '2024-01-15 14:23:45',
      endTime: '2024-01-15 14:26:19',
      duration: '2m 34s',
      progress: 100,
      executedBy: 'John Doe',
      testCases: 12,
      passed: 12,
      failed: 0,
      skipped: 0,
      priority: 'high',
      environment: 'Production',
      logs: 'Detailed execution logs available...',
      artifacts: ['execution-report.pdf', 'test-logs.json', 'screenshots.zip']
    },
    {
      id: 'EXE-002',
      name: 'ORAN F1 Interface Setup',
      testSuite: 'TS-002',
      protocol: 'oran',
      status: 'running',
      result: 'in-progress',
      startTime: '2024-01-15 14:30:12',
      endTime: null,
      duration: '1m 12s',
      progress: 65,
      executedBy: 'Jane Smith',
      testCases: 8,
      passed: 5,
      failed: 0,
      skipped: 0,
      priority: 'high',
      environment: 'Staging',
      logs: 'Real-time execution in progress...',
      artifacts: []
    },
    {
      id: 'EXE-003',
      name: 'V2X Sidelink Communication',
      testSuite: 'TS-003',
      protocol: 'v2x',
      status: 'completed',
      result: 'passed',
      startTime: '2024-01-15 14:15:30',
      endTime: '2024-01-15 14:20:26',
      duration: '4m 56s',
      progress: 100,
      executedBy: 'Mike Johnson',
      testCases: 15,
      passed: 14,
      failed: 1,
      skipped: 0,
      priority: 'medium',
      environment: 'Development',
      logs: 'V2X communication test completed with minor issues...',
      artifacts: ['v2x-report.pdf', 'communication-logs.json']
    },
    {
      id: 'EXE-004',
      name: 'NBIoT NPRACH Procedure',
      testSuite: 'TS-004',
      protocol: 'nbiot',
      status: 'failed',
      result: 'failed',
      startTime: '2024-01-15 14:10:15',
      endTime: '2024-01-15 14:12:00',
      duration: '1m 45s',
      progress: 100,
      executedBy: 'Sarah Wilson',
      testCases: 6,
      passed: 3,
      failed: 3,
      skipped: 0,
      priority: 'medium',
      environment: 'Production',
      logs: 'NPRACH procedure failed due to timing issues...',
      artifacts: ['error-logs.json', 'debug-info.txt']
    },
    {
      id: 'EXE-005',
      name: '4G Handover Procedures',
      testSuite: 'TS-005',
      protocol: '4g-lte',
      status: 'paused',
      result: 'paused',
      startTime: '2024-01-15 14:05:00',
      endTime: null,
      duration: '0m 45s',
      progress: 25,
      executedBy: 'David Brown',
      testCases: 20,
      passed: 5,
      failed: 0,
      skipped: 0,
      priority: 'high',
      environment: 'Staging',
      logs: 'Execution paused for manual intervention...',
      artifacts: []
    },
    {
      id: 'EXE-006',
      name: 'NTN Satellite Access',
      testSuite: 'TS-006',
      protocol: 'ntn',
      status: 'completed',
      result: 'passed',
      startTime: '2024-01-15 13:45:20',
      endTime: '2024-01-15 14:00:35',
      duration: '15m 15s',
      progress: 100,
      executedBy: 'Lisa Davis',
      testCases: 10,
      passed: 9,
      failed: 1,
      skipped: 0,
      priority: 'low',
      environment: 'Development',
      logs: 'NTN satellite access test completed successfully...',
      artifacts: ['ntn-report.pdf', 'satellite-logs.json', 'timing-analysis.csv']
    },
    {
      id: 'EXE-007',
      name: 'IMS Registration Flow',
      testSuite: 'TS-007',
      protocol: 'ims',
      status: 'completed',
      result: 'passed',
      startTime: '2024-01-15 13:30:10',
      endTime: '2024-01-15 13:32:45',
      duration: '2m 35s',
      progress: 100,
      executedBy: 'Tom Anderson',
      testCases: 7,
      passed: 7,
      failed: 0,
      skipped: 0,
      priority: 'medium',
      environment: 'Production',
      logs: 'IMS registration flow completed without issues...',
      artifacts: ['ims-report.pdf', 'sip-logs.json']
    },
    {
      id: 'EXE-008',
      name: '5G Core Load Testing',
      testSuite: 'TS-008',
      protocol: '5g-core',
      status: 'completed',
      result: 'passed',
      startTime: '2024-01-15 12:00:00',
      endTime: '2024-01-15 12:30:00',
      duration: '30m 00s',
      progress: 100,
      executedBy: 'Alex Chen',
      testCases: 25,
      passed: 23,
      failed: 2,
      skipped: 0,
      priority: 'high',
      environment: 'Production',
      logs: 'Load testing completed with acceptable performance...',
      artifacts: ['load-test-report.pdf', 'performance-metrics.json', 'cpu-usage.csv']
    }
  ]

  const statuses = [
    { id: 'all', name: 'All Status', icon: <Activity className="w-4 h-4" /> },
    { id: 'running', name: 'Running', icon: <Play className="w-4 h-4" /> },
    { id: 'completed', name: 'Completed', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'failed', name: 'Failed', icon: <XCircle className="w-4 h-4" /> },
    { id: 'paused', name: 'Paused', icon: <Pause className="w-4 h-4" /> }
  ]

  const protocols = [
    { id: 'all', name: 'All Protocols', icon: <Network className="w-4 h-4" /> },
    { id: '5g-core', name: '5G Core', icon: <Cpu className="w-4 h-4" /> },
    { id: '4g-lte', name: '4G/LTE', icon: <Network className="w-4 h-4" /> },
    { id: 'oran', name: 'ORAN', icon: <Radio className="w-4 h-4" /> },
    { id: 'nbiot', name: 'NBIoT', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'v2x', name: 'V2X', icon: <Car className="w-4 h-4" /> },
    { id: 'ntn', name: 'NTN', icon: <Satellite className="w-4 h-4" /> },
    { id: 'ims', name: 'IMS', icon: <Globe className="w-4 h-4" /> }
  ]

  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = execution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.testSuite.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || execution.status === selectedStatus
    const matchesProtocol = selectedProtocol === 'all' || execution.protocol === selectedProtocol
    return matchesSearch && matchesStatus && matchesProtocol
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'badge-success'
      case 'running': return 'badge-warning'
      case 'failed': return 'badge-error'
      case 'paused': return 'badge-info'
      default: return 'badge-neutral'
    }
  }

  const getResultColor = (result: string) => {
    switch (result) {
      case 'passed': return 'badge-success'
      case 'failed': return 'badge-error'
      case 'in-progress': return 'badge-warning'
      case 'paused': return 'badge-info'
      default: return 'badge-neutral'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge-error'
      case 'medium': return 'badge-warning'
      case 'low': return 'badge-success'
      default: return 'badge-neutral'
    }
  }

  const getProtocolIcon = (protocol: string) => {
    const protocolData = protocols.find(p => p.id === protocol)
    return protocolData ? protocolData.icon : <Network className="w-4 h-4" />
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-success" />
      case 'running': return <Play className="w-4 h-4 text-warning animate-pulse" />
      case 'failed': return <XCircle className="w-4 h-4 text-error" />
      case 'paused': return <Pause className="w-4 h-4 text-info" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Executions</h1>
          <p className="text-base-content/70">
            Monitor and manage your test execution history and real-time runs
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <Play className="w-4 h-4" />
            Run New Test
          </button>
          <button className="btn btn-outline">
            <Download className="w-4 h-4" />
            Export Results
          </button>
        </div>
      </div>

      {/* Execution Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Total Executions</p>
                <p className="text-2xl font-bold">{executions.length}</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Running Now</p>
                <p className="text-2xl font-bold text-warning">
                  {executions.filter(e => e.status === 'running').length}
                </p>
              </div>
              <Play className="w-8 h-8 text-warning" />
            </div>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold text-success">
                  {Math.round((executions.filter(e => e.result === 'passed').length / executions.length) * 100)}%
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </div>
        </div>
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/70">Avg Duration</p>
                <p className="text-2xl font-bold">7m 32s</p>
              </div>
              <Timer className="w-8 h-8 text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search executions, test suites, or IDs..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Filter className="w-4 h-4" />
                Status
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {statuses.map(status => (
                  <li key={status.id}>
                    <button
                      onClick={() => setSelectedStatus(status.id)}
                      className={`flex items-center gap-2 ${selectedStatus === status.id ? 'active' : ''}`}
                    >
                      {status.icon}
                      {status.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Protocol Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Network className="w-4 h-4" />
                Protocol
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {protocols.map(protocol => (
                  <li key={protocol.id}>
                    <button
                      onClick={() => setSelectedProtocol(protocol.id)}
                      className={`flex items-center gap-2 ${selectedProtocol === protocol.id ? 'active' : ''}`}
                    >
                      {protocol.icon}
                      {protocol.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* View Mode */}
            <div className="btn-group">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn ${viewMode === 'grid' ? 'btn-active' : 'btn-outline'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn ${viewMode === 'list' ? 'btn-active' : 'btn-outline'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-base-content/70">
          Showing {filteredExecutions.length} of {executions.length} executions
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-success" />
            {executions.filter(e => e.status === 'completed').length} Completed
          </span>
          <span className="flex items-center gap-1">
            <Play className="w-4 h-4 text-warning" />
            {executions.filter(e => e.status === 'running').length} Running
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-error" />
            {executions.filter(e => e.status === 'failed').length} Failed
          </span>
        </div>
      </div>

      {/* Executions Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExecutions.map((execution) => (
            <div key={execution.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="card-title text-lg">{execution.name}</h3>
                    <p className="text-sm text-base-content/70 font-mono">{execution.id}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className={`badge ${getStatusColor(execution.status)}`}>
                      {execution.status}
                    </span>
                    <span className={`badge ${getPriorityColor(execution.priority)}`}>
                      {execution.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {getProtocolIcon(execution.protocol)}
                  <span className="text-sm">{execution.protocol}</span>
                  <span className="text-sm text-base-content/50">•</span>
                  <span className="text-sm text-base-content/50">{execution.testSuite}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-base-content/50">Duration</p>
                    <p className="font-medium">{execution.duration}</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Progress</p>
                    <p className="font-medium">{execution.progress}%</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Test Cases</p>
                    <p className="font-medium">{execution.testCases}</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Result</p>
                    <span className={`badge ${getResultColor(execution.result)}`}>
                      {execution.result}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-base-300 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      execution.result === 'passed' ? 'bg-success' :
                      execution.result === 'failed' ? 'bg-error' :
                      execution.result === 'in-progress' ? 'bg-warning' :
                      'bg-info'
                    }`}
                    style={{ width: `${execution.progress}%` }}
                  ></div>
                </div>

                <div className="card-actions justify-between">
                  <div className="flex gap-1">
                    <button className="btn btn-primary btn-sm">
                      <Eye className="w-3 h-3" />
                      View
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Download className="w-3 h-3" />
                    </button>
                    {execution.status === 'running' && (
                      <button className="btn btn-ghost btn-sm">
                        <Pause className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-base-content/50">
                    by {execution.executedBy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card bg-base-100">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Execution</th>
                  <th>Protocol</th>
                  <th>Status</th>
                  <th>Result</th>
                  <th>Duration</th>
                  <th>Progress</th>
                  <th>Test Cases</th>
                  <th>Executed By</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExecutions.map((execution) => (
                  <tr key={execution.id}>
                    <td>
                      <div>
                        <div className="font-medium">{execution.name}</div>
                        <div className="text-sm text-base-content/50 font-mono">{execution.id}</div>
                        <div className="text-xs text-base-content/50">{execution.testSuite}</div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getProtocolIcon(execution.protocol)}
                        <span className="badge badge-outline">{execution.protocol}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(execution.status)}
                        <span className={`badge ${getStatusColor(execution.status)}`}>
                          {execution.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${getResultColor(execution.result)}`}>
                        {execution.result}
                      </span>
                    </td>
                    <td>{execution.duration}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{execution.progress}%</span>
                        <div className="w-16 bg-base-300 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              execution.result === 'passed' ? 'bg-success' :
                              execution.result === 'failed' ? 'bg-error' :
                              execution.result === 'in-progress' ? 'bg-warning' :
                              'bg-info'
                            }`}
                            style={{ width: `${execution.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-success">{execution.passed}</span>
                          <span className="text-base-content/50">/</span>
                          <span className="text-error">{execution.failed}</span>
                          <span className="text-base-content/50">/</span>
                          <span className="text-base-content/50">{execution.skipped}</span>
                        </div>
                        <div className="text-xs text-base-content/50">
                          {execution.testCases} total
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-base-content/70">{execution.executedBy}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-primary btn-xs">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="btn btn-ghost btn-xs">
                          <Download className="w-3 h-3" />
                        </button>
                        {execution.status === 'running' && (
                          <button className="btn btn-ghost btn-xs">
                            <Pause className="w-3 h-3" />
                          </button>
                        )}
                        <button className="btn btn-ghost btn-xs">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

export default EnhancedExecutionsPage