import React, { useState, useEffect } from 'react'
import { Search, Filter, Download, RefreshCw, Eye, Activity } from 'lucide-react'

export const EnhancedLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([])
  const [filteredLogs, setFilteredLogs] = useState<any[]>([])
  const [filters, setFilters] = useState({
    layer: 'ALL',
    channel: 'ALL',
    messageType: 'ALL',
    direction: 'ALL',
    search: ''
  })
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)

  const layers = ['ALL', 'PHY', 'MAC', 'RLC', 'PDCP', 'RRC', 'NAS', 'NGAP', 'GTP', 'SCTP', 'OTHER']
  const channels = ['ALL', 'PBCH', 'PDCCH', 'PDSCH', 'PUSCH', 'PUCCH', 'PRACH', 'CCCH', 'DCCH', 'DTCH', 'BCCH', 'PCCH']
  const messageTypes = ['ALL', 'MIB', 'SIB1', 'RRCSetup', 'RRCReconfiguration', 'SecurityModeCommand', 
    'UECapabilityEnquiry', 'PDSCH', 'PUSCH', 'DL-SCH', 'UL-SCH', 'MAC-PDU', 'RLC-PDU', 'PDCP-PDU', 
    'NAS-PDU', 'NGAP-PDU', 'GTP-PDU', 'GENERIC']
  const directions = ['ALL', 'DL', 'UL', 'BOTH']

  useEffect(() => {
    // Simulate enhanced log data
    const loadSampleData = () => {
      const samples = [
        { 
          id: 1, 
          timestamp: '10:00:00.123', 
          direction: 'DL', 
          layer: 'PHY', 
          channel: 'PBCH', 
          sfn: '100', 
          messageType: 'MIB', 
          rnti: 'SI-RNTI', 
          message: 'MIB decoded', 
          rawData: '40 04 64 40 00', 
          ies: 'SFN=100, BW=20MHz', 
          source: 'srsRAN' 
        },
        { 
          id: 2, 
          timestamp: '10:00:01.456', 
          direction: 'DL', 
          layer: 'MAC', 
          channel: 'PDSCH', 
          sfn: '101', 
          messageType: 'DL-SCH', 
          rnti: 'C-RNTI', 
          message: 'HARQ transmission', 
          rawData: '01 23 45 67 89', 
          ies: 'HARQ-ID=1, RV=0, MCS=16', 
          source: 'srsRAN' 
        },
        { 
          id: 3, 
          timestamp: '10:00:02.789', 
          direction: 'UL', 
          layer: 'RRC', 
          channel: 'DCCH', 
          sfn: '102', 
          messageType: 'RRCSetupRequest', 
          rnti: 'C-RNTI', 
          message: 'RRC Setup Request received', 
          rawData: '12 34 56 78 90', 
          ies: 'UE-Identity=12345, EstablishmentCause=mo-Data', 
          source: 'srsRAN' 
        },
        { 
          id: 4, 
          timestamp: '10:00:03.012', 
          direction: 'DL', 
          layer: 'RRC', 
          channel: 'DCCH', 
          sfn: '103', 
          messageType: 'RRCSetup', 
          rnti: 'C-RNTI', 
          message: 'RRC Setup sent', 
          rawData: 'AB CD EF 12 34', 
          ies: 'rrc-TransactionIdentifier=1, radioResourceConfigDedicated', 
          source: 'srsRAN' 
        }
      ]
      setLogs(samples)
      setIsConnected(false) // Using sample data
    }

    loadSampleData()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = logs
    Object.keys(filters).forEach(key => {
      if (filters[key as keyof typeof filters] && filters[key as keyof typeof filters] !== 'ALL') {
        if (key === 'search') {
          const term = filters[key as keyof typeof filters].toLowerCase()
          filtered = filtered.filter(log => 
            log.message?.toLowerCase().includes(term) ||
            log.ies?.toLowerCase().includes(term) ||
            log.messageType?.toLowerCase().includes(term)
          )
        } else {
          filtered = filtered.filter(log => 
            log[key as keyof typeof log] === filters[key as keyof typeof filters]
          )
        }
      }
    })
    setFilteredLogs(filtered)
  }, [logs, filters])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const decodeMessage = (log: any) => {
    setSelectedMessage(log)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Protocol Stack Log Analysis</h2>
        <p className="text-gray-600">Real-time log viewer with comprehensive filtering and message decoding</p>
      </div>

      {/* Status and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="mb-4 flex items-center gap-4">
          <span className="font-medium">Status:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isConnected ? '🟢 CLI Connected' : '🔴 Sample Data'}
          </span>
          <span className="text-sm text-gray-500">
            {filteredLogs.length} of {logs.length} logs
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['layer', 'Layer', layers], 
            ['channel', 'Channel', channels], 
            ['messageType', 'Message', messageTypes], 
            ['direction', 'Direction', directions]
          ].map(([key, label, options]) => (
            <div key={key}>
              <label className="block text-xs font-medium mb-1">{label}</label>
              <select
                value={filters[key as keyof typeof filters]}
                onChange={(e) => handleFilterChange(key, e.target.value)}
                className="w-full border rounded px-2 py-1 text-sm"
              >
                {options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        
        <div className="mt-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search logs, IEs, components..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {['Time', 'Dir', 'Layer', 'Channel', 'SFN', 'Type', 'RNTI', 'IEs', 'Decode'].map(h => (
                <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredLogs.slice(0, 100).map(log => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 font-mono text-xs">{log.timestamp}</td>
                <td className="px-3 py-2">
                  <span className={`px-1 py-0.5 text-xs rounded ${
                    log.direction === 'DL' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {log.direction}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span className="px-1 py-0.5 text-xs rounded bg-blue-100 text-blue-700">
                    {log.layer}
                  </span>
                </td>
                <td className="px-3 py-2 text-xs">{log.channel || '-'}</td>
                <td className="px-3 py-2 font-mono text-xs">{log.sfn || '-'}</td>
                <td className="px-3 py-2 font-medium text-xs">{log.messageType}</td>
                <td className="px-3 py-2 font-mono text-xs">{log.rnti || '-'}</td>
                <td className="px-3 py-2 text-xs max-w-xs truncate" title={log.ies}>
                  {log.ies || '-'}
                </td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => decodeMessage(log)}
                    className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decoder Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Message Decoder - {selectedMessage.messageType}
              </h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Raw Data</h4>
                <div className="bg-gray-100 p-3 rounded font-mono text-sm">
                  {selectedMessage.rawData || 'No raw data available'}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Decoded Information</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>IEs: </strong>
                    {selectedMessage.ies || 'No IEs available'}
                  </p>
                  <p>
                    <strong>Source: </strong>
                    {selectedMessage.source || 'Unknown'}
                  </p>
                  <p>
                    <strong>Direction: </strong>
                    {selectedMessage.direction}
                  </p>
                  <p>
                    <strong>Layer: </strong>
                    {selectedMessage.layer}
                  </p>
                  <p>
                    <strong>Channel: </strong>
                    {selectedMessage.channel}
                  </p>
                  <p>
                    <strong>RNTI: </strong>
                    {selectedMessage.rnti}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedLogsPage