-- 5GLabX Test Platform Database Schema
-- This migration creates all necessary tables for the 5G/4G protocol testing platform

-- Test Suites table
CREATE TABLE IF NOT EXISTS test_suites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    protocol_type VARCHAR(50) NOT NULL CHECK (protocol_type IN ('5G', '4G', 'LTE', 'NR', 'IMS', 'SIP')),
    version VARCHAR(20) DEFAULT '1.0.0',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Cases table
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_suite_id UUID REFERENCES test_suites(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    test_type VARCHAR(50) NOT NULL CHECK (test_type IN ('functional', 'performance', 'stress', 'load', 'security')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    expected_result TEXT,
    test_script TEXT, -- JavaScript/Python test script
    parameters JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'ready', 'running', 'passed', 'failed', 'skipped')),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Executions table
CREATE TABLE IF NOT EXISTS test_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    execution_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    result_data JSONB DEFAULT '{}',
    logs TEXT,
    error_message TEXT,
    executed_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Protocol Analysis Results table
CREATE TABLE IF NOT EXISTS protocol_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    protocol_name VARCHAR(100) NOT NULL,
    message_type VARCHAR(100),
    direction VARCHAR(20) CHECK (direction IN ('uplink', 'downlink', 'bidirectional')),
    timestamp TIMESTAMP WITH TIME ZONE,
    raw_data TEXT,
    parsed_data JSONB DEFAULT '{}',
    analysis_results JSONB DEFAULT '{}',
    anomalies JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Test Environment Configuration
CREATE TABLE IF NOT EXISTS test_environments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    environment_type VARCHAR(50) NOT NULL CHECK (environment_type IN ('simulation', 'lab', 'production')),
    base_url VARCHAR(500),
    configuration JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
    created_by UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Test Quotas and Usage
CREATE TABLE IF NOT EXISTS user_test_quotas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    plan_type VARCHAR(50) DEFAULT 'trial' CHECK (plan_type IN ('trial', 'basic', 'professional', 'enterprise')),
    max_test_executions INTEGER DEFAULT 100,
    max_test_suites INTEGER DEFAULT 5,
    max_concurrent_executions INTEGER DEFAULT 2,
    used_executions INTEGER DEFAULT 0,
    used_test_suites INTEGER DEFAULT 0,
    reset_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_suites_created_by ON test_suites(created_by);
CREATE INDEX IF NOT EXISTS idx_test_suites_status ON test_suites(status);
CREATE INDEX IF NOT EXISTS idx_test_cases_suite_id ON test_cases(test_suite_id);
CREATE INDEX IF NOT EXISTS idx_test_cases_status ON test_cases(status);
CREATE INDEX IF NOT EXISTS idx_test_executions_case_id ON test_executions(test_case_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_status ON test_executions(status);
CREATE INDEX IF NOT EXISTS idx_test_executions_start_time ON test_executions(start_time);
CREATE INDEX IF NOT EXISTS idx_protocol_analysis_execution_id ON protocol_analysis(execution_id);
CREATE INDEX IF NOT EXISTS idx_protocol_analysis_timestamp ON protocol_analysis(timestamp);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_test_suites_updated_at BEFORE UPDATE ON test_suites FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_test_cases_updated_at BEFORE UPDATE ON test_cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_test_environments_updated_at BEFORE UPDATE ON test_environments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_test_quotas_updated_at BEFORE UPDATE ON user_test_quotas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON test_suites TO authenticated;
GRANT ALL ON test_cases TO authenticated;
GRANT ALL ON test_executions TO authenticated;
GRANT ALL ON protocol_analysis TO authenticated;
GRANT ALL ON test_environments TO authenticated;
GRANT ALL ON user_test_quotas TO authenticated;

-- Create RPC functions for test platform operations

-- Function to create a new test suite
CREATE OR REPLACE FUNCTION create_test_suite(
    suite_name TEXT,
    suite_description TEXT,
    protocol_type TEXT,
    user_id UUID
)
RETURNS UUID AS $$
DECLARE
    new_suite_id UUID;
    user_quota RECORD;
BEGIN
    -- Check user quota
    SELECT * INTO user_quota FROM user_test_quotas WHERE user_test_quotas.user_id = $4;
    
    IF user_quota.used_test_suites >= user_quota.max_test_suites THEN
        RAISE EXCEPTION 'Test suite quota exceeded. Maximum allowed: %', user_quota.max_test_suites;
    END IF;
    
    -- Create test suite
    INSERT INTO test_suites (name, description, protocol_type, created_by)
    VALUES ($1, $2, $3, $4)
    RETURNING id INTO new_suite_id;
    
    -- Update quota
    UPDATE user_test_quotas 
    SET used_test_suites = used_test_suites + 1
    WHERE user_test_quotas.user_id = $4;
    
    RETURN new_suite_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a test case
CREATE OR REPLACE FUNCTION create_test_case(
    suite_id UUID,
    case_name TEXT,
    case_description TEXT,
    test_type TEXT,
    test_script TEXT,
    user_id UUID
)
RETURNS UUID AS $$
DECLARE
    new_case_id UUID;
BEGIN
    -- Verify user owns the test suite
    IF NOT EXISTS (
        SELECT 1 FROM test_suites 
        WHERE id = $1 AND created_by = $6
    ) THEN
        RAISE EXCEPTION 'Test suite not found or access denied';
    END IF;
    
    -- Create test case
    INSERT INTO test_cases (test_suite_id, name, description, test_type, test_script, created_by)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id INTO new_case_id;
    
    RETURN new_case_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to execute a test case
CREATE OR REPLACE FUNCTION execute_test_case(
    case_id UUID,
    execution_name TEXT,
    user_id UUID
)
RETURNS UUID AS $$
DECLARE
    new_execution_id UUID;
    user_quota RECORD;
    test_case_record RECORD;
BEGIN
    -- Check user quota
    SELECT * INTO user_quota FROM user_test_quotas WHERE user_test_quotas.user_id = $3;
    
    IF user_quota.used_executions >= user_quota.max_test_executions THEN
        RAISE EXCEPTION 'Test execution quota exceeded. Maximum allowed: %', user_quota.max_test_executions;
    END IF;
    
    -- Get test case details
    SELECT tc.*, ts.created_by as suite_owner
    INTO test_case_record
    FROM test_cases tc
    JOIN test_suites ts ON tc.test_suite_id = ts.id
    WHERE tc.id = $1;
    
    IF test_case_record.id IS NULL THEN
        RAISE EXCEPTION 'Test case not found';
    END IF;
    
    -- Check access
    IF test_case_record.suite_owner != $3 THEN
        RAISE EXCEPTION 'Access denied to test case';
    END IF;
    
    -- Create test execution
    INSERT INTO test_executions (test_case_id, execution_name, executed_by, status, start_time)
    VALUES ($1, $2, $3, 'running', NOW())
    RETURNING id INTO new_execution_id;
    
    -- Update quota
    UPDATE user_test_quotas 
    SET used_executions = used_executions + 1
    WHERE user_test_quotas.user_id = $3;
    
    RETURN new_execution_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's test suites
CREATE OR REPLACE FUNCTION get_user_test_suites(user_id UUID)
RETURNS TABLE(
    id UUID,
    name TEXT,
    description TEXT,
    protocol_type TEXT,
    version TEXT,
    status TEXT,
    test_case_count BIGINT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ts.id,
        ts.name,
        ts.description,
        ts.protocol_type,
        ts.version,
        ts.status,
        COUNT(tc.id) as test_case_count,
        ts.created_at,
        ts.updated_at
    FROM test_suites ts
    LEFT JOIN test_cases tc ON ts.id = tc.test_suite_id
    WHERE ts.created_by = $1
    GROUP BY ts.id, ts.name, ts.description, ts.protocol_type, ts.version, ts.status, ts.created_at, ts.updated_at
    ORDER BY ts.updated_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get test cases for a suite
CREATE OR REPLACE FUNCTION get_test_suite_cases(suite_id UUID, user_id UUID)
RETURNS TABLE(
    id UUID,
    name TEXT,
    description TEXT,
    test_type TEXT,
    priority TEXT,
    status TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        tc.id,
        tc.name,
        tc.description,
        tc.test_type,
        tc.priority,
        tc.status,
        tc.created_at,
        tc.updated_at
    FROM test_cases tc
    JOIN test_suites ts ON tc.test_suite_id = ts.id
    WHERE ts.id = $1 AND ts.created_by = $2
    ORDER BY tc.priority DESC, tc.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get test execution history
CREATE OR REPLACE FUNCTION get_test_execution_history(user_id UUID, limit_count INTEGER DEFAULT 50)
RETURNS TABLE(
    id UUID,
    execution_name TEXT,
    test_case_name TEXT,
    test_suite_name TEXT,
    status TEXT,
    start_time TIMESTAMP WITH TIME ZONE,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    error_message TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        te.id,
        te.execution_name,
        tc.name as test_case_name,
        ts.name as test_suite_name,
        te.status,
        te.start_time,
        te.end_time,
        te.duration_seconds,
        te.error_message
    FROM test_executions te
    JOIN test_cases tc ON te.test_case_id = tc.id
    JOIN test_suites ts ON tc.test_suite_id = ts.id
    WHERE ts.created_by = $1
    ORDER BY te.start_time DESC
    LIMIT $2;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user quota information
CREATE OR REPLACE FUNCTION get_user_quota_info(user_id UUID)
RETURNS TABLE(
    plan_type TEXT,
    max_test_executions INTEGER,
    max_test_suites INTEGER,
    max_concurrent_executions INTEGER,
    used_executions INTEGER,
    used_test_suites INTEGER,
    remaining_executions INTEGER,
    remaining_test_suites INTEGER,
    reset_date DATE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        utq.plan_type,
        utq.max_test_executions,
        utq.max_test_suites,
        utq.max_concurrent_executions,
        utq.used_executions,
        utq.used_test_suites,
        (utq.max_test_executions - utq.used_executions) as remaining_executions,
        (utq.max_test_suites - utq.used_test_suites) as remaining_test_suites,
        utq.reset_date
    FROM user_test_quotas utq
    WHERE utq.user_id = $1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on RPC functions
GRANT EXECUTE ON FUNCTION create_test_suite(TEXT, TEXT, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION create_test_case(UUID, TEXT, TEXT, TEXT, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION execute_test_case(UUID, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_test_suites(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_test_suite_cases(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_test_execution_history(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_quota_info(UUID) TO authenticated;

-- Insert default test environment
INSERT INTO test_environments (name, description, environment_type, base_url, configuration) VALUES
('5G Simulation Environment', 'Default 5G network simulation environment for testing', 'simulation', 'https://sim.5glabx.com', '{"protocols": ["5G", "NR"], "features": ["NSA", "SA"]}'),
('4G/LTE Test Environment', '4G/LTE network testing environment', 'simulation', 'https://lte.5glabx.com', '{"protocols": ["4G", "LTE"], "features": ["VoLTE", "eMBB"]}'),
('IMS Core Testing', 'IMS core network testing environment', 'simulation', 'https://ims.5glabx.com', '{"protocols": ["IMS", "SIP"], "features": ["VoLTE", "VoWiFi"]}');

-- Create default quota for existing users
INSERT INTO user_test_quotas (user_id, plan_type, max_test_executions, max_test_suites, max_concurrent_executions)
SELECT id, 'trial', 100, 5, 2
FROM users
WHERE id NOT IN (SELECT user_id FROM user_test_quotas);