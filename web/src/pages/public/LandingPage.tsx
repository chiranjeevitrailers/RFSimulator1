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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            <span className="block">5GLabX Platform</span>
            <span className="block text-blue-400">Professional 4G/5G Protocol Analysis</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-4xl mx-auto">
            Advanced network analysis platform with O-RAN, NB-IoT, V2X, and NTN support. 
            Execute 1000+ 3GPP test cases with real-time protocol analysis and comprehensive validation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="text-white border border-slate-500 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-300 transition-all duration-200 text-lg"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white mb-2">1000+</div>
            <div className="text-slate-400">3GPP Test Cases</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-slate-400">Protocols Supported</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-slate-400">Enterprise Users</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 text-center border border-slate-700">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-400">Countries</div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <SignalIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Protocol Analysis</h3>
              <p className="text-slate-300">
                Live monitoring and analysis of 4G/5G protocol messages with instant fault detection and performance metrics.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <BeakerIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Comprehensive Test Suite</h3>
              <p className="text-slate-300">
                Execute 1000+ 3GPP-compliant test cases covering O-RAN, NB-IoT, V2X, and NTN protocols.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Advanced Analytics</h3>
              <p className="text-slate-300">
                Detailed insights, performance metrics, and actionable recommendations for network optimization.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CloudIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Connect & Upload</h3>
              <p className="text-slate-300">
                Import your 4G/5G protocol logs or connect live data streams from your network infrastructure
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <BeakerIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Execute Tests</h3>
              <p className="text-slate-300">
                Run 1000+ 3GPP test cases with automated fault detection and comprehensive protocol validation
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 text-center border border-slate-700">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Analyze & Optimize</h3>
              <p className="text-slate-300">
                Get detailed insights, performance metrics, and actionable recommendations for network optimization
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "5GLabX has revolutionized our protocol testing. The real-time analysis and comprehensive test coverage have reduced our debugging time by 70%. It's the most advanced platform we've used."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">SC</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Dr. Sarah Chen</div>
                  <div className="text-slate-400">Principal Engineer, Ericsson</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "The O-RAN and NTN test cases are exceptional. 5GLabX has become our go-to tool for 5G network validation and optimization. Nothing else comes close."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MR</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Michael Rodriguez</div>
                  <div className="text-slate-400">Network Architect, Nokia</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 mb-6">
                "The V2X and NB-IoT test capabilities are outstanding. 5GLabX provides the depth of analysis we need for cutting-edge research. It's the gold standard in protocol analysis."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">PS</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Dr. Priya Sharma</div>
                  <div className="text-slate-400">Research Director, Qualcomm</div>
                </div>
              </div>
            </div>
            </div>
          </div>

        {/* CTA Section */}
        <div className="text-center mb-16">
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Protocol Analysis?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of telecom professionals who trust 5GLabX for their 4G/5G network analysis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 text-lg"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="text-white border border-slate-500 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-300 transition-all duration-200 text-lg"
              >
                View Pricing
              </Link>
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