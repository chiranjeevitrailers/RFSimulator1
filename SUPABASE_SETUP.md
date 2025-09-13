# Supabase Setup Guide

## 🚨 Current Issue
Your application is trying to connect to `your-project.supabase.co` which is a placeholder URL. You need to set up Supabase properly.

## 🛠️ Solution Options

### Option 1: Use Local Supabase (Recommended for Development)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Start Supabase locally**:
   ```bash
   ./start-supabase.sh
   ```
   Or manually:
   ```bash
   supabase start
   ```

3. **Run your migrations**:
   ```bash
   supabase db push
   ```

4. **Start your web application**:
   ```bash
   cd web
   npm run dev
   ```

5. **Access your application**:
   - Web App: http://localhost:5173
   - Supabase Studio: http://localhost:54323

### Option 2: Use Remote Supabase (For Production)

1. **Create a Supabase project**:
   - Go to https://supabase.com
   - Create a new project
   - Note your project URL and anon key

2. **Update environment variables**:
   ```bash
   # In web/.env.local
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Deploy your migrations**:
   ```bash
   supabase db push --project-ref your-project-id
   ```

## 🔧 Environment Variables

The application expects these environment variables:

```bash
VITE_SUPABASE_URL=http://localhost:54321  # Local development
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

## 📊 Database Status

After starting Supabase, you can check your database:

```sql
-- Check test case counts
SELECT 
  'test_case_templates' as table_name,
  COUNT(*) as total_count
FROM test_case_templates;

SELECT 
  'protocol_specifications' as table_name,
  COUNT(*) as total_count
FROM protocol_specifications;

SELECT 
  'message_definitions' as table_name,
  COUNT(*) as total_count
FROM message_definitions;

SELECT 
  'ie_definitions' as table_name,
  COUNT(*) as total_count
FROM ie_definitions;
```

## 🚀 Quick Start

1. **Start Supabase**:
   ```bash
   ./start-supabase.sh
   ```

2. **Run migrations**:
   ```bash
   supabase db push
   ```

3. **Start web app**:
   ```bash
   cd web && npm run dev
   ```

4. **Test authentication**:
   - Admin login: `admin` / `admin123`
   - Create new users via the signup page

## 🔍 Troubleshooting

### Error: "Failed to load resource: net::ERR_NAME_NOT_RESOLVED"
- **Cause**: Environment variables not set or Supabase not running
- **Solution**: Follow the setup steps above

### Error: "Missing Supabase environment variables"
- **Cause**: `.env.local` file missing or incorrect
- **Solution**: Create `web/.env.local` with the correct values

### Error: "relation does not exist"
- **Cause**: Migrations not run
- **Solution**: Run `supabase db push`

## 📝 Notes

- The local Supabase instance uses the default anon key for development
- For production, you must use your actual Supabase project credentials
- All migrations are in the `supabase/migrations/` directory
- The latest migration `013_corrected_enum_values.sql` should populate 1000+ test cases