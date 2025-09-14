import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Activity, AlertTriangle, CheckCircle, Clock, Users, Database } from 'lucide-react'

export const AnalyticsPage: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [timeRange, setTimeRange] = useState('1h')
  const [selectedMetric, setSelectedMetric] = useState('throughput')

  useEffect(() => {
    // Simulate analytics data loading
    const loadAnalyticsData = async () => {
      const sampleData = {
        timeRange: timeRange,
        kpis: {
          totalMessages: 15420,
          errorRate: 1.8,
          avgThroughput: 234.5,
          successRate: 98.2,
          avgLatency: 12.3,
          activeUEs: 156,
          dataVolume: 2.4
        },
        trends: {
          throughput: [
            { time: '10:00', value: 220 },
            { time: '10:05', value: 235 },
            { time: '10:10', value: 245 },
            { time: '10:15', value: 230 },
            { time: '10:20', value: 250 },
            { time: '10:25', value: 240 },
            { time: '10:30', value: 255 }
          ],
          errorRate: [
            { time: '10:00', value: 2.1 },
            { time: '10:05', value: 1.9 },
            { time: '10:10', value: 1.7 },
            { time: '10:15', value: 2.0 },
            { time: '10:20', value: 1.8 },
            { time: '10:25', value: 1.6 },
            { time: '10:30', value: 1.8 }
          ],
          latency: [
            { time: '10:00', value: 15.2 },
            { time: '10:05', value: 12.8 },
            { time: '10:10', value: 11.5 },
            { time: '10:15', value: 13.1 },
            { time: '10:20', value: 10.9 },
            { time: '10:25', value: 12.4 },
            { time: '10:30', value: 11.8 }
          ]
        },
        layerDistribution: {
          'PHY': 35,
          'MAC': 25,
          'RLC': 20,
          'PDCP': 12,
          'RRC': 5,
          'NAS': 3
        },
        channelDistribution: {
          'PDSCH': 40,
          'PUSCH': 30,
          'PDCCH': 15,
          'PUCCH': 10,
          'PRACH': 3,
          'PBCH': 2
        },
        topErrors: [
          { type: 'CRC Failure', count: 45, percentage: 35.2 },
          { type: 'HARQ NACK', count: 32, percentage: 25.0 },
          { type: 'RLC Retransmission', count: 28, percentage: 21.9 },
          { type: 'PDCP Reordering', count: 15, percentage: 11.7 },
          { type: 'RRC Timeout', count: 8, percentage: 6.2 }
        ]
      }
      
      setAnalyticsData(sampleData)
    }

    loadAnalyticsData()
  }, [timeRange])

  const timeRanges = [
    { value: '15m', label: 'Last 15 minutes' },
    { value: '1h', label: 'Last hour' },
    { value: '6h', label: 'Last 6 hours' },
    { value: '24h', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' }
  ]

  const metrics = [
    { value: 'throughput', label: 'Throughput', icon: TrendingUp, color: 'text-green-600' },
    { value: 'errorRate', label: 'Error Rate', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'latency', label: 'Latency', icon: Clock, color: 'text-blue-600' }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time protocol analysis and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-500">LIVE</span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Time Range</h3>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-3 py-1 rounded text-sm ${
                  timeRange === range.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Messages</h3>
            <Database className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {analyticsData?.kpis.totalMessages.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last hour</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Error Rate</h3>
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">{analyticsData?.kpis.errorRate}%</p>
          <p className="text-sm text-gray-500 mt-1">-0.3% from last hour</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Throughput</h3>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{analyticsData?.kpis.avgThroughput} Kbps</p>
          <p className="text-sm text-gray-500 mt-1">+8.2% from last hour</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Success Rate</h3>
            <CheckCircle className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">{analyticsData?.kpis.successRate}%</p>
          <p className="text-sm text-gray-500 mt-1">+0.2% from last hour</p>
        </div>
      </div>

      {/* Additional KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Avg Latency</h3>
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{analyticsData?.kpis.avgLatency}ms</p>
          <p className="text-sm text-gray-500 mt-1">-1.2ms from last hour</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active UEs</h3>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-600">{analyticsData?.kpis.activeUEs}</p>
          <p className="text-sm text-gray-500 mt-1">+5 from last hour</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Data Volume</h3>
            <Activity className="w-5 h-5 text-cyan-600" />
          </div>
          <p className="text-2xl font-bold text-cyan-600">{analyticsData?.kpis.dataVolume} GB</p>
          <p className="text-sm text-gray-500 mt-1">+0.3GB from last hour</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Performance Trends</h3>
            <div className="flex gap-2">
              {metrics.map((metric) => {
                const Icon = metric.icon
                return (
                  <button
                    key={metric.value}
                    onClick={() => setSelectedMetric(metric.value)}
                    className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                      selectedMetric === metric.value
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {metric.label}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization for {selectedMetric}</p>
              <p className="text-sm text-gray-400 mt-1">
                {analyticsData?.trends[selectedMetric as keyof typeof analyticsData.trends]?.length || 0} data points
              </p>
            </div>
          </div>
        </div>

        {/* Layer Distribution */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Message Distribution by Layer</h3>
          <div className="space-y-3">
            {analyticsData?.layerDistribution && Object.entries(analyticsData.layerDistribution).map(([layer, percentage]) => (
              <div key={layer} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm font-medium">{layer}</span>
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
      </div>

      {/* Error Analysis and Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Errors */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Top Error Types</h3>
          <div className="space-y-3">
            {analyticsData?.topErrors.map((error: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium">{error.type}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{error.count}</span>
                  <span className="text-xs text-gray-500">({error.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Channel Distribution</h3>
          <div className="space-y-3">
            {analyticsData?.channelDistribution && Object.entries(analyticsData.channelDistribution).map(([channel, percentage]) => (
              <div key={channel} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">{channel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage