import React from 'react'
import { Wifi, Activity, BarChart3, Settings, Monitor, Zap } from 'lucide-react'

export const NBIoTOverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NB-IoT Overview</h1>
          <p className="text-base-content/70">
            Narrowband Internet of Things network overview and monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wifi className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Connected Devices</p>
                <p className="text-2xl font-bold">2,847</p>
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
                <p className="text-2xl font-bold">1,923</p>
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
                <p className="text-sm text-base-content/70">Coverage</p>
                <p className="text-2xl font-bold">94.2%</p>
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
                <p className="text-sm text-base-content/70">Power Efficiency</p>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">NB-IoT Network Performance</h2>
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
                  <td>Connected Devices</td>
                  <td>2,847</td>
                  <td>2,650</td>
                  <td>3,100</td>
                  <td>3,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Active Sessions</td>
                  <td>1,923</td>
                  <td>1,850</td>
                  <td>2,200</td>
                  <td>2,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Coverage</td>
                  <td>94.2%</td>
                  <td>93.8%</td>
                  <td>95.1%</td>
                  <td>90%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>Power Efficiency</td>
                  <td>98.5%</td>
                  <td>98.2%</td>
                  <td>99.1%</td>
                  <td>95%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>Data Rate</td>
                  <td>250 kbps</td>
                  <td>245 kbps</td>
                  <td>300 kbps</td>
                  <td>200 kbps</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Latency</td>
                  <td>1.5s</td>
                  <td>1.6s</td>
                  <td>2.1s</td>
                  <td>3.0s</td>
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

export default NBIoTOverviewPage