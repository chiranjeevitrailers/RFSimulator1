import dotenv from 'dotenv'

dotenv.config()

export const config = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  HOST: process.env.HOST || '0.0.0.0',

  // CORS
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://app.5glabx.com',
    'https://staging.5glabx.com'
  ],

  // Database
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,

  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,

  // Log Engine
  LOG_ENGINE_URL: process.env.LOG_ENGINE_URL || 'http://localhost:3001',
  GLOBAL_FAULT_RATE: parseFloat(process.env.GLOBAL_FAULT_RATE || '0.10'),

  // Security
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
  ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'your-encryption-key',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),

  // WebSocket
  WS_HEARTBEAT_INTERVAL: parseInt(process.env.WS_HEARTBEAT_INTERVAL || '30000', 10), // 30 seconds
  WS_CONNECTION_TIMEOUT: parseInt(process.env.WS_CONNECTION_TIMEOUT || '300000', 10), // 5 minutes

  // Test Execution
  MAX_CONCURRENT_EXECUTIONS: parseInt(process.env.MAX_CONCURRENT_EXECUTIONS || '10', 10),
  EXECUTION_TIMEOUT: parseInt(process.env.EXECUTION_TIMEOUT || '300000', 10), // 5 minutes

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  LOG_FORMAT: process.env.LOG_FORMAT || 'json',

  // Monitoring
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
  METRICS_PORT: parseInt(process.env.METRICS_PORT || '9090', 10),

  // Feature Flags
  ENABLE_FAULT_INJECTION: process.env.ENABLE_FAULT_INJECTION !== 'false',
  ENABLE_REAL_TIME_COLLABORATION: process.env.ENABLE_REAL_TIME_COLLABORATION !== 'false',
  ENABLE_ADMIN_PANEL: process.env.ENABLE_ADMIN_PANEL !== 'false',
  ENABLE_ANALYTICS: process.env.ENABLE_ANALYTICS !== 'false',

  // Development
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  MOCK_DATA: process.env.MOCK_DATA === 'true',
} as const

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY',
] as const

for (const envVar of requiredEnvVars) {
  if (!config[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

// Validate configuration
if (config.PORT < 1 || config.PORT > 65535) {
  throw new Error('Invalid PORT: must be between 1 and 65535')
}

if (config.GLOBAL_FAULT_RATE < 0 || config.GLOBAL_FAULT_RATE > 1) {
  throw new Error('Invalid GLOBAL_FAULT_RATE: must be between 0 and 1')
}

if (config.MAX_CONCURRENT_EXECUTIONS < 1) {
  throw new Error('Invalid MAX_CONCURRENT_EXECUTIONS: must be at least 1')
}

export default config