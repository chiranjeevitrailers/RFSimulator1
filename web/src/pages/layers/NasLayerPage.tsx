import React from 'react'
import { Network, Activity, BarChart3, Settings } from 'lucide-react'

export const NasLayerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NAS Layer</h1>
          <p className="text-base-content/70">
            Non-Access Stratum layer analysis
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
                <p className="text-sm text-base-content/70">NAS Messages/sec</p>
                <p className="text-2xl font-bold">850</p>
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
                <p className="text-sm text-base-content/70">Attach Success</p>
                <p className="text-2xl font-bold">99.2%</p>
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
                <p className="text-sm text-base-content/70">TAU Success</p>
                <p className="text-2xl font-bold">98.8%</p>
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
                <p className="text-sm text-base-content/70">Service Requests</p>
                <p className="text-2xl font-bold">1,250</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">NAS Layer Performance</h2>
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
                  <td>NAS Messages/sec</td>
                  <td>850</td>
                  <td>820</td>
                  <td>950</td>
                  <td>1,000</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Attach Success Rate</td>
                  <td>99.2%</td>
                  <td>99.0%</td>
                  <td>99.5%</td>
                  <td>98%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>TAU Success Rate</td>
                  <td>98.8%</td>
                  <td>98.5%</td>
                  <td>99.2%</td>
                  <td>97%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Service Requests</td>
                  <td>1,250</td>
                  <td>1,180</td>
                  <td>1,450</td>
                  <td>1,500</td>
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

export default NasLayerPage