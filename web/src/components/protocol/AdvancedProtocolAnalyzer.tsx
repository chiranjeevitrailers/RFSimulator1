import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { 
  Satellite, 
  Car, 
  Wifi, 
  Globe, 
  Zap, 
  Shield, 
  BarChart3,
  Layers,
  Filter,
  Search,
  Download,
  Settings,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { TestExecutionAPI } from '../../lib/api/testExecution'
import LoadingSpinner from '../common/LoadingSpinner'

interface AdvancedProtocolAnalyzerProps {
  executionId: string
  protocolType: 'oran' | 'nbiot' | 'ntn' | 'v2x' | 'ims' | 'security'
}

export const AdvancedProtocolAnalyzer: React.FC<AdvancedProtocolAnalyzerProps> = ({
  executionId,
  protocolType
}) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('all')
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [analysisView, setAnalysisView] = useState<'overview' | 'detailed' | 'correlation'>('overview')
  const [timeRange, setTimeRange] = useState<{start: number, end: number} | null>(null)

  // Fetch execution results with protocol-specific analysis
  const { data: executionResults, isLoading } = useQuery({
    queryKey: ['advanced-protocol-analysis', executionId, protocolType],
    queryFn: () => TestExecutionAPI.getAdvancedProtocolAnalysis(executionId, protocolType)
  })

  const getProtocolIcon = (type: string) => {
    switch (type) {
      case 'oran':
        return <Wifi className="w-6 h-6 text-accent" />
      case 'nbiot':
        return <Satellite className="w-6 h-6 text-success" />
      case 'ntn':
        return <Satellite className="w-6 h-6 text-info" />
      case 'v2x':
        return <Car className="w-6 h-6 text-warning" />
      case 'ims':
        return <Globe className="w-6 h-6 text-info" />
      case 'security':
        return <Shield className="w-6 h-6 text-error" />
      default:
        return <BarChart3 className="w-6 h-6 text-primary" />
    }
  }

  const getProtocolLayers = (type: string) => {
    switch (type) {
      case 'oran':
        return ['E2AP', 'O1', 'A1', 'E1', 'F1', 'X2AP', 'S1AP', 'NGAP']
      case 'nbiot':
        return ['RRC', 'NAS', 'S1AP', 'S11', 'S6a', 'SGs']
      case 'ntn':
        return ['RRC', 'NAS', 'NGAP', 'N2', 'N3', 'N4', 'N6']
      case 'v2x':
        return ['PC5', 'Uu', 'S1AP', 'NGAP', 'V2X-AS', 'V2X-CF']
      case 'ims':
        return ['SIP', 'SDP', 'RTP', 'RTCP', 'DIAMETER', 'HTTP']
      case 'security':
        return ['5G-AKA', 'EAP-AKA', 'SUPI', 'SUCI', 'KDF', 'AES']
      default:
        return ['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP']
    }
  }

  const getProtocolSpecificMetrics = (type: string, data: any) => {
    switch (type) {
      case 'oran':
        return {
          'E2 Node Count': data.e2Nodes?.length || 0,
          'CU-CP Connections': data.cuCpConnections || 0,
          'DU Connections': data.duConnections || 0,
          'O1 Sessions': data.o1Sessions || 0,
          'A1 Policies': data.a1Policies || 0
        }
      case 'nbiot':
        return {
          'NPRACH Attempts': data.nprachAttempts || 0,
          'NPRACH Success Rate': `${data.nprachSuccessRate || 0}%`,
          'Coverage Enhancement': data.coverageEnhancement || 'N/A',
          'Power Saving Mode': data.psmActive ? 'Active' : 'Inactive',
          'Extended DRX': data.edrxActive ? 'Active' : 'Inactive'
        }
      case 'ntn':
        return {
          'Satellite Handovers': data.satelliteHandovers || 0,
          'Beam Switches': data.beamSwitches || 0,
          'Doppler Compensation': data.dopplerCompensation || 'N/A',
          'Propagation Delay': `${data.propagationDelay || 0}ms`,
          'Coverage Area': data.coverageArea || 'N/A'
        }
      case 'v2x':
        return {
          'V2V Messages': data.v2vMessages || 0,
          'V2I Messages': data.v2iMessages || 0,
          'V2P Messages': data.v2pMessages || 0,
          'PC5 Sessions': data.pc5Sessions || 0,
          'Safety Applications': data.safetyApps || 0
        }
      case 'ims':
        return {
          'SIP Sessions': data.sipSessions || 0,
          'VoLTE Calls': data.volteCalls || 0,
          'VoWiFi Calls': data.vowifiCalls || 0,
          'RTP Streams': data.rtpStreams || 0,
          'Codec Usage': data.codecUsage || 'N/A'
        }
      case 'security':
        return {
          'Authentication Attempts': data.authAttempts || 0,
          'SUCI Decryptions': data.suciDecryptions || 0,
          'Key Derivation': data.keyDerivations || 0,
          'Security Violations': data.securityViolations || 0,
          'Encryption Status': data.encryptionActive ? 'Active' : 'Inactive'
        }
      default:
        return {}
    }
  }

  const getProtocolSpecificAlerts = (type: string, data: any) => {
    const alerts = []
    
    switch (type) {
      case 'oran':
        if (data.e2NodeFailures > 0) {
          alerts.push({ type: 'error', message: `${data.e2NodeFailures} E2 Node failures detected` })
        }
        if (data.o1ConnectionIssues > 0) {
          alerts.push({ type: 'warning', message: `${data.o1ConnectionIssues} O1 connection issues` })
        }
        break
      case 'nbiot':
        if (data.nprachSuccessRate < 80) {
          alerts.push({ type: 'warning', message: `Low NPRACH success rate: ${data.nprachSuccessRate}%` })
        }
        if (data.coverageIssues > 0) {
          alerts.push({ type: 'error', message: `${data.coverageIssues} coverage enhancement issues` })
        }
        break
      case 'ntn':
        if (data.satelliteHandoverFailures > 0) {
          alerts.push({ type: 'error', message: `${data.satelliteHandoverFailures} satellite handover failures` })
        }
        if (data.dopplerCompensation > 100) {
          alerts.push({ type: 'warning', message: `High Doppler compensation: ${data.dopplerCompensation}Hz` })
        }
        break
      case 'v2x':
        if (data.pc5ConnectionIssues > 0) {
          alerts.push({ type: 'error', message: `${data.pc5ConnectionIssues} PC5 connection issues` })
        }
        if (data.safetyMessageLoss > 0) {
          alerts.push({ type: 'warning', message: `${data.safetyMessageLoss} safety message losses` })
        }
        break
      case 'ims':
        if (data.sipSessionFailures > 0) {
          alerts.push({ type: 'error', message: `${data.sipSessionFailures} SIP session failures` })
        }
        if (data.rtpPacketLoss > 5) {
          alerts.push({ type: 'warning', message: `High RTP packet loss: ${data.rtpPacketLoss}%` })
        }
        break
      case 'security':
        if (data.authenticationFailures > 0) {
          alerts.push({ type: 'error', message: `${data.authenticationFailures} authentication failures` })
        }
        if (data.securityViolations > 0) {
          alerts.push({ type: 'error', message: `${data.securityViolations} security violations detected` })
        }
        break
    }
    
    return alerts
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  const protocolLayers = getProtocolLayers(protocolType)
  const protocolMetrics = getProtocolSpecificMetrics(protocolType, executionResults?.protocolData || {})
  const protocolAlerts = getProtocolSpecificAlerts(protocolType, executionResults?.protocolData || {})

  return (
    <div className="space-y-6">
      {/* Protocol Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getProtocolIcon(protocolType)}
              <div>
                <h1 className="text-2xl font-bold capitalize">
                  {protocolType.toUpperCase()} Protocol Analysis
                </h1>
                <p className="text-base-content/70">
                  Advanced analysis for {protocolType.toUpperCase()} specific protocols and procedures
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-outline btn-sm">
                  <Filter size={16} />
                  View
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a onClick={() => setAnalysisView('overview')}>Overview</a></li>
                  <li><a onClick={() => setAnalysisView('detailed')}>Detailed Analysis</a></li>
                  <li><a onClick={() => setAnalysisView('correlation')}>Correlation View</a></li>
                </ul>
              </div>
              
              <button className="btn btn-outline btn-sm">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Protocol Alerts */}
      {protocolAlerts.length > 0 && (
        <div className="space-y-2">
          {protocolAlerts.map((alert, index) => (
            <div key={index} className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-warning'} shadow-lg`}>
              <AlertTriangle className="w-5 h-5" />
              <span>{alert.message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Protocol Metrics */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Protocol-Specific Metrics</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(protocolMetrics).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-base-200 rounded-lg">
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-sm text-base-content/70">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Views */}
      {analysisView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Protocol Flow Overview */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">Protocol Flow Overview</h3>
              
              <div className="space-y-3">
                {executionResults?.protocolFlow?.map((step: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{step.name}</div>
                      <div className="text-sm text-base-content/70">{step.description}</div>
                    </div>
                    <div className={`badge ${
                      step.status === 'success' ? 'badge-success' : 
                      step.status === 'failed' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {step.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Layer Analysis */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h3 className="text-lg font-bold mb-4">Layer Analysis</h3>
              
              <div className="space-y-3">
                {protocolLayers.map((layer) => {
                  const layerData = executionResults?.layerAnalysis?.[layer]
                  return (
                    <div key={layer} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Layers className="w-5 h-5 text-primary" />
                        <span className="font-medium">{layer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-base-content/70">
                          {layerData?.messageCount || 0} messages
                        </span>
                        <div className={`badge ${
                          layerData?.status === 'success' ? 'badge-success' : 
                          layerData?.status === 'failed' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {layerData?.status || 'unknown'}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {analysisView === 'detailed' && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="text-lg font-bold mb-4">Detailed Protocol Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-1">
                <h4 className="font-semibold mb-3">Protocol Messages</h4>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {executionResults?.messages?.filter((msg: any) => 
                    selectedLayer === 'all' || msg.layer === selectedLayer
                  ).map((message: any, index: number) => (
                    <div
                      key={message.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedMessage?.id === message.id 
                          ? 'bg-primary text-primary-content' 
                          : 'bg-base-200 hover:bg-base-300'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{message.messageType}</span>
                        <span className="text-xs opacity-70">#{index + 1}</span>
                      </div>
                      <div className="text-xs opacity-70 mb-1">
                        {message.layer} • {message.direction}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`badge badge-xs ${
                          message.verdict === 'PASS' ? 'badge-success' : 
                          message.verdict === 'FAIL' ? 'badge-error' : 'badge-warning'
                        }`}>
                          {message.verdict}
                        </span>
                        <span className="text-xs opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Details */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold mb-3">Message Analysis</h4>
                
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold mb-2">Message Information</h5>
                        <div className="space-y-1 text-sm">
                          <div><strong>Type:</strong> {selectedMessage.messageType}</div>
                          <div><strong>Layer:</strong> {selectedMessage.layer}</div>
                          <div><strong>Direction:</strong> {selectedMessage.direction}</div>
                          <div><strong>Timestamp:</strong> {new Date(selectedMessage.timestamp).toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold mb-2">Protocol-Specific Data</h5>
                        <div className="space-y-1 text-sm">
                          {selectedMessage.protocolSpecific && Object.entries(selectedMessage.protocolSpecific).map(([key, value]) => (
                            <div key={key}><strong>{key}:</strong> {String(value)}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2">Parsed Message</h5>
                      <pre className="bg-base-200 p-3 rounded text-xs overflow-x-auto">
                        {JSON.stringify(selectedMessage.parsedMessage, null, 2)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-base-content/50">
                    <div className="text-center">
                      <Eye className="w-12 h-12 mx-auto mb-2" />
                      <p>Select a message to view detailed analysis</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {analysisView === 'correlation' && (
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="text-lg font-bold mb-4">Correlation Analysis</h3>
            
            <div className="space-y-4">
              {executionResults?.correlations?.map((correlation: any, index: number) => (
                <div key={index} className="p-4 bg-base-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{correlation.name}</h4>
                    <div className={`badge ${
                      correlation.status === 'success' ? 'badge-success' : 
                      correlation.status === 'failed' ? 'badge-error' : 'badge-warning'
                    }`}>
                      {correlation.status}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">Correlation Keys</h5>
                      <div className="space-y-1 text-sm">
                        {Object.entries(correlation.keys).map(([key, value]) => (
                          <div key={key}><strong>{key}:</strong> {String(value)}</div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2">Related Messages</h5>
                      <div className="space-y-1 text-sm">
                        {correlation.relatedMessages.map((msgId: string) => (
                          <div key={msgId} className="flex items-center gap-2">
                            <span>Message {msgId}</span>
                            <button className="btn btn-ghost btn-xs">View</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdvancedProtocolAnalyzer