# 5GLabX Cloud

> Professional 4G/5G Protocol Analysis Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🚀 Overview

5GLabX Cloud is a hardware-free, browser-based 4G/5G protocol analyzer with 1000+ 3GPP test cases. It provides professional-grade protocol analysis capabilities without the need for expensive hardware equipment.

### ✨ Key Features

- **🔬 Professional Protocol Analysis**: Analyze RRC, NAS, NGAP, SIP, O-RAN, NB-IoT, NTN, and V2X protocols
- **📊 1000+ Test Cases**: Comprehensive 3GPP-compliant test suite library
- **🌐 Browser-Based**: No hardware required - access from anywhere
- **⚡ Real-Time Analysis**: Live protocol log streaming and analysis
- **🔧 Fault Simulation**: Test your systems with realistic fault injection
- **👥 Collaboration**: Real-time team collaboration features
- **📈 Analytics**: Advanced KPI monitoring and performance metrics
- **🔒 Enterprise Security**: SOC 2 compliant with enterprise-grade security

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Netlify       │    │   Supabase      │
│   (React/Vite)  │◄──►│   Functions     │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Backend   │    │   Stripe        │    │   Redis         │
│   (Node.js)     │◄──►│   (Billing)     │    │   (Cache)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** + **DaisyUI** for styling
- **React Query** for data fetching
- **React Router** for navigation
- **Zustand** for state management

### Backend
- **Node.js** with Express and TypeScript
- **WebSocket** for real-time communication
- **Supabase** for database and authentication
- **Stripe** for billing and subscriptions
- **Netlify Functions** for serverless functions

### Infrastructure
- **Netlify** for frontend hosting
- **Railway/Fly.io** for API hosting
- **Supabase** for database and auth
- **Docker** for containerization
- **GitHub Actions** for CI/CD

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker and Docker Compose
- Supabase CLI (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/5glabx-cloud.git
cd 5glabx-cloud
```

### 2. Run Setup Script

```bash
./scripts/dev-setup.sh
```

This will:
- Install all dependencies
- Set up environment files
- Configure development environment
- Set up Git hooks

### 3. Configure Environment Variables

Update the following files with your actual values:

- `.env` - Root environment variables
- `web/.env` - Frontend environment variables  
- `api/.env` - Backend environment variables

Required variables:
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### 4. Start Development Environment

```bash
./scripts/start-dev.sh
```

This will start:
- Frontend: http://localhost:5173
- API: http://localhost:3001
- Supabase: http://localhost:54321
- Monitoring: http://localhost:3000

## 📁 Project Structure

```
5glabx-cloud/
├── web/                    # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── api/                    # Node.js API backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── websocket/      # WebSocket handlers
│   │   └── utils/          # Utility functions
│   └── package.json
├── netlify/
│   └── functions/          # Netlify serverless functions
├── supabase/
│   ├── migrations/         # Database migrations
│   ├── seed.sql           # Seed data
│   └── config.toml        # Supabase configuration
├── test-suites/           # 3GPP test case library
├── scripts/               # Development scripts
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
└── docker-compose.yml     # Local development environment
```

## 🧪 Development

### Available Scripts

```bash
# Root level
npm run lint              # Lint all projects
npm run test              # Test all projects
npm run type-check        # Type check all projects

# Frontend (web/)
npm run dev               # Start development server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Lint frontend code
npm run test              # Run frontend tests

# Backend (api/)
npm run dev               # Start development server
npm run build             # Build for production
npm run start             # Start production server
npm run lint              # Lint backend code
npm run test              # Run backend tests
```

### Database Management

```bash
# Start Supabase locally
supabase start

# Push schema changes
supabase db push

# Seed database
supabase db seed

# Reset database
supabase db reset
```

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🧪 Testing

### Frontend Testing
```bash
cd web
npm run test              # Run unit tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage
```

### Backend Testing
```bash
cd api
npm run test              # Run unit tests
npm run test:ui           # Run tests with UI
npm run test:coverage     # Run tests with coverage
```

## 🚀 Deployment

### Production Deployment

The application is automatically deployed to production when changes are pushed to the `main` branch.

### Manual Deployment

```bash
# Deploy frontend to Netlify
netlify deploy --prod

# Deploy API to Railway
railway deploy

# Deploy API to Fly.io
flyctl deploy
```

### Environment Variables

Set the following environment variables in your deployment platform:

**Netlify:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

**Railway/Fly.io:**
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## 📚 Documentation

- [Development Guide](./DEVELOPMENT.md)
- [Migration Plan](./MIGRATION_PLAN.md)
- [Protocol Analysis Architecture](./PROTOCOL_ANALYSIS_ARCHITECTURE.md)
- [API Documentation](./docs/api.md)
- [Test Suite Library](./docs/test-suites.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all CI checks pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@5glabx.com
- 💬 Discord: [Join our community](https://discord.gg/5glabx)
- 📖 Documentation: [docs.5glabx.com](https://docs.5glabx.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/5glabx-cloud/issues)

## 🙏 Acknowledgments

- 3GPP for protocol specifications
- Supabase for the amazing backend platform
- Netlify for hosting and serverless functions
- The open-source community for inspiration

---

**Built with ❤️ by the 5GLabX Team**