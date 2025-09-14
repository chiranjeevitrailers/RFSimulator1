import React, { useState, useEffect } from 'react'
import { ArrowRight, Clock, Users, MessageSquare, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export const CallFlowPage: React.FC = () => {
  const [callFlows, setCallFlows] = useState<any[]>([])
  const [selectedFlow, setSelectedFlow] = useState<any>(null)

  useEffect(() => {
    // Sample call flows for demonstration
    const sampleFlows = [
      {
        id: 1,
        type: 'UE Registration',
        status: 'success',
        duration: 250,
        messageCount: 8,
        ue: '0x4601',
        timestamp: new Date().toISOString(),
        participants: ['UE', 'gNB', 'AMF', 'UDM'],
        messages: [
          { step: 1, from: 'UE', to: 'gNB', message: 'RRC Setup Request', time: '10:30:01.100', layer: 'RRC' },
          { step: 2, from: 'gNB', to: 'UE', message: 'RRC Setup', time: '10:30:01.150', layer: 'RRC' },
          { step: 3, from: 'UE', to: 'gNB', message: 'RRC Setup Complete', time: '10:30:01.200', layer: 'RRC' },
          { step: 4, from: 'gNB', to: 'AMF', message: 'Initial UE Message', time: '10:30:01.250', layer: 'NGAP' },
          { step: 5, from: 'AMF', to: 'UDM', message: 'Authentication Request', time: '10:30:01.300', layer: 'NAS' },
          { step: 6, from: 'UDM', to: 'AMF', message: 'Authentication Response', time: '10:30:01.350', layer: 'NAS' },
          { step: 7, from: 'AMF', to: 'gNB', message: 'Downlink NAS Transport', time: '10:30:01.400', layer: 'NGAP' },
          { step: 8, from: 'gNB', to: 'UE', message: 'Security Mode Command', time: '10:30:01.450', layer: 'RRC' }
        ]
      },
      {
        id: 2,
        type: 'PDU Session Establishment',
        status: 'failed',
        duration: 1200,
        messageCount: 12,
        ue: '0x4602',
        timestamp: new Date(Date.now() - 60000).toISOString(),
        participants: ['UE', 'gNB', 'AMF', 'SMF', 'UPF'],
        messages: [
          { step: 1, from: 'UE', to: 'AMF', message: 'PDU Session Establishment Request', time: '10:29:01.100', layer: 'NAS' },
          { step: 2, from: 'AMF', to: 'SMF', message: 'Nsmf_PDUSession_CreateSMContext', time: '10:29:01.200', layer: 'HTTP' },
          { step: 3, from: 'SMF', to: 'UPF', message: 'PFCP Session Establishment Request', time: '10:29:01.300', layer: 'PFCP' },
          { step: 4, from: 'UPF', to: 'SMF', message: 'PFCP Session Establishment Response', time: '10:29:01.400', layer: 'PFCP' },
          { step: 5, from: 'SMF', to: 'AMF', message: 'Nsmf_PDUSession_CreateSMContext Response', time: '10:29:01.500', layer: 'HTTP' },
          { step: 6, from: 'AMF', to: 'gNB', message: 'PDU Session Resource Setup Request', time: '10:29:01.600', layer: 'NGAP' },
          { step: 7, from: 'gNB', to: 'UE', message: 'PDU Session Establishment Accept', time: '10:29:01.700', layer: 'RRC' },
          { step: 8, from: 'UE', to: 'gNB', message: 'PDU Session Establishment Complete', time: '10:29:01.800', layer: 'RRC' },
          { step: 9, from: 'gNB', to: 'AMF', message: 'PDU Session Resource Setup Response', time: '10:29:01.900', layer: 'NGAP' },
          { step: 10, from: 'AMF', to: 'SMF', message: 'Nsmf_PDUSession_UpdateSMContext', time: '10:29:02.000', layer: 'HTTP' },
          { step: 11, from: 'SMF', to: 'UPF', message: 'PFCP Session Modification Request', time: '10:29:02.100', layer: 'PFCP' },
          { step: 12, from: 'UPF', to: 'SMF', message: 'Error: Session Creation Failed', time: '10:29:02.300', layer: 'PFCP' }
        ]
      },
      {
        id: 3,
        type: 'Handover Procedure',
        status: 'success',
        duration: 180,
        messageCount: 6,
        ue: '0x4603',
        timestamp: new Date(Date.now() - 120000).toISOString(),
        participants: ['UE', 'Source gNB', 'Target gNB', 'AMF'],
        messages: [
          { step: 1, from: 'UE', to: 'Source gNB', message: 'Measurement Report', time: '10:28:01.100', layer: 'RRC' },
          { step: 2, from: 'Source gNB', to: 'Target gNB', message: 'Handover Request', time: '10:28:01.150', layer: 'XnAP' },
          { step: 3, from: 'Target gNB', to: 'Source gNB', message: 'Handover Request Acknowledge', time: '10:28:01.200', layer: 'XnAP' },
          { step: 4, from: 'Source gNB', to: 'UE', message: 'RRC Reconfiguration', time: '10:28:01.250', layer: 'RRC' },
          { step: 5, from: 'UE', to: 'Target gNB', message: 'RRC Reconfiguration Complete', time: '10:28:01.280', layer: 'RRC' },
          { step: 6, from: 'Target gNB', to: 'AMF', message: 'Path Switch Request', time: '10:28:01.300', layer: 'NGAP' }
        ]
      }
    ]
    
    setCallFlows(sampleFlows)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLayerColor = (layer: string) => {
    switch (layer) {
      case 'RRC': return 'bg-blue-100 text-blue-800'
      case 'NAS': return 'bg-purple-100 text-purple-800'
      case 'NGAP': return 'bg-green-100 text-green-800'
      case 'HTTP': return 'bg-orange-100 text-orange-800'
      case 'PFCP': return 'bg-red-100 text-red-800'
      case 'XnAP': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Call Flow Analysis</h1>
          <p className="text-gray-600 mt-1">Protocol sequence analysis and message flow visualization</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {callFlows.length} flows
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Flows List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Active Call Flows</h3>
          {callFlows.map((flow) => (
            <div
              key={flow.id}
              className={`p-4 bg-white border rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                selectedFlow?.id === flow.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedFlow(flow)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(flow.status)}
                  <h3 className="font-semibold text-gray-900">{flow.type}</h3>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(flow.status)}`}>
                  {flow.status.toUpperCase()}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>UE: {flow.ue}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{flow.duration}ms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{flow.messageCount} messages</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Participants: {flow.participants.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sequence Diagram */}
        {selectedFlow && (
          <div className="bg-white p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">
              {selectedFlow.type} - Sequence Diagram
            </h3>
            
            {/* Participants */}
            <div className="flex justify-between mb-6 text-sm font-medium text-gray-700">
              {selectedFlow.participants.map((entity: string) => (
                <div key={entity} className="text-center">
                  <div className="px-3 py-2 bg-gray-100 border rounded mb-2">
                    {entity}
                  </div>
                  <div className="w-px h-64 bg-gray-300 mx-auto"></div>
                </div>
              ))}
            </div>
            
            {/* Messages */}
            <div className="space-y-3">
              {selectedFlow.messages.map((msg: any, idx: number) => (
                <div key={idx} className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      {msg.step}
                    </span>
                    <span className="font-mono text-xs text-gray-500 w-20">
                      {msg.time}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-1">
                    <span className="font-medium">{msg.from}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{msg.to}</span>
                    <span className="text-gray-600">:</span>
                    <span className="text-gray-800">{msg.message}</span>
                  </div>
                  
                  <span className={`px-2 py-1 rounded text-xs ${getLayerColor(msg.layer)}`}>
                    {msg.layer}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call Flow Statistics */}
      {selectedFlow && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Flow Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Duration</span>
                <span className="font-medium">{selectedFlow.duration}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Message Count</span>
                <span className="font-medium">{selectedFlow.messageCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Participants</span>
                <span className="font-medium">{selectedFlow.participants.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Message Time</span>
                <span className="font-medium">
                  {(selectedFlow.duration / selectedFlow.messageCount).toFixed(1)}ms
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Layer Distribution</h3>
            <div className="space-y-2">
              {Object.entries(
                selectedFlow.messages.reduce((acc: any, msg: any) => {
                  acc[msg.layer] = (acc[msg.layer] || 0) + 1
                  return acc
                }, {})
              ).map(([layer, count]) => (
                <div key={layer} className="flex justify-between items-center">
                  <span className={`px-2 py-1 rounded text-xs ${getLayerColor(layer)}`}>
                    {layer}
                  </span>
                  <span className="font-medium">{count as number}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Success Rate</span>
                  <span>{selectedFlow.status === 'success' ? '100%' : '0%'}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${selectedFlow.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{width: selectedFlow.status === 'success' ? '100%' : '0%'}}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Message Rate</span>
                  <span>{(selectedFlow.messageCount / (selectedFlow.duration / 1000)).toFixed(1)}/s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-2">
              {selectedFlow.messages.slice(0, 5).map((msg: any, idx: number) => (
                <div key={idx} className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-mono text-xs">{msg.time}</span>
                  <span className="text-gray-600 truncate">{msg.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CallFlowPage