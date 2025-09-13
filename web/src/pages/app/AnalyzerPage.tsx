import React, { useState, useEffect } from 'react'
import { Play, Pause, Square, Settings, Download, Share, Eye, Filter } from 'lucide-react'
import { EnhancedLogViewer } from '../../components/analyzer/EnhancedLogViewer'
import { ProtocolLayerViews } from '../../components/analyzer/ProtocolLayerViews'

export const AnalyzerPage: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [messages, setMessages] = useState<any[]>([])
  const [selectedMessage, setSelectedMessage] = useState<any>(null)

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 5000),
        layer: 'RRC',
        direction: 'UE→eNB',
        messageType: 'RRCConnectionRequest',
        rawLog: 'RRC: UL-CCCH-Message ::= { message c1 : rrcConnectionRequest : { criticalExtensions rrcConnectionRequest-r8 : { ue-Identity s-TMSI : 0x12345678, establishmentCause mo-Data, spare bit-string (SIZE(1)) : \'0\'B } } }',
        parsedMessage: {
          message: {
            c1: {
              rrcConnectionRequest: {
                criticalExtensions: {
                  'rrcConnectionRequest-r8': {
                    'ue-Identity': { 's-TMSI': '0x12345678' },
                    establishmentCause: 'mo-Data',
                    spare: '0'
                  }
                }
              }
            }
          }
        },
        correlationKeys: {
          rnti: 0x003D,
          sTMSI: '0x12345678',
          cellId: '0x000001'
        },
        verdict: 'PASS'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 4000),
        layer: 'RRC',
        direction: 'eNB→UE',
        messageType: 'RRCConnectionSetup',
        rawLog: 'RRC: DL-CCCH-Message ::= { message c1 : rrcConnectionSetup : { rrc-TransactionIdentifier 0, criticalExtensions rrcConnectionSetup-r8 : { radioResourceConfigDedicated { srb-ToAddModList { { srb-Identity 1, rlc-Config explicitValue : { ul-AM-RLC { t-PollRetransmit ms50, pollPDU p4, pollByte kB25, maxRetxThreshold t4 }, dl-AM-RLC { t-Reordering ms35, t-StatusProhibit ms0 } }, logicalChannelConfig { ul-SpecificParameters { priority 1, prioritisedBitRate infinity, bucketSizeDuration ms100 } } } } } } }',
        parsedMessage: {
          message: {
            c1: {
              rrcConnectionSetup: {
                'rrc-TransactionIdentifier': 0,
                criticalExtensions: {
                  'rrcConnectionSetup-r8': {
                    radioResourceConfigDedicated: {
                      srbToAddModList: [{
                        srbIdentity: 1,
                        rlcConfig: {
                          explicitValue: {
                            ulAMRLC: {
                              tPollRetransmit: 'ms50',
                              pollPDU: 'p4',
                              pollByte: 'kB25',
                              maxRetxThreshold: 't4'
                            },
                            dlAMRLC: {
                              tReordering: 'ms35',
                              tStatusProhibit: 'ms0'
                            }
                          }
                        },
                        logicalChannelConfig: {
                          ulSpecificParameters: {
                            priority: 1,
                            prioritisedBitRate: 'infinity',
                            bucketSizeDuration: 'ms100'
                          }
                        }
                      }]
                    }
                  }
                }
              }
            }
          }
        },
        correlationKeys: {
          rnti: 0x003D,
          cRNTI: 0x003D
        },
        verdict: 'PASS'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 3000),
        layer: 'RRC',
        direction: 'UE→eNB',
        messageType: 'RRCConnectionSetupComplete',
        rawLog: 'RRC: UL-DCCH-Message ::= { message c1 : rrcConnectionSetupComplete : { rrc-TransactionIdentifier 0, criticalExtensions rrcConnectionSetupComplete-r8 : { selectedPLMN-Identity 1, dedicatedInfoNAS 0x2742000B } } }',
        parsedMessage: {
          message: {
            c1: {
              rrcConnectionSetupComplete: {
                'rrc-TransactionIdentifier': 0,
                criticalExtensions: {
                  'rrcConnectionSetupComplete-r8': {
                    'selectedPLMN-Identity': 1,
                    dedicatedInfoNAS: '0x2742000B'
                  }
                }
              }
            }
          }
        },
        correlationKeys: {
          rnti: 0x003D,
          cRNTI: 0x003D
        },
        verdict: 'PASS'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 2000),
        layer: 'S1AP',
        direction: 'eNB→MME',
        messageType: 'InitialUEMessage',
        rawLog: 'S1AP: InitialUEMessage ::= { protocolIEs { { id 0, criticality reject, value ENB-UE-S1AP-ID : 1 }, { id 8, criticality ignore, value NAS-PDU : 0x2742000B }, { id 67, criticality reject, value TAI : { pLMNidentity : \'00101\'H, tAC : \'0001\'H } }, { id 100, criticality reject, value EUTRAN-CGI : { pLMNidentity : \'00101\'H, cell-ID : \'00000001\'H } } } }',
        parsedMessage: {
          protocolIEs: [
            { id: 0, criticality: 'reject', value: { 'ENB-UE-S1AP-ID': 1 } },
            { id: 8, criticality: 'ignore', value: { 'NAS-PDU': '0x2742000B' } },
            { id: 67, criticality: 'reject', value: { TAI: { pLMNidentity: '00101', tAC: '0001' } } },
            { id: 100, criticality: 'reject', value: { 'EUTRAN-CGI': { pLMNidentity: '00101', 'cell-ID': '00000001' } } }
          ]
        },
        correlationKeys: {
          enbUeId: 1,
          plmnId: '00101',
          tac: '0001'
        },
        verdict: 'PASS'
      }
    ]
    setMessages(mockMessages)
  }, [])

  const filteredMessages = selectedLayer === 'all' 
    ? messages 
    : messages.filter(msg => msg.layer === selectedLayer)

  const handleStart = () => {
    setIsRunning(true)
    // Simulate real-time message flow
    const interval = setInterval(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: new Date(),
        layer: 'RRC',
        direction: 'UE→eNB',
        messageType: 'MeasurementReport',
        rawLog: 'Mock measurement report',
        parsedMessage: { mock: true },
        correlationKeys: { rnti: 0x003D },
        verdict: 'PASS'
      }])
    }, 2000)

    setTimeout(() => {
      clearInterval(interval)
      setIsRunning(false)
    }, 10000)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleExport = () => {
    const data = {
      messages: messages,
      exportTime: new Date().toISOString(),
      totalMessages: messages.length
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `5glabx-analysis-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="h-screen flex flex-col bg-base-100">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-base-300 bg-base-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">Protocol Analyzer</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={isRunning ? handleStop : handleStart}
              className={`btn btn-sm ${isRunning ? 'btn-error' : 'btn-primary'}`}
            >
              {isRunning ? (
                <>
                  <Square size={16} />
                  Stop
                </>
              ) : (
                <>
                  <Play size={16} />
                  Start
                </>
              )}
            </button>
            
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-outline btn-sm">
                <Filter size={16} />
                Layer
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setSelectedLayer('all')}>All Layers</a></li>
                <li><a onClick={() => setSelectedLayer('RRC')}>RRC</a></li>
                <li><a onClick={() => setSelectedLayer('NAS')}>NAS</a></li>
                <li><a onClick={() => setSelectedLayer('S1AP')}>S1AP</a></li>
                <li><a onClick={() => setSelectedLayer('NGAP')}>NGAP</a></li>
                <li><a onClick={() => setSelectedLayer('SIP')}>SIP</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm">
            <Settings size={16} />
          </button>
          <button className="btn btn-ghost btn-sm">
            <Share size={16} />
          </button>
          <button onClick={handleExport} className="btn btn-ghost btn-sm">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Message List */}
        <div className="w-1/3 border-r border-base-300 flex flex-col">
          <div className="p-4 border-b border-base-300">
            <h2 className="text-lg font-semibold">Message Flow</h2>
            <p className="text-sm text-base-content/70">
              {filteredMessages.length} messages • {selectedLayer === 'all' ? 'All layers' : selectedLayer}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <EnhancedLogViewer
              messages={filteredMessages}
              selectedMessage={selectedMessage}
              onMessageSelect={setSelectedMessage}
            />
          </div>
        </div>

        {/* Right Panel - Protocol Analysis */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-base-300">
            <h2 className="text-lg font-semibold">Protocol Analysis</h2>
            <p className="text-sm text-base-content/70">
              {selectedMessage ? `Analyzing ${selectedMessage.messageType}` : 'Select a message to analyze'}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <ProtocolLayerViews
              selectedMessage={selectedMessage}
              messages={messages}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between p-2 border-t border-base-300 bg-base-200 text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-base-content/30'}`}></div>
            {isRunning ? 'Running' : 'Stopped'}
          </span>
          <span>Messages: {messages.length}</span>
          <span>Layer: {selectedLayer}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Last update: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}

export default AnalyzerPage