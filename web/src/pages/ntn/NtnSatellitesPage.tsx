import React from 'react'
import { Satellite, Activity, BarChart3, Settings } from 'lucide-react'

export const NtnSatellitesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Satellite Links</h1>
          <p className="text-base-content/70">
            Satellite link analysis and monitoring
          </p>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Satellite Link Performance</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Satellite ID</th>
                  <th>Orbit</th>
                  <th>Status</th>
                  <th>Connected UEs</th>
                  <th>Throughput</th>
                  <th>Latency</th>
                  <th>Signal Quality</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SAT-001</td>
                  <td>LEO</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>156</td>
                  <td>125 Mbps</td>
                  <td>25ms</td>
                  <td>Excellent</td>
                </tr>
                <tr>
                  <td>SAT-002</td>
                  <td>LEO</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>189</td>
                  <td>142 Mbps</td>
                  <td>28ms</td>
                  <td>Good</td>
                </tr>
                <tr>
                  <td>SAT-003</td>
                  <td>MEO</td>
                  <td><span className="badge badge-warning">Limited</span></td>
                  <td>98</td>
                  <td>85 Mbps</td>
                  <td>45ms</td>
                  <td>Fair</td>
                </tr>
                <tr>
                  <td>SAT-004</td>
                  <td>GEO</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>234</td>
                  <td>95 Mbps</td>
                  <td>120ms</td>
                  <td>Good</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NtnSatellitesPage