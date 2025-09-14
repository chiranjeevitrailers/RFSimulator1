import React from 'react'
import { GitBranch, Activity, BarChart3, Settings } from 'lucide-react'

export const NBIoTCallFlowPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NB-IoT Call Flow</h1>
          <p className="text-base-content/70">
            NB-IoT call flow analysis and message tracing
          </p>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Call Flow Analysis</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <span className="text-xs mt-1">Attach Request</span>
              </div>
              <div className="flex-1 h-0.5 bg-base-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <span className="text-xs mt-1">Authentication</span>
              </div>
              <div className="flex-1 h-0.5 bg-base-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <span className="text-xs mt-1">Security Setup</span>
              </div>
              <div className="flex-1 h-0.5 bg-base-300"></div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <span className="text-xs mt-1">Attach Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Call Flow Statistics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Flow Type</th>
                  <th>Count</th>
                  <th>Success Rate</th>
                  <th>Avg Duration</th>
                  <th>Peak Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Initial Attach</td>
                  <td>1,247</td>
                  <td>98.5%</td>
                  <td>2.3s</td>
                  <td>4.1s</td>
                </tr>
                <tr>
                  <td>Service Request</td>
                  <td>3,456</td>
                  <td>99.2%</td>
                  <td>1.8s</td>
                  <td>3.2s</td>
                </tr>
                <tr>
                  <td>Detach</td>
                  <td>892</td>
                  <td>100%</td>
                  <td>0.8s</td>
                  <td>1.5s</td>
                </tr>
                <tr>
                  <td>TAU</td>
                  <td>2,134</td>
                  <td>99.8%</td>
                  <td>1.2s</td>
                  <td>2.1s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NBIoTCallFlowPage