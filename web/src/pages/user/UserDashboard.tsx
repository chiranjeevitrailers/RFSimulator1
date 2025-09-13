import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../../lib/auth/simpleAuth'
import { User } from '../../lib/auth/simpleAuth'
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
  Terminal
} from 'lucide-react'

export const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeComponent, setActiveComponent] = useState('dashboard')
  const [isProcessing, setIsProcessing] = useState(false)
  const [logs, setLogs] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    
    setUser(currentUser)
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
  }

  // 5GLabX Navigation Components
  const navigation = [
    { name: 'Dashboard', href: 'dashboard', icon: BarChart3 },
    { name: 'Test Suites', href: 'test-suites', icon: TestTube },
    { name: 'Protocol Analyzer', href: 'analyzer', icon: BarChart3 },
    { name: 'Executions', href: 'executions', icon: Clock },
    { name: 'Analytics', href: 'analytics', icon: BarChart3 },
    { name: 'Account', href: 'account', icon: User },
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

  if (loading) {
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
      {/* Header */}
      <header className="bg-base-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-base-content">User Dashboard</h1>
              <p className="mt-1 text-sm text-base-content/70">
                Welcome back, {user?.full_name || user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="badge badge-secondary">User</span>
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-base-200 rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-xl">
                  {user?.full_name?.charAt(0) || user?.email.charAt(0)}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">
                Hello, {user?.full_name || 'User'}!
              </h2>
              <p className="text-base-content/70">
                You're logged in as a regular user. Here's what you can do:
              </p>
            </div>
          </div>
        </div>

        {/* 5GLabX Access Card */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-base-content mb-2">
                🚀 Access 5GLabX Cloud
              </h2>
              <p className="text-base-content/70 text-lg mb-4">
                Your professional 4G/5G protocol analysis platform is ready. Start analyzing protocols, running 3GPP test cases, and exploring our comprehensive test suite library.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => navigate('/app/dashboard')}
                  className="btn btn-primary btn-lg"
                >
                  Open 5GLabX Platform
                </button>
                <button 
                  onClick={() => navigate('/app/test-suites')}
                  className="btn btn-outline btn-lg"
                >
                  Browse Test Suites
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <svg className="w-6 h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-base-content">Test Execution</h3>
            </div>
            <p className="text-base-content/70 mb-4">
              Run 3GPP test cases and analyze protocol messages in real-time.
            </p>
            <button 
              onClick={() => navigate('/app/test-suites')}
              className="btn btn-primary btn-sm"
            >
              Start Testing
            </button>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-secondary rounded-lg">
                <svg className="w-6 h-6 text-secondary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-base-content">Protocol Analyzer</h3>
            </div>
            <p className="text-base-content/70 mb-4">
              Analyze protocol messages, view detailed logs, and examine test results.
            </p>
            <button 
              onClick={() => navigate('/app/analyzer')}
              className="btn btn-secondary btn-sm"
            >
              Open Analyzer
            </button>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-accent rounded-lg">
                <svg className="w-6 h-6 text-accent-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-base-content">Analytics</h3>
            </div>
            <p className="text-base-content/70 mb-4">
              View your test execution history and performance analytics.
            </p>
            <button 
              onClick={() => navigate('/app/analytics')}
              className="btn btn-accent btn-sm"
            >
              View Analytics
            </button>
          </div>
        </div>

        {/* User Information */}
        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-base-content mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-base-content/70">Full Name</label>
              <p className="mt-1 text-base-content">{user?.full_name || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70">Email</label>
              <p className="mt-1 text-base-content">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70">Role</label>
              <p className="mt-1 text-base-content">
                <span className="badge badge-secondary">{user?.role}</span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70">Status</label>
              <p className="mt-1 text-base-content">
                <span className={`badge ${user?.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {user?.status}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70">Member Since</label>
              <p className="mt-1 text-base-content">
                {new Date(user?.created_at || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-base-content/70">Last Updated</label>
              <p className="mt-1 text-base-content">
                {new Date(user?.updated_at || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default UserDashboard