#!/bin/bash

# 5GLabX Cloud Development Start Script
set -e

echo "🚀 Starting 5GLabX Cloud development environment..."

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

# Check if .env files exist
check_env_files() {
    print_status "Checking environment files..."
    
    if [ ! -f .env ]; then
        print_error ".env file not found. Please run ./scripts/dev-setup.sh first."
        exit 1
    fi
    
    if [ ! -f web/.env ]; then
        print_error "web/.env file not found. Please run ./scripts/dev-setup.sh first."
        exit 1
    fi
    
    if [ ! -f api/.env ]; then
        print_error "api/.env file not found. Please run ./scripts/dev-setup.sh first."
        exit 1
    fi
    
    print_success "Environment files found"
}

# Start Docker services
start_docker() {
    print_status "Starting Docker services..."
    
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d
        print_success "Docker services started"
    else
        print_warning "Docker Compose not found. Skipping Docker services."
    fi
}

# Start Supabase
start_supabase() {
    print_status "Starting Supabase..."
    
    if command -v supabase &> /dev/null; then
        # Check if Supabase is already running
        if supabase status &> /dev/null; then
            print_success "Supabase is already running"
        else
            supabase start
            print_success "Supabase started"
        fi
    else
        print_warning "Supabase CLI not found. Please install it or use the hosted version."
    fi
}

# Start API server
start_api() {
    print_status "Starting API server..."
    
    cd api
    npm run dev &
    API_PID=$!
    cd ..
    
    print_success "API server started (PID: $API_PID)"
}

# Start web server
start_web() {
    print_status "Starting web server..."
    
    cd web
    npm run dev &
    WEB_PID=$!
    cd ..
    
    print_success "Web server started (PID: $WEB_PID)"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for API server
    print_status "Waiting for API server..."
    for i in {1..30}; do
        if curl -s http://localhost:3001/health > /dev/null 2>&1; then
            print_success "API server is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            print_warning "API server not ready after 30 seconds"
        fi
        sleep 1
    done
    
    # Wait for web server
    print_status "Waiting for web server..."
    for i in {1..30}; do
        if curl -s http://localhost:5173 > /dev/null 2>&1; then
            print_success "Web server is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            print_warning "Web server not ready after 30 seconds"
        fi
        sleep 1
    done
}

# Show status
show_status() {
    echo ""
    print_success "🎉 5GLabX Cloud development environment is running!"
    echo ""
    echo "🌐 Development URLs:"
    echo "   - Frontend: http://localhost:5173"
    echo "   - API: http://localhost:3001"
    echo "   - API Health: http://localhost:3001/health"
    echo "   - Supabase Studio: http://localhost:54323"
    echo "   - Supabase API: http://localhost:54321"
    echo "   - Monitoring: http://localhost:3000"
    echo ""
    echo "📋 Useful commands:"
    echo "   - View logs: docker-compose logs -f"
    echo "   - Stop services: docker-compose down"
    echo "   - Restart API: kill $API_PID && cd api && npm run dev &"
    echo "   - Restart Web: kill $WEB_PID && cd web && npm run dev &"
    echo ""
    echo "🛑 To stop all services, press Ctrl+C"
    echo ""
}

# Cleanup function
cleanup() {
    echo ""
    print_status "Shutting down services..."
    
    # Kill background processes
    if [ ! -z "$API_PID" ]; then
        kill $API_PID 2>/dev/null || true
    fi
    
    if [ ! -z "$WEB_PID" ]; then
        kill $WEB_PID 2>/dev/null || true
    fi
    
    # Stop Docker services
    if command -v docker-compose &> /dev/null; then
        docker-compose down
    fi
    
    print_success "All services stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main function
main() {
    check_env_files
    start_docker
    start_supabase
    start_api
    start_web
    wait_for_services
    show_status
    
    # Keep script running
    while true; do
        sleep 1
    done
}

# Run main function
main "$@"