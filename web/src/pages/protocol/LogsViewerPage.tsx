import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, RefreshCw, Eye } from 'lucide-react'

export const LogsViewerPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [filters, setFilters] = useState({
    layer: 'all',
    level: 'all',
    channel: 'all',
    search: ''
  })
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  const protocolLayers = ['all', 'PHY', 'MAC', 'RLC', 'PDCP', 'RRC', 'NAS', 'IMS']
  const logLevels = ['all', 'ERROR', 'WARN', 'INFO', 'DEBUG']
  const channels = ['all', 'PBCH', 'PDCCH', 'PDSCH', 'PUSCH', 'PUCCH', 'PRACH', 'CCCH', 'DCCH']

  useEffect(() => {
    // Simulate log data loading
    const loadLogs = () => {
      const sampleLogs = [
        {
          id: 1,
          timestamp: '10:00:00.123',
          layer: 'PHY',
          level: 'INFO',
          channel: 'PBCH',
          rnti: '0x4601',
          message: 'PDSCH: rnti=0x4601 h_id=0 k1=4 prb=[0,87) symb=[1,14) mod=QPSK rv=0 tbs=309 t=135.5us',
          raw: '[PHY] [I] [931.6] PDSCH: rnti=0x4601 h_id=0 k1=4 prb=[0,87) symb=[1,14) mod=QPSK rv=0 tbs=309 t=135.5us'
        },
        {
          id: 2,
          timestamp: '10:00:01.456',
          layer: 'MAC',
          level: 'INFO',
          channel: 'PDSCH',
          rnti: '0x4601',
          message: 'DL PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55',
          raw: '[MAC] [I] [938.5] DL PDU: ue=0 rnti=0x4601 size=169: SDU: lcid=1 nof_sdus=1 total_size=55'
        },
        {
          id: 3,
          timestamp: '10:00:02.789',
          layer: 'RLC',
          level: 'INFO',
          channel: 'DCCH',
          rnti: '0x4601',
          message: 'SRB1 DL: TX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55',
          raw: '[RLC] [I] du=0 ue=0 SRB1 DL: TX PDU. dc=data p=1 si=full sn=0 pdu_len=53 grant_len=55'
        },
        {
          id: 4,
          timestamp: '10:00:03.012',
          layer: 'PHY',
          level: 'ERROR',
          channel: 'PUCCH',
          rnti: '0x4601',
          message: 'PUCCH decode failed: rnti=0x4601 format=1',
          raw: '[PHY] [E] [932.1] PUCCH decode failed: rnti=0x4601 format=1'
        }
      ]
      setLogs(sampleLogs)
    }

    loadLogs()
  }, [])

  const filteredLogs = logs.filter(log => {
    if (filters.layer !== 'all' && log.layer !== filters.layer) return false
    if (filters.level !== 'all' && log.level !== filters.level) return false
    if (filters.channel !== 'all' && log.channel !== filters.channel) return false
    if (filters.search && !log.message.toLowerCase().includes(filters.search.toLowerCase())) return false
    return true
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-50'
      case 'WARN': return 'text-yellow-600 bg-yellow-50'
      case 'INFO': return 'text-blue-600 bg-blue-50'
      case 'DEBUG': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getLayerColor = (layer: string) => {
    switch (layer) {
      case 'PHY': return 'text-purple-600 bg-purple-50'
      case 'MAC': return 'text-blue-600 bg-blue-50'
      case 'RLC': return 'text-green-600 bg-green-50'
      case 'PDCP': return 'text-orange-600 bg-orange-50'
      case 'RRC': return 'text-red-600 bg-red-50'
      case 'NAS': return 'text-indigo-600 bg-indigo-50'
      case 'IMS': return 'text-cyan-600 bg-cyan-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Logs Viewer</h1>
        <p className="text-gray-600 mt-1">Real-time protocol stack log analysis</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-700">Advanced Filters</h3>
          <div className="flex items-center gap-2">
            <button className="btn btn-sm btn-outline">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="btn btn-sm btn-outline">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium mb-1">Layer</label>
            <select
              value={filters.layer}
              onChange={(e) => setFilters(prev => ({...prev, layer: e.target.value}))}
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {protocolLayers.map(layer => (
                <option key={layer} value={layer}>
                  {layer === 'all' ? 'All Layers' : `${layer} Layer`}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Level</label>
            <select
              value={filters.level}
              onChange={(e) => setFilters(prev => ({...prev, level: e.target.value}))}
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {logLevels.map(level => (
                <option key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Channel</label>
            <select
              value={filters.channel}
              onChange={(e) => setFilters(prev => ({...prev, channel: e.target.value}))}
              className="w-full border rounded px-2 py-1 text-sm"
            >
              {channels.map(channel => (
                <option key={channel} value={channel}>
                  {channel === 'all' ? 'All Channels' : channel}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-medium mb-1">Search</label>
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                className="w-full border rounded px-8 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <div className="grid grid-cols-7 gap-2 font-medium text-sm text-gray-700">
            <div>Time</div>
            <div>Layer</div>
            <div>Level</div>
            <div>Channel</div>
            <div>RNTI</div>
            <div>Message</div>
            <div>Actions</div>
          </div>
        </div>
        
        <div className="divide-y max-h-96 overflow-y-auto">
          {filteredLogs.map((log) => (
            <div key={log.id} className="px-4 py-3 grid grid-cols-7 gap-2 text-sm hover:bg-gray-50">
              <div className="font-mono text-xs text-gray-500">{log.timestamp}</div>
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLayerColor(log.layer)}`}>
                  {log.layer}
                </span>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
              </div>
              <div className="text-xs">{log.channel}</div>
              <div className="font-mono text-xs">{log.rnti}</div>
              <div className="text-xs truncate" title={log.message}>
                {log.message}
              </div>
              <div>
                <button
                  onClick={() => setSelectedMessage(log)}
                  className="text-blue-600 hover:text-blue-800 p-1"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Parsed Information</h4>
                <div className="bg-gray-50 p-3 rounded text-sm space-y-2">
                  <div><strong>Timestamp:</strong> {selectedMessage.timestamp}</div>
                  <div><strong>Layer:</strong> {selectedMessage.layer}</div>
                  <div><strong>Level:</strong> {selectedMessage.level}</div>
                  <div><strong>Channel:</strong> {selectedMessage.channel}</div>
                  <div><strong>RNTI:</strong> {selectedMessage.rnti}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Raw Message</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {selectedMessage.raw}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LogsViewerPage