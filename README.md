# 5GLabX Cloud

**Professional 4G/5G Protocol Analysis Platform**

A cloud-native, subscription-based protocol analyzer with 1000+ 3GPP test cases, real-time monitoring, and enterprise-grade security.

## 🚀 Features

- **Real-time Protocol Analysis**: Live 4G/5G protocol monitoring with instant insights
- **1000+ 3GPP Test Cases**: Comprehensive test suite covering all protocol layers
- **Enterprise Security**: Bank-grade security with role-based access control
- **Advanced Analytics**: AI-powered insights and performance optimization
- **Multi-Protocol Support**: RRC, NAS, S1AP, NGAP, SIP, DIAMETER, O-RAN, NB-IoT, NTN, V2X
- **Fault Injection**: Controlled error simulation for testing
- **Team Collaboration**: Real-time collaboration and sharing capabilities

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** + **DaisyUI** for styling
- **React Query** for state management
- **React Router** for navigation

### Backend
- **Supabase** for database and authentication
- **Netlify Functions** for serverless API
- **PostgreSQL** with Row Level Security
- **Real-time subscriptions** for live updates

### Infrastructure
- **Netlify** for hosting and CDN
- **GitHub Actions** for CI/CD
- **Docker** for containerization
- **Monitoring** with built-in analytics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Netlify account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chiranjeevitrailers/RFSimulator1.git
   cd RFSimulator1
   ```

2. **Install dependencies**
   ```bash
   cd web
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL migrations in order:
     ```sql
     -- Run these files in the Supabase SQL editor:
     -- 1. supabase/migrations/001_initial_schema.sql
     -- 2. supabase/migrations/002_rls_policies.sql
     -- 3. supabase/migrations/003_auth_setup.sql
     -- 4. supabase/migrations/004_simple_auth.sql
     -- 5. supabase/migrations/005_comprehensive_protocol_schema.sql
     -- 6. supabase/migrations/006_protocol_data_seed.sql
     -- 7. supabase/migrations/007_comprehensive_test_cases.sql
     ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Admin login: `admin` / `admin123`
   - Create user accounts through the signup page

## 📁 Project Structure

```
5GLabX-Cloud/
├── web/                          # Frontend application
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── lib/                 # Utilities and configurations
│   │   ├── hooks/               # Custom React hooks
│   │   └── types/               # TypeScript type definitions
│   ├── public/                  # Static assets
│   └── package.json
├── netlify/                     # Netlify functions
│   └── functions/               # Serverless functions
├── supabase/                    # Database migrations
│   └── migrations/              # SQL migration files
├── .github/                     # GitHub Actions workflows
├── netlify.toml                 # Netlify configuration
└── README.md
```

## 🗄️ Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- **User Management**: Admin credentials and user accounts
- **Test Suites**: Organized test case collections
- **Protocol Specifications**: 3GPP-compliant message definitions
- **Test Cases**: 1000+ ready-to-execute test scenarios
- **Execution Logs**: Detailed test execution tracking
- **Performance Metrics**: Comprehensive analytics data

## 🔐 Authentication

### Admin Access
- **Username**: `admin`
- **Password**: `admin123`
- Access to user management and system administration

### User Access
- Self-registration through signup page
- Email-based authentication
- Role-based access control

## 🚀 Deployment

### Netlify Deployment
1. **Connect GitHub repository** to Netlify
2. **Set environment variables** in Netlify dashboard
3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `web/dist`
   - Functions directory: `netlify/functions`

### Environment Variables
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_APP_ENV=production
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# Test with UI
npm run test:ui

# Coverage report
npm run test:coverage
```

### Test Cases
The platform includes 1000+ test cases covering:
- **Functional Tests**: Basic protocol procedures
- **Mobility Tests**: Handover and mobility management
- **Performance Tests**: KPI validation and optimization
- **Security Tests**: Authentication and encryption
- **Specialized Tests**: O-RAN, NB-IoT, NTN, V2X

## 📊 Monitoring

### Built-in Analytics
- User activity tracking
- Test execution metrics
- Performance monitoring
- Error tracking and reporting

### Logs
- Application logs
- API request logs
- Database query logs
- Security audit logs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/chiranjeevitrailers/RFSimulator1/issues)
- **Discussions**: [GitHub Discussions](https://github.com/chiranjeevitrailers/RFSimulator1/discussions)

## 🏆 Acknowledgments

- **3GPP** for protocol specifications
- **Supabase** for backend infrastructure
- **Netlify** for hosting and deployment
- **React** and **Vite** communities

---

**5GLabX Cloud** - The industry's most comprehensive 4G/5G protocol analysis platform.

Built with ❤️ for the telecom industry.