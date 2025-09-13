import React from 'react'
import { TestSuiteBrowser } from '../../components/test-suites/TestSuiteBrowser'
import { SimpleQuotaAlert } from '../../components/billing/SimpleQuotaDisplay'
import { useSimpleBilling } from '../../components/billing/SimpleBillingProvider'
import { 
  TestTube, 
  Search, 
  Filter, 
  Star,
  TrendingUp,
  Clock,
  Users
} from 'lucide-react'

export const TestSuitesPage: React.FC = () => {
  const { quotaInfo } = useSimpleBilling()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Test Suite Library 📚
              </h1>
              <p className="text-base-content/70 text-lg">
                Explore our comprehensive collection of 3GPP-compliant test cases
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <TestTube className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quota Alert */}
      <SimpleQuotaAlert />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <TestTube className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold">1000+</div>
                <div className="text-sm text-base-content/70">Test Cases</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="font-semibold">10+</div>
                <div className="text-sm text-base-content/70">Categories</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold">3GPP</div>
                <div className="text-sm text-base-content/70">Compliant</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-info" />
              </div>
              <div>
                <div className="font-semibold">Real-time</div>
                <div className="text-sm text-base-content/70">Execution</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Test Categories</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <TestTube className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">Functional</div>
              <div className="text-sm text-base-content/70">Basic procedures</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <Users className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="font-semibold">Mobility</div>
              <div className="text-sm text-base-content/70">Handover tests</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <TrendingUp className="w-8 h-8 text-warning mx-auto mb-2" />
              <div className="font-semibold">Performance</div>
              <div className="text-sm text-base-content/70">KPI validation</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <Search className="w-8 h-8 text-error mx-auto mb-2" />
              <div className="font-semibold">Security</div>
              <div className="text-sm text-base-content/70">Auth & encryption</div>
            </div>
            
            <div className="text-center p-4 bg-base-200 rounded-lg">
              <Filter className="w-8 h-8 text-info mx-auto mb-2" />
              <div className="font-semibold">IMS</div>
              <div className="text-sm text-base-content/70">VoLTE & VoWiFi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Suite Browser */}
      <TestSuiteBrowser />

      {/* Help Section */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="text-xl font-bold mb-4">Need Help?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <p className="text-sm text-base-content/70 mb-3">
                New to protocol testing? Start with basic functional tests to understand the platform.
              </p>
              <button className="btn btn-outline btn-sm">
                View Guide
              </button>
            </div>
            
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Test Execution</h3>
              <p className="text-sm text-base-content/70 mb-3">
                Learn how to execute tests, interpret results, and use the protocol analyzer.
              </p>
              <button className="btn btn-outline btn-sm">
                Learn More
              </button>
            </div>
            
            <div className="p-4 bg-base-200 rounded-lg">
              <h3 className="font-semibold mb-2">Custom Tests</h3>
              <p className="text-sm text-base-content/70 mb-3">
                Create your own test cases and share them with your team.
              </p>
              <button className="btn btn-outline btn-sm">
                Create Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestSuitesPage