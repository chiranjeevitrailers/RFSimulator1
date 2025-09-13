# 5GLabX Cloud - Subscription-Based 4G/5G Protocol Analyzer & 3GPP Test-Suite Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

## 🚀 Overview

5GLabX Cloud is a professional-grade, cloud-native 4G/5G protocol analyzer and 3GPP test suite platform. It provides a comprehensive solution for protocol analysis, test execution, and real-time monitoring of 4G/5G networks, including specialized support for O-RAN, NB-IoT, NTN, V2X, and IMS protocols.

### ✨ Key Features

- **🔬 Professional Protocol Analysis**: Industry-standard dual-pane log viewer with real-time message correlation
- **📚 Comprehensive Test Suite**: 1000+ 3GPP-compliant test cases across all major protocol categories
- **⚡ Real-time Execution**: Live protocol analysis with WebSocket streaming and fault injection
- **👥 Team Collaboration**: Enterprise-grade team management with role-based access control
- **📊 Advanced Analytics**: AI-powered insights and comprehensive performance reporting
- **🔌 API Integration**: Complete REST API and webhook system for third-party integrations
- **🛡️ Enterprise Security**: SOC 2, ISO 27001, and GDPR compliant with comprehensive audit logging
- **☁️ Cloud-Native**: Scalable, subscription-based platform with 99.9% uptime SLA

## 🏗️ Architecture

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

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **TailwindCSS + DaisyUI** for modern, responsive UI
- **React Query** for efficient server state management
- **WebSocket** integration for real-time updates

### Backend
- **Node.js + Express.js** for API services
- **Supabase** for database, authentication, and real-time features
- **Redis** for high-performance caching
- **Stripe** for subscription billing and payments

### Infrastructure
- **Netlify** for frontend hosting and serverless functions
- **Railway** for containerized backend services
- **Docker** for containerization and deployment
- **Nginx** for reverse proxy and load balancing

### Monitoring & Security
- **Prometheus + Grafana** for metrics and monitoring
- **ELK Stack** for centralized logging
- **Security scanning** with Snyk and OWASP ZAP
- **Comprehensive audit logging** for compliance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/5glabx/5glabx-cloud.git
   cd 5glabx-cloud
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development services**
   ```bash
   # Start infrastructure services
   docker-compose up -d

   # Start frontend development server
   cd web && npm run dev

   # Start API development server
   cd api && npm run dev

   # Start log engine
   cd log-engine && npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:3001
   - Log Engine: http://localhost:3002

### Production Deployment

1. **Configure production environment**
   ```bash
   # Set production environment variables
   export NODE_ENV=production
   export SUPABASE_URL=your-production-url
   export STRIPE_SECRET_KEY=your-stripe-key
   ```

2. **Deploy using Docker Compose**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Run database migrations**
   ```bash
   supabase db push --project-ref your-project-ref
   ```

## 📚 Documentation

- **[User Guide](docs/USER_GUIDE.md)** - Comprehensive user documentation
- **[Technical Documentation](docs/TECHNICAL_DOCUMENTATION.md)** - Developer and system documentation
- **[API Reference](docs/API_REFERENCE.md)** - Complete API documentation
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Production deployment instructions

## 🧪 Test Suite Categories

### Core Protocols
- **RRC** - Radio Resource Control procedures
- **NAS** - Non-Access Stratum protocols
- **S1AP/NGAP** - Core network interfaces
- **SIP** - Session Initiation Protocol

### Specialized Technologies
- **O-RAN** - Open RAN procedures (E2AP, O1, A1, E1, F1)
- **NB-IoT** - Narrowband IoT optimizations
- **NTN** - Non-terrestrial network procedures
- **V2X** - Vehicle-to-everything communications
- **IMS** - IP Multimedia Subsystem (VoLTE, VoWiFi)
- **Security** - 5G-AKA, EAP-AKA, SUPI/SUCI procedures

### Test Categories
- **Functional** - Basic protocol procedures
- **Mobility** - Handover and mobility management
- **Performance** - KPI validation and optimization
- **Security** - Authentication and encryption
- **Fault Injection** - Error simulation and testing

## 💰 Subscription Plans

### Trial Plan (Free)
- 10 test executions per month
- Basic protocol analysis
- Community support
- 7-day trial period

### Pro Plan ($99/month)
- 1,000 test executions per month
- Advanced analytics and reporting
- API access and webhooks
- Priority support
- Team collaboration (up to 5 members)

### Enterprise Plan ($499/month)
- Unlimited test executions
- Custom test case development
- Advanced security features
- 24/7 dedicated support
- Unlimited team members
- On-premise deployment options
- Custom integrations

## 🔒 Security & Compliance

- **SOC 2 Type II** compliant
- **ISO 27001** certified
- **GDPR** compliant with data subject rights
- **CCPA** compliant for California residents
- **Multi-factor authentication** support
- **Role-based access control** (RBAC)
- **Comprehensive audit logging**
- **End-to-end encryption**

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Comprehensive test coverage

## 📞 Support

- **Documentation**: [docs.5glabx.com](https://docs.5glabx.com)
- **Community Forum**: [community.5glabx.com](https://community.5glabx.com)
- **Email Support**: support@5glabx.com
- **Enterprise Support**: enterprise@5glabx.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- 3GPP for protocol specifications
- Open source community for foundational technologies
- Our beta users for valuable feedback
- Industry partners for collaboration and support

## 🔗 Links

- **Website**: [5glabx.com](https://5glabx.com)
- **Documentation**: [docs.5glabx.com](https://docs.5glabx.com)
- **API Reference**: [api.5glabx.com](https://api.5glabx.com)
- **Status Page**: [status.5glabx.com](https://status.5glabx.com)

---

**Built with ❤️ for the 5G community**