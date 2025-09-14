import React from 'react'
import { Radio, Activity, BarChart3, Settings } from 'lucide-react'

export const V2xPhyLayerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">V2X PHY Layer</h1>
          <p className="text-base-content/70">
            Physical layer analysis for V2X communication
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Radio className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">RSRP</p>
                <p className="text-2xl font-bold">-78 dBm</p>
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
                <p className="text-sm text-base-content/70">SINR</p>
                <p className="text-2xl font-bold">18.5 dB</p>
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
                <p className="text-sm text-base-content/70">BLER</p>
                <p className="text-2xl font-bold">0.2%</p>
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
                <p className="text-sm text-base-content/70">MCS</p>
                <p className="text-2xl font-bold">15</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">V2X PHY Layer Performance</h2>
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
                  <td>RSRP</td>
                  <td>-78 dBm</td>
                  <td>-80 dBm</td>
                  <td>-72 dBm</td>
                  <td>-90 dBm</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>SINR</td>
                  <td>18.5 dB</td>
                  <td>17.2 dB</td>
                  <td>22.1 dB</td>
                  <td>10 dB</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>BLER</td>
                  <td>0.2%</td>
                  <td>0.4%</td>
                  <td>0.8%</td>
                  <td>2%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>MCS</td>
                  <td>15</td>
                  <td>14.2</td>
                  <td>16</td>
                  <td>10</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default V2xPhyLayerPage