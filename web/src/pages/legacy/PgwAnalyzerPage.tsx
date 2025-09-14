import React from 'react'
import { Network, Activity, BarChart3, Settings } from 'lucide-react'

export const PgwAnalyzerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PGW Analyzer</h1>
          <p className="text-base-content/70">
            Packet Data Network Gateway analysis for 4G Legacy
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
                <p className="text-sm text-base-content/70">Active Sessions</p>
                <p className="text-2xl font-bold">8,247</p>
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
                <p className="text-2xl font-bold">6.8 Gbps</p>
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
                <p className="text-2xl font-bold">2.8ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">PGW Performance</h2>
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
                  <td>Active Sessions</td>
                  <td>8,247</td>
                  <td>8,100</td>
                  <td>8,500</td>
                  <td>10,000</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Throughput</td>
                  <td>6.8 Gbps</td>
                  <td>6.5 Gbps</td>
                  <td>7.2 Gbps</td>
                  <td>8.0 Gbps</td>
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
                  <td>2.8ms</td>
                  <td>3.1ms</td>
                  <td>3.8ms</td>
                  <td>5.0ms</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PgwAnalyzerPage