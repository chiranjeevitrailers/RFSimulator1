import React from 'react'

export const SimpleExecutionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Test Executions 📊
              </h1>
              <p className="text-base-content/70 text-lg">
                View your test execution history and results
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-base-200 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold">0</span>
            </div>
            <div>
              <div className="font-semibold">Total Executions</div>
              <div className="text-sm text-base-content/70">All time</div>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
              <span className="text-success font-bold">0</span>
            </div>
            <div>
              <div className="font-semibold">Passed</div>
              <div className="text-sm text-base-content/70">Success rate</div>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
              <span className="text-error font-bold">0</span>
            </div>
            <div>
              <div className="font-semibold">Failed</div>
              <div className="text-sm text-base-content/70">Error rate</div>
            </div>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-info/10 rounded-full flex items-center justify-center">
              <span className="text-info font-bold">0</span>
            </div>
            <div>
              <div className="font-semibold">Avg Duration</div>
              <div className="text-sm text-base-content/70">Execution time</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Execution History</h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold mb-2">No executions yet</h3>
          <p className="text-base-content/70 mb-4">
            Start running test cases to see your execution history here.
          </p>
          <a href="/app/test-suites" className="btn btn-primary">
            Browse Test Suites
          </a>
        </div>
      </div>
    </div>
  )
}

export default SimpleExecutionsPage