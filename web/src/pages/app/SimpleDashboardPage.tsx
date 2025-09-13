import React from 'react'

export const SimpleDashboardPage: React.FC = () => {
  return (
    <div className="space-y-6" style={{ backgroundColor: 'white', padding: '20px', minHeight: '100vh' }}>
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'black', fontSize: '2rem' }}>
                Welcome to 5GLabX Cloud! 👋
              </h1>
              <p className="text-base-content/70 text-lg" style={{ color: 'gray', fontSize: '1.2rem' }}>
                Your professional 4G/5G protocol analysis platform is ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Test Suites</h3>
          <p className="text-base-content/70 mb-4">
            Browse and run 3GPP test cases.
          </p>
          <a href="/app/test-suites" className="btn btn-primary btn-sm">
            Browse Test Suites
          </a>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Protocol Analyzer</h3>
          <p className="text-base-content/70 mb-4">
            Analyze protocol messages and logs.
          </p>
          <a href="/app/analyzer" className="btn btn-secondary btn-sm">
            Open Analyzer
          </a>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Analytics</h3>
          <p className="text-base-content/70 mb-4">
            View test execution history and metrics.
          </p>
          <a href="/app/analytics" className="btn btn-accent btn-sm">
            View Analytics
          </a>
        </div>
      </div>
    </div>
  )
}

export default SimpleDashboardPage