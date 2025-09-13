// 5GLabX Cloud - Enhanced Log Viewer Component
// Professional-grade log analysis with realistic 3GPP message flows

import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProtocolMessage, MessageFlow } from '../../lib/protocol-models';

interface EnhancedLogViewerProps {
  executionId: string;
  onMessageSelect?: (message: ProtocolMessage) => void;
}

interface LogFilters {
  layer?: string;
  direction?: string;
  messageType?: string;
  timeRange?: { start: number; end: number };
  correlationKeys?: Record<string, any>;
}

interface ViewMode {
  type: 'timeline' | 'layers' | 'correlation' | 'callflow';
  showHex: boolean;
  showRaw: boolean;
  showIEs: boolean;
}

export const EnhancedLogViewer: React.FC<EnhancedLogViewerProps> = ({
  executionId,
  onMessageSelect
}) => {
  const [selectedMessage, setSelectedMessage] = useState<ProtocolMessage | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>({
    type: 'timeline',
    showHex: false,
    showRaw: true,
    showIEs: true
  });
  const [filters, setFilters] = useState<LogFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  // Fetch execution messages
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['execution', executionId, 'messages'],
    queryFn: () => fetchExecutionMessages(executionId),
    enabled: !!executionId
  });

  // Filter and search messages
  const filteredMessages = useMemo(() => {
    if (!messages) return [];

    return messages.filter((message: ProtocolMessage) => {
      // Layer filter
      if (filters.layer && message.layer !== filters.layer) return false;
      
      // Direction filter
      if (filters.direction && !message.direction.includes(filters.direction)) return false;
      
      // Message type filter
      if (filters.messageType && message.messageType !== filters.messageType) return false;
      
      // Time range filter
      if (filters.timeRange) {
        if (message.timestamp < filters.timeRange.start || message.timestamp > filters.timeRange.end) {
          return false;
        }
      }
      
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesMessageType = message.messageType.toLowerCase().includes(searchLower);
        const matchesLayer = message.layer.toLowerCase().includes(searchLower);
        const matchesDirection = message.direction.toLowerCase().includes(searchLower);
        const matchesIEs = JSON.stringify(message.ies).toLowerCase().includes(searchLower);
        
        if (!matchesMessageType && !matchesLayer && !matchesDirection && !matchesIEs) {
          return false;
        }
      }
      
      return true;
    });
  }, [messages, filters, searchTerm]);

  // Group messages by correlation keys
  const groupedMessages = useMemo(() => {
    if (viewMode.type !== 'correlation') return { 'All Messages': filteredMessages };

    const groups: Record<string, ProtocolMessage[]> = {};
    
    filteredMessages.forEach((message: ProtocolMessage) => {
      const rnti = message.correlationKeys?.rnti || 'Unknown';
      const plmnId = message.correlationKeys?.plmnId || 'Unknown';
      const key = `RNTI: ${rnti}, PLMN: ${plmnId}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(message);
    });
    
    return groups;
  }, [filteredMessages, viewMode.type]);

  // Get layer color
  const getLayerColor = (layer: string) => {
    const colors = {
      'RRC': 'bg-green-100 text-green-800 border-green-200',
      'NAS': 'bg-blue-100 text-blue-800 border-blue-200',
      'S1AP': 'bg-orange-100 text-orange-800 border-orange-200',
      'NGAP': 'bg-purple-100 text-purple-800 border-purple-200',
      'SIP': 'bg-pink-100 text-pink-800 border-pink-200',
      'Diameter': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'F1AP': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'E1AP': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'E2AP': 'bg-teal-100 text-teal-800 border-teal-200',
      'GTP-U': 'bg-red-100 text-red-800 border-red-200',
      'PC5': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Uu': 'bg-violet-100 text-violet-800 border-violet-200'
    };
    return colors[layer as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Get layer icon
  const getLayerIcon = (layer: string) => {
    const icons = {
      'RRC': '📡',
      'NAS': '🔐',
      'S1AP': '🌐',
      'NGAP': '🚀',
      'SIP': '📞',
      'Diameter': '🔒',
      'F1AP': '🔗',
      'E1AP': '⚡',
      'E2AP': '🎯',
      'GTP-U': '📦',
      'PC5': '🚗',
      'Uu': '📶'
    };
    return icons[layer as keyof typeof icons] || '📋';
  };

  // Handle message selection
  const handleMessageSelect = (message: ProtocolMessage) => {
    setSelectedMessage(message);
    onMessageSelect?.(message);
  };

  // Toggle message expansion
  const toggleMessageExpansion = (messageId: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedMessages(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="alert alert-error">
          <span>Error loading messages: {error.message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-base-100">
      {/* Left Panel - Message List */}
      <div className="w-1/3 border-r border-base-300 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-base-300 bg-base-200">
          <h3 className="text-lg font-semibold mb-3">Protocol Messages</h3>
          
          {/* View Mode Tabs */}
          <div className="flex gap-1 mb-3">
            {[
              { id: 'timeline', label: 'Timeline', icon: '⏱️' },
              { id: 'layers', label: 'Layers', icon: '📚' },
              { id: 'correlation', label: 'Correlation', icon: '🔗' },
              { id: 'callflow', label: 'Call Flow', icon: '📞' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`btn btn-sm ${viewMode.type === tab.id ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => setViewMode(prev => ({ ...prev, type: tab.id as any }))}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search messages..."
              className="input input-sm input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Filters */}
        <div className="p-3 border-b border-base-300 bg-base-50">
          <div className="flex gap-2 flex-wrap">
            <select
              className="select select-sm select-bordered"
              value={filters.layer || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, layer: e.target.value || undefined }))}
            >
              <option value="">All Layers</option>
              <option value="RRC">RRC</option>
              <option value="NAS">NAS</option>
              <option value="S1AP">S1AP</option>
              <option value="NGAP">NGAP</option>
              <option value="SIP">SIP</option>
              <option value="Diameter">Diameter</option>
              <option value="F1AP">F1AP</option>
              <option value="E1AP">E1AP</option>
              <option value="E2AP">E2AP</option>
            </select>
            
            <select
              className="select select-sm select-bordered"
              value={filters.direction || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, direction: e.target.value || undefined }))}
            >
              <option value="">All Directions</option>
              <option value="UE→">UE→</option>
              <option value="→UE">→UE</option>
              <option value="eNB→">eNB→</option>
              <option value="→eNB">→eNB</option>
              <option value="gNB→">gNB→</option>
              <option value="→gNB">→gNB</option>
              <option value="MME→">MME→</option>
              <option value="→MME">→MME</option>
              <option value="AMF→">AMF→</option>
              <option value="→AMF">→AMF</option>
            </select>
            
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setFilters({})}
            >
              Clear
            </button>
          </div>
        </div>
        
        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(groupedMessages).map(([groupName, groupMessages]) => (
            <div key={groupName} className="mb-4">
              {viewMode.type === 'correlation' && (
                <div className="px-3 py-2 bg-base-200 text-sm font-medium text-base-content">
                  {groupName}
                </div>
              )}
              
              {groupMessages.map((message) => (
                <MessageRow
                  key={message.id}
                  message={message}
                  selected={selectedMessage?.id === message.id}
                  expanded={expandedMessages.has(message.id)}
                  viewMode={viewMode}
                  onSelect={() => handleMessageSelect(message)}
                  onToggleExpansion={() => toggleMessageExpansion(message.id)}
                  getLayerColor={getLayerColor}
                  getLayerIcon={getLayerIcon}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Panel - Message Details */}
      <div className="w-2/3 flex flex-col">
        {selectedMessage ? (
          <MessageDetailsPanel
            message={selectedMessage}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg text-base-content/70">Select a message to view details</p>
              <p className="text-sm text-base-content/50 mt-2">
                Choose a protocol message from the list to see its detailed information
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Message Row Component
interface MessageRowProps {
  message: ProtocolMessage;
  selected: boolean;
  expanded: boolean;
  viewMode: ViewMode;
  onSelect: () => void;
  onToggleExpansion: () => void;
  getLayerColor: (layer: string) => string;
  getLayerIcon: (layer: string) => string;
}

const MessageRow: React.FC<MessageRowProps> = ({
  message,
  selected,
  expanded,
  viewMode,
  onSelect,
  onToggleExpansion,
  getLayerColor,
  getLayerIcon
}) => {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  return (
    <div
      className={`border-b border-base-300 cursor-pointer hover:bg-base-200 transition-colors ${
        selected ? 'bg-primary text-primary-content' : 'bg-base-100'
      }`}
      onClick={onSelect}
    >
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={`badge badge-sm ${getLayerColor(message.layer)}`}>
              <span className="mr-1">{getLayerIcon(message.layer)}</span>
              {message.layer}
            </span>
            <span className="text-xs text-base-content/70">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          
          <button
            className="btn btn-ghost btn-xs"
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpansion();
            }}
          >
            {expanded ? '▼' : '▶'}
          </button>
        </div>
        
        {/* Message Type */}
        <div className="text-sm font-medium mb-1">
          {message.messageType}
        </div>
        
        {/* Direction and Source/Destination */}
        <div className="text-xs text-base-content/70 mb-2">
          {message.direction} • {message.source.id} → {message.destination.id}
        </div>
        
        {/* Correlation Keys */}
        {viewMode.type === 'correlation' && (
          <div className="flex gap-1 flex-wrap">
            {Object.entries(message.correlationKeys).slice(0, 3).map(([key, value]) => (
              <span key={key} className="badge badge-outline badge-xs">
                {key}: {String(value)}
              </span>
            ))}
          </div>
        )}
        
        {/* Expanded Content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-base-300">
            <div className="text-xs space-y-1">
              <div><strong>Order:</strong> {message.order}</div>
              <div><strong>Source:</strong> {message.source.type} {message.source.id}</div>
              <div><strong>Destination:</strong> {message.destination.type} {message.destination.id}</div>
              
              {Object.keys(message.correlationKeys).length > 0 && (
                <div>
                  <strong>Correlation Keys:</strong>
                  <div className="ml-2">
                    {Object.entries(message.correlationKeys).map(([key, value]) => (
                      <div key={key} className="text-xs">
                        {key}: {String(value)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Message Details Panel Component
interface MessageDetailsPanelProps {
  message: ProtocolMessage;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}

const MessageDetailsPanel: React.FC<MessageDetailsPanelProps> = ({
  message,
  viewMode,
  onViewModeChange
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ies' | 'raw' | 'hex'>('overview');

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-base-300 bg-base-200">
        <h3 className="text-lg font-semibold mb-2">{message.messageType}</h3>
        <div className="text-sm text-base-content/70 space-y-1">
          <div><strong>Layer:</strong> {message.layer}</div>
          <div><strong>Direction:</strong> {message.direction}</div>
          <div><strong>Timestamp:</strong> {formatTimestamp(message.timestamp)}</div>
          <div><strong>Order:</strong> {message.order}</div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-base-300">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'ies', label: 'Information Elements', icon: '📋' },
          { id: 'raw', label: 'Raw Message', icon: '📄' },
          { id: 'hex', label: 'Hex Dump', icon: '🔢' }
        ].map(tab => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'border-b-2 border-primary text-primary' 
                : 'text-base-content/70 hover:text-base-content'
            }`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <span>{tab.icon}</span>
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

// Tab Components
const OverviewTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  return (
    <div className="space-y-6">
      {/* Source and Destination */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h4 className="font-semibold mb-2">Source</h4>
            <p className="text-sm">{message.source.type}</p>
            <p className="text-sm font-mono">{message.source.id}</p>
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body p-4">
            <h4 className="font-semibold mb-2">Destination</h4>
            <p className="text-sm">{message.destination.type}</p>
            <p className="text-sm font-mono">{message.destination.id}</p>
          </div>
        </div>
      </div>
      
      {/* Key Parameters */}
      <div>
        <h4 className="font-semibold mb-3">Key Parameters</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(message.ies).slice(0, 8).map(([key, value]) => (
            <div key={key} className="flex justify-between p-2 bg-base-200 rounded">
              <span className="text-base-content/70">{key}:</span>
              <span className="font-mono text-right max-w-xs truncate">
                {typeof value === 'object' ? JSON.stringify(value) : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Correlation Keys */}
      {Object.keys(message.correlationKeys).length > 0 && (
        <div>
          <h4 className="font-semibold mb-3">Correlation Keys</h4>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(message.correlationKeys).map(([key, value]) => (
              <span key={key} className="badge badge-primary">
                {key}: {String(value)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const IEsTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  const renderIEValue = (value: any, depth: number = 0): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span className="text-base-content/50">null</span>;
    }
    
    if (typeof value === 'boolean') {
      return <span className="text-blue-600">{String(value)}</span>;
    }
    
    if (typeof value === 'number') {
      return <span className="text-green-600">{value}</span>;
    }
    
    if (typeof value === 'string') {
      return <span className="text-orange-600">"{value}"</span>;
    }
    
    if (Array.isArray(value)) {
      return (
        <div className="ml-4">
          {value.map((item, index) => (
            <div key={index} className="border-l-2 border-base-300 pl-2 mb-2">
              <span className="text-base-content/50">[{index}]</span>
              {renderIEValue(item, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    
    if (typeof value === 'object') {
      return (
        <div className="ml-4">
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="mb-2">
              <span className="font-medium text-purple-600">{key}:</span>
              {renderIEValue(val, depth + 1)}
            </div>
          ))}
        </div>
      );
    }
    
    return <span>{String(value)}</span>;
  };

  return (
    <div className="space-y-3">
      {Object.entries(message.ies).map(([key, value]) => (
        <div key={key} className="border border-base-300 rounded-lg p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg">{key}</h4>
            <span className="text-xs text-base-content/50 bg-base-200 px-2 py-1 rounded">
              {typeof value === 'object' ? 'Object' : typeof value}
            </span>
          </div>
          
          <div className="text-sm">
            {renderIEValue(value)}
          </div>
        </div>
      ))}
    </div>
  );
};

const RawTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Raw Message Data</h4>
        <pre className="bg-base-200 p-4 rounded-lg text-sm overflow-x-auto">
          {message.rawMessage.toString('utf8')}
        </pre>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Message Size</h4>
        <p className="text-sm">{message.rawMessage.length} bytes</p>
      </div>
    </div>
  );
};

const HexTab: React.FC<{ message: ProtocolMessage }> = ({ message }) => {
  const formatHexDump = (buffer: Buffer): string => {
    const lines: string[] = [];
    const bytesPerLine = 16;
    
    for (let i = 0; i < buffer.length; i += bytesPerLine) {
      const hex = Array.from(buffer.slice(i, i + bytesPerLine))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
      
      const ascii = Array.from(buffer.slice(i, i + bytesPerLine))
        .map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.')
        .join('');
      
      const offset = i.toString(16).padStart(8, '0');
      lines.push(`${offset}: ${hex.padEnd(48)} |${ascii}|`);
    }
    
    return lines.join('\n');
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Hex Dump</h4>
        <pre className="bg-base-200 p-4 rounded-lg text-sm overflow-x-auto font-mono">
          {formatHexDump(message.rawMessage)}
        </pre>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Statistics</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Total Size:</strong> {message.rawMessage.length} bytes
          </div>
          <div>
            <strong>Lines:</strong> {Math.ceil(message.rawMessage.length / 16)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock function for fetching execution messages
const fetchExecutionMessages = async (executionId: string): Promise<ProtocolMessage[]> => {
  // This would be replaced with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export default EnhancedLogViewer;