#!/bin/bash

# Start Supabase Local Development Environment
echo "🚀 Starting Supabase local development environment..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "   npm install -g supabase"
    echo "   or visit: https://supabase.com/docs/guides/cli/getting-started"
    exit 1
fi

# Start Supabase services
echo "📦 Starting Supabase services..."
supabase start

# Check if services are running
if [ $? -eq 0 ]; then
    echo "✅ Supabase is now running!"
    echo ""
    echo "🌐 Access your local Supabase:"
    echo "   Studio: http://localhost:54323"
    echo "   API: http://localhost:54321"
    echo "   DB: postgresql://postgres:postgres@localhost:54322/postgres"
    echo ""
    echo "🔑 Your local anon key:"
    echo "   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Run your migrations: supabase db push"
    echo "   2. Start your web app: cd web && npm run dev"
    echo "   3. Visit: http://localhost:5173"
else
    echo "❌ Failed to start Supabase. Please check the error messages above."
    exit 1
fi