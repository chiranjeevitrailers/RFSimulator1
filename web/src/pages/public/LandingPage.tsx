import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  PlayIcon, 
  CheckIcon, 
  StarIcon, 
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
  CloudIcon,
  BeakerIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  UsersIcon,
  TrophyIcon,
  ChartBarSquareIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  LockClosedIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon as TwitterIcon,
  ChatBubbleLeftRightIcon as LinkedinIcon,
  ChatBubbleLeftRightIcon as GithubIcon,
  ChatBubbleLeftRightIcon as YoutubeIcon
} from '@heroicons/react/24/outline'

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">5G</span>
              </div>
              <span className="text-gray-900 font-bold text-xl">5GLabX</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Home
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Contact
              </Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block px-3 py-2">
                  Home
                </Link>
                <Link to="/pricing" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block px-3 py-2">
                  Pricing
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block px-3 py-2">
                  Contact
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block px-3 py-2">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 block text-center mx-3 my-2"
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              5GLabX Protocol Simulator
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Professional 3GPP Protocol Simulator with 1000+ test cases, real-time analysis, 
              and authentic hardware-like experience for 5G/4G network professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-lg inline-flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <button className="text-blue-600 border border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 text-lg inline-flex items-center justify-center">
                <PlayIcon className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to professional protocol analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  01
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <ArrowUpTrayIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Upload & Configure</h3>
                <p className="text-gray-600 mb-6">
                  Import your protocol logs or configure real-time data streams from your network infrastructure.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Multiple file formats
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Real-time streaming
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Custom configurations
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  02
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <BeakerIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Select & Execute</h3>
                <p className="text-gray-600 mb-6">
                  Choose from 1000+ 3GPP test cases and execute comprehensive protocol validation.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    1000+ test cases
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Search specific scenarios
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Preview test details
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  03
                </div>
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <ArrowDownTrayIcon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Execute & Analyze</h3>
                <p className="text-gray-600 mb-6">
                  Run real-time protocol simulation and analyze results with professional tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Real-time execution
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Live protocol analysis
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Professional dashboard
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                    Export results
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">See It In Action</h3>
                <p className="text-gray-600 mb-6">
                  Watch our interactive demo to see how 5GLabX Protocol Simulator works in real-time. 
                  Experience the power of professional protocol analysis.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Real-time protocol simulation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Authentic 3GPP message flows</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Professional analysis tools</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Export and reporting</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mt-6 inline-flex items-center">
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
              <div className="relative">
                <div className="bg-gray-900 rounded-lg p-6 font-mono text-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-400">5GLabX Simulator</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-green-400">[2024-01-15 10:30:45] PHY: RSRP=-85dBm, RSRQ=-12dB</div>
                    <div className="text-blue-400">[2024-01-15 10:30:46] MAC: HARQ Process 8: ACK</div>
                    <div className="text-yellow-400">[2024-01-15 10:30:47] RRC: RRC Setup Request</div>
                    <div className="text-purple-400">[2024-01-15 10:30:48] NAS: Registration Request</div>
                    <div className="text-green-400">[2024-01-15 10:30:49] RRC: RRC Setup Complete</div>
                    <div className="text-blue-400">[2024-01-15 10:30:50] NAS: Registration Accept</div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900">Test Status</div>
                  <div className="text-xs text-green-600">✓ Running</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
                  <div className="text-sm font-semibold text-gray-900">Progress</div>
                  <div className="text-xs text-blue-600">75% Complete</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of network professionals from leading companies who rely on 5GLabX for their protocol analysis needs.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <UsersIcon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">10,000+</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Active Users</div>
              <div className="text-sm text-gray-600">Network professionals worldwide</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <TrophyIcon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Satisfaction Rate</div>
              <div className="text-sm text-gray-600">Based on user feedback</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <ChartBarSquareIcon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">70%</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Time Saved</div>
              <div className="text-sm text-gray-600">Average testing efficiency gain</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-4">
                <GlobeAltIcon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Countries</div>
              <div className="text-sm text-gray-600">Global user base</div>
            </div>
          </div>

          {/* 5GLabX Device Features */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">5GLabX Device Capabilities</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">O-RAN</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">NB-IoT</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">V2X</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">NTN</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">LTE</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">5G NR</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">IMS</div>
              </div>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-gray-600 font-semibold text-sm">SIP</div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6 max-w-4xl mx-auto">
                  "5GLabX has revolutionized our protocol testing workflow. The 1000+ test cases cover every scenario we need, 
                  and the real-time analysis is incredibly accurate. It's like having a professional protocol analyzer without the hardware costs."
                </blockquote>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    DSC
                  </div>
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-semibold text-gray-900">Dr. Sarah Chen</h4>
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600">Senior 5G Engineer</p>
                    <p className="text-sm text-gray-500">Network Professional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Start your free trial today and experience the same professional-grade protocol analysis that industry leaders trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Start Free Trial
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  View All Testimonials
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay Updated with 5GLabX</h3>
                <p className="text-gray-400">Get the latest updates on new test cases, features, and industry insights.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  Subscribe
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">5G</span>
                </div>
                <span className="text-xl font-bold">5GLabX</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Professional 3GPP Protocol Simulator with 1000+ test cases, real-time analysis, 
                and authentic hardware-like experience for 5G/4G network professionals.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-400">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>contact@5glabx.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <PhoneIcon className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPinIcon className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="https://twitter.com/5glabx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com/company/5glabx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a href="https://github.com/5glabx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href="https://youtube.com/5glabx" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <YoutubeIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-3">
                  <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">Features</a></li>
                  <li><a href="#test-cases" className="text-gray-400 hover:text-white transition-colors duration-200">Test Cases</a></li>
                  <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors duration-200">Pricing</a></li>
                  <li><a href="/docs/api/" className="text-gray-400 hover:text-white transition-colors duration-200">API Documentation</a></li>
                  <li><a href="/integrations/" className="text-gray-400 hover:text-white transition-colors duration-200">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="/about/" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                  <li><a href="/careers/" className="text-gray-400 hover:text-white transition-colors duration-200">Careers</a></li>
                  <li><a href="/press/" className="text-gray-400 hover:text-white transition-colors duration-200">Press</a></li>
                  <li><a href="/partners/" className="text-gray-400 hover:text-white transition-colors duration-200">Partners</a></li>
                  <li><a href="/contact/" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-3">
                  <li><a href="/docs/" className="text-gray-400 hover:text-white transition-colors duration-200">Documentation</a></li>
                  <li><a href="/help/" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
                  <li><a href="/community/" className="text-gray-400 hover:text-white transition-colors duration-200">Community</a></li>
                  <li><a href="/blog/" className="text-gray-400 hover:text-white transition-colors duration-200">Blog</a></li>
                  <li><a href="/webinars/" className="text-gray-400 hover:text-white transition-colors duration-200">Webinars</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="/privacy/" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                  <li><a href="/terms/" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                  <li><a href="/cookies/" className="text-gray-400 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
                  <li><a href="/gdpr/" className="text-gray-400 hover:text-white transition-colors duration-200">GDPR</a></li>
                  <li><a href="/security/" className="text-gray-400 hover:text-white transition-colors duration-200">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">© 2025 5GLabX. All rights reserved.</div>
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 text-sm">Certified:</span>
                <div className="flex items-center space-x-1 text-gray-400">
                  <ShieldCheckIcon className="h-4 w-4" />
                  <span className="text-xs">SOC 2 Type II</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <AwardIcon className="h-4 w-4" />
                  <span className="text-xs">ISO 27001</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <UsersIcon className="h-4 w-4" />
                  <span className="text-xs">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage