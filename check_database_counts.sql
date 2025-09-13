-- Check current database counts
-- Run this in Supabase SQL Editor to see what's actually in your database

-- Check test case templates
SELECT 
  'test_case_templates' as table_name,
  COUNT(*) as total_count,
  COUNT(DISTINCT protocol_category) as protocol_categories,
  COUNT(DISTINCT suite_type) as suite_types
FROM test_case_templates;

-- Check protocol messages
SELECT 
  'protocol_messages' as table_name,
  COUNT(*) as total_count,
  COUNT(DISTINCT protocol_spec_id) as protocol_specs
FROM protocol_messages;

-- Check information elements
SELECT 
  'protocol_information_elements' as table_name,
  COUNT(*) as total_count,
  COUNT(DISTINCT protocol_spec_id) as protocol_specs
FROM protocol_information_elements;

-- Check message flows
SELECT 
  'test_case_message_flows' as table_name,
  COUNT(*) as total_count,
  COUNT(DISTINCT template_id) as test_cases_with_flows
FROM test_case_message_flows;

-- Check IE configurations
SELECT 
  'test_case_ie_configurations' as table_name,
  COUNT(*) as total_count,
  COUNT(DISTINCT template_id) as test_cases_with_ies
FROM test_case_ie_configurations;

-- Check protocol specifications
SELECT 
  'protocol_specifications' as table_name,
  COUNT(*) as total_count,
  protocol_name
FROM protocol_specifications
GROUP BY protocol_name;

-- Check if the generation functions exist
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name LIKE '%generate%';

-- Check recent test case templates (last 10)
SELECT 
  id,
  template_name,
  protocol_category,
  suite_type,
  complexity,
  created_at
FROM test_case_templates 
ORDER BY created_at DESC 
LIMIT 10;