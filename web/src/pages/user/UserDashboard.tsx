import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { 
  TestTube, 
  BarChart3, 
  Clock, 
  User, 
  Settings,
  Users,
  Shield,
  Code,
  Activity,
  Zap,
  Crown,
  Menu,
  X,
  Bell,
  Search,
  HelpCircle,
  LogOut,
  Play,
  Pause,
  RotateCcw,
  Download,
  Upload,
  Eye,
  Filter,
  Network,
  Database,
  Cpu,
  Radio,
  Smartphone,
  Wifi,
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
  Terminal,
  Globe
} from 'lucide-react'

export const UserDashboard: React.FC = () => {
  const { user, signOut } = useSimpleAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeComponent, setActiveComponent] = useState('dashboard')
  const [isProcessing, setIsProcessing] = useState(false)
  const [logs, setLogs] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // 5GLabX Navigation Components
  const mainViews = [
    { name: 'Dashboard', href: 'dashboard', icon: BarChart3 },
    { name: 'Logs Viewer', href: 'logs-viewer', icon: FileText },
    { name: 'Enhanced Logs', href: 'enhanced-logs', icon: FileText },
    { name: 'Layer Trace', href: 'layer-trace', icon: Layers },
    { name: 'Call Flow', href: 'callflow', icon: GitBranch },
    { name: 'Analytics', href: 'analytics', icon: BarChart3, badge: 'LIVE' },
  ]

  const oranAnalysis = [
    { name: 'O-RAN Overview', href: 'oran-overview', icon: Globe },
    { name: 'Interfaces', href: 'oran-interfaces', icon: GitBranch },
    { name: 'CU Analysis', href: 'oran-cu-analysis', icon: Cpu },
    { name: 'DU Analysis', href: 'oran-du-analysis', icon: Cpu },
    { name: 'E1 Interface', href: 'oran-e1-interface', icon: Network },
    { name: 'F1 Interface', href: 'oran-f1-interface', icon: Network },
    { name: 'Performance', href: 'oran-performance', icon: Gauge, badge: 'LIVE' },
    { name: 'xApps', href: 'oran-xapps', icon: Smartphone },
    { name: 'SMO Analysis', href: 'oran-smo', icon: Cloud },
  ]

  const nbiotAnalysis = [
    { name: 'NB-IoT Overview', href: 'nbiot-overview', icon: Wifi },
    { name: 'NB-IoT Call Flow', href: 'nbiot-callflow', icon: GitBranch },
    { name: 'NB-IoT Analytics', href: 'nbiot-analytics', icon: BarChart3, badge: 'LIVE' },
    { name: 'NB-IoT PHY', href: 'nbiot-phy-layer', icon: Radio },
    { name: 'NB-IoT MAC', href: 'nbiot-mac-layer', icon: Network },
    { name: 'NB-IoT RRC', href: 'nbiot-rrc-layer', icon: Settings },
    { name: 'NB-IoT Testing', href: 'nbiot-testing', icon: TestTube },
  ]

  const v2xAnalysis = [
    { name: 'V2X Overview', href: 'v2x-overview', icon: Car },
    { name: 'PC5 Sidelink', href: 'v2x-sidelink', icon: Car },
    { name: 'V2X Analytics', href: 'v2x-analytics', icon: BarChart3, badge: 'LIVE' },
    { name: 'V2X PHY', href: 'v2x-phy-layer', icon: Radio },
    { name: 'V2X MAC', href: 'v2x-mac-layer', icon: Network },
    { name: 'V2X Testing', href: 'v2x-testing', icon: TestTube },
    { name: 'Test Scenarios', href: 'v2x-scenarios', icon: Target },
  ]

  const ntnAnalysis = [
    { name: 'NTN Overview', href: 'ntn-overview', icon: Satellite },
    { name: 'Satellite Links', href: 'ntn-satellites', icon: Satellite },
    { name: 'NTN Analytics', href: 'ntn-analytics', icon: BarChart3, badge: 'LIVE' },
    { name: 'SIB19 Analysis', href: 'ntn-sib19', icon: FileText },
    { name: 'Timing & Delay', href: 'ntn-timing', icon: Clock },
    { name: 'Doppler Analysis', href: 'ntn-doppler', icon: Activity },
    { name: 'NTN Scenarios', href: 'ntn-scenarios', icon: Target },
  ]

  const utilities = [
    { name: 'Report Generator', href: 'report-generator', icon: FileText },
    { name: 'Export Manager', href: 'export-manager', icon: Download },
    { name: 'Help & Support', href: 'help-support', icon: HelpCircle },
  ]

  const protocolLayers = [
    { name: 'PHY Layer', icon: Radio, description: 'Physical Layer Analysis', status: 'active' },
    { name: 'MAC Layer', icon: Network, description: 'Medium Access Control', status: 'active' },
    { name: 'RLC Layer', icon: Layers, description: 'Radio Link Control', status: 'active' },
    { name: 'PDCP Layer', icon: Database, description: 'Packet Data Convergence Protocol', status: 'active' },
    { name: 'RRC Layer', icon: Settings, description: 'Radio Resource Control', status: 'active' },
    { name: 'NAS Layer', icon: MessageSquare, description: 'Non-Access Stratum', status: 'active' },
    { name: 'IMS Layer', icon: Cloud, description: 'IP Multimedia Subsystem', status: 'active' }
  ]

  const coreNetworkAnalyzers = [
    { name: 'AMF Analyzer', icon: Server, description: 'Access and Mobility Management Function', technology: '5G' },
    { name: 'SMF Analyzer', icon: Router, description: 'Session Management Function', technology: '5G' },
    { name: 'UPF Analyzer', icon: Network, description: 'User Plane Function', technology: '5G' },
    { name: 'AUSF Analyzer', icon: Shield, description: 'Authentication Server Function', technology: '5G' },
    { name: 'UDM Analyzer', icon: Database, description: 'Unified Data Management', technology: '5G' },
    { name: 'Config Manager', icon: Settings, description: 'Configuration Management', technology: '5G' },
  ]

  const legacy4G = [
    { name: 'MME Analyzer', icon: Server, description: 'Mobility Management Entity', technology: '4G' },
    { name: 'SGW Analyzer', icon: Router, description: 'Serving Gateway', technology: '4G' },
    { name: 'PGW Analyzer', icon: Network, description: 'Packet Data Network Gateway', technology: '4G' }
  ]

  const oranFeatures = [
    { name: 'O-RAN Overview', icon: Globe, description: 'Complete O-RAN Analysis' },
    { name: 'O-RAN Interfaces', icon: GitBranch, description: 'E1, F1 Interface Analysis' },
    { name: 'CU/DU Analysis', icon: Cpu, description: 'Centralized/Distributed Unit' },
    { name: 'Performance Monitoring', icon: Gauge, description: 'O-RAN Performance Metrics' },
    { name: 'xApps Management', icon: Smartphone, description: 'O-RAN Applications' },
    { name: 'SMO Integration', icon: Cloud, description: 'Service Management and Orchestration' }
  ]

  const advancedTechnologies = [
    { name: 'NB-IoT Analysis', icon: Wifi, description: 'Narrowband IoT Analysis', color: 'bg-blue-500' },
    { name: 'V2X Communication', icon: Car, description: 'Vehicle-to-Everything', color: 'bg-green-500' },
    { name: 'NTN Networks', icon: Satellite, description: 'Non-Terrestrial Networks', color: 'bg-purple-500' },
    { name: 'Report Generator', icon: FileText, description: 'Comprehensive Reporting', color: 'bg-orange-500' }
  ]

  const cliIntegrations = [
    { name: 'srsRAN CLI', icon: Terminal, description: 'srsRAN Command Line Integration', status: 'connected' },
    { name: 'Open5GS CLI', icon: Terminal, description: 'Open5GS Integration', status: 'connected' },
    { name: 'Kamailio CLI', icon: Terminal, description: 'Kamailio Integration', status: 'disconnected' }
  ]

  // Generate sample logs for real-time appearance
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        const sampleLogs = [
          '[PHY] [I] [931.6] PDSCH: rnti=0x4601 h_id=0 k1=4 prb=[0,87) symb=[1,14) mod=QPSK rv=0 tbs=309 t=135.5us',
          '[MAC] [I] [938.5] DL PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55',
          '[RLC] [I] du=0 ue=0 SRB1 DL: TX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55',
          '[PDCP] [I] PDCP TX: ue=0 drb=1 sn=0 pdu_len=53',
          '[RRC] [I] RRC Connection Setup: ue=0 rnti=0x4601',
          '[NAS] [I] NAS Attach Request: imsi=123456789012345',
          '[IMS] [I] SIP INVITE: from=user1@domain.com to=user2@domain.com'
        ]
        
        const newLog = {
          id: Date.now() + Math.random(),
          timestamp: new Date().toLocaleTimeString(),
          level: ['DEBUG', 'INFO', 'WARN', 'ERROR'][Math.floor(Math.random() * 4)],
          component: ['PHY', 'MAC', 'RLC', 'PDCP', 'RRC', 'NAS', 'IMS'][Math.floor(Math.random() * 7)],
          message: sampleLogs[Math.floor(Math.random() * sampleLogs.length)]
        }
        
        setLogs(prev => [...prev.slice(-50), newLog])
      }, 1000 + Math.random() * 2000)
      
      return () => clearInterval(interval)
    }
  }, [isProcessing])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-500'
      case 'WARN':
        return 'text-yellow-500'
      case 'INFO':
        return 'text-blue-500'
      case 'DEBUG':
        return 'text-green-500'
      default:
        return 'text-gray-500'
    }
  }

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'PHY':
        return <Radio className="w-4 h-4 text-purple-500" />
      case 'MAC':
        return <Network className="w-4 h-4 text-blue-500" />
      case 'RLC':
        return <Layers className="w-4 h-4 text-green-500" />
      case 'PDCP':
        return <Database className="w-4 h-4 text-orange-500" />
      case 'RRC':
        return <Settings className="w-4 h-4 text-red-500" />
      case 'NAS':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />
      case 'IMS':
        return <Cloud className="w-4 h-4 text-cyan-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-500" />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-base-content/70">Loading 5GLabX Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-base-300">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TestTube className="w-5 h-5 text-primary-content" />
              </div>
              <span className="text-xl font-bold">5GLabX Cloud</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden btn btn-ghost btn-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-10">
                  <span className="text-sm">
                    {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.full_name || 'User'}
                </p>
                <p className="text-xs text-base-content/70 truncate">
                  User Plan
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Main Views */}
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                Main Views
              </h3>
              {mainViews.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveComponent(item.href)
                      setSidebarOpen(false)
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                      activeComponent === item.href
                        ? 'bg-primary text-primary-content'
                        : 'text-base-content hover:bg-base-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-success">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* O-RAN Analysis */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                O-RAN Analysis
              </h3>
              {oranAnalysis.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-success">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* NB-IoT Analysis */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                NB-IoT Analysis
              </h3>
              {nbiotAnalysis.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-success">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* C-V2X Analysis */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                C-V2X Analysis
              </h3>
              {v2xAnalysis.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-success">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* NTN Analysis */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                NTN Analysis
              </h3>
              {ntnAnalysis.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="badge badge-xs badge-success">{item.badge}</span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Protocol Layers */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                Protocol Layers
              </h3>
              {protocolLayers.map((layer, index) => {
                const Icon = layer.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(`layer-${layer.name.toLowerCase().replace(' ', '-')}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{layer.name}</span>
                    <div className={`w-2 h-2 rounded-full ${layer.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
                  </button>
                )
              })}
            </div>

            {/* Core Network */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                Core Network
              </h3>
              {coreNetworkAnalyzers.map((analyzer, index) => {
                const Icon = analyzer.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(`analyzer-${analyzer.name.toLowerCase().replace(' ', '-')}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{analyzer.name}</span>
                    <span className={`badge badge-xs ${analyzer.technology === '5G' ? 'badge-primary' : 'badge-secondary'}`}>
                      {analyzer.technology}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* 4G Legacy */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                4G Legacy
              </h3>
              {legacy4G.map((analyzer, index) => {
                const Icon = analyzer.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(`analyzer-${analyzer.name.toLowerCase().replace(' ', '-')}`)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{analyzer.name}</span>
                    <span className="badge badge-xs badge-secondary">{analyzer.technology}</span>
                  </button>
                )
              })}
            </div>

            {/* Utilities */}
            <div className="space-y-1 mt-6">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                Utilities
              </h3>
              {utilities.map((item, index) => {
                const Icon = item.icon
                return (
                  <button
                    key={index}
                    onClick={() => setActiveComponent(item.href)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left text-base-content hover:bg-base-300"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                  </button>
                )
              })}
            </div>
          </nav>

          {/* Connection Status */}
          <div className="p-4 border-t border-base-300">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
              <span className="text-base-content/70">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="bg-base-100 shadow-sm border-b border-base-300">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden btn btn-ghost btn-sm"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={16} />
                  <input
                    type="text"
                    placeholder="Search test cases, executions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered input-sm pl-10 w-64"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="btn btn-ghost btn-sm">
                <HelpCircle className="w-5 h-5" />
              </button>
              
              <button className="btn btn-ghost btn-sm relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full"></span>
              </button>
              
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-sm">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-8">
                      <span className="text-xs">
                        {user?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <button className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Account Settings
                    </button>
                  </li>
                  <li><div className="divider my-1"></div></li>
                  <li>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-error">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Real-time Log Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-4">
              {/* Processing Controls */}
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="card-title text-sm mb-3">Processing Controls</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsProcessing(!isProcessing)}
                      className={`btn btn-sm ${isProcessing ? 'btn-error' : 'btn-success'}`}
                    >
                      {isProcessing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isProcessing ? 'Stop' : 'Start'}
                    </button>
                    <button className="btn btn-sm btn-outline">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="card-title text-sm mb-3">System Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Messages/sec</span>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Buffer</span>
                      <span className="font-bold">2.3MB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Uptime</span>
                      <span className="font-bold">2h 34m</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CLI Integrations */}
              <div className="card bg-base-200">
                <div className="card-body p-4">
                  <h3 className="card-title text-sm mb-3">CLI Integrations</h3>
                  <div className="space-y-2">
                    {cliIntegrations.map((cli, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <cli.icon className="w-4 h-4" />
                        <span className="flex-1">{cli.name}</span>
                        <div className={`w-2 h-2 rounded-full ${cli.status === 'connected' ? 'bg-success' : 'bg-error'}`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Log Display */}
            <div className="lg:col-span-2">
              <div className="card bg-base-200 h-full">
                <div className="card-body p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="card-title text-sm">Real-time Log Analysis</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm text-base-content/70">Live</span>
                    </div>
                  </div>
                  
                  {/* Log Display */}
                  <div className="bg-base-300 rounded-lg p-4 h-[calc(100%-4rem)] overflow-y-auto font-mono text-sm">
                    {logs.length === 0 ? (
                      <div className="text-center text-base-content/50 py-8">
                        <Activity className="w-8 h-8 mx-auto mb-2" />
                        <p>Click Start to begin real-time log analysis</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {logs.map((log) => (
                          <div key={log.id} className="flex items-start gap-2 py-1">
                            <span className="text-xs text-base-content/50 w-20 flex-shrink-0">
                              {log.timestamp}
                            </span>
                            <span className={`text-xs w-12 flex-shrink-0 ${getLevelColor(log.level)}`}>
                              {log.level}
                            </span>
                            <div className="flex items-center gap-1 w-12 flex-shrink-0">
                              {getComponentIcon(log.component)}
                              <span className="text-xs">{log.component}</span>
                            </div>
                            <span className="text-xs flex-1 break-all">
                              {log.message}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard