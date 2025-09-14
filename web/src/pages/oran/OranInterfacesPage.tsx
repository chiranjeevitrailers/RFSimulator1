import React from 'react'
import { Network, GitBranch, Activity, BarChart3, Settings, Monitor } from 'lucide-react'

export const OranInterfacesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">O-RAN Interfaces</h1>
          <p className="text-base-content/70">
            Comprehensive analysis of O-RAN interface protocols and message flows
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-8 h-8 text-primary" />
              <h2 className="card-title">F1 Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between gNB-CU and gNB-DU for control and user plane communication
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>1,250</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>2.3ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-8 h-8 text-secondary" />
              <h2 className="card-title">E1 Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between gNB-CU-CP and gNB-CU-UP for control plane communication
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>850</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>1.8ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-accent" />
              <h2 className="card-title">E2 Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between Near-RT RIC and E2 nodes for real-time control
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-warning">Limited</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>320</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>5.2ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-8 h-8 text-info" />
              <h2 className="card-title">O1 Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between SMO and O-RAN managed elements for management
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>150</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>12.5ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-8 h-8 text-warning" />
              <h2 className="card-title">A1 Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between Non-RT RIC and Near-RT RIC for policy management
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-error">Inactive</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>N/A</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-8 h-8 text-success" />
              <h2 className="card-title">X2/Xn Interface</h2>
            </div>
            <p className="text-sm text-base-content/70 mb-4">
              Interface between gNBs for inter-cell coordination and handover
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Messages/sec:</span>
                <span>680</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Latency:</span>
                <span>3.1ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Interface Performance Metrics</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>Interface</th>
                  <th>Protocol</th>
                  <th>Status</th>
                  <th>Messages/sec</th>
                  <th>Avg Latency</th>
                  <th>Error Rate</th>
                  <th>Throughput</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>F1-C</td>
                  <td>F1AP</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>1,250</td>
                  <td>2.3ms</td>
                  <td>0.1%</td>
                  <td>125 Mbps</td>
                </tr>
                <tr>
                  <td>F1-U</td>
                  <td>GTP-U</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>850</td>
                  <td>1.8ms</td>
                  <td>0.05%</td>
                  <td>850 Mbps</td>
                </tr>
                <tr>
                  <td>E1</td>
                  <td>E1AP</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>680</td>
                  <td>2.1ms</td>
                  <td>0.08%</td>
                  <td>68 Mbps</td>
                </tr>
                <tr>
                  <td>E2</td>
                  <td>E2AP</td>
                  <td><span className="badge badge-warning">Limited</span></td>
                  <td>320</td>
                  <td>5.2ms</td>
                  <td>0.3%</td>
                  <td>32 Mbps</td>
                </tr>
                <tr>
                  <td>O1</td>
                  <td>NETCONF/YANG</td>
                  <td><span className="badge badge-success">Active</span></td>
                  <td>150</td>
                  <td>12.5ms</td>
                  <td>0.2%</td>
                  <td>15 Mbps</td>
                </tr>
                <tr>
                  <td>A1</td>
                  <td>HTTP/JSON</td>
                  <td><span className="badge badge-error">Inactive</span></td>
                  <td>0</td>
                  <td>N/A</td>
                  <td>N/A</td>
                  <td>0 Mbps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OranInterfacesPage