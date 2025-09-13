import React from 'react'

export const SimpleAnalyzerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Protocol Analyzer 🔍
              </h1>
              <p className="text-base-content/70 text-lg">
                Analyze protocol messages and examine test execution results
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Message Flow</h3>
          <p className="text-base-content/70 mb-4">
            View real-time protocol message flow during test execution.
          </p>
          <div className="bg-base-300 p-4 rounded text-sm">
            <p>No messages yet. Start a test execution to see protocol messages.</p>
          </div>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Message Details</h3>
          <p className="text-base-content/70 mb-4">
            Examine detailed protocol message information and parameters.
          </p>
          <div className="bg-base-300 p-4 rounded text-sm">
            <p>Select a message to view detailed analysis.</p>
          </div>
        </div>
      </div>

      <div className="bg-base-200 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-base-content mb-4">Test Execution Controls</h3>
        <div className="flex gap-4">
          <button className="btn btn-primary">
            Start Test
          </button>
          <button className="btn btn-outline" disabled>
            Stop Test
          </button>
          <button className="btn btn-ghost">
            Export Results
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleAnalyzerPage