import { useState, useEffect } from 'react'
import { AuthService } from '../lib/supabase/auth'
import type { User } from '../lib/supabase/types'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Error getting initial session:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { user, error } = await AuthService.signIn({ email, password })
    return { data: user, error }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { user, error } = await AuthService.signUp({ email, password, fullName })
    return { data: user, error }
  }

  const signOut = async () => {
    const { error } = await AuthService.signOut()
    return { error }
  }

  const resetPassword = async (email: string) => {
    const { error } = await AuthService.resetPassword(email)
    return { error }
  }

  const updatePassword = async (password: string) => {
    const { error } = await AuthService.updatePassword(password)
    return { error }
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in')
    
    const { user: updatedUser, error } = await AuthService.updateProfile(user.id, updates)
    if (error) throw error
    
    return updatedUser
  }

  const signInWithProvider = async (provider: 'google' | 'github') => {
    const { error } = await AuthService.signInWithProvider(provider)
    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    signInWithProvider
  }
}