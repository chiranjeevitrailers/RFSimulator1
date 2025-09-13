import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export interface AdminCredentials {
  username: string
  password: string
}

export interface UserCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  full_name: string
  role: string
  status: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  error?: string
}

// Admin Authentication
export const verifyAdminCredentials = async (credentials: AdminCredentials): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.rpc('verify_admin_credentials', {
      username: credentials.username,
      password: credentials.password
    })

    if (error) {
      console.error('Admin auth error:', error)
      return { success: false, error: error.message }
    }

    if (data) {
      // Store admin session in localStorage
      localStorage.setItem('admin_session', JSON.stringify({
        username: credentials.username,
        timestamp: Date.now()
      }))
      
      return { success: true }
    } else {
      return { success: false, error: 'Invalid admin credentials' }
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return { success: false, error: 'Authentication failed' }
  }
}

// User Authentication
export const verifyUserCredentials = async (credentials: UserCredentials): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.rpc('verify_user_credentials', {
      user_email: credentials.email,
      user_password: credentials.password
    })

    if (error) {
      console.error('User auth error:', error)
      return { success: false, error: error.message }
    }

    if (data && data.length > 0) {
      const user = data[0]
      
      // Store user session in localStorage
      localStorage.setItem('user_session', JSON.stringify({
        user: user,
        timestamp: Date.now()
      }))
      
      return { success: true, user: user }
    } else {
      return { success: false, error: 'Invalid user credentials' }
    }
  } catch (error) {
    console.error('User auth error:', error)
    return { success: false, error: 'Authentication failed' }
  }
}

// User Registration
export const createUser = async (email: string, password: string, fullName?: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.rpc('create_user', {
      user_email: email,
      user_password: password,
      user_full_name: fullName || null
    })

    if (error) {
      console.error('User creation error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('User creation error:', error)
    return { success: false, error: 'User creation failed' }
  }
}

// Get all users (admin only)
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const { data, error } = await supabase.rpc('get_all_users')

    if (error) {
      console.error('Get users error:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Get users error:', error)
    return []
  }
}

// Update user status (admin only)
export const updateUserStatus = async (userId: string, status: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('update_user_status', {
      user_id: userId,
      new_status: status
    })

    if (error) {
      console.error('Update user status error:', error)
      return false
    }

    return data || false
  } catch (error) {
    console.error('Update user status error:', error)
    return false
  }
}

// Delete user (admin only)
export const deleteUser = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('delete_user', {
      user_id: userId
    })

    if (error) {
      console.error('Delete user error:', error)
      return false
    }

    return data || false
  } catch (error) {
    console.error('Delete user error:', error)
    return false
  }
}

// Check if user is logged in
export const getCurrentUser = (): User | null => {
  try {
    const session = localStorage.getItem('user_session')
    if (!session) return null

    const sessionData = JSON.parse(session)
    const now = Date.now()
    const sessionAge = now - sessionData.timestamp

    // Session expires after 24 hours
    if (sessionAge > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('user_session')
      return null
    }

    return sessionData.user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

// Check if admin is logged in
export const getCurrentAdmin = (): { username: string } | null => {
  try {
    const session = localStorage.getItem('admin_session')
    if (!session) return null

    const sessionData = JSON.parse(session)
    const now = Date.now()
    const sessionAge = now - sessionData.timestamp

    // Session expires after 24 hours
    if (sessionAge > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('admin_session')
      return null
    }

    return { username: sessionData.username }
  } catch (error) {
    console.error('Get current admin error:', error)
    return null
  }
}

// Logout functions
export const logoutUser = (): void => {
  localStorage.removeItem('user_session')
}

export const logoutAdmin = (): void => {
  localStorage.removeItem('admin_session')
}

// Check if user is admin
export const isAdmin = (): boolean => {
  return getCurrentAdmin() !== null
}

// Check if user is regular user
export const isUser = (): boolean => {
  return getCurrentUser() !== null
}