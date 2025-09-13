import React, { useState } from 'react'
import { Check, ArrowRight, Zap, Star, Shield, Users, BarChart3 } from 'lucide-react'
import { useAuth } from '../auth/AuthProvider'

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  content: React.ReactNode
}

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const { user } = useAuth()

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to 5GLabX Cloud',
      description: 'Your professional 4G/5G protocol analysis platform',
      icon: Zap,
      content: (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Zap className="w-12 h-12 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome, {user?.full_name || 'Engineer'}!</h2>
            <p className="text-base-content/70">
              You now have access to the most comprehensive 4G/5G protocol analysis platform.
              Let's get you started with a quick tour of the key features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">1000+ Test Cases</h3>
              <p className="text-sm text-base-content/70">
                Comprehensive 3GPP-compliant test suite library
              </p>
            </div>
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-sm text-base-content/70">
                Live protocol log streaming and analysis
              </p>
            </div>
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">No Hardware Required</h3>
              <p className="text-sm text-base-content/70">
                Browser-based analysis from anywhere
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'trial',
      title: 'Your Trial Plan',
      description: 'Explore the platform with your free trial',
      icon: Star,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-10 h-10 text-warning" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Trial Plan Active</h2>
            <p className="text-base-content/70">
              You're currently on our free trial plan with the following benefits:
            </p>
          </div>
          
          <div className="bg-base-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">10 test executions per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Basic protocol analysis (RRC, NAS, S1AP)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Standard log viewer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-sm">Community access</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Usage This Month:</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Test Executions</span>
                      <span>0 / 10</span>
                    </div>
                    <progress className="progress progress-primary w-full" value="0" max="10"></progress>
                  </div>
                  <p className="text-xs text-base-content/70">
                    Your usage resets on the 1st of each month
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-base-content/70 mb-4">
              Ready to unlock more features? Upgrade to Pro for advanced analysis capabilities.
            </p>
            <button className="btn btn-primary">
              View Pricing Plans
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Key Features',
      description: 'Discover the powerful tools at your disposal',
      icon: BarChart3,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-10 h-10 text-info" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Powerful Analysis Tools</h2>
            <p className="text-base-content/70">
              Professional-grade protocol analysis capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Protocol Analysis
                </h3>
                <p className="text-sm text-base-content/70">
                  Analyze RRC, NAS, S1AP, NGAP, SIP, and more with industry-standard decoders
                </p>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  Test Suite Library
                </h3>
                <p className="text-sm text-base-content/70">
                  Access 1000+ 3GPP-compliant test cases for functional, mobility, and performance testing
                </p>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  Real-time Collaboration
                </h3>
                <p className="text-sm text-base-content/70">
                  Share analysis sessions with your team in real-time
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  Enhanced Log Viewer
                </h3>
                <p className="text-sm text-base-content/70">
                  Dual-pane viewer with correlation highlighting and detailed IE analysis
                </p>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  Fault Simulation
                </h3>
                <p className="text-sm text-base-content/70">
                  Test your systems with realistic protocol error injection
                </p>
              </div>
              
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-error rounded-full"></div>
                  Advanced Analytics
                </h3>
                <p className="text-sm text-base-content/70">
                  Comprehensive KPI monitoring and performance metrics
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Your first steps with 5GLabX Cloud',
      icon: Users,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Ready to Start?</h2>
            <p className="text-base-content/70">
              Here's how to get the most out of your 5GLabX Cloud experience
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Browse Test Suites</h3>
                <p className="text-sm text-base-content/70">
                  Explore our comprehensive library of 3GPP test cases organized by category
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Run Your First Test</h3>
                <p className="text-sm text-base-content/70">
                  Execute a basic attach procedure to see the platform in action
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Analyze Results</h3>
                <p className="text-sm text-base-content/70">
                  Use the enhanced log viewer to examine protocol messages and IEs
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
              <div className="w-8 h-8 bg-primary text-primary-content rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold mb-1">Explore Advanced Features</h3>
                <p className="text-sm text-base-content/70">
                  Try fault simulation, create custom test cases, and collaborate with your team
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-base-content/70 mb-4">
              Need help? Check out our documentation or contact support.
            </p>
            <div className="flex gap-2 justify-center">
              <button className="btn btn-outline btn-sm">
                View Documentation
              </button>
              <button className="btn btn-outline btn-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, steps[currentStep].id])
      setCurrentStep(prev => prev + 1)
    } else {
      // Complete onboarding
      setCompletedSteps(prev => [...prev, steps[currentStep].id])
      // Redirect to dashboard
      window.location.href = '/app/dashboard'
    }
  }

  const handleSkip = () => {
    // Skip onboarding and go to dashboard
    window.location.href = '/app/dashboard'
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-base-content/70">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
          </div>
          <progress 
            className="progress progress-primary w-full" 
            value={currentStep + 1} 
            max={steps.length}
          ></progress>
        </div>

        {/* Step Content */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">{currentStepData.title}</h1>
              <p className="text-base-content/70">{currentStepData.description}</p>
            </div>

            <div className="mb-8">
              {currentStepData.content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleSkip}
                className="btn btn-ghost"
              >
                Skip Tour
              </button>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button 
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="btn btn-outline"
                  >
                    Previous
                  </button>
                )}
                
                <button 
                  onClick={handleNext}
                  className="btn btn-primary"
                >
                  {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow