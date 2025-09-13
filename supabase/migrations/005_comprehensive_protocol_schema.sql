-- Comprehensive Protocol Schema for 1000+ Test Cases
-- This migration creates the complete database structure for all protocol messages, IEs, and test cases

-- Create comprehensive protocol message types
CREATE TYPE message_direction AS ENUM ('UL', 'DL', 'BIDIRECTIONAL');
CREATE TYPE message_category AS ENUM (
  'RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'DIAMETER', 'F1AP', 'E1AP', 'E2AP', 
  'GTP-U', 'GTP-C', 'PC5', 'Uu', 'X2AP', 'XnAP', 'E2SM', 'O1', 'A1', 'E1'
);
CREATE TYPE ie_type AS ENUM (
  'MANDATORY', 'OPTIONAL', 'CONDITIONAL', 'EXTENSION'
);
CREATE TYPE ie_format AS ENUM (
  'INTEGER', 'ENUMERATED', 'BIT_STRING', 'OCTET_STRING', 'SEQUENCE', 
  'SEQUENCE_OF', 'CHOICE', 'BOOLEAN', 'REAL', 'NULL'
);

-- Create protocol specifications table
CREATE TABLE protocol_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_name TEXT NOT NULL,
  threegpp_release TEXT NOT NULL,
  specification_number TEXT NOT NULL,
  section_reference TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create message definitions table
CREATE TABLE message_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id UUID REFERENCES protocol_specifications(id) ON DELETE CASCADE,
  message_name TEXT NOT NULL,
  message_code INTEGER,
  direction message_direction NOT NULL,
  category message_category NOT NULL,
  description TEXT,
  threegpp_reference TEXT,
  criticality TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create information element definitions table
CREATE TABLE ie_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES message_definitions(id) ON DELETE CASCADE,
  ie_name TEXT NOT NULL,
  ie_id INTEGER,
  ie_type ie_type NOT NULL,
  ie_format ie_format NOT NULL,
  presence TEXT,
  description TEXT,
  threegpp_reference TEXT,
  range_constraints JSONB,
  enum_values JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case templates table
CREATE TABLE test_case_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  suite_type suite_type NOT NULL,
  protocol_category message_category NOT NULL,
  description TEXT,
  threegpp_reference TEXT,
  complexity complexity_level DEFAULT 'basic',
  expected_duration INTEGER,
  prerequisites JSONB,
  success_criteria JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case instances table (expanded from test_cases)
CREATE TABLE test_case_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES test_case_templates(id) ON DELETE CASCADE,
  suite_id UUID REFERENCES test_suites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  threegpp_ref TEXT,
  version TEXT DEFAULT '1.0',
  status TEXT DEFAULT 'active',
  default_parameters JSONB,
  ue_parameters JSONB,
  network_parameters JSONB,
  expected_duration INTEGER,
  complexity complexity_level DEFAULT 'basic',
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create test case message flows table
CREATE TABLE test_case_message_flows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID REFERENCES test_case_instances(id) ON DELETE CASCADE,
  flow_order INTEGER NOT NULL,
  message_id UUID REFERENCES message_definitions(id) ON DELETE CASCADE,
  direction message_direction NOT NULL,
  timing_constraints JSONB,
  correlation_requirements JSONB,
  expected_parameters JSONB,
  fault_injection_points JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case IE configurations table
CREATE TABLE test_case_ie_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_flow_id UUID REFERENCES test_case_message_flows(id) ON DELETE CASCADE,
  ie_id UUID REFERENCES ie_definitions(id) ON DELETE CASCADE,
  ie_value JSONB NOT NULL,
  is_conditional BOOLEAN DEFAULT FALSE,
  condition_expression TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create execution message logs table (expanded from execution_steps)
CREATE TABLE execution_message_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  message_flow_id UUID REFERENCES test_case_message_flows(id) ON DELETE CASCADE,
  message_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_direction message_direction NOT NULL,
  message_type TEXT NOT NULL,
  message_category message_category NOT NULL,
  raw_message BYTEA,
  parsed_message JSONB,
  correlation_keys JSONB,
  timing_measurements JSONB,
  verdict verdict_type,
  fault_detected BOOLEAN DEFAULT FALSE,
  fault_type TEXT,
  fault_description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create execution IE logs table
CREATE TABLE execution_ie_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_log_id UUID REFERENCES execution_message_logs(id) ON DELETE CASCADE,
  ie_id UUID REFERENCES ie_definitions(id) ON DELETE CASCADE,
  ie_name TEXT NOT NULL,
  ie_value JSONB,
  expected_value JSONB,
  ie_verdict verdict_type,
  deviation_analysis JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create fault injection templates table
CREATE TABLE fault_injection_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL,
  fault_type TEXT NOT NULL,
  description TEXT,
  injection_point TEXT NOT NULL,
  fault_parameters JSONB,
  severity_level TEXT DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create fault injection instances table
CREATE TABLE fault_injection_instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  template_id UUID REFERENCES fault_injection_templates(id) ON DELETE CASCADE,
  injection_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  injection_point TEXT NOT NULL,
  fault_parameters JSONB,
  injection_result JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create correlation tracking table
CREATE TABLE correlation_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  correlation_key TEXT NOT NULL,
  correlation_type TEXT NOT NULL,
  correlation_value TEXT NOT NULL,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message_count INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create performance metrics table
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  execution_id UUID REFERENCES executions(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  metric_value DECIMAL,
  metric_unit TEXT,
  measurement_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  context JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case dependencies table
CREATE TABLE test_case_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_case_id UUID REFERENCES test_case_instances(id) ON DELETE CASCADE,
  depends_on_test_case_id UUID REFERENCES test_case_instances(id) ON DELETE CASCADE,
  dependency_type TEXT NOT NULL,
  dependency_condition TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case tags table
CREATE TABLE test_case_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tag_name TEXT UNIQUE NOT NULL,
  tag_category TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create test case tag assignments table
CREATE TABLE test_case_tag_assignments (
  test_case_id UUID REFERENCES test_case_instances(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES test_case_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (test_case_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX idx_protocol_specifications_name ON protocol_specifications(protocol_name);
CREATE INDEX idx_message_definitions_protocol ON message_definitions(protocol_id);
CREATE INDEX idx_message_definitions_name ON message_definitions(message_name);
CREATE INDEX idx_message_definitions_category ON message_definitions(category);
CREATE INDEX idx_ie_definitions_message ON ie_definitions(message_id);
CREATE INDEX idx_ie_definitions_name ON ie_definitions(ie_name);
CREATE INDEX idx_test_case_templates_suite_type ON test_case_templates(suite_type);
CREATE INDEX idx_test_case_templates_protocol ON test_case_templates(protocol_category);
CREATE INDEX idx_test_case_instances_template ON test_case_instances(template_id);
CREATE INDEX idx_test_case_instances_suite ON test_case_instances(suite_id);
CREATE INDEX idx_test_case_instances_status ON test_case_instances(status);
CREATE INDEX idx_test_case_message_flows_test_case ON test_case_message_flows(test_case_id);
CREATE INDEX idx_test_case_message_flows_order ON test_case_message_flows(flow_order);
CREATE INDEX idx_test_case_ie_configurations_flow ON test_case_ie_configurations(message_flow_id);
CREATE INDEX idx_execution_message_logs_execution ON execution_message_logs(execution_id);
CREATE INDEX idx_execution_message_logs_timestamp ON execution_message_logs(message_timestamp);
CREATE INDEX idx_execution_message_logs_category ON execution_message_logs(message_category);
CREATE INDEX idx_execution_ie_logs_message ON execution_ie_logs(message_log_id);
CREATE INDEX idx_execution_ie_logs_ie ON execution_ie_logs(ie_id);
CREATE INDEX idx_fault_injection_instances_execution ON fault_injection_instances(execution_id);
CREATE INDEX idx_correlation_tracking_execution ON correlation_tracking(execution_id);
CREATE INDEX idx_correlation_tracking_key ON correlation_tracking(correlation_key);
CREATE INDEX idx_performance_metrics_execution ON performance_metrics(execution_id);
CREATE INDEX idx_performance_metrics_name ON performance_metrics(metric_name);
CREATE INDEX idx_test_case_dependencies_test_case ON test_case_dependencies(test_case_id);
CREATE INDEX idx_test_case_dependencies_depends_on ON test_case_dependencies(depends_on_test_case_id);

-- Create updated_at trigger for test_case_instances
CREATE TRIGGER update_test_case_instances_updated_at 
  BEFORE UPDATE ON test_case_instances 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to get test case with all related data
CREATE OR REPLACE FUNCTION get_test_case_with_details(test_case_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'testCase', row_to_json(tc),
    'messageFlows', (
      SELECT json_agg(
        json_build_object(
          'flow', row_to_json(mf),
          'message', row_to_json(md),
          'ieConfigurations', (
            SELECT json_agg(
              json_build_object(
                'configuration', row_to_json(iec),
                'ieDefinition', row_to_json(ied)
              )
            )
            FROM test_case_ie_configurations iec
            JOIN ie_definitions ied ON iec.ie_id = ied.id
            WHERE iec.message_flow_id = mf.id
          )
        )
      )
      FROM test_case_message_flows mf
      JOIN message_definitions md ON mf.message_id = md.id
      WHERE mf.test_case_id = tc.id
      ORDER BY mf.flow_order
    ),
    'dependencies', (
      SELECT json_agg(row_to_json(dep))
      FROM test_case_dependencies dep
      WHERE dep.test_case_id = tc.id
    ),
    'tags', (
      SELECT json_agg(row_to_json(tag))
      FROM test_case_tag_assignments tca
      JOIN test_case_tags tag ON tca.tag_id = tag.id
      WHERE tca.test_case_id = tc.id
    )
  )
  INTO result
  FROM test_case_instances tc
  WHERE tc.id = test_case_uuid;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get execution with detailed logs
CREATE OR REPLACE FUNCTION get_execution_with_logs(execution_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'execution', row_to_json(e),
    'messageLogs', (
      SELECT json_agg(
        json_build_object(
          'messageLog', row_to_json(eml),
          'ieLogs', (
            SELECT json_agg(row_to_json(eil))
            FROM execution_ie_logs eil
            WHERE eil.message_log_id = eml.id
          )
        )
      )
      FROM execution_message_logs eml
      WHERE eml.execution_id = e.id
      ORDER BY eml.message_timestamp
    ),
    'correlationTracking', (
      SELECT json_agg(row_to_json(ct))
      FROM correlation_tracking ct
      WHERE ct.execution_id = e.id
    ),
    'performanceMetrics', (
      SELECT json_agg(row_to_json(pm))
      FROM performance_metrics pm
      WHERE pm.execution_id = e.id
    ),
    'faultInjections', (
      SELECT json_agg(row_to_json(fii))
      FROM fault_injection_instances fii
      WHERE fii.execution_id = e.id
    )
  )
  INTO result
  FROM executions e
  WHERE e.id = execution_uuid;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_test_case_with_details(UUID) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_execution_with_logs(UUID) TO anon, authenticated;