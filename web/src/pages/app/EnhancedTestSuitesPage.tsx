import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { 
  TestTube,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Filter,
  Search,
  Plus,
  Settings,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Activity,
  BarChart3,
  FileText,
  Code,
  Database,
  Network,
  Cpu,
  Radio,
  Smartphone,
  Car,
  Satellite,
  Globe,
  Shield
} from 'lucide-react'

export const EnhancedTestSuitesPage: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo, canExecute } = useSimpleBilling()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProtocol, setSelectedProtocol] = useState('all')
  const [viewMode, setViewMode] = useState('grid') // grid or list

  const categories = [
    { id: 'all', name: 'All Categories', icon: <Database className="w-4 h-4" /> },
    { id: 'functional', name: 'Functional', icon: <TestTube className="w-4 h-4" /> },
    { id: 'performance', name: 'Performance', icon: <Activity className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'interop', name: 'Interoperability', icon: <Globe className="w-4 h-4" /> },
    { id: 'stress', name: 'Stress Testing', icon: <Zap className="w-4 h-4" /> }
  ]

  const protocols = [
    { id: 'all', name: 'All Protocols', icon: <Network className="w-4 h-4" /> },
    { id: '5g', name: '5G Core', icon: <Cpu className="w-4 h-4" /> },
    { id: '4g', name: '4G/LTE', icon: <Network className="w-4 h-4" /> },
    { id: 'oran', name: 'ORAN', icon: <Radio className="w-4 h-4" /> },
    { id: 'nbiot', name: 'NBIoT', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'v2x', name: 'V2X', icon: <Car className="w-4 h-4" /> },
    { id: 'ntn', name: 'NTN', icon: <Satellite className="w-4 h-4" /> },
    { id: 'ims', name: 'IMS', icon: <Globe className="w-4 h-4" /> }
  ]

  const testSuites = [
    {
      id: 'TS-001',
      name: '5G Attach Procedure',
      description: 'Complete 5G UE attach procedure validation including AMF, SMF, and UPF interactions',
      category: 'functional',
      protocol: '5g',
      status: 'ready',
      priority: 'high',
      duration: '2-5 min',
      lastRun: '2 hours ago',
      successRate: 95,
      tags: ['AMF', 'SMF', 'UPF', 'UE'],
      testCases: 12,
      complexity: 'medium'
    },
    {
      id: 'TS-002',
      name: 'ORAN F1 Interface Setup',
      description: 'ORAN F1 interface establishment and configuration validation',
      category: 'functional',
      protocol: 'oran',
      status: 'ready',
      priority: 'high',
      duration: '3-7 min',
      lastRun: '1 hour ago',
      successRate: 88,
      tags: ['F1', 'CU', 'DU', 'ORAN'],
      testCases: 8,
      complexity: 'high'
    },
    {
      id: 'TS-003',
      name: 'V2X Sidelink Communication',
      description: 'Vehicle-to-vehicle communication using PC5 sidelink interface',
      category: 'functional',
      protocol: 'v2x',
      status: 'ready',
      priority: 'medium',
      duration: '5-10 min',
      lastRun: '4 hours ago',
      successRate: 92,
      tags: ['PC5', 'Sidelink', 'V2V', 'V2I'],
      testCases: 15,
      complexity: 'high'
    },
    {
      id: 'TS-004',
      name: 'NBIoT NPRACH Procedure',
      description: 'Narrowband IoT random access procedure validation',
      category: 'functional',
      protocol: 'nbiot',
      status: 'ready',
      priority: 'medium',
      duration: '1-3 min',
      lastRun: '6 hours ago',
      successRate: 97,
      tags: ['NPRACH', 'NBIoT', 'Random Access'],
      testCases: 6,
      complexity: 'low'
    },
    {
      id: 'TS-005',
      name: '4G Handover Procedures',
      description: 'Intra and inter-cell handover procedures in LTE networks',
      category: 'functional',
      protocol: '4g',
      status: 'ready',
      priority: 'high',
      duration: '4-8 min',
      lastRun: '3 hours ago',
      successRate: 89,
      tags: ['Handover', 'MME', 'SGW', 'PGW'],
      testCases: 20,
      complexity: 'high'
    },
    {
      id: 'TS-006',
      name: 'NTN Satellite Access',
      description: 'Non-terrestrial network satellite access and timing procedures',
      category: 'functional',
      protocol: 'ntn',
      status: 'ready',
      priority: 'low',
      duration: '8-15 min',
      lastRun: '1 day ago',
      successRate: 85,
      tags: ['NTN', 'Satellite', 'SIB19', 'Doppler'],
      testCases: 10,
      complexity: 'high'
    },
    {
      id: 'TS-007',
      name: 'IMS Registration Flow',
      description: 'IP Multimedia Subsystem registration and authentication',
      category: 'functional',
      protocol: 'ims',
      status: 'ready',
      priority: 'medium',
      duration: '2-4 min',
      lastRun: '5 hours ago',
      successRate: 93,
      tags: ['IMS', 'SIP', 'Registration', 'Authentication'],
      testCases: 7,
      complexity: 'medium'
    },
    {
      id: 'TS-008',
      name: '5G Core Load Testing',
      description: 'High load testing of 5G core network components',
      category: 'performance',
      protocol: '5g',
      status: 'ready',
      priority: 'high',
      duration: '15-30 min',
      lastRun: '2 days ago',
      successRate: 78,
      tags: ['Load Test', 'AMF', 'SMF', 'Performance'],
      testCases: 25,
      complexity: 'high'
    },
    {
      id: 'TS-009',
      name: 'ORAN Security Validation',
      description: 'Security testing for ORAN interfaces and protocols',
      category: 'security',
      protocol: 'oran',
      status: 'ready',
      priority: 'high',
      duration: '10-20 min',
      lastRun: '1 day ago',
      successRate: 91,
      tags: ['Security', 'ORAN', 'Authentication', 'Encryption'],
      testCases: 18,
      complexity: 'high'
    },
    {
      id: 'TS-010',
      name: 'Multi-Vendor Interop',
      description: 'Interoperability testing between different vendor equipment',
      category: 'interop',
      protocol: '5g',
      status: 'ready',
      priority: 'medium',
      duration: '20-45 min',
      lastRun: '3 days ago',
      successRate: 82,
      tags: ['Interop', 'Multi-vendor', 'Compatibility'],
      testCases: 35,
      complexity: 'high'
    }
  ]

  const filteredTestSuites = testSuites.filter(suite => {
    const matchesSearch = suite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suite.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         suite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || suite.category === selectedCategory
    const matchesProtocol = selectedProtocol === 'all' || suite.protocol === selectedProtocol
    return matchesSearch && matchesCategory && matchesProtocol
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'badge-success'
      case 'running': return 'badge-warning'
      case 'failed': return 'badge-error'
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

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'text-error'
      case 'medium': return 'text-warning'
      case 'low': return 'text-success'
      default: return 'text-base-content'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Suites Library</h1>
          <p className="text-base-content/70">
            Comprehensive collection of 5G/4G protocol test cases and validation suites
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Create Test Suite
          </button>
          <button className="btn btn-outline">
            <Upload className="w-4 h-4" />
            Import
          </button>
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
                  placeholder="Search test suites, tags, or descriptions..."
                  className="input input-bordered w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 ${selectedCategory === category.id ? 'active' : ''}`}
                    >
                      {category.icon}
                      {category.name}
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
          Showing {filteredTestSuites.length} of {testSuites.length} test suites
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-success" />
            {testSuites.filter(s => s.status === 'ready').length} Ready
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-warning" />
            {testSuites.filter(s => s.status === 'running').length} Running
          </span>
          <span className="flex items-center gap-1">
            <XCircle className="w-4 h-4 text-error" />
            {testSuites.filter(s => s.status === 'failed').length} Failed
          </span>
        </div>
      </div>

      {/* Test Suites Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestSuites.map((suite) => (
            <div key={suite.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="card-title text-lg">{suite.name}</h3>
                    <p className="text-sm text-base-content/70 font-mono">{suite.id}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className={`badge ${getStatusColor(suite.status)}`}>
                      {suite.status}
                    </span>
                    <span className={`badge ${getPriorityColor(suite.priority)}`}>
                      {suite.priority}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-base-content/70 mb-3 line-clamp-2">
                  {suite.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {suite.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="badge badge-sm badge-outline">
                      {tag}
                    </span>
                  ))}
                  {suite.tags.length > 3 && (
                    <span className="badge badge-sm badge-outline">
                      +{suite.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-base-content/50">Duration</p>
                    <p className="font-medium">{suite.duration}</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Test Cases</p>
                    <p className="font-medium">{suite.testCases}</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Success Rate</p>
                    <p className="font-medium text-success">{suite.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-base-content/50">Complexity</p>
                    <p className={`font-medium ${getComplexityColor(suite.complexity)}`}>
                      {suite.complexity}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-between">
                  <div className="flex gap-1">
                    <button className="btn btn-primary btn-sm">
                      <Play className="w-3 h-3" />
                      Run
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Eye className="w-3 h-3" />
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-xs text-base-content/50">
                    Last run: {suite.lastRun}
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
                  <th>Name</th>
                  <th>Category</th>
                  <th>Protocol</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Duration</th>
                  <th>Success Rate</th>
                  <th>Last Run</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTestSuites.map((suite) => (
                  <tr key={suite.id}>
                    <td>
                      <div>
                        <div className="font-medium">{suite.name}</div>
                        <div className="text-sm text-base-content/50 font-mono">{suite.id}</div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-outline">{suite.category}</span>
                    </td>
                    <td>
                      <span className="badge badge-outline">{suite.protocol}</span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusColor(suite.status)}`}>
                        {suite.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityColor(suite.priority)}`}>
                        {suite.priority}
                      </span>
                    </td>
                    <td>{suite.duration}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-success font-medium">{suite.successRate}%</span>
                        <div className="w-16 bg-base-300 rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full" 
                            style={{ width: `${suite.successRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-base-content/70">{suite.lastRun}</td>
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-primary btn-xs">
                          <Play className="w-3 h-3" />
                        </button>
                        <button className="btn btn-ghost btn-xs">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="btn btn-ghost btn-xs">
                          <Edit className="w-3 h-3" />
                        </button>
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

export default EnhancedTestSuitesPage