import React from 'react'
import { BarChart3, Activity, TrendingUp, Gauge } from 'lucide-react'

export const OranPerformancePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN Performance</h1>
          <p className="text-base-content/70">
            Real-time O-RAN performance monitoring and analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Overall Performance</p>
                <p className="text-2xl font-bold">94.2%</p>
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
                <p className="text-sm text-base-content/70">Active Interfaces</p>
                <p className="text-2xl font-bold">5/6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Throughput</p>
                <p className="text-2xl font-bold">4.2 Gbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Gauge className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Error Rate</p>
                <p className="text-2xl font-bold">0.08%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Interface</th>
                  <th>Performance</th>
                  <th>Throughput</th>
                  <th>Latency</th>
                  <th>Error Rate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>F1-C</td>
                  <td>98.5%</td>
                  <td>125 Mbps</td>
                  <td>2.3ms</td>
                  <td>0.1%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>F1-U</td>
                  <td>99.2%</td>
                  <td>850 Mbps</td>
                  <td>1.8ms</td>
                  <td>0.05%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>E1</td>
                  <td>97.8%</td>
                  <td>68 Mbps</td>
                  <td>2.1ms</td>
                  <td>0.08%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>E2</td>
                  <td>85.3%</td>
                  <td>32 Mbps</td>
                  <td>5.2ms</td>
                  <td>0.3%</td>
                  <td><span className="badge badge-warning">Fair</span></td>
                </tr>
                <tr>
                  <td>O1</td>
                  <td>92.1%</td>
                  <td>15 Mbps</td>
                  <td>12.5ms</td>
                  <td>0.2%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>A1</td>
                  <td>0%</td>
                  <td>0 Mbps</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td><span className="badge badge-error">Inactive</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranPerformancePage