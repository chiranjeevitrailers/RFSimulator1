import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Settings, 
  Play, 
  Pause, 
  Square, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  TestTube,
  BarChart3,
  FileText,
  Layers,
  Network,
  Radio,
  MessageSquare,
  Database,
  Cpu,
  Server,
  Router,
  Cloud,
  GitBranch,
  Target,
  Gauge,
  Monitor,
  Zap,
  Shield,
  Globe,
  Car,
  Satellite,
  Smartphone,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Plus,
  Minus,
  Save,
  Share,
  Edit,
  Trash2,
  Copy,
  Info,
  AlertCircle,
  Download,
  Upload,
  Filter,
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Download as DownloadIcon
} from 'lucide-react'
import { TestSuitesAPI } from '../../lib/api/testSuites'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import toast from 'react-hot-toast'

interface AutomationSchedule {
  id: string
  name: string
  testSuiteId: string
  testCaseIds: string[]
  schedule: string
  enabled: boolean
  lastRun?: string
  nextRun?: string
  status: 'active' | 'paused' | 'error'
}

interface AutomationConfig {
  maxConcurrentExecutions: number
  retryFailedTests: boolean
  maxRetries: number
  notificationEmail: string
  autoExportResults: boolean
  exportFormat: 'json' | 'csv' | 'xml'
}

export const TestAutomationPage: React.FC = () => {
  const [schedules, setSchedules] = useState<AutomationSchedule[]>([])
  const [config, setConfig] = useState<AutomationConfig>({
    maxConcurrentExecutions: 5,
    retryFailedTests: true,
    maxRetries: 3,
    notificationEmail: '',
    autoExportResults: false,
    exportFormat: 'json'
  })
  const [selectedSchedule, setSelectedSchedule] = useState<AutomationSchedule | null>(null)
  const [activeTab, setActiveTab] = useState<'schedules' | 'config' | 'monitoring'>('schedules')
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false)
  const [newSchedule, setNewSchedule] = useState<Partial<AutomationSchedule>>({
    name: '',
    testSuiteId: '',
    testCaseIds: [],
    schedule: '0 0 * * *', // Daily at midnight
    enabled: true,
    status: 'active'
  })

  const { canExecute } = useSimpleBilling()
  const queryClient = useQueryClient()

  // Fetch test suites for schedule creation
  const { data: testSuites, isLoading: suitesLoading } = useQuery({
    queryKey: ['test-suites'],
    queryFn: () => TestSuitesAPI.getTestSuites()
  })

  // Fetch test cases for selected suite
  const { data: testCases, isLoading: casesLoading } = useQuery({
    queryKey: ['test-cases', newSchedule.testSuiteId],
    queryFn: () => newSchedule.testSuiteId ? TestSuitesAPI.getTestCases(newSchedule.testSuiteId) : null,
    enabled: !!newSchedule.testSuiteId
  })

  // Create schedule mutation
  const createScheduleMutation = useMutation({
    mutationFn: (schedule: AutomationSchedule) => {
      // Simulate API call
      return new Promise<AutomationSchedule>((resolve) => {
        setTimeout(() => {
          const newScheduleWithId = { ...schedule, id: `schedule-${Date.now()}` }
          resolve(newScheduleWithId)
        }, 1000)
      })
    },
    onSuccess: (data) => {
      setSchedules(prev => [...prev, data])
      setIsCreatingSchedule(false)
      setNewSchedule({
        name: '',
        testSuiteId: '',
        testCaseIds: [],
        schedule: '0 0 * * *',
        enabled: true,
        status: 'active'
      })
      toast.success('Automation schedule created successfully!')
    },
    onError: (error) => {
      toast.error('Failed to create automation schedule')
      console.error('Error:', error)
    }
  })

  // Update config mutation
  const updateConfigMutation = useMutation({
    mutationFn: (newConfig: AutomationConfig) => {
      // Simulate API call
      return new Promise<AutomationConfig>((resolve) => {
        setTimeout(() => resolve(newConfig), 1000)
      })
    },
    onSuccess: (data) => {
      setConfig(data)
      toast.success('Configuration updated successfully!')
    },
    onError: (error) => {
      toast.error('Failed to update configuration')
      console.error('Error:', error)
    }
  })

  const handleCreateSchedule = () => {
    if (!newSchedule.name || !newSchedule.testSuiteId || newSchedule.testCaseIds?.length === 0) {
      toast.error('Please fill in all required fields')
      return
    }

    createScheduleMutation.mutate(newSchedule as AutomationSchedule)
  }

  const handleUpdateConfig = () => {
    updateConfigMutation.mutate(config)
  }

  const handleToggleSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, enabled: !schedule.enabled, status: !schedule.enabled ? 'active' : 'paused' }
        : schedule
    ))
    toast.success('Schedule status updated!')
  }

  const handleDeleteSchedule = (scheduleId: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId))
    toast.success('Schedule deleted successfully!')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'paused':
        return <Pause className="w-5 h-5 text-warning" />
      case 'error':
        return <XCircle className="w-5 h-5 text-error" />
      default:
        return <AlertTriangle className="w-5 h-5 text-base-content/50" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success'
      case 'paused':
        return 'badge-warning'
      case 'error':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const renderSchedulesTab = () => (
    <div className="space-y-4">
      {/* Create Schedule Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Automation Schedules</h2>
        <button
          onClick={() => setIsCreatingSchedule(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4" />
          Create Schedule
        </button>
      </div>

      {/* Create Schedule Form */}
      {isCreatingSchedule && (
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title">Create New Automation Schedule</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Schedule Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={newSchedule.name || ''}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter schedule name"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text">Cron Schedule</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={newSchedule.schedule || ''}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, schedule: e.target.value }))}
                    placeholder="0 0 * * * (Daily at midnight)"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Test Suite</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={newSchedule.testSuiteId || ''}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, testSuiteId: e.target.value, testCaseIds: [] }))}
                >
                  <option value="">Select a test suite</option>
                  {testSuites?.map(suite => (
                    <option key={suite.id} value={suite.id}>{suite.name}</option>
                  ))}
                </select>
              </div>

              {testCases && (
                <div>
                  <label className="label">
                    <span className="label-text">Test Cases</span>
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {testCases.map(testCase => (
                      <label key={testCase.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm"
                          checked={newSchedule.testCaseIds?.includes(testCase.id) || false}
                          onChange={(e) => {
                            const isChecked = e.target.checked
                            setNewSchedule(prev => ({
                              ...prev,
                              testCaseIds: isChecked 
                                ? [...(prev.testCaseIds || []), testCase.id]
                                : (prev.testCaseIds || []).filter(id => id !== testCase.id)
                            }))
                          }}
                        />
                        <span className="text-sm">{testCase.title}</span>
                        <span className={`badge badge-xs ${
                          testCase.complexity === 'basic' ? 'badge-success' :
                          testCase.complexity === 'intermediate' ? 'badge-warning' : 'badge-error'
                        }`}>
                          {testCase.complexity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleCreateSchedule}
                  className="btn btn-primary"
                  disabled={createScheduleMutation.isPending}
                >
                  {createScheduleMutation.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Create Schedule
                </button>
                <button
                  onClick={() => setIsCreatingSchedule(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedules List */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(schedule.status)}
                  <div>
                    <h3 className="text-lg font-semibold">{schedule.name}</h3>
                    <p className="text-sm text-base-content/70">
                      {schedule.testCaseIds.length} test cases • {schedule.schedule}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`badge ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text mr-2">Enabled</span>
                      <input
                        type="checkbox"
                        className="toggle toggle-primary toggle-sm"
                        checked={schedule.enabled}
                        onChange={() => handleToggleSchedule(schedule.id)}
                      />
                    </label>
                  </div>
                  <button
                    onClick={() => setSelectedSchedule(schedule)}
                    className="btn btn-ghost btn-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Last Run: </span>
                  <span>{schedule.lastRun || 'Never'}</span>
                </div>
                <div>
                  <span className="font-medium">Next Run: </span>
                  <span>{schedule.nextRun || 'Not scheduled'}</span>
                </div>
                <div>
                  <span className="font-medium">Test Cases: </span>
                  <span>{schedule.testCaseIds.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {schedules.length === 0 && (
        <div className="text-center py-12">
          <Settings className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No automation schedules</h3>
          <p className="text-base-content/70 mb-4">
            Create your first automation schedule to run tests automatically.
          </p>
          <button
            onClick={() => setIsCreatingSchedule(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4" />
            Create Schedule
          </button>
        </div>
      )}
    </div>
  )

  const renderConfigTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Automation Configuration</h2>
      
      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="card-title">Execution Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Max Concurrent Executions</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={config.maxConcurrentExecutions}
                onChange={(e) => setConfig(prev => ({ ...prev, maxConcurrentExecutions: parseInt(e.target.value) }))}
                min="1"
                max="20"
              />
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Retry Failed Tests</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={config.retryFailedTests}
                  onChange={(e) => setConfig(prev => ({ ...prev, retryFailedTests: e.target.checked }))}
                />
              </label>
            </div>

            {config.retryFailedTests && (
              <div>
                <label className="label">
                  <span className="label-text">Max Retries</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={config.maxRetries}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxRetries: parseInt(e.target.value) }))}
                  min="1"
                  max="10"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="card-title">Notification Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Notification Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={config.notificationEmail}
                onChange={(e) => setConfig(prev => ({ ...prev, notificationEmail: e.target.value }))}
                placeholder="Enter email for notifications"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="card-title">Export Settings</h3>
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Auto Export Results</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={config.autoExportResults}
                  onChange={(e) => setConfig(prev => ({ ...prev, autoExportResults: e.target.checked }))}
                />
              </label>
            </div>

            {config.autoExportResults && (
              <div>
                <label className="label">
                  <span className="label-text">Export Format</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={config.exportFormat}
                  onChange={(e) => setConfig(prev => ({ ...prev, exportFormat: e.target.value as 'json' | 'csv' | 'xml' }))}
                >
                  <option value="json">JSON</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdateConfig}
          className="btn btn-primary"
          disabled={updateConfigMutation.isPending}
        >
          {updateConfigMutation.isPending ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          Save Configuration
        </button>
      </div>
    </div>
  )

  const renderMonitoringTab = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Automation Monitoring</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Active Schedules</p>
                <p className="text-2xl font-bold">
                  {schedules.filter(s => s.enabled).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Successful Runs</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <XCircle className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Failed Runs</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="card-title">Recent Automation Runs</h3>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Started</th>
                  <th>Duration</th>
                  <th>Test Cases</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Daily Functional Tests</td>
                  <td><span className="badge badge-success">Success</span></td>
                  <td>2024-01-15 00:00:00</td>
                  <td>2m 34s</td>
                  <td>12</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Weekly Performance Tests</td>
                  <td><span className="badge badge-error">Failed</span></td>
                  <td>2024-01-14 02:00:00</td>
                  <td>1m 45s</td>
                  <td>8</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Security Validation</td>
                  <td><span className="badge badge-success">Success</span></td>
                  <td>2024-01-13 06:00:00</td>
                  <td>3m 12s</td>
                  <td>15</td>
                  <td>
                    <button className="btn btn-ghost btn-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Test Automation</h1>
          <p className="text-base-content/70">
            Configure and manage automated test execution schedules
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <DownloadIcon className="w-4 h-4" />
            Export Config
          </button>
          <button className="btn btn-primary">
            <Upload className="w-4 h-4" />
            Import Config
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-boxed">
        <button
          onClick={() => setActiveTab('schedules')}
          className={`tab ${activeTab === 'schedules' ? 'tab-active' : ''}`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Schedules
        </button>
        <button
          onClick={() => setActiveTab('config')}
          className={`tab ${activeTab === 'config' ? 'tab-active' : ''}`}
        >
          <Settings className="w-4 h-4 mr-2" />
          Configuration
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`tab ${activeTab === 'monitoring' ? 'tab-active' : ''}`}
        >
          <Monitor className="w-4 h-4 mr-2" />
          Monitoring
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'schedules' && renderSchedulesTab()}
      {activeTab === 'config' && renderConfigTab()}
      {activeTab === 'monitoring' && renderMonitoringTab()}

      {/* Schedule Details Modal */}
      {selectedSchedule && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <h3 className="font-bold text-lg mb-4">
              Schedule Details: {selectedSchedule.name}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Schedule Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedSchedule.name}</div>
                    <div><strong>Cron Schedule:</strong> {selectedSchedule.schedule}</div>
                    <div><strong>Status:</strong> 
                      <span className={`badge ${getStatusColor(selectedSchedule.status)} ml-2`}>
                        {selectedSchedule.status}
                      </span>
                    </div>
                    <div><strong>Enabled:</strong> {selectedSchedule.enabled ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Execution History</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Last Run:</strong> {selectedSchedule.lastRun || 'Never'}</div>
                    <div><strong>Next Run:</strong> {selectedSchedule.nextRun || 'Not scheduled'}</div>
                    <div><strong>Test Cases:</strong> {selectedSchedule.testCaseIds.length}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Test Cases</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedSchedule.testCaseIds.map((testCaseId, index) => (
                    <div key={testCaseId} className="flex items-center gap-2 p-2 bg-base-200 rounded">
                      <span className="text-sm font-medium">Test Case {index + 1}</span>
                      <span className="text-xs text-base-content/70">ID: {testCaseId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setSelectedSchedule(null)}
                className="btn btn-ghost"
              >
                Close
              </button>
              <button 
                onClick={() => handleToggleSchedule(selectedSchedule.id)}
                className="btn btn-primary"
              >
                {selectedSchedule.enabled ? 'Disable' : 'Enable'} Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TestAutomationPage