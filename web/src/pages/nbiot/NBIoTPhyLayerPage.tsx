import React from 'react'
import { Radio, Activity, BarChart3, Settings } from 'lucide-react'

export const NBIoTPhyLayerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NB-IoT PHY Layer</h1>
          <p className="text-base-content/70">
            Physical layer analysis for NB-IoT devices
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
                <p className="text-2xl font-bold">-95 dBm</p>
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
                <p className="text-2xl font-bold">12.5 dB</p>
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
                <p className="text-2xl font-bold">0.8%</p>
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
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">PHY Layer Performance</h2>
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
                  <td>-95 dBm</td>
                  <td>-97 dBm</td>
                  <td>-88 dBm</td>
                  <td>-100 dBm</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>SINR</td>
                  <td>12.5 dB</td>
                  <td>11.8 dB</td>
                  <td>15.2 dB</td>
                  <td>5 dB</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>BLER</td>
                  <td>0.8%</td>
                  <td>1.2%</td>
                  <td>2.5%</td>
                  <td>5%</td>
                  <td><span className="badge badge-success">Good</span></td>
                </tr>
                <tr>
                  <td>MCS</td>
                  <td>8</td>
                  <td>7.5</td>
                  <td>10</td>
                  <td>5</td>
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

export default NBIoTPhyLayerPage