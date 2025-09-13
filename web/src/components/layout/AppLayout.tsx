import React, { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { useBilling } from '../billing/BillingProvider'
import { Navbar } from './Navbar'
import { QuotaDisplay, QuotaAlert } from '../billing/QuotaDisplay'
import { 
  LayoutDashboard, 
  TestTube, 
  BarChart3, 
  History, 
  User, 
  Settings,
  Shield,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react'

export const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const { user, signOut } = useAuth()
  const { quotaInfo } = useBilling()
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user should see onboarding
  useEffect(() => {
    if (user && user.role === 'trial' && !user.onboarding_completed) {
      setShowOnboarding(true)
    }
  }, [user])

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Test Suites', href: '/app/test-suites', icon: TestTube },
    { name: 'Analyzer', href: '/app/analyzer', icon: BarChart3 },
    { name: 'Executions', href: '/app/executions', icon: History },
    { name: 'Account', href: '/app/account', icon: User },
  ]

  // Add admin link if user is admin
  if (user?.role === 'admin') {
    navigation.push({ name: 'Admin', href: '/app/admin', icon: Shield })
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const isActive = (href: string) => {
    return location.pathname === href
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-base-100">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-base-content opacity-50"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-base-300">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-primary text-xl">5G</span>
              <span className="font-bold text-xl">LabX</span>
              <span className="text-sm text-base-content/70">Cloud</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-base-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold">
                {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user?.full_name || 'No name'}
                </p>
                <p className="text-xs text-base-content/70 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
            
            {/* Quota Display */}
            <div className="mt-3">
              <QuotaDisplay />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-content'
                      : 'text-base-content hover:bg-base-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-base-300 space-y-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-base-content hover:bg-base-300 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-base-content hover:bg-base-300 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button 
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-base-content hover:bg-base-300 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-base-100 border-b border-base-300">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">
                {navigation.find(item => isActive(item.href))?.name || '5GLabX Cloud'}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Quota Badge for mobile */}
              <div className="lg:hidden">
                <QuotaDisplay />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          <div className="p-4">
            {/* Quota Alert */}
            <QuotaAlert />
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}