import React, { createContext, useContext, useEffect, useState } from 'react'
import { useWebSocket } from '../../hooks/useWebSocket'
import { useAuth } from '../auth/AuthProvider'
import { Bell, Wifi, WifiOff } from 'lucide-react'
import toast from 'react-hot-toast'

interface WebSocketContextType {
  isConnected: boolean
  connectionError: string | null
  sendMessage: (message: any) => void
  subscribeToExecution: (executionId: string, callback: (data: any) => void) => () => void
  subscribeToCollaboration: (executionId: string, callback: (data: any) => void) => () => void
  sendCollaborationMessage: (executionId: string, message: any) => void
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider')
  }
  return context
}

interface WebSocketProviderProps {
  children: React.ReactNode
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const { 
    isConnected, 
    connectionError, 
    sendMessage, 
    subscribeToExecution, 
    subscribeToCollaboration, 
    sendCollaborationMessage 
  } = useWebSocket()
  
  const [notifications, setNotifications] = useState<any[]>([])
  const [showConnectionStatus, setShowConnectionStatus] = useState(false)

  // Show connection status when connection changes
  useEffect(() => {
    if (connectionError) {
      setShowConnectionStatus(true)
      toast.error('Connection lost. Attempting to reconnect...')
    } else if (isConnected) {
      setShowConnectionStatus(true)
      toast.success('Connected to real-time services')
      setTimeout(() => setShowConnectionStatus(false), 3000)
    }
  }, [isConnected, connectionError])

  // Subscribe to notifications
  useEffect(() => {
    if (!isConnected) return

    const unsubscribe = subscribeToExecution('notifications', (data) => {
      if (data.type === 'notification') {
        setNotifications(prev => [...prev, data])
        toast(data.message, {
          icon: data.icon || '🔔',
          duration: 4000
        })
      }
    })

    return unsubscribe
  }, [isConnected, subscribeToExecution])

  const value: WebSocketContextType = {
    isConnected,
    connectionError,
    sendMessage,
    subscribeToExecution,
    subscribeToCollaboration,
    sendCollaborationMessage
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
      
      {/* Connection Status Indicator */}
      {showConnectionStatus && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`alert ${isConnected ? 'alert-success' : 'alert-error'} shadow-lg`}>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <Wifi className="w-5 h-5" />
              ) : (
                <WifiOff className="w-5 h-5" />
              )}
              <span>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {notifications.length > 0 && (
        <div className="fixed top-4 left-4 z-50 max-w-sm">
          <div className="space-y-2">
            {notifications.slice(-3).map((notification, index) => (
              <div key={index} className="alert alert-info shadow-lg">
                <Bell className="w-5 h-5" />
                <div>
                  <h3 className="font-bold">{notification.title}</h3>
                  <div className="text-xs">{notification.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </WebSocketContext.Provider>
  )
}