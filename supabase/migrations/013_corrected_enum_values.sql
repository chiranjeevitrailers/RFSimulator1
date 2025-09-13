-- Corrected Test Case Population - Using Correct ENUM Values
-- This migration populates the existing tables with comprehensive test case data

-- First, let's populate test_case_templates with 1000+ entries
DO $$
DECLARE
  i INTEGER;
  template_id UUID;
  protocol_types TEXT[] := ARRAY['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'DIAMETER', 'F1AP', 'E1AP', 'E2AP', 'GTP-U', 'GTP-C', 'PC5', 'Uu', 'X2AP', 'XnAP', 'E2SM', 'O1', 'A1', 'E1'];
  suite_types TEXT[] := ARRAY['functional', 'mobility', 'performance', 'security', 'ims', 'qos', 'oran', 'nbiot', 'ntn', 'v2x', 'interrat', 'negative', 'regression'];
  complexity_levels TEXT[] := ARRAY['basic', 'intermediate', 'advanced'];
  protocol_category TEXT;
  suite_type TEXT;
  complexity TEXT;
  test_case_name TEXT;
  description TEXT;
  threegpp_ref TEXT;
  duration INTEGER;
BEGIN
  -- Generate 1000 test case templates
  FOR i IN 1..1000 LOOP
    template_id := gen_random_uuid();
    
    -- Select random protocol and suite type
    protocol_category := protocol_types[1 + (random() * (array_length(protocol_types, 1) - 1))::int];
    suite_type := suite_types[1 + (random() * (array_length(suite_types, 1) - 1))::int];
    complexity := complexity_levels[1 + (random() * (array_length(complexity_levels, 1) - 1))::int];
    
    -- Generate test case name
    test_case_name := protocol_category || ' Test Case ' || i || ' - ' || suite_type;
    description := 'Comprehensive ' || protocol_category || ' ' || suite_type || ' test case for 3GPP compliance validation';
    threegpp_ref := 'TS ' || (36 + (random() * 3)::int) || '.' || (300 + (random() * 50)::int) || ' ' || (5 + (random() * 10)::int) || '.' || (1 + (random() * 5)::int);
    
    -- Generate duration based on complexity
    CASE complexity
      WHEN 'basic' THEN duration := 20 + (random() * 30)::int;
      WHEN 'intermediate' THEN duration := 40 + (random() * 40)::int;
      WHEN 'advanced' THEN duration := 80 + (random() * 60)::int;
    END CASE;
    
    -- Insert test case template
    INSERT INTO test_case_templates (
      id, template_name, suite_type, protocol_category, description, 
      threegpp_reference, complexity, expected_duration, prerequisites, success_criteria
    ) VALUES (
      template_id,
      test_case_name,
      suite_type::suite_type,
      protocol_category::message_category,
      description,
      threegpp_ref,
      complexity::complexity_level,
      duration,
      '{"test_environment": "configured", "ue_ready": true, "network_available": true}',
      '{"test_passed": true, "all_checks_verified": true, "performance_acceptable": true}'
    );
  END LOOP;
END $$;

-- Populate protocol_specifications with correct column names
DO $$
DECLARE
  i INTEGER;
  protocol_id UUID;
  protocol_types TEXT[] := ARRAY['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'DIAMETER', 'F1AP', 'E1AP', 'E2AP', 'GTP-U', 'GTP-C', 'PC5', 'Uu', 'X2AP', 'XnAP', 'E2SM', 'O1', 'A1', 'E1'];
  protocol_category TEXT;
  threegpp_release TEXT;
  specification_number TEXT;
  section_reference TEXT;
  description TEXT;
BEGIN
  -- Generate protocol specifications for each protocol type
  FOR i IN 1..array_length(protocol_types, 1) LOOP
    protocol_category := protocol_types[i];
    
    -- Check if protocol already exists
    IF NOT EXISTS (SELECT 1 FROM protocol_specifications WHERE protocol_name = protocol_category) THEN
      protocol_id := gen_random_uuid();
      
      -- Generate protocol specification details
      threegpp_release := 'Release ' || (15 + (random() * 5)::int);
      specification_number := 'TS ' || (36 + (random() * 3)::int) || '.' || (300 + (random() * 50)::int);
      section_reference := 'Section ' || (5 + (random() * 10)::int) || '.' || (1 + (random() * 5)::int);
      description := protocol_category || ' protocol specification for 5G network testing and validation';
      
      -- Insert protocol specification with correct column names
      INSERT INTO protocol_specifications (
        id, protocol_name, threegpp_release, specification_number, section_reference, description
      ) VALUES (
        protocol_id,
        protocol_category,
        threegpp_release,
        specification_number,
        section_reference,
        description
      );
    END IF;
  END LOOP;
END $$;

-- Populate message_definitions with 500+ entries using correct column names
DO $$
DECLARE
  i INTEGER;
  message_id UUID;
  protocol_types TEXT[] := ARRAY['RRC', 'NAS', 'S1AP', 'NGAP', 'SIP', 'DIAMETER', 'F1AP', 'E1AP', 'E2AP', 'GTP-U', 'GTP-C', 'PC5', 'Uu', 'X2AP', 'XnAP', 'E2SM', 'O1', 'A1', 'E1'];
  protocol_category TEXT;
  message_name TEXT;
  message_description TEXT;
  protocol_id UUID;
  message_code INTEGER;
  direction TEXT;
  category TEXT;
  threegpp_ref TEXT;
  criticality TEXT;
BEGIN
  -- Generate 500 protocol messages
  FOR i IN 1..500 LOOP
    message_id := gen_random_uuid();
    protocol_category := protocol_types[1 + (random() * (array_length(protocol_types, 1) - 1))::int];
    
    -- Get protocol specification ID
    SELECT id INTO protocol_id FROM protocol_specifications WHERE protocol_name = protocol_category LIMIT 1;
    
    -- Generate message details
    message_name := protocol_category || '_Message_' || i;
    message_description := 'Protocol message for ' || protocol_category || ' testing and validation';
    message_code := 1000 + i;
    
    -- Random direction and category
    direction := CASE (i % 2) WHEN 0 THEN 'UL' ELSE 'DL' END;
    category := protocol_category;
    threegpp_ref := 'TS ' || (36 + (random() * 3)::int) || '.' || (300 + (random() * 50)::int) || ' ' || (5 + (random() * 10)::int) || '.' || (1 + (random() * 5)::int);
    criticality := CASE (i % 3) WHEN 0 THEN 'REJECT' WHEN 1 THEN 'IGNORE' ELSE 'NOTIFY' END;
    
    -- Insert message definition with correct column names
    INSERT INTO message_definitions (
      id, protocol_id, message_name, message_code, direction, category, 
      description, threegpp_reference, criticality
    ) VALUES (
      message_id,
      protocol_id,
      message_name,
      message_code,
      direction::message_direction,
      category::message_category,
      message_description,
      threegpp_ref,
      criticality
    );
  END LOOP;
END $$;

-- Populate ie_definitions with 1000+ entries using CORRECT ENUM VALUES
DO $$
DECLARE
  i INTEGER;
  ie_id UUID;
  message_id UUID;
  ie_name TEXT;
  ie_id_num INTEGER;
  ie_type TEXT;
  ie_format TEXT;
  presence TEXT;
  description TEXT;
  threegpp_ref TEXT;
  range_constraints JSONB;
  enum_values JSONB;
BEGIN
  -- Get some message IDs to reference
  DECLARE
    message_cursor CURSOR FOR SELECT id FROM message_definitions LIMIT 100;
    msg_id UUID;
  BEGIN
    -- Generate 1000 information elements
    FOR i IN 1..1000 LOOP
      ie_id := gen_random_uuid();
      
      -- Get a random message ID
      OPEN message_cursor;
      FETCH message_cursor INTO msg_id;
      CLOSE message_cursor;
      
      -- If no messages exist, skip IE creation
      IF msg_id IS NULL THEN
        EXIT;
      END IF;
      
      -- Generate IE details
      ie_name := 'IE_' || i;
      ie_id_num := i;
      
      -- CORRECT ENUM VALUES:
      -- ie_type: 'MANDATORY', 'OPTIONAL', 'CONDITIONAL', 'EXTENSION'
      -- ie_format: 'INTEGER', 'ENUMERATED', 'BIT_STRING', 'OCTET_STRING', 'SEQUENCE', 'SEQUENCE_OF', 'CHOICE', 'BOOLEAN', 'REAL', 'NULL'
      
      ie_type := CASE (i % 4)
        WHEN 0 THEN 'MANDATORY'
        WHEN 1 THEN 'OPTIONAL'
        WHEN 2 THEN 'CONDITIONAL'
        ELSE 'EXTENSION'
      END;
      
      ie_format := CASE (i % 10)
        WHEN 0 THEN 'INTEGER'
        WHEN 1 THEN 'ENUMERATED'
        WHEN 2 THEN 'BIT_STRING'
        WHEN 3 THEN 'OCTET_STRING'
        WHEN 4 THEN 'SEQUENCE'
        WHEN 5 THEN 'SEQUENCE_OF'
        WHEN 6 THEN 'CHOICE'
        WHEN 7 THEN 'BOOLEAN'
        WHEN 8 THEN 'REAL'
        ELSE 'NULL'
      END;
      
      presence := CASE (i % 3)
        WHEN 0 THEN 'MANDATORY'
        WHEN 1 THEN 'OPTIONAL'
        ELSE 'CONDITIONAL'
      END;
      
      description := 'Information element ' || i || ' for protocol testing';
      threegpp_ref := 'TS ' || (36 + (random() * 3)::int) || '.' || (300 + (random() * 50)::int) || ' ' || (5 + (random() * 10)::int) || '.' || (1 + (random() * 5)::int);
      
      -- Generate constraints and enum values
      range_constraints := jsonb_build_object(
        'min', 0,
        'max', CASE ie_format WHEN 'INTEGER' THEN 2147483647 ELSE 65535 END,
        'step', 1
      );
      
      enum_values := CASE ie_format 
        WHEN 'ENUMERATED' THEN jsonb_build_object(
          'values', ARRAY['value1', 'value2', 'value3', 'value4']
        )
        ELSE NULL
      END;
      
      -- Insert IE definition with CORRECT ENUM VALUES
      INSERT INTO ie_definitions (
        id, message_id, ie_name, ie_id, ie_type, ie_format, presence,
        description, threegpp_reference, range_constraints, enum_values
      ) VALUES (
        ie_id,
        msg_id,
        ie_name,
        ie_id_num,
        ie_type::ie_type,
        ie_format::ie_format,
        presence,
        description,
        threegpp_ref,
        range_constraints,
        enum_values
      );
    END LOOP;
  END;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_test_case_templates_protocol_category ON test_case_templates(protocol_category);
CREATE INDEX IF NOT EXISTS idx_test_case_templates_suite_type ON test_case_templates(suite_type);
CREATE INDEX IF NOT EXISTS idx_test_case_templates_complexity ON test_case_templates(complexity);
CREATE INDEX IF NOT EXISTS idx_message_definitions_protocol_id ON message_definitions(protocol_id);
CREATE INDEX IF NOT EXISTS idx_ie_definitions_message_id ON ie_definitions(message_id);

-- Update statistics
ANALYZE test_case_templates;
ANALYZE protocol_specifications;
ANALYZE message_definitions;
ANALYZE ie_definitions;