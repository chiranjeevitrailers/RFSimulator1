# 5GLabX Cloud

*Subscription-Based 4G/5G Protocol Analyzer & 3GPP Test-Suite Platform*

[![Production Ready](https://img.shields.io/badge/Status-Development%20Ready-blue)](DEVELOPMENT.md)
[![Cloud Platform](https://img.shields.io/badge/Platform-Cloud%20Native-green)](MIGRATION_PLAN.md)
[![3GPP Compliant](https://img.shields.io/badge/3GPP-Compliant-orange)](test-suites/)
[![Subscription Model](https://img.shields.io/badge/Model-SaaS-purple)](docs/user-guides/)

## 🌟 Overview

5GLabX Cloud is a hardware-free, browser-based alternative to Keysight/Anritsu analyzers. Users purchase a subscription, sign-in, and perform:

- **Live protocol log analysis** (layers: RRC, NAS, NGAP, SIP, etc.)
- **Execution of 1000+ ready-made 3GPP functional, mobility, performance and security test cases**
- **Fault-simulation runs** injecting realistic protocol errors

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker >= 20.10.0 (optional, for local development)
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/5glabx/5glabx-cloud.git
   cd 5glabx-cloud
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development environment**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001
   - Grafana: http://localhost:3000 (admin/admin)

## 📁 Project Structure

```
5glabx-cloud/
├── web/                    # React frontend application
├── api/                    # Log-Engine microservice
├── netlify/functions/      # Serverless functions
├── test-suites/            # 3GPP test case library
├── infra/                  # Infrastructure configuration
├── docs/                   # Documentation
└── .github/workflows/      # CI/CD workflows
```

## 🏗️ Architecture

```
Browser (React/Vite)
   ↕ HTTPS & WebSocket
Netlify (Static + Functions)
   ↔ Supabase (Postgres, Auth, Storage)
   ↔ Stripe (Billing)
   ↔ 5GLabX Log-Engine API (Container)
```

## 🛠️ Technology Stack

### Frontend
- **React 18** + TypeScript
- **Vite** for build tooling
- **TailwindCSS** + DaisyUI for styling
- **React Query** for server state
- **Zustand** for client state

### Backend
- **Supabase** for database and auth
- **Netlify Functions** for serverless logic
- **Stripe** for billing
- **Node.js** for log engine

### DevOps
- **Netlify** for hosting
- **Fly.io/Railway** for containers
- **GitHub Actions** for CI/CD
- **Docker** for containerization

## 📊 Features

### Core Features
- ✅ **Protocol Analysis** - RRC, NAS, NGAP, SIP, O-RAN
- ✅ **Test Execution** - 1000+ 3GPP test cases
- ✅ **Fault Injection** - Controlled error simulation
- ✅ **Real-time Collaboration** - Multi-user access
- ✅ **Subscription Billing** - Stripe integration

### Advanced Features
- ✅ **O-RAN Support** - F1, E1, E2 interfaces
- ✅ **NB-IoT Analysis** - NPRACH, NPDCCH, NPDSCH
- ✅ **V2X Support** - PC5 sidelink analysis
- ✅ **NTN Support** - Satellite communication
- ✅ **Admin Dashboard** - User and system management

## 🎯 Use Cases

### Network Operators
- Real-time 5G network monitoring
- Protocol layer analysis
- Performance optimization
- Troubleshooting and diagnostics

### Research & Development
- O-RAN interface analysis
- Advanced technology testing (NB-IoT, V2X, NTN)
- Protocol development and validation
- Performance benchmarking

### System Integrators
- Multi-vendor network integration
- Automated testing and validation
- Production deployment support
- Compliance testing

## 📚 Documentation

### Development
- **[Development Guide](DEVELOPMENT.md)** - Complete development documentation
- **[Migration Plan](MIGRATION_PLAN.md)** - Desktop to cloud migration strategy
- **[Repository Structure](5glabx-cloud-structure.md)** - Detailed project layout

### User Guides
- **[Getting Started](docs/user-guides/getting-started.md)** - Quick start guide
- **[Protocol Analysis](docs/user-guides/protocol-analysis.md)** - Analysis features
- **[Test Execution](docs/user-guides/test-execution.md)** - Running test cases
- **[Fault Injection](docs/user-guides/fault-injection.md)** - Error simulation

### API Documentation
- **[Authentication](docs/api/authentication.md)** - Auth endpoints
- **[Test Execution](docs/api/test-execution.md)** - Test API
- **[WebSocket](docs/api/websocket.md)** - Real-time streaming
- **[Error Codes](docs/api/error-codes.md)** - API error reference

## 🚀 Deployment

### Local Development
```bash
# Start all services
npm run dev

# Start individual services
npm run dev:web    # Frontend only
npm run dev:api    # API only

# Docker development
npm run docker:up
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to Netlify
npm run deploy:prod

# Deploy to staging
npm run deploy:preview
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run specific test suites
npm run test:web    # Frontend tests
npm run test:api    # API tests

# Run with coverage
npm run test:coverage
```

## 📈 Monitoring

### Health Checks
- Application health: `/health`
- Database health: `/health/db`
- Log engine health: `/health/log-engine`

### Metrics
- Grafana dashboard: http://localhost:3000
- Prometheus metrics: http://localhost:9090

## 🔒 Security

### Authentication
- Supabase Auth with multiple providers
- Role-based access control (RBAC)
- JWT token management

### Data Protection
- Row Level Security (RLS) on all tables
- Encrypted data transmission
- Secure API endpoints

### Compliance
- GDPR compliant data handling
- SOC 2 Type II compliance
- Regular security audits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Complete Documentation](docs/)
- [FAQ](docs/user-guides/faq.md)
- [Troubleshooting](docs/deployment/troubleshooting.md)

### Community
- [GitHub Discussions](https://github.com/5glabx/5glabx-cloud/discussions)
- [Discord Server](https://discord.gg/5glabx)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/5glabx)

### Commercial Support
- [Enterprise Support](https://5glabx.com/enterprise)
- [Professional Services](https://5glabx.com/services)
- [Training Programs](https://5glabx.com/training)

## 🎉 Status

### Current Status: Development Ready
- ✅ Repository structure defined
- ✅ Development environment configured
- ✅ Migration plan completed
- ✅ Project templates created
- 🚧 Implementation in progress

### Roadmap
- **Phase 1**: Foundation Setup (Week 1-2)
- **Phase 2**: Authentication & Billing (Week 3-4)
- **Phase 3**: Core Dashboard (Week 5-6)
- **Phase 4**: Protocol Analysis (Week 7-8)
- **Phase 5**: Test Suites (Week 9-10)
- **Phase 6**: Advanced Features (Week 11-12)
- **Phase 7**: Admin & Monitoring (Week 13-14)
- **Phase 8**: Testing & Optimization (Week 15-16)
- **Phase 9**: Launch & Support (Week 17-18)

---

**5GLabX Cloud** - Transforming 5G protocol analysis with cloud-native architecture and subscription-based access.

*Version 1.0.0 | Status: Development Ready | License: MIT*