import React from 'react'
import { Download, Activity, BarChart3, Settings } from 'lucide-react'

export const ExportManagerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Export Manager</h1>
          <p className="text-base-content/70">
            Data export and download management
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Export Jobs</p>
                <p className="text-2xl font-bold">156</p>
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
                <p className="text-sm text-base-content/70">Success Rate</p>
                <p className="text-2xl font-bold">98.5%</p>
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
                <p className="text-sm text-base-content/70">Data Volume</p>
                <p className="text-2xl font-bold">2.4 GB</p>
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
                <p className="text-sm text-base-content/70">Formats</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Export Formats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">CSV</h3>
                <p className="text-sm text-base-content/70">Comma-separated values</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">JSON</h3>
                <p className="text-sm text-base-content/70">JavaScript Object Notation</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">XML</h3>
                <p className="text-sm text-base-content/70">Extensible Markup Language</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">PDF</h3>
                <p className="text-sm text-base-content/70">Portable Document Format</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">Excel</h3>
                <p className="text-sm text-base-content/70">Microsoft Excel format</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-lg">PCAP</h3>
                <p className="text-sm text-base-content/70">Packet capture format</p>
                <button className="btn btn-primary btn-sm mt-2">Export</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportManagerPage