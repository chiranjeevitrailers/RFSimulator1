import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './components/auth/AuthProvider'
import { BillingProvider } from './components/billing/BillingProvider'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { PublicLayout } from './components/layout/PublicLayout'
import { AppLayout } from './components/layout/AppLayout'

// Public Pages
import HomePage from './pages/public/HomePage'
import PricingPage from './pages/public/PricingPage'
import DocsPage from './pages/public/DocsPage'
import LoginPage from './components/auth/LoginPage'
import SignupPage from './pages/public/SignupPage'

// App Pages
import DashboardPage from './pages/app/DashboardPage'
import TestSuitesPage from './pages/app/TestSuitesPage'
import AnalyzerPage from './pages/app/AnalyzerPage'
import ExecutionsPage from './pages/app/ExecutionsPage'
import AccountPage from './pages/app/AccountPage'
import AdminPage from './pages/app/AdminPage'
import OnboardingPage from './pages/app/OnboardingPage'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BillingProvider>
          <Router>
            <div className="App">
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'hsl(var(--b1))',
                    color: 'hsl(var(--bc))',
                    border: '1px solid hsl(var(--b3))',
                  },
                }}
              />
              
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="pricing" element={<PricingPage />} />
                  <Route path="docs" element={<DocsPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="signup" element={<SignupPage />} />
                </Route>

                {/* Protected App Routes */}
                <Route path="/app" element={<AppLayout />}>
                  <Route index element={<Navigate to="/app/dashboard" replace />} />
                  <Route path="dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="test-suites" element={
                    <ProtectedRoute>
                      <TestSuitesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="analyzer" element={
                    <ProtectedRoute>
                      <AnalyzerPage />
                    </ProtectedRoute>
                  } />
                  <Route path="executions" element={
                    <ProtectedRoute>
                      <ExecutionsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="account" element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  } />
                  <Route path="admin" element={
                    <ProtectedRoute requireAdmin>
                      <AdminPage />
                    </ProtectedRoute>
                  } />
                  <Route path="onboarding" element={
                    <ProtectedRoute>
                      <OnboardingPage />
                    </ProtectedRoute>
                  } />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </BillingProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App