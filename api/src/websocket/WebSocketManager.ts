import { WebSocket, WebSocketServer } from 'ws'
import { IncomingMessage } from 'http'
import { v4 as uuidv4 } from 'uuid'
import { logger, logWebSocket } from '../utils/logger'
import { config } from '../config'

export interface WebSocketConnection {
  id: string
  ws: WebSocket
  userId?: string
  sessionId?: string
  connectedAt: Date
  lastActivity: Date
  subscriptions: Set<string>
  isAlive: boolean
}

export class WebSocketManager {
  private connections: Map<string, WebSocketConnection> = new Map()
  private userConnections: Map<string, Set<string>> = new Map()
  private sessionConnections: Map<string, Set<string>> = new Map()
  private heartbeatInterval: NodeJS.Timeout | null = null

  constructor(private wss: WebSocketServer) {
    this.setupHeartbeat()
    this.setupConnectionHandlers()
  }

  private setupConnectionHandlers(): void {
    this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
      const connectionId = uuidv4()
      const connection: WebSocketConnection = {
        id: connectionId,
        ws,
        connectedAt: new Date(),
        lastActivity: new Date(),
        subscriptions: new Set(),
        isAlive: true,
      }

      this.connections.set(connectionId, connection)
      
      logWebSocket(connectionId, 'WebSocket connection established', {
        ip: req.socket.remoteAddress,
        userAgent: req.headers['user-agent'],
      })

      // Setup message handlers
      ws.on('message', (data: Buffer) => {
        this.handleMessage(connectionId, data)
      })

      ws.on('close', (code: number, reason: Buffer) => {
        this.handleDisconnection(connectionId, code, reason.toString())
      })

      ws.on('error', (error: Error) => {
        logWebSocket(connectionId, 'WebSocket error', { error: error.message })
        this.removeConnection(connectionId)
      })

      ws.on('pong', () => {
        const connection = this.connections.get(connectionId)
        if (connection) {
          connection.isAlive = true
          connection.lastActivity = new Date()
        }
      })

      // Send welcome message
      this.sendToConnection(connectionId, {
        type: 'connection_established',
        connectionId,
        timestamp: new Date().toISOString(),
      })
    })
  }

  private setupHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.connections.forEach((connection, connectionId) => {
        if (!connection.isAlive) {
          logWebSocket(connectionId, 'WebSocket connection timeout', {})
          this.removeConnection(connectionId)
          return
        }

        connection.isAlive = false
        connection.ws.ping()
      })
    }, config.WS_HEARTBEAT_INTERVAL)
  }

  private handleMessage(connectionId: string, data: Buffer): void {
    try {
      const message = JSON.parse(data.toString())
      const connection = this.connections.get(connectionId)
      
      if (!connection) {
        return
      }

      connection.lastActivity = new Date()

      logWebSocket(connectionId, 'WebSocket message received', {
        type: message.type,
        size: data.length,
      })

      switch (message.type) {
        case 'authenticate':
          this.handleAuthentication(connectionId, message)
          break
        case 'subscribe':
          this.handleSubscription(connectionId, message)
          break
        case 'unsubscribe':
          this.handleUnsubscription(connectionId, message)
          break
        case 'ping':
          this.sendToConnection(connectionId, { type: 'pong', timestamp: new Date().toISOString() })
          break
        default:
          logWebSocket(connectionId, 'Unknown message type', { type: message.type })
      }
    } catch (error) {
      logWebSocket(connectionId, 'WebSocket message parsing error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  private handleAuthentication(connectionId: string, message: any): void {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    // TODO: Implement actual authentication
    // For now, just set a mock userId
    connection.userId = message.userId || 'mock-user'
    
    // Add to user connections
    if (!this.userConnections.has(connection.userId)) {
      this.userConnections.set(connection.userId, new Set())
    }
    this.userConnections.get(connection.userId)!.add(connectionId)

    this.sendToConnection(connectionId, {
      type: 'authentication_success',
      userId: connection.userId,
      timestamp: new Date().toISOString(),
    })

    logWebSocket(connectionId, 'WebSocket authentication successful', {
      userId: connection.userId,
    })
  }

  private handleSubscription(connectionId: string, message: any): void {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    const { channel } = message
    if (!channel) return

    connection.subscriptions.add(channel)

    this.sendToConnection(connectionId, {
      type: 'subscription_success',
      channel,
      timestamp: new Date().toISOString(),
    })

    logWebSocket(connectionId, 'WebSocket subscription added', { channel })
  }

  private handleUnsubscription(connectionId: string, message: any): void {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    const { channel } = message
    if (!channel) return

    connection.subscriptions.delete(channel)

    this.sendToConnection(connectionId, {
      type: 'unsubscription_success',
      channel,
      timestamp: new Date().toISOString(),
    })

    logWebSocket(connectionId, 'WebSocket subscription removed', { channel })
  }

  private handleDisconnection(connectionId: string, code: number, reason: string): void {
    logWebSocket(connectionId, 'WebSocket connection closed', { code, reason })
    this.removeConnection(connectionId)
  }

  public addConnection(ws: WebSocket, req: IncomingMessage): void {
    // This is handled in the constructor setup
  }

  public removeConnection(connectionId: string): void {
    const connection = this.connections.get(connectionId)
    if (!connection) return

    // Remove from user connections
    if (connection.userId) {
      const userConnections = this.userConnections.get(connection.userId)
      if (userConnections) {
        userConnections.delete(connectionId)
        if (userConnections.size === 0) {
          this.userConnections.delete(connection.userId)
        }
      }
    }

    // Remove from session connections
    if (connection.sessionId) {
      const sessionConnections = this.sessionConnections.get(connection.sessionId)
      if (sessionConnections) {
        sessionConnections.delete(connectionId)
        if (sessionConnections.size === 0) {
          this.sessionConnections.delete(connection.sessionId)
        }
      }
    }

    this.connections.delete(connectionId)
  }

  public sendToConnection(connectionId: string, message: any): void {
    const connection = this.connections.get(connectionId)
    if (!connection || connection.ws.readyState !== WebSocket.OPEN) {
      return
    }

    try {
      connection.ws.send(JSON.stringify(message))
    } catch (error) {
      logWebSocket(connectionId, 'WebSocket send error', {
        error: error instanceof Error ? error.message : 'Unknown error',
      })
      this.removeConnection(connectionId)
    }
  }

  public sendToUser(userId: string, message: any): void {
    const userConnections = this.userConnections.get(userId)
    if (!userConnections) return

    userConnections.forEach(connectionId => {
      this.sendToConnection(connectionId, message)
    })
  }

  public sendToSession(sessionId: string, message: any): void {
    const sessionConnections = this.sessionConnections.get(sessionId)
    if (!sessionConnections) return

    sessionConnections.forEach(connectionId => {
      this.sendToConnection(connectionId, message)
    })
  }

  public broadcast(message: any, filter?: (connection: WebSocketConnection) => boolean): void {
    this.connections.forEach((connection, connectionId) => {
      if (!filter || filter(connection)) {
        this.sendToConnection(connectionId, message)
      }
    })
  }

  public getConnectionStats(): any {
    return {
      totalConnections: this.connections.size,
      userConnections: this.userConnections.size,
      sessionConnections: this.sessionConnections.size,
      connections: Array.from(this.connections.values()).map(conn => ({
        id: conn.id,
        userId: conn.userId,
        sessionId: conn.sessionId,
        connectedAt: conn.connectedAt,
        lastActivity: conn.lastActivity,
        subscriptions: Array.from(conn.subscriptions),
        isAlive: conn.isAlive,
      })),
    }
  }

  public cleanup(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }

    this.connections.forEach((connection) => {
      connection.ws.close()
    })

    this.connections.clear()
    this.userConnections.clear()
    this.sessionConnections.clear()
  }
}