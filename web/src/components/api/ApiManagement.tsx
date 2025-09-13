import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Code, 
  Key, 
  Globe, 
  Plus, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  EyeOff,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Shield,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Webhook
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../auth/AuthProvider'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  last_used: string
  created_at: string
  expires_at: string | null
  status: 'active' | 'revoked' | 'expired'
}

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  secret: string
  status: 'active' | 'inactive' | 'failed'
  last_triggered: string
  success_count: number
  failure_count: number
  created_at: string
}

interface ApiEndpoint {
  method: string
  path: string
  description: string
  parameters: Array<{
    name: string
    type: string
    required: boolean
    description: string
  }>
  response: {
    status: number
    schema: any
  }
}

export const ApiManagement: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'keys' | 'webhooks' | 'docs'>('keys')
  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false)
  const [showCreateWebhookModal, setShowCreateWebhookModal] = useState(false)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([])
  const [newWebhookName, setNewWebhookName] = useState('')
  const [newWebhookUrl, setNewWebhookUrl] = useState('')
  const [newWebhookEvents, setNewWebhookEvents] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null)
  const [showKeyValue, setShowKeyValue] = useState<Set<string>>(new Set())
  
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch API keys
  const { data: apiKeys, isLoading: keysLoading } = useQuery({
    queryKey: ['api-keys', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  // Fetch webhooks
  const { data: webhooks, isLoading: webhooksLoading } = useQuery({
    queryKey: ['webhooks', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      const { data, error } = await supabase
        .from('webhooks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!user?.id
  })

  // Create API key mutation
  const createKeyMutation = useMutation({
    mutationFn: async ({ name, permissions }: { name: string, permissions: string[] }) => {
      const { data, error } = await supabase
        .from('api_keys')
        .insert({
          user_id: user?.id,
          name,
          permissions,
          key: generateApiKey(),
          status: 'active'
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      toast.success('API key created successfully')
      setShowCreateKeyModal(false)
      setNewKeyName('')
      setNewKeyPermissions([])
      setSelectedKey(data)
      setShowKeyModal(true)
      queryClient.invalidateQueries({ queryKey: ['api-keys', user?.id] })
    },
    onError: (error) => {
      toast.error('Failed to create API key')
      console.error('Create key error:', error)
    }
  })

  // Create webhook mutation
  const createWebhookMutation = useMutation({
    mutationFn: async ({ name, url, events }: { name: string, url: string, events: string[] }) => {
      const { data, error } = await supabase
        .from('webhooks')
        .insert({
          user_id: user?.id,
          name,
          url,
          events,
          secret: generateWebhookSecret(),
          status: 'active'
        })
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Webhook created successfully')
      setShowCreateWebhookModal(false)
      setNewWebhookName('')
      setNewWebhookUrl('')
      setNewWebhookEvents([])
      queryClient.invalidateQueries({ queryKey: ['webhooks', user?.id] })
    },
    onError: (error) => {
      toast.error('Failed to create webhook')
      console.error('Create webhook error:', error)
    }
  })

  // Revoke API key mutation
  const revokeKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const { data, error } = await supabase
        .from('api_keys')
        .update({ status: 'revoked' })
        .eq('id', keyId)
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('API key revoked successfully')
      queryClient.invalidateQueries({ queryKey: ['api-keys', user?.id] })
    },
    onError: (error) => {
      toast.error('Failed to revoke API key')
      console.error('Revoke key error:', error)
    }
  })

  // Delete webhook mutation
  const deleteWebhookMutation = useMutation({
    mutationFn: async (webhookId: string) => {
      const { data, error } = await supabase
        .from('webhooks')
        .delete()
        .eq('id', webhookId)
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Webhook deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['webhooks', user?.id] })
    },
    onError: (error) => {
      toast.error('Failed to delete webhook')
      console.error('Delete webhook error:', error)
    }
  })

  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = '5glabx_'
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const generateWebhookSecret = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success'
      case 'revoked':
      case 'expired':
        return 'badge-error'
      case 'inactive':
        return 'badge-warning'
      case 'failed':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success" />
      case 'revoked':
      case 'expired':
        return <XCircle className="w-4 h-4 text-error" />
      case 'inactive':
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-error" />
      default:
        return <Clock className="w-4 h-4 text-base-content" />
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const maskKey = (key: string) => {
    return key.substring(0, 8) + '...' + key.substring(key.length - 4)
  }

  const toggleKeyVisibility = (keyId: string) => {
    const newSet = new Set(showKeyValue)
    if (newSet.has(keyId)) {
      newSet.delete(keyId)
    } else {
      newSet.add(keyId)
    }
    setShowKeyValue(newSet)
  }

  const availablePermissions = [
    'executions:read',
    'executions:write',
    'test_cases:read',
    'test_cases:write',
    'analytics:read',
    'webhooks:read',
    'webhooks:write'
  ]

  const availableEvents = [
    'execution.started',
    'execution.completed',
    'execution.failed',
    'test_case.created',
    'test_case.updated',
    'user.registered',
    'subscription.updated'
  ]

  const apiEndpoints: ApiEndpoint[] = [
    {
      method: 'GET',
      path: '/api/v1/executions',
      description: 'List all executions',
      parameters: [
        { name: 'limit', type: 'integer', required: false, description: 'Number of results to return' },
        { name: 'offset', type: 'integer', required: false, description: 'Number of results to skip' },
        { name: 'status', type: 'string', required: false, description: 'Filter by execution status' }
      ],
      response: {
        status: 200,
        schema: { executions: [], total: 0 }
      }
    },
    {
      method: 'POST',
      path: '/api/v1/executions',
      description: 'Create a new execution',
      parameters: [
        { name: 'test_case_id', type: 'string', required: true, description: 'ID of the test case to execute' },
        { name: 'parameters', type: 'object', required: false, description: 'Execution parameters' }
      ],
      response: {
        status: 201,
        schema: { execution: {}, id: '' }
      }
    },
    {
      method: 'GET',
      path: '/api/v1/executions/{id}',
      description: 'Get execution details',
      parameters: [
        { name: 'id', type: 'string', required: true, description: 'Execution ID' }
      ],
      response: {
        status: 200,
        schema: { execution: {} }
      }
    }
  ]

  if (keysLoading || webhooksLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">API Management</h1>
              <p className="text-base-content/70">
                Manage API keys, webhooks, and explore the API documentation
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowCreateKeyModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create API Key
              </button>
              <button 
                onClick={() => setShowCreateWebhookModal(true)}
                className="btn btn-outline"
              >
                <Webhook className="w-4 h-4" />
                Create Webhook
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs tabs-boxed">
        <button 
          className={`tab ${selectedTab === 'keys' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('keys')}
        >
          <Key className="w-4 h-4" />
          API Keys
        </button>
        <button 
          className={`tab ${selectedTab === 'webhooks' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('webhooks')}
        >
          <Webhook className="w-4 h-4" />
          Webhooks
        </button>
        <button 
          className={`tab ${selectedTab === 'docs' ? 'tab-active' : ''}`}
          onClick={() => setSelectedTab('docs')}
        >
          <Code className="w-4 h-4" />
          API Documentation
        </button>
      </div>

      {/* API Keys Tab */}
      {selectedTab === 'keys' && (
        <div className="space-y-4">
          {apiKeys?.map((key) => (
            <div key={key.id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="w-5 h-5 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold">{key.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`badge ${getStatusColor(key.status)}`}>
                          {key.status}
                        </div>
                        <span className="text-sm text-base-content/70">
                          Created: {new Date(key.created_at).toLocaleDateString()}
                        </span>
                        {key.last_used && (
                          <span className="text-sm text-base-content/70">
                            Last used: {new Date(key.last_used).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <code className="bg-base-200 px-2 py-1 rounded text-sm font-mono">
                        {showKeyValue.has(key.id) ? key.key : maskKey(key.key)}
                      </code>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="btn btn-ghost btn-sm"
                      >
                        {showKeyValue.has(key.id) ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="btn btn-ghost btn-sm"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {key.status === 'active' && (
                      <button
                        onClick={() => revokeKeyMutation.mutate(key.id)}
                        className="btn btn-error btn-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Revoke
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="font-semibold mb-2">Permissions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {key.permissions.map((permission) => (
                      <div key={permission} className="badge badge-outline">
                        {permission}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {apiKeys?.length === 0 && (
            <div className="text-center py-12">
              <Key className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No API Keys</h3>
              <p className="text-base-content/70 mb-4">
                Create your first API key to start using the 5GLabX API.
              </p>
              <button 
                onClick={() => setShowCreateKeyModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create API Key
              </button>
            </div>
          )}
        </div>
      )}

      {/* Webhooks Tab */}
      {selectedTab === 'webhooks' && (
        <div className="space-y-4">
          {webhooks?.map((webhook) => (
            <div key={webhook.id} className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Webhook className="w-5 h-5 text-secondary" />
                    <div>
                      <h3 className="text-lg font-semibold">{webhook.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`badge ${getStatusColor(webhook.status)}`}>
                          {webhook.status}
                        </div>
                        <span className="text-sm text-base-content/70">
                          {webhook.success_count} successful, {webhook.failure_count} failed
                        </span>
                        {webhook.last_triggered && (
                          <span className="text-sm text-base-content/70">
                            Last triggered: {new Date(webhook.last_triggered).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(webhook.url)}
                      className="btn btn-ghost btn-sm"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteWebhookMutation.mutate(webhook.id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm text-base-content/70 mb-2">
                    <strong>URL:</strong> {webhook.url}
                  </div>
                  <h4 className="font-semibold mb-2">Events:</h4>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event) => (
                      <div key={event} className="badge badge-outline">
                        {event}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {webhooks?.length === 0 && (
            <div className="text-center py-12">
              <Webhook className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Webhooks</h3>
              <p className="text-base-content/70 mb-4">
                Create webhooks to receive real-time notifications about events.
              </p>
              <button 
                onClick={() => setShowCreateWebhookModal(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4" />
                Create Webhook
              </button>
            </div>
          )}
        </div>
      )}

      {/* API Documentation Tab */}
      {selectedTab === 'docs' && (
        <div className="space-y-6">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-xl font-bold mb-4">API Endpoints</h2>
              
              <div className="space-y-4">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="p-4 bg-base-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`badge ${
                        endpoint.method === 'GET' ? 'badge-info' :
                        endpoint.method === 'POST' ? 'badge-success' :
                        endpoint.method === 'PUT' ? 'badge-warning' :
                        'badge-error'
                      }`}>
                        {endpoint.method}
                      </div>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                    </div>
                    
                    <p className="text-sm text-base-content/70 mb-3">{endpoint.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Parameters:</h4>
                        <div className="space-y-1">
                          {endpoint.parameters.map((param, paramIndex) => (
                            <div key={paramIndex} className="text-sm">
                              <code className="bg-base-300 px-1 rounded">{param.name}</code>
                              <span className={`badge badge-xs ml-2 ${param.required ? 'badge-error' : 'badge-neutral'}`}>
                                {param.type}
                              </span>
                              {param.required && <span className="text-error text-xs ml-1">*</span>}
                              <div className="text-xs text-base-content/50 mt-1">{param.description}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Response:</h4>
                        <div className="text-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`badge ${
                              endpoint.response.status < 300 ? 'badge-success' :
                              endpoint.response.status < 400 ? 'badge-warning' : 'badge-error'
                            }`}>
                              {endpoint.response.status}
                            </span>
                          </div>
                          <pre className="bg-base-300 p-2 rounded text-xs overflow-x-auto">
                            {JSON.stringify(endpoint.response.schema, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateKeyModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create API Key</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Key Name</span>
                </label>
                <input
                  type="text"
                  placeholder="My API Key"
                  className="input input-bordered w-full"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Permissions</span>
                </label>
                <div className="space-y-2">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={newKeyPermissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewKeyPermissions([...newKeyPermissions, permission])
                          } else {
                            setNewKeyPermissions(newKeyPermissions.filter(p => p !== permission))
                          }
                        }}
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setShowCreateKeyModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={() => createKeyMutation.mutate({ name: newKeyName, permissions: newKeyPermissions })}
                className="btn btn-primary"
                disabled={!newKeyName || newKeyPermissions.length === 0 || createKeyMutation.isPending}
              >
                {createKeyMutation.isPending ? 'Creating...' : 'Create Key'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showCreateWebhookModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Webhook</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Webhook Name</span>
                </label>
                <input
                  type="text"
                  placeholder="My Webhook"
                  className="input input-bordered w-full"
                  value={newWebhookName}
                  onChange={(e) => setNewWebhookName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Webhook URL</span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/webhook"
                  className="input input-bordered w-full"
                  value={newWebhookUrl}
                  onChange={(e) => setNewWebhookUrl(e.target.value)}
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Events</span>
                </label>
                <div className="space-y-2">
                  {availableEvents.map((event) => (
                    <label key={event} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        checked={newWebhookEvents.includes(event)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWebhookEvents([...newWebhookEvents, event])
                          } else {
                            setNewWebhookEvents(newWebhookEvents.filter(e => e !== event))
                          }
                        }}
                      />
                      <span className="text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setShowCreateWebhookModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={() => createWebhookMutation.mutate({ name: newWebhookName, url: newWebhookUrl, events: newWebhookEvents })}
                className="btn btn-primary"
                disabled={!newWebhookName || !newWebhookUrl || newWebhookEvents.length === 0 || createWebhookMutation.isPending}
              >
                {createWebhookMutation.isPending ? 'Creating...' : 'Create Webhook'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show API Key Modal */}
      {showKeyModal && selectedKey && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">API Key Created</h3>
            
            <div className="alert alert-warning mb-4">
              <AlertTriangle className="w-5 h-5" />
              <div>
                <h3 className="font-bold">Important!</h3>
                <div className="text-xs">This is the only time you'll see this API key. Make sure to copy it now.</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">API Key</span>
                </label>
                <div className="flex items-center gap-2">
                  <code className="bg-base-200 px-3 py-2 rounded flex-1 font-mono text-sm">
                    {selectedKey.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(selectedKey.key)}
                    className="btn btn-outline btn-sm"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => {
                  setShowKeyModal(false)
                  setSelectedKey(null)
                }}
                className="btn btn-primary"
              >
                I've Copied the Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ApiManagement