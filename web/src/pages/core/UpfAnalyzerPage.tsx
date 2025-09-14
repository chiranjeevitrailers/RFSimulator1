import React from 'react'
import { Network, Activity, BarChart3, Settings } from 'lucide-react'

export const UpfAnalyzerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">UPF Analyzer</h1>
          <p className="text-base-content/70">
            User Plane Function analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Network className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Active Bearers</p>
                <p className="text-2xl font-bold">2,891</p>
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
                <p className="text-sm text-base-content/70">Throughput</p>
                <p className="text-2xl font-bold">2.4 Gbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Packet Loss</p>
                <p className="text-2xl font-bold">0.001%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Settings className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Latency</p>
                <p className="text-2xl font-bold">2.1ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">UPF Performance</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Current</th>
                  <th>Average</th>
                  <th>Peak</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active Bearers</td>
                  <td>2,891</td>
                  <td>2,750</td>
                  <td>3,100</td>
                  <td>3,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Throughput</td>
                  <td>2.4 Gbps</td>
                  <td>2.2 Gbps</td>
                  <td>2.8 Gbps</td>
                  <td>3.0 Gbps</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Packet Loss Rate</td>
                  <td>0.001%</td>
                  <td>0.002%</td>
                  <td>0.005%</td>
                  <td>0.01%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>Latency</td>
                  <td>2.1ms</td>
                  <td>2.3ms</td>
                  <td>3.2ms</td>
                  <td>5.0ms</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpfAnalyzerPage