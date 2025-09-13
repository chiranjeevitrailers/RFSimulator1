# 🚀 Quick Setup Guide - Fix ERR_NAME_NOT_RESOLVED

## ✅ What You've Done
- Added Supabase keys to `.env.example` ✅
- Added Supabase keys to Netlify ✅

## 🔧 Next Steps to Fix the Error

### Option 1: Test Your Current Setup (Recommended)

1. **Open the test page**:
   ```bash
   # Open test-connection.html in your browser
   open test-connection.html
   # or
   python3 -m http.server 8000
   # Then visit: http://localhost:8000/test-connection.html
   ```

2. **Update the test page with your actual Supabase URL**:
   - Edit `test-connection.html`
   - Replace `http://localhost:54321` with your actual Supabase URL
   - Replace the anon key with your actual key

3. **Run the tests** to see what's working

### Option 2: Use Local Supabase (For Development)

1. **Install Supabase CLI** (choose one method):
   ```bash
   # Method 1: Using Homebrew (macOS)
   brew install supabase/tap/supabase
   
   # Method 2: Using Scoop (Windows)
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   
   # Method 3: Download binary
   # Visit: https://github.com/supabase/cli/releases
   ```

2. **Start Supabase locally**:
   ```bash
   supabase start
   ```

3. **Run migrations**:
   ```bash
   supabase db push
   ```

4. **Start your web app**:
   ```bash
   cd web
   npm run dev
   ```

### Option 3: Use Remote Supabase (For Production)

1. **Create environment file**:
   ```bash
   cp web/.env.example web/.env.local
   ```

2. **Edit the environment file** with your actual values:
   ```bash
   # web/.env.local
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

3. **Deploy your migrations** to your remote Supabase:
   ```bash
   supabase db push --project-ref your-project-id
   ```

## 🔍 Troubleshooting

### Error: "Failed to load resource: net::ERR_NAME_NOT_RESOLVED"
- **Cause**: Environment variables not set or wrong URL
- **Solution**: Check your `.env.local` file has the correct Supabase URL

### Error: "Missing Supabase environment variables"
- **Cause**: No environment file or wrong variable names
- **Solution**: Create `web/.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Error: "relation does not exist"
- **Cause**: Database migrations not run
- **Solution**: Run `supabase db push` to apply migrations

## 📊 Verify Your Setup

After setup, you should see:
- ✅ No more `ERR_NAME_NOT_RESOLVED` errors
- ✅ Admin login works: `admin` / `admin123`
- ✅ User signup/login works
- ✅ 1000+ test cases available in database

## 🎯 Quick Test

1. **Start your web app**:
   ```bash
   cd web && npm run dev
   ```

2. **Visit**: http://localhost:5173

3. **Test admin login**:
   - Username: `admin`
   - Password: `admin123`

4. **Check for errors** in browser console (F12)

If you still see `ERR_NAME_NOT_RESOLVED`, the issue is with the environment variables not being loaded correctly.