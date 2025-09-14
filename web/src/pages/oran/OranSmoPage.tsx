import React from 'react'
import { Cloud, Activity, BarChart3, Settings, Monitor, Zap } from 'lucide-react'

export const OranSmoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN SMO Analysis</h1>
          <p className="text-base-content/70">
            Service Management and Orchestration (SMO) monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Cloud className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">SMO Status</p>
                <p className="text-2xl font-bold">Active</p>
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
                <p className="text-sm text-base-content/70">Managed Elements</p>
                <p className="text-2xl font-bold">24</p>
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
                <p className="text-sm text-base-content/70">O1 Sessions</p>
                <p className="text-2xl font-bold">18</p>
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
                <p className="text-sm text-base-content/70">Alerts</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">SMO Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>CPU Usage</th>
                  <th>Memory Usage</th>
                  <th>O1 Sessions</th>
                  <th>Response Time</th>
                  <th>Error Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Non-RT RIC</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>68%</td>
                  <td>2.4 GB</td>
                  <td>8</td>
                  <td>45ms</td>
                  <td>0.1%</td>
                </tr>
                <tr>
                  <td>Near-RT RIC</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>72%</td>
                  <td>1.8 GB</td>
                  <td>6</td>
                  <td>12ms</td>
                  <td>0.05%</td>
                </tr>
                <tr>
                  <td>O1 Interface</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>45%</td>
                  <td>512 MB</td>
                  <td>18</td>
                  <td>25ms</td>
                  <td>0.2%</td>
                </tr>
                <tr>
                  <td>A1 Interface</td>
                  <td><span className="badge badge-error">Inactive</span></td>
                  <td>0%</td>
                  <td>0 MB</td>
                  <td>0</td>
                  <td>N/A</td>
                  <td>N/A</td>
                </tr>
                <tr>
                  <td>Policy Management</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>38%</td>
                  <td>256 MB</td>
                  <td>4</td>
                  <td>18ms</td>
                  <td>0.08%</td>
                </tr>
                <tr>
                  <td>Configuration Management</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>52%</td>
                  <td>384 MB</td>
                  <td>12</td>
                  <td>32ms</td>
                  <td>0.15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranSmoPage