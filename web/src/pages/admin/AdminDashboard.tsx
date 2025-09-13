import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllUsers, updateUserStatus, deleteUser, getCurrentAdmin, logoutAdmin } from '../../lib/auth/simpleAuth'
import { User } from '../../lib/auth/simpleAuth'

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [admin, setAdmin] = useState<{ username: string } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if admin is logged in
    const currentAdmin = getCurrentAdmin()
    if (!currentAdmin) {
      navigate('/login')
      return
    }
    
    setAdmin(currentAdmin)
    loadUsers()
  }, [navigate])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const userList = await getAllUsers()
      setUsers(userList)
    } catch (error) {
      setError('Failed to load users')
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUserStatusChange = async (userId: string, newStatus: string) => {
    try {
      const success = await updateUserStatus(userId, newStatus)
      if (success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ))
      } else {
        setError('Failed to update user status')
      }
    } catch (error) {
      setError('Failed to update user status')
      console.error('Error updating user status:', error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const success = await deleteUser(userId)
      if (success) {
        setUsers(users.filter(user => user.id !== userId))
      } else {
        setError('Failed to delete user')
      }
    } catch (error) {
      setError('Failed to delete user')
      console.error('Error deleting user:', error)
    }
  }

  const handleLogout = () => {
    logoutAdmin()
    navigate('/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-base-content/70">Loading admin dashboard...</p>
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
              <h1 className="text-3xl font-bold text-base-content">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-base-content/70">
                Welcome back, {admin?.username}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="badge badge-primary">Admin</span>
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
        {error && (
          <div className="mb-6 alert alert-error">
            <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-primary rounded-lg">
                <svg className="w-6 h-6 text-primary-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">Total Users</p>
                <p className="text-2xl font-semibold text-base-content">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-success rounded-lg">
                <svg className="w-6 h-6 text-success-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">Active Users</p>
                <p className="text-2xl font-semibold text-base-content">
                  {users.filter(user => user.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-warning rounded-lg">
                <svg className="w-6 h-6 text-warning-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">Inactive Users</p>
                <p className="text-2xl font-semibold text-base-content">
                  {users.filter(user => user.status === 'inactive').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-base-200 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-info rounded-lg">
                <svg className="w-6 h-6 text-info-content" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-base-content/70">New This Month</p>
                <p className="text-2xl font-semibold text-base-content">
                  {users.filter(user => {
                    const userDate = new Date(user.created_at)
                    const now = new Date()
                    return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Table */}
        <div className="bg-base-200 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-base-300">
            <h2 className="text-lg font-medium text-base-content">User Management</h2>
            <p className="mt-1 text-sm text-base-content/70">
              Manage user accounts and permissions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-10">
                            <span className="text-sm">
                              {user.full_name?.charAt(0) || user.email.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-base-content">
                            {user.full_name || 'No name'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-base-content/70">{user.email}</td>
                    <td>
                      <span className="badge badge-outline">{user.role}</span>
                    </td>
                    <td>
                      <select
                        value={user.status}
                        onChange={(e) => handleUserStatusChange(user.id, e.target.value)}
                        className="select select-bordered select-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </td>
                    <td className="text-base-content/70">
                      {formatDate(user.created_at)}
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="btn btn-error btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-base-content">No users found</h3>
              <p className="mt-1 text-sm text-base-content/70">
                Users will appear here once they sign up.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard