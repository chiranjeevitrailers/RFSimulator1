// LogEntry model for 5GLabX Platform
class LogEntry {
  constructor(data = {}) {
    this.id = data.id || window.Helpers?.generateId() || Math.random().toString(36).substr(2, 9);
    this.timestamp = data.timestamp || new Date().toISOString();
    this.level = data.level || 'INFO';
    this.message = data.message || '';
    this.protocol = data.protocol || '';
    this.layer = data.layer || '';
    this.direction = data.direction || '';
    this.rawData = data.rawData || '';
    this.parsedData = data.parsedData || {};
    this.correlationId = data.correlationId || '';
    this.source = data.source || '';
  }
  
  toJSON() {
    return {
      id: this.id,
      timestamp: this.timestamp,
      level: this.level,
      message: this.message,
      protocol: this.protocol,
      layer: this.layer,
      direction: this.direction,
      rawData: this.rawData,
      parsedData: this.parsedData,
      correlationId: this.correlationId,
      source: this.source
    };
  }
  
  static fromJSON(json) {
    return new LogEntry(json);
  }
}

// Make it globally available
window.LogEntry = LogEntry;