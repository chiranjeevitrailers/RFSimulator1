#!/bin/bash

echo "🔍 Verifying 5GLabX Supabase Setup..."
echo "=================================="

# Check if we're in the right directory
if [ ! -f "supabase/config.toml" ]; then
    echo "❌ Not in the project root directory. Please run from /workspace"
    exit 1
fi

echo "✅ Project structure looks good"

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Install with: npm install -g supabase"
    exit 1
fi

echo "✅ Supabase CLI is installed"

# Check if environment file exists
if [ -f "web/.env.local" ]; then
    echo "✅ Environment file exists (web/.env.local)"
else
    echo "⚠️  Environment file missing. Creating from template..."
    cp web/.env.example web/.env.local
    echo "✅ Created web/.env.local from template"
fi

# Check if Supabase is running
echo "🔍 Checking if Supabase is running..."
if curl -s http://localhost:54321/health > /dev/null 2>&1; then
    echo "✅ Supabase is running on localhost:54321"
else
    echo "⚠️  Supabase not running. Starting it now..."
    ./start-supabase.sh
fi

# Check database tables
echo "🔍 Checking database tables..."
if command -v psql &> /dev/null; then
    echo "📊 Database table counts:"
    psql "postgresql://postgres:postgres@localhost:54322/postgres" -c "
    SELECT 
      'test_case_templates' as table_name,
      COUNT(*) as total_count
    FROM test_case_templates
    UNION ALL
    SELECT 
      'protocol_specifications' as table_name,
      COUNT(*) as total_count
    FROM protocol_specifications
    UNION ALL
    SELECT 
      'message_definitions' as table_name,
      COUNT(*) as total_count
    FROM message_definitions
    UNION ALL
    SELECT 
      'ie_definitions' as table_name,
      COUNT(*) as total_count
    FROM ie_definitions;
    " 2>/dev/null || echo "⚠️  Could not connect to database. Make sure Supabase is running."
else
    echo "⚠️  psql not found. Install PostgreSQL client to check database directly."
fi

echo ""
echo "🚀 Next steps:"
echo "1. Start your web application: cd web && npm run dev"
echo "2. Visit: http://localhost:5173"
echo "3. Test admin login: admin / admin123"
echo "4. Check Supabase Studio: http://localhost:54323"
echo ""
echo "✅ Setup verification complete!"