import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'
import { config } from './config'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'
import { rateLimiter } from './middleware/rateLimiter'
import { healthRouter } from './routes/health'
import { executeRouter } from './routes/execute'
import { websocketRouter } from './routes/websocket'
import protocolRouter from './routes/protocol'
import { WebSocketManager } from './websocket/WebSocketManager'
import { TestExecutor } from './test-execution/TestExecutor'
import { MessageFlowGenerator } from './parsers/MessageFlowGenerator'

// Create Express app
const app = express()
const server = createServer(app)

// Create WebSocket server
const wss = new WebSocketServer({ server })
const wsManager = new WebSocketManager(wss)

// Initialize services
const testExecutor = new TestExecutor(wsManager)
const messageFlowGenerator = new MessageFlowGenerator()

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

app.use(compression())
app.use(cors({
  origin: config.CORS_ORIGINS,
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Rate limiting
app.use(rateLimiter)

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })
  next()
})

// Routes
app.use('/health', healthRouter)
app.use('/execute', executeRouter)
app.use('/ws', websocketRouter)
app.use('/api/protocol', protocolRouter)

// WebSocket connection handling
wss.on('connection', (ws, req) => {
  logger.info('New WebSocket connection', {
    ip: req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
  })

  wsManager.addConnection(ws, req)

  ws.on('close', (code, reason) => {
    logger.info('WebSocket connection closed', {
      code,
      reason: reason.toString(),
    })
    wsManager.removeConnection(ws)
  })

  ws.on('error', (error) => {
    logger.error('WebSocket error', { error: error.message })
  })
})

// Error handling
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  })
})

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}, shutting down gracefully`)
  
  server.close(() => {
    logger.info('HTTP server closed')
    process.exit(0)
  })

  wss.close(() => {
    logger.info('WebSocket server closed')
  })

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout')
    process.exit(1)
  }, 10000)
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// Start server
const PORT = config.PORT || 3001

server.listen(PORT, () => {
  logger.info(`5GLabX Cloud API server running on port ${PORT}`, {
    port: PORT,
    environment: config.NODE_ENV,
    corsOrigins: config.CORS_ORIGINS,
  })
})

// Export for testing
export { app, server, wss, wsManager, testExecutor, messageFlowGenerator }