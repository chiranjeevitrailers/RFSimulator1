import React from 'react'
import { Phone, Activity, BarChart3, Settings } from 'lucide-react'

export const ImsLayerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IMS Analysis</h1>
          <p className="text-base-content/70">
            IP Multimedia Subsystem analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
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
              <div className="p-2 bg-success/10 rounded-lg">
                <Activity className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Call Success</p>
                <p className="text-2xl font-bold">98.5%</p>
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
                <p className="text-sm text-base-content/70">Setup Time</p>
                <p className="text-2xl font-bold">1.2s</p>
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
                <p className="text-sm text-base-content/70">SIP Messages/sec</p>
                <p className="text-2xl font-bold">2,850</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">IMS Performance</h2>
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
                  <td>1,247</td>
                  <td>1,180</td>
                  <td>1,350</td>
                  <td>1,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Call Success Rate</td>
                  <td>98.5%</td>
                  <td>98.2%</td>
                  <td>99.1%</td>
                  <td>95%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Setup Time</td>
                  <td>1.2s</td>
                  <td>1.3s</td>
                  <td>1.8s</td>
                  <td>2.0s</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>SIP Messages/sec</td>
                  <td>2,850</td>
                  <td>2,650</td>
                  <td>3,200</td>
                  <td>4,000</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImsLayerPage