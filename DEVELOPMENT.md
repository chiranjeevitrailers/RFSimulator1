# 5GLabX Cloud - Development Documentation

*Version 1.1 – 2025-01-13*

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture Transformation](#2-architecture-transformation)
3. [Repository Structure](#3-repository-structure)
4. [Development Setup](#4-development-setup)
5. [Technology Stack](#5-technology-stack)
6. [Migration Strategy](#6-migration-strategy)
7. [Development Workflow](#7-development-workflow)
8. [Testing Strategy](#8-testing-strategy)
9. [Deployment Pipeline](#9-deployment-pipeline)
10. [Contributing Guidelines](#10-contributing-guidelines)

---

## 1. Project Overview

### 1.1 Vision
Transform the existing 5GLabX desktop application into a subscription-based cloud platform that provides:

- **Hardware-free 4G/5G protocol analysis** - Browser-based alternative to Keysight/Anritsu analyzers
- **1000+ 3GPP test cases** - Ready-made functional, mobility, performance, and security tests
- **Controlled fault injection** - Realistic protocol error simulation
- **Real-time collaboration** - Multi-user access with role-based permissions

### 1.2 Current State Analysis
The existing 5GLabX platform is a desktop Electron application with:
- ✅ Complete CLI integration (srsRAN, Open5GS, Kamailio)
- ✅ Advanced protocol analysis capabilities
- ✅ O-RAN, NB-IoT, V2X, NTN support
- ✅ Production-ready safety controls
- ✅ Comprehensive logging and monitoring

### 1.3 Target Architecture
```
Browser (React/Vite) 
   ↕ HTTPS & WebSocket
Netlify (Static + Functions)
   ↔ Supabase (Postgres, Auth, Storage)
   ↔ Stripe (Billing)
   ↔ 5GLabX Log-Engine API (Container)
```

---

## 2. Architecture Transformation

### 2.1 From Desktop to Cloud

| Component | Current (Desktop) | Target (Cloud) |
|-----------|------------------|----------------|
| **Frontend** | Electron + Vanilla JS | React + Vite + TailwindCSS |
| **Backend** | Node.js Express | Netlify Functions + Supabase |
| **Database** | Local SQLite/JSON | Supabase PostgreSQL |
| **Auth** | None | Supabase Auth (Email, GitHub, Google) |
| **Billing** | None | Stripe Integration |
| **Deployment** | Desktop Installer | Netlify + Fly.io/Railway |
| **CLI Integration** | Direct Process Spawn | Containerized API Service |

### 2.2 Key Architectural Changes

#### 2.2.1 Frontend Modernization
- **Current**: Vanilla JavaScript with Electron
- **Target**: React 18 + Vite + TypeScript
- **Benefits**: Better maintainability, modern tooling, component reusability

#### 2.2.2 Backend as a Service
- **Current**: Monolithic Express server
- **Target**: Serverless functions + Supabase
- **Benefits**: Auto-scaling, reduced infrastructure management, built-in auth

#### 2.2.3 Data Persistence
- **Current**: Local file storage
- **Target**: Supabase PostgreSQL with RLS
- **Benefits**: Multi-user support, real-time updates, backup/recovery

#### 2.2.4 CLI Integration
- **Current**: Direct process execution
- **Target**: Containerized microservice
- **Benefits**: Isolation, scalability, consistent environment

---

## 3. Repository Structure

### 3.1 New Repository Layout

```
5glabx-cloud/
├── web/                          # React frontend application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/          # Shared components
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   ├── analyzer/        # Protocol analyzer components
│   │   │   ├── test-suites/     # Test suite management
│   │   │   └── admin/           # Admin panel components
│   │   ├── pages/               # Route components
│   │   │   ├── public/          # Public pages (home, pricing, docs)
│   │   │   └── app/             # Protected app pages
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility libraries
│   │   │   ├── supabase/        # Supabase client and types
│   │   │   ├── stripe/          # Stripe integration
│   │   │   └── utils/           # General utilities
│   │   ├── stores/              # State management (Zustand/Redux)
│   │   └── styles/              # Global styles and themes
│   ├── public/                  # Static assets
│   ├── package.json
│   └── vite.config.ts
├── api/                         # Log-Engine microservice
│   ├── src/
│   │   ├── parsers/             # Protocol parsers (migrated from current)
│   │   │   ├── rrc/            # RRC layer parser
│   │   │   ├── nas/            # NAS layer parser
│   │   │   ├── ngap/           # NGAP parser
│   │   │   ├── sip/            # SIP parser
│   │   │   └── oran/           # O-RAN parsers
│   │   ├── fault-injection/     # Fault injection framework
│   │   ├── test-execution/      # Test case execution engine
│   │   └── websocket/           # Real-time event streaming
│   ├── Dockerfile
│   ├── package.json
│   └── docker-compose.yml
├── netlify/
│   └── functions/               # Serverless functions
│       ├── create-checkout.ts   # Stripe checkout creation
│       ├── stripe-webhook.ts    # Stripe webhook handler
│       ├── run-test-case.ts     # Test execution trigger
│       └── quota-check.ts       # Usage quota validation
├── test-suites/                 # 3GPP test case library
│   ├── functional/              # Functional test cases
│   ├── mobility/                # Mobility test cases
│   ├── performance/             # Performance test cases
│   ├── security/                # Security test cases
│   ├── ims/                     # IMS test cases
│   ├── qos/                     # QoS test cases
│   ├── oran/                    # O-RAN test cases
│   ├── nbiot/                   # NB-IoT test cases
│   ├── ntn/                     # NTN test cases
│   ├── v2x/                     # V2X test cases
│   └── regression/              # Regression test suites
├── infra/
│   ├── supabase/
│   │   ├── migrations/          # Database migrations
│   │   ├── seed.sql             # Initial data seeding
│   │   └── functions/           # Edge functions
│   ├── scripts/
│   │   ├── seed-test-cases.ts   # Test case seeding script
│   │   └── migrate-data.ts      # Data migration utilities
│   └── docker/
│       └── log-engine/          # Log-engine container config
├── docs/                        # Documentation
│   ├── api/                     # API documentation
│   ├── deployment/              # Deployment guides
│   └── user-guides/             # User documentation
├── .github/
│   └── workflows/               # CI/CD workflows
│       ├── lint-test.yml        # Linting and testing
│       ├── deploy-preview.yml   # Preview deployments
│       ├── deploy-prod.yml      # Production deployment
│       └── sync-testcases.yml   # Test case synchronization
├── netlify.toml                 # Netlify configuration
├── package.json                 # Root package.json for monorepo
└── README.md
```

### 3.2 Migration from Current Structure

| Current Location | New Location | Migration Notes |
|------------------|--------------|-----------------|
| `components/` | `web/src/components/` | Convert to React components |
| `services/` | `api/src/` + `netlify/functions/` | Split into microservice + functions |
| `models/` | `web/src/lib/types/` + Supabase schema | Convert to TypeScript types |
| `utils/` | `web/src/lib/utils/` | Migrate and modernize |
| `electron/` | Remove | Replace with web-based deployment |
| `server.js` | `netlify/functions/` | Convert to serverless functions |

---

## 4. Development Setup

### 4.1 Prerequisites

```bash
# Required tools
node >= 18.0.0
npm >= 9.0.0
git >= 2.30.0

# Optional but recommended
docker >= 20.10.0
supabase CLI >= 1.0.0
netlify CLI >= 12.0.0
```

### 4.2 Environment Setup

```bash
# Clone repository
git clone https://github.com/5glabx/5glabx-cloud.git
cd 5glabx-cloud

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development environment
npm run dev
```

### 4.3 Environment Variables

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Log Engine Configuration
LOG_ENGINE_URL=your_log_engine_url
GLOBAL_FAULT_RATE=0.10

# Netlify Configuration
NETLIFY_SITE_ID=your_netlify_site_id
```

---

## 5. Technology Stack

### 5.1 Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.x | UI framework |
| **TypeScript** | 5.x | Type safety |
| **Vite** | 5.x | Build tool and dev server |
| **TailwindCSS** | 3.x | Styling framework |
| **DaisyUI** | 4.x | Component library |
| **React Query** | 5.x | Server state management |
| **Zustand** | 4.x | Client state management |
| **React Router** | 6.x | Client-side routing |
| **Supabase JS** | 2.x | Database and auth client |

### 5.2 Backend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | Latest | Database, auth, real-time |
| **Netlify Functions** | Latest | Serverless functions |
| **Stripe** | Latest | Payment processing |
| **Node.js** | 18.x | Runtime for functions |
| **TypeScript** | 5.x | Type safety |

### 5.3 Log Engine Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x | Runtime |
| **Express** | 4.x | Web framework |
| **WebSocket** | Latest | Real-time communication |
| **Docker** | Latest | Containerization |
| **Existing Parsers** | Current | Migrated protocol parsers |

### 5.4 DevOps Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Netlify** | Latest | Frontend hosting and functions |
| **Fly.io/Railway** | Latest | Log engine hosting |
| **GitHub Actions** | Latest | CI/CD |
| **Sentry** | Latest | Error monitoring |
| **Snyk** | Latest | Security scanning |

---

## 6. Migration Strategy

### 6.1 Phase 1: Foundation (Week 1-2)

#### 6.1.1 Repository Setup
- [ ] Create new repository structure
- [ ] Setup monorepo with workspaces
- [ ] Configure development environment
- [ ] Setup CI/CD pipelines

#### 6.1.2 Supabase Setup
- [ ] Create Supabase project
- [ ] Design database schema
- [ ] Implement Row Level Security (RLS)
- [ ] Setup authentication providers

#### 6.1.3 Frontend Foundation
- [ ] Setup React + Vite project
- [ ] Configure TailwindCSS + DaisyUI
- [ ] Implement routing structure
- [ ] Setup Supabase client

### 6.2 Phase 2: Core Features (Week 3-4)

#### 6.2.1 Authentication & Authorization
- [ ] Implement Supabase auth
- [ ] Create protected routes
- [ ] Setup role-based access control
- [ ] Implement user management

#### 6.2.2 Billing Integration
- [ ] Setup Stripe integration
- [ ] Implement subscription management
- [ ] Create pricing pages
- [ ] Setup webhook handlers

#### 6.2.3 Dashboard Migration
- [ ] Migrate dashboard components
- [ ] Implement real-time updates
- [ ] Setup data visualization
- [ ] Create responsive design

### 6.3 Phase 3: Protocol Analysis (Week 5-6)

#### 6.3.1 Log Engine Migration
- [ ] Containerize existing parsers
- [ ] Implement WebSocket streaming
- [ ] Setup fault injection framework
- [ ] Create API endpoints

#### 6.3.2 Analyzer Interface
- [ ] Migrate log viewer components
- [ ] Implement dual-pane layout
- [ ] Setup protocol-specific views
- [ ] Create export functionality

### 6.4 Phase 4: Test Suites (Week 7-8)

#### 6.4.1 Test Case Library
- [ ] Migrate existing test cases
- [ ] Create 3GPP-compliant test cases
- [ ] Implement test execution engine
- [ ] Setup test result storage

#### 6.4.2 Test Management
- [ ] Create test suite browser
- [ ] Implement test execution UI
- [ ] Setup result analysis
- [ ] Create reporting features

### 6.5 Phase 5: Advanced Features (Week 9-10)

#### 6.5.1 Fault Injection
- [ ] Implement fault injection UI
- [ ] Create fault simulation engine
- [ ] Setup fault result analysis
- [ ] Create fault reporting

#### 6.5.2 Admin Features
- [ ] Create admin dashboard
- [ ] Implement user management
- [ ] Setup system monitoring
- [ ] Create analytics dashboard

---

## 7. Development Workflow

### 7.1 Branching Strategy

```
main (production)
├── develop (staging)
├── feat/feature-name (feature branches)
├── fix/bug-description (bug fixes)
└── hotfix/critical-fix (emergency fixes)
```

### 7.2 Development Process

1. **Create Feature Branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/new-feature
   ```

2. **Development**
   ```bash
   # Make changes
   npm run dev          # Start development server
   npm run test         # Run tests
   npm run lint         # Check code quality
   ```

3. **Testing**
   ```bash
   npm run test:unit    # Unit tests
   npm run test:e2e     # End-to-end tests
   npm run test:integration # Integration tests
   ```

4. **Pull Request**
   - Create PR to `develop`
   - Ensure all checks pass
   - Request code review
   - Merge after approval

5. **Deployment**
   - `develop` → Netlify preview
   - `main` → Production deployment

### 7.3 Code Quality Standards

#### 7.3.1 TypeScript
- Strict mode enabled
- No `any` types allowed
- Comprehensive type definitions
- Interface over type when possible

#### 7.3.2 React
- Functional components only
- Custom hooks for logic
- Proper error boundaries
- Accessibility compliance

#### 7.3.3 Testing
- Unit tests for utilities
- Component tests for UI
- Integration tests for APIs
- E2E tests for critical flows

---

## 8. Testing Strategy

### 8.1 Testing Pyramid

```
        E2E Tests (10%)
       ┌─────────────────┐
      │  Critical User   │
      │     Flows        │
     ┌─────────────────────┐
    │   Integration Tests  │
    │        (20%)         │
   ┌─────────────────────────┐
  │      Unit Tests (70%)    │
  │   Components & Utils     │
 └─────────────────────────────┘
```

### 8.2 Test Categories

#### 8.2.1 Unit Tests
- **Location**: `web/src/**/*.test.ts`
- **Framework**: Vitest
- **Coverage**: Components, hooks, utilities
- **Target**: 80%+ coverage

#### 8.2.2 Integration Tests
- **Location**: `web/src/**/*.integration.test.ts`
- **Framework**: Vitest + MSW
- **Coverage**: API interactions, auth flows
- **Target**: Critical paths covered

#### 8.2.3 E2E Tests
- **Location**: `e2e/**/*.spec.ts`
- **Framework**: Playwright
- **Coverage**: User journeys, billing flows
- **Target**: Happy paths + edge cases

### 8.3 Test Data Management

```typescript
// Test data factories
export const createMockUser = (overrides?: Partial<User>) => ({
  id: 'test-user-id',
  email: 'test@example.com',
  role: 'trial',
  ...overrides
});

export const createMockTestCase = (overrides?: Partial<TestCase>) => ({
  id: 'test-case-id',
  title: 'Test Case',
  suite_type: 'functional',
  ...overrides
});
```

---

## 9. Deployment Pipeline

### 9.1 CI/CD Workflows

#### 9.1.1 Lint and Test (`lint-test.yml`)
```yaml
name: Lint and Test
on: [push, pull_request]
jobs:
  lint-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run type-check
```

#### 9.1.2 Deploy Preview (`deploy-preview.yml`)
```yaml
name: Deploy Preview
on:
  pull_request:
    branches: [develop]
jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=web/dist --prod=false
```

#### 9.1.3 Deploy Production (`deploy-prod.yml`)
```yaml
name: Deploy Production
on:
  push:
    branches: [main]
jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=web/dist --prod=true
```

### 9.2 Environment Management

| Environment | Branch | URL | Purpose |
|-------------|--------|-----|---------|
| **Development** | `feat/*` | `https://feat-branch.netlify.app` | Feature testing |
| **Staging** | `develop` | `https://staging.5glabx.com` | Pre-production testing |
| **Production** | `main` | `https://app.5glabx.com` | Live application |

### 9.3 Deployment Checklist

#### 9.3.1 Pre-deployment
- [ ] All tests passing
- [ ] Code review completed
- [ ] Security scan passed
- [ ] Performance benchmarks met
- [ ] Database migrations ready

#### 9.3.2 Deployment
- [ ] Deploy to staging first
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Monitor error rates
- [ ] Verify functionality

#### 9.3.3 Post-deployment
- [ ] Monitor application metrics
- [ ] Check error logs
- [ ] Verify billing integration
- [ ] Test critical user flows
- [ ] Update documentation

---

## 10. Contributing Guidelines

### 10.1 Code Style

#### 10.1.1 TypeScript/React
```typescript
// Use functional components
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<StateType>(initialState);
  
  return (
    <div className="container">
      <h1>{prop1}</h1>
    </div>
  );
};

// Use custom hooks for logic
const useTestExecution = (testCaseId: string) => {
  const [status, setStatus] = useState<ExecutionStatus>('idle');
  
  const execute = useCallback(async () => {
    // Implementation
  }, [testCaseId]);
  
  return { status, execute };
};
```

#### 10.1.2 Naming Conventions
- **Files**: kebab-case (`test-case-execution.ts`)
- **Components**: PascalCase (`TestCaseExecution`)
- **Functions**: camelCase (`executeTestCase`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types**: PascalCase (`TestCase`, `ExecutionResult`)

### 10.2 Commit Messages

```
type(scope): description

feat(auth): add Google OAuth integration
fix(analyzer): resolve RRC parser memory leak
docs(api): update authentication endpoints
test(utils): add test coverage for date helpers
```

### 10.3 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### 10.4 Issue Templates

#### 10.4.1 Bug Report
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior.

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows, macOS, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 1.0.0]
```

#### 10.4.2 Feature Request
```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request.
```

---

## Conclusion

This development document provides a comprehensive guide for transforming the existing 5GLabX desktop application into a modern, cloud-based subscription platform. The migration strategy ensures minimal disruption while leveraging modern web technologies and cloud services.

Key success factors:
- **Incremental migration** - Phased approach reduces risk
- **Modern tooling** - React, TypeScript, and cloud services
- **Comprehensive testing** - Multiple test layers ensure quality
- **Clear processes** - Defined workflows and standards
- **Documentation** - Thorough guides for all stakeholders

The transformation will result in a scalable, maintainable platform that serves the growing demand for cloud-based 5G protocol analysis tools.

---

*Last updated: 2025-01-13*
*Version: 1.1*
*Status: Development Ready*