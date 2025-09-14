import React, { useState, useEffect } from 'react'
import { Globe, Activity, Users, Database, Network, Cpu, Gauge, AlertTriangle } from 'lucide-react'

export const OranOverviewPage: React.FC = () => {
  const [oranData, setOranData] = useState<any>(null)

  useEffect(() => {
    // Simulate O-RAN data loading
    const loadOranData = () => {
      const sampleData = {
        systemStatus: {
          totalNodes: 12,
          activeNodes: 11,
          failedNodes: 1,
          overallHealth: 91.7
        },
        interfaces: {
          e1: { status: 'active', connections: 8, throughput: 2.4 },
          f1: { status: 'active', connections: 15, throughput: 5.7 },
          o1: { status: 'active', connections: 3, throughput: 0.8 },
          o2: { status: 'active', connections: 2, throughput: 0.3 }
        },
        components: {
          cu: { count: 2, status: 'active', utilization: 65 },
          du: { count: 8, status: 'active', utilization: 78 },
          ru: { count: 16, status: 'active', utilization: 45 },
          smo: { count: 1, status: 'active', utilization: 32 }
        },
        xapps: [
          { name: 'Traffic Steering', status: 'running', instances: 3, performance: 95 },
          { name: 'QoS Management', status: 'running', instances: 2, performance: 88 },
          { name: 'Load Balancing', status: 'running', instances: 4, performance: 92 },
          { name: 'Interference Management', status: 'stopped', instances: 0, performance: 0 }
        ],
        metrics: {
          totalThroughput: 8.2,
          latency: 2.3,
          errorRate: 0.8,
          energyEfficiency: 87.5
        }
      }
      setOranData(sampleData)
    }

    loadOranData()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'running': return 'text-green-600 bg-green-100'
      case 'stopped': return 'text-red-600 bg-red-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">O-RAN Overview</h1>
        <p className="text-gray-600 mt-1">Open Radio Access Network system monitoring and management</p>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Nodes</h3>
            <Network className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{oranData?.systemStatus.totalNodes}</p>
          <p className="text-sm text-gray-500 mt-1">
            {oranData?.systemStatus.activeNodes} active, {oranData?.systemStatus.failedNodes} failed
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">System Health</h3>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{oranData?.systemStatus.overallHealth}%</p>
          <p className="text-sm text-gray-500 mt-1">Overall system health</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Throughput</h3>
            <Gauge className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{oranData?.metrics.totalThroughput} Gbps</p>
          <p className="text-sm text-gray-500 mt-1">Aggregated throughput</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Latency</h3>
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{oranData?.metrics.latency}ms</p>
          <p className="text-sm text-gray-500 mt-1">End-to-end latency</p>
        </div>
      </div>

      {/* Interface Status */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">O-RAN Interface Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {oranData?.interfaces && Object.entries(oranData.interfaces).map(([interfaceName, data]: [string, any]) => (
            <div key={interfaceName} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{interfaceName.toUpperCase()}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(data.status)}`}>
                  {data.status}
                </span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div>Connections: {data.connections}</div>
                <div>Throughput: {data.throughput} Gbps</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Component Status</h3>
          <div className="space-y-4">
            {oranData?.components && Object.entries(oranData.components).map(([component, data]: [string, any]) => (
              <div key={component} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{component.toUpperCase()}</div>
                    <div className="text-sm text-gray-600">{data.count} instances</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(data.status)}`}>
                    {data.status}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{data.utilization}% utilization</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">xApp Status</h3>
          <div className="space-y-3">
            {oranData?.xapps.map((xapp: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="font-medium text-gray-900">{xapp.name}</div>
                  <div className="text-sm text-gray-600">{xapp.instances} instances</div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(xapp.status)}`}>
                    {xapp.status}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{xapp.performance}% performance</div>
                </div>
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
              <span>Error Rate</span>
              <span>{oranData?.metrics.errorRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full" 
                style={{width: `${oranData?.metrics.errorRate}%`}}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Energy Efficiency</span>
              <span>{oranData?.metrics.energyEfficiency}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{width: `${oranData?.metrics.energyEfficiency}%`}}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>System Utilization</span>
              <span>72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{width: '72%'}}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranOverviewPage