import { supabase } from '../supabase/client'

export interface WebSocketMessage {
  type: 'execution_update' | 'collaboration' | 'system_status' | 'notification'
  data: any
  timestamp: string
  userId?: string
  executionId?: string
}

export interface CollaborationMessage {
  type: 'cursor_move' | 'message_select' | 'annotation' | 'comment'
  data: any
  userId: string
  userName: string
  timestamp: string
}

export class WebSocketManager {
  private static instance: WebSocketManager
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private isConnected = false
  private heartbeatInterval: NodeJS.Timeout | null = null

  private constructor() {}

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

  async connect(): Promise<void> {
    if (this.ws?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      // Get Supabase session for authentication
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('No active session')
      }

      // Connect to WebSocket server
      const wsUrl = `${import.meta.env.VITE_WS_URL || 'ws://localhost:3001'}/ws?token=${session.access_token}`
      this.ws = new WebSocket(wsUrl)

      this.ws.onopen = () => {
        console.log('WebSocket connected')
        this.isConnected = true
        this.reconnectAttempts = 0
        this.startHeartbeat()
        this.emit('connected', {})
      }

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          this.handleMessage(message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      this.ws.onclose = () => {
        console.log('WebSocket disconnected')
        this.isConnected = false
        this.stopHeartbeat()
        this.emit('disconnected', {})
        this.attemptReconnect()
      }

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        this.emit('error', error)
      }

    } catch (error) {
      console.error('Failed to connect to WebSocket:', error)
      this.attemptReconnect()
    }
  }

  disconnect(): void {
    this.stopHeartbeat()
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.isConnected = false
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1)
    
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    setTimeout(() => {
      this.connect()
    }, delay)
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.send({
          type: 'ping',
          data: {},
          timestamp: new Date().toISOString()
        })
      }
    }, 30000) // Send ping every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  private handleMessage(message: WebSocketMessage): void {
    switch (message.type) {
      case 'pong':
        // Heartbeat response
        break
      case 'execution_update':
        this.emit('execution_update', message.data)
        break
      case 'collaboration':
        this.emit('collaboration', message.data)
        break
      case 'system_status':
        this.emit('system_status', message.data)
        break
      case 'notification':
        this.emit('notification', message.data)
        break
      default:
        console.warn('Unknown message type:', message.type)
    }
  }

  send(message: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn('WebSocket not connected, cannot send message')
    }
  }

  // Subscribe to execution updates
  subscribeToExecution(executionId: string, callback: (data: any) => void): () => void {
    const key = `execution_${executionId}`
    this.addListener(key, callback)
    
    // Send subscription message
    this.send({
      type: 'execution_update',
      data: { action: 'subscribe', executionId },
      timestamp: new Date().toISOString()
    })

    // Return unsubscribe function
    return () => {
      this.removeListener(key, callback)
      this.send({
        type: 'execution_update',
        data: { action: 'unsubscribe', executionId },
        timestamp: new Date().toISOString()
      })
    }
  }

  // Send collaboration message
  sendCollaborationMessage(executionId: string, message: CollaborationMessage): void {
    this.send({
      type: 'collaboration',
      data: {
        executionId,
        ...message
      },
      timestamp: new Date().toISOString()
    })
  }

  // Subscribe to collaboration updates
  subscribeToCollaboration(executionId: string, callback: (data: CollaborationMessage) => void): () => void {
    const key = `collaboration_${executionId}`
    this.addListener(key, callback)
    
    // Send subscription message
    this.send({
      type: 'collaboration',
      data: { action: 'subscribe', executionId },
      timestamp: new Date().toISOString()
    })

    // Return unsubscribe function
    return () => {
      this.removeListener(key, callback)
      this.send({
        type: 'collaboration',
        data: { action: 'unsubscribe', executionId },
        timestamp: new Date().toISOString()
      })
    }
  }

  // Generic event listeners
  on(event: string, callback: (data: any) => void): () => void {
    this.addListener(event, callback)
    return () => this.removeListener(event, callback)
  }

  private addListener(event: string, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(callback)
  }

  private removeListener(event: string, callback: (data: any) => void): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.delete(callback)
      if (eventListeners.size === 0) {
        this.listeners.delete(event)
      }
    }
  }

  private emit(event: string, data: any): void {
    const eventListeners = this.listeners.get(event)
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data)
        } catch (error) {
          console.error('Error in WebSocket event listener:', error)
        }
      })
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected
  }
}

export const wsManager = WebSocketManager.getInstance()