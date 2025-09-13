import React from 'react'

export const SimpleTestSuitesPage: React.FC = () => {
  return (
    <div className="space-y-6">
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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Functional Tests</h3>
          <p className="text-base-content/70 mb-4">
            Basic 3GPP procedures and attach/detach flows.
          </p>
          <button className="btn btn-primary btn-sm">
            Browse Tests
          </button>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Mobility Tests</h3>
          <p className="text-base-content/70 mb-4">
            Handover procedures and mobility scenarios.
          </p>
          <button className="btn btn-secondary btn-sm">
            Browse Tests
          </button>
        </div>

        <div className="bg-base-200 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-base-content mb-4">Performance Tests</h3>
          <p className="text-base-content/70 mb-4">
            KPI validation and performance analysis.
          </p>
          <button className="btn btn-accent btn-sm">
            Browse Tests
          </button>
        </div>
      </div>
    </div>
  )
}

export default SimpleTestSuitesPage