import pino from 'pino'
import { config } from '../config'

// Create logger instance
export const logger = pino({
  level: config.LOG_LEVEL,
  transport: config.NODE_ENV === 'development' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: '5glabx-cloud-api',
    version: process.env.npm_package_version || '1.0.0',
  },
})

// Create child loggers for different modules
export const createModuleLogger = (module: string) => {
  return logger.child({ module })
}

// Log levels
export const logLevels = {
  TRACE: 10,
  DEBUG: 20,
  INFO: 30,
  WARN: 40,
  ERROR: 50,
  FATAL: 60,
} as const

// Helper functions for structured logging
export const logExecution = (executionId: string, message: string, data?: any) => {
  logger.info(message, {
    executionId,
    ...data,
  })
}

export const logError = (error: Error, context?: any) => {
  logger.error({
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
    },
    ...context,
  })
}

export const logWebSocket = (connectionId: string, message: string, data?: any) => {
  logger.info(message, {
    connectionId,
    type: 'websocket',
    ...data,
  })
}

export const logTestExecution = (testCaseId: string, executionId: string, message: string, data?: any) => {
  logger.info(message, {
    testCaseId,
    executionId,
    type: 'test_execution',
    ...data,
  })
}

export const logPerformance = (operation: string, duration: number, data?: any) => {
  logger.info('Performance metric', {
    operation,
    duration,
    type: 'performance',
    ...data,
  })
}

export const logSecurity = (event: string, data?: any) => {
  logger.warn('Security event', {
    event,
    type: 'security',
    ...data,
  })
}

export const logAudit = (action: string, userId: string, data?: any) => {
  logger.info('Audit log', {
    action,
    userId,
    type: 'audit',
    ...data,
  })
}

export default logger