import React from 'react'
import { Cpu, Activity, BarChart3, Network, Settings, Monitor, Zap, Database } from 'lucide-react'

export const OranCuAnalysisPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN CU Analysis</h1>
          <p className="text-base-content/70">
            Central Unit (CU) performance analysis and monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">CPU Usage</p>
                <p className="text-2xl font-bold">68%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Active Sessions</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Network className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Throughput</p>
                <p className="text-2xl font-bold">2.4 Gbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Zap className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Error Rate</p>
                <p className="text-2xl font-bold">0.02%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">CU-CP (Control Plane)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>RRC Connections</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NAS Messages/sec</span>
                <span className="font-bold">850</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Handover Requests</span>
                <span className="font-bold">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Context Setup Time</span>
                <span className="font-bold">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Security Mode Success</span>
                <span className="font-bold text-success">99.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">CU-UP (User Plane)</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Active Bearers</span>
                <span className="font-bold">2,891</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Rate (DL)</span>
                <span className="font-bold">1.8 Gbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Data Rate (UL)</span>
                <span className="font-bold">650 Mbps</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Packet Loss Rate</span>
                <span className="font-bold text-success">0.001%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Jitter</span>
                <span className="font-bold">2.1ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">CU Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current</th>
                  <th>Average</th>
                  <th>Peak</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CPU Utilization</td>
                  <td>68%</td>
                  <td>65%</td>
                  <td>85%</td>
                  <td>90%</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Memory Usage</td>
                  <td>4.2 GB</td>
                  <td>4.0 GB</td>
                  <td>5.1 GB</td>
                  <td>6.0 GB</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Active Sessions</td>
                  <td>1,247</td>
                  <td>1,180</td>
                  <td>1,350</td>
                  <td>1,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Throughput</td>
                  <td>2.4 Gbps</td>
                  <td>2.2 Gbps</td>
                  <td>2.8 Gbps</td>
                  <td>3.0 Gbps</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Error Rate</td>
                  <td>0.02%</td>
                  <td>0.015%</td>
                  <td>0.05%</td>
                  <td>0.1%</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Latency</td>
                  <td>12ms</td>
                  <td>11ms</td>
                  <td>18ms</td>
                  <td>20ms</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">F1 Interface Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>F1-C Messages/sec</span>
                <span className="font-bold">1,250</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1-U Packets/sec</span>
                <span className="font-bold">45,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1 Setup Success</span>
                <span className="font-bold text-success">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1 Error Indications</span>
                <span className="font-bold text-error">3</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">E1 Interface Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>E1 Messages/sec</span>
                <span className="font-bold">680</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bearer Context Setup</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span>E1 Setup Success</span>
                <span className="font-bold text-success">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>E1 Error Indications</span>
                <span className="font-bold text-error">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranCuAnalysisPage