import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  User, 
  Mail, 
  CreditCard, 
  Settings, 
  Bell, 
  Shield, 
  Download,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../../hooks/useAuth'
import toast from 'react-hot-toast'

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    fullName: '',
    email: ''
  })
  const { user, updateProfile } = useAuth()

  // Fetch user subscription info
  const { data: subscriptionInfo } = useQuery({
    queryKey: ['user-quota', user?.id],
    queryFn: async () => {
      if (!user?.id) return null
      
      const { data, error } = await supabase
        .rpc('get_user_quota_info', { user_id: user.id })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  const handleEditProfile = () => {
    setEditForm({
      fullName: user?.full_name || '',
      email: user?.email || ''
    })
    setIsEditing(true)
  }

  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        full_name: editForm.fullName,
        email: editForm.email
      })
      setIsEditing(false)
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditForm({ fullName: '', email: '' })
  }

  const handleUpgradePlan = () => {
    // Redirect to pricing or checkout
    window.open('/pricing', '_blank')
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-base-content/70">
          Manage your account settings, billing, and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body p-0">
              <ul className="menu p-4 w-full">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        className={`flex items-center gap-3 ${
                          activeTab === tab.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon size={20} />
                        {tab.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={handleEditProfile}
                      className="btn btn-outline btn-sm"
                    >
                      <Edit size={16} />
                      Edit Profile
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                      {user?.full_name ? user.full_name.charAt(0).toUpperCase() : user?.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">
                        {user?.full_name || 'No name set'}
                      </h3>
                      <p className="text-base-content/70">{user?.email}</p>
                      <div className="badge badge-primary mt-1">
                        {user?.role} Plan
                      </div>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm(prev => ({ ...prev, fullName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          className="input input-bordered w-full"
                          value={editForm.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveProfile}
                          className="btn btn-primary btn-sm"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="btn btn-ghost btn-sm"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Full Name</span>
                        </label>
                        <div className="p-3 bg-base-200 rounded-lg">
                          {user?.full_name || 'Not set'}
                        </div>
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <div className="p-3 bg-base-200 rounded-lg">
                          {user?.email}
                        </div>
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Account Type</span>
                        </label>
                        <div className="p-3 bg-base-200 rounded-lg">
                          {user?.role}
                        </div>
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Member Since</span>
                        </label>
                        <div className="p-3 bg-base-200 rounded-lg">
                          {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h2 className="text-2xl font-bold mb-6">Current Plan</h2>
                  
                  {subscriptionInfo && (
                    <div className="bg-base-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{subscriptionInfo.planName}</h3>
                          <p className="text-base-content/70">
                            {subscriptionInfo.unlimited ? 'Unlimited executions' : `${subscriptionInfo.execLimit} executions per month`}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            {subscriptionInfo.planName === 'Trial' ? 'Free' : 
                             subscriptionInfo.planName === 'Pro' ? '$99/month' : 'Custom'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-base-content/70">This Month</p>
                          <p className="text-lg font-semibold">{subscriptionInfo.currentExecutions}</p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">Remaining</p>
                          <p className="text-lg font-semibold">
                            {subscriptionInfo.unlimited ? 'Unlimited' : subscriptionInfo.remainingExecutions}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">Reset Date</p>
                          <p className="text-lg font-semibold">
                            {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      {!subscriptionInfo.unlimited && subscriptionInfo.execLimit && (
                        <div className="mb-4">
                          <progress 
                            className="progress progress-primary w-full" 
                            value={subscriptionInfo.currentExecutions} 
                            max={subscriptionInfo.execLimit}
                          ></progress>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {subscriptionInfo.planName === 'Trial' && (
                          <button onClick={handleUpgradePlan} className="btn btn-primary">
                            Upgrade to Pro
                          </button>
                        )}
                        <button className="btn btn-outline">
                          View Billing History
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                  <div className="bg-base-200 rounded-lg p-4">
                    <p className="text-base-content/70">No payment method on file</p>
                    <button className="btn btn-outline btn-sm mt-2">
                      Add Payment Method
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Email Notifications</h4>
                      <p className="text-sm text-base-content/70">Receive email updates about your account</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Test Execution Alerts</h4>
                      <p className="text-sm text-base-content/70">Get notified when tests complete or fail</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Weekly Reports</h4>
                      <p className="text-sm text-base-content/70">Receive weekly usage and performance reports</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">Product Updates</h4>
                      <p className="text-sm text-base-content/70">Stay informed about new features and improvements</p>
                    </div>
                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Password</h3>
                    <button className="btn btn-outline">
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Two-Factor Authentication</h3>
                    <p className="text-sm text-base-content/70 mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <button className="btn btn-outline">
                      Enable 2FA
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Active Sessions</h3>
                    <div className="bg-base-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-base-content/70">
                            {navigator.userAgent} • {new Date().toLocaleString()}
                          </p>
                        </div>
                        <div className="badge badge-success">Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data & Privacy Tab */}
          {activeTab === 'data' && (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="text-2xl font-bold mb-6">Data & Privacy</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Export Your Data</h3>
                    <p className="text-sm text-base-content/70 mb-3">
                      Download a copy of all your data including test executions, results, and account information.
                    </p>
                    <button className="btn btn-outline">
                      <Download size={16} />
                      Export Data
                    </button>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Delete Account</h3>
                    <p className="text-sm text-base-content/70 mb-3">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="btn btn-error">
                      <Trash2 size={16} />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountPage