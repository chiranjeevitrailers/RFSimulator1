import React from 'react'
import { Network, Activity, BarChart3, Settings, Monitor, Zap } from 'lucide-react'

export const OranE1InterfacePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN E1 Interface</h1>
          <p className="text-base-content/70">
            E1 interface between gNB-CU-CP and gNB-CU-UP analysis
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
                <p className="text-sm text-base-content/70">Messages/sec</p>
                <p className="text-2xl font-bold">680</p>
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
                <p className="text-sm text-base-content/70">Bearer Contexts</p>
                <p className="text-2xl font-bold">156</p>
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
                <p className="text-sm text-base-content/70">Setup Success</p>
                <p className="text-2xl font-bold">99.9%</p>
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
                <p className="text-sm text-base-content/70">Error Rate</p>
                <p className="text-2xl font-bold">0.1%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">E1 Interface Performance</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Message Type</th>
                  <th>Count/sec</th>
                  <th>Success Rate</th>
                  <th>Avg Latency</th>
                  <th>Error Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bearer Context Setup Request</td>
                  <td>45</td>
                  <td>99.8%</td>
                  <td>2.1ms</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Bearer Context Setup Response</td>
                  <td>45</td>
                  <td>100%</td>
                  <td>1.8ms</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Bearer Context Modification Request</td>
                  <td>23</td>
                  <td>99.5%</td>
                  <td>2.3ms</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Bearer Context Release Request</td>
                  <td>12</td>
                  <td>100%</td>
                  <td>1.5ms</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Error Indication</td>
                  <td>1</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranE1InterfacePage