import React, { useState, useEffect } from 'react'
import { Radio, Activity, Signal, Wifi, TrendingUp, AlertTriangle } from 'lucide-react'

export const PhyLayerPage: React.FC = () => {
  const [phyData, setPhyData] = useState<any>(null)

  useEffect(() => {
    // Simulate PHY layer data
    const loadPhyData = () => {
      const sampleData = {
        metrics: {
          totalTransmissions: 15420,
          successfulTransmissions: 15280,
          failedTransmissions: 140,
          avgSNR: 18.5,
          avgRSRP: -85.2,
          avgRSRQ: -12.3,
          avgCQI: 7.2
        },
        channels: {
          pdsch: { throughput: 2.4, errorRate: 1.2, utilization: 78 },
          pusch: { throughput: 1.8, errorRate: 0.8, utilization: 65 },
          pdcch: { throughput: 0.3, errorRate: 0.5, utilization: 45 },
          pucch: { throughput: 0.1, errorRate: 0.3, utilization: 32 },
          pbch: { throughput: 0.05, errorRate: 0.1, utilization: 15 },
          prach: { throughput: 0.02, errorRate: 2.1, utilization: 8 }
        },
        modulation: {
          'QPSK': 35,
          '16QAM': 45,
          '64QAM': 18,
          '256QAM': 2
        },
        harq: {
          totalProcesses: 8,
          activeProcesses: 6,
          nackCount: 45,
          ackCount: 15235
        }
      }
      setPhyData(sampleData)
    }

    loadPhyData()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">PHY Layer Analysis</h1>
        <p className="text-gray-600 mt-1">Physical layer performance monitoring and analysis</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Transmissions</h3>
            <Radio className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {phyData?.metrics.totalTransmissions.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {phyData?.metrics.successfulTransmissions.toLocaleString()} successful
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg SNR</h3>
            <Signal className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{phyData?.metrics.avgSNR} dB</p>
          <p className="text-sm text-gray-500 mt-1">Signal-to-noise ratio</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg RSRP</h3>
            <Wifi className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{phyData?.metrics.avgRSRP} dBm</p>
          <p className="text-sm text-gray-500 mt-1">Reference signal power</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg CQI</h3>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-600">{phyData?.metrics.avgCQI}</p>
          <p className="text-sm text-gray-500 mt-1">Channel quality indicator</p>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Channel Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phyData?.channels && Object.entries(phyData.channels).map(([channel, data]: [string, any]) => (
            <div key={channel} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{channel.toUpperCase()}</h4>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Throughput:</span>
                  <span className="font-medium">{data.throughput} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate:</span>
                  <span className="font-medium">{data.errorRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Utilization:</span>
                  <span className="font-medium">{data.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{width: `${data.utilization}%`}}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modulation and HARQ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Modulation Distribution</h3>
          <div className="space-y-3">
            {phyData?.modulation && Object.entries(phyData.modulation).map(([modulation, percentage]) => (
              <div key={modulation} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">{modulation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">HARQ Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Processes</span>
              <span className="font-medium">{phyData?.harq.totalProcesses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Processes</span>
              <span className="font-medium">{phyData?.harq.activeProcesses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">ACK Count</span>
              <span className="font-medium text-green-600">{phyData?.harq.ackCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">NACK Count</span>
              <span className="font-medium text-red-600">{phyData?.harq.nackCount}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm mb-1">
                <span>Success Rate</span>
                <span>
                  {((phyData?.harq.ackCount / (phyData?.harq.ackCount + phyData?.harq.nackCount)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{
                    width: `${(phyData?.harq.ackCount / (phyData?.harq.ackCount + phyData?.harq.nackCount)) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Real-time PHY Activity</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Live</span>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Real-time PHY layer events will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhyLayerPage