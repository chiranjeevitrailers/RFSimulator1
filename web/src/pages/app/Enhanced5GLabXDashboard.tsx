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
  Building,
  Layers,
  FileText,
  Monitor,
  Server,
  Router,
  Cloud,
  MessageSquare,
  GitBranch,
  Target,
  Gauge,
  TrendingDown,
  AlertCircle,
  CheckSquare,
  XCircle,
  Info,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  RefreshCw,
  Save,
  Trash2,
  Edit,
  Copy,
  Share,
  Lock,
  Unlock,
  WifiOff,
  Signal,
  Battery,
  Thermometer,
  HardDrive,
  MemoryStick,
  CpuIcon,
  HardDriveIcon,
  NetworkIcon,
  WifiIcon,
  Bluetooth,
  BluetoothConnected,
  BluetoothSearching,
  BluetoothX,
  RadioIcon,
  RadioReceiver,
  RadioTransmitter,
  Antenna,
  Tower,
  TowerControl,
  SatelliteIcon,
  Orbit,
  Planet,
  Moon,
  Sun,
  Star,
  Compass,
  Map,
  MapPin,
  Navigation,
  Route,
  Truck,
  Bus,
  Train,
  Plane,
  Ship,
  Bike,
  Motorcycle,
  Scooter,
  Skateboard,
  RollerSkate,
  Walking,
  Running,
  Hiking,
  Swimming,
  Surfing,
  Skiing,
  Snowboarding,
  Skating,
  Climbing,
  Jumping,
  Flying,
  Gliding,
  Parachuting,
  Diving,
  Sailing,
  Rowing,
  Paddling,
  Fishing,
  Hunting,
  Camping,
  HikingIcon,
  Tent,
  Backpack,
  CompassIcon,
  MapIcon,
  MapPinIcon,
  NavigationIcon,
  RouteIcon,
  TruckIcon,
  BusIcon,
  TrainIcon,
  PlaneIcon,
  ShipIcon,
  BikeIcon,
  MotorcycleIcon,
  ScooterIcon,
  SkateboardIcon,
  RollerSkateIcon,
  WalkingIcon,
  RunningIcon,
  HikingIcon2,
  SwimmingIcon,
  SurfingIcon,
  SkiingIcon,
  SnowboardingIcon,
  SkatingIcon,
  ClimbingIcon,
  JumpingIcon,
  FlyingIcon,
  GlidingIcon,
  ParachutingIcon,
  DivingIcon,
  SailingIcon,
  RowingIcon,
  PaddlingIcon,
  FishingIcon,
  HuntingIcon,
  CampingIcon,
  Terminal
} from 'lucide-react'

export const Enhanced5GLabXDashboard: React.FC = () => {
  const { user } = useSimpleAuth()
  const { quotaInfo, canExecute } = useSimpleBilling()
  const [activeView, setActiveView] = useState('dashboard')
  const [realTimeData, setRealTimeData] = useState({
    activeConnections: 1247,
    messagesProcessed: 45632,
    testExecutions: 23,
    systemHealth: 98.5
  })

  // 5GLabX Platform Features
  const protocolLayers = [
    { name: 'PHY Layer', icon: Radio, description: 'Physical Layer Analysis', href: '/app/analyzer?layer=phy', status: 'active' },
    { name: 'MAC Layer', icon: Network, description: 'Medium Access Control', href: '/app/analyzer?layer=mac', status: 'active' },
    { name: 'RLC Layer', icon: Layers, description: 'Radio Link Control', href: '/app/analyzer?layer=rlc', status: 'active' },
    { name: 'PDCP Layer', icon: Database, description: 'Packet Data Convergence Protocol', href: '/app/analyzer?layer=pdcp', status: 'active' },
    { name: 'RRC Layer', icon: Settings, description: 'Radio Resource Control', href: '/app/analyzer?layer=rrc', status: 'active' },
    { name: 'NAS Layer', icon: MessageSquare, description: 'Non-Access Stratum', href: '/app/analyzer?layer=nas', status: 'active' },
    { name: 'IMS Layer', icon: Cloud, description: 'IP Multimedia Subsystem', href: '/app/analyzer?layer=ims', status: 'active' }
  ]

  const coreNetworkAnalyzers = [
    { name: 'AMF Analyzer', icon: Server, description: 'Access and Mobility Management Function', href: '/app/analyzer?component=amf', technology: '5G' },
    { name: 'SMF Analyzer', icon: Router, description: 'Session Management Function', href: '/app/analyzer?component=smf', technology: '5G' },
    { name: 'UPF Analyzer', icon: Network, description: 'User Plane Function', href: '/app/analyzer?component=upf', technology: '5G' },
    { name: 'AUSF Analyzer', icon: Shield, description: 'Authentication Server Function', href: '/app/analyzer?component=ausf', technology: '5G' },
    { name: 'UDM Analyzer', icon: Database, description: 'Unified Data Management', href: '/app/analyzer?component=udm', technology: '5G' },
    { name: 'MME Analyzer', icon: Server, description: 'Mobility Management Entity', href: '/app/analyzer?component=mme', technology: '4G' },
    { name: 'SGW Analyzer', icon: Router, description: 'Serving Gateway', href: '/app/analyzer?component=sgw', technology: '4G' },
    { name: 'PGW Analyzer', icon: Network, description: 'Packet Data Network Gateway', href: '/app/analyzer?component=pgw', technology: '4G' }
  ]

  const oranFeatures = [
    { name: 'O-RAN Overview', icon: Globe, description: 'Complete O-RAN Analysis', href: '/app/analyzer?oran=overview' },
    { name: 'O-RAN Interfaces', icon: GitBranch, description: 'E1, F1 Interface Analysis', href: '/app/analyzer?oran=interfaces' },
    { name: 'CU/DU Analysis', icon: Cpu, description: 'Centralized/Distributed Unit', href: '/app/analyzer?oran=cu-du' },
    { name: 'Performance Monitoring', icon: Gauge, description: 'O-RAN Performance Metrics', href: '/app/analyzer?oran=performance' },
    { name: 'xApps Management', icon: Smartphone, description: 'O-RAN Applications', href: '/app/analyzer?oran=xapps' },
    { name: 'SMO Integration', icon: Cloud, description: 'Service Management and Orchestration', href: '/app/analyzer?oran=smo' }
  ]

  const advancedTechnologies = [
    { name: 'NB-IoT Analysis', icon: Wifi, description: 'Narrowband IoT Analysis', href: '/app/analyzer?tech=nbiot', color: 'bg-blue-500' },
    { name: 'V2X Communication', icon: Car, description: 'Vehicle-to-Everything', href: '/app/analyzer?tech=v2x', color: 'bg-green-500' },
    { name: 'NTN Networks', icon: Satellite, description: 'Non-Terrestrial Networks', href: '/app/analyzer?tech=ntn', color: 'bg-purple-500' },
    { name: 'Report Generator', icon: FileText, description: 'Comprehensive Reporting', href: '/app/analyzer?feature=reports', color: 'bg-orange-500' }
  ]

  const cliIntegrations = [
    { name: 'srsRAN CLI', icon: Terminal, description: 'srsRAN Command Line Integration', status: 'connected' },
    { name: 'Open5GS CLI', icon: Terminal, description: 'Open5GS Integration', status: 'connected' },
    { name: 'Kamailio CLI', icon: Terminal, description: 'Kamailio Integration', status: 'disconnected' }
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Protocol Analyzers - Top Section */}
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title mb-4">Protocol Analyzers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {protocolAnalyzers.map((analyzer, index) => (
                    <div key={index} className="card bg-base-100 hover:bg-base-300 transition-colors cursor-pointer">
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg ${analyzer.color} text-white`}>
                            {analyzer.icon}
                          </div>
                          <h3 className="font-semibold text-sm">{analyzer.name}</h3>
                        </div>
                        <p className="text-xs text-base-content/70 mb-2">{analyzer.components.join(', ')}</p>
                        <div className="flex items-center justify-between">
                          <div className={`w-2 h-2 rounded-full ${analyzer.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
                          <span className="text-xs text-base-content/50">Click to analyze</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
          </div>
        )

      case 'logs-viewer':
        return (
          <div className="space-y-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title">Real-time Log Analysis</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm text-base-content/70">Live</span>
                    <button className="btn btn-ghost btn-sm">
                      <RotateCcw className="w-4 h-4" />
                      Refresh
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                </div>

                {/* Log Filters */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <select className="select select-bordered select-sm">
                    <option>All Layers</option>
                    <option>PHY</option>
                    <option>MAC</option>
                    <option>RLC</option>
                    <option>PDCP</option>
                    <option>RRC</option>
                    <option>NAS</option>
                    <option>IMS</option>
                  </select>
                  <select className="select select-bordered select-sm">
                    <option>All Levels</option>
                    <option>ERROR</option>
                    <option>WARN</option>
                    <option>INFO</option>
                    <option>DEBUG</option>
                  </select>
                  <select className="select select-bordered select-sm">
                    <option>All Channels</option>
                    <option>Channel 1</option>
                    <option>Channel 2</option>
                    <option>Channel 3</option>
                  </select>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={16} />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="input input-bordered input-sm pl-10 w-48"
                    />
                  </div>
                  <button className="btn btn-primary btn-sm">
                    <Filter className="w-4 h-4" />
                    Apply Filters
                  </button>
                </div>
                
                {/* Log Display */}
                <div className="bg-base-100 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
                  <div className="flex items-center justify-center h-full text-center text-base-content/50">
                    <div>
                      <Activity className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-lg font-medium mb-2">No logs available</p>
                      <p className="text-sm">Click "Analyze Logs" to begin real-time log analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'test-suites':
        return (
          <div className="space-y-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title mb-4">Test Suites Library</h2>
                <div className="space-y-3">
                  {testSuites.map((suite, index) => (
                    <div key={index} className="card bg-base-100 hover:bg-base-300 transition-colors">
                      <div className="card-body p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-primary">
                            {suite.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm">{suite.name}</h3>
                            <p className="text-xs text-base-content/70">{suite.description}</p>
                          </div>
                          <span className="badge badge-primary badge-sm">{suite.count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'oran-overview':
        return (
          <div className="space-y-6">
            <div className="card bg-base-200">
              <div className="card-body">
                <h2 className="card-title mb-4">O-RAN Overview</h2>
                <p className="text-base-content/70 mb-4">Complete O-RAN Analysis and Monitoring</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="card bg-base-100">
                    <div className="card-body p-4">
                      <h3 className="font-semibold mb-2">O-RAN Interfaces</h3>
                      <p className="text-sm text-base-content/70">E1, F1 Interface Analysis</p>
                    </div>
                  </div>
                  <div className="card bg-base-100">
                    <div className="card-body p-4">
                      <h3 className="font-semibold mb-2">CU/DU Analysis</h3>
                      <p className="text-sm text-base-content/70">Centralized/Distributed Unit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="flex items-center justify-center h-full text-center text-base-content/50">
            <div>
              <Activity className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Select a component from the sidebar</p>
              <p className="text-sm">Choose an analysis tool to get started</p>
            </div>
          </div>
        )
    }
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
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Left Column - Quick Stats & Actions (Fixed Width) */}
      <div className="w-full lg:w-80 bg-base-100 border-b lg:border-b-0 lg:border-r border-base-300 p-4 flex flex-col lg:max-h-full max-h-96 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-base-content">5GLabX Cloud</h1>
          <p className="text-base-content/70 text-sm">Professional 4G/5G Protocol Analysis & Test Suite Platform</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-base-content/70">System Online</span>
          </div>
        </div>

        {/* System Metrics - Compact */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {systemMetrics.slice(0, 4).map((metric, index) => (
            <div key={index} className="stat bg-base-200 rounded-lg p-3">
              <div className="stat-title text-xs">{metric.name}</div>
              <div className="stat-value text-lg text-primary">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Main Navigation */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">Main Views</h3>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'dashboard' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveView('logs-viewer')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'logs-viewer' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Logs Viewer</span>
          </button>
          <button
            onClick={() => setActiveView('enhanced-logs')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'enhanced-logs' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Enhanced Logs</span>
          </button>
          <button
            onClick={() => setActiveView('layer-trace')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'layer-trace' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Layer Trace</span>
          </button>
          <button
            onClick={() => setActiveView('call-flow')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'call-flow' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Call Flow</span>
          </button>
          <button
            onClick={() => setActiveView('analytics')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'analytics' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
            <span className="badge badge-xs badge-success">LIVE</span>
          </button>
        </div>

        {/* System Status */}
        <div className="bg-base-200 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-semibold mb-2">System Status</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Active Tests</span>
              <span className="font-bold">{realTimeData.testExecutions}</span>
            </div>
            <div className="flex justify-between">
              <span>Messages</span>
              <span className="font-bold">{realTimeData.messagesProcessed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Connections</span>
              <span className="font-bold">{realTimeData.activeConnections.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Health</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="font-bold">{realTimeData.systemHealth}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* O-RAN Analysis */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">O-RAN Analysis</h3>
          <button
            onClick={() => setActiveView('oran-overview')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-overview' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>O-RAN Overview</span>
          </button>
          <button
            onClick={() => setActiveView('oran-interfaces')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-interfaces' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Interfaces</span>
          </button>
          <button
            onClick={() => setActiveView('oran-cu-analysis')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-cu-analysis' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>CU Analysis</span>
          </button>
          <button
            onClick={() => setActiveView('oran-du-analysis')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-du-analysis' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>DU Analysis</span>
          </button>
          <button
            onClick={() => setActiveView('oran-e1-interface')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-e1-interface' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>E1 Interface</span>
          </button>
          <button
            onClick={() => setActiveView('oran-f1-interface')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-f1-interface' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>F1 Interface</span>
          </button>
          <button
            onClick={() => setActiveView('oran-performance')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-performance' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span>Performance</span>
            <span className="badge badge-xs badge-success">LIVE</span>
          </button>
          <button
            onClick={() => setActiveView('oran-xapps')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-xapps' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>xApps</span>
          </button>
          <button
            onClick={() => setActiveView('oran-smo')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'oran-smo' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Cloud className="w-4 h-4" />
            <span>SMO Analysis</span>
          </button>
        </div>

        {/* Test Suites */}
        <div className="space-y-1 mb-4">
          <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">Test Suites</h3>
          <button
            onClick={() => setActiveView('test-suites')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'test-suites' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <TestTube className="w-4 h-4" />
            <span>Test Suites Library</span>
          </button>
          <button
            onClick={() => setActiveView('test-execution')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'test-execution' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Test Execution</span>
          </button>
          <button
            onClick={() => setActiveView('test-results')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'test-results' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Test Results</span>
          </button>
          <button
            onClick={() => setActiveView('test-automation')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              activeView === 'test-automation' ? 'bg-primary text-primary-content' : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Test Automation</span>
          </button>
        </div>

        {/* CLI Integrations */}
        <div className="bg-base-200 rounded-lg p-3">
          <h4 className="text-sm font-semibold mb-2">CLI Integrations</h4>
          <div className="space-y-1">
            {cliIntegrations.map((cli, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <cli.icon className="w-3 h-3" />
                <span className="flex-1 truncate">{cli.name.split(' ')[0]}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${cli.status === 'connected' ? 'bg-success' : 'bg-error'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Header - Fixed at Top */}
        <div className="bg-base-100 border-b border-base-300 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-base-content">
                {getGreeting()}, {user?.full_name || 'Engineer'}! 🚀
              </h2>
              <p className="text-sm text-base-content/70">Professional 4G/5G Protocol Analysis & Test Suite Platform</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-base-content/70">Live</span>
              <Link to="/app/analyzer" className="btn btn-primary btn-sm">
                <Eye className="w-4 h-4" />
                Analyze Logs
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Content Area - Scrollable */}
        <div className="flex-1 bg-base-100 p-4 overflow-y-auto">
          {renderContent()}
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

      {/* Protocol Layer Analysis */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Protocol Layer Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {protocolLayers.map((layer, index) => (
              <Link key={index} to={layer.href} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      <layer.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">{layer.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">{layer.description}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${layer.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="text-sm text-base-content/70 capitalize">{layer.status}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Core Network Analyzers */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Core Network Analyzers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {coreNetworkAnalyzers.map((analyzer, index) => (
              <Link key={index} to={analyzer.href} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      <analyzer.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">{analyzer.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">{analyzer.description}</p>
                  <div className="flex items-center gap-2">
                    <span className={`badge badge-sm ${analyzer.technology === '5G' ? 'badge-primary' : 'badge-secondary'}`}>
                      {analyzer.technology}
                    </span>
                    <span className="text-sm text-base-content/70">Core Network</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* O-RAN Features */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">O-RAN Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oranFeatures.map((feature, index) => (
              <Link key={index} to={feature.href} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">{feature.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">{feature.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="badge badge-sm badge-info">O-RAN</span>
                    <span className="text-sm text-base-content/70">Open RAN</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Technologies */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Advanced Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advancedTechnologies.map((tech, index) => (
              <Link key={index} to={tech.href} className="card bg-base-100 hover:bg-base-300 transition-colors">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${tech.color} text-white`}>
                      <tech.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">{tech.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70">{tech.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CLI Integrations */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">CLI Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cliIntegrations.map((cli, index) => (
              <div key={index} className="card bg-base-100">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-primary">
                      <cli.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold">{cli.name}</h3>
                  </div>
                  <p className="text-sm text-base-content/70 mb-2">{cli.description}</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cli.status === 'connected' ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="text-sm text-base-content/70 capitalize">{cli.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Enhanced5GLabXDashboard