import { createClient } from 'redis'

export interface CacheConfig {
  host: string
  port: number
  password?: string
  db?: number
  ttl?: number
}

export interface CacheOptions {
  ttl?: number
  tags?: string[]
  compress?: boolean
}

export class CacheManager {
  private client: ReturnType<typeof createClient>
  private isConnected = false
  private defaultTTL = 3600 // 1 hour

  constructor(private config: CacheConfig) {
    this.client = createClient({
      socket: {
        host: config.host,
        port: config.port,
      },
      password: config.password,
      database: config.db || 0,
    })

    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err)
      this.isConnected = false
    })

    this.client.on('connect', () => {
      console.log('Redis Client Connected')
      this.isConnected = true
    })

    this.client.on('disconnect', () => {
      console.log('Redis Client Disconnected')
      this.isConnected = false
    })
  }

  async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect()
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect()
    }
  }

  // Basic cache operations
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const value = await this.client.get(key)
      if (!value) return null

      return JSON.parse(value) as T
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const ttl = options.ttl || this.defaultTTL
      const serialized = JSON.stringify(value)

      await this.client.setEx(key, ttl, serialized)

      // Handle cache tags
      if (options.tags && options.tags.length > 0) {
        await this.addToTags(key, options.tags)
      }

      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  async delete(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const result = await this.client.del(key)
      return result > 0
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const result = await this.client.exists(key)
      return result === 1
    } catch (error) {
      console.error('Cache exists error:', error)
      return false
    }
  }

  // Advanced cache operations
  async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    const value = await fetcher()
    await this.set(key, value, options)
    return value
  }

  async invalidateByTag(tag: string): Promise<number> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const keys = await this.client.sMembers(`tag:${tag}`)
      if (keys.length === 0) return 0

      const pipeline = this.client.multi()
      keys.forEach(key => pipeline.del(key))
      pipeline.del(`tag:${tag}`)
      
      const results = await pipeline.exec()
      return keys.length
    } catch (error) {
      console.error('Cache invalidate by tag error:', error)
      return 0
    }
  }

  async invalidatePattern(pattern: string): Promise<number> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const keys = await this.client.keys(pattern)
      if (keys.length === 0) return 0

      const result = await this.client.del(keys)
      return result
    } catch (error) {
      console.error('Cache invalidate pattern error:', error)
      return 0
    }
  }

  async flush(): Promise<boolean> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      await this.client.flushDb()
      return true
    } catch (error) {
      console.error('Cache flush error:', error)
      return false
    }
  }

  // Cache statistics
  async getStats(): Promise<{
    connected: boolean
    memory: any
    keyspace: any
    info: any
  }> {
    try {
      if (!this.isConnected) {
        await this.connect()
      }

      const info = await this.client.info()
      const memory = await this.client.info('memory')
      const keyspace = await this.client.info('keyspace')

      return {
        connected: this.isConnected,
        memory: this.parseInfo(memory),
        keyspace: this.parseInfo(keyspace),
        info: this.parseInfo(info),
      }
    } catch (error) {
      console.error('Cache stats error:', error)
      return {
        connected: false,
        memory: {},
        keyspace: {},
        info: {},
      }
    }
  }

  // Private helper methods
  private async addToTags(key: string, tags: string[]): Promise<void> {
    const pipeline = this.client.multi()
    tags.forEach(tag => {
      pipeline.sAdd(`tag:${tag}`, key)
    })
    await pipeline.exec()
  }

  private parseInfo(info: string): any {
    const result: any = {}
    const lines = info.split('\r\n')
    
    lines.forEach(line => {
      if (line.includes(':')) {
        const [key, value] = line.split(':')
        result[key] = value
      }
    })
    
    return result
  }
}

// Cache decorators for methods
export function Cacheable(ttl: number = 3600, tags: string[] = []) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`
      const cacheManager = (this as any).cacheManager as CacheManager

      if (cacheManager) {
        const cached = await cacheManager.get(cacheKey)
        if (cached !== null) {
          return cached
        }
      }

      const result = await method.apply(this, args)

      if (cacheManager) {
        await cacheManager.set(cacheKey, result, { ttl, tags })
      }

      return result
    }
  }
}

export function CacheInvalidate(tags: string[] = []) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const result = await method.apply(this, args)
      const cacheManager = (this as any).cacheManager as CacheManager

      if (cacheManager && tags.length > 0) {
        for (const tag of tags) {
          await cacheManager.invalidateByTag(tag)
        }
      }

      return result
    }
  }
}

// Cache strategies
export class CacheStrategy {
  static readonly TEST_CASES = 'test_cases'
  static readonly EXECUTIONS = 'executions'
  static readonly ANALYTICS = 'analytics'
  static readonly USER_DATA = 'user_data'
  static readonly SYSTEM_METRICS = 'system_metrics'

  static getTTL(strategy: string): number {
    switch (strategy) {
      case this.TEST_CASES:
        return 86400 // 24 hours
      case this.EXECUTIONS:
        return 3600 // 1 hour
      case this.ANALYTICS:
        return 1800 // 30 minutes
      case this.USER_DATA:
        return 1800 // 30 minutes
      case this.SYSTEM_METRICS:
        return 300 // 5 minutes
      default:
        return 3600 // 1 hour
    }
  }

  static getTags(strategy: string): string[] {
    switch (strategy) {
      case this.TEST_CASES:
        return ['test_cases', 'static_data']
      case this.EXECUTIONS:
        return ['executions', 'user_data']
      case this.ANALYTICS:
        return ['analytics', 'computed_data']
      case this.USER_DATA:
        return ['user_data', 'profile']
      case this.SYSTEM_METRICS:
        return ['system_metrics', 'monitoring']
      default:
        return ['general']
    }
  }
}

// Singleton cache manager instance
let cacheManagerInstance: CacheManager | null = null

export const getCacheManager = (): CacheManager => {
  if (!cacheManagerInstance) {
    const config: CacheConfig = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
      db: parseInt(process.env.REDIS_DB || '0'),
    }
    
    cacheManagerInstance = new CacheManager(config)
  }
  
  return cacheManagerInstance
}