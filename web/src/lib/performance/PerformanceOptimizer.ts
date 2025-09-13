import { getCacheManager, CacheStrategy } from '../cache/CacheManager'

export interface PerformanceMetrics {
  responseTime: number
  memoryUsage: number
  cpuUsage: number
  cacheHitRate: number
  errorRate: number
  throughput: number
}

export interface OptimizationConfig {
  enableCaching: boolean
  enableCompression: boolean
  enableLazyLoading: boolean
  enablePrefetching: boolean
  maxConcurrentRequests: number
  requestTimeout: number
  cacheStrategy: string
}

export class PerformanceOptimizer {
  private metrics: PerformanceMetrics[] = []
  private config: OptimizationConfig
  private cacheManager = getCacheManager()

  constructor(config: Partial<OptimizationConfig> = {}) {
    this.config = {
      enableCaching: true,
      enableCompression: true,
      enableLazyLoading: true,
      enablePrefetching: false,
      maxConcurrentRequests: 100,
      requestTimeout: 30000,
      cacheStrategy: 'default',
      ...config,
    }
  }

  // Request optimization
  async optimizeRequest<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: {
      strategy?: string
      ttl?: number
      tags?: string[]
      compress?: boolean
    } = {}
  ): Promise<T> {
    const startTime = Date.now()
    
    try {
      let result: T

      if (this.config.enableCaching) {
        const cacheKey = this.generateCacheKey(key, options.strategy)
        const ttl = options.ttl || CacheStrategy.getTTL(options.strategy || this.config.cacheStrategy)
        const tags = options.tags || CacheStrategy.getTags(options.strategy || this.config.cacheStrategy)

        result = await this.cacheManager.getOrSet(
          cacheKey,
          fetcher,
          { ttl, tags, compress: options.compress }
        )
      } else {
        result = await fetcher()
      }

      this.recordMetrics(startTime, true)
      return result
    } catch (error) {
      this.recordMetrics(startTime, false)
      throw error
    }
  }

  // Batch request optimization
  async optimizeBatchRequests<T>(
    requests: Array<{
      key: string
      fetcher: () => Promise<T>
      strategy?: string
    }>,
    options: {
      maxConcurrency?: number
      timeout?: number
    } = {}
  ): Promise<T[]> {
    const maxConcurrency = options.maxConcurrency || this.config.maxConcurrentRequests
    const timeout = options.timeout || this.config.requestTimeout

    const results: T[] = []
    const errors: Error[] = []

    // Process requests in batches
    for (let i = 0; i < requests.length; i += maxConcurrency) {
      const batch = requests.slice(i, i + maxConcurrency)
      
      const batchPromises = batch.map(async (request) => {
        try {
          return await Promise.race([
            this.optimizeRequest(request.key, request.fetcher, { strategy: request.strategy }),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Request timeout')), timeout)
            )
          ])
        } catch (error) {
          errors.push(error as Error)
          return null
        }
      })

      const batchResults = await Promise.all(batchPromises)
      results.push(...batchResults.filter(result => result !== null))
    }

    if (errors.length > 0) {
      console.warn(`Batch request completed with ${errors.length} errors`)
    }

    return results
  }

  // Lazy loading optimization
  createLazyLoader<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: {
      strategy?: string
      preload?: boolean
    } = {}
  ) {
    let promise: Promise<T> | null = null
    let result: T | null = null

    const load = async (): Promise<T> => {
      if (result !== null) {
        return result
      }

      if (promise === null) {
        promise = this.optimizeRequest(key, fetcher, { strategy: options.strategy })
      }

      result = await promise
      return result
    }

    // Preload if requested
    if (options.preload) {
      load().catch(error => {
        console.warn('Preload failed:', error)
      })
    }

    return load
  }

  // Prefetching optimization
  async prefetchData<T>(
    keys: string[],
    fetcher: (key: string) => Promise<T>,
    options: {
      strategy?: string
      priority?: 'high' | 'medium' | 'low'
    } = {}
  ): Promise<void> {
    if (!this.config.enablePrefetching) {
      return
    }

    const priority = options.priority || 'medium'
    const delay = priority === 'high' ? 0 : priority === 'medium' ? 100 : 500

    setTimeout(async () => {
      try {
        const promises = keys.map(key => 
          this.optimizeRequest(key, () => fetcher(key), { strategy: options.strategy })
        )
        
        await Promise.allSettled(promises)
      } catch (error) {
        console.warn('Prefetch failed:', error)
      }
    }, delay)
  }

  // Memory optimization
  optimizeMemory(): void {
    // Clear old metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-500)
    }

    // Force garbage collection if available
    if (global.gc) {
      global.gc()
    }
  }

  // Cache optimization
  async optimizeCache(): Promise<void> {
    try {
      const stats = await this.cacheManager.getStats()
      
      // Clear cache if memory usage is high
      if (stats.memory.used_memory_percentage > 80) {
        console.log('Cache memory usage high, clearing old entries')
        await this.cacheManager.invalidatePattern('temp:*')
      }

      // Optimize cache based on hit rate
      const hitRate = this.calculateCacheHitRate()
      if (hitRate < 0.7) {
        console.log('Cache hit rate low, adjusting strategy')
        // Could implement cache warming or strategy adjustment here
      }
    } catch (error) {
      console.error('Cache optimization failed:', error)
    }
  }

  // Performance monitoring
  recordMetrics(startTime: number, success: boolean): void {
    const responseTime = Date.now() - startTime
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024 // MB
    const cpuUsage = process.cpuUsage().user / 1000000 // seconds

    this.metrics.push({
      responseTime,
      memoryUsage,
      cpuUsage,
      cacheHitRate: 0, // Will be calculated separately
      errorRate: success ? 0 : 1,
      throughput: 1,
    })

    // Keep only recent metrics
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-50)
    }
  }

  // Get performance statistics
  getPerformanceStats(): {
    averageResponseTime: number
    averageMemoryUsage: number
    averageCpuUsage: number
    errorRate: number
    throughput: number
    cacheHitRate: number
  } {
    if (this.metrics.length === 0) {
      return {
        averageResponseTime: 0,
        averageMemoryUsage: 0,
        averageCpuUsage: 0,
        errorRate: 0,
        throughput: 0,
        cacheHitRate: 0,
      }
    }

    const total = this.metrics.length
    const successful = this.metrics.filter(m => m.errorRate === 0).length

    return {
      averageResponseTime: this.metrics.reduce((sum, m) => sum + m.responseTime, 0) / total,
      averageMemoryUsage: this.metrics.reduce((sum, m) => sum + m.memoryUsage, 0) / total,
      averageCpuUsage: this.metrics.reduce((sum, m) => sum + m.cpuUsage, 0) / total,
      errorRate: (total - successful) / total,
      throughput: this.metrics.reduce((sum, m) => sum + m.throughput, 0) / total,
      cacheHitRate: this.calculateCacheHitRate(),
    }
  }

  // Generate cache key
  private generateCacheKey(key: string, strategy?: string): string {
    const prefix = strategy ? `${strategy}:` : ''
    return `${prefix}${key}`
  }

  // Calculate cache hit rate
  private calculateCacheHitRate(): number {
    // This would be implemented based on actual cache statistics
    // For now, return a placeholder value
    return 0.85
  }

  // Update configuration
  updateConfig(newConfig: Partial<OptimizationConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  // Get current configuration
  getConfig(): OptimizationConfig {
    return { ...this.config }
  }

  // Performance recommendations
  getRecommendations(): string[] {
    const stats = this.getPerformanceStats()
    const recommendations: string[] = []

    if (stats.averageResponseTime > 1000) {
      recommendations.push('Consider enabling more aggressive caching')
    }

    if (stats.averageMemoryUsage > 500) {
      recommendations.push('Memory usage is high, consider optimizing data structures')
    }

    if (stats.errorRate > 0.05) {
      recommendations.push('Error rate is high, review error handling')
    }

    if (stats.cacheHitRate < 0.7) {
      recommendations.push('Cache hit rate is low, consider cache warming')
    }

    if (stats.throughput < 10) {
      recommendations.push('Throughput is low, consider request batching')
    }

    return recommendations
  }
}

// Singleton performance optimizer
let performanceOptimizerInstance: PerformanceOptimizer | null = null

export const getPerformanceOptimizer = (): PerformanceOptimizer => {
  if (!performanceOptimizerInstance) {
    performanceOptimizerInstance = new PerformanceOptimizer()
  }
  
  return performanceOptimizerInstance
}

// Performance decorators
export function Optimize(ttl: number = 3600, strategy: string = 'default') {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const optimizer = getPerformanceOptimizer()

    descriptor.value = async function (...args: any[]) {
      const key = `${target.constructor.name}:${propertyName}:${JSON.stringify(args)}`
      return optimizer.optimizeRequest(key, () => method.apply(this, args), { ttl, strategy })
    }
  }
}

export function BatchOptimize(maxConcurrency: number = 10) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const optimizer = getPerformanceOptimizer()

    descriptor.value = async function (...args: any[]) {
      const requests = args[0] // Assuming first argument is array of requests
      return optimizer.optimizeBatchRequests(requests, { maxConcurrency })
    }
  }
}