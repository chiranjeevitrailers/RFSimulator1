// Error handling utilities for 5GLabX Platform
const ErrorHandler = {
  logError: (error, context = '') => {
    console.error(`[5GLabX Error] ${context}:`, error);
    
    // In production, you might want to send this to a logging service
    if (window.CONSTANTS && window.CONSTANTS.API_BASE_URL) {
      // Send error to logging service
      fetch(`${window.CONSTANTS.API_BASE_URL}/logs/error`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          error: error.message || error.toString(),
          stack: error.stack,
          context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(err => {
        console.error('Failed to log error to server:', err);
      });
    }
  },
  
  handleApiError: (error) => {
    console.error('API Error:', error);
    
    // Show user-friendly error message
    const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // You could show a toast notification here
    alert(`Error: ${errorMessage}`);
  },
  
  handleNetworkError: (error) => {
    console.error('Network Error:', error);
    alert('Network error. Please check your connection and try again.');
  }
};

// Make it globally available
window.ErrorHandler = ErrorHandler;