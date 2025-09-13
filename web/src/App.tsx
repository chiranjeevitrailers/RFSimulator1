import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import LoadingSpinner from './components/common/LoadingSpinner'

// Simple authentication pages
const SimpleLoginPage = React.lazy(() => import('./components/auth/SimpleLoginPage'))
const SimpleSignupPage = React.lazy(() => import('./components/auth/SimpleSignupPage'))

// Dashboard pages
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'))
const UserDashboard = React.lazy(() => import('./pages/user/UserDashboard'))

// Main app pages
const AppLayout = React.lazy(() => import('./components/layout/AppLayout'))
const DashboardPage = React.lazy(() => import('./pages/app/DashboardPage'))
const TestSuitesPage = React.lazy(() => import('./pages/app/TestSuitesPage'))
const AnalyzerPage = React.lazy(() => import('./pages/app/AnalyzerPage'))
const ExecutionsPage = React.lazy(() => import('./pages/app/ExecutionsPage'))
const AnalyticsPage = React.lazy(() => import('./pages/app/AnalyticsPage'))
const AccountPage = React.lazy(() => import('./pages/app/AccountPage'))

// Providers
const SimpleAuthProvider = React.lazy(() => import('./components/auth/SimpleAuthProvider'))
const SimpleBillingProvider = React.lazy(() => import('./components/billing/SimpleBillingProvider'))
const SimpleWebSocketProvider = React.lazy(() => import('./components/layout/SimpleWebSocketProvider'))

// Public pages
const LandingPage = React.lazy(() => import('./pages/public/LandingPage'))
const PricingPage = React.lazy(() => import('./pages/public/PricingPage'))
const ContactPage = React.lazy(() => import('./pages/public/ContactPage'))

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
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<SimpleLoginPage />} />
              <Route path="/signup" element={<SimpleSignupPage />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* User Routes */}
              <Route path="/user/dashboard" element={<UserDashboard />} />

              {/* Main App Routes */}
              <Route path="/app" element={
                <SimpleAuthProvider>
                  <SimpleBillingProvider>
                    <SimpleWebSocketProvider>
                      <AppLayout />
                    </SimpleWebSocketProvider>
                  </SimpleBillingProvider>
                </SimpleAuthProvider>
              }>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="test-suites" element={<TestSuitesPage />} />
                <Route path="analyzer" element={<AnalyzerPage />} />
                <Route path="executions" element={<ExecutionsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route index element={<Navigate to="/app/dashboard" replace />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App