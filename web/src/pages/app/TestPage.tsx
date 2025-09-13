import React from 'react'

export const TestPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-red-500 mb-4">TEST PAGE - THIS SHOULD BE VISIBLE</h1>
      <p className="text-lg">If you can see this, the routing is working!</p>
      <div className="bg-red-100 p-4 rounded mt-4">
        <p className="text-red-800">This is a test to verify the app is loading correctly.</p>
      </div>
    </div>
  )
}

export default TestPage