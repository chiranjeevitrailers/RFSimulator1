import { Request, Response, NextFunction } from 'express'
import { logger } from '../utils/logger'
import { config } from '../config'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export class CustomError extends Error implements AppError {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  return new CustomError(message, statusCode)
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let { statusCode = 500, message } = error

  // Log error
  logger.error('Error occurred', {
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    request: {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
    },
    statusCode,
  })

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation Error'
  } else if (error.name === 'CastError') {
    statusCode = 400
    message = 'Invalid ID format'
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Invalid token'
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Token expired'
  } else if (error.name === 'MulterError') {
    statusCode = 400
    message = 'File upload error'
  }

  // Don't leak error details in production
  if (config.NODE_ENV === 'production' && !error.isOperational) {
    message = 'Something went wrong'
  }

  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(config.NODE_ENV === 'development' && {
        stack: error.stack,
        details: error.message,
      }),
    },
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  })
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = createError(`Route ${req.method} ${req.originalUrl} not found`, 404)
  next(error)
}

// Global error handlers
process.on('uncaughtException', (error: Error) => {
  logger.fatal('Uncaught Exception', { error: error.message, stack: error.stack })
  process.exit(1)
})

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  logger.fatal('Unhandled Rejection', { reason, promise })
  process.exit(1)
})