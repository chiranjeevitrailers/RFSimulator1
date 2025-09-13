import React from 'react'
import { Link } from 'react-router-dom'
import { 
  CheckIcon, 
  ArrowRightIcon,
  StarIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  ChartBarIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Trial",
      price: "Free",
      period: "14 days",
      description: "Perfect for getting started with protocol analysis",
      features: [
        "100 test executions per month",
        "Basic protocol support (RRC, NAS, S1AP)",
        "Standard log viewer",
        "Email support",
        "Basic analytics dashboard"
      ],
      limitations: [
        "Limited to 3 concurrent users",
        "No API access",
        "Basic fault injection"
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "from-slate-500 to-slate-600"
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "Ideal for telecom professionals and small teams",
      features: [
        "1,000 test executions per month",
        "Full protocol support (RRC, NAS, S1AP, NGAP, SIP, DIAMETER)",
        "Advanced log viewer with correlation",
        "Priority email & chat support",
        "Advanced analytics & reporting",
        "API access with rate limiting",
        "Fault injection & simulation",
        "Custom test case creation",
        "Team collaboration (up to 10 users)",
        "Data export & integration"
      ],
      limitations: [],
      cta: "Start Professional",
      popular: true,
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact sales",
      description: "For large organizations with advanced requirements",
      features: [
        "Unlimited test executions",
        "All protocol support + O-RAN, NB-IoT, NTN, V2X",
        "Premium log viewer with AI insights",
        "24/7 phone & dedicated support",
        "Advanced analytics & AI recommendations",
        "Full API access & webhooks",
        "Advanced fault injection & stress testing",
        "Custom test case development",
        "Unlimited team collaboration",
        "Advanced data export & integration",
        "On-premise deployment option",
        "Custom SLA & compliance",
        "Dedicated account manager",
        "Training & onboarding"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const features = [
    {
      icon: CpuChipIcon,
      title: "1000+ 3GPP Test Cases",
      description: "Comprehensive test suite covering all protocol layers and scenarios"
    },
    {
      icon: ChartBarIcon,
      title: "Real-time Analytics",
      description: "Live protocol monitoring with instant insights and performance metrics"
    },
    {
      icon: ShieldCheckIcon,
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access and audit logging"
    },
    {
      icon: UserGroupIcon,
      title: "Team Collaboration",
      description: "Share insights and collaborate with your team in real-time"
    }
  ]

  const faqs = [
    {
      question: "What protocols are supported?",
      answer: "We support all major 4G/5G protocols including RRC, NAS, S1AP, NGAP, SIP, DIAMETER, F1AP, E1AP, E2AP, GTP-U, GTP-C, PC5, X2AP, XnAP, and specialized protocols like O-RAN, NB-IoT, NTN, and V2X."
    },
    {
      question: "Can I try before purchasing?",
      answer: "Yes! We offer a 14-day free trial with full access to our Professional features. No credit card required."
    },
    {
      question: "Is there a setup fee?",
      answer: "No setup fees for Trial and Professional plans. Enterprise plans may include setup fees depending on custom requirements."
    },
    {
      question: "What's included in test executions?",
      answer: "Each test execution includes running a complete test case with protocol analysis, fault detection, performance metrics, and detailed reporting."
    },
    {
      question: "Do you offer on-premise deployment?",
      answer: "Yes, on-premise deployment is available for Enterprise customers with custom pricing and dedicated support."
    },
    {
      question: "What support options are available?",
      answer: "Trial includes email support, Professional includes priority email & chat support, and Enterprise includes 24/7 phone support with dedicated account management."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">5G</span>
              </div>
              <span className="text-white font-bold text-xl">5GLabX Cloud</span>
            </Link>
            <div className="flex items-center space-x-4">
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
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose the perfect 5GLabX plan for your protocol analysis needs. 
              Start free, scale as you grow.
            </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/10' 
                    : 'border-slate-700/50 hover:border-blue-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-slate-300">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-start">
                        <span className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-slate-500">•</span>
                        <span className="text-slate-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link 
                  to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                  className={`block w-full text-center py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-blue-500/25'
                      : 'bg-slate-700 text-white hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need for Protocol Analysis
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              All plans include our core features with varying levels of access and support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
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

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
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
              Ready to Get Started?
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
                to="/contact" 
                className="text-white border border-slate-600 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-300 transition-all duration-300"
              >
                Contact Sales
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
                Professional 4G/5G protocol analysis platform with 1000+ 3GPP test cases, 
                real-time monitoring, and enterprise-grade security.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">API Documentation</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Test Cases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-300 transition-colors duration-200">Contact</a></li>
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
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PricingPage