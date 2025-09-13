import React, { createContext, useContext, useState, useEffect } from 'react'

interface SimpleWebSocketContextType {
  isConnected: boolean
}

const SimpleWebSocketContext = createContext<SimpleWebSocketContextType | undefined>(undefined)

export const useSimpleWebSocket = () => {
  const context = useContext(SimpleWebSocketContext)
  if (context === undefined) {
    throw new Error('useSimpleWebSocket must be used within a SimpleWebSocketProvider')
  }
  return context
}

interface SimpleWebSocketProviderProps {
  children: React.ReactNode
}

const SimpleWebSocketProvider: React.FC<SimpleWebSocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true) // Simulate connected state

  useEffect(() => {
    // Simulate WebSocket connection
    const interval = setInterval(() => {
      setIsConnected(Math.random() > 0.1) // 90% chance of being connected
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const value: SimpleWebSocketContextType = {
    isConnected
  }

  return (
    <SimpleWebSocketContext.Provider value={value}>
      {children}
    </SimpleWebSocketContext.Provider>
  )
}

export default SimpleWebSocketProvider