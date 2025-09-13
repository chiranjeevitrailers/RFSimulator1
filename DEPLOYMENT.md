# 5GLabX Cloud - Netlify Deployment Guide

This guide provides step-by-step instructions for deploying the 5GLabX Cloud platform to Netlify.

## 🚀 Quick Start

### Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **Supabase Project**: Set up your Supabase project
3. **GitHub Repository**: Push your code to GitHub
4. **Node.js 18+**: For local development

### 1. Supabase Setup

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your project URL and anon key
3. Run the SQL migrations in the Supabase SQL editor:

```sql
-- Run these files in order:
-- 1. supabase/migrations/001_initial_schema.sql
-- 2. supabase/migrations/002_rls_policies.sql
-- 3. supabase/migrations/003_auth_setup.sql
-- 4. supabase/migrations/004_simple_auth.sql
-- 5. supabase/migrations/005_comprehensive_protocol_schema.sql
-- 6. supabase/migrations/006_protocol_data_seed.sql
-- 7. supabase/migrations/007_comprehensive_test_cases.sql
```

### 2. Environment Variables

#### In Netlify Dashboard:
1. Go to Site Settings → Environment Variables
2. Add the following variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Application
VITE_APP_TITLE=5GLabX Cloud
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production

# API Configuration
VITE_API_BASE_URL=https://your-site.netlify.app/.netlify/functions

# Feature Flags
VITE_ENABLE_DEVTOOLS=false
VITE_ENABLE_ANALYTICS=true
```

### 3. Deploy to Netlify

#### Option A: GitHub Integration (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `web/dist`
   - **Functions directory**: `netlify/functions`
3. Deploy automatically on every push to main

#### Option B: Manual Deploy
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 4. Domain Configuration

#### Custom Domain (Optional)
1. Go to Site Settings → Domain Management
2. Add your custom domain
3. Configure DNS settings as instructed
4. Enable HTTPS (automatic with Netlify)

## 🔧 Configuration Files

### netlify.toml
The main configuration file includes:
- Build settings and environment variables
- Redirect rules for SPA routing
- Security headers and CSP
- Cache policies for static assets
- Edge Functions configuration

### Build Scripts
```json
{
  "build": "tsc && vite build",
  "build:production": "NODE_ENV=production tsc && vite build --mode production",
  "build:preview": "NODE_ENV=preview tsc && vite build --mode preview",
  "netlify:dev": "netlify dev",
  "netlify:deploy": "netlify deploy --prod"
}
```

### Vite Configuration
- Optimized build settings
- Code splitting for better performance
- Environment variable handling
- Proxy configuration for local development

## 🛡️ Security Features

### Headers Configuration
- **X-Frame-Options**: DENY
- **X-Content-Type-Options**: nosniff
- **X-XSS-Protection**: 1; mode=block
- **Content Security Policy**: Comprehensive CSP rules
- **Referrer Policy**: strict-origin-when-cross-origin

### CORS Configuration
- Proper CORS headers for API endpoints
- Preflight request handling
- Secure cross-origin resource sharing

## 📊 Performance Optimization

### Caching Strategy
- **Static Assets**: 1 year cache with immutable flag
- **Images**: 1 year cache
- **HTML**: No cache for fresh content
- **API Responses**: Appropriate cache headers

### Code Splitting
- Vendor chunks for better caching
- Route-based code splitting
- Lazy loading for components

### Build Optimization
- Tree shaking for unused code
- Minification and compression
- Source maps for production debugging

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests
- **Branch**: Deploys from feature branches

### Build Process
1. Install dependencies
2. Run type checking
3. Run linting
4. Build application
5. Deploy to Netlify

## 🧪 Testing

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test Netlify functions locally
npm run netlify:dev
```

### Production Testing
1. Deploy to preview branch
2. Test all functionality
3. Verify environment variables
4. Check API endpoints
5. Test authentication flow

## 📈 Monitoring

### Analytics
- Netlify Analytics (built-in)
- Custom event tracking
- Performance monitoring
- Error tracking

### Logs
- Function logs in Netlify dashboard
- Build logs for debugging
- Runtime error tracking

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check for TypeScript errors
- Review build logs

#### Environment Variables
- Ensure all required variables are set
- Check variable names (case-sensitive)
- Verify Supabase credentials

#### API Issues
- Check function logs
- Verify Supabase connection
- Test endpoints manually
- Review CORS configuration

#### Authentication Problems
- Verify Supabase RLS policies
- Check admin credentials in database
- Review authentication flow
- Test with different user types

### Debug Commands
```bash
# Check build locally
npm run build

# Test functions locally
netlify functions:serve

# Check environment variables
netlify env:list

# View deployment logs
netlify logs
```

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 🆘 Support

For deployment issues:
1. Check the troubleshooting section
2. Review Netlify build logs
3. Verify environment configuration
4. Test locally with `netlify dev`

For application issues:
1. Check browser console for errors
2. Verify Supabase connection
3. Review API endpoint responses
4. Test authentication flow

---

**5GLabX Cloud** - Professional 4G/5G Protocol Analysis Platform