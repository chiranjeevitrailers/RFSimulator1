import React from 'react'
import { Clock, Activity, BarChart3, Settings } from 'lucide-react'

export const NtnTimingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Timing & Delay</h1>
          <p className="text-base-content/70">
            NTN timing and delay analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Propagation Delay</p>
                <p className="text-2xl font-bold">45ms</p>
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
                <p className="text-sm text-base-content/70">Processing Delay</p>
                <p className="text-2xl font-bold">8ms</p>
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
                <p className="text-sm text-base-content/70">Total Latency</p>
                <p className="text-2xl font-bold">53ms</p>
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
                <p className="text-sm text-base-content/70">Jitter</p>
                <p className="text-2xl font-bold">2.1ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Timing Performance</h2>
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
                  <td>Propagation Delay</td>
                  <td>45ms</td>
                  <td>48ms</td>
                  <td>65ms</td>
                  <td>100ms</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Processing Delay</td>
                  <td>8ms</td>
                  <td>9ms</td>
                  <td>12ms</td>
                  <td>20ms</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Total Latency</td>
                  <td>53ms</td>
                  <td>57ms</td>
                  <td>77ms</td>
                  <td>120ms</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>Jitter</td>
                  <td>2.1ms</td>
                  <td>2.8ms</td>
                  <td>4.2ms</td>
                  <td>10ms</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NtnTimingPage