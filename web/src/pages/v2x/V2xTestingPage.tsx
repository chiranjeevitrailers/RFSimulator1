import React from 'react'
import { TestTube, Activity, BarChart3, Settings } from 'lucide-react'

export const V2xTestingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">V2X Testing</h1>
          <p className="text-base-content/70">
            V2X test execution and validation
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
                <p className="text-2xl font-bold">89</p>
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
                <p className="text-2xl font-bold">84</p>
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
                <p className="text-2xl font-bold">3</p>
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
                <p className="text-2xl font-bold">94.4%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">V2X Test Results</h2>
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
                  <td>V2X Basic Communication</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>1.2s</td>
                  <td>Success</td>
                  <td>Communication established</td>
                </tr>
                <tr>
                  <td>PC5 Sidelink Test</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>0.8s</td>
                  <td>Success</td>
                  <td>Sidelink working properly</td>
                </tr>
                <tr>
                  <td>V2X Latency Test</td>
                  <td><span className="badge badge-error">Failed</span></td>
                  <td>2.1s</td>
                  <td>Timeout</td>
                  <td>Latency exceeds threshold</td>
                </tr>
                <tr>
                  <td>V2X Range Test</td>
                  <td><span className="badge badge-success">Passed</span></td>
                  <td>1.5s</td>
                  <td>Success</td>
                  <td>Range within specifications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default V2xTestingPage