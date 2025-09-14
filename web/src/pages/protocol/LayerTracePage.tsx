import React, { useState, useEffect } from 'react'
import { Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react'

export const LayerTracePage: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState('PHY')
  const [traceData, setTraceData] = useState<any>({})

  const layers = ['PHY', 'MAC', 'RLC', 'PDCP', 'RRC']

  useEffect(() => {
    // Sample layer trace data
    const sampleTrace = {
      PHY: [
        { 
          time: '10:30:01.100', 
          event: 'PDSCH Transmission', 
          details: 'RNTI: 0x4601, TBS: 309 bits, MCS: 16, PRB: [0,87)', 
          level: 'info',
          duration: '135.5μs'
        },
        { 
          time: '10:30:01.150', 
          event: 'PUCCH Reception', 
          details: 'Format 1, SINR: -23.6dB, RSRP: -85.2dBm', 
          level: 'warn',
          duration: '45.2μs'
        },
        { 
          time: '10:30:01.200', 
          event: 'Channel Quality Report', 
          details: 'CQI: 7, PMI: 1, RI: 2, BLER: 0.1%', 
          level: 'info',
          duration: '12.8μs'
        },
        { 
          time: '10:30:01.250', 
          event: 'SRS Reception', 
          details: 'UE: 0, SRS-RSRP: -78.5dBm, Timing Advance: 12', 
          level: 'info',
          duration: '8.3μs'
        }
      ],
      MAC: [
        { 
          time: '10:30:01.100', 
          event: 'DL PDU Scheduled', 
          details: 'UE: 0, Size: 169 bytes, HARQ ID: 1, RV: 0', 
          level: 'info',
          duration: '25.6μs'
        },
        { 
          time: '10:30:01.150', 
          event: 'UL Grant Allocated', 
          details: 'UE: 0, TBS: 128, MCS: 14, PRB: [20,35)', 
          level: 'info',
          duration: '18.4μs'
        },
        { 
          time: '10:30:01.200', 
          event: 'CRC Check Failed', 
          details: 'UL PDU corrupted, HARQ ID: 2, Retransmission required', 
          level: 'error',
          duration: '5.2μs'
        },
        { 
          time: '10:30:01.250', 
          event: 'Buffer Status Report', 
          details: 'UE: 0, BSR: 256 bytes, LCID: 3', 
          level: 'info',
          duration: '3.1μs'
        }
      ],
      RLC: [
        { 
          time: '10:30:01.100', 
          event: 'TX PDU', 
          details: 'SRB1, SN: 0, Length: 53, AM mode', 
          level: 'info',
          duration: '8.7μs'
        },
        { 
          time: '10:30:01.150', 
          event: 'RX PDU', 
          details: 'DRB1, SN: 15, Length: 87, Status: Complete', 
          level: 'info',
          duration: '6.3μs'
        },
        { 
          time: '10:30:01.200', 
          event: 'Status Report', 
          details: 'ACK: SN 0-14, NACK: SN 15, Window: [0,16)', 
          level: 'info',
          duration: '4.2μs'
        },
        { 
          time: '10:30:01.250', 
          event: 'Retransmission', 
          details: 'SN: 15, Reason: NACK received, Poll bit set', 
          level: 'warn',
          duration: '7.8μs'
        }
      ],
      PDCP: [
        { 
          time: '10:30:01.100', 
          event: 'PDU Transmission', 
          details: 'SN: 1234, Size: 45 bytes, Integrity: Enabled', 
          level: 'info',
          duration: '3.2μs'
        },
        { 
          time: '10:30:01.150', 
          event: 'PDU Reception', 
          details: 'SN: 5678, Size: 67 bytes, Decryption: Success', 
          level: 'info',
          duration: '2.8μs'
        },
        { 
          time: '10:30:01.200', 
          event: 'Sequence Number Check', 
          details: 'Expected: 5679, Received: 5678, Reordering required', 
          level: 'warn',
          duration: '1.5μs'
        },
        { 
          time: '10:30:01.250', 
          event: 'PDU Reordering', 
          details: 'SN: 5678 delivered, Window: [5670,5680)', 
          level: 'info',
          duration: '2.1μs'
        }
      ],
      RRC: [
        { 
          time: '10:30:01.100', 
          event: 'RRC Setup Request', 
          details: 'UE Identity: 12345, Establishment Cause: mo-Data', 
          level: 'info',
          duration: '15.6μs'
        },
        { 
          time: '10:30:01.150', 
          event: 'RRC Setup', 
          details: 'Transaction ID: 1, Radio Resource Config included', 
          level: 'info',
          duration: '22.3μs'
        },
        { 
          time: '10:30:01.200', 
          event: 'RRC Setup Complete', 
          details: 'Transaction ID: 1, Selected PLMN: 001-01', 
          level: 'info',
          duration: '18.7μs'
        },
        { 
          time: '10:30:01.250', 
          event: 'Security Mode Command', 
          details: 'Integrity: EIA1, Ciphering: EEA1, Key: Updated', 
          level: 'info',
          duration: '12.4μs'
        }
      ]
    }
    
    setTraceData(sampleTrace)
  }, [])

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'border-l-red-500 bg-red-50'
      case 'warn':
        return 'border-l-yellow-500 bg-yellow-50'
      case 'info':
        return 'border-l-blue-500 bg-blue-50'
      default:
        return 'border-l-green-500 bg-green-50'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Layer Protocol Trace</h1>
        <p className="text-gray-600 mt-1">Real-time layer-by-layer protocol analysis</p>
      </div>

      {/* Layer Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {layers.map(layer => (
          <button
            key={layer}
            onClick={() => setSelectedLayer(layer)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedLayer === layer 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {layer}
          </button>
        ))}
      </div>

      {/* Trace Content */}
      <div className="bg-white border rounded-lg">
        <div className="px-6 py-3 border-b bg-gray-50">
          <h3 className="text-lg font-semibold">{selectedLayer} Layer Events</h3>
          <p className="text-sm text-gray-600 mt-1">
            Real-time trace of {selectedLayer} layer protocol events
          </p>
        </div>
        
        <div className="divide-y">
          {(traceData[selectedLayer] || []).map((event: any, idx: number) => (
            <div key={idx} className={`px-6 py-4 border-l-4 ${getLevelColor(event.level)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {getLevelIcon(event.level)}
                  <span className="font-medium text-gray-900">{event.event}</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="font-mono">{event.time}</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {event.duration}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 ml-7">{event.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Layer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">{selectedLayer} Layer Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Events</span>
              <span className="font-medium">{(traceData[selectedLayer] || []).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Error Events</span>
              <span className="font-medium text-red-600">
                {(traceData[selectedLayer] || []).filter((e: any) => e.level === 'error').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Warning Events</span>
              <span className="font-medium text-yellow-600">
                {(traceData[selectedLayer] || []).filter((e: any) => e.level === 'warn').length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Processing Time</span>
              <span className="font-medium">
                {((traceData[selectedLayer] || []).reduce((acc: number, e: any) => 
                  acc + parseFloat(e.duration.replace('μs', '')), 0) / 
                  (traceData[selectedLayer] || []).length || 0).toFixed(1)}μs
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>
          <div className="space-y-2">
            {(traceData[selectedLayer] || []).slice(0, 5).map((event: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  event.level === 'error' ? 'bg-red-500' :
                  event.level === 'warn' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <span className="font-mono text-xs">{event.time}</span>
                <span className="text-gray-600 truncate">{event.event}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Processing Efficiency</span>
                <span>95.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '95.2%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Error Rate</span>
                <span>2.1%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{width: '2.1%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Throughput</span>
                <span>156.7 Kbps</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayerTracePage