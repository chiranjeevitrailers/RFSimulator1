# 5GLabX Cloud - Professional 4G/5G Protocol Log Analysis Architecture

*Version 1.0 – 2025-01-13*

## 🎯 Core Objective

Transform 5GLabX into a **professional web-based 4G/5G protocol log analysis platform** that provides:

1. **Realistic 3GPP Message Flows** - UE ↔ eNodeB/gNodeB ↔ Core Network ↔ IMS
2. **1000+ 3GPP Test Cases** - Functional, mobility, performance, security
3. **Professional Log Analysis** - Enhanced log viewers, protocol layers, correlation
4. **Standard Tool Experience** - RNTI, PLMN, TAC, realistic parameters

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                   5GLabX Cloud Platform                        │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React)                                               │
│  ├── Test Suite Browser (Sidebar)                              │
│  ├── Test Case Configuration                                    │
│  ├── Log Analysis Dashboard                                     │
│  ├── Enhanced Log Viewer                                        │
│  ├── Protocol Layer Views                                       │
│  └── Real-time Message Flow                                     │
├─────────────────────────────────────────────────────────────────┤
│  Backend Services                                               │
│  ├── Test Case Engine (Supabase)                               │
│  ├── Protocol Analysis Engine                                   │
│  ├── Message Flow Generator                                     │
│  └── Log Processing Engine                                      │
├─────────────────────────────────────────────────────────────────┤
│  3GPP Test Case Library (1000+ Cases)                          │
│  ├── Functional Tests (Attach, Detach, Handover)               │
│  ├── Mobility Tests (Intra-RAT, Inter-RAT, Inter-System)       │
│  ├── Performance Tests (Throughput, Latency, Capacity)         │
│  ├── Security Tests (Authentication, Encryption, Integrity)    │
│  ├── IMS Tests (Registration, Call Setup, Media)               │
│  ├── O-RAN Tests (F1, E1, E2 Interfaces)                       │
│  ├── NB-IoT Tests (NPRACH, NPDCCH, NPDSCH)                     │
│  ├── V2X Tests (PC5 Sidelink, Uu Interface)                    │
│  └── NTN Tests (Satellite Access, Handover, Timing)            │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Test Suite Architecture

### 1. Test Suite Browser (Sidebar Component)

```typescript
// Test Suite Browser Component
export const TestSuiteBrowser: React.FC = () => {
  const [selectedSuite, setSelectedSuite] = useState<string | null>(null);
  const [selectedTestCase, setSelectedTestCase] = useState<string | null>(null);
  
  return (
    <div className="w-80 bg-base-200 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">3GPP Test Suites</h2>
        
        {/* Suite Categories */}
        <div className="space-y-2">
          {TEST_SUITE_CATEGORIES.map(category => (
            <TestSuiteCategory
              key={category.id}
              category={category}
              selectedSuite={selectedSuite}
              onSelectSuite={setSelectedSuite}
              selectedTestCase={selectedTestCase}
              onSelectTestCase={setSelectedTestCase}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Test Suite Categories
const TEST_SUITE_CATEGORIES = [
  {
    id: 'functional',
    name: 'Functional Tests',
    icon: '⚙️',
    description: 'Basic UE procedures and core functionality',
    testCases: [
      { id: 'attach-basic', name: 'Basic Attach Procedure', spec: 'TS 23.401 5.3.2.1' },
      { id: 'detach-basic', name: 'Basic Detach Procedure', spec: 'TS 23.401 5.3.3.1' },
      { id: 'paging-basic', name: 'Paging Procedure', spec: 'TS 23.401 5.3.4.1' },
      { id: 'handover-intra', name: 'Intra-eNB Handover', spec: 'TS 36.331 5.4.3.1' }
    ]
  },
  {
    id: 'mobility',
    name: 'Mobility Tests',
    icon: '🔄',
    description: 'Handover and mobility procedures',
    testCases: [
      { id: 'handover-inter', name: 'Inter-eNB Handover', spec: 'TS 36.331 5.4.3.2' },
      { id: 'handover-inter-rat', name: 'Inter-RAT Handover', spec: 'TS 23.401 5.4.3.3' },
      { id: 'handover-inter-system', name: 'Inter-System Handover', spec: 'TS 23.401 5.4.3.4' }
    ]
  },
  {
    id: 'ims',
    name: 'IMS Tests',
    icon: '📞',
    description: 'IMS registration and call procedures',
    testCases: [
      { id: 'ims-registration', name: 'IMS Registration', spec: 'TS 24.229 5.1.1' },
      { id: 'ims-call-setup', name: 'IMS Call Setup', spec: 'TS 24.229 5.2.1' },
      { id: 'ims-media-negotiation', name: 'Media Negotiation', spec: 'TS 24.229 5.3.1' }
    ]
  },
  {
    id: 'oran',
    name: 'O-RAN Tests',
    icon: '🌐',
    description: 'O-RAN interface procedures',
    testCases: [
      { id: 'f1-setup', name: 'F1 Setup Procedure', spec: 'O-RAN.WG4.CUS.0-v01.00' },
      { id: 'e1-setup', name: 'E1 Setup Procedure', spec: 'O-RAN.WG4.CUS.0-v01.00' },
      { id: 'e2-setup', name: 'E2 Setup Procedure', spec: 'O-RAN.WG4.CUS.0-v01.00' }
    ]
  },
  {
    id: 'nbiot',
    name: 'NB-IoT Tests',
    icon: '📡',
    description: 'NB-IoT specific procedures',
    testCases: [
      { id: 'nprach-procedure', name: 'NPRACH Procedure', spec: 'TS 36.331 5.3.3.1' },
      { id: 'npdcch-procedure', name: 'NPDCCH Procedure', spec: 'TS 36.331 5.3.3.2' },
      { id: 'npdsch-procedure', name: 'NPDSCH Procedure', spec: 'TS 36.331 5.3.3.3' }
    ]
  },
  {
    id: 'v2x',
    name: 'V2X Tests',
    icon: '🚗',
    description: 'Vehicle-to-Everything procedures',
    testCases: [
      { id: 'pc5-sidelink', name: 'PC5 Sidelink Communication', spec: 'TS 23.285 5.1.1' },
      { id: 'v2x-uu-interface', name: 'V2X Uu Interface', spec: 'TS 23.285 5.1.2' },
      { id: 'safety-messages', name: 'Safety Message Exchange', spec: 'TS 23.285 5.2.1' }
    ]
  },
  {
    id: 'ntn',
    name: 'NTN Tests',
    icon: '🛰️',
    description: 'Non-Terrestrial Network procedures',
    testCases: [
      { id: 'satellite-access', name: 'Satellite Access Procedure', spec: 'TS 38.821 5.1.1' },
      { id: 'ntn-handover', name: 'NTN Handover Procedure', spec: 'TS 38.821 5.2.1' },
      { id: 'timing-sync', name: 'Timing Synchronization', spec: 'TS 38.821 5.3.1' }
    ]
  }
];
```

### 2. Test Case Configuration

```typescript
// Test Case Configuration Component
export const TestCaseConfiguration: React.FC<{ testCaseId: string }> = ({ testCaseId }) => {
  const { data: testCase } = useQuery(['test-case', testCaseId], () => 
    fetchTestCase(testCaseId)
  );
  
  const [parameters, setParameters] = useState<TestCaseParameters>({});
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{testCase?.title}</h2>
      <p className="text-gray-600 mb-6">{testCase?.description}</p>
      
      {/* 3GPP Reference */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800">3GPP Reference</h3>
        <p className="text-blue-700">{testCase?.threegpp_ref}</p>
      </div>
      
      {/* Parameter Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">UE Parameters</h3>
          <ParameterForm
            parameters={testCase?.ue_parameters || {}}
            onChange={(params) => setParameters({ ...parameters, ue: params })}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Network Parameters</h3>
          <ParameterForm
            parameters={testCase?.network_parameters || {}}
            onChange={(params) => setParameters({ ...parameters, network: params })}
          />
        </div>
      </div>
      
      {/* Execution Controls */}
      <div className="mt-8 flex gap-4">
        <button
          className="btn btn-primary"
          onClick={() => executeTestCase(testCaseId, parameters)}
        >
          Execute Test Case
        </button>
        
        <button
          className="btn btn-secondary"
          onClick={() => previewTestCase(testCaseId, parameters)}
        >
          Preview Message Flow
        </button>
      </div>
    </div>
  );
};

// Parameter Form Component
const ParameterForm: React.FC<{
  parameters: Record<string, any>;
  onChange: (params: Record<string, any>) => void;
}> = ({ parameters, onChange }) => {
  return (
    <div className="space-y-4">
      {Object.entries(parameters).map(([key, param]) => (
        <div key={key} className="form-control">
          <label className="label">
            <span className="label-text">{param.label}</span>
            <span className="label-text-alt text-xs">{param.unit || ''}</span>
          </label>
          
          {param.type === 'select' ? (
            <select
              className="select select-bordered"
              value={param.value}
              onChange={(e) => onChange({ ...parameters, [key]: { ...param, value: e.target.value } })}
            >
              {param.options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={param.type}
              className="input input-bordered"
              value={param.value}
              onChange={(e) => onChange({ ...parameters, [key]: { ...param, value: e.target.value } })}
              placeholder={param.placeholder}
            />
          )}
          
          {param.description && (
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500">
                {param.description}
              </span>
            </label>
          )}
        </div>
      ))}
    </div>
  );
};
```

## 🔄 Message Flow Architecture

### 1. Realistic 3GPP Message Flow

```typescript
// Message Flow Generator
export class MessageFlowGenerator {
  private ueContext: UEContext;
  private networkContext: NetworkContext;
  
  constructor() {
    this.ueContext = new UEContext();
    this.networkContext = new NetworkContext();
  }
  
  generateAttachFlow(parameters: AttachParameters): MessageFlow {
    const flow: MessageFlow = {
      id: generateId(),
      name: 'Basic Attach Procedure',
      steps: []
    };
    
    // Step 1: RRC Connection Request
    flow.steps.push({
      id: generateId(),
      order: 1,
      direction: 'UE→eNB',
      layer: 'RRC',
      messageType: 'RRCConnectionRequest',
      timestamp: Date.now(),
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'eNB', id: this.networkContext.enbId },
      ies: {
        establishmentCause: 'mo-Signalling',
        ueIdentity: {
          sTMSI: this.ueContext.sTMSI
        }
      },
      rawMessage: this.generateRRCConnectionRequest()
    });
    
    // Step 2: RRC Connection Setup
    flow.steps.push({
      id: generateId(),
      order: 2,
      direction: 'eNB→UE',
      layer: 'RRC',
      messageType: 'RRCConnectionSetup',
      timestamp: Date.now() + 10,
      source: { type: 'eNB', id: this.networkContext.enbId },
      destination: { type: 'UE', id: this.ueContext.ueId },
      ies: {
        rrcTransactionIdentifier: 0,
        criticalExtensions: {
          rrcConnectionSetupR8: {
            radioResourceConfigDedicated: {
              srbToAddModList: [{
                srbIdentity: 1,
                rlcConfig: {
                  ulRLCConfig: {
                    am: {
                      ulAMRLC: {
                        maxRetxThreshold: 't32',
                        pollPDU: 'p4',
                        pollByte: 'kB25',
                        tPollRetransmit: 'ms45'
                      }
                    }
                  }
                }
              }]
            }
          }
        }
      },
      rawMessage: this.generateRRCConnectionSetup()
    });
    
    // Step 3: RRC Connection Setup Complete
    flow.steps.push({
      id: generateId(),
      order: 3,
      direction: 'UE→eNB',
      layer: 'RRC',
      messageType: 'RRCConnectionSetupComplete',
      timestamp: Date.now() + 20,
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'eNB', id: this.networkContext.enbId },
      ies: {
        rrcTransactionIdentifier: 0,
        criticalExtensions: {
          rrcConnectionSetupCompleteR8: {
            selectedPLMNIdentity: 1,
            dedicatedInfoNAS: this.generateNASAttachRequest()
          }
        }
      },
      rawMessage: this.generateRRCConnectionSetupComplete()
    });
    
    // Step 4: Initial UE Message (S1AP)
    flow.steps.push({
      id: generateId(),
      order: 4,
      direction: 'eNB→MME',
      layer: 'S1AP',
      messageType: 'InitialUEMessage',
      timestamp: Date.now() + 30,
      source: { type: 'eNB', id: this.networkContext.enbId },
      destination: { type: 'MME', id: this.networkContext.mmeId },
      ies: {
        eNBUEID: this.networkContext.enbUeId,
        nasPDU: this.generateNASAttachRequest(),
        tAI: {
          pLMNidentity: this.networkContext.plmnId,
          tAC: this.networkContext.tac
        },
        rRCestablishmentCause: 'mo-Signalling'
      },
      rawMessage: this.generateInitialUEMessage()
    });
    
    // Continue with remaining steps...
    return flow;
  }
  
  private generateRRCConnectionRequest(): Buffer {
    // Generate realistic RRC Connection Request message
    const message = {
      messageType: 'RRCConnectionRequest',
      criticalExtensions: {
        rrcConnectionRequest: {
          ueIdentity: {
            sTMSI: this.ueContext.sTMSI
          },
          establishmentCause: 'mo-Signalling'
        }
      }
    };
    
    return this.encodeRRC(message);
  }
  
  private generateNASAttachRequest(): Buffer {
    // Generate realistic NAS Attach Request message
    const message = {
      messageType: 'AttachRequest',
      securityHeaderType: 'Plain',
      protocolDiscriminator: 'EPSMobilityManagement',
      messageType: 'AttachRequest',
      nasKeySetIdentifier: 0,
      epsAttachType: 'EPSAttach',
      epsMobileIdentity: {
        type: 'IMSI',
        imsi: this.ueContext.imsi
      },
      ueNetworkCapability: {
        eea0: true,
        eea1: true,
        eea2: true,
        eea3: true,
        eia0: true,
        eia1: true,
        eia2: true,
        eia3: true
      },
      esmMessageContainer: this.generateESMAttachRequest()
    };
    
    return this.encodeNAS(message);
  }
}

// Context Classes for Realistic Parameters
export class UEContext {
  ueId: string = generateUEId();
  imsi: string = generateIMSI();
  sTMSI: string = generateSTMSI();
  rnti: number = generateRNTI();
  plmnId: string = '00101'; // Test PLMN
  tac: string = '0001';
  
  constructor() {
    this.ueId = generateUEId();
    this.imsi = generateIMSI();
    this.sTMSI = generateSTMSI();
    this.rnti = generateRNTI();
  }
}

export class NetworkContext {
  enbId: string = generateENBId();
  mmeId: string = generateMMEId();
  enbUeId: number = generateENBUEId();
  plmnId: string = '00101'; // Test PLMN
  tac: string = '0001';
  cellId: string = generateCellId();
  
  constructor() {
    this.enbId = generateENBId();
    this.mmeId = generateMMEId();
    this.enbUeId = generateENBUEId();
    this.cellId = generateCellId();
  }
}
```

### 2. Realistic Parameter Generation

```typescript
// Realistic Parameter Generators
export class ParameterGenerator {
  // Generate realistic IMSI
  static generateIMSI(): string {
    const mcc = '001'; // Test MCC
    const mnc = '01';  // Test MNC
    const msin = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return mcc + mnc + msin;
  }
  
  // Generate realistic S-TMSI
  static generateSTMSI(): string {
    const mmeCode = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const mTMSI = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    return mmeCode + mTMSI;
  }
  
  // Generate realistic RNTI
  static generateRNTI(): number {
    // C-RNTI range: 0x003D to 0xFFF3
    return Math.floor(Math.random() * (0xFFF3 - 0x003D + 1)) + 0x003D;
  }
  
  // Generate realistic PLMN ID
  static generatePLMNId(): string {
    const mcc = '001'; // Test MCC
    const mnc = '01';  // Test MNC
    return mcc + mnc;
  }
  
  // Generate realistic TAC
  static generateTAC(): string {
    return Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
  }
  
  // Generate realistic Cell ID
  static generateCellId(): string {
    return Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  }
  
  // Generate realistic eNB ID
  static generateENBId(): string {
    return 'eNB-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }
  
  // Generate realistic MME ID
  static generateMMEId(): string {
    return 'MME-' + Math.floor(Math.random() * 100).toString().padStart(2, '0');
  }
}
```

## 📊 Professional Log Analysis Engine

### 1. Enhanced Log Viewer

```typescript
// Enhanced Log Viewer Component
export const EnhancedLogViewer: React.FC<{ executionId: string }> = ({ executionId }) => {
  const [selectedMessage, setSelectedMessage] = useState<ProtocolMessage | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'layers' | 'correlation'>('timeline');
  const [filters, setFilters] = useState<LogFilters>({});
  
  const { data: messages } = useQuery(['execution', executionId], () => 
    fetchExecutionMessages(executionId)
  );
  
  return (
    <div className="flex h-full">
      {/* Message List Panel */}
      <div className="w-1/3 border-r bg-base-100">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Protocol Messages</h3>
          <div className="flex gap-2 mt-2">
            <button
              className={`btn btn-sm ${viewMode === 'timeline' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('timeline')}
            >
              Timeline
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'layers' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('layers')}
            >
              Layers
            </button>
            <button
              className={`btn btn-sm ${viewMode === 'correlation' ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode('correlation')}
            >
              Correlation
            </button>
          </div>
        </div>
        
        <div className="h-full overflow-y-auto">
          {messages?.map((message) => (
            <MessageRow
              key={message.id}
              message={message}
              onClick={() => setSelectedMessage(message)}
              selected={selectedMessage?.id === message.id}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
      
      {/* Message Details Panel */}
      <div className="w-2/3 bg-base-100">
        {selectedMessage ? (
          <MessageDetailsPanel message={selectedMessage} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Message Row Component
const MessageRow: React.FC<{
  message: ProtocolMessage;
  onClick: () => void;
  selected: boolean;
  viewMode: string;
}> = ({ message, onClick, selected, viewMode }) => {
  const getLayerColor = (layer: string) => {
    const colors = {
      'RRC': 'bg-green-100 text-green-800',
      'NAS': 'bg-blue-100 text-blue-800',
      'S1AP': 'bg-orange-100 text-orange-800',
      'NGAP': 'bg-purple-100 text-purple-800',
      'SIP': 'bg-pink-100 text-pink-800',
      'Diameter': 'bg-yellow-100 text-yellow-800'
    };
    return colors[layer] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div
      className={`p-3 border-b cursor-pointer hover:bg-base-200 ${
        selected ? 'bg-primary text-primary-content' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`badge badge-sm ${getLayerColor(message.layer)}`}>
          {message.layer}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      
      <div className="text-sm font-medium mb-1">
        {message.messageType}
      </div>
      
      <div className="text-xs text-gray-600">
        {message.direction} • {message.source.id} → {message.destination.id}
      </div>
      
      {viewMode === 'correlation' && (
        <div className="mt-2 text-xs">
          <span className="badge badge-outline badge-xs">
            RNTI: {message.ies.rnti || 'N/A'}
          </span>
          <span className="badge badge-outline badge-xs ml-1">
            PLMN: {message.ies.plmnId || 'N/A'}
          </span>
        </div>
      )}
    </div>
  );
};

// Message Details Panel
const MessageDetailsPanel: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ies' | 'raw' | 'hex'>('overview');
  
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-base-200">
        <h3 className="text-lg font-semibold">{message.messageType}</h3>
        <p className="text-sm text-gray-600">
          {message.layer} • {message.direction} • {new Date(message.timestamp).toLocaleString()}
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'ies', label: 'Information Elements' },
          { id: 'raw', label: 'Raw Message' },
          { id: 'hex', label: 'Hex Dump' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'overview' && <OverviewTab message={message} />}
        {activeTab === 'ies' && <IEsTab message={message} />}
        {activeTab === 'raw' && <RawTab message={message} />}
        {activeTab === 'hex' && <HexTab message={message} />}
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Source</h4>
          <p className="text-sm">{message.source.type}: {message.source.id}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Destination</h4>
          <p className="text-sm">{message.destination.type}: {message.destination.id}</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Key Parameters</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(message.ies).slice(0, 6).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{key}:</span>
              <span className="font-mono">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Information Elements Tab
const IEsTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  return (
    <div className="space-y-2">
      {Object.entries(message.ies).map(([key, value]) => (
        <div key={key} className="border rounded p-3">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold">{key}</h4>
            <span className="text-xs text-gray-500">
              {typeof value === 'object' ? 'Object' : typeof value}
            </span>
          </div>
          
          {typeof value === 'object' ? (
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(value, null, 2)}
            </pre>
          ) : (
            <p className="text-sm font-mono">{String(value)}</p>
          )}
        </div>
      ))}
    </div>
  );
};
```

### 2. Protocol Layer Views

```typescript
// Protocol Layer Views
export const ProtocolLayerViews: React.FC<{ executionId: string }> = ({ executionId }) => {
  const [activeLayer, setActiveLayer] = useState<string>('all');
  
  const { data: messages } = useQuery(['execution', executionId], () => 
    fetchExecutionMessages(executionId)
  );
  
  const filteredMessages = messages?.filter(msg => 
    activeLayer === 'all' || msg.layer === activeLayer
  );
  
  const layers = ['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'Diameter'];
  
  return (
    <div className="h-full flex flex-col">
      {/* Layer Tabs */}
      <div className="flex border-b bg-base-200">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeLayer === 'all' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
          }`}
          onClick={() => setActiveLayer('all')}
        >
          All Layers
        </button>
        {layers.map(layer => (
          <button
            key={layer}
            className={`px-4 py-2 text-sm font-medium ${
              activeLayer === layer ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
            }`}
            onClick={() => setActiveLayer(layer)}
          >
            {layer}
          </button>
        ))}
      </div>
      
      {/* Layer Content */}
      <div className="flex-1 overflow-y-auto">
        {filteredMessages?.map((message) => (
          <LayerMessageCard key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};

// Layer Message Card
const LayerMessageCard: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  const getLayerIcon = (layer: string) => {
    const icons = {
      'RRC': '📡',
      'NAS': '🔐',
      'S1AP': '🌐',
      'NGAP': '🚀',
      'SIP': '📞',
      'Diameter': '🔒'
    };
    return icons[layer] || '📋';
  };
  
  return (
    <div className="p-4 border-b hover:bg-base-100">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{getLayerIcon(message.layer)}</span>
        <div className="flex-1">
          <h4 className="font-semibold">{message.messageType}</h4>
          <p className="text-sm text-gray-600">
            {message.direction} • {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <span className="badge badge-outline">{message.layer}</span>
      </div>
      
      <div className="text-sm text-gray-700">
        <p><strong>Source:</strong> {message.source.type} {message.source.id}</p>
        <p><strong>Destination:</strong> {message.destination.type} {message.destination.id}</p>
      </div>
    </div>
  );
};
```

## 🗄️ Database Schema for Test Cases

```sql
-- Test Suites Table
CREATE TABLE test_suites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  suite_type TEXT NOT NULL CHECK (suite_type IN (
    'functional', 'mobility', 'performance', 'security', 
    'ims', 'qos', 'oran', 'nbiot', 'ntn', 'v2x', 
    'interrat', 'negative', 'regression'
  )),
  description TEXT,
  threegpp_release TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test Cases Table
CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id UUID REFERENCES test_suites(id),
  title TEXT NOT NULL,
  threegpp_ref TEXT,
  description TEXT,
  default_parameters JSONB,
  ue_parameters JSONB,
  network_parameters JSONB,
  expected_duration INTEGER, -- in seconds
  complexity TEXT CHECK (complexity IN ('basic', 'intermediate', 'advanced')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Test Case Steps Table
CREATE TABLE test_case_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES test_cases(id),
  step_order INTEGER NOT NULL,
  layer TEXT NOT NULL CHECK (layer IN (
    'RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'Diameter', 
    'GTP-U', 'F1AP', 'E1AP', 'E2AP', 'PC5', 'Uu'
  )),
  direction TEXT NOT NULL CHECK (direction IN (
    'UE→eNB', 'eNB→UE', 'eNB→MME', 'MME→eNB',
    'UE→gNB', 'gNB→UE', 'gNB→AMF', 'AMF→gNB',
    'UE→Core', 'Core→UE', 'Core→IMS', 'IMS→Core'
  )),
  message_type TEXT NOT NULL,
  message_json JSONB NOT NULL,
  expected_params JSONB,
  correlation_keys JSONB, -- RNTI, PLMN, TAC, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Executions Table
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES test_cases(id),
  run_by UUID REFERENCES auth.users(id),
  status TEXT CHECK (status IN ('QUEUED', 'RUNNING', 'PASSED', 'FAILED', 'CANCELLED')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  fault_injected BOOLEAN DEFAULT false,
  summary JSONB,
  parameters JSONB, -- Runtime parameters
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Execution Steps Table
CREATE TABLE execution_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  step_order INTEGER,
  layer TEXT,
  direction TEXT,
  message_type TEXT,
  raw_log TEXT,
  parsed_message JSONB,
  verdict TEXT CHECK (verdict IN ('PASS', 'FAIL', 'INCONCLUSIVE')),
  fault_type TEXT,
  correlation_data JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security Policies
CREATE POLICY "Users can view own executions" ON executions
  FOR SELECT USING (auth.uid() = run_by);

CREATE POLICY "Users can create own executions" ON executions
  FOR INSERT WITH CHECK (auth.uid() = run_by);

CREATE POLICY "Admins can view all executions" ON executions
  FOR ALL USING (auth.role() = 'service_role');
```

## 🚀 Implementation Roadmap

### Phase 1: Core Test Suite Framework (Week 1-2)
1. **Test Suite Browser** - Sidebar component with 3GPP categories
2. **Test Case Configuration** - Parameter setup and validation
3. **Database Schema** - Supabase tables and RLS policies
4. **Basic Message Flow** - Simple attach procedure

### Phase 2: Protocol Analysis Engine (Week 3-4)
1. **Message Flow Generator** - Realistic 3GPP message generation
2. **Parameter Generator** - Realistic UE and network parameters
3. **Log Processing Engine** - Message parsing and correlation
4. **Enhanced Log Viewer** - Professional log analysis interface

### Phase 3: Advanced Features (Week 5-6)
1. **Protocol Layer Views** - Layer-specific analysis
2. **Correlation Engine** - RNTI, PLMN, TAC correlation
3. **Fault Injection** - Controlled error simulation
4. **Export Features** - PDF reports, call flow diagrams

### Phase 4: Test Case Library (Week 7-8)
1. **1000+ Test Cases** - Comprehensive 3GPP coverage
2. **Realistic Parameters** - Industry-standard values
3. **Message Validation** - 3GPP compliance checking
4. **Performance Optimization** - Fast execution and rendering

This architecture provides a professional-grade 4G/5G protocol log analysis platform that feels like a standard industry tool while being accessible through a web browser. The focus is on realistic 3GPP message flows, professional log analysis, and comprehensive test case coverage.