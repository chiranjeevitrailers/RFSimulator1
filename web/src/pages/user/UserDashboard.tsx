import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../../lib/auth/simpleAuth'
import { User } from '../../lib/auth/simpleAuth'

export const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-base-content/70">Loading user dashboard...</p>
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
            <button className="btn btn-primary btn-sm">
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
              <h3 className="ml-3 text-lg font-medium text-base-content">Analytics</h3>
            </div>
            <p className="text-base-content/70 mb-4">
              View your test execution history and performance analytics.
            </p>
            <button className="btn btn-secondary btn-sm">
              View Analytics
            </button>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-accent rounded-lg">
                <svg className="w-6 h-6 text-accent-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-base-content">Settings</h3>
            </div>
            <p className="text-base-content/70 mb-4">
              Manage your account settings and preferences.
            </p>
            <button className="btn btn-accent btn-sm">
              Open Settings
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