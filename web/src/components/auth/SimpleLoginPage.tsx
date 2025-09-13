import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verifyAdminCredentials, verifyUserCredentials } from '../../lib/auth/simpleAuth'

export const SimpleLoginPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isAdmin) {
        // Admin login
        const result = await verifyAdminCredentials({
          username: credentials.username,
          password: credentials.password
        })

        if (result.success) {
          navigate('/admin/dashboard')
        } else {
          setError(result.error || 'Invalid admin credentials')
        }
      } else {
        // User login
        const result = await verifyUserCredentials({
          email: credentials.email,
          password: credentials.password
        })

        if (result.success) {
          navigate('/user/dashboard')
        } else {
          setError(result.error || 'Invalid user credentials')
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
            <svg className="h-8 w-8 text-primary-content" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-base-content">
            Sign in to 5GLabX Cloud
          </h2>
          <p className="mt-2 text-center text-sm text-base-content/70">
            Choose your login type
          </p>
        </div>

        {/* Login Type Toggle */}
        <div className="flex justify-center">
          <div className="btn-group">
            <button
              type="button"
              className={`btn ${!isAdmin ? 'btn-active' : 'btn-outline'}`}
              onClick={() => setIsAdmin(false)}
            >
              User Login
            </button>
            <button
              type="button"
              className={`btn ${isAdmin ? 'btn-active' : 'btn-outline'}`}
              onClick={() => setIsAdmin(true)}
            >
              Admin Login
            </button>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isAdmin ? (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-base-content">
                  Admin Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="mt-1 input input-bordered w-full"
                  placeholder="Enter admin username"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-base-content">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="mt-1 input input-bordered w-full"
                  placeholder="Enter your email"
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-base-content">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="mt-1 input input-bordered w-full"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <svg className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-primary-content bg-primary hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-content" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                `Sign in as ${isAdmin ? 'Admin' : 'User'}`
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-base-content/70">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-medium text-primary hover:text-primary-focus"
              >
                Sign up here
              </button>
            </p>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-base-200 rounded-lg">
          <h3 className="text-sm font-medium text-base-content mb-2">Demo Credentials:</h3>
          <div className="text-xs text-base-content/70 space-y-1">
            <div><strong>Admin:</strong> username: admin, password: admin123</div>
            <div><strong>User:</strong> Create account via signup page</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleLoginPage