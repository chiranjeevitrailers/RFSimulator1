import { useEffect, useState, useCallback } from 'react'
import { wsManager, type WebSocketMessage, type CollaborationMessage } from '../lib/websocket/WebSocketManager'

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)

  useEffect(() => {
    const handleConnected = () => {
      setIsConnected(true)
      setConnectionError(null)
    }

    const handleDisconnected = () => {
      setIsConnected(false)
    }

    const handleError = (error: any) => {
      setConnectionError('Connection error')
      console.error('WebSocket error:', error)
    }

    // Connect to WebSocket
    wsManager.connect()

    // Subscribe to connection events
    const unsubscribeConnected = wsManager.on('connected', handleConnected)
    const unsubscribeDisconnected = wsManager.on('disconnected', handleDisconnected)
    const unsubscribeError = wsManager.on('error', handleError)

    return () => {
      unsubscribeConnected()
      unsubscribeDisconnected()
      unsubscribeError()
      wsManager.disconnect()
    }
  }, [])

  const sendMessage = useCallback((message: WebSocketMessage) => {
    wsManager.send(message)
  }, [])

  const subscribeToExecution = useCallback((executionId: string, callback: (data: any) => void) => {
    return wsManager.subscribeToExecution(executionId, callback)
  }, [])

  const subscribeToCollaboration = useCallback((executionId: string, callback: (data: CollaborationMessage) => void) => {
    return wsManager.subscribeToCollaboration(executionId, callback)
  }, [])

  const sendCollaborationMessage = useCallback((executionId: string, message: CollaborationMessage) => {
    wsManager.sendCollaborationMessage(executionId, message)
  }, [])

  return {
    isConnected,
    connectionError,
    sendMessage,
    subscribeToExecution,
    subscribeToCollaboration,
    sendCollaborationMessage
  }
}

export const useExecutionUpdates = (executionId: string | null) => {
  const [executionData, setExecutionData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!executionId) return

    setIsLoading(true)
    
    const unsubscribe = wsManager.subscribeToExecution(executionId, (data) => {
      setExecutionData(data)
      setIsLoading(false)
    })

    return unsubscribe
  }, [executionId])

  return {
    executionData,
    isLoading
  }
}

export const useCollaboration = (executionId: string | null) => {
  const [collaborators, setCollaborators] = useState<CollaborationMessage[]>([])
  const [activeUsers, setActiveUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!executionId) return

    const unsubscribe = wsManager.subscribeToCollaboration(executionId, (message) => {
      setCollaborators(prev => [...prev, message])
      
      // Track active users
      setActiveUsers(prev => {
        const newSet = new Set(prev)
        newSet.add(message.userId)
        return newSet
      })

      // Remove user from active list after 30 seconds of inactivity
      setTimeout(() => {
        setActiveUsers(prev => {
          const newSet = new Set(prev)
          newSet.delete(message.userId)
          return newSet
        })
      }, 30000)
    })

    return unsubscribe
  }, [executionId])

  const sendCursorMove = useCallback((executionId: string, position: { x: number, y: number }) => {
    wsManager.sendCollaborationMessage(executionId, {
      type: 'cursor_move',
      data: { position },
      userId: 'current-user', // This should come from auth context
      userName: 'Current User', // This should come from auth context
      timestamp: new Date().toISOString()
    })
  }, [])

  const sendMessageSelect = useCallback((executionId: string, messageId: string) => {
    wsManager.sendCollaborationMessage(executionId, {
      type: 'message_select',
      data: { messageId },
      userId: 'current-user',
      userName: 'Current User',
      timestamp: new Date().toISOString()
    })
  }, [])

  const sendAnnotation = useCallback((executionId: string, annotation: { messageId: string, text: string, position: { x: number, y: number } }) => {
    wsManager.sendCollaborationMessage(executionId, {
      type: 'annotation',
      data: annotation,
      userId: 'current-user',
      userName: 'Current User',
      timestamp: new Date().toISOString()
    })
  }, [])

  const sendComment = useCallback((executionId: string, comment: { messageId: string, text: string }) => {
    wsManager.sendCollaborationMessage(executionId, {
      type: 'comment',
      data: comment,
      userId: 'current-user',
      userName: 'Current User',
      timestamp: new Date().toISOString()
    })
  }, [])

  return {
    collaborators,
    activeUsers,
    sendCursorMove,
    sendMessageSelect,
    sendAnnotation,
    sendComment
  }
}