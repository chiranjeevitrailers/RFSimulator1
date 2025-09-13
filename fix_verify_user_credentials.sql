-- Fix for missing verify_user_credentials function
-- Run this in your Supabase SQL Editor

-- Create function to verify user credentials
CREATE OR REPLACE FUNCTION public.verify_user_credentials(user_email TEXT, user_password TEXT)
RETURNS TABLE(user_id UUID, user_email_out TEXT, full_name TEXT, role TEXT, status TEXT) AS $$
DECLARE
  stored_hash TEXT;
  user_record RECORD;
BEGIN
  SELECT password_hash, id, email, full_name, role, status
  INTO stored_hash, user_record.id, user_record.email, user_record.full_name, user_record.role, user_record.status
  FROM users
  WHERE users.email = $1 AND users.status = 'active';
  
  IF stored_hash IS NULL THEN
    RETURN;
  END IF;
  
  -- Use bcrypt to verify password
  IF crypt($2, stored_hash) = stored_hash THEN
    RETURN QUERY SELECT user_record.id, user_record.email, user_record.full_name, user_record.role, user_record.status;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.verify_user_credentials(TEXT, TEXT) TO anon, authenticated;

-- Also ensure the users table exists with proper structure
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security if not already enabled
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Admin can view all users'
  ) THEN
    CREATE POLICY "Admin can view all users" ON users
      FOR SELECT USING (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'users' AND policyname = 'Admin can manage users'
  ) THEN
    CREATE POLICY "Admin can manage users" ON users
      FOR ALL USING (true);
  END IF;
END $$;

-- Create indexes for performance if they don't exist
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);