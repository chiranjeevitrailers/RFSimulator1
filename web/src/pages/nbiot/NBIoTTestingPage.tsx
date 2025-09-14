import React from 'react'
import { TestTube, Activity, BarChart3, Settings } from 'lucide-react'

export const NBIoTTestingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NB-IoT Testing</h1>
          <p className="text-base-content/70">
            NB-IoT test execution and validation
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TestTube className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Test Cases</p>
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
                <p className="text-sm text-base-content/70">Passed</p>
                <p className="text-2xl font-bold">148</p>
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
                <p className="text-sm text-base-content/70">Failed</p>
                <p className="text-2xl font-bold">5</p>
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
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold">94.9%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Test Results</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Test Case</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Result</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NB-IoT Attach Procedure</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>2.3s</td>
                  <td>Success</td>
                  <td>All steps completed</td>
                </tr>
                <tr>
                  <td>NB-IoT Data Transfer</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>1.8s</td>
                  <td>Success</td>
                  <td>Data transmitted successfully</td>
                </tr>
                <tr>
                  <td>NB-IoT Power Saving</td>
                  <td><span className="badge badge-error">Failed</span></td>
                  <td>5.2s</td>
                  <td>Timeout</td>
                  <td>Power saving mode not activated</td>
                </tr>
                <tr>
                  <td>NB-IoT Coverage Extension</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>3.1s</td>
                  <td>Success</td>
                  <td>Coverage extended successfully</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NBIoTTestingPage