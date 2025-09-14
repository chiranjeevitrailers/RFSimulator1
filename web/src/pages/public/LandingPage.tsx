import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlayIcon, 
  CheckIcon, 
  StarIcon, 
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  SignalIcon,
  WifiIcon,
  DevicePhoneMobileIcon,
  ServerIcon,
  BoltIcon,
  EyeIcon,
  CogIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChartPieIcon,
  ClockIcon,
  LockClosedIcon,
  CloudIcon,
  CodeBracketIcon,
  CommandLineIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon as ChipIcon,
  RadioIcon,
  SignalIcon as AntennaIcon,
  GlobeAltIcon as SatelliteIcon,
  TruckIcon,
  Cog6ToothIcon,
  ChartBarSquareIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <Link to="/" className="text-white hover:text-blue-300 transition-colors duration-200">
                Home
              </Link>
              <Link to="/pricing" className="text-white hover:text-blue-300 transition-colors duration-200">
                Pricing
              </Link>
              <Link to="/contact" className="text-white hover:text-blue-300 transition-colors duration-200">
                Contact
              </Link>
              <Link to="/login" className="text-white hover:text-blue-300 transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-300 transition-colors duration-200"
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900/95 backdrop-blur-md rounded-lg mt-2">
                <Link to="/" className="text-white hover:text-blue-300 transition-colors duration-200 block px-3 py-2">
                  Home
                </Link>
                <Link to="/pricing" className="text-white hover:text-blue-300 transition-colors duration-200 block px-3 py-2">
                  Pricing
                </Link>
                <Link to="/contact" className="text-white hover:text-blue-300 transition-colors duration-200 block px-3 py-2">
                  Contact
                </Link>
                <Link to="/login" className="text-white hover:text-blue-300 transition-colors duration-200 block px-3 py-2">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 block text-center mx-3 my-2"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 min-h-screen">
          <div className="p-4">
            <h2 className="text-white font-semibold mb-4">5GLabX Platform</h2>
            
            {/* Core Features */}
            <div className="mb-6">
              <h3 className="text-slate-300 text-sm font-medium mb-3">Core Features</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <SignalIcon className="h-4 w-4" />
                  <span>Real-time Protocol Analysis</span>
                  <span className="bg-red-500 text-white text-xs px-1 py-0.5 rounded animate-pulse">Live</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <BeakerIcon className="h-4 w-4" />
                  <span>1000+ 3GPP Test Cases</span>
                  <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">New</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400 text-sm">
                  <ChartBarIcon className="h-4 w-4" />
                  <span>Advanced Analytics</span>
                </div>
              </div>
            </div>

            {/* Protocol Support */}
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

            {/* Specialized Modules */}
            <div className="mb-6">
              <h3 className="text-slate-300 text-sm font-medium mb-3">Specialized Modules</h3>
              <div className="space-y-3">
                <div className="bg-slate-700 rounded p-3">
                  <div className="flex items-center mb-2">
                    <Cog6ToothIcon className="h-5 w-5 text-purple-400 mr-2" />
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
                    <DevicePhoneMobileIcon className="h-5 w-5 text-purple-400 mr-2" />
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
                    <TruckIcon className="h-5 w-5 text-purple-400 mr-2" />
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
                    <SatelliteIcon className="h-5 w-5 text-purple-400 mr-2" />
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
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Start Free Trial
              </Link>
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
                  <CloudIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect & Upload</h3>
                <p className="text-slate-300 text-sm">
                  Import your 4G/5G protocol logs or connect live data streams from your network infrastructure
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BeakerIcon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Execute Tests</h3>
                <p className="text-slate-300 text-sm">
                  Run 1000+ 3GPP test cases with automated fault detection and comprehensive protocol validation
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChartBarIcon className="h-6 w-6 text-white" />
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
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
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
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
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
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-current" />
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
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                >
                  Start Free Trial
                </Link>
                <Link
                  to="/pricing"
                  className="text-white border border-slate-500 px-6 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-300 transition-all duration-200"
                >
                  View Pricing
                </Link>
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
  )
}

export default LandingPage