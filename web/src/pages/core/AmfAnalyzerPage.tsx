import React, { useState, useEffect } from 'react'
import { Server, Users, Activity, AlertTriangle, CheckCircle, Clock, Database } from 'lucide-react'

export const AmfAnalyzerPage: React.FC = () => {
  const [amfData, setAmfData] = useState<any>(null)

  useEffect(() => {
    // Simulate AMF data
    const loadAmfData = () => {
      const sampleData = {
        status: {
          state: 'active',
          uptime: '7d 12h 34m',
          version: 'v1.2.3',
          load: 65
        },
        sessions: {
          total: 1250,
          active: 1180,
          idle: 70,
          failed: 15
        },
        procedures: {
          registration: { total: 450, success: 435, failed: 15 },
          pduSession: { total: 890, success: 875, failed: 15 },
          handover: { total: 120, success: 118, failed: 2 },
          deregistration: { total: 200, success: 195, failed: 5 }
        },
        metrics: {
          avgResponseTime: 12.5,
          throughput: 2.4,
          errorRate: 1.2,
          cpuUsage: 45,
          memoryUsage: 68
        },
        connectedNodes: [
          { type: 'gNB', count: 8, status: 'connected' },
          { type: 'SMF', count: 2, status: 'connected' },
          { type: 'UDM', count: 1, status: 'connected' },
          { type: 'AUSF', count: 1, status: 'connected' }
        ]
      }
      setAmfData(sampleData)
    }

    loadAmfData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'connected': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'idle': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AMF Analyzer</h1>
        <p className="text-gray-600 mt-1">Access and Mobility Management Function monitoring and analysis</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">AMF Status</h3>
            <Server className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">Active</p>
          <p className="text-sm text-gray-500 mt-1">Uptime: {amfData?.status.uptime}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Sessions</h3>
            <Users className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{amfData?.sessions.total}</p>
          <p className="text-sm text-gray-500 mt-1">{amfData?.sessions.active} active</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Response Time</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{amfData?.metrics.avgResponseTime}ms</p>
          <p className="text-sm text-gray-500 mt-1">End-to-end latency</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{amfData?.metrics.errorRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Failed procedures</p>
        </div>
      </div>

      {/* Session Statistics */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Session Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{amfData?.sessions.total}</div>
            <div className="text-sm text-gray-600">Total Sessions</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{amfData?.sessions.active}</div>
            <div className="text-sm text-gray-600">Active Sessions</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{amfData?.sessions.idle}</div>
            <div className="text-sm text-gray-600">Idle Sessions</div>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{amfData?.sessions.failed}</div>
            <div className="text-sm text-gray-600">Failed Sessions</div>
          </div>
        </div>
      </div>

      {/* Procedure Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Procedure Statistics</h3>
          <div className="space-y-4">
            {amfData?.procedures && Object.entries(amfData.procedures).map(([procedure, data]: [string, any]) => (
              <div key={procedure} className="p-3 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 capitalize">{procedure}</h4>
                  <span className="text-sm text-gray-600">{data.total} total</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-600">{data.success} success</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-red-600">{data.failed} failed</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{width: `${(data.success / data.total) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Connected Nodes</h3>
          <div className="space-y-3">
            {amfData?.connectedNodes.map((node: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{node.type}</div>
                    <div className="text-sm text-gray-600">{node.count} instances</div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(node.status)}`}>
                  {node.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>CPU Usage</span>
              <span>{amfData?.metrics.cpuUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{width: `${amfData?.metrics.cpuUsage}%`}}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Memory Usage</span>
              <span>{amfData?.metrics.memoryUsage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{width: `${amfData?.metrics.memoryUsage}%`}}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Throughput</span>
              <span>{amfData?.metrics.throughput} Gbps</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full" 
                style={{width: '75%'}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AmfAnalyzerPage