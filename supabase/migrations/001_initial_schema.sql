-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('trial', 'pro', 'enterprise', 'admin');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due');
CREATE TYPE execution_status AS ENUM ('QUEUED', 'RUNNING', 'PASSED', 'FAILED', 'CANCELLED');
CREATE TYPE verdict_type AS ENUM ('PASS', 'FAIL', 'INCONCLUSIVE');
CREATE TYPE suite_type AS ENUM (
  'functional', 'mobility', 'performance', 'security', 
  'ims', 'qos', 'oran', 'nbiot', 'ntn', 'v2x', 
  'interrat', 'negative', 'regression'
);
CREATE TYPE complexity_level AS ENUM ('basic', 'intermediate', 'advanced');
CREATE TYPE protocol_layer AS ENUM (
  'RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'Diameter', 
  'F1AP', 'E1AP', 'E2AP', 'GTP-U', 'PC5', 'Uu'
);

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'trial',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plans table
CREATE TABLE plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  stripe_price_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  exec_limit INTEGER, -- NULL means unlimited
  fault_simulation BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE subscriptions (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  stripe_sub_id TEXT UNIQUE,
  plan_id UUID REFERENCES plans(id) ON DELETE RESTRICT NOT NULL,
  status subscription_status DEFAULT 'active',
  period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_suites table
CREATE TABLE test_suites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  suite_type suite_type NOT NULL,
  description TEXT,
  threegpp_release TEXT,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_cases table
CREATE TABLE test_cases (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  suite_id UUID REFERENCES test_suites(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  threegpp_ref TEXT,
  description TEXT,
  default_parameters JSONB,
  ue_parameters JSONB,
  network_parameters JSONB,
  expected_duration INTEGER, -- in seconds
  complexity complexity_level DEFAULT 'basic',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_case_steps table
CREATE TABLE test_case_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES test_cases(id) ON DELETE CASCADE NOT NULL,
  step_order INTEGER NOT NULL,
  layer protocol_layer NOT NULL,
  direction TEXT NOT NULL,
  message_type TEXT NOT NULL,
  message_json JSONB NOT NULL,
  expected_params JSONB,
  correlation_keys JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create executions table
CREATE TABLE executions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  case_id UUID REFERENCES test_cases(id) ON DELETE CASCADE NOT NULL,
  run_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status execution_status DEFAULT 'QUEUED',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  finished_at TIMESTAMP WITH TIME ZONE,
  fault_injected BOOLEAN DEFAULT FALSE,
  summary JSONB,
  parameters JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create execution_steps table
CREATE TABLE execution_steps (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE NOT NULL,
  step_order INTEGER,
  layer TEXT,
  direction TEXT,
  message_type TEXT,
  raw_log TEXT,
  parsed_message JSONB,
  verdict verdict_type,
  fault_type TEXT,
  correlation_data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_test_suites_type ON test_suites(suite_type);
CREATE INDEX idx_test_cases_suite_id ON test_cases(suite_id);
CREATE INDEX idx_test_cases_complexity ON test_cases(complexity);
CREATE INDEX idx_test_case_steps_case_id ON test_case_steps(case_id);
CREATE INDEX idx_test_case_steps_layer ON test_case_steps(layer);
CREATE INDEX idx_executions_case_id ON executions(case_id);
CREATE INDEX idx_executions_run_by ON executions(run_by);
CREATE INDEX idx_executions_status ON executions(status);
CREATE INDEX idx_executions_started_at ON executions(started_at);
CREATE INDEX idx_execution_steps_execution_id ON execution_steps(execution_id);
CREATE INDEX idx_execution_steps_verdict ON execution_steps(verdict);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles table
CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();