// Constants for 5GLabX Platform
const CONSTANTS = {
  API_BASE_URL: 'https://api.5glabx.com',
  VERSION: '1.0.0',
  PROTOCOLS: {
    RRC: 'Radio Resource Control',
    NAS: 'Non-Access Stratum',
    NGAP: 'Next Generation Application Protocol',
    SIP: 'Session Initiation Protocol',
    ORAN: 'Open Radio Access Network',
    NBIOT: 'Narrowband Internet of Things',
    NTN: 'Non-Terrestrial Networks',
    V2X: 'Vehicle-to-Everything'
  },
  TEST_CASES: {
    TOTAL: 1000,
    CATEGORIES: ['Functional', 'Mobility', 'Performance', 'Security', 'IMS', 'O-RAN', 'NB-IoT', 'NTN', 'V2X']
  }
};

// Make it globally available
window.CONSTANTS = CONSTANTS;