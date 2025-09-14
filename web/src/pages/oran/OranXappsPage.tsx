import React from 'react'
import { Smartphone, Activity, BarChart3, Settings, Monitor, Zap } from 'lucide-react'

export const OranXappsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN xApps</h1>
          <p className="text-base-content/70">
            Near-RT RIC xApps monitoring and management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-8 h-8 text-primary" />
              <h2 className="card-title">QoS xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Quality of Service management and optimization
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>45%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>128 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-secondary" />
              <h2 className="card-title">Mobility xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Handover optimization and mobility management
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>38%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>96 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-accent" />
              <h2 className="card-title">Traffic Steering xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Intelligent traffic routing and load balancing
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-warning">Limited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>62%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>156 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-info" />
              <h2 className="card-title">RRM xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Radio Resource Management optimization
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>52%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>112 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-8 h-8 text-warning" />
              <h2 className="card-title">KPI Monitoring xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Real-time KPI monitoring and alerting
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>28%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>84 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-success" />
              <h2 className="card-title">Energy Saving xApp</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Energy efficiency optimization and power management
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-error">Inactive</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CPU Usage:</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Memory:</span>
                <span>0 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">xApp Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>xApp Name</th>
                  <th>Status</th>
                  <th>CPU Usage</th>
                  <th>Memory Usage</th>
                  <th>Uptime</th>
                  <th>Actions/sec</th>
                  <th>Success Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>QoS xApp</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>45%</td>
                  <td>128 MB</td>
                  <td>2d 14h</td>
                  <td>125</td>
                  <td>98.5%</td>
                </tr>
                <tr>
                  <td>Mobility xApp</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>38%</td>
                  <td>96 MB</td>
                  <td>2d 14h</td>
                  <td>89</td>
                  <td>99.2%</td>
                </tr>
                <tr>
                  <td>Traffic Steering xApp</td>
                  <td><span className="badge badge-warning">Limited</span></td>
                  <td>62%</td>
                  <td>156 MB</td>
                  <td>1d 8h</td>
                  <td>67</td>
                  <td>94.8%</td>
                </tr>
                <tr>
                  <td>RRM xApp</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>52%</td>
                  <td>112 MB</td>
                  <td>2d 14h</td>
                  <td>156</td>
                  <td>97.3%</td>
                </tr>
                <tr>
                  <td>KPI Monitoring xApp</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>28%</td>
                  <td>84 MB</td>
                  <td>2d 14h</td>
                  <td>234</td>
                  <td>99.8%</td>
                </tr>
                <tr>
                  <td>Energy Saving xApp</td>
                  <td><span className="badge badge-error">Inactive</span></td>
                  <td>0%</td>
                  <td>0 MB</td>
                  <td>N/A</td>
                  <td>0</td>
                  <td>N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranXappsPage