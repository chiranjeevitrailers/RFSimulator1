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
  ('650e8400-e29b-41d4-a716-446655440007', 'NTN Satellite Access', 'ntn', '3GPP TS 38.331 - Non-terrestrial network satellite access procedures', 'Release 17'),
  ('650e8400-e29b-41d4-a716-446655440008', 'Security Procedures', 'security', '3GPP TS 33.401 - Security procedures and key management', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440009', 'Performance Tests', 'performance', '3GPP TS 36.521 - Performance and conformance testing', 'Release 15'),
  ('650e8400-e29b-41d4-a716-446655440010', 'QoS Management', 'qos', '3GPP TS 23.203 - Policy and charging control', 'Release 15');

-- Insert sample test cases
INSERT INTO test_cases (id, suite_id, title, threegpp_ref, description, default_parameters, ue_parameters, network_parameters, expected_duration, complexity) VALUES
  -- Basic Attach Procedures
  ('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Basic Attach Procedure', 'TS 36.331 5.3.3.1', 'Standard UE attach procedure with RRC connection establishment', 
   '{"scenario": "normal_attach", "ue_type": "standard"}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   30, 'basic'),
  
  ('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'Attach with Security Context', 'TS 36.331 5.3.3.2', 'UE attach with NAS security context establishment',
   '{"scenario": "secure_attach", "security": true}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   45, 'intermediate'),

  -- Handover Procedures
  ('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'Intra-eNB Handover', 'TS 36.331 5.4.3.1', 'Handover within the same eNodeB',
   '{"scenario": "intra_enb_handover", "handover_type": "intra"}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000002"}',
   60, 'intermediate'),

  ('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440002', 'Inter-eNB Handover', 'TS 36.331 5.4.3.2', 'Handover between different eNodeBs',
   '{"scenario": "inter_enb_handover", "handover_type": "inter"}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000002", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000003"}',
   90, 'advanced'),

  -- IMS Registration
  ('750e8400-e29b-41d4-a716-446655440005', '650e8400-e29b-41d4-a716-446655440003', 'IMS Registration', 'TS 24.229 5.1.1', 'Initial IMS registration procedure',
   '{"scenario": "ims_registration", "ims_type": "initial"}',
   '{"imsi": "001010123456789", "private_id": "user@example.com", "public_id": "sip:user@example.com"}',
   '{"p_cscf": "p-cscf.example.com", "s_cscf": "s-cscf.example.com", "hss": "hss.example.com"}',
   120, 'advanced'),

  -- O-RAN F1 Setup
  ('750e8400-e29b-41d4-a716-446655440006', '650e8400-e29b-41d4-a716-446655440004', 'F1 Setup Request', 'O-RAN.WG4.CUS.0-v01.00 8.2.1', 'F1 interface setup between CU and DU',
   '{"scenario": "f1_setup", "interface": "f1"}',
   '{"cu_id": "0x000001", "du_id": "0x000001"}',
   '{"global_ran_node_id": "0x000001", "supported_ta_list": ["0001", "0002"]}',
   30, 'intermediate'),

  -- NB-IoT Procedures
  ('750e8400-e29b-41d4-a716-446655440007', '650e8400-e29b-41d4-a716-446655440005', 'NPRACH Procedure', 'TS 36.331 5.3.3.3', 'Narrowband Physical Random Access Channel procedure',
   '{"scenario": "nprach", "nbiot": true}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   45, 'intermediate'),

  -- V2X PC5 Sidelink
  ('750e8400-e29b-41d4-a716-446655440008', '650e8400-e29b-41d4-a716-446655440006', 'PC5 Sidelink Discovery', 'TS 36.331 5.10.13', 'Vehicle-to-everything PC5 sidelink discovery',
   '{"scenario": "pc5_discovery", "v2x": true}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   60, 'advanced'),

  -- NTN Satellite Access
  ('750e8400-e29b-41d4-a716-446655440009', '650e8400-e29b-41d4-a716-446655440007', 'Satellite Access Procedure', 'TS 38.331 5.3.3.1', 'Non-terrestrial network satellite access',
   '{"scenario": "satellite_access", "ntn": true}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"gnb_id": "0x000001", "amf_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   90, 'advanced'),

  -- Security Procedures
  ('750e8400-e29b-41d4-a716-446655440010', '650e8400-e29b-41d4-a716-446655440008', 'NAS Security Mode Command', 'TS 33.401 6.2.1', 'NAS security mode command procedure',
   '{"scenario": "nas_security", "security": true}',
   '{"imsi": "001010123456789", "s_tmsi": "0x12345678", "rnti": 61, "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   '{"enb_id": "0x000001", "mme_id": "0x0001", "plmn_id": "00101", "tac": "0001", "cell_id": "0x000001"}',
   30, 'intermediate');

-- Insert sample test case steps for Basic Attach Procedure
INSERT INTO test_case_steps (case_id, step_order, layer, direction, message_type, message_json, expected_params, correlation_keys) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 1, 'RRC', 'UE→eNB', 'RRCConnectionRequest', 
   '{"message": {"c1": {"rrcConnectionRequest": {"criticalExtensions": {"rrcConnectionRequest-r8": {"ue-Identity": {"s-TMSI": "0x12345678"}, "establishmentCause": "mo-Data", "spare": "0"}}}}}}',
   '{"establishmentCause": "mo-Data", "ue-Identity": {"s-TMSI": "0x12345678"}}',
   '{"rnti": 61, "sTMSI": "0x12345678", "cellId": "0x000001"}'),

  ('750e8400-e29b-41d4-a716-446655440001', 2, 'RRC', 'eNB→UE', 'RRCConnectionSetup',
   '{"message": {"c1": {"rrcConnectionSetup": {"rrc-TransactionIdentifier": 0, "criticalExtensions": {"rrcConnectionSetup-r8": {"radioResourceConfigDedicated": {"srb-ToAddModList": [{"srb-Identity": 1, "rlc-Config": {"explicitValue": {"ul-AM-RLC": {"t-PollRetransmit": "ms50", "pollPDU": "p4", "pollByte": "kB25", "maxRetxThreshold": "t4"}, "dl-AM-RLC": {"t-Reordering": "ms35", "t-StatusProhibit": "ms0"}}}, "logicalChannelConfig": {"ul-SpecificParameters": {"priority": 1, "prioritisedBitRate": "infinity", "bucketSizeDuration": "ms100"}}}]}}}}}}}',
   '{"rrc-TransactionIdentifier": 0, "radioResourceConfigDedicated": {"srb-ToAddModList": [{"srb-Identity": 1}]}}',
   '{"rnti": 61, "cRNTI": 61}'),

  ('750e8400-e29b-41d4-a716-446655440001', 3, 'RRC', 'UE→eNB', 'RRCConnectionSetupComplete',
   '{"message": {"c1": {"rrcConnectionSetupComplete": {"rrc-TransactionIdentifier": 0, "criticalExtensions": {"rrcConnectionSetupComplete-r8": {"selectedPLMN-Identity": 1, "dedicatedInfoNAS": "0x2742000B"}}}}}}',
   '{"rrc-TransactionIdentifier": 0, "selectedPLMN-Identity": 1}',
   '{"rnti": 61, "cRNTI": 61}'),

  ('750e8400-e29b-41d4-a716-446655440001', 4, 'S1AP', 'eNB→MME', 'InitialUEMessage',
   '{"protocolIEs": [{"id": 0, "criticality": "reject", "value": {"ENB-UE-S1AP-ID": 1}}, {"id": 8, "criticality": "ignore", "value": {"NAS-PDU": "0x2742000B"}}, {"id": 67, "criticality": "reject", "value": {"TAI": {"pLMNidentity": "00101", "tAC": "0001"}}}, {"id": 100, "criticality": "reject", "value": {"EUTRAN-CGI": {"pLMNidentity": "00101", "cell-ID": "0x000001"}}}]}',
   '{"ENB-UE-S1AP-ID": 1, "TAI": {"pLMNidentity": "00101", "tAC": "0001"}}',
   '{"enbUeId": 1, "plmnId": "00101", "tac": "0001"}');