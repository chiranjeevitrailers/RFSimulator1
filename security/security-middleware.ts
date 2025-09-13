import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'
import { createHash, randomBytes } from 'crypto'

// Security middleware configuration
export const securityMiddleware = {
  // Helmet for security headers
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://js.stripe.com"],
        connectSrc: ["'self'", "https://api.stripe.com", "wss:", "ws:"],
        frameSrc: ["https://js.stripe.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }),

  // CORS configuration
  cors: cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'https://5glabx.com',
        'https://app.5glabx.com',
        'https://staging.5glabx.com',
        'http://localhost:3000',
        'http://localhost:5173',
      ]
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }),

  // Rate limiting
  rateLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: {
      error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // Strict rate limiting for auth endpoints
  authRateLimiter: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
      error: 'Too many authentication attempts, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
  }),

  // API key rate limiting
  apiKeyRateLimiter: rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // limit each API key to 100 requests per minute
    keyGenerator: (req) => {
      return req.headers['x-api-key'] as string || req.ip
    },
    message: {
      error: 'API rate limit exceeded, please try again later.',
    },
  }),
}

// Input validation middleware
export const inputValidation = {
  // Sanitize input
  sanitize: (req: Request, res: Response, next: NextFunction) => {
    const sanitizeString = (str: string): string => {
      return str
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim()
    }

    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return sanitizeString(obj)
      } else if (Array.isArray(obj)) {
        return obj.map(sanitizeObject)
      } else if (obj && typeof obj === 'object') {
        const sanitized: any = {}
        for (const key in obj) {
          sanitized[key] = sanitizeObject(obj[key])
        }
        return sanitized
      }
      return obj
    }

    if (req.body) {
      req.body = sanitizeObject(req.body)
    }
    if (req.query) {
      req.query = sanitizeObject(req.query)
    }
    if (req.params) {
      req.params = sanitizeObject(req.params)
    }

    next()
  },

  // Validate request size
  validateSize: (maxSize: number = 10 * 1024 * 1024) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const contentLength = parseInt(req.headers['content-length'] || '0')
      
      if (contentLength > maxSize) {
        return res.status(413).json({
          error: 'Request entity too large',
          maxSize: maxSize,
        })
      }

      next()
    }
  },
}

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Remove server header
  res.removeHeader('X-Powered-By')
  
  // Add custom security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Add request ID for tracking
  req.id = randomBytes(16).toString('hex')
  res.setHeader('X-Request-ID', req.id)
  
  next()
}

// CSRF protection middleware
export const csrfProtection = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF for GET, HEAD, OPTIONS
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next()
  }

  // Skip CSRF for API routes with valid API key
  if (req.path.startsWith('/api/') && req.headers['x-api-key']) {
    return next()
  }

  const token = req.headers['x-csrf-token'] as string
  const sessionToken = req.session?.csrfToken

  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({
      error: 'Invalid CSRF token',
    })
  }

  next()
}

// API key validation middleware
export const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required',
    })
  }

  // Validate API key format
  if (!apiKey.startsWith('5glabx_') || apiKey.length !== 39) {
    return res.status(401).json({
      error: 'Invalid API key format',
    })
  }

  // TODO: Validate API key against database
  // This would check if the key exists, is active, and has proper permissions

  next()
}

// Audit logging middleware
export const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now()
  
  // Log request
  const auditData = {
    requestId: req.id,
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    userId: req.user?.id,
    apiKey: req.headers['x-api-key'] ? '***' : undefined,
  }

  // Override res.end to log response
  const originalEnd = res.end
  res.end = function(chunk?: any, encoding?: any) {
    const duration = Date.now() - startTime
    
    const responseData = {
      ...auditData,
      statusCode: res.statusCode,
      duration,
      responseSize: res.get('content-length') || 0,
    }

    // Log to audit system
    console.log('AUDIT:', JSON.stringify(responseData))
    
    // TODO: Send to centralized logging system
    
    originalEnd.call(this, chunk, encoding)
  }

  next()
}

// Error handling middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error
  console.error('Error:', {
    requestId: req.id,
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  })

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation failed',
      details: isDevelopment ? err.message : undefined,
    })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
    })
  }

  if (err.name === 'ForbiddenError') {
    return res.status(403).json({
      error: 'Forbidden',
    })
  }

  // Generic error response
  res.status(500).json({
    error: 'Internal server error',
    requestId: req.id,
    details: isDevelopment ? err.message : undefined,
  })
}

// Request timeout middleware
export const requestTimeout = (timeout: number = 30000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.setTimeout(timeout, () => {
      res.status(408).json({
        error: 'Request timeout',
        timeout,
      })
    })
    
    next()
  }
}

// Health check middleware
export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0',
  })
}