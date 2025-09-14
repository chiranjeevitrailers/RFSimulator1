import React from 'react'
import { Radio, Activity, BarChart3, Network, Settings, Monitor, Zap, Database } from 'lucide-react'

export const OranDuAnalysisPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN DU Analysis</h1>
          <p className="text-base-content/70">
            Distributed Unit (DU) performance analysis and monitoring
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
                <p className="text-sm text-base-content/70">RF Utilization</p>
                <p className="text-2xl font-bold">72%</p>
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
                <p className="text-sm text-base-content/70">Active UEs</p>
                <p className="text-2xl font-bold">892</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Network className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Throughput</p>
                <p className="text-2xl font-bold">1.8 Gbps</p>
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
                <p className="text-sm text-base-content/70">BLER</p>
                <p className="text-2xl font-bold">0.5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">PHY Layer Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>DL PRB Utilization</span>
                <span className="font-bold">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>UL PRB Utilization</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DL BLER</span>
                <span className="font-bold text-success">0.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>UL BLER</span>
                <span className="font-bold text-success">0.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>MIMO Streams</span>
                <span className="font-bold">4x4</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">MAC Layer Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Scheduled UEs</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span>DL Scheduling Efficiency</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>UL Scheduling Efficiency</span>
                <span className="font-bold">88%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>HARQ Retransmissions</span>
                <span className="font-bold">5.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Buffer Status Reports</span>
                <span className="font-bold">1,250/sec</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">DU Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Current</th>
                  <th>Average</th>
                  <th>Peak</th>
                  <th>Threshold</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>RF Utilization</td>
                  <td>72%</td>
                  <td>68%</td>
                  <td>85%</td>
                  <td>90%</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Active UEs</td>
                  <td>892</td>
                  <td>850</td>
                  <td>950</td>
                  <td>1000</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>DL Throughput</td>
                  <td>1.8 Gbps</td>
                  <td>1.7 Gbps</td>
                  <td>2.1 Gbps</td>
                  <td>2.5 Gbps</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>UL Throughput</td>
                  <td>650 Mbps</td>
                  <td>620 Mbps</td>
                  <td>750 Mbps</td>
                  <td>1.0 Gbps</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>DL BLER</td>
                  <td>0.3%</td>
                  <td>0.4%</td>
                  <td>0.8%</td>
                  <td>1.0%</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>UL BLER</td>
                  <td>0.7%</td>
                  <td>0.8%</td>
                  <td>1.2%</td>
                  <td>2.0%</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">F1 Interface Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>F1-C Messages/sec</span>
                <span className="font-bold">1,250</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1-U Packets/sec</span>
                <span className="font-bold">45,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1 Setup Success</span>
                <span className="font-bold text-success">100%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>F1 Error Indications</span>
                <span className="font-bold text-error">2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Radio Performance</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>RSRP (dBm)</span>
                <span className="font-bold">-85</span>
              </div>
              <div className="flex items-center justify-between">
                <span>SINR (dB)</span>
                <span className="font-bold">18.5</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CQI</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Power Headroom</span>
                <span className="font-bold">8 dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranDuAnalysisPage