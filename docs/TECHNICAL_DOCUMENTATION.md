# 5GLabX Cloud Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [System Components](#system-components)
3. [Database Schema](#database-schema)
4. [API Reference](#api-reference)
5. [Deployment Guide](#deployment-guide)
6. [Security Implementation](#security-implementation)
7. [Performance Optimization](#performance-optimization)
8. [Monitoring & Observability](#monitoring--observability)
9. [Development Guide](#development-guide)
10. [Troubleshooting](#troubleshooting)

## Architecture Overview

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   Log Engine    │
│   (React/Vite)  │◄──►│   (Netlify)     │◄──►│   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Static    │    │   Supabase      │    │   Redis Cache   │
│   (Netlify)     │    │   (PostgreSQL)  │    │   (Redis)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Stripe        │
                       │   (Billing)     │
                       └─────────────────┘
```

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite, TailwindCSS, DaisyUI
- **Backend**: Node.js, Express.js, Supabase Edge Functions
- **Database**: PostgreSQL (Supabase)
- **Cache**: Redis
- **Authentication**: Supabase Auth
- **Billing**: Stripe
- **Hosting**: Netlify (Frontend), Railway (Log Engine)
- **Monitoring**: Prometheus, Grafana, ELK Stack
- **CI/CD**: GitHub Actions

## System Components

### Frontend Application
**Location**: `/web/`
**Technology**: React 18 + TypeScript + Vite

#### Key Features
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Real-time Updates**: WebSocket integration for live data
- **State Management**: React Query for server state
- **Authentication**: Supabase Auth integration
- **Performance**: Code splitting and lazy loading

#### Component Structure
```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── billing/        # Billing and subscription
│   ├── dashboard/      # Dashboard components
│   ├── execution/      # Test execution
│   ├── protocol/       # Protocol analysis
│   ├── analytics/      # Analytics and reporting
│   ├── enterprise/     # Enterprise features
│   ├── api/           # API management
│   ├── monitoring/    # System monitoring
│   └── layout/        # Layout components
├── pages/
│   ├── public/        # Public pages
│   └── app/          # Protected app pages
├── lib/
│   ├── supabase/     # Supabase client
│   ├── api/          # API clients
│   ├── cache/        # Cache management
│   ├── performance/  # Performance optimization
│   └── websocket/    # WebSocket management
└── hooks/            # Custom React hooks
```

### API Backend
**Location**: `/api/`
**Technology**: Node.js + Express.js

#### Key Features
- **RESTful API**: Standard HTTP endpoints
- **WebSocket Support**: Real-time communication
- **Authentication**: JWT-based auth with Supabase
- **Rate Limiting**: Request throttling and quotas
- **Caching**: Redis-based response caching
- **Security**: Input validation and sanitization

#### API Structure
```
api/
├── src/
│   ├── routes/
│   │   ├── auth.js        # Authentication endpoints
│   │   ├── executions.js  # Test execution management
│   │   ├── test-cases.js  # Test case operations
│   │   ├── analytics.js   # Analytics and reporting
│   │   ├── billing.js     # Billing and subscriptions
│   │   └── admin.js       # Administrative functions
│   ├── middleware/
│   │   ├── auth.js        # Authentication middleware
│   │   ├── validation.js  # Input validation
│   │   ├── rate-limit.js  # Rate limiting
│   │   └── cache.js       # Caching middleware
│   ├── services/
│   │   ├── supabase.js    # Database operations
│   │   ├── stripe.js      # Billing operations
│   │   ├── websocket.js   # WebSocket management
│   │   └── cache.js       # Cache operations
│   └── utils/
│       ├── logger.js      # Logging utilities
│       ├── errors.js      # Error handling
│       └── validation.js  # Validation helpers
```

### Log Engine
**Location**: `/log-engine/`
**Technology**: Node.js + Express.js

#### Key Features
- **Protocol Decoding**: RRC, NAS, NGAP, SIP, O-RAN, etc.
- **Real-time Processing**: Stream processing of protocol messages
- **Fault Injection**: Controlled error simulation
- **Message Correlation**: Cross-layer message tracking
- **Performance Optimization**: High-throughput message processing

#### Engine Structure
```
log-engine/
├── src/
│   ├── decoders/
│   │   ├── rrc.js         # RRC protocol decoder
│   │   ├── nas.js         # NAS protocol decoder
│   │   ├── ngap.js        # NGAP protocol decoder
│   │   ├── sip.js         # SIP protocol decoder
│   │   ├── oran.js        # O-RAN protocol decoder
│   │   └── security.js    # Security protocol decoder
│   ├── processors/
│   │   ├── message.js     # Message processing
│   │   ├── correlation.js # Message correlation
│   │   ├── fault.js       # Fault injection
│   │   └── performance.js # Performance tracking
│   ├── services/
│   │   ├── execution.js   # Test execution service
│   │   ├── streaming.js   # Real-time streaming
│   │   └── storage.js     # Message storage
│   └── utils/
│       ├── parser.js      # Protocol parsing
│       ├── validator.js   # Message validation
│       └── formatter.js   # Output formatting
```

## Database Schema

### Core Tables

#### Users and Authentication
```sql
-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Team management
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES profiles(id),
  role TEXT DEFAULT 'member',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Test Management
```sql
-- Test suites
CREATE TABLE test_suites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  suite_type TEXT NOT NULL,
  threegpp_release TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Test cases
CREATE TABLE test_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suite_id UUID REFERENCES test_suites(id),
  title TEXT NOT NULL,
  description TEXT,
  threegpp_ref TEXT,
  complexity TEXT DEFAULT 'basic',
  expected_duration INTEGER,
  default_parameters JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Test case steps
CREATE TABLE test_case_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID REFERENCES test_cases(id),
  step_number INTEGER NOT NULL,
  description TEXT,
  expected_result TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Execution Management
```sql
-- Executions
CREATE TABLE executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID REFERENCES test_cases(id),
  run_by UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'pending',
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  summary JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Execution steps
CREATE TABLE execution_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id),
  step_number INTEGER NOT NULL,
  status TEXT DEFAULT 'pending',
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  result JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Logs
CREATE TABLE logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id),
  message_type TEXT NOT NULL,
  layer TEXT NOT NULL,
  direction TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  raw_log TEXT,
  parsed_message JSONB,
  correlation_keys JSONB,
  verdict TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Billing and Subscriptions
```sql
-- Plans
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_monthly DECIMAL,
  price_yearly DECIMAL,
  exec_limit INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  plan_id UUID REFERENCES plans(id),
  status TEXT DEFAULT 'active',
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes and Performance
```sql
-- Performance indexes
CREATE INDEX idx_executions_user_id ON executions(run_by);
CREATE INDEX idx_executions_status ON executions(status);
CREATE INDEX idx_logs_execution_id ON logs(execution_id);
CREATE INDEX idx_logs_timestamp ON logs(timestamp);
CREATE INDEX idx_test_cases_suite_id ON test_cases(suite_id);

-- Full-text search
CREATE INDEX idx_test_cases_search ON test_cases USING gin(to_tsvector('english', title || ' ' || description));
```

## API Reference

### Authentication
All API endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Base URL
- **Production**: `https://api.5glabx.com`
- **Staging**: `https://staging-api.5glabx.com`
- **Development**: `http://localhost:3001`

### Endpoints

#### Test Cases
```http
GET /api/v1/test-cases
GET /api/v1/test-cases/:id
GET /api/v1/test-suites
GET /api/v1/test-suites/:id/test-cases
```

#### Executions
```http
POST /api/v1/executions
GET /api/v1/executions
GET /api/v1/executions/:id
PUT /api/v1/executions/:id/cancel
GET /api/v1/executions/:id/results
```

#### Analytics
```http
GET /api/v1/analytics/overview
GET /api/v1/analytics/executions
GET /api/v1/analytics/performance
GET /api/v1/analytics/usage
```

#### Billing
```http
GET /api/v1/billing/subscription
POST /api/v1/billing/create-checkout
POST /api/v1/billing/portal
```

### WebSocket API
```javascript
// Connect to WebSocket
const ws = new WebSocket('wss://api.5glabx.com/ws?token=<jwt_token>');

// Subscribe to execution updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'execution',
  executionId: 'execution-uuid'
}));

// Receive real-time updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Update:', data);
};
```

## Deployment Guide

### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- SSL certificates

### Environment Variables
```bash
# Database
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Authentication
JWT_SECRET=your-jwt-secret

# Billing
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cache
REDIS_URL=redis://localhost:6379

# Log Engine
LOG_ENGINE_URL=http://log-engine:3002
GLOBAL_FAULT_RATE=0.05

# Monitoring
PROMETHEUS_URL=http://prometheus:9090
GRAFANA_URL=http://grafana:3000
```

### Production Deployment

#### 1. Infrastructure Setup
```bash
# Clone repository
git clone https://github.com/5glabx/5glabx-cloud.git
cd 5glabx-cloud

# Configure environment
cp .env.example .env
# Edit .env with production values

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

#### 2. Database Setup
```bash
# Run migrations
supabase db push --project-ref your-project-ref

# Seed initial data
supabase db seed --project-ref your-project-ref
```

#### 3. SSL Configuration
```bash
# Generate SSL certificates
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/key.pem \
  -out nginx/ssl/cert.pem

# Update nginx configuration
# Edit nginx/nginx.conf with your domain
```

#### 4. Monitoring Setup
```bash
# Configure Prometheus
# Edit monitoring/prometheus.yml

# Configure Grafana
# Import dashboards from monitoring/grafana/dashboards/

# Start monitoring stack
docker-compose -f docker-compose.monitoring.yml up -d
```

### CI/CD Pipeline
The deployment pipeline includes:
1. **Security Scanning**: Snyk, OWASP ZAP
2. **Quality Checks**: ESLint, TypeScript, Tests
3. **Build**: Frontend and backend compilation
4. **Deploy**: Automated deployment to production
5. **Health Checks**: Post-deployment verification
6. **Notifications**: Slack and email alerts

## Security Implementation

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Granular permission system
- **Multi-Factor Auth**: TOTP and SMS support
- **Session Management**: Secure session handling

### Data Protection
- **Encryption at Rest**: AES-256 encryption for sensitive data
- **Encryption in Transit**: TLS 1.3 for all communications
- **Input Validation**: Comprehensive input sanitization
- **Output Encoding**: XSS protection

### Network Security
- **Firewall Rules**: Restrictive ingress/egress rules
- **DDoS Protection**: Cloudflare integration
- **Rate Limiting**: API and authentication rate limits
- **IP Whitelisting**: Optional IP-based access control

### Compliance
- **GDPR**: Data subject rights and privacy controls
- **SOC 2**: Security and availability controls
- **ISO 27001**: Information security management
- **Audit Logging**: Comprehensive activity tracking

## Performance Optimization

### Caching Strategy
- **Redis Cache**: Multi-layer caching system
- **CDN**: Static asset delivery via Netlify
- **Browser Cache**: Optimized cache headers
- **Database Indexing**: Strategic index placement

### Code Optimization
- **Bundle Splitting**: Dynamic imports and code splitting
- **Tree Shaking**: Dead code elimination
- **Compression**: Gzip and Brotli compression
- **Lazy Loading**: On-demand component loading

### Database Optimization
- **Connection Pooling**: Efficient database connections
- **Query Optimization**: Optimized SQL queries
- **Read Replicas**: Read scaling for analytics
- **Partitioning**: Large table partitioning

### Monitoring & Alerting
- **Performance Metrics**: Response time and throughput
- **Resource Monitoring**: CPU, memory, disk usage
- **Error Tracking**: Comprehensive error monitoring
- **Alert Management**: Proactive issue detection

## Monitoring & Observability

### Metrics Collection
- **Application Metrics**: Custom business metrics
- **System Metrics**: Infrastructure monitoring
- **User Metrics**: Usage and engagement tracking
- **Performance Metrics**: Response times and throughput

### Logging
- **Structured Logging**: JSON-formatted logs
- **Centralized Logging**: ELK stack integration
- **Log Aggregation**: Real-time log processing
- **Log Retention**: Configurable retention policies

### Alerting
- **Threshold-Based**: Performance and error alerts
- **Anomaly Detection**: ML-based anomaly detection
- **Escalation Policies**: Multi-level alert escalation
- **Notification Channels**: Email, Slack, PagerDuty

### Dashboards
- **Grafana Dashboards**: Real-time system monitoring
- **Business Dashboards**: User and usage analytics
- **Performance Dashboards**: System performance metrics
- **Security Dashboards**: Security event monitoring

## Development Guide

### Local Development Setup
```bash
# Install dependencies
npm install

# Start development services
docker-compose up -d

# Start frontend
cd web && npm run dev

# Start API
cd api && npm run dev

# Start log engine
cd log-engine && npm run dev
```

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### Testing
- **Unit Tests**: Jest for component testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for user flows
- **Performance Tests**: Load testing with Artillery

### Git Workflow
- **Feature Branches**: Feature-based development
- **Pull Requests**: Code review process
- **Automated Testing**: CI/CD pipeline integration
- **Deployment**: Automated deployment on merge

## Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check database connectivity
psql -h localhost -U postgres -d 5glabx

# Verify connection pool
SELECT * FROM pg_stat_activity;

# Check database logs
docker logs 5glabx-postgres
```

#### Cache Issues
```bash
# Check Redis connectivity
redis-cli ping

# Monitor Redis performance
redis-cli --stat

# Clear cache if needed
redis-cli flushall
```

#### Performance Issues
```bash
# Check system resources
docker stats

# Monitor application logs
docker logs 5glabx-api

# Check database performance
SELECT * FROM pg_stat_statements;
```

### Debugging Tools
- **Browser DevTools**: Frontend debugging
- **Node.js Inspector**: Backend debugging
- **Database Query Analyzer**: SQL performance analysis
- **Network Monitoring**: API call analysis

### Support Resources
- **Documentation**: Comprehensive guides and references
- **Community Forum**: User community support
- **Issue Tracker**: GitHub issues for bug reports
- **Professional Support**: Enterprise support options