import React from 'react'
import { Map, Activity, BarChart3, Settings } from 'lucide-react'

export const NtnScenariosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NTN Scenarios</h1>
          <p className="text-base-content/70">
            NTN test scenarios and use cases
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-8 h-8 text-primary" />
              <h2 className="card-title">Rural Coverage</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Rural area coverage scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>95.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>98.5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-secondary" />
              <h2 className="card-title">Maritime</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Maritime communication scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>87.3%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>96.2%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-accent" />
              <h2 className="card-title">Aeronautical</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Aeronautical communication scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-warning">Limited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>78.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>92.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-info" />
              <h2 className="card-title">Emergency</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Emergency communication scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>91.7%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>97.1%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-8 h-8 text-warning" />
              <h2 className="card-title">IoT Backhaul</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              IoT backhaul communication scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>89.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>95.8%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-success" />
              <h2 className="card-title">Disaster Recovery</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Disaster recovery communication scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Coverage:</span>
                <span>93.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span>99.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Scenario Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Status</th>
                  <th>Coverage</th>
                  <th>Success Rate</th>
                  <th>Avg Latency</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rural Coverage</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>95.2%</td>
                  <td>98.5%</td>
                  <td>45ms</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Maritime</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>87.3%</td>
                  <td>96.2%</td>
                  <td>52ms</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Aeronautical</td>
                  <td><span className="badge badge-warning">Limited</span></td>
                  <td>78.5%</td>
                  <td>92.8%</td>
                  <td>68ms</td>
                  <td>3 min ago</td>
                </tr>
                <tr>
                  <td>Emergency</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>91.7%</td>
                  <td>97.1%</td>
                  <td>38ms</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>IoT Backhaul</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>89.2%</td>
                  <td>95.8%</td>
                  <td>48ms</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Disaster Recovery</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>93.1%</td>
                  <td>99.2%</td>
                  <td>42ms</td>
                  <td>1 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NtnScenariosPage