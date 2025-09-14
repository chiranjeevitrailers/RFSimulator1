import React from 'react'
import { Shield, Activity, BarChart3, Settings } from 'lucide-react'

export const PdcpLayerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PDCP Layer</h1>
          <p className="text-base-content/70">
            Packet Data Convergence Protocol layer analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Security Contexts</p>
                <p className="text-2xl font-bold">1,247</p>
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
                <p className="text-sm text-base-content/70">Cipher Success</p>
                <p className="text-2xl font-bold">99.8%</p>
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
                <p className="text-sm text-base-content/70">Integrity Success</p>
                <p className="text-2xl font-bold">99.9%</p>
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
                <p className="text-sm text-base-content/70">Reordering</p>
                <p className="text-2xl font-bold">0.1%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">PDCP Layer Performance</h2>
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
                  <td>Security Contexts</td>
                  <td>1,247</td>
                  <td>1,180</td>
                  <td>1,350</td>
                  <td>1,500</td>
                  <td><span className="badge badge-success">Normal</span></td>
                </tr>
                <tr>
                  <td>Cipher Success Rate</td>
                  <td>99.8%</td>
                  <td>99.7%</td>
                  <td>99.9%</td>
                  <td>99%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>Integrity Success Rate</td>
                  <td>99.9%</td>
                  <td>99.8%</td>
                  <td>100%</td>
                  <td>99%</td>
                  <td><span className="badge badge-success">Excellent</span></td>
                </tr>
                <tr>
                  <td>Reordering Rate</td>
                  <td>0.1%</td>
                  <td>0.2%</td>
                  <td>0.5%</td>
                  <td>1%</td>
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

export default PdcpLayerPage