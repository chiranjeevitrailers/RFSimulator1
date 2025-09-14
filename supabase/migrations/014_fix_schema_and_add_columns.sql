-- Fix existing schema and add missing columns for comprehensive 5GLabX features
-- This migration fixes the existing schema and adds the comprehensive analysis tables

-- First, fix the test_executions table to reference auth.users instead of users
-- Drop the existing foreign key constraint
ALTER TABLE public.test_executions DROP CONSTRAINT IF EXISTS test_executions_user_id_fkey;

-- Add the correct foreign key constraint
ALTER TABLE public.test_executions 
ADD CONSTRAINT test_executions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add missing columns to test_cases table if they don't exist
DO $$
BEGIN
    -- Add protocol_stack column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_cases' AND column_name = 'protocol_stack') THEN
        ALTER TABLE public.test_cases ADD COLUMN protocol_stack TEXT[];
    END IF;
    
    -- Add expected_output column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_cases' AND column_name = 'expected_output') THEN
        ALTER TABLE public.test_cases ADD COLUMN expected_output JSONB;
    END IF;
END $$;

-- Add missing columns to test_executions table if they don't exist
DO $$
BEGIN
    -- Add start_time column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_executions' AND column_name = 'start_time') THEN
        ALTER TABLE public.test_executions ADD COLUMN start_time TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add end_time column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_executions' AND column_name = 'end_time') THEN
        ALTER TABLE public.test_executions ADD COLUMN end_time TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add duration_ms column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_executions' AND column_name = 'duration_ms') THEN
        ALTER TABLE public.test_executions ADD COLUMN duration_ms BIGINT;
    END IF;
    
    -- Add results column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_executions' AND column_name = 'results') THEN
        ALTER TABLE public.test_executions ADD COLUMN results JSONB;
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'test_executions' AND column_name = 'updated_at') THEN
        ALTER TABLE public.test_executions ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Rename log_messages to execution_logs for consistency
ALTER TABLE public.log_messages RENAME TO execution_logs;

-- Add missing columns to execution_logs if they don't exist
DO $$
BEGIN
    -- Add parsed_data column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'execution_logs' AND column_name = 'parsed_data') THEN
        ALTER TABLE public.execution_logs ADD COLUMN parsed_data JSONB;
    END IF;
END $$;

-- ==============================================
-- PROTOCOL LAYERS TABLES
-- ==============================================

-- PHY Layer Analysis
CREATE TABLE IF NOT EXISTS public.phy_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  frequency_band TEXT,
  modulation_scheme TEXT,
  coding_rate DECIMAL(5,2),
  signal_strength DECIMAL(8,2),
  snr DECIMAL(8,2),
  throughput_mbps DECIMAL(10,2),
  error_rate DECIMAL(8,6),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- MAC Layer Analysis
CREATE TABLE IF NOT EXISTS public.mac_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scheduling_algorithm TEXT,
  resource_blocks_allocated INTEGER,
  harq_retransmissions INTEGER,
  buffer_status INTEGER,
  latency_ms DECIMAL(8,2),
  efficiency_percentage DECIMAL(5,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLC Layer Analysis
CREATE TABLE IF NOT EXISTS public.rlc_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rlc_mode TEXT, -- UM, AM, TM
  sequence_number INTEGER,
  pdu_size INTEGER,
  retransmission_count INTEGER,
  window_size INTEGER,
  throughput_mbps DECIMAL(10,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PDCP Layer Analysis
CREATE TABLE IF NOT EXISTS public.pdcp_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  pdcp_sn INTEGER,
  ciphering_enabled BOOLEAN,
  integrity_protection BOOLEAN,
  compression_ratio DECIMAL(5,2),
  header_size INTEGER,
  payload_size INTEGER,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RRC Layer Analysis
CREATE TABLE IF NOT EXISTS public.rrc_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  rrc_state TEXT, -- IDLE, CONNECTED, INACTIVE
  procedure_type TEXT,
  message_type TEXT,
  cell_id TEXT,
  plmn_id TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NAS Layer Analysis
CREATE TABLE IF NOT EXISTS public.nas_layer_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  nas_procedure TEXT,
  message_type TEXT,
  security_context TEXT,
  imsi TEXT,
  guti TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IMS Analysis
CREATE TABLE IF NOT EXISTS public.ims_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_type TEXT,
  call_state TEXT,
  sip_method TEXT,
  response_code INTEGER,
  media_type TEXT,
  codec TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- CORE NETWORK TABLES
-- ==============================================

-- AMF Analysis
CREATE TABLE IF NOT EXISTS public.amf_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  amf_instance_id TEXT,
  procedure_type TEXT,
  message_type TEXT,
  registration_area TEXT,
  tracking_area TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SMF Analysis
CREATE TABLE IF NOT EXISTS public.smf_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  smf_instance_id TEXT,
  pdu_session_id INTEGER,
  procedure_type TEXT,
  message_type TEXT,
  qos_flow_id INTEGER,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- UPF Analysis
CREATE TABLE IF NOT EXISTS public.upf_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  upf_instance_id TEXT,
  n3_interface_ip TEXT,
  n6_interface_ip TEXT,
  packet_count BIGINT,
  byte_count BIGINT,
  throughput_mbps DECIMAL(10,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AUSF Analysis
CREATE TABLE IF NOT EXISTS public.ausf_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ausf_instance_id TEXT,
  authentication_method TEXT,
  success BOOLEAN,
  challenge_response TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- UDM Analysis
CREATE TABLE IF NOT EXISTS public.udm_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  udm_instance_id TEXT,
  data_type TEXT,
  operation_type TEXT,
  subscription_data JSONB,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- O-RAN ANALYSIS TABLES
-- ==============================================

-- O-RAN Overview
CREATE TABLE IF NOT EXISTS public.oran_overview (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  oran_version TEXT,
  interface_type TEXT,
  node_type TEXT, -- CU, DU, RU
  status TEXT,
  performance_metrics JSONB,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- O-RAN Interfaces (E1, F1)
CREATE TABLE IF NOT EXISTS public.oran_interfaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  interface_name TEXT, -- E1, F1-C, F1-U
  message_type TEXT,
  procedure_type TEXT,
  latency_ms DECIMAL(8,2),
  throughput_mbps DECIMAL(10,2),
  error_count INTEGER,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- CU Analysis
CREATE TABLE IF NOT EXISTS public.cu_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  cu_instance_id TEXT,
  cpu_usage DECIMAL(5,2),
  memory_usage DECIMAL(5,2),
  active_sessions INTEGER,
  throughput_mbps DECIMAL(10,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- DU Analysis
CREATE TABLE IF NOT EXISTS public.du_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  du_instance_id TEXT,
  cell_id TEXT,
  active_users INTEGER,
  resource_utilization DECIMAL(5,2),
  interference_level DECIMAL(8,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- NB-IoT ANALYSIS TABLES
-- ==============================================

-- NB-IoT Overview
CREATE TABLE IF NOT EXISTS public.nbiot_overview (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  coverage_class INTEGER,
  repetition_factor INTEGER,
  power_level INTEGER,
  signal_quality DECIMAL(8,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NB-IoT Call Flow
CREATE TABLE IF NOT EXISTS public.nbiot_call_flow (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  procedure_type TEXT,
  message_sequence INTEGER,
  response_time_ms DECIMAL(8,2),
  success BOOLEAN,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- C-V2X ANALYSIS TABLES
-- ==============================================

-- V2X Overview
CREATE TABLE IF NOT EXISTS public.v2x_overview (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  vehicle_id TEXT,
  message_type TEXT,
  transmission_power INTEGER,
  distance_meters DECIMAL(8,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PC5 Sidelink
CREATE TABLE IF NOT EXISTS public.pc5_sidelink (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  source_id TEXT,
  destination_id TEXT,
  resource_pool TEXT,
  modulation_scheme TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- NTN ANALYSIS TABLES
-- ==============================================

-- NTN Overview
CREATE TABLE IF NOT EXISTS public.ntn_overview (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  satellite_id TEXT,
  orbit_type TEXT,
  altitude_km DECIMAL(10,2),
  doppler_shift_hz DECIMAL(10,2),
  propagation_delay_ms DECIMAL(8,2),
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SIB19 Analysis
CREATE TABLE IF NOT EXISTS public.sib19_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sib19_content JSONB,
  satellite_info JSONB,
  timing_info JSONB,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================
-- ANALYTICS AND REPORTING TABLES
-- ==============================================

-- Analytics Dashboard Data
CREATE TABLE IF NOT EXISTS public.analytics_dashboard (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metric_name TEXT,
  metric_value DECIMAL(15,6),
  metric_unit TEXT,
  category TEXT,
  subcategory TEXT,
  raw_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Report Templates
CREATE TABLE IF NOT EXISTS public.report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  template_type TEXT, -- protocol, core_network, oran, nbiot, v2x, ntn
  template_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated Reports
CREATE TABLE IF NOT EXISTS public.generated_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES public.report_templates(id),
  execution_id UUID REFERENCES public.test_executions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  report_name TEXT,
  report_data JSONB,
  file_path TEXT,
  status TEXT DEFAULT 'generating',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- ==============================================
-- ENABLE ROW LEVEL SECURITY
-- ==============================================

-- Enable RLS on all new tables
ALTER TABLE public.phy_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mac_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rlc_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pdcp_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rrc_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nas_layer_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ims_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amf_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.smf_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upf_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ausf_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.udm_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oran_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.oran_interfaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cu_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.du_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nbiot_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nbiot_call_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.v2x_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pc5_sidelink ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ntn_overview ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sib19_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_dashboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_reports ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- RLS POLICIES
-- ==============================================

-- Generic policy function for analysis tables
CREATE OR REPLACE FUNCTION public.user_can_access_execution(execution_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create policies for all analysis tables
DO $$
DECLARE
    table_name TEXT;
    tables TEXT[] := ARRAY[
        'phy_layer_analysis', 'mac_layer_analysis', 'rlc_layer_analysis', 
        'pdcp_layer_analysis', 'rrc_layer_analysis', 'nas_layer_analysis', 
        'ims_analysis', 'amf_analysis', 'smf_analysis', 'upf_analysis', 
        'ausf_analysis', 'udm_analysis', 'oran_overview', 'oran_interfaces', 
        'cu_analysis', 'du_analysis', 'nbiot_overview', 'nbiot_call_flow', 
        'v2x_overview', 'pc5_sidelink', 'ntn_overview', 'sib19_analysis', 
        'analytics_dashboard'
    ];
BEGIN
    FOREACH table_name IN ARRAY tables
    LOOP
        EXECUTE format('
            CREATE POLICY "Enable read access for users on their own executions" 
            ON public.%I FOR SELECT 
            USING (public.user_can_access_execution(execution_id));
            
            CREATE POLICY "Enable insert for authenticated users" 
            ON public.%I FOR INSERT 
            WITH CHECK (auth.role() = ''authenticated'');
            
            CREATE POLICY "Enable update for authenticated users" 
            ON public.%I FOR UPDATE 
            USING (public.user_can_access_execution(execution_id));
            
            CREATE POLICY "Enable delete for authenticated users" 
            ON public.%I FOR DELETE 
            USING (public.user_can_access_execution(execution_id));
        ', table_name, table_name, table_name, table_name);
    END LOOP;
END $$;

-- Policies for report templates (read-only for all authenticated users)
CREATE POLICY "Enable read access for all authenticated users" 
ON public.report_templates FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" 
ON public.report_templates FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Policies for generated reports
CREATE POLICY "Enable read access for users on their own reports" 
ON public.generated_reports FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Enable insert for authenticated users" 
ON public.generated_reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users on their own reports" 
ON public.generated_reports FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for users on their own reports" 
ON public.generated_reports FOR DELETE 
USING (auth.uid() = user_id);

-- ==============================================
-- INDEXES FOR PERFORMANCE
-- ==============================================

-- Create indexes on execution_id for all analysis tables
DO $$
DECLARE
    table_name TEXT;
    tables TEXT[] := ARRAY[
        'phy_layer_analysis', 'mac_layer_analysis', 'rlc_layer_analysis', 
        'pdcp_layer_analysis', 'rrc_layer_analysis', 'nas_layer_analysis', 
        'ims_analysis', 'amf_analysis', 'smf_analysis', 'upf_analysis', 
        'ausf_analysis', 'udm_analysis', 'oran_overview', 'oran_interfaces', 
        'cu_analysis', 'du_analysis', 'nbiot_overview', 'nbiot_call_flow', 
        'v2x_overview', 'pc5_sidelink', 'ntn_overview', 'sib19_analysis', 
        'analytics_dashboard'
    ];
BEGIN
    FOREACH table_name IN ARRAY tables
    LOOP
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_execution_id ON public.%I(execution_id);', table_name, table_name);
        EXECUTE format('CREATE INDEX IF NOT EXISTS idx_%I_timestamp ON public.%I(timestamp);', table_name, table_name);
    END LOOP;
END $$;

-- Create indexes for analytics dashboard
CREATE INDEX IF NOT EXISTS idx_analytics_dashboard_metric_name ON public.analytics_dashboard(metric_name);
CREATE INDEX IF NOT EXISTS idx_analytics_dashboard_category ON public.analytics_dashboard(category);
CREATE INDEX IF NOT EXISTS idx_analytics_dashboard_timestamp ON public.analytics_dashboard(timestamp);

-- Create indexes for generated reports
CREATE INDEX IF NOT EXISTS idx_generated_reports_user_id ON public.generated_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_reports_status ON public.generated_reports(status);
CREATE INDEX IF NOT EXISTS idx_generated_reports_created_at ON public.generated_reports(created_at);

-- ==============================================
-- GRANT PERMISSIONS
-- ==============================================

-- Grant permissions on all new tables
GRANT ALL ON public.phy_layer_analysis TO authenticated;
GRANT ALL ON public.mac_layer_analysis TO authenticated;
GRANT ALL ON public.rlc_layer_analysis TO authenticated;
GRANT ALL ON public.pdcp_layer_analysis TO authenticated;
GRANT ALL ON public.rrc_layer_analysis TO authenticated;
GRANT ALL ON public.nas_layer_analysis TO authenticated;
GRANT ALL ON public.ims_analysis TO authenticated;
GRANT ALL ON public.amf_analysis TO authenticated;
GRANT ALL ON public.smf_analysis TO authenticated;
GRANT ALL ON public.upf_analysis TO authenticated;
GRANT ALL ON public.ausf_analysis TO authenticated;
GRANT ALL ON public.udm_analysis TO authenticated;
GRANT ALL ON public.oran_overview TO authenticated;
GRANT ALL ON public.oran_interfaces TO authenticated;
GRANT ALL ON public.cu_analysis TO authenticated;
GRANT ALL ON public.du_analysis TO authenticated;
GRANT ALL ON public.nbiot_overview TO authenticated;
GRANT ALL ON public.nbiot_call_flow TO authenticated;
GRANT ALL ON public.v2x_overview TO authenticated;
GRANT ALL ON public.pc5_sidelink TO authenticated;
GRANT ALL ON public.ntn_overview TO authenticated;
GRANT ALL ON public.sib19_analysis TO authenticated;
GRANT ALL ON public.analytics_dashboard TO authenticated;
GRANT ALL ON public.report_templates TO authenticated;
GRANT ALL ON public.generated_reports TO authenticated;