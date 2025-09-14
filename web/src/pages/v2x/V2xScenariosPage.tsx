import React from 'react'
import { Map, Activity, BarChart3, Settings } from 'lucide-react'

export const V2xScenariosPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">V2X Test Scenarios</h1>
          <p className="text-base-content/70">
            V2X test scenarios and use cases
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Map className="w-8 h-8 text-primary" />
              <h2 className="card-title">Emergency Vehicle</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Emergency vehicle approaching scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>25</span>
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
              <h2 className="card-title">Intersection Collision</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Intersection collision avoidance scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>18</span>
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
              <h2 className="card-title">Traffic Jam</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Traffic jam warning scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-warning">Limited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>45</span>
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
              <h2 className="card-title">Weather Warning</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Weather condition warning scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>32</span>
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
              <h2 className="card-title">Road Work</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Road work ahead warning scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>28</span>
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
              <h2 className="card-title">Speed Limit</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Speed limit change notification scenario
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Vehicles:</span>
                <span>22</span>
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
                  <th>Active Vehicles</th>
                  <th>Success Rate</th>
                  <th>Avg Response Time</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Emergency Vehicle</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>25</td>
                  <td>98.5%</td>
                  <td>15ms</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Intersection Collision</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>18</td>
                  <td>96.2%</td>
                  <td>18ms</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Traffic Jam</td>
                  <td><span className="badge badge-warning">Limited</span></td>
                  <td>45</td>
                  <td>92.8%</td>
                  <td>22ms</td>
                  <td>3 min ago</td>
                </tr>
                <tr>
                  <td>Weather Warning</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>32</td>
                  <td>97.1%</td>
                  <td>16ms</td>
                  <td>1 min ago</td>
                </tr>
                <tr>
                  <td>Road Work</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>28</td>
                  <td>95.8%</td>
                  <td>19ms</td>
                  <td>2 min ago</td>
                </tr>
                <tr>
                  <td>Speed Limit</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>22</td>
                  <td>99.2%</td>
                  <td>12ms</td>
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

export default V2xScenariosPage