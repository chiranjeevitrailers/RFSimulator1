const { useState, useEffect } = React;

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm font-semibold">
        🚀 5GLabX Platform - Enhanced O-RAN Integration Demo
      </div>

      {/* Navigation */}
      <nav className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">5G</span>
              </div>
              <span className="text-white font-bold text-xl">5GLabX</span>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Demo</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Home</a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Pricing</a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Contact</a>
              <a href="#" className="text-white hover:text-blue-300 transition-colors duration-200">Login</a>
              <a href="#" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200">Get Started</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white hover:text-blue-300 transition-colors duration-200">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-slate-800 border-r border-slate-700 min-h-screen sidebar-transition`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              {!sidebarCollapsed && <h2 className="text-white font-semibold">5GLabX Platform</h2>}
              <button 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-slate-400 hover:text-white transition-colors duration-200"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
            
            {/* Core Features */}
            <div className="mb-6">
              <h3 className="text-slate-300 text-sm font-medium mb-3">Core Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {!sidebarCollapsed && <span>Real-time Protocol Analysis</span>}
                  <span className="badge-live">Live</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  {!sidebarCollapsed && <span>1000+ 3GPP Test Cases</span>}
                  <span className="badge-new">New</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {!sidebarCollapsed && <span>Enterprise Security</span>}
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {!sidebarCollapsed && <span>Advanced Analytics</span>}
                </div>
              </div>
            </div>

            {/* Protocol Support */}
            {!sidebarCollapsed && (
              <div className="mb-6">
                <h3 className="text-slate-300 text-sm font-medium mb-3">Protocol Support</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">RRC</div>
                    <div className="text-slate-400 text-xs">Radio Resource Control</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">NAS</div>
                    <div className="text-slate-400 text-xs">Non-Access Stratum</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">NGAP</div>
                    <div className="text-slate-400 text-xs">Next Gen App Protocol</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">SIP</div>
                    <div className="text-slate-400 text-xs">Session Initiation</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">O-RAN</div>
                    <div className="text-slate-400 text-xs">Open RAN</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">NB-IoT</div>
                    <div className="text-slate-400 text-xs">Narrowband IoT</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">NTN</div>
                    <div className="text-slate-400 text-xs">Non-Terrestrial</div>
                  </div>
                  <div className="bg-slate-700 rounded p-2 text-center">
                    <div className="text-white font-bold text-sm">V2X</div>
                    <div className="text-slate-400 text-xs">Vehicle-to-Everything</div>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Modules */}
            {!sidebarCollapsed && (
              <div className="mb-6">
                <h3 className="text-slate-300 text-sm font-medium mb-3">Specialized Modules</h3>
                <div className="space-y-3">
                  <div className="bg-slate-700 rounded p-3">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white font-medium text-sm">O-RAN Integration</span>
                    </div>
                    <div className="text-slate-400 text-xs space-y-1">
                      <div>• E1 Interface Analysis</div>
                      <div>• F1 Interface Monitoring</div>
                      <div>• X2/Xn Handover</div>
                      <div>• O-RAN Performance</div>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded p-3">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <span className="text-white font-medium text-sm">NB-IoT Analysis</span>
                    </div>
                    <div className="text-slate-400 text-xs space-y-1">
                      <div>• NB-IoT Call Flow</div>
                      <div>• PHY Layer Analysis</div>
                      <div>• MAC Layer Monitoring</div>
                      <div>• RRC Layer Tracking</div>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded p-3">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                      <span className="text-white font-medium text-sm">V2X Testing</span>
                    </div>
                    <div className="text-slate-400 text-xs space-y-1">
                      <div>• Sidelink Analysis</div>
                      <div>• V2X Scenarios</div>
                      <div>• Safety Messaging</div>
                      <div>• Performance Metrics</div>
                    </div>
                  </div>
                  <div className="bg-slate-700 rounded p-3">
                    <div className="flex items-center mb-2">
                      <svg className="h-5 w-5 text-purple-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white font-medium text-sm">NTN Support</span>
                    </div>
                    <div className="text-slate-400 text-xs space-y-1">
                      <div>• Satellite Tracking</div>
                      <div>• SIB19 Analysis</div>
                      <div>• Timing Analysis</div>
                      <div>• Doppler Effects</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              <span className="block">5GLabX Platform</span>
              <span className="block text-blue-400">Enhanced O-RAN Integration</span>
            </h1>
            <p className="text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
              Advanced 5G network analysis platform with O-RAN, NB-IoT, V2X, and NTN support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200">
                Start Free Trial
              </button>
              <button className="text-white border border-slate-500 px-6 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-300 transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">1000+</div>
              <div className="text-slate-400 text-sm">Test Cases</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-slate-400 text-sm">Protocols</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-400 text-sm">Enterprise Users</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white mb-1">50+</div>
              <div className="text-slate-400 text-sm">Countries</div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect & Upload</h3>
                <p className="text-slate-300 text-sm">
                  Import your 4G/5G protocol logs or connect live data streams from your network infrastructure
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Execute Tests</h3>
                <p className="text-slate-300 text-sm">
                  Run 1000+ 3GPP test cases with automated fault detection and comprehensive protocol validation
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Analyze & Optimize</h3>
                <p className="text-slate-300 text-sm">
                  Get detailed insights, performance metrics, and actionable recommendations for network optimization
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Trusted by Industry Leaders</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  "5GLabX has revolutionized our protocol testing. The real-time analysis and comprehensive test coverage have reduced our debugging time by 70%. It's the most advanced platform we've used."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">SC</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Dr. Sarah Chen</div>
                    <div className="text-slate-400 text-xs">Principal Engineer, Ericsson</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  "The O-RAN and NTN test cases are exceptional. 5GLabX has become our go-to tool for 5G network validation and optimization. Nothing else comes close."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">MR</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Michael Rodriguez</div>
                    <div className="text-slate-400 text-xs">Network Architect, Nokia</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 text-sm mb-4">
                  "The V2X and NB-IoT test capabilities are outstanding. 5GLabX provides the depth of analysis we need for cutting-edge research. It's the gold standard in protocol analysis."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">PS</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Dr. Priya Sharma</div>
                    <div className="text-slate-400 text-xs">Research Director, Qualcomm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-slate-700 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Transform Your Protocol Analysis?
              </h2>
              <p className="text-lg text-slate-300 mb-6">
                Join thousands of telecom professionals who trust 5GLabX
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200">
                  Start Free Trial
                </button>
                <button className="text-white border border-slate-500 px-6 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-300 transition-all duration-200">
                  View Pricing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">5G</span>
                </div>
                <span className="text-white font-bold text-lg">5GLabX</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Advanced 5G network analysis platform with O-RAN, NB-IoT, V2X, and NTN support
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">API Docs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Test Cases</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-6 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-xs">
                © 2024 5GLabX. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-xs">
                  Privacy
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-xs">
                  Terms
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-xs">
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));