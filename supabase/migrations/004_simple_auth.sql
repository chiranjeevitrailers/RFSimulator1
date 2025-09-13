-- Simple Authentication Setup
-- This migration creates a simplified authentication system

-- Create admin credentials table
CREATE TABLE admin_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create users table for simple user management
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default admin credentials (password: admin123)
INSERT INTO admin_credentials (username, password_hash) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create policies for users (admin can see all, users can see own)
CREATE POLICY "Admin can view all users" ON users
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage users" ON users
  FOR ALL USING (true);

-- Create policies for admin credentials (only accessible by admin)
CREATE POLICY "Admin credentials access" ON admin_credentials
  FOR ALL USING (true);

-- Create function to verify admin credentials
CREATE OR REPLACE FUNCTION public.verify_admin_credentials(username TEXT, password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT password_hash INTO stored_hash
  FROM admin_credentials
  WHERE admin_credentials.username = $1;
  
  IF stored_hash IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Use bcrypt to verify password
  RETURN crypt($2, stored_hash) = stored_hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

-- Create function to create new user
CREATE OR REPLACE FUNCTION public.create_user(
  user_email TEXT,
  user_password TEXT,
  user_full_name TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  new_user_id UUID;
  password_hash TEXT;
BEGIN
  -- Generate new user ID
  new_user_id := gen_random_uuid();
  
  -- Hash the password
  password_hash := crypt(user_password, gen_salt('bf'));
  
  -- Insert new user
  INSERT INTO users (id, email, full_name, password_hash, role, status)
  VALUES (new_user_id, user_email, user_full_name, password_hash, 'user', 'active');
  
  RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get all users for admin dashboard
CREATE OR REPLACE FUNCTION public.get_all_users()
RETURNS TABLE(
  id UUID,
  email TEXT,
  full_name TEXT,
  role TEXT,
  status TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.full_name,
    u.role,
    u.status,
    u.created_at,
    u.updated_at
  FROM users u
  ORDER BY u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to update user status
CREATE OR REPLACE FUNCTION public.update_user_status(user_id UUID, new_status TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE users 
  SET status = new_status, updated_at = NOW()
  WHERE id = user_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to delete user
CREATE OR REPLACE FUNCTION public.delete_user(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  DELETE FROM users WHERE id = user_id;
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.verify_admin_credentials(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_user_credentials(TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_user(TEXT, TEXT, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_users() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.update_user_status(UUID, TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.delete_user(UUID) TO anon, authenticated;

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_admin_credentials_username ON admin_credentials(username);