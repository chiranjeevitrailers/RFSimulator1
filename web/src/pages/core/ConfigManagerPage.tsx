import React from 'react'
import { Settings, Activity, BarChart3, Database } from 'lucide-react'

export const ConfigManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Config Manager 5G</h1>
          <p className="text-base-content/70">
            5G configuration management and monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Config Templates</p>
                <p className="text-2xl font-bold">156</p>
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
                <p className="text-sm text-base-content/70">Active Configs</p>
                <p className="text-2xl font-bold">89</p>
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
                <p className="text-sm text-base-content/70">Update Success</p>
                <p className="text-2xl font-bold">99.5%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Database className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Backup Count</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Configuration Management</h2>
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
                  <td>Config Templates</td>
                  <td>156</td>
                  <td>150</td>
                  <td>165</td>
                  <td>200</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Active Configs</td>
                  <td>89</td>
                  <td>85</td>
                  <td>95</td>
                  <td>100</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Update Success Rate</td>
                  <td>99.5%</td>
                  <td>99.3%</td>
                  <td>99.8%</td>
                  <td>99%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Backup Count</td>
                  <td>24</td>
                  <td>22</td>
                  <td>28</td>
                  <td>30</td>
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

export default ConfigManagerPage