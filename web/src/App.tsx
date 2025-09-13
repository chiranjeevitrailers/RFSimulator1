import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from './components/auth/AuthProvider'
import { BillingProvider } from './components/billing/BillingProvider'
import { WebSocketProvider } from './components/layout/WebSocketProvider'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/public/LandingPage'))
const PricingPage = React.lazy(() => import('./pages/public/PricingPage'))
const DocsPage = React.lazy(() => import('./pages/public/DocsPage'))
const SignupPage = React.lazy(() => import('./pages/public/SignupPage'))
const LoginPage = React.lazy(() => import('./components/auth/LoginPage'))

const DashboardPage = React.lazy(() => import('./pages/app/DashboardPage'))
const TestSuitesPage = React.lazy(() => import('./pages/app/TestSuitesPage'))
const AnalyzerPage = React.lazy(() => import('./pages/app/AnalyzerPage'))
const ExecutionsPage = React.lazy(() => import('./pages/app/ExecutionsPage'))
const AccountPage = React.lazy(() => import('./pages/app/AccountPage'))
const AdminPage = React.lazy(() => import('./pages/app/AdminPage'))
const OnboardingPage = React.lazy(() => import('./pages/app/OnboardingPage'))

// Advanced feature pages
const AdvancedAnalyticsPage = React.lazy(() => import('./pages/app/AdvancedAnalyticsPage'))
const TeamManagementPage = React.lazy(() => import('./pages/app/TeamManagementPage'))
const AuditLogsPage = React.lazy(() => import('./pages/app/AuditLogsPage'))
const ApiManagementPage = React.lazy(() => import('./pages/app/ApiManagementPage'))
const SystemMonitoringPage = React.lazy(() => import('./pages/app/SystemMonitoringPage'))
const PerformanceOptimizerPage = React.lazy(() => import('./pages/app/PerformanceOptimizerPage'))

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
})

// Loading component
const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-base-100">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-base-content/70">Loading...</p>
    </div>
  </div>
)

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-base-content/70 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BillingProvider>
            <WebSocketProvider>
              <Router>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/docs" element={<DocsPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected App Routes */}
                    <Route
                      path="/app/*"
                      element={
                        <ProtectedRoute>
                          <AppLayout>
                            <Routes>
                              {/* Core App Routes */}
                              <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
                              <Route path="/dashboard" element={<DashboardPage />} />
                              <Route path="/test-suites" element={<TestSuitesPage />} />
                              <Route path="/analyzer" element={<AnalyzerPage />} />
                              <Route path="/executions" element={<ExecutionsPage />} />
                              <Route path="/account" element={<AccountPage />} />
                              <Route path="/onboarding" element={<OnboardingPage />} />

                              {/* Advanced Feature Routes */}
                              <Route path="/analytics" element={<AdvancedAnalyticsPage />} />
                              <Route path="/teams" element={<TeamManagementPage />} />
                              <Route path="/audit-logs" element={<AuditLogsPage />} />
                              <Route path="/api" element={<ApiManagementPage />} />
                              <Route path="/monitoring" element={<SystemMonitoringPage />} />
                              <Route path="/performance" element={<PerformanceOptimizerPage />} />

                              {/* Admin Routes */}
                              <Route path="/admin" element={<AdminPage />} />

                              {/* Catch-all for app routes */}
                              <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                            </Routes>
                          </AppLayout>
                        </ProtectedRoute>
                      }
                    />

                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Router>
            </WebSocketProvider>
          </BillingProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App