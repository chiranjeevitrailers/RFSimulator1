import { supabase } from './client'
import type { User } from './types'

export interface AuthResponse {
  user: User | null
  error: Error | null
}

export interface SignUpData {
  email: string
  password: string
  fullName?: string
}

export interface SignInData {
  email: string
  password: string
}

export class AuthService {
  // Sign up with email and password
  static async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName
          }
        }
      })

      if (error) {
        return { user: null, error }
      }

      // Get user profile
      if (authData.user) {
        const profile = await this.getUserProfile(authData.user.id)
        return { user: profile, error: null }
      }

      return { user: null, error: new Error('No user data returned') }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  // Sign in with email and password
  static async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      })

      if (error) {
        return { user: null, error }
      }

      // Get user profile
      if (authData.user) {
        const profile = await this.getUserProfile(authData.user.id)
        return { user: profile, error: null }
      }

      return { user: null, error: new Error('No user data returned') }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  // Sign out
  static async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Get current user
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        return null
      }

      return await this.getUserProfile(user.id)
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  // Get user profile
  static async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error getting user profile:', error)
        return null
      }

      // Get user subscription if exists
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      return {
        ...profile,
        subscription: subscription || undefined
      }
    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  // Update user profile
  static async updateProfile(userId: string, updates: Partial<User>): Promise<{ user: User | null, error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return { user: null, error }
      }

      // Get updated profile with subscription
      const user = await this.getUserProfile(userId)
      return { user, error: null }
    } catch (error) {
      return { user: null, error: error as Error }
    }
  }

  // Reset password
  static async resetPassword(email: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Update password
  static async updatePassword(password: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.updateUser({ password })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Sign in with OAuth provider
  static async signInWithProvider(provider: 'google' | 'github'): Promise<{ error: Error | null }> {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/app/dashboard`
        }
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Listen to auth state changes
  static onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getUserProfile(session.user.id)
        callback(user)
      } else {
        callback(null)
      }
    })
  }
}

export default AuthService