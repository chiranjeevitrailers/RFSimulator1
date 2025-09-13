import React, { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, logoutUser, User } from '../../lib/auth/simpleAuth'

interface SimpleAuthContextType {
  user: User | null
  loading: boolean
  signOut: () => void
}

const SimpleAuthContext = createContext<SimpleAuthContextType | undefined>(undefined)

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext)
  if (context === undefined) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider')
  }
  return context
}

interface SimpleAuthProviderProps {
  children: React.ReactNode
}

const SimpleAuthProvider: React.FC<SimpleAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const signOut = () => {
    logoutUser()
    setUser(null)
  }

  const value: SimpleAuthContextType = {
    user,
    loading,
    signOut
  }

  return (
    <SimpleAuthContext.Provider value={value}>
      {children}
    </SimpleAuthContext.Provider>
  )
}

export default SimpleAuthProvider