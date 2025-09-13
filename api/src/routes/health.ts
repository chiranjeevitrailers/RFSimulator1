import { Router, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { config } from '../config'

const router = Router()

// Health check endpoint
router.get('/', async (req: Request, res: Response) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'healthy',
        redis: 'healthy',
        websocket: 'healthy',
      },
      metrics: {
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          external: Math.round(process.memoryUsage().external / 1024 / 1024),
        },
        cpu: {
          usage: process.cpuUsage(),
        },
      },
    }

    res.status(200).json(health)
  } catch (error) {
    logger.error('Health check failed', { error })
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    })
  }
})

// Detailed health check
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: await checkDatabaseHealth(),
        redis: await checkRedisHealth(),
        websocket: await checkWebSocketHealth(),
        logEngine: await checkLogEngineHealth(),
      },
      configuration: {
        port: config.PORT,
        corsOrigins: config.CORS_ORIGINS,
        faultRate: config.GLOBAL_FAULT_RATE,
        maxConcurrentExecutions: config.MAX_CONCURRENT_EXECUTIONS,
        executionTimeout: config.EXECUTION_TIMEOUT,
      },
      metrics: {
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        platform: process.platform,
        nodeVersion: process.version,
        pid: process.pid,
      },
      featureFlags: {
        faultInjection: config.ENABLE_FAULT_INJECTION,
        realTimeCollaboration: config.ENABLE_REAL_TIME_COLLABORATION,
        adminPanel: config.ENABLE_ADMIN_PANEL,
        analytics: config.ENABLE_ANALYTICS,
      },
    }

    res.status(200).json(health)
  } catch (error) {
    logger.error('Detailed health check failed', { error })
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed',
    })
  }
})

// Readiness probe
router.get('/ready', async (req: Request, res: Response) => {
  try {
    // Check if all required services are available
    const checks = await Promise.allSettled([
      checkDatabaseHealth(),
      checkRedisHealth(),
      checkWebSocketHealth(),
    ])

    const allHealthy = checks.every(check => 
      check.status === 'fulfilled' && check.value === 'healthy'
    )

    if (allHealthy) {
      res.status(200).json({
        status: 'ready',
        timestamp: new Date().toISOString(),
      })
    } else {
      res.status(503).json({
        status: 'not ready',
        timestamp: new Date().toISOString(),
        checks: checks.map((check, index) => ({
          service: ['database', 'redis', 'websocket'][index],
          status: check.status === 'fulfilled' ? check.value : 'unhealthy',
        })),
      })
    }
  } catch (error) {
    logger.error('Readiness check failed', { error })
    res.status(503).json({
      status: 'not ready',
      timestamp: new Date().toISOString(),
      error: 'Readiness check failed',
    })
  }
})

// Liveness probe
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Helper functions
async function checkDatabaseHealth(): Promise<string> {
  try {
    // TODO: Implement actual database health check
    // For now, return healthy
    return 'healthy'
  } catch (error) {
    logger.error('Database health check failed', { error })
    return 'unhealthy'
  }
}

async function checkRedisHealth(): Promise<string> {
  try {
    // TODO: Implement actual Redis health check
    // For now, return healthy
    return 'healthy'
  } catch (error) {
    logger.error('Redis health check failed', { error })
    return 'unhealthy'
  }
}

async function checkWebSocketHealth(): Promise<string> {
  try {
    // TODO: Implement actual WebSocket health check
    // For now, return healthy
    return 'healthy'
  } catch (error) {
    logger.error('WebSocket health check failed', { error })
    return 'unhealthy'
  }
}

async function checkLogEngineHealth(): Promise<string> {
  try {
    // TODO: Implement actual log engine health check
    // For now, return healthy
    return 'healthy'
  } catch (error) {
    logger.error('Log engine health check failed', { error })
    return 'unhealthy'
  }
}

export default router