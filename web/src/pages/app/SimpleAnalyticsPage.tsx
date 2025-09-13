import React from 'react'

export const SimpleAnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Analytics 📈
              </h1>
              <p className="text-base-content/70 text-lg">
                Performance metrics and test execution insights
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Test Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">Success Rate</span>
              <span className="font-medium">N/A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">Avg Duration</span>
              <span className="font-medium">N/A</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">Total Tests</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Protocol Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">RRC Messages</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">NAS Messages</span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">S1AP Messages</span>
              <span className="font-medium">0</span>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Usage Statistics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">This Week</span>
              <span className="font-medium">0 tests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">This Month</span>
              <span className="font-medium">0 tests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-base-content/70">Quota Used</span>
              <span className="font-medium">0/10</span>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Popular Test Cases</h3>
          <div className="space-y-2">
            <div className="text-sm text-base-content/70">No test executions yet</div>
            <div className="text-sm text-base-content/70">Start running tests to see analytics</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Execution Timeline</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-base-content/70">No data available</p>
            <p className="text-sm text-base-content/50">Run some tests to see timeline</p>
          </div>
        </div>

        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Protocol Distribution</h3>
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🥧</div>
            <p className="text-base-content/70">No data available</p>
            <p className="text-sm text-base-content/50">Run some tests to see distribution</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleAnalyticsPage