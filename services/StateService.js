// StateService - Global state management for layer statistics
const StateService = {
  layerStats: {},
  subscribers: [],

  updateLayerStats(stats) {
    this.layerStats = { ...stats };
    this.notifySubscribers();
  },

  getLayerStats() {
    return this.layerStats;
  },

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  },

  notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.layerStats);
      } catch (error) {
        console.error('StateService notify error:', error);
      }
    });
  }
};

// Make globally available
window.StateService = StateService;
