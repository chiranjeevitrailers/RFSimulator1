import React, { useState, useEffect } from 'react'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { TestExecutionDataFlow } from '../../services/TestExecutionDataFlow'
import ProfessionalLogAnalyzer from '../../components/analysis/ProfessionalLogAnalyzer'
import { 
  Eye,
  Filter,
  Search,
  Download,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Settings,
  BarChart3,
  Activity,
  Database,
  Network,
  Cpu,
  Radio,
  Smartphone,
  Car,
  Satellite,
  Globe,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Code,
  Layers,
  MessageSquare,
  TrendingUp,
  Users,
  Wifi,
  Signal,
  TestTube
} from 'lucide-react'

export const EnhancedProtocolAnalyzer: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo } = useSimpleBilling()
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedProtocol, setSelectedProtocol] = useState('5g-core')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeExecutionId, setActiveExecutionId] = useState<string | null>(null)
  const [showLogAnalyzer, setShowLogAnalyzer] = useState(false)
  const dataFlow = TestExecutionDataFlow.getInstance()

  // Start test execution for a specific protocol
  const startTestExecution = async (protocolId: string, testCaseId: string) => {
    if (!user?.id) return
    
    try {
      setIsAnalyzing(true)
      const executionId = await dataFlow.startTestExecution(testCaseId, user.id)
      setActiveExecutionId(executionId)
      setShowLogAnalyzer(true)
    } catch (error) {
      console.error('Error starting test execution:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Get test cases for a specific protocol
  const getTestCasesForProtocol = (protocolId: string) => {
    // This would typically fetch from Supabase, but for now we'll return mock data
    const testCases = {
      '5g-core': [
        { id: '1', name: 'AMF Registration Test', category: 'rrc', subcategory: '5g-core' },
        { id: '2', name: 'SMF Session Management', category: 'nas', subcategory: '5g-core' },
        { id: '3', name: 'UPF Data Plane Test', category: 'pdcp', subcategory: '5g-core' }
      ],
      '4g-core': [
        { id: '4', name: 'MME Attach Procedure', category: 'rrc', subcategory: '4g-core' },
        { id: '5', name: 'SGW Bearer Setup', category: 'pdcp', subcategory: '4g-core' },
        { id: '6', name: 'PGW IP Allocation', category: 'nas', subcategory: '4g-core' }
      ],
      'oran': [
        { id: '7', name: 'O-RAN E1 Interface Test', category: 'rrc', subcategory: 'oran' },
        { id: '8', name: 'O-RAN F1 Interface Test', category: 'mac', subcategory: 'oran' },
        { id: '9', name: 'O-RAN Performance Test', category: 'phy', subcategory: 'oran' }
      ],
      'nbiot': [
        { id: '10', name: 'NB-IoT Coverage Test', category: 'phy', subcategory: 'nbiot' },
        { id: '11', name: 'NB-IoT Power Control', category: 'mac', subcategory: 'nbiot' },
        { id: '12', name: 'NB-IoT RRC Test', category: 'rrc', subcategory: 'nbiot' }
      ],
      'v2x': [
        { id: '13', name: 'V2V Communication Test', category: 'mac', subcategory: 'v2x' },
        { id: '14', name: 'V2I Sidelink Test', category: 'phy', subcategory: 'v2x' },
        { id: '15', name: 'V2X Safety Message', category: 'nas', subcategory: 'v2x' }
      ],
      'ntn': [
        { id: '16', name: 'NTN Satellite Handover', category: 'rrc', subcategory: 'ntn' },
        { id: '17', name: 'NTN Doppler Compensation', category: 'phy', subcategory: 'ntn' },
        { id: '18', name: 'NTN Timing Advance', category: 'mac', subcategory: 'ntn' }
      ]
    }
    
    return testCases[protocolId] || []
  }

  const protocols = [
    {
      id: '5g-core',
      name: '5G Core Network',
      icon: <Cpu className="w-5 h-5" />,
      color: 'bg-blue-500',
      components: [
        { name: 'AMF', status: 'active', messages: 1247, description: 'Access and Mobility Management Function' },
        { name: 'SMF', status: 'active', messages: 892, description: 'Session Management Function' },
        { name: 'UPF', status: 'active', messages: 2156, description: 'User Plane Function' },
        { name: 'UDM', status: 'active', messages: 456, description: 'Unified Data Management' },
        { name: 'AUSF', status: 'active', messages: 234, description: 'Authentication Server Function' }
      ]
    },
    {
      id: '4g-lte',
      name: '4G/LTE Network',
      icon: <Network className="w-5 h-5" />,
      color: 'bg-green-500',
      components: [
        { name: 'MME', status: 'active', messages: 1876, description: 'Mobility Management Entity' },
        { name: 'SGW', status: 'active', messages: 3245, description: 'Serving Gateway' },
        { name: 'PGW', status: 'active', messages: 2891, description: 'Packet Data Network Gateway' },
        { name: 'HSS', status: 'active', messages: 567, description: 'Home Subscriber Server' }
      ]
    },
    {
      id: 'oran',
      name: 'ORAN Interfaces',
      icon: <Radio className="w-5 h-5" />,
      color: 'bg-purple-500',
      components: [
        { name: 'F1', status: 'active', messages: 1456, description: 'F1 Interface (CU-DU)' },
        { name: 'E1', status: 'active', messages: 789, description: 'E1 Interface (CU-CP-CU-UP)' },
        { name: 'O1', status: 'active', messages: 234, description: 'O1 Interface (Management)' },
        { name: 'O2', status: 'active', messages: 123, description: 'O2 Interface (Service Management)' }
      ]
    },
    {
      id: 'nbiot',
      name: 'NBIoT',
      icon: <Smartphone className="w-5 h-5" />,
      color: 'bg-orange-500',
      components: [
        { name: 'NPRACH', status: 'active', messages: 456, description: 'Narrowband Physical Random Access Channel' },
        { name: 'NPUSCH', status: 'active', messages: 789, description: 'Narrowband Physical Uplink Shared Channel' },
        { name: 'NPDSCH', status: 'active', messages: 1234, description: 'Narrowband Physical Downlink Shared Channel' }
      ]
    },
    {
      id: 'v2x',
      name: 'V2X Communication',
      icon: <Car className="w-5 h-5" />,
      color: 'bg-red-500',
      components: [
        { name: 'PC5', status: 'active', messages: 567, description: 'PC5 Sidelink Interface' },
        { name: 'Uu', status: 'active', messages: 890, description: 'Uu Interface (Vehicle to Infrastructure)' },
        { name: 'Sidelink', status: 'active', messages: 345, description: 'Direct Vehicle Communication' }
      ]
    },
    {
      id: 'ntn',
      name: 'NTN Satellite',
      icon: <Satellite className="w-5 h-5" />,
      color: 'bg-indigo-500',
      components: [
        { name: 'SIB19', status: 'active', messages: 123, description: 'System Information Block 19' },
        { name: 'Doppler', status: 'active', messages: 456, description: 'Doppler Shift Compensation' },
        { name: 'Timing', status: 'active', messages: 789, description: 'Timing Advance Procedures' }
      ]
    }
  ]

  const messageTypes = [
    {
      id: 'registration',
      name: 'Registration Request',
      protocol: '5g-core',
      component: 'AMF',
      timestamp: '2024-01-15 14:23:45',
      status: 'success',
      details: 'UE Registration Request with 5G-GUTI'
    },
    {
      id: 'pdu-session',
      name: 'PDU Session Establishment',
      protocol: '5g-core',
      component: 'SMF',
      timestamp: '2024-01-15 14:23:47',
      status: 'success',
      details: 'PDU Session Establishment Request for Internet APN'
    },
    {
      id: 'handover',
      name: 'Handover Request',
      protocol: '4g-lte',
      component: 'MME',
      timestamp: '2024-01-15 14:24:12',
      status: 'success',
      details: 'X2 Handover Request from eNB-1 to eNB-2'
    },
    {
      id: 'f1-setup',
      name: 'F1 Setup Request',
      protocol: 'oran',
      component: 'F1',
      timestamp: '2024-01-15 14:24:35',
      status: 'success',
      details: 'F1 Setup Request from DU to CU'
    },
    {
      id: 'nprach',
      name: 'NPRACH Preamble',
      protocol: 'nbiot',
      component: 'NPRACH',
      timestamp: '2024-01-15 14:25:01',
      status: 'success',
      details: 'NPRACH Preamble transmission for random access'
    },
    {
      id: 'pc5-discovery',
      name: 'PC5 Discovery',
      protocol: 'v2x',
      component: 'PC5',
      timestamp: '2024-01-15 14:25:23',
      status: 'success',
      details: 'PC5 Discovery message for V2V communication'
    }
  ]

  const currentProtocol = protocols.find(p => p.id === selectedProtocol)

  const filteredMessages = messageTypes.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.details.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success'
      case 'error': return 'text-error'
      case 'warning': return 'text-warning'
      case 'active': return 'text-success'
      case 'inactive': return 'text-base-content/50'
      default: return 'text-base-content'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />
      case 'error': return <XCircle className="w-4 h-4 text-error" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'active': return <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
      case 'inactive': return <div className="w-2 h-2 bg-base-content/30 rounded-full"></div>
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Protocol Analyzer</h1>
          <p className="text-base-content/70">
            Real-time analysis of 5G/4G protocol messages and network components
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            className={`btn ${isAnalyzing ? 'btn-error' : 'btn-primary'}`}
            onClick={() => setIsAnalyzing(!isAnalyzing)}
          >
            {isAnalyzing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAnalyzing ? 'Stop' : 'Start'} Analysis
          </button>
          <button className="btn btn-outline">
            <Upload className="w-4 h-4" />
            Import Logs
          </button>
          <button className="btn btn-outline">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Protocol Selection */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Select Protocol Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {protocols.map((protocol) => (
              <button
                key={protocol.id}
                onClick={() => setSelectedProtocol(protocol.id)}
                className={`card bg-base-100 hover:bg-base-300 transition-colors ${
                  selectedProtocol === protocol.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="card-body p-4 text-center">
                  <div className={`w-12 h-12 ${protocol.color} rounded-lg flex items-center justify-center text-white mx-auto mb-2`}>
                    {protocol.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{protocol.name}</h3>
                  <p className="text-xs text-base-content/70">{protocol.components.length} components</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Tabs */}
      <div className="tabs tabs-bordered">
        <button 
          className={`tab ${activeTab === 'overview' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 className="w-4 h-4" />
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'components' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('components')}
        >
          <Layers className="w-4 h-4" />
          Components
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          <MessageSquare className="w-4 h-4" />
          Messages
        </button>
        <button 
          className={`tab ${activeTab === 'statistics' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          <TrendingUp className="w-4 h-4" />
          Statistics
        </button>
        <button 
          className={`tab ${activeTab === 'logs' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          <FileText className="w-4 h-4" />
          Raw Logs
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Protocol Status */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title mb-4">{currentProtocol?.name} Status</h3>
              <div className="space-y-4">
                {currentProtocol?.components.map((component, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(component.status)}
                      <div>
                        <p className="font-medium">{component.name}</p>
                        <p className="text-sm text-base-content/70">{component.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{component.messages.toLocaleString()}</p>
                      <p className="text-xs text-base-content/50">messages</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Metrics */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Real-time Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-base-200 rounded-lg">
                  <Activity className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-base-content/70">Active Sessions</p>
                </div>
                <div className="text-center p-4 bg-base-200 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <p className="text-2xl font-bold">45.6K</p>
                  <p className="text-sm text-base-content/70">Messages/min</p>
                </div>
                <div className="text-center p-4 bg-base-200 rounded-lg">
                  <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-sm text-base-content/70">Connected UEs</p>
                </div>
                <div className="text-center p-4 bg-base-200 rounded-lg">
                  <Signal className="w-8 h-8 text-info mx-auto mb-2" />
                  <p className="text-2xl font-bold">98.5%</p>
                  <p className="text-sm text-base-content/70">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title mb-4">{currentProtocol?.name} Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProtocol?.components.map((component, index) => (
                <div key={index} className="card bg-base-200">
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{component.name}</h4>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(component.status)}
                        <span className={`text-sm ${getStatusColor(component.status)}`}>
                          {component.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/70 mb-3">{component.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/50">Messages</span>
                      <span className="font-bold text-primary">{component.messages.toLocaleString()}</span>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-primary btn-sm w-full">
                        <Eye className="w-3 h-3" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="card bg-base-200">
            <div className="card-body">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search messages, components, or details..."
                      className="input input-bordered w-full pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <button className="btn btn-outline">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>
          </div>

          {/* Messages Table */}
          <div className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Protocol Messages</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Message Type</th>
                      <th>Protocol</th>
                      <th>Component</th>
                      <th>Status</th>
                      <th>Timestamp</th>
                      <th>Details</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMessages.map((message) => (
                      <tr key={message.id}>
                        <td className="font-medium">{message.name}</td>
                        <td>
                          <span className="badge badge-outline">{message.protocol}</span>
                        </td>
                        <td>
                          <span className="badge badge-outline">{message.component}</span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(message.status)}
                            <span className={`text-sm ${getStatusColor(message.status)}`}>
                              {message.status}
                            </span>
                          </div>
                        </td>
                        <td className="text-sm text-base-content/70">{message.timestamp}</td>
                        <td className="text-sm text-base-content/70 max-w-xs truncate">
                          {message.details}
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <button className="btn btn-ghost btn-xs">
                              <Eye className="w-3 h-3" />
                            </button>
                            <button className="btn btn-ghost btn-xs">
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
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Message Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Messages</span>
                  <span className="font-bold">45,632</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Success Rate</span>
                  <span className="font-bold text-success">98.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Error Rate</span>
                  <span className="font-bold text-error">1.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Response Time</span>
                  <span className="font-bold">45ms</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <h3 className="card-title mb-4">Component Performance</h3>
              <div className="space-y-4">
                {currentProtocol?.components.map((component, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{component.name}</span>
                      <span className="text-sm font-medium">{component.messages}</span>
                    </div>
                    <div className="w-full bg-base-300 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(component.messages / 3000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="card bg-base-100">
          <div className="card-body">
            <h3 className="card-title mb-4">Raw Protocol Logs</h3>
            <div className="bg-base-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>
{`[2024-01-15 14:23:45.123] AMF: Registration Request received from UE (IMSI: 123456789012345)
[2024-01-15 14:23:45.125] AMF: Authentication vector request sent to AUSF
[2024-01-15 14:23:45.128] AUSF: Authentication vector generated (RAND: 0x1a2b3c4d...)
[2024-01-15 14:23:45.130] AMF: Authentication request sent to UE
[2024-01-15 14:23:45.145] UE: Authentication response received
[2024-01-15 14:23:45.147] AMF: Authentication successful, security context established
[2024-01-15 14:23:45.150] SMF: PDU Session establishment request received
[2024-01-15 14:23:45.152] SMF: UPF selection and session creation initiated
[2024-01-15 14:23:45.155] UPF: Session context created (Session ID: 0x12345678)
[2024-01-15 14:23:45.158] SMF: PDU Session establishment response sent to UE`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Test Execution Integration */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h3 className="card-title mb-4">Test Execution & Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getTestCasesForProtocol(selectedProtocol).map((testCase) => (
              <div key={testCase.id} className="card bg-base-100">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      <TestTube className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold">{testCase.name}</h4>
                  </div>
                  <p className="text-sm text-base-content/70 mb-3">
                    {testCase.category.toUpperCase()} - {testCase.subcategory}
                  </p>
                  <button
                    onClick={() => startTestExecution(selectedProtocol, testCase.id)}
                    disabled={isAnalyzing}
                    className="btn btn-primary btn-sm w-full"
                  >
                    {isAnalyzing ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Execute Test
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Status */}
      <div className="card bg-base-200">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isAnalyzing ? 'bg-success animate-pulse' : 'bg-base-content/30'}`}></div>
              <span className="font-medium">
                {isAnalyzing ? 'Analysis Active' : 'Analysis Stopped'}
              </span>
              <span className="text-sm text-base-content/70">
                {isAnalyzing ? 'Real-time monitoring enabled' : 'Execute a test to begin analysis'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span>Messages/sec: <span className="font-bold">1,247</span></span>
              <span>Buffer: <span className="font-bold">2.3MB</span></span>
              <span>Uptime: <span className="font-bold">2h 34m</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Log Analyzer Modal */}
      {showLogAnalyzer && activeExecutionId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl max-h-[90vh] overflow-auto">
            <ProfessionalLogAnalyzer
              executionId={activeExecutionId}
              onClose={() => {
                setShowLogAnalyzer(false)
                setActiveExecutionId(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedProtocolAnalyzer