import React, { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
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
  LogOut
} from 'lucide-react'

export const SimpleAppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Test Suites', href: '/app/test-suites', icon: TestTube },
    { name: 'Protocol Analyzer', href: '/app/analyzer', icon: BarChart3 },
    { name: 'Executions', href: '/app/executions', icon: Clock },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { name: 'Account', href: '/app/account', icon: User },
  ]

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  const handleSignOut = () => {
    // Simple logout - just redirect to login
    window.location.href = '/login'
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
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <TestTube className="w-5 h-5 text-primary-content" />
              </div>
              <span className="text-xl font-bold">5GLabX Cloud</span>
            </Link>
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
                  <span className="text-sm">U</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User</p>
                <p className="text-xs text-base-content/70 truncate">Trial Plan</p>
              </div>
            </div>
          </div>

          {/* Quota Display */}
          <div className="p-4 border-b border-base-300">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">Plan</span>
                <span className="font-medium">Trial</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-base-content/70">Executions</span>
                <span className="font-medium">10 remaining</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                Core Features
              </h3>
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary text-primary-content'
                        : 'text-base-content hover:bg-base-300'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.name}
                  </Link>
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
                    className="input input-bordered input-sm pl-10 w-64"
                    onFocus={() => setSearchOpen(true)}
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
                      <span className="text-xs">U</span>
                    </div>
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/app/account" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Account Settings
                    </Link>
                  </li>
                  <li><div className="divider my-1"></div></li>
                  <li>
                    <button onClick={handleSignOut} className="flex items-center gap-2 text-error">
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
          <Outlet />
        </main>
      </div>

      {/* Search Modal */}
      {searchOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" size={20} />
              <input
                type="text"
                placeholder="Search test cases, executions, users..."
                className="input input-bordered w-full pl-10"
                autoFocus
              />
            </div>
            <div className="modal-action">
              <button 
                onClick={() => setSearchOpen(false)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SimpleAppLayout