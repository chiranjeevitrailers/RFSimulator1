import { WebSocketManager } from '../websocket/WebSocketManager'
import { logger, logTestExecution } from '../utils/logger'
import { config } from '../config'
import { MessageFlowGenerator } from '../parsers/MessageFlowGenerator'

export interface TestExecution {
  id: string
  testCaseId: string
  userId: string
  status: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
  startedAt: Date
  finishedAt?: Date
  faultInjected: boolean
  parameters?: any
  summary?: any
  steps: TestExecutionStep[]
}

export interface TestExecutionStep {
  id: string
  executionId: string
  stepOrder: number
  layer: string
  direction: string
  messageType: string
  rawLog?: string
  parsedMessage?: any
  verdict: 'PASS' | 'FAIL' | 'INCONCLUSIVE'
  faultType?: string
  correlationData?: any
  timestamp: Date
}

export class TestExecutor {
  private executions: Map<string, TestExecution> = new Map()
  private messageFlowGenerator: MessageFlowGenerator
  private maxConcurrentExecutions: number

  constructor(private wsManager: WebSocketManager) {
    this.messageFlowGenerator = new MessageFlowGenerator()
    this.maxConcurrentExecutions = config.MAX_CONCURRENT_EXECUTIONS
  }

  public async executeTest(
    testCaseId: string,
    userId: string,
    parameters?: any,
    simulateFault: boolean = false
  ): Promise<string> {
    const executionId = `exec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    const execution: TestExecution = {
      id: executionId,
      testCaseId,
      userId,
      status: 'QUEUED',
      startedAt: new Date(),
      faultInjected: simulateFault,
      parameters,
      steps: [],
    }

    this.executions.set(executionId, execution)

    logTestExecution(testCaseId, 'Test execution queued', {
      executionId,
      userId,
      simulateFault,
    })

    // Notify user via WebSocket
    this.wsManager.sendToUser(userId, {
      type: 'execution_queued',
      executionId,
      testCaseId,
      timestamp: new Date().toISOString(),
    })

    // Start execution asynchronously
    this.startExecution(executionId).catch(error => {
      logger.error('Test execution failed', {
        executionId,
        testCaseId,
        userId,
        error: error.message,
      })
    })

    return executionId
  }

  private async startExecution(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId)
    if (!execution) {
      throw new Error(`Execution ${executionId} not found`)
    }

    try {
      execution.status = 'RUNNING'
      execution.startedAt = new Date()

      logTestExecution(execution.testCaseId, 'Test execution started', {
        executionId,
        userId: execution.userId,
      })

      // Notify user via WebSocket
      this.wsManager.sendToUser(execution.userId, {
        type: 'execution_started',
        executionId,
        testCaseId: execution.testCaseId,
        timestamp: new Date().toISOString(),
      })

      // Generate test case steps based on test case type
      const steps = await this.generateTestSteps(execution)
      
      // Execute each step
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        execution.steps.push(step)

        // Notify user of step progress
        this.wsManager.sendToUser(execution.userId, {
          type: 'execution_step',
          executionId,
          step,
          progress: {
            current: i + 1,
            total: steps.length,
            percentage: Math.round(((i + 1) / steps.length) * 100),
          },
          timestamp: new Date().toISOString(),
        })

        // Simulate step execution time
        await this.delay(1000 + Math.random() * 2000)

        // Check if execution was cancelled
        if (execution.status === 'CANCELLED') {
          return
        }
      }

      // Determine final status
      const failedSteps = execution.steps.filter(step => step.verdict === 'FAIL')
      execution.status = failedSteps.length > 0 ? 'FAILED' : 'PASSED'
      execution.finishedAt = new Date()

      // Generate summary
      execution.summary = this.generateExecutionSummary(execution)

      logTestExecution(execution.testCaseId, 'Test execution completed', {
        executionId,
        userId: execution.userId,
        status: execution.status,
        duration: execution.finishedAt.getTime() - execution.startedAt.getTime(),
      })

      // Notify user of completion
      this.wsManager.sendToUser(execution.userId, {
        type: 'execution_completed',
        executionId,
        testCaseId: execution.testCaseId,
        status: execution.status,
        summary: execution.summary,
        timestamp: new Date().toISOString(),
      })

    } catch (error) {
      execution.status = 'FAILED'
      execution.finishedAt = new Date()

      logger.error('Test execution error', {
        executionId,
        testCaseId: execution.testCaseId,
        userId: execution.userId,
        error: error instanceof Error ? error.message : 'Unknown error',
      })

      // Notify user of failure
      this.wsManager.sendToUser(execution.userId, {
        type: 'execution_failed',
        executionId,
        testCaseId: execution.testCaseId,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      })
    }
  }

  private async generateTestSteps(execution: TestExecution): Promise<TestExecutionStep[]> {
    const steps: TestExecutionStep[] = []
    
    // Generate steps based on test case type
    // For now, generate a basic attach flow
    const messageFlow = this.messageFlowGenerator.generateAttachFlow()
    
    messageFlow.forEach((message, index) => {
      const step: TestExecutionStep = {
        id: `step-${execution.id}-${index}`,
        executionId: execution.id,
        stepOrder: index + 1,
        layer: message.layer,
        direction: message.direction,
        messageType: message.messageType,
        rawLog: message.rawLog,
        parsedMessage: message.parsedMessage,
        verdict: this.determineVerdict(message, execution.faultInjected),
        faultType: execution.faultInjected ? this.getRandomFaultType() : undefined,
        correlationData: message.correlationKeys,
        timestamp: new Date(Date.now() + index * 1000),
      }
      
      steps.push(step)
    })

    return steps
  }

  private determineVerdict(message: any, faultInjected: boolean): 'PASS' | 'FAIL' | 'INCONCLUSIVE' {
    if (faultInjected && Math.random() < 0.3) {
      return 'FAIL'
    }
    return 'PASS'
  }

  private getRandomFaultType(): string {
    const faultTypes = [
      'dropped_message',
      'bad_ie',
      'timer_expiry',
      'kpi_degradation',
    ]
    return faultTypes[Math.floor(Math.random() * faultTypes.length)]
  }

  private generateExecutionSummary(execution: TestExecution): any {
    const totalSteps = execution.steps.length
    const passedSteps = execution.steps.filter(step => step.verdict === 'PASS').length
    const failedSteps = execution.steps.filter(step => step.verdict === 'FAIL').length
    const inconclusiveSteps = execution.steps.filter(step => step.verdict === 'INCONCLUSIVE').length

    return {
      totalSteps,
      passedSteps,
      failedSteps,
      inconclusiveSteps,
      successRate: totalSteps > 0 ? (passedSteps / totalSteps) * 100 : 0,
      duration: execution.finishedAt ? execution.finishedAt.getTime() - execution.startedAt.getTime() : 0,
      faultInjected: execution.faultInjected,
      layers: [...new Set(execution.steps.map(step => step.layer))],
      messageTypes: [...new Set(execution.steps.map(step => step.messageType))],
    }
  }

  public getExecution(executionId: string): TestExecution | undefined {
    return this.executions.get(executionId)
  }

  public getExecutionsByUser(userId: string): TestExecution[] {
    return Array.from(this.executions.values()).filter(exec => exec.userId === userId)
  }

  public cancelExecution(executionId: string): boolean {
    const execution = this.executions.get(executionId)
    if (!execution || execution.status !== 'RUNNING') {
      return false
    }

    execution.status = 'CANCELLED'
    execution.finishedAt = new Date()

    logTestExecution(execution.testCaseId, 'Test execution cancelled', {
      executionId,
      userId: execution.userId,
    })

    // Notify user
    this.wsManager.sendToUser(execution.userId, {
      type: 'execution_cancelled',
      executionId,
      testCaseId: execution.testCaseId,
      timestamp: new Date().toISOString(),
    })

    return true
  }

  public getExecutionStats(): any {
    const executions = Array.from(this.executions.values())
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    return {
      total: executions.length,
      running: executions.filter(exec => exec.status === 'RUNNING').length,
      queued: executions.filter(exec => exec.status === 'QUEUED').length,
      passed: executions.filter(exec => exec.status === 'PASSED').length,
      failed: executions.filter(exec => exec.status === 'FAILED').length,
      cancelled: executions.filter(exec => exec.status === 'CANCELLED').length,
      last24Hours: executions.filter(exec => exec.startedAt >= last24Hours).length,
      averageDuration: executions
        .filter(exec => exec.finishedAt)
        .reduce((sum, exec) => sum + (exec.finishedAt!.getTime() - exec.startedAt.getTime()), 0) / 
        executions.filter(exec => exec.finishedAt).length || 0,
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}