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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const stats = [
    { label: "Test Cases", value: "1000+" },
    { label: "Protocols", value: "15+" },
    { label: "Enterprise Users", value: "500+" },
    { label: "Countries", value: "50+" }
  ]

  const coreFeatures = [
    {
      icon: SignalIcon,
      title: "Real-time Protocol Analysis",
      description: "Live 4G/5G protocol monitoring with instant insights and correlation tracking across all network layers",
      color: "from-blue-500 to-cyan-500",
      badge: "Live"
    },
    {
      icon: BeakerIcon,
      title: "1000+ 3GPP Test Cases",
      description: "Comprehensive test suite covering RRC, NAS, NGAP, SIP, O-RAN, NB-IoT, NTN, and V2X protocols",
      color: "from-purple-500 to-pink-500",
      badge: "New"
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access, audit logging, and compliance with industry standards",
      color: "from-green-500 to-emerald-500",
      badge: null
    },
    {
      icon: ChartBarIcon,
      title: "Advanced Analytics",
      description: "AI-powered insights, performance optimization recommendations, and detailed reporting",
      color: "from-orange-500 to-red-500",
      badge: null
    }
  ]

  const protocolSupport = [
    { name: "RRC", description: "Radio Resource Control", icon: RadioIcon },
    { name: "NAS", description: "Non-Access Stratum", icon: AntennaIcon },
    { name: "NGAP", description: "Next Generation Application Protocol", icon: ServerIcon },
    { name: "SIP", description: "Session Initiation Protocol", icon: DevicePhoneMobileIcon },
    { name: "O-RAN", description: "Open Radio Access Network", icon: GlobeAltIcon },
    { name: "NB-IoT", description: "Narrowband Internet of Things", icon: DevicePhoneMobileIcon },
    { name: "NTN", description: "Non-Terrestrial Networks", icon: SatelliteIcon },
    { name: "V2X", description: "Vehicle-to-Everything", icon: TruckIcon }
  ]

  const specializedFeatures = [
    {
      icon: Cog6ToothIcon,
      title: "O-RAN Integration",
      description: "Complete O-RAN interface analysis with E1, F1, and X2/Xn support",
      features: ["E1 Interface Analysis", "F1 Interface Monitoring", "X2/Xn Handover", "O-RAN Performance"]
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "NB-IoT Analysis",
      description: "Specialized NB-IoT protocol analysis and optimization tools",
      features: ["NB-IoT Call Flow", "PHY Layer Analysis", "MAC Layer Monitoring", "RRC Layer Tracking"]
    },
    {
      icon: TruckIcon,
      title: "V2X Testing",
      description: "Vehicle-to-Everything communication analysis and testing",
      features: ["Sidelink Analysis", "V2X Scenarios", "Safety Messaging", "Performance Metrics"]
    },
    {
      icon: SatelliteIcon,
      title: "NTN Support",
      description: "Non-Terrestrial Network analysis with satellite communication",
      features: ["Satellite Tracking", "SIB19 Analysis", "Timing Analysis", "Doppler Effects"]
    }
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Connect & Upload",
      description: "Import your 4G/5G protocol logs or connect live data streams from your network infrastructure",
      icon: CloudIcon,
      color: "bg-blue-500"
    },
    {
      step: "02", 
      title: "Execute Tests",
      description: "Run 1000+ 3GPP test cases with automated fault detection and comprehensive protocol validation",
      icon: BeakerIcon,
      color: "bg-purple-500"
    },
    {
      step: "03",
      title: "Analyze & Optimize",
      description: "Get detailed insights, performance metrics, and actionable recommendations for network optimization",
      icon: ChartBarIcon,
      color: "bg-green-500"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Principal Engineer",
      company: "Ericsson",
      content: "5GLabX has revolutionized our protocol testing. The real-time analysis and comprehensive test coverage have reduced our debugging time by 70%. It's the most advanced platform we've used.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Rodriguez",
      role: "Network Architect",
      company: "Nokia",
      content: "The O-RAN and NTN test cases are exceptional. 5GLabX has become our go-to tool for 5G network validation and optimization. Nothing else comes close.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Priya Sharma",
      role: "Research Director",
      company: "Qualcomm",
      content: "The V2X and NB-IoT test capabilities are outstanding. 5GLabX provides the depth of analysis we need for cutting-edge research. It's the gold standard in protocol analysis.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ]

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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <span className="block">5GLabX Platform</span>
              <span className="block text-blue-400">Enhanced O-RAN Integration</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Advanced 5G network analysis platform with O-RAN, NB-IoT, V2X, and NTN support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <button className="group flex items-center space-x-2 text-white hover:text-blue-300 transition-colors duration-200">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all duration-200">
                  <PlayIcon className="h-6 w-6" />
                </div>
                <span className="text-lg font-medium">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-200">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Core Platform Features
            </h2>
            <p className="text-lg text-slate-300">
              Comprehensive 5G protocol analysis with real-time monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {feature.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      feature.badge === 'Live' ? 'bg-red-500 text-white animate-pulse' : 
                      feature.badge === 'New' ? 'bg-blue-500 text-white' : 
                      'bg-green-500 text-white'
                    }`}>
                      {feature.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Support Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Protocol Support
            </h2>
            <p className="text-lg text-slate-300">
              Full coverage of 4G/5G protocols with detailed analysis
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {protocolSupport.map((protocol, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-blue-500 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <protocol.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-lg font-bold text-white mb-1">
                  {protocol.name}
                </div>
                <div className="text-slate-300 text-sm">
                  {protocol.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Specialized Analysis Modules
            </h2>
            <p className="text-lg text-slate-300">
              Advanced modules for O-RAN, NB-IoT, V2X, and NTN protocol analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center text-slate-300 text-sm">
                      <CheckIcon className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-300">
              Get started with 5GLabX in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-slate-300">
              See what leading telecom professionals say about 5GLabX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-700 rounded-lg p-6 border border-slate-600 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-slate-400 text-xs">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <h2 className="text-3xl font-bold text-white mb-4">
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
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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