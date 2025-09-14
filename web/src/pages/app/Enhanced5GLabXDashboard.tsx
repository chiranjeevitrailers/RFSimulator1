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
  const [activeTab, setActiveTab] = useState('overview')
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

        {/* Quick Actions */}
        <div className="space-y-2 mb-4">
          <Link to="/app/test-suites" className="btn btn-primary btn-sm w-full justify-start">
            <TestTube className="w-4 h-4" />
            Test Suites
          </Link>
          <Link to="/app/analyzer" className="btn btn-secondary btn-sm w-full justify-start">
            <BarChart3 className="w-4 h-4" />
            Protocol Analyzer
          </Link>
          <Link to="/app/executions" className="btn btn-accent btn-sm w-full justify-start">
            <Activity className="w-4 h-4" />
            Executions
          </Link>
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

        {/* Test Suites Component */}
        <div className="bg-base-200 rounded-lg p-3 mb-4">
          <h4 className="text-sm font-semibold mb-2">Test Suites</h4>
          <div className="space-y-2">
            {testSuites.slice(0, 3).map((suite, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <suite.icon className="w-3 h-3 text-primary" />
                <span className="flex-1 truncate">{suite.name}</span>
                <span className="badge badge-xs badge-primary">{suite.count}</span>
              </div>
            ))}
            <Link to="/app/test-suites" className="btn btn-primary btn-xs w-full mt-2">
              <TestTube className="w-3 h-3" />
              View All
            </Link>
          </div>
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

        {/* Main Dashboard Content - Scrollable */}
        <div className="flex-1 bg-base-100 p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Protocol Analysis & Test Suites - Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Protocol Analyzers */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title mb-4">Protocol Analyzers</h2>
                  <div className="grid grid-cols-1 gap-3">
                    {protocolAnalyzers.slice(0, 3).map((analyzer, index) => (
                      <Link key={index} to={analyzer.link} className="card bg-base-100 hover:bg-base-300 transition-colors">
                        <div className="card-body p-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${analyzer.color} text-white`}>
                              {analyzer.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-sm">{analyzer.name}</h3>
                              <p className="text-xs text-base-content/70">{analyzer.components.join(', ')}</p>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${analyzer.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/app/analyzer" className="btn btn-primary btn-sm w-full mt-3">
                    <Eye className="w-4 h-4" />
                    View All Analyzers
                  </Link>
                </div>
              </div>

              {/* Test Suites */}
              <div className="card bg-base-200">
                <div className="card-body">
                  <h2 className="card-title mb-4">Test Suites</h2>
                  <div className="space-y-3">
                    {testSuites.map((suite, index) => (
                      <Link key={index} to={suite.link} className="card bg-base-100 hover:bg-base-300 transition-colors">
                        <div className="card-body p-3">
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
                      </Link>
                    ))}
                  </div>
                  <Link to="/app/test-suites" className="btn btn-secondary btn-sm w-full mt-3">
                    <TestTube className="w-4 h-4" />
                    View All Test Suites
                  </Link>
                </div>
              </div>
            </div>

            {/* Real-time Log Analysis Section */}
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

      {/* Real-time Monitoring */}
      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Real-time Monitoring</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-figure text-primary">
                <Activity className="w-8 h-8" />
              </div>
              <div className="stat-title">Live Messages</div>
              <div className="stat-value text-primary">{realTimeData.messagesProcessed.toLocaleString()}</div>
              <div className="stat-desc">Messages processed today</div>
            </div>
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-figure text-secondary">
                <Network className="w-8 h-8" />
              </div>
              <div className="stat-title">Active Connections</div>
              <div className="stat-value text-secondary">{realTimeData.activeConnections.toLocaleString()}</div>
              <div className="stat-desc">Current connections</div>
            </div>
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-figure text-accent">
                <TestTube className="w-8 h-8" />
              </div>
              <div className="stat-title">Test Executions</div>
              <div className="stat-value text-accent">{realTimeData.testExecutions}</div>
              <div className="stat-desc">Tests running now</div>
            </div>
            <div className="stat bg-base-100 rounded-lg">
              <div className="stat-figure text-success">
                <Gauge className="w-8 h-8" />
              </div>
              <div className="stat-title">System Health</div>
              <div className="stat-value text-success">{realTimeData.systemHealth}%</div>
              <div className="stat-desc">Overall system health</div>
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
        </div>
      </div>
    </div>
  )
}

export default Enhanced5GLabXDashboard