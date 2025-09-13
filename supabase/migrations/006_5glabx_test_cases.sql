-- 5GLabX Test Cases and Real-time Data Schema
-- This migration creates the database structure for 1000 test cases and real-time processing

-- Test Cases Table
CREATE TABLE IF NOT EXISTS test_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- 'phy', 'mac', 'rlc', 'pdcp', 'rrc', 'nas', 'ims'
    subcategory VARCHAR(100), -- 'srsran', 'open5gs', 'kamailio', 'oran', 'nbiot', 'v2x', 'ntn'
    priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
    complexity VARCHAR(20) DEFAULT 'medium', -- 'simple', 'medium', 'complex', 'expert'
    expected_duration INTEGER DEFAULT 300, -- seconds
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Test Executions Table
CREATE TABLE IF NOT EXISTS test_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_case_id UUID REFERENCES test_cases(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed', 'cancelled'
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    duration INTEGER, -- seconds
    result_data JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time Log Messages Table
CREATE TABLE IF NOT EXISTS log_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    level VARCHAR(10) NOT NULL, -- 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'
    component VARCHAR(50) NOT NULL, -- 'PHY', 'MAC', 'RLC', 'PDCP', 'RRC', 'NAS', 'IMS'
    message TEXT NOT NULL,
    raw_data JSONB,
    parsed_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Protocol Layer Stats Table
CREATE TABLE IF NOT EXISTS protocol_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    layer VARCHAR(20) NOT NULL, -- 'phy', 'mac', 'rlc', 'pdcp', 'rrc', 'nas', 'ims'
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,6),
    unit VARCHAR(20),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Metrics Table
CREATE TABLE IF NOT EXISTS system_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL, -- 'cpu', 'memory', 'network', 'throughput', 'latency'
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(15,6),
    unit VARCHAR(20),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- O-RAN Specific Data Table
CREATE TABLE IF NOT EXISTS oran_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    interface_type VARCHAR(20) NOT NULL, -- 'E1', 'F1', 'O1', 'O2'
    message_type VARCHAR(50) NOT NULL,
    message_data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NB-IoT Specific Data Table
CREATE TABLE IF NOT EXISTS nbiot_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    device_type VARCHAR(50) NOT NULL,
    coverage_class INTEGER,
    power_level INTEGER,
    data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- V2X Specific Data Table
CREATE TABLE IF NOT EXISTS v2x_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    communication_type VARCHAR(20) NOT NULL, -- 'V2V', 'V2I', 'V2P', 'V2N'
    message_type VARCHAR(50) NOT NULL,
    data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NTN Specific Data Table
CREATE TABLE IF NOT EXISTS ntn_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    satellite_id VARCHAR(50) NOT NULL,
    elevation_angle DECIMAL(8,2),
    doppler_shift DECIMAL(10,6),
    propagation_delay DECIMAL(10,6),
    data JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Real-time Processing Status Table
CREATE TABLE IF NOT EXISTS processing_status (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID REFERENCES test_executions(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL, -- 'idle', 'processing', 'paused', 'error'
    current_step VARCHAR(100),
    progress_percentage INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_cases_category ON test_cases(category);
CREATE INDEX IF NOT EXISTS idx_test_cases_subcategory ON test_cases(subcategory);
CREATE INDEX IF NOT EXISTS idx_test_cases_priority ON test_cases(priority);
CREATE INDEX IF NOT EXISTS idx_test_executions_status ON test_executions(status);
CREATE INDEX IF NOT EXISTS idx_test_executions_user_id ON test_executions(user_id);
CREATE INDEX IF NOT EXISTS idx_test_executions_started_at ON test_executions(started_at);
CREATE INDEX IF NOT EXISTS idx_log_messages_execution_id ON log_messages(execution_id);
CREATE INDEX IF NOT EXISTS idx_log_messages_timestamp ON log_messages(timestamp);
CREATE INDEX IF NOT EXISTS idx_log_messages_component ON log_messages(component);
CREATE INDEX IF NOT EXISTS idx_protocol_stats_execution_id ON protocol_stats(execution_id);
CREATE INDEX IF NOT EXISTS idx_protocol_stats_layer ON protocol_stats(layer);
CREATE INDEX IF NOT EXISTS idx_system_metrics_execution_id ON system_metrics(execution_id);
CREATE INDEX IF NOT EXISTS idx_system_metrics_type ON system_metrics(metric_type);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_test_cases_updated_at BEFORE UPDATE ON test_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE log_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE protocol_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE oran_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE nbiot_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE v2x_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE ntn_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own test cases" ON test_cases
    FOR SELECT USING (true);

CREATE POLICY "Users can view their own test executions" ON test_executions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create test executions" ON test_executions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test executions" ON test_executions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view logs for their executions" ON log_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = log_messages.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view protocol stats for their executions" ON protocol_stats
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = protocol_stats.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view system metrics for their executions" ON system_metrics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = system_metrics.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view O-RAN data for their executions" ON oran_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = oran_data.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view NB-IoT data for their executions" ON nbiot_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = nbiot_data.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view V2X data for their executions" ON v2x_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = v2x_data.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view NTN data for their executions" ON ntn_data
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = ntn_data.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view processing status for their executions" ON processing_status
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM test_executions 
            WHERE test_executions.id = processing_status.execution_id 
            AND test_executions.user_id = auth.uid()
        )
    );

-- Grant permissions
GRANT ALL ON test_cases TO authenticated;
GRANT ALL ON test_executions TO authenticated;
GRANT ALL ON log_messages TO authenticated;
GRANT ALL ON protocol_stats TO authenticated;
GRANT ALL ON system_metrics TO authenticated;
GRANT ALL ON oran_data TO authenticated;
GRANT ALL ON nbiot_data TO authenticated;
GRANT ALL ON v2x_data TO authenticated;
GRANT ALL ON ntn_data TO authenticated;
GRANT ALL ON processing_status TO authenticated;