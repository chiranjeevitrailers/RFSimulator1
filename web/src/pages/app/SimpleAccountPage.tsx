import React from 'react'

export const SimpleAccountPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Account Settings ⚙️
              </h1>
              <p className="text-base-content/70 text-lg">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  placeholder="Enter your full name"
                  defaultValue="User"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Email</label>
                <input 
                  type="email" 
                  className="input input-bordered w-full" 
                  placeholder="Enter your email"
                  defaultValue="user@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Role</label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  value="User"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Status</label>
                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  value="Active"
                  disabled
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Current Password</label>
                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">New Password</label>
                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content/70 mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  placeholder="Confirm new password"
                />
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-secondary">Update Password</button>
            </div>
          </div>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Account Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-base-content/70">Plan</span>
                <span className="font-medium">Trial</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-base-content/70">Executions Used</span>
                <span className="font-medium">0/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-base-content/70">Member Since</span>
                <span className="font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-base-content/70">Last Login</span>
                <span className="font-medium">Now</span>
              </div>
            </div>
          </div>

          <div className="bg-base-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="btn btn-outline w-full">
                Export Data
              </button>
              <button className="btn btn-outline w-full">
                Download Logs
              </button>
              <button className="btn btn-outline w-full">
                API Keys
              </button>
              <button className="btn btn-error w-full">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleAccountPage