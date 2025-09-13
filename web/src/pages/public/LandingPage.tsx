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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 text-center text-sm font-semibold">
        🚀 5GLabX Platform - Enhanced O-RAN Integration Demo
      </div>

      {/* Navigation */}
      <nav className={`fixed top-8 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
      }`}>
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
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <span className="inline-block bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
                🚀 Advanced 5G Network Analysis Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                5GLabX Platform
              </span>
              <span className="block">Enhanced O-RAN Integration</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Advanced 5G network analysis platform with O-RAN, NB-IoT, V2X, and NTN support. 
              Real-time protocol analysis, comprehensive test suites, and enterprise-grade security.
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core Platform Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive 5G protocol analysis with real-time monitoring and advanced analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
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
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive Protocol Support
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Full coverage of 4G/5G protocols with detailed analysis and testing capabilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {protocolSupport.map((protocol, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <protocol.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                  {protocol.name}
                </div>
                <div className="text-slate-400 text-sm">
                  {protocol.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Specialized Analysis Modules
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced modules for O-RAN, NB-IoT, V2X, and NTN protocol analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specializedFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get started with 5GLabX in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-300 transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              See what leading telecom professionals say about 5GLabX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Protocol Analysis?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of telecom professionals who trust 5GLabX as their preferred protocol analysis platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/pricing"
                className="text-white border border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-300 transition-all duration-300"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">5G</span>
                </div>
                <span className="text-white font-bold text-xl">5GLabX</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Advanced 5G network analysis platform with O-RAN, NB-IoT, V2X, and NTN support. 
                Real-time protocol analysis, comprehensive test suites, and enterprise-grade security.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">API Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Test Cases</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Protocol Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400 text-sm">
                © 2024 5GLabX. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200 text-sm">
                  Cookie Policy
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