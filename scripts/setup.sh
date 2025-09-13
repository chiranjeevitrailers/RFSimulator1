#!/bin/bash

# 5GLabX Cloud Setup Script
set -e

echo "🚀 Setting up 5GLabX Cloud development environment..."

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    echo "✅ All requirements are met!"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Install root dependencies
    npm install
    
    # Install web dependencies
    cd web
    npm install
    cd ..
    
    # Install API dependencies
    cd api
    npm install
    cd ..
    
    echo "✅ Dependencies installed successfully!"
}

# Setup environment variables
setup_env() {
    echo "🔧 Setting up environment variables..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "📝 Created .env file from .env.example"
        echo "⚠️  Please update .env with your actual values:"
        echo "   - SUPABASE_URL"
        echo "   - SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_KEY"
        echo "   - STRIPE_SECRET_KEY"
        echo "   - STRIPE_WEBHOOK_SECRET"
    else
        echo "✅ .env file already exists"
    fi
}

# Setup Supabase
setup_supabase() {
    echo "🗄️  Setting up Supabase..."
    
    if command -v supabase &> /dev/null; then
        echo "📋 Supabase CLI found. You can run:"
        echo "   supabase start"
        echo "   supabase db push"
        echo "   supabase db seed"
    else
        echo "⚠️  Supabase CLI not found. Please install it for local development:"
        echo "   npm install -g supabase"
    fi
}

# Setup Docker
setup_docker() {
    echo "🐳 Setting up Docker environment..."
    
    # Create necessary directories
    mkdir -p nginx/ssl
    mkdir -p monitoring/grafana/dashboards
    mkdir -p monitoring/grafana/datasources
    
    echo "✅ Docker environment ready!"
    echo "📋 To start the development environment, run:"
    echo "   docker-compose up -d"
}

# Setup Git hooks
setup_git_hooks() {
    echo "🔗 Setting up Git hooks..."
    
    # Create pre-commit hook
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Run linting
npm run lint

# Run type checking
npm run type-check

echo "✅ Pre-commit checks passed!"
EOF
    
    chmod +x .git/hooks/pre-commit
    
    echo "✅ Git hooks configured!"
}

# Main setup function
main() {
    echo "🎯 Starting 5GLabX Cloud setup..."
    
    check_requirements
    install_dependencies
    setup_env
    setup_supabase
    setup_docker
    setup_git_hooks
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update .env with your actual values"
    echo "2. Start Supabase: supabase start"
    echo "3. Push database schema: supabase db push"
    echo "4. Start development servers:"
    echo "   - Frontend: cd web && npm run dev"
    echo "   - API: cd api && npm run dev"
    echo "   - Docker: docker-compose up -d"
    echo ""
    echo "🌐 Development URLs:"
    echo "   - Frontend: http://localhost:5173"
    echo "   - API: http://localhost:3001"
    echo "   - Supabase: http://localhost:54321"
    echo "   - Monitoring: http://localhost:3000"
    echo ""
    echo "📚 Documentation: ./DEVELOPMENT.md"
    echo "🔄 Migration Plan: ./MIGRATION_PLAN.md"
}

# Run main function
main "$@"