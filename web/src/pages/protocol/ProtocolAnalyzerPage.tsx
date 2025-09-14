import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { useSimpleAuth } from '../../components/auth/SimpleAuthProvider'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { useSimpleWebSocket } from '../../components/layout/SimpleWebSocketProvider'
import { ProtocolAnalyzerRoutes } from '../../routes/ProtocolAnalyzerRoutes'

export const ProtocolAnalyzerPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useSimpleAuth()
  const { quotaInfo } = useSimpleBilling()
  const { isConnected } = useSimpleWebSocket()

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  // Navigation structure matching the user requirements
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

  const protocolLayers = [
    { name: 'PHY Layer', href: 'layer-phy', icon: Radio, description: 'Physical Layer Analysis', status: 'active' },
    { name: 'MAC Layer', href: 'layer-mac', icon: Network, description: 'Medium Access Control', status: 'active' },
    { name: 'RLC Layer', href: 'layer-rlc', icon: Layers, description: 'Radio Link Control', status: 'active' },
    { name: 'PDCP Layer', href: 'layer-pdcp', icon: Database, description: 'Packet Data Convergence Protocol', status: 'active' },
    { name: 'RRC Layer', href: 'layer-rrc', icon: Settings, description: 'Radio Resource Control', status: 'active' },
    { name: 'NAS Layer', href: 'layer-nas', icon: MessageSquare, description: 'Non-Access Stratum', status: 'active' },
    { name: 'IMS Analysis', href: 'layer-ims', icon: Cloud, description: 'IP Multimedia Subsystem', status: 'active' }
  ]

  const coreNetworkAnalyzers = [
    { name: 'AMF Analyzer', href: 'analyzer-amf', icon: Server, description: 'Access and Mobility Management Function', technology: '5G' },
    { name: 'SMF Analyzer', href: 'analyzer-smf', icon: Router, description: 'Session Management Function', technology: '5G' },
    { name: 'UPF Analyzer', href: 'analyzer-upf', icon: Network, description: 'User Plane Function', technology: '5G' },
    { name: 'AUSF Analyzer', href: 'analyzer-ausf', icon: Shield, description: 'Authentication Server Function', technology: '5G' },
    { name: 'UDM Analyzer', href: 'analyzer-udm', icon: Database, description: 'Unified Data Management', technology: '5G' },
    { name: 'Config Manager', href: 'analyzer-config-manager', icon: Settings, description: 'Configuration Management', technology: '5G' },
  ]

  const legacy4G = [
    { name: 'MME Analyzer', href: 'analyzer-mme', icon: Server, description: 'Mobility Management Entity', technology: '4G' },
    { name: 'SGW Analyzer', href: 'analyzer-sgw', icon: Router, description: 'Serving Gateway', technology: '4G' },
    { name: 'PGW Analyzer', href: 'analyzer-pgw', icon: Network, description: 'Packet Data Network Gateway', technology: '4G' }
  ]

  const utilities = [
    { name: 'Report Generator', href: 'report-generator', icon: FileText },
    { name: 'Export Manager', href: 'export-manager', icon: Download },
    { name: 'Help & Support', href: 'help-support', icon: HelpCircle },
  ]

  const isActive = (href: string) => {
    return location.pathname.includes(href)
  }

  const renderNavigationSection = (title: string, items: any[], key: string) => (
    <div key={key} className="space-y-1 mt-6">
      <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
        {title}
      </h3>
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={index}
            onClick={() => {
              navigate(`/app/protocol/${item.href}`)
              setSidebarOpen(false)
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
              isActive(item.href)
                ? 'bg-primary text-primary-content'
                : 'text-base-content hover:bg-base-300'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="flex-1">{item.name}</span>
            {item.badge && (
              <span className="badge badge-xs badge-success">{item.badge}</span>
            )}
            {item.technology && (
              <span className={`badge badge-xs ${item.technology === '5G' ? 'badge-primary' : 'badge-secondary'}`}>
                {item.technology}
              </span>
            )}
            {item.status && (
              <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-success' : 'bg-error'}`}></div>
            )}
          </button>
        )
      })}
    </div>
  )

  if (!user) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-base-content/70">Loading 5GLabX Protocol Analyzer...</p>
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
                  {quotaInfo?.planName || 'Trial'} Plan
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Main Views */}
            {renderNavigationSection('MAIN VIEWS', mainViews, 'main-views')}

            {/* O-RAN Analysis */}
            {renderNavigationSection('O-RAN Analysis', oranAnalysis, 'oran-analysis')}

            {/* NB-IoT Analysis */}
            {renderNavigationSection('NB-IoT Analysis', nbiotAnalysis, 'nbiot-analysis')}

            {/* C-V2X Analysis */}
            {renderNavigationSection('C-V2X Analysis', v2xAnalysis, 'v2x-analysis')}

            {/* NTN Analysis */}
            {renderNavigationSection('NTN Analysis', ntnAnalysis, 'ntn-analysis')}

            {/* Protocol Layers */}
            {renderNavigationSection('Protocol Layers', protocolLayers, 'protocol-layers')}

            {/* Core Network */}
            {renderNavigationSection('Core Network', coreNetworkAnalyzers, 'core-network')}

            {/* 4G Legacy */}
            {renderNavigationSection('4G Legacy', legacy4G, '4g-legacy')}

            {/* Utilities */}
            {renderNavigationSection('Utilities', utilities, 'utilities')}
          </nav>

          {/* Connection Status */}
          <div className="p-4 border-t border-base-300">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-success animate-pulse' : 'bg-error'
              }`}></div>
              <span className="text-base-content/70">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
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
                    placeholder="Search logs, IEs, components..."
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
          <ProtocolAnalyzerRoutes />
        </main>
      </div>
    </div>
  )
}

export default ProtocolAnalyzerPage