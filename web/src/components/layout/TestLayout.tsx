import React from 'react'
import { Outlet } from 'react-router-dom'

export const TestLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">5GLabX Cloud - TEST LAYOUT</h1>
        <p>This is a test layout to verify routing works</p>
      </div>
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default TestLayout