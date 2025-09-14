import React from 'react'
import { BarChart3, Activity, TrendingUp, Gauge } from 'lucide-react'

export const V2xAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">V2X Analytics</h1>
          <p className="text-base-content/70">
            Real-time V2X analytics and performance monitoring
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Data Volume</p>
                <p className="text-2xl font-bold">4.2 GB</p>
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
                <p className="text-sm text-base-content/70">Messages/sec</p>
                <p className="text-2xl font-bold">2,850</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Throughput</p>
                <p className="text-2xl font-bold">45 Mbps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-error/10 rounded-lg">
                <Gauge className="w-6 h-6 text-error" />
              </div>
              <div>
                <p className="text-sm text-base-content/70">Efficiency</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">V2X Analytics Dashboard</h2>
          <p className="text-base-content/70">Real-time V2X performance analytics and insights</p>
        </div>
      </div>
    </div>
  )
}

export default V2xAnalyticsPage