import { Request, Response, NextFunction } from 'express'
import { RateLimiterMemory } from 'rate-limiter-flexible'
import { logger } from '../utils/logger'
import { config } from '../config'

// Create rate limiter instance
const rateLimiter = new RateLimiterMemory({
  keyPrefix: '5glabx_api',
  points: config.RATE_LIMIT_MAX_REQUESTS,
  duration: config.RATE_LIMIT_WINDOW_MS / 1000, // Convert to seconds
  blockDuration: 60, // Block for 1 minute
  execEvenly: true, // Spread requests evenly across the window
})

// Rate limiter middleware
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.ip || 'unknown'
    
    await rateLimiter.consume(key)
    next()
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1
    
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      method: req.method,
      retryAfter: secs,
    })

    res.set('Retry-After', String(secs))
    res.status(429).json({
      error: {
        message: 'Too Many Requests',
        statusCode: 429,
        retryAfter: secs,
      },
      timestamp: new Date().toISOString(),
    })
  }
}

// Strict rate limiter for sensitive endpoints
const strictRateLimiter = new RateLimiterMemory({
  keyPrefix: '5glabx_strict',
  points: 5, // 5 requests
  duration: 60, // per minute
  blockDuration: 300, // Block for 5 minutes
})

export const strictRateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const key = req.ip || 'unknown'
    
    await strictRateLimiter.consume(key)
    next()
  } catch (rejRes: any) {
    const secs = Math.round(rejRes.msBeforeNext / 1000) || 1
    
    logger.warn('Strict rate limit exceeded', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      path: req.path,
      method: req.method,
      retryAfter: secs,
    })

    res.set('Retry-After', String(secs))
    res.status(429).json({
      error: {
        message: 'Rate limit exceeded for sensitive endpoint',
        statusCode: 429,
        retryAfter: secs,
      },
      timestamp: new Date().toISOString(),
    })
  }
}

// WebSocket rate limiter
const wsRateLimiter = new RateLimiterMemory({
  keyPrefix: '5glabx_ws',
  points: 100, // 100 messages
  duration: 60, // per minute
  blockDuration: 60, // Block for 1 minute
})

export const wsRateLimiterMiddleware = async (connectionId: string): Promise<boolean> => {
  try {
    await wsRateLimiter.consume(connectionId)
    return true
  } catch (rejRes: any) {
    logger.warn('WebSocket rate limit exceeded', {
      connectionId,
      retryAfter: Math.round(rejRes.msBeforeNext / 1000),
    })
    return false
  }
}

// Export default rate limiter
export const rateLimiter = rateLimiterMiddleware