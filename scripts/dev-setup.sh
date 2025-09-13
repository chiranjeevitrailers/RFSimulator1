#!/bin/bash

# 5GLabX Cloud Development Setup Script
set -e

echo "🚀 Setting up 5GLabX Cloud development environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    local missing_tools=()
    
    if ! command -v node &> /dev/null; then
        missing_tools+=("Node.js")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_tools+=("npm")
    fi
    
    if ! command -v docker &> /dev/null; then
        missing_tools+=("Docker")
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        missing_tools+=("Docker Compose")
    fi
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing_tools[*]}"
        print_error "Please install the missing tools and run this script again."
        exit 1
    fi
    
    print_success "All requirements are met!"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Install web dependencies
    print_status "Installing web dependencies..."
    cd web
    npm install
    cd ..
    
    # Install API dependencies
    print_status "Installing API dependencies..."
    cd api
    npm install
    cd ..
    
    print_success "Dependencies installed successfully!"
}

# Setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    # Root .env
    if [ ! -f .env ]; then
        cp .env.example .env
        print_success "Created .env file from .env.example"
        print_warning "Please update .env with your actual values:"
        echo "   - SUPABASE_URL"
        echo "   - SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_KEY"
        echo "   - STRIPE_SECRET_KEY"
        echo "   - STRIPE_WEBHOOK_SECRET"
    else
        print_success ".env file already exists"
    fi
    
    # Web .env
    if [ ! -f web/.env ]; then
        cp web/.env.example web/.env
        print_success "Created web/.env file from web/.env.example"
    else
        print_success "web/.env file already exists"
    fi
    
    # API .env
    if [ ! -f api/.env ]; then
        cp api/.env.example api/.env
        print_success "Created api/.env file from api/.env.example"
    else
        print_success "api/.env file already exists"
    fi
}

# Setup Supabase
setup_supabase() {
    print_status "Setting up Supabase..."
    
    if command -v supabase &> /dev/null; then
        print_success "Supabase CLI found"
        print_status "You can run the following commands:"
        echo "   supabase start"
        echo "   supabase db push"
        echo "   supabase db seed"
    else
        print_warning "Supabase CLI not found. Please install it for local development:"
        echo "   npm install -g supabase"
        echo "   or visit: https://supabase.com/docs/guides/cli"
    fi
}

# Setup Docker
setup_docker() {
    print_status "Setting up Docker environment..."
    
    # Create necessary directories
    mkdir -p nginx/ssl
    mkdir -p monitoring/grafana/dashboards
    mkdir -p monitoring/grafana/datasources
    
    print_success "Docker environment ready!"
    print_status "To start the development environment, run:"
    echo "   docker-compose up -d"
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
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
    
    print_success "Git hooks configured!"
}

# Main setup function
main() {
    echo "🎯 Starting 5GLabX Cloud setup..."
    echo ""
    
    check_requirements
    install_dependencies
    setup_env
    setup_supabase
    setup_docker
    setup_git_hooks
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Update .env files with your actual values"
    echo "2. Start Supabase: supabase start"
    echo "3. Push database schema: supabase db push"
    echo "4. Seed database: supabase db seed"
    echo "5. Start development servers:"
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
    echo ""
    print_success "Happy coding! 🎉"
}

# Run main function
main "$@"