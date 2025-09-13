# 5GLabX Cloud - Repository Structure

This document defines the complete repository structure for the 5GLabX Cloud platform transformation.

## Repository Layout

```
5glabx-cloud/
├── README.md                     # Project overview and quick start
├── DEVELOPMENT.md                # This development guide
├── package.json                  # Root package.json for monorepo
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variables template
├── netlify.toml                  # Netlify configuration
├── docker-compose.yml            # Local development containers
│
├── web/                          # React frontend application
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.tsx              # Application entry point
│   │   ├── App.tsx               # Root component
│   │   ├── components/           # Reusable UI components
│   │   │   ├── common/          # Shared components
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── LoadingSpinner.tsx
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   └── index.ts
│   │   │   ├── dashboard/       # Dashboard-specific components
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── MetricsCard.tsx
│   │   │   │   ├── SystemStatus.tsx
│   │   │   │   └── index.ts
│   │   │   ├── analyzer/        # Protocol analyzer components
│   │   │   │   ├── LogViewer.tsx
│   │   │   │   ├── ProtocolTree.tsx
│   │   │   │   ├── MessageDetails.tsx
│   │   │   │   ├── CallFlowDiagram.tsx
│   │   │   │   └── index.ts
│   │   │   ├── test-suites/     # Test suite management
│   │   │   │   ├── TestSuiteBrowser.tsx
│   │   │   │   ├── TestCaseCard.tsx
│   │   │   │   ├── TestExecution.tsx
│   │   │   │   ├── TestResults.tsx
│   │   │   │   └── index.ts
│   │   │   ├── auth/            # Authentication components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   ├── AuthGuard.tsx
│   │   │   │   └── index.ts
│   │   │   ├── billing/         # Billing and subscription
│   │   │   │   ├── PricingCard.tsx
│   │   │   │   ├── SubscriptionStatus.tsx
│   │   │   │   ├── BillingPortal.tsx
│   │   │   │   └── index.ts
│   │   │   └── admin/           # Admin panel components
│   │   │       ├── UserManagement.tsx
│   │   │       ├── SystemMetrics.tsx
│   │   │       ├── TestCaseEditor.tsx
│   │   │       └── index.ts
│   │   ├── pages/               # Route components
│   │   │   ├── public/          # Public pages
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── PricingPage.tsx
│   │   │   │   ├── DocsPage.tsx
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── SignupPage.tsx
│   │   │   │   └── index.ts
│   │   │   └── app/             # Protected app pages
│   │   │       ├── DashboardPage.tsx
│   │   │       ├── AnalyzerPage.tsx
│   │   │       ├── TestSuitesPage.tsx
│   │   │       ├── ExecutionsPage.tsx
│   │   │       ├── AccountPage.tsx
│   │   │       ├── AdminPage.tsx
│   │   │       └── index.ts
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useSupabase.ts
│   │   │   ├── useStripe.ts
│   │   │   ├── useTestExecution.ts
│   │   │   ├── useWebSocket.ts
│   │   │   └── index.ts
│   │   ├── lib/                 # Utility libraries
│   │   │   ├── supabase/        # Supabase client and types
│   │   │   │   ├── client.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── stripe/          # Stripe integration
│   │   │   │   ├── client.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── index.ts
│   │   │   ├── utils/           # General utilities
│   │   │   │   ├── date.ts
│   │   │   │   ├── format.ts
│   │   │   │   ├── validation.ts
│   │   │   │   └── index.ts
│   │   │   └── constants/       # Application constants
│   │   │       ├── api.ts
│   │   │       ├── routes.ts
│   │   │       ├── config.ts
│   │   │       └── index.ts
│   │   ├── stores/              # State management
│   │   │   ├── authStore.ts
│   │   │   ├── testStore.ts
│   │   │   ├── uiStore.ts
│   │   │   └── index.ts
│   │   ├── styles/              # Global styles and themes
│   │   │   ├── globals.css
│   │   │   ├── components.css
│   │   │   └── themes.css
│   │   └── types/               # TypeScript type definitions
│   │       ├── auth.ts
│   │       ├── test.ts
│   │       ├── protocol.ts
│   │       ├── api.ts
│   │       └── index.ts
│   ├── public/                  # Static assets
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── images/
│   └── tests/                   # Frontend tests
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── setup.ts
│
├── api/                         # Log-Engine microservice
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── src/
│   │   ├── index.ts             # Application entry point
│   │   ├── app.ts               # Express app configuration
│   │   ├── routes/              # API routes
│   │   │   ├── health.ts
│   │   │   ├── execute.ts
│   │   │   ├── websocket.ts
│   │   │   └── index.ts
│   │   ├── parsers/             # Protocol parsers (migrated from current)
│   │   │   ├── base/           # Base parser classes
│   │   │   │   ├── BaseParser.ts
│   │   │   │   ├── ParserInterface.ts
│   │   │   │   └── index.ts
│   │   │   ├── rrc/            # RRC layer parser
│   │   │   │   ├── RRCParser.ts
│   │   │   │   ├── RRCUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── nas/            # NAS layer parser
│   │   │   │   ├── NASParser.ts
│   │   │   │   ├── NASUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── ngap/           # NGAP parser
│   │   │   │   ├── NGAPParser.ts
│   │   │   │   ├── NGAPUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── sip/            # SIP parser
│   │   │   │   ├── SIPParser.ts
│   │   │   │   ├── SIPUtils.ts
│   │   │   │   └── index.ts
│   │   │   ├── oran/           # O-RAN parsers
│   │   │   │   ├── F1Parser.ts
│   │   │   │   ├── E1Parser.ts
│   │   │   │   ├── E2Parser.ts
│   │   │   │   └── index.ts
│   │   │   ├── nbiot/          # NB-IoT parsers
│   │   │   │   ├── NPRACHParser.ts
│   │   │   │   ├── NPDCCHParser.ts
│   │   │   │   └── index.ts
│   │   │   ├── v2x/            # V2X parsers
│   │   │   │   ├── PC5Parser.ts
│   │   │   │   ├── V2XUtils.ts
│   │   │   │   └── index.ts
│   │   │   └── ntn/            # NTN parsers
│   │   │       ├── NTNParser.ts
│   │   │       ├── NTNUtils.ts
│   │   │       └── index.ts
│   │   ├── fault-injection/     # Fault injection framework
│   │   │   ├── FaultInjector.ts
│   │   │   ├── FaultTypes.ts
│   │   │   ├── FaultConfig.ts
│   │   │   └── index.ts
│   │   ├── test-execution/      # Test case execution engine
│   │   │   ├── TestExecutor.ts
│   │   │   ├── TestRunner.ts
│   │   │   ├── ResultAnalyzer.ts
│   │   │   └── index.ts
│   │   ├── websocket/           # Real-time event streaming
│   │   │   ├── WebSocketServer.ts
│   │   │   ├── EventStreamer.ts
│   │   │   ├── ConnectionManager.ts
│   │   │   └── index.ts
│   │   ├── middleware/          # Express middleware
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   ├── logging.ts
│   │   │   ├── rateLimit.ts
│   │   │   └── index.ts
│   │   ├── utils/               # Utility functions
│   │   │   ├── logger.ts
│   │   │   ├── config.ts
│   │   │   ├── validation.ts
│   │   │   └── index.ts
│   │   └── types/               # TypeScript types
│   │       ├── protocol.ts
│   │       ├── test.ts
│   │       ├── websocket.ts
│   │       └── index.ts
│   └── tests/                   # API tests
│       ├── unit/
│       ├── integration/
│       └── setup.ts
│
├── netlify/                     # Netlify serverless functions
│   └── functions/               # Serverless functions
│       ├── create-checkout.ts   # Stripe checkout creation
│       ├── stripe-webhook.ts    # Stripe webhook handler
│       ├── run-test-case.ts     # Test execution trigger
│       ├── quota-check.ts       # Usage quota validation
│       ├── user-management.ts   # User management functions
│       └── shared/              # Shared function utilities
│           ├── supabase.ts
│           ├── stripe.ts
│           ├── auth.ts
│           └── types.ts
│
├── test-suites/                 # 3GPP test case library
│   ├── functional/              # Functional test cases
│   │   ├── attach/
│   │   ├── detach/
│   │   ├── paging/
│   │   ├── handover/
│   │   └── index.yaml
│   ├── mobility/                # Mobility test cases
│   │   ├── intra-rat/
│   │   ├── inter-rat/
│   │   ├── inter-system/
│   │   └── index.yaml
│   ├── performance/             # Performance test cases
│   │   ├── throughput/
│   │   ├── latency/
│   │   ├── capacity/
│   │   └── index.yaml
│   ├── security/                # Security test cases
│   │   ├── authentication/
│   │   ├── encryption/
│   │   ├── integrity/
│   │   └── index.yaml
│   ├── ims/                     # IMS test cases
│   │   ├── registration/
│   │   ├── call-setup/
│   │   ├── media-negotiation/
│   │   └── index.yaml
│   ├── qos/                     # QoS test cases
│   │   ├── bearer-setup/
│   │   ├── policy-control/
│   │   ├── flow-management/
│   │   └── index.yaml
│   ├── oran/                    # O-RAN test cases
│   │   ├── f1-interface/
│   │   ├── e1-interface/
│   │   ├── e2-interface/
│   │   └── index.yaml
│   ├── nbiot/                   # NB-IoT test cases
│   │   ├── nprach/
│   │   ├── npdcch/
│   │   ├── npdsch/
│   │   └── index.yaml
│   ├── ntn/                     # NTN test cases
│   │   ├── satellite-access/
│   │   ├── handover/
│   │   ├── timing/
│   │   └── index.yaml
│   ├── v2x/                     # V2X test cases
│   │   ├── pc5-sidelink/
│   │   ├── uu-interface/
│   │   ├── safety-messages/
│   │   └── index.yaml
│   ├── regression/              # Regression test suites
│   │   ├── daily/
│   │   ├── weekly/
│   │   ├── release/
│   │   └── index.yaml
│   └── schemas/                 # Test case schemas
│       ├── test-case.schema.json
│       ├── test-step.schema.json
│       └── validation.ts
│
├── infra/                       # Infrastructure configuration
│   ├── supabase/
│   │   ├── migrations/          # Database migrations
│   │   │   ├── 001_initial_schema.sql
│   │   │   ├── 002_auth_tables.sql
│   │   │   ├── 003_test_suites.sql
│   │   │   ├── 004_executions.sql
│   │   │   └── 005_rls_policies.sql
│   │   ├── seed.sql             # Initial data seeding
│   │   ├── functions/           # Edge functions
│   │   │   ├── run-test-case/
│   │   │   │   └── index.ts
│   │   │   ├── quota-check/
│   │   │   │   └── index.ts
│   │   │   └── user-management/
│   │   │       └── index.ts
│   │   └── config.toml          # Supabase configuration
│   ├── scripts/
│   │   ├── seed-test-cases.ts   # Test case seeding script
│   │   ├── migrate-data.ts      # Data migration utilities
│   │   ├── validate-schemas.ts  # Schema validation
│   │   └── deploy.sh            # Deployment script
│   └── docker/
│       └── log-engine/          # Log-engine container config
│           ├── Dockerfile
│           ├── docker-compose.yml
│           └── nginx.conf
│
├── docs/                        # Documentation
│   ├── api/                     # API documentation
│   │   ├── authentication.md
│   │   ├── test-execution.md
│   │   ├── websocket.md
│   │   └── error-codes.md
│   ├── deployment/              # Deployment guides
│   │   ├── local-development.md
│   │   ├── staging-deployment.md
│   │   ├── production-deployment.md
│   │   └── troubleshooting.md
│   ├── user-guides/             # User documentation
│   │   ├── getting-started.md
│   │   ├── protocol-analysis.md
│   │   ├── test-execution.md
│   │   ├── fault-injection.md
│   │   └── admin-guide.md
│   ├── development/             # Development documentation
│   │   ├── architecture.md
│   │   ├── contributing.md
│   │   ├── testing.md
│   │   └── code-style.md
│   └── 3gpp/                    # 3GPP specification references
│       ├── ts-23-501.md
│       ├── ts-23-502.md
│       ├── ts-23-503.md
│       ├── ts-36-331.md
│       ├── ts-38-331.md
│       └── index.md
│
├── .github/                     # GitHub configuration
│   ├── workflows/               # CI/CD workflows
│   │   ├── lint-test.yml        # Linting and testing
│   │   ├── deploy-preview.yml   # Preview deployments
│   │   ├── deploy-prod.yml      # Production deployment
│   │   ├── sync-testcases.yml   # Test case synchronization
│   │   └── security-scan.yml    # Security scanning
│   ├── ISSUE_TEMPLATE/          # Issue templates
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── question.md
│   ├── PULL_REQUEST_TEMPLATE.md # PR template
│   └── CODEOWNERS               # Code ownership
│
├── scripts/                     # Development scripts
│   ├── setup.sh                 # Initial setup script
│   ├── dev.sh                   # Development environment
│   ├── build.sh                 # Build script
│   ├── test.sh                  # Test runner
│   ├── lint.sh                  # Linting script
│   └── deploy.sh                # Deployment script
│
└── tools/                       # Development tools
    ├── eslint/                  # ESLint configuration
    │   ├── .eslintrc.js
    │   └── .eslintignore
    ├── prettier/                # Prettier configuration
    │   ├── .prettierrc
    │   └── .prettierignore
    ├── typescript/              # TypeScript configuration
    │   ├── tsconfig.base.json
    │   └── tsconfig.strict.json
    └── testing/                 # Testing configuration
        ├── vitest.config.ts
        ├── playwright.config.ts
        └── jest.config.js
```

## Key Directories Explained

### `/web/` - Frontend Application
- **React 18 + TypeScript** - Modern frontend framework
- **Vite** - Fast build tool and dev server
- **TailwindCSS + DaisyUI** - Utility-first styling with component library
- **Component-based architecture** - Reusable, maintainable components
- **Protected routes** - Authentication and authorization
- **Real-time updates** - WebSocket integration for live data

### `/api/` - Log Engine Microservice
- **Containerized service** - Docker-based deployment
- **Protocol parsers** - Migrated from existing 5GLabX parsers
- **Fault injection** - Controlled error simulation
- **Test execution** - 3GPP test case runner
- **WebSocket streaming** - Real-time event broadcasting

### `/netlify/functions/` - Serverless Functions
- **Stripe integration** - Billing and subscription management
- **Supabase integration** - Database operations and auth
- **Quota enforcement** - Usage limits and validation
- **Test orchestration** - Coordination between frontend and log engine

### `/test-suites/` - 3GPP Test Library
- **1000+ test cases** - Comprehensive 3GPP coverage
- **YAML format** - Human-readable test definitions
- **Schema validation** - Ensures spec compliance
- **Categorized by type** - Functional, mobility, performance, etc.

### `/infra/` - Infrastructure
- **Supabase setup** - Database schema and migrations
- **Deployment scripts** - Automated deployment tools
- **Docker configuration** - Container orchestration
- **Environment management** - Configuration templates

## Migration Mapping

| Current Component | New Location | Migration Notes |
|------------------|--------------|-----------------|
| `components/` | `web/src/components/` | Convert to React components |
| `services/cli/` | `api/src/parsers/` | Migrate to containerized service |
| `services/backend/` | `netlify/functions/` | Convert to serverless functions |
| `models/` | `web/src/types/` + Supabase schema | Convert to TypeScript types |
| `utils/` | `web/src/lib/utils/` | Modernize and migrate |
| `electron/` | Remove | Replace with web deployment |
| `server.js` | `api/src/app.ts` | Convert to Express microservice |

This structure provides a solid foundation for the 5GLabX Cloud platform while maintaining the existing functionality and adding modern cloud capabilities.