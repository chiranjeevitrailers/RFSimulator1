// Helper functions for 5GLabX Platform
const Helpers = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString();
  },
  
  formatTime: (date) => {
    return new Date(date).toLocaleTimeString();
  },
  
  formatBytes: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },
  
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Make it globally available
window.Helpers = Helpers;