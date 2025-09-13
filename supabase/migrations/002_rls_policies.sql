-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_suites ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_case_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE execution_steps ENABLE ROW LEVEL SECURITY;

-- Plans table is public (no RLS needed)
-- ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions" ON subscriptions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test suites policies
CREATE POLICY "Anyone can view test suites" ON test_suites
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage test suites" ON test_suites
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test cases policies
CREATE POLICY "Anyone can view test cases" ON test_cases
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage test cases" ON test_cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Test case steps policies
CREATE POLICY "Anyone can view test case steps" ON test_case_steps
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage test case steps" ON test_case_steps
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Executions policies
CREATE POLICY "Users can view their own executions" ON executions
  FOR SELECT USING (auth.uid() = run_by);

CREATE POLICY "Users can create their own executions" ON executions
  FOR INSERT WITH CHECK (auth.uid() = run_by);

CREATE POLICY "Users can update their own executions" ON executions
  FOR UPDATE USING (auth.uid() = run_by);

CREATE POLICY "Admins can view all executions" ON executions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Execution steps policies
CREATE POLICY "Users can view steps of their executions" ON execution_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM executions 
      WHERE id = execution_id AND run_by = auth.uid()
    )
  );

CREATE POLICY "Admins can view all execution steps" ON execution_steps
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    'trial'
  );
  
  -- Create trial subscription
  INSERT INTO subscriptions (user_id, plan_id)
  VALUES (
    NEW.id,
    (SELECT id FROM plans WHERE name = 'Trial' LIMIT 1)
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create function to check execution quota
CREATE OR REPLACE FUNCTION check_execution_quota(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_plan_id UUID;
  plan_exec_limit INTEGER;
  current_executions INTEGER;
BEGIN
  -- Get user's plan
  SELECT plan_id INTO user_plan_id
  FROM subscriptions
  WHERE subscriptions.user_id = check_execution_quota.user_id
    AND status = 'active';
  
  -- Get plan execution limit
  SELECT exec_limit INTO plan_exec_limit
  FROM plans
  WHERE id = user_plan_id;
  
  -- If no limit, allow execution
  IF plan_exec_limit IS NULL THEN
    RETURN TRUE;
  END IF;
  
  -- Count current month executions
  SELECT COUNT(*) INTO current_executions
  FROM executions
  WHERE run_by = check_execution_quota.user_id
    AND started_at >= date_trunc('month', NOW());
  
  -- Check if under limit
  RETURN current_executions < plan_exec_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user quota info
CREATE OR REPLACE FUNCTION get_user_quota_info(user_id UUID)
RETURNS JSON AS $$
DECLARE
  user_plan_id UUID;
  plan_exec_limit INTEGER;
  current_executions INTEGER;
  plan_name TEXT;
BEGIN
  -- Get user's plan
  SELECT s.plan_id, p.name, p.exec_limit
  INTO user_plan_id, plan_name, plan_exec_limit
  FROM subscriptions s
  JOIN plans p ON s.plan_id = p.id
  WHERE s.user_id = get_user_quota_info.user_id
    AND s.status = 'active';
  
  -- Count current month executions
  SELECT COUNT(*) INTO current_executions
  FROM executions
  WHERE run_by = get_user_quota_info.user_id
    AND started_at >= date_trunc('month', NOW());
  
  -- Return quota info
  RETURN json_build_object(
    'planName', plan_name,
    'execLimit', plan_exec_limit,
    'currentExecutions', current_executions,
    'remainingExecutions', 
      CASE 
        WHEN plan_exec_limit IS NULL THEN NULL
        ELSE GREATEST(0, plan_exec_limit - current_executions)
      END,
    'unlimited', plan_exec_limit IS NULL
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;