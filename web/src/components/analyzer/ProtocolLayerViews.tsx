// 5GLabX Cloud - Protocol Layer Views Component
// Layer-specific analysis with realistic 3GPP protocol visualization

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProtocolMessage } from '../../lib/protocol-models';

interface ProtocolLayerViewsProps {
  executionId: string;
  onMessageSelect?: (message: ProtocolMessage) => void;
}

interface LayerStats {
  layer: string;
  count: number;
  successRate: number;
  avgDuration: number;
  messages: ProtocolMessage[];
}

interface LayerFilter {
  layer: string;
  enabled: boolean;
  color: string;
}

export const ProtocolLayerViews: React.FC<ProtocolLayerViewsProps> = ({
  executionId,
  onMessageSelect
}) => {
  const [selectedLayer, setSelectedLayer] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'timeline' | 'statistics' | 'correlation'>('timeline');
  const [layerFilters, setLayerFilters] = useState<LayerFilter[]>([
    { layer: 'RRC', enabled: true, color: 'bg-green-500' },
    { layer: 'NAS', enabled: true, color: 'bg-blue-500' },
    { layer: 'S1AP', enabled: true, color: 'bg-orange-500' },
    { layer: 'NGAP', enabled: true, color: 'bg-purple-500' },
    { layer: 'SIP', enabled: true, color: 'bg-pink-500' },
    { layer: 'Diameter', enabled: true, color: 'bg-yellow-500' },
    { layer: 'F1AP', enabled: true, color: 'bg-indigo-500' },
    { layer: 'E1AP', enabled: true, color: 'bg-cyan-500' },
    { layer: 'E2AP', enabled: true, color: 'bg-teal-500' },
    { layer: 'GTP-U', enabled: true, color: 'bg-red-500' },
    { layer: 'PC5', enabled: true, color: 'bg-emerald-500' },
    { layer: 'Uu', enabled: true, color: 'bg-violet-500' }
  ]);

  // Fetch execution messages
  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['execution', executionId, 'messages'],
    queryFn: () => fetchExecutionMessages(executionId),
    enabled: !!executionId
  });

  // Calculate layer statistics
  const layerStats = useMemo((): LayerStats[] => {
    if (!messages) return [];

    const stats: Record<string, LayerStats> = {};

    messages.forEach((message: ProtocolMessage) => {
      if (!stats[message.layer]) {
        stats[message.layer] = {
          layer: message.layer,
          count: 0,
          successRate: 0,
          avgDuration: 0,
          messages: []
        };
      }

      stats[message.layer].count++;
      stats[message.layer].messages.push(message);
    });

    // Calculate success rate and average duration
    Object.values(stats).forEach(stat => {
      const successCount = stat.messages.filter(msg => 
        msg.ies.verdict === 'PASS' || !msg.ies.verdict
      ).length;
      stat.successRate = (successCount / stat.count) * 100;

      // Calculate average duration between messages
      if (stat.messages.length > 1) {
        const durations = stat.messages.slice(1).map((msg, index) => 
          msg.timestamp - stat.messages[index].timestamp
        );
        stat.avgDuration = durations.reduce((sum, dur) => sum + dur, 0) / durations.length;
      }
    });

    return Object.values(stats).sort((a, b) => b.count - a.count);
  }, [messages]);

  // Filter messages based on selected layer and enabled filters
  const filteredMessages = useMemo(() => {
    if (!messages) return [];

    return messages.filter((message: ProtocolMessage) => {
      const layerFilter = layerFilters.find(f => f.layer === message.layer);
      if (!layerFilter?.enabled) return false;
      
      if (selectedLayer !== 'all' && message.layer !== selectedLayer) return false;
      
      return true;
    });
  }, [messages, selectedLayer, layerFilters]);

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

  // Get layer color
  const getLayerColor = (layer: string) => {
    const colors = {
      'RRC': 'text-green-600 bg-green-100 border-green-200',
      'NAS': 'text-blue-600 bg-blue-100 border-blue-200',
      'S1AP': 'text-orange-600 bg-orange-100 border-orange-200',
      'NGAP': 'text-purple-600 bg-purple-100 border-purple-200',
      'SIP': 'text-pink-600 bg-pink-100 border-pink-200',
      'Diameter': 'text-yellow-600 bg-yellow-100 border-yellow-200',
      'F1AP': 'text-indigo-600 bg-indigo-100 border-indigo-200',
      'E1AP': 'text-cyan-600 bg-cyan-100 border-cyan-200',
      'E2AP': 'text-teal-600 bg-teal-100 border-teal-200',
      'GTP-U': 'text-red-600 bg-red-100 border-red-200',
      'PC5': 'text-emerald-600 bg-emerald-100 border-emerald-200',
      'Uu': 'text-violet-600 bg-violet-100 border-violet-200'
    };
    return colors[layer as keyof typeof colors] || 'text-gray-600 bg-gray-100 border-gray-200';
  };

  // Toggle layer filter
  const toggleLayerFilter = (layer: string) => {
    setLayerFilters(prev => 
      prev.map(filter => 
        filter.layer === layer 
          ? { ...filter, enabled: !filter.enabled }
          : filter
      )
    );
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
    <div className="h-full flex flex-col bg-base-100">
      {/* Header */}
      <div className="p-4 border-b border-base-300 bg-base-200">
        <h2 className="text-xl font-semibold mb-4">Protocol Layer Analysis</h2>
        
        {/* View Mode Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { id: 'timeline', label: 'Timeline View', icon: '⏱️' },
            { id: 'statistics', label: 'Statistics', icon: '📊' },
            { id: 'correlation', label: 'Correlation', icon: '🔗' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`btn btn-sm ${viewMode === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setViewMode(tab.id as any)}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Layer Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-base-content/70">Layers:</span>
          {layerFilters.map(filter => (
            <button
              key={filter.layer}
              className={`btn btn-xs ${filter.enabled ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => toggleLayerFilter(filter.layer)}
            >
              <span className="mr-1">{getLayerIcon(filter.layer)}</span>
              {filter.layer}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'timeline' && (
          <TimelineView
            messages={filteredMessages}
            layerStats={layerStats}
            selectedLayer={selectedLayer}
            onLayerSelect={setSelectedLayer}
            onMessageSelect={onMessageSelect}
            getLayerIcon={getLayerIcon}
            getLayerColor={getLayerColor}
          />
        )}
        
        {viewMode === 'statistics' && (
          <StatisticsView
            layerStats={layerStats}
            onLayerSelect={setSelectedLayer}
            getLayerIcon={getLayerIcon}
            getLayerColor={getLayerColor}
          />
        )}
        
        {viewMode === 'correlation' && (
          <CorrelationView
            messages={filteredMessages}
            layerStats={layerStats}
            onMessageSelect={onMessageSelect}
            getLayerIcon={getLayerIcon}
            getLayerColor={getLayerColor}
          />
        )}
      </div>
    </div>
  );
};

// Timeline View Component
interface TimelineViewProps {
  messages: ProtocolMessage[];
  layerStats: LayerStats[];
  selectedLayer: string;
  onLayerSelect: (layer: string) => void;
  onMessageSelect?: (message: ProtocolMessage) => void;
  getLayerIcon: (layer: string) => string;
  getLayerColor: (layer: string) => string;
}

const TimelineView: React.FC<TimelineViewProps> = ({
  messages,
  layerStats,
  selectedLayer,
  onLayerSelect,
  onMessageSelect,
  getLayerIcon,
  getLayerColor
}) => {
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  const toggleMessageExpansion = (messageId: string) => {
    const newExpanded = new Set(expandedMessages);
    if (newExpanded.has(messageId)) {
      newExpanded.delete(messageId);
    } else {
      newExpanded.add(messageId);
    }
    setExpandedMessages(newExpanded);
  };

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
    <div className="h-full flex">
      {/* Layer Sidebar */}
      <div className="w-64 border-r border-base-300 bg-base-50 p-4">
        <h3 className="font-semibold mb-4">Protocol Layers</h3>
        
        <div className="space-y-2">
          <button
            className={`w-full text-left p-2 rounded ${
              selectedLayer === 'all' ? 'bg-primary text-primary-content' : 'bg-base-200 hover:bg-base-300'
            }`}
            onClick={() => onLayerSelect('all')}
          >
            <div className="flex items-center justify-between">
              <span>All Layers</span>
              <span className="text-xs">{messages.length}</span>
            </div>
          </button>
          
          {layerStats.map(stat => (
            <button
              key={stat.layer}
              className={`w-full text-left p-2 rounded ${
                selectedLayer === stat.layer ? 'bg-primary text-primary-content' : 'bg-base-200 hover:bg-base-300'
              }`}
              onClick={() => onLayerSelect(stat.layer)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{getLayerIcon(stat.layer)}</span>
                  <span>{stat.layer}</span>
                </div>
                <span className="text-xs">{stat.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Message Timeline */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                getLayerColor(message.layer)
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getLayerIcon(message.layer)}</span>
                  <div>
                    <h4 className="font-semibold">{message.messageType}</h4>
                    <p className="text-sm opacity-70">
                      {message.direction} • {formatTimestamp(message.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="badge badge-sm">{message.layer}</span>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => toggleMessageExpansion(message.id)}
                  >
                    {expandedMessages.has(message.id) ? '▼' : '▶'}
                  </button>
                </div>
              </div>
              
              <div className="text-sm">
                <p><strong>Source:</strong> {message.source.type} {message.source.id}</p>
                <p><strong>Destination:</strong> {message.destination.type} {message.destination.id}</p>
              </div>
              
              {expandedMessages.has(message.id) && (
                <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                  <div className="text-sm space-y-2">
                    <div><strong>Order:</strong> {message.order}</div>
                    
                    {Object.keys(message.correlationKeys).length > 0 && (
                      <div>
                        <strong>Correlation Keys:</strong>
                        <div className="flex gap-1 flex-wrap mt-1">
                          {Object.entries(message.correlationKeys).map(([key, value]) => (
                            <span key={key} className="badge badge-outline badge-xs">
                              {key}: {String(value)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => onMessageSelect?.(message)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Statistics View Component
interface StatisticsViewProps {
  layerStats: LayerStats[];
  onLayerSelect: (layer: string) => void;
  getLayerIcon: (layer: string) => string;
  getLayerColor: (layer: string) => string;
}

const StatisticsView: React.FC<StatisticsViewProps> = ({
  layerStats,
  onLayerSelect,
  getLayerIcon,
  getLayerColor
}) => {
  const totalMessages = layerStats.reduce((sum, stat) => sum + stat.count, 0);
  const avgSuccessRate = layerStats.reduce((sum, stat) => sum + stat.successRate, 0) / layerStats.length;

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Total Messages</h3>
            <p className="text-3xl font-bold text-primary">{totalMessages}</p>
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Protocol Layers</h3>
            <p className="text-3xl font-bold text-secondary">{layerStats.length}</p>
          </div>
        </div>
        
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg">Avg Success Rate</h3>
            <p className="text-3xl font-bold text-accent">{avgSuccessRate.toFixed(1)}%</p>
          </div>
        </div>
      </div>
      
      {/* Layer Statistics */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Layer Statistics</h3>
        
        {layerStats.map(stat => (
          <div
            key={stat.layer}
            className={`card ${getLayerColor(stat.layer)} cursor-pointer hover:shadow-lg transition-shadow`}
            onClick={() => onLayerSelect(stat.layer)}
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getLayerIcon(stat.layer)}</span>
                  <div>
                    <h4 className="font-semibold text-lg">{stat.layer}</h4>
                    <p className="text-sm opacity-70">Protocol Layer</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">{stat.count}</div>
                  <div className="text-sm opacity-70">messages</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm opacity-70">Success Rate</div>
                  <div className="text-lg font-semibold">{stat.successRate.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-sm opacity-70">Avg Duration</div>
                  <div className="text-lg font-semibold">{stat.avgDuration.toFixed(0)}ms</div>
                </div>
              </div>
              
              {/* Progress bar for success rate */}
              <div className="mt-3">
                <div className="w-full bg-base-300 rounded-full h-2">
                  <div
                    className="bg-current h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stat.successRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Correlation View Component
interface CorrelationViewProps {
  messages: ProtocolMessage[];
  layerStats: LayerStats[];
  onMessageSelect?: (message: ProtocolMessage) => void;
  getLayerIcon: (layer: string) => string;
  getLayerColor: (layer: string) => string;
}

const CorrelationView: React.FC<CorrelationViewProps> = ({
  messages,
  layerStats,
  onMessageSelect,
  getLayerIcon,
  getLayerColor
}) => {
  // Group messages by correlation keys
  const correlationGroups = useMemo(() => {
    const groups: Record<string, ProtocolMessage[]> = {};
    
    messages.forEach(message => {
      const rnti = message.correlationKeys?.rnti || 'Unknown';
      const plmnId = message.correlationKeys?.plmnId || 'Unknown';
      const key = `RNTI: ${rnti}, PLMN: ${plmnId}`;
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(message);
    });
    
    return groups;
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto p-6">
      <h3 className="text-xl font-semibold mb-6">Message Correlation</h3>
      
      <div className="space-y-6">
        {Object.entries(correlationGroups).map(([groupName, groupMessages]) => (
          <div key={groupName} className="card bg-base-200">
            <div className="card-body">
              <h4 className="card-title text-lg mb-4">{groupName}</h4>
              
              <div className="space-y-3">
                {groupMessages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      getLayerColor(message.layer)
                    } cursor-pointer hover:shadow-md transition-shadow`}
                    onClick={() => onMessageSelect?.(message)}
                  >
                    <span className="text-xl">{getLayerIcon(message.layer)}</span>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{message.messageType}</div>
                      <div className="text-sm opacity-70">
                        {message.direction} • {new Date(message.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="badge badge-sm">{message.layer}</div>
                      <div className="text-xs opacity-70">#{message.order}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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

export default ProtocolLayerViews;