-- Enable RLS on auth.users (if not already enabled)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'trial',
    NOW(),
    NOW()
  );
  
  -- Create trial subscription
  INSERT INTO public.subscriptions (
    user_id,
    plan_id,
    status,
    current_period_start,
    current_period_end,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    (SELECT id FROM public.plans WHERE name = 'Trial' LIMIT 1),
    'active',
    NOW(),
    NOW() + INTERVAL '1 year', -- Trial never expires
    NOW(),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to get user quota information
CREATE OR REPLACE FUNCTION public.get_user_quota_info(user_id UUID)
RETURNS JSON AS $$
DECLARE
  user_plan RECORD;
  current_executions INTEGER;
  quota_info JSON;
BEGIN
  -- Get user's active subscription and plan
  SELECT 
    p.name as plan_name,
    p.exec_limit,
    p.unlimited
  INTO user_plan
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan_id = p.id
  WHERE s.user_id = user_id 
    AND s.status = 'active'
    AND s.current_period_end > NOW();
  
  -- If no active subscription, return trial plan info
  IF user_plan IS NULL THEN
    SELECT 
      p.name as plan_name,
      p.exec_limit,
      p.unlimited
    INTO user_plan
    FROM public.plans p
    WHERE p.name = 'Trial';
  END IF;
  
  -- Count current month executions
  SELECT COUNT(*)
  INTO current_executions
  FROM public.executions
  WHERE run_by = user_id
    AND started_at >= date_trunc('month', NOW());
  
  -- Build quota info
  quota_info := json_build_object(
    'planName', COALESCE(user_plan.plan_name, 'Trial'),
    'execLimit', user_plan.exec_limit,
    'currentExecutions', current_executions,
    'remainingExecutions', 
      CASE 
        WHEN user_plan.unlimited THEN NULL
        ELSE GREATEST(0, user_plan.exec_limit - current_executions)
      END,
    'unlimited', COALESCE(user_plan.unlimited, false)
  );
  
  RETURN quota_info;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user can execute tests
CREATE OR REPLACE FUNCTION public.can_user_execute_test(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_plan RECORD;
  current_executions INTEGER;
BEGIN
  -- Get user's active subscription and plan
  SELECT 
    p.exec_limit,
    p.unlimited
  INTO user_plan
  FROM public.subscriptions s
  JOIN public.plans p ON s.plan_id = p.id
  WHERE s.user_id = user_id 
    AND s.status = 'active'
    AND s.current_period_end > NOW();
  
  -- If no active subscription, use trial plan
  IF user_plan IS NULL THEN
    SELECT 
      p.exec_limit,
      p.unlimited
    INTO user_plan
    FROM public.plans p
    WHERE p.name = 'Trial';
  END IF;
  
  -- If unlimited, always allow
  IF user_plan.unlimited THEN
    RETURN TRUE;
  END IF;
  
  -- Count current month executions
  SELECT COUNT(*)
  INTO current_executions
  FROM public.executions
  WHERE run_by = user_id
    AND started_at >= date_trunc('month', NOW());
  
  -- Check if under limit
  RETURN current_executions < user_plan.exec_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to increment user execution count
CREATE OR REPLACE FUNCTION public.increment_user_executions(user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- This function is called when a test execution starts
  -- The actual execution record is created by the application
  -- This is just for logging/auditing purposes
  INSERT INTO public.usage_logs (
    user_id,
    action,
    metadata,
    created_at
  ) VALUES (
    user_id,
    'test_execution_started',
    json_build_object('timestamp', NOW()),
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create usage_logs table for tracking user actions
CREATE TABLE IF NOT EXISTS public.usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on usage_logs
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for usage_logs
CREATE POLICY "Users can view their own usage logs" ON public.usage_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert usage logs" ON public.usage_logs
  FOR INSERT WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_usage_logs_user_id ON public.usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_logs_created_at ON public.usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_executions_run_by_started_at ON public.executions(run_by, started_at);

-- Create function to get user statistics
CREATE OR REPLACE FUNCTION public.get_user_stats(user_id UUID, period TEXT DEFAULT 'month')
RETURNS JSON AS $$
DECLARE
  start_date TIMESTAMP WITH TIME ZONE;
  stats JSON;
BEGIN
  -- Calculate start date based on period
  CASE period
    WHEN 'day' THEN
      start_date := date_trunc('day', NOW());
    WHEN 'week' THEN
      start_date := NOW() - INTERVAL '7 days';
    WHEN 'month' THEN
      start_date := date_trunc('month', NOW());
    WHEN 'year' THEN
      start_date := date_trunc('year', NOW());
    ELSE
      start_date := date_trunc('month', NOW());
  END CASE;
  
  -- Build statistics
  SELECT json_build_object(
    'totalExecutions', COUNT(*),
    'passedExecutions', COUNT(*) FILTER (WHERE status = 'PASSED'),
    'failedExecutions', COUNT(*) FILTER (WHERE status = 'FAILED'),
    'runningExecutions', COUNT(*) FILTER (WHERE status = 'RUNNING'),
    'cancelledExecutions', COUNT(*) FILTER (WHERE status = 'CANCELLED'),
    'successRate', 
      CASE 
        WHEN COUNT(*) > 0 THEN 
          ROUND((COUNT(*) FILTER (WHERE status = 'PASSED')::DECIMAL / COUNT(*)) * 100, 2)
        ELSE 0
      END,
    'averageExecutionTime',
      CASE 
        WHEN COUNT(*) > 0 THEN 
          ROUND(AVG(EXTRACT(EPOCH FROM (finished_at - started_at))), 2)
        ELSE 0
      END,
    'period', period,
    'startDate', start_date,
    'endDate', NOW()
  )
  INTO stats
  FROM public.executions
  WHERE run_by = user_id
    AND started_at >= start_date;
  
  RETURN COALESCE(stats, json_build_object(
    'totalExecutions', 0,
    'passedExecutions', 0,
    'failedExecutions', 0,
    'runningExecutions', 0,
    'cancelledExecutions', 0,
    'successRate', 0,
    'averageExecutionTime', 0,
    'period', period,
    'startDate', start_date,
    'endDate', NOW()
  ));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_quota_info(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.can_user_execute_test(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.increment_user_executions(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_stats(UUID, TEXT) TO anon, authenticated;