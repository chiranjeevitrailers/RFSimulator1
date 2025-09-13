import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { LoadingSpinner } from './components/common/LoadingSpinner'
import { ErrorBoundary } from './components/common/ErrorBoundary'

// Public pages
import { HomePage } from './pages/public/HomePage'
import { PricingPage } from './pages/public/PricingPage'
import { DocsPage } from './pages/public/DocsPage'
import { LoginPage } from './pages/public/LoginPage'
import { SignupPage } from './pages/public/SignupPage'

// Protected pages
import { DashboardPage } from './pages/app/DashboardPage'
import { AnalyzerPage } from './pages/app/AnalyzerPage'
import { TestSuitesPage } from './pages/app/TestSuitesPage'
import { ExecutionsPage } from './pages/app/ExecutionsPage'
import { AccountPage } from './pages/app/AccountPage'
import { AdminPage } from './pages/app/AdminPage'

// Layout components
import { PublicLayout } from './components/layout/PublicLayout'
import { AppLayout } from './components/layout/AppLayout'

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

// Admin route wrapper
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/app/dashboard" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-base-100">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="docs" element={<DocsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
          </Route>

          {/* Protected app routes */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="analyzer" element={<AnalyzerPage />} />
            <Route path="test-suites" element={<TestSuitesPage />} />
            <Route path="executions" element={<ExecutionsPage />} />
            <Route path="account" element={<AccountPage />} />
            <Route
              path="admin/*"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ErrorBoundary>
  )
}

export default App