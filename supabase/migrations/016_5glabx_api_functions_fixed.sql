-- 5GLabX API Functions (Fixed)
-- This migration creates RPC functions for all 5GLabX features using the existing schema

-- ==============================================
-- TEST EXECUTION FUNCTIONS
-- ==============================================

-- Function to start test execution
CREATE OR REPLACE FUNCTION public.start_test_execution(
  test_case_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  execution_id UUID;
  result JSONB;
BEGIN
  -- Create test execution
  INSERT INTO public.test_executions (test_case_id, user_id, status, started_at)
  VALUES (test_case_id, auth.uid(), 'running', NOW())
  RETURNING id INTO execution_id;

  -- Get test case details
  SELECT jsonb_build_object(
    'execution_id', execution_id,
    'test_case', row_to_json(tc.*),
    'status', 'running',
    'start_time', NOW()
  )
  INTO result
  FROM public.test_cases tc
  WHERE tc.id = test_case_id;

  RETURN result;
END;
$$;

-- Function to get test executions for user
CREATE OR REPLACE FUNCTION public.get_user_test_executions()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', te.id,
      'test_case_id', te.test_case_id,
      'status', te.status,
      'started_at', te.started_at,
      'completed_at', te.completed_at,
      'duration', te.duration,
      'result_data', te.result_data,
      'test_case', jsonb_build_object(
        'name', tc.name,
        'description', tc.description,
        'category', tc.category,
        'subcategory', tc.subcategory,
        'protocol_stack', tc.protocol_stack
      )
    )
  )
  INTO result
  FROM public.test_executions te
  JOIN public.test_cases tc ON te.test_case_id = tc.id
  WHERE te.user_id = auth.uid()
  ORDER BY te.created_at DESC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get execution logs
CREATE OR REPLACE FUNCTION public.get_execution_logs(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check if user has access to this execution
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', el.id,
      'timestamp', el.timestamp,
      'level', el.level,
      'component', el.component,
      'message', el.message,
      'raw_data', el.raw_data,
      'parsed_data', el.parsed_data
    )
  )
  INTO result
  FROM public.execution_logs el
  WHERE el.execution_id = get_execution_logs.execution_id
  ORDER BY el.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- PROTOCOL LAYER ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get PHY layer analysis
CREATE OR REPLACE FUNCTION public.get_phy_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', pla.id,
      'timestamp', pla.timestamp,
      'frequency_band', pla.frequency_band,
      'modulation_scheme', pla.modulation_scheme,
      'coding_rate', pla.coding_rate,
      'signal_strength', pla.signal_strength,
      'snr', pla.snr,
      'throughput_mbps', pla.throughput_mbps,
      'error_rate', pla.error_rate,
      'raw_data', pla.raw_data
    )
  )
  INTO result
  FROM public.phy_layer_analysis pla
  WHERE pla.execution_id = get_phy_layer_analysis.execution_id
  ORDER BY pla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get MAC layer analysis
CREATE OR REPLACE FUNCTION public.get_mac_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', mla.id,
      'timestamp', mla.timestamp,
      'scheduling_algorithm', mla.scheduling_algorithm,
      'resource_blocks_allocated', mla.resource_blocks_allocated,
      'harq_retransmissions', mla.harq_retransmissions,
      'buffer_status', mla.buffer_status,
      'latency_ms', mla.latency_ms,
      'efficiency_percentage', mla.efficiency_percentage,
      'raw_data', mla.raw_data
    )
  )
  INTO result
  FROM public.mac_layer_analysis mla
  WHERE mla.execution_id = get_mac_layer_analysis.execution_id
  ORDER BY mla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get RLC layer analysis
CREATE OR REPLACE FUNCTION public.get_rlc_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', rla.id,
      'timestamp', rla.timestamp,
      'rlc_mode', rla.rlc_mode,
      'sequence_number', rla.sequence_number,
      'pdu_size', rla.pdu_size,
      'retransmission_count', rla.retransmission_count,
      'window_size', rla.window_size,
      'throughput_mbps', rla.throughput_mbps,
      'raw_data', rla.raw_data
    )
  )
  INTO result
  FROM public.rlc_layer_analysis rla
  WHERE rla.execution_id = get_rlc_layer_analysis.execution_id
  ORDER BY rla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get PDCP layer analysis
CREATE OR REPLACE FUNCTION public.get_pdcp_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', pla.id,
      'timestamp', pla.timestamp,
      'pdcp_sn', pla.pdcp_sn,
      'ciphering_enabled', pla.ciphering_enabled,
      'integrity_protection', pla.integrity_protection,
      'compression_ratio', pla.compression_ratio,
      'header_size', pla.header_size,
      'payload_size', pla.payload_size,
      'raw_data', pla.raw_data
    )
  )
  INTO result
  FROM public.pdcp_layer_analysis pla
  WHERE pla.execution_id = get_pdcp_layer_analysis.execution_id
  ORDER BY pla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get RRC layer analysis
CREATE OR REPLACE FUNCTION public.get_rrc_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', rla.id,
      'timestamp', rla.timestamp,
      'rrc_state', rla.rrc_state,
      'procedure_type', rla.procedure_type,
      'message_type', rla.message_type,
      'cell_id', rla.cell_id,
      'plmn_id', rla.plmn_id,
      'raw_data', rla.raw_data
    )
  )
  INTO result
  FROM public.rrc_layer_analysis rla
  WHERE rla.execution_id = get_rrc_layer_analysis.execution_id
  ORDER BY rla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get NAS layer analysis
CREATE OR REPLACE FUNCTION public.get_nas_layer_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', nla.id,
      'timestamp', nla.timestamp,
      'nas_procedure', nla.nas_procedure,
      'message_type', nla.message_type,
      'security_context', nla.security_context,
      'imsi', nla.imsi,
      'guti', nla.guti,
      'raw_data', nla.raw_data
    )
  )
  INTO result
  FROM public.nas_layer_analysis nla
  WHERE nla.execution_id = get_nas_layer_analysis.execution_id
  ORDER BY nla.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get IMS analysis
CREATE OR REPLACE FUNCTION public.get_ims_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ia.id,
      'timestamp', ia.timestamp,
      'session_type', ia.session_type,
      'call_state', ia.call_state,
      'sip_method', ia.sip_method,
      'response_code', ia.response_code,
      'media_type', ia.media_type,
      'codec', ia.codec,
      'raw_data', ia.raw_data
    )
  )
  INTO result
  FROM public.ims_analysis ia
  WHERE ia.execution_id = get_ims_analysis.execution_id
  ORDER BY ia.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- CORE NETWORK ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get AMF analysis
CREATE OR REPLACE FUNCTION public.get_amf_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', aa.id,
      'timestamp', aa.timestamp,
      'amf_instance_id', aa.amf_instance_id,
      'procedure_type', aa.procedure_type,
      'message_type', aa.message_type,
      'registration_area', aa.registration_area,
      'tracking_area', aa.tracking_area,
      'raw_data', aa.raw_data
    )
  )
  INTO result
  FROM public.amf_analysis aa
  WHERE aa.execution_id = get_amf_analysis.execution_id
  ORDER BY aa.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get SMF analysis
CREATE OR REPLACE FUNCTION public.get_smf_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', sa.id,
      'timestamp', sa.timestamp,
      'smf_instance_id', sa.smf_instance_id,
      'pdu_session_id', sa.pdu_session_id,
      'procedure_type', sa.procedure_type,
      'message_type', sa.message_type,
      'qos_flow_id', sa.qos_flow_id,
      'raw_data', sa.raw_data
    )
  )
  INTO result
  FROM public.smf_analysis sa
  WHERE sa.execution_id = get_smf_analysis.execution_id
  ORDER BY sa.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get UPF analysis
CREATE OR REPLACE FUNCTION public.get_upf_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ua.id,
      'timestamp', ua.timestamp,
      'upf_instance_id', ua.upf_instance_id,
      'n3_interface_ip', ua.n3_interface_ip,
      'n6_interface_ip', ua.n6_interface_ip,
      'packet_count', ua.packet_count,
      'byte_count', ua.byte_count,
      'throughput_mbps', ua.throughput_mbps,
      'raw_data', ua.raw_data
    )
  )
  INTO result
  FROM public.upf_analysis ua
  WHERE ua.execution_id = get_upf_analysis.execution_id
  ORDER BY ua.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get AUSF analysis
CREATE OR REPLACE FUNCTION public.get_ausf_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', aa.id,
      'timestamp', aa.timestamp,
      'ausf_instance_id', aa.ausf_instance_id,
      'authentication_method', aa.authentication_method,
      'success', aa.success,
      'challenge_response', aa.challenge_response,
      'raw_data', aa.raw_data
    )
  )
  INTO result
  FROM public.ausf_analysis aa
  WHERE aa.execution_id = get_ausf_analysis.execution_id
  ORDER BY aa.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get UDM analysis
CREATE OR REPLACE FUNCTION public.get_udm_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ua.id,
      'timestamp', ua.timestamp,
      'udm_instance_id', ua.udm_instance_id,
      'data_type', ua.data_type,
      'operation_type', ua.operation_type,
      'subscription_data', ua.subscription_data,
      'raw_data', ua.raw_data
    )
  )
  INTO result
  FROM public.udm_analysis ua
  WHERE ua.execution_id = get_udm_analysis.execution_id
  ORDER BY ua.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- O-RAN ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get O-RAN overview
CREATE OR REPLACE FUNCTION public.get_oran_overview(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', oo.id,
      'timestamp', oo.timestamp,
      'oran_version', oo.oran_version,
      'interface_type', oo.interface_type,
      'node_type', oo.node_type,
      'status', oo.status,
      'performance_metrics', oo.performance_metrics,
      'raw_data', oo.raw_data
    )
  )
  INTO result
  FROM public.oran_overview oo
  WHERE oo.execution_id = get_oran_overview.execution_id
  ORDER BY oo.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get O-RAN interfaces
CREATE OR REPLACE FUNCTION public.get_oran_interfaces(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', oi.id,
      'timestamp', oi.timestamp,
      'interface_name', oi.interface_name,
      'message_type', oi.message_type,
      'procedure_type', oi.procedure_type,
      'latency_ms', oi.latency_ms,
      'throughput_mbps', oi.throughput_mbps,
      'error_count', oi.error_count,
      'raw_data', oi.raw_data
    )
  )
  INTO result
  FROM public.oran_interfaces oi
  WHERE oi.execution_id = get_oran_interfaces.execution_id
  ORDER BY oi.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get CU analysis
CREATE OR REPLACE FUNCTION public.get_cu_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ca.id,
      'timestamp', ca.timestamp,
      'cu_instance_id', ca.cu_instance_id,
      'cpu_usage', ca.cpu_usage,
      'memory_usage', ca.memory_usage,
      'active_sessions', ca.active_sessions,
      'throughput_mbps', ca.throughput_mbps,
      'raw_data', ca.raw_data
    )
  )
  INTO result
  FROM public.cu_analysis ca
  WHERE ca.execution_id = get_cu_analysis.execution_id
  ORDER BY ca.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get DU analysis
CREATE OR REPLACE FUNCTION public.get_du_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', da.id,
      'timestamp', da.timestamp,
      'du_instance_id', da.du_instance_id,
      'cell_id', da.cell_id,
      'active_users', da.active_users,
      'resource_utilization', da.resource_utilization,
      'interference_level', da.interference_level,
      'raw_data', da.raw_data
    )
  )
  INTO result
  FROM public.du_analysis da
  WHERE da.execution_id = get_du_analysis.execution_id
  ORDER BY da.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- NB-IoT ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get NB-IoT overview
CREATE OR REPLACE FUNCTION public.get_nbiot_overview(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', no.id,
      'timestamp', no.timestamp,
      'coverage_class', no.coverage_class,
      'repetition_factor', no.repetition_factor,
      'power_level', no.power_level,
      'signal_quality', no.signal_quality,
      'raw_data', no.raw_data
    )
  )
  INTO result
  FROM public.nbiot_overview no
  WHERE no.execution_id = get_nbiot_overview.execution_id
  ORDER BY no.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get NB-IoT call flow
CREATE OR REPLACE FUNCTION public.get_nbiot_call_flow(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ncf.id,
      'timestamp', ncf.timestamp,
      'procedure_type', ncf.procedure_type,
      'message_sequence', ncf.message_sequence,
      'response_time_ms', ncf.response_time_ms,
      'success', ncf.success,
      'raw_data', ncf.raw_data
    )
  )
  INTO result
  FROM public.nbiot_call_flow ncf
  WHERE ncf.execution_id = get_nbiot_call_flow.execution_id
  ORDER BY ncf.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- C-V2X ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get V2X overview
CREATE OR REPLACE FUNCTION public.get_v2x_overview(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', vo.id,
      'timestamp', vo.timestamp,
      'vehicle_id', vo.vehicle_id,
      'message_type', vo.message_type,
      'transmission_power', vo.transmission_power,
      'distance_meters', vo.distance_meters,
      'raw_data', vo.raw_data
    )
  )
  INTO result
  FROM public.v2x_overview vo
  WHERE vo.execution_id = get_v2x_overview.execution_id
  ORDER BY vo.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get PC5 sidelink
CREATE OR REPLACE FUNCTION public.get_pc5_sidelink(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ps.id,
      'timestamp', ps.timestamp,
      'source_id', ps.source_id,
      'destination_id', ps.destination_id,
      'resource_pool', ps.resource_pool,
      'modulation_scheme', ps.modulation_scheme,
      'raw_data', ps.raw_data
    )
  )
  INTO result
  FROM public.pc5_sidelink ps
  WHERE ps.execution_id = get_pc5_sidelink.execution_id
  ORDER BY ps.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- NTN ANALYSIS FUNCTIONS
-- ==============================================

-- Function to get NTN overview
CREATE OR REPLACE FUNCTION public.get_ntn_overview(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', no.id,
      'timestamp', no.timestamp,
      'satellite_id', no.satellite_id,
      'orbit_type', no.orbit_type,
      'altitude_km', no.altitude_km,
      'doppler_shift_hz', no.doppler_shift_hz,
      'propagation_delay_ms', no.propagation_delay_ms,
      'raw_data', no.raw_data
    )
  )
  INTO result
  FROM public.ntn_overview no
  WHERE no.execution_id = get_ntn_overview.execution_id
  ORDER BY no.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get SIB19 analysis
CREATE OR REPLACE FUNCTION public.get_sib19_analysis(
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- Check access
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', sa.id,
      'timestamp', sa.timestamp,
      'sib19_content', sa.sib19_content,
      'satellite_info', sa.satellite_info,
      'timing_info', sa.timing_info,
      'raw_data', sa.raw_data
    )
  )
  INTO result
  FROM public.sib19_analysis sa
  WHERE sa.execution_id = get_sib19_analysis.execution_id
  ORDER BY sa.timestamp ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- ANALYTICS FUNCTIONS
-- ==============================================

-- Function to get analytics dashboard data
CREATE OR REPLACE FUNCTION public.get_analytics_dashboard(
  execution_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- If execution_id is provided, check access
  IF execution_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.test_executions 
      WHERE id = execution_id AND user_id = auth.uid()
    ) THEN
      RAISE EXCEPTION 'Access denied to execution %', execution_id;
    END IF;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ad.id,
      'timestamp', ad.timestamp,
      'metric_name', ad.metric_name,
      'metric_value', ad.metric_value,
      'metric_unit', ad.metric_unit,
      'category', ad.category,
      'subcategory', ad.subcategory,
      'raw_data', ad.raw_data
    )
  )
  INTO result
  FROM public.analytics_dashboard ad
  WHERE (get_analytics_dashboard.execution_id IS NULL OR ad.execution_id = get_analytics_dashboard.execution_id)
  ORDER BY ad.timestamp DESC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to get analytics by category
CREATE OR REPLACE FUNCTION public.get_analytics_by_category(
  category_name TEXT,
  execution_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- If execution_id is provided, check access
  IF execution_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.test_executions 
      WHERE id = execution_id AND user_id = auth.uid()
    ) THEN
      RAISE EXCEPTION 'Access denied to execution %', execution_id;
    END IF;
  END IF;

  SELECT jsonb_agg(
    jsonb_build_object(
      'id', ad.id,
      'timestamp', ad.timestamp,
      'metric_name', ad.metric_name,
      'metric_value', ad.metric_value,
      'metric_unit', ad.metric_unit,
      'category', ad.category,
      'subcategory', ad.subcategory,
      'raw_data', ad.raw_data
    )
  )
  INTO result
  FROM public.analytics_dashboard ad
  WHERE ad.category = category_name
    AND (get_analytics_by_category.execution_id IS NULL OR ad.execution_id = get_analytics_by_category.execution_id)
  ORDER BY ad.timestamp DESC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- REPORT GENERATION FUNCTIONS
-- ==============================================

-- Function to get report templates
CREATE OR REPLACE FUNCTION public.get_report_templates()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', rt.id,
      'name', rt.name,
      'description', rt.description,
      'template_type', rt.template_type,
      'template_config', rt.template_config,
      'created_at', rt.created_at,
      'updated_at', rt.updated_at
    )
  )
  INTO result
  FROM public.report_templates rt
  ORDER BY rt.name ASC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- Function to generate report
CREATE OR REPLACE FUNCTION public.generate_report(
  template_id UUID,
  execution_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  report_id UUID;
  result JSONB;
BEGIN
  -- Check access to execution
  IF NOT EXISTS (
    SELECT 1 FROM public.test_executions 
    WHERE id = execution_id AND user_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Access denied to execution %', execution_id;
  END IF;

  -- Create report
  INSERT INTO public.generated_reports (
    template_id,
    execution_id,
    user_id,
    report_name,
    status
  )
  VALUES (
    template_id,
    execution_id,
    auth.uid(),
    'Report_' || to_char(NOW(), 'YYYY-MM-DD_HH24-MI-SS'),
    'generating'
  )
  RETURNING id INTO report_id;

  -- Return report info
  SELECT jsonb_build_object(
    'report_id', report_id,
    'status', 'generating',
    'created_at', NOW()
  )
  INTO result;

  RETURN result;
END;
$$;

-- Function to get user reports
CREATE OR REPLACE FUNCTION public.get_user_reports()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', gr.id,
      'template_id', gr.template_id,
      'execution_id', gr.execution_id,
      'report_name', gr.report_name,
      'status', gr.status,
      'created_at', gr.created_at,
      'completed_at', gr.completed_at,
      'template', jsonb_build_object(
        'name', rt.name,
        'description', rt.description,
        'template_type', rt.template_type
      ),
      'test_case', jsonb_build_object(
        'name', tc.name,
        'category', tc.category,
        'subcategory', tc.subcategory
      )
    )
  )
  INTO result
  FROM public.generated_reports gr
  JOIN public.report_templates rt ON gr.template_id = rt.id
  JOIN public.test_executions te ON gr.execution_id = te.id
  JOIN public.test_cases tc ON te.test_case_id = tc.id
  WHERE gr.user_id = auth.uid()
  ORDER BY gr.created_at DESC;

  RETURN COALESCE(result, '[]'::jsonb);
END;
$$;

-- ==============================================
-- GRANT PERMISSIONS
-- ==============================================

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.start_test_execution(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_test_executions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_execution_logs(UUID) TO authenticated;

-- Protocol Layer Functions
GRANT EXECUTE ON FUNCTION public.get_phy_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_mac_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_rlc_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_pdcp_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_rrc_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_nas_layer_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_ims_analysis(UUID) TO authenticated;

-- Core Network Functions
GRANT EXECUTE ON FUNCTION public.get_amf_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_smf_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_upf_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_ausf_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_udm_analysis(UUID) TO authenticated;

-- O-RAN Functions
GRANT EXECUTE ON FUNCTION public.get_oran_overview(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_oran_interfaces(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_cu_analysis(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_du_analysis(UUID) TO authenticated;

-- NB-IoT Functions
GRANT EXECUTE ON FUNCTION public.get_nbiot_overview(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_nbiot_call_flow(UUID) TO authenticated;

-- C-V2X Functions
GRANT EXECUTE ON FUNCTION public.get_v2x_overview(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_pc5_sidelink(UUID) TO authenticated;

-- NTN Functions
GRANT EXECUTE ON FUNCTION public.get_ntn_overview(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_sib19_analysis(UUID) TO authenticated;

-- Analytics Functions
GRANT EXECUTE ON FUNCTION public.get_analytics_dashboard(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_by_category(TEXT, UUID) TO authenticated;

-- Report Functions
GRANT EXECUTE ON FUNCTION public.get_report_templates() TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_report(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_reports() TO authenticated;