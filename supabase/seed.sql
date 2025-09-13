-- Insert default plans
INSERT INTO plans (id, stripe_price_id, name, exec_limit, fault_simulation) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'price_trial', 'Trial', 10, false),
  ('550e8400-e29b-41d4-a716-446655440002', 'price_pro', 'Pro', 100, true),
  ('550e8400-e29b-41d4-a716-446655440003', 'price_enterprise', 'Enterprise', NULL, true);

-- Insert sample test suites
INSERT INTO test_suites (id, name, suite_type, description, threegpp_release) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Basic Attach Procedures', 'functional', '3GPP TS 36.331 - Basic UE attach and detach procedures', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Handover Procedures', 'mobility', '3GPP TS 36.331 - Intra and inter-RAT handover procedures', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440003', 'IMS Registration', 'ims', '3GPP TS 24.229 - IMS registration and session establishment', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440004', 'O-RAN F1 Setup', 'oran', 'O-RAN.WG4.CUS.0-v01.00 - F1 interface setup procedures', 'O-RAN 1.0'),
  ('650e8400-e29b-41d4-a716-446655440005', 'NB-IoT Procedures', 'nbiot', '3GPP TS 36.331 - Narrowband IoT specific procedures', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440006', 'V2X PC5 Sidelink', 'v2x', '3GPP TS 36.331 - Vehicle-to-everything PC5 sidelink procedures', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440007', 'NTN Satellite Access', 'ntn', '3GPP TS 38.331 - Non-terrestrial network satellite access procedures', 'Release 17');