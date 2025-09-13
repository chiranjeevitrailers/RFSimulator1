import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Zap, Shield, Globe, Users, BarChart3 } from 'lucide-react'

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">
              Professional 4G/5G Protocol Analysis
              <span className="block text-primary">Made Simple</span>
            </h1>
            <p className="text-xl mb-8 text-base-content/70">
              Hardware-free, browser-based protocol analyzer with 1000+ 3GPP test cases. 
              Analyze RRC, NAS, NGAP, SIP, O-RAN, NB-IoT, NTN, and V2X protocols with 
              industry-standard precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link to="/docs" className="btn btn-outline btn-lg">
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose 5GLabX Cloud?</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Built for telecom engineers, by telecom engineers. Get the power of 
              professional protocol analysis without the hardware complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">1000+ Test Cases</h3>
                <p className="text-base-content/70">
                  Comprehensive 3GPP test suite covering functional, mobility, 
                  performance, and security scenarios.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">Browser-Based</h3>
                <p className="text-base-content/70">
                  No hardware required. Access professional protocol analysis 
                  from anywhere with just a web browser.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">3GPP Compliant</h3>
                <p className="text-base-content/70">
                  Strict adherence to 3GPP specifications with realistic 
                  message flows and correlation keys.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">Real-Time Collaboration</h3>
                <p className="text-base-content/70">
                  Share analysis sessions with your team and collaborate 
                  on complex protocol investigations.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">Advanced Analytics</h3>
                <p className="text-base-content/70">
                  Get insights with KPI monitoring, performance metrics, 
                  and detailed execution reports.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="card-title justify-center mb-2">Fault Simulation</h3>
                <p className="text-base-content/70">
                  Test your systems with realistic fault injection 
                  and error scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Protocol Support Section */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Protocol Support</h2>
            <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
              Analyze all major 4G/5G protocols with industry-standard decoders 
              and enhanced log viewers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'RRC', color: 'badge-rrc' },
              { name: 'NAS', color: 'badge-nas' },
              { name: 'S1AP', color: 'badge-s1ap' },
              { name: 'NGAP', color: 'badge-ngap' },
              { name: 'SIP', color: 'badge-sip' },
              { name: 'Diameter', color: 'badge-diameter' },
              { name: 'F1AP', color: 'badge-f1ap' },
              { name: 'E1AP', color: 'badge-e1ap' },
              { name: 'E2AP', color: 'badge-e2ap' },
              { name: 'GTP-U', color: 'badge-gtp-u' },
              { name: 'PC5', color: 'badge-pc5' },
              { name: 'Uu', color: 'badge-uu' },
            ].map((protocol) => (
              <div key={protocol.name} className="text-center">
                <div className={`badge ${protocol.color} badge-lg mb-2`}>
                  {protocol.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of telecom engineers using 5GLabX Cloud for 
            professional protocol analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-secondary btn-lg">
              Start Your Free Trial
            </Link>
            <Link to="/pricing" className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage