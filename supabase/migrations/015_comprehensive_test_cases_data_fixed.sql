-- Comprehensive Test Cases Data for 5GLabX Platform (Fixed)
-- This migration populates the database with test cases for all features using the existing schema

-- ==============================================
-- PROTOCOL LAYER TEST CASES
-- ==============================================

-- PHY Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('5G PHY Downlink Analysis', 'Analyze 5G downlink physical layer performance', 'phy', 'srsran', ARRAY['PHY'], '{"throughput": ">100 Mbps", "error_rate": "<0.001", "latency": "<1ms"}'),
('5G PHY Uplink Analysis', 'Analyze 5G uplink physical layer performance', 'phy', 'srsran', ARRAY['PHY'], '{"throughput": ">50 Mbps", "error_rate": "<0.001", "power_efficiency": ">80%"}'),
('MIMO Configuration Test', 'Test MIMO antenna configuration and performance', 'phy', 'srsran', ARRAY['PHY'], '{"mimo_gain": ">3dB", "spatial_streams": 4, "beamforming": true}'),
('Beamforming Analysis', 'Analyze beamforming performance and accuracy', 'phy', 'srsran', ARRAY['PHY'], '{"beam_accuracy": ">95%", "sidelobe_suppression": ">20dB"}'),
('Channel Estimation Test', 'Test channel estimation algorithms', 'phy', 'srsran', ARRAY['PHY'], '{"estimation_error": "<0.1", "convergence_time": "<100ms"}');

-- MAC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('MAC Scheduling Algorithm', 'Test different MAC scheduling algorithms', 'mac', 'srsran', ARRAY['MAC'], '{"fairness_index": ">0.9", "throughput": ">80%", "latency": "<5ms"}'),
('HARQ Retransmission Test', 'Test HARQ retransmission mechanisms', 'mac', 'srsran', ARRAY['MAC'], '{"retransmission_rate": "<5%", "success_rate": ">95%", "delay": "<10ms"}'),
('Resource Block Allocation', 'Test dynamic resource block allocation', 'mac', 'srsran', ARRAY['MAC'], '{"utilization": ">85%", "fairness": ">0.8", "efficiency": ">90%"}'),
('Buffer Management Test', 'Test MAC buffer management and overflow handling', 'mac', 'srsran', ARRAY['MAC'], '{"buffer_overflow": "<1%", "queue_delay": "<20ms", "throughput": ">95%"}');

-- RLC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('RLC Acknowledged Mode', 'Test RLC AM mode with retransmissions', 'rlc', 'srsran', ARRAY['RLC'], '{"reliability": ">99.9%", "latency": "<50ms", "throughput": ">90%"}'),
('RLC Unacknowledged Mode', 'Test RLC UM mode for real-time traffic', 'rlc', 'srsran', ARRAY['RLC'], '{"latency": "<10ms", "jitter": "<2ms", "packet_loss": "<0.1%"}'),
('RLC Transparent Mode', 'Test RLC TM mode for control signaling', 'rlc', 'srsran', ARRAY['RLC'], '{"latency": "<5ms", "reliability": ">99%", "overhead": "<5%"}'),
('RLC Segmentation Test', 'Test RLC segmentation and reassembly', 'rlc', 'srsran', ARRAY['RLC'], '{"segmentation_efficiency": ">95%", "reassembly_success": ">99%"}');

-- PDCP Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('PDCP Ciphering Test', 'Test PDCP ciphering and deciphering', 'pdcp', 'srsran', ARRAY['PDCP'], '{"ciphering_success": ">99.9%", "performance_impact": "<5%", "security_level": "AES-256"}'),
('PDCP Integrity Protection', 'Test PDCP integrity protection mechanisms', 'pdcp', 'srsran', ARRAY['PDCP'], '{"integrity_check": ">99.9%", "tamper_detection": ">99%", "overhead": "<10%"}'),
('PDCP Compression Test', 'Test PDCP header compression', 'pdcp', 'srsran', ARRAY['PDCP'], '{"compression_ratio": ">70%", "decompression_success": ">99%", "bandwidth_saving": ">60%"}'),
('PDCP Sequence Numbering', 'Test PDCP sequence number management', 'pdcp', 'srsran', ARRAY['PDCP'], '{"sequence_accuracy": ">99.9%", "duplicate_detection": ">99%"}');

-- RRC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('RRC Connection Setup', 'Test RRC connection establishment', 'rrc', 'srsran', ARRAY['RRC'], '{"setup_success": ">95%", "setup_time": "<2s", "failure_rate": "<5%"}'),
('RRC State Transitions', 'Test RRC state machine transitions', 'rrc', 'srsran', ARRAY['RRC'], '{"transition_success": ">98%", "transition_time": "<1s", "state_consistency": ">99%"}'),
('RRC Handover Test', 'Test RRC handover procedures', 'rrc', 'srsran', ARRAY['RRC'], '{"handover_success": ">95%", "handover_time": "<100ms", "data_loss": "<0.1%"}'),
('RRC Measurement Reporting', 'Test RRC measurement reporting', 'rrc', 'srsran', ARRAY['RRC'], '{"reporting_accuracy": ">95%", "reporting_delay": "<200ms"}');

-- NAS Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NAS Registration Procedure', 'Test NAS registration and deregistration', 'nas', 'open5gs', ARRAY['NAS'], '{"registration_success": ">98%", "registration_time": "<5s", "security_establishment": ">99%"}'),
('NAS Authentication Test', 'Test NAS authentication procedures', 'nas', 'open5gs', ARRAY['NAS'], '{"authentication_success": ">99%", "authentication_time": "<3s", "security_level": "5G-AKA"}'),
('NAS Service Request', 'Test NAS service request procedures', 'nas', 'open5gs', ARRAY['NAS'], '{"service_success": ">95%", "service_time": "<2s", "qos_establishment": ">98%"}'),
('NAS Security Mode', 'Test NAS security mode procedures', 'nas', 'open5gs', ARRAY['NAS'], '{"security_success": ">99%", "encryption_establishment": ">99%", "integrity_protection": ">99%"}');

-- IMS Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('IMS Registration Test', 'Test IMS registration procedures', 'ims', 'kamailio', ARRAY['IMS'], '{"registration_success": ">95%", "registration_time": "<10s", "sip_response": "200 OK"}'),
('IMS Call Setup Test', 'Test IMS call establishment', 'ims', 'kamailio', ARRAY['IMS'], '{"call_success": ">90%", "setup_time": "<5s", "media_establishment": ">95%"}'),
('IMS Session Management', 'Test IMS session management', 'ims', 'kamailio', ARRAY['IMS'], '{"session_success": ">95%", "session_quality": ">4.0", "codec_negotiation": ">98%"}'),
('IMS Emergency Call Test', 'Test IMS emergency call procedures', 'ims', 'kamailio', ARRAY['IMS'], '{"emergency_success": ">99%", "emergency_time": "<2s", "priority_handling": ">99%"}');

-- ==============================================
-- CORE NETWORK TEST CASES
-- ==============================================

-- AMF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('AMF Registration Test', 'Test AMF registration procedures', 'core_network', 'open5gs', ARRAY['AMF'], '{"registration_success": ">98%", "registration_time": "<3s", "context_establishment": ">99%"}'),
('AMF Mobility Management', 'Test AMF mobility management', 'core_network', 'open5gs', ARRAY['AMF'], '{"mobility_success": ">95%", "handover_time": "<100ms", "context_transfer": ">99%"}'),
('AMF Paging Test', 'Test AMF paging procedures', 'core_network', 'open5gs', ARRAY['AMF'], '{"paging_success": ">95%", "paging_delay": "<200ms", "paging_efficiency": ">90%"}'),
('AMF Security Management', 'Test AMF security context management', 'core_network', 'open5gs', ARRAY['AMF'], '{"security_success": ">99%", "key_management": ">99%", "authentication": ">99%"}');

-- SMF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('SMF PDU Session Establishment', 'Test SMF PDU session establishment', 'core_network', 'open5gs', ARRAY['SMF'], '{"session_success": ">95%", "establishment_time": "<2s", "qos_establishment": ">98%"}'),
('SMF Session Management', 'Test SMF session management procedures', 'core_network', 'open5gs', ARRAY['SMF'], '{"management_success": ">98%", "session_modification": ">95%", "qos_modification": ">95%"}'),
('SMF UPF Selection', 'Test SMF UPF selection algorithms', 'core_network', 'open5gs', ARRAY['SMF'], '{"selection_success": ">95%", "selection_time": "<500ms", "load_balancing": ">90%"}'),
('SMF Policy Control', 'Test SMF policy control integration', 'core_network', 'open5gs', ARRAY['SMF'], '{"policy_success": ">95%", "policy_enforcement": ">98%", "qos_control": ">95%"}');

-- UPF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('UPF Packet Processing', 'Test UPF packet processing performance', 'core_network', 'open5gs', ARRAY['UPF'], '{"processing_latency": "<1ms", "throughput": ">10 Gbps", "packet_loss": "<0.001%"}'),
('UPF Traffic Steering', 'Test UPF traffic steering mechanisms', 'core_network', 'open5gs', ARRAY['UPF'], '{"steering_accuracy": ">99%", "steering_latency": "<100μs", "load_balancing": ">95%"}'),
('UPF QoS Enforcement', 'Test UPF QoS enforcement mechanisms', 'core_network', 'open5gs', ARRAY['UPF'], '{"qos_enforcement": ">98%", "bandwidth_guarantee": ">95%", "latency_guarantee": ">95%"}'),
('UPF Statistics Collection', 'Test UPF statistics and monitoring', 'core_network', 'open5gs', ARRAY['UPF'], '{"statistics_accuracy": ">99%", "collection_interval": "<1s", "reporting_delay": "<5s"}');

-- AUSF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('AUSF Authentication Test', 'Test AUSF authentication procedures', 'core_network', 'open5gs', ARRAY['AUSF'], '{"authentication_success": ">99%", "authentication_time": "<2s", "security_level": "5G-AKA"}'),
('AUSF Key Generation', 'Test AUSF key generation and distribution', 'core_network', 'open5gs', ARRAY['AUSF'], '{"key_generation": ">99%", "key_distribution": ">99%", "key_security": ">99%"}'),
('AUSF Subscription Management', 'Test AUSF subscription data management', 'core_network', 'open5gs', ARRAY['AUSF'], '{"subscription_success": ">99%", "data_consistency": ">99%", "access_control": ">99%"}');

-- UDM Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('UDM Subscription Data', 'Test UDM subscription data management', 'core_network', 'open5gs', ARRAY['UDM'], '{"data_retrieval": ">99%", "data_consistency": ">99%", "access_control": ">99%"}'),
('UDM Authentication Data', 'Test UDM authentication data management', 'core_network', 'open5gs', ARRAY['UDM'], '{"auth_data_success": ">99%", "data_security": ">99%", "key_management": ">99%"}'),
('UDM Policy Data', 'Test UDM policy data management', 'core_network', 'open5gs', ARRAY['UDM'], '{"policy_retrieval": ">99%", "policy_consistency": ">99%", "policy_enforcement": ">98%"}');

-- ==============================================
-- O-RAN TEST CASES
-- ==============================================

-- O-RAN Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('O-RAN Architecture Validation', 'Validate O-RAN architecture compliance', 'oran', 'oran', ARRAY['O-RAN'], '{"compliance": ">95%", "interface_compatibility": ">98%", "performance": ">90%"}'),
('O-RAN Interface Testing', 'Test O-RAN interface implementations', 'oran', 'oran', ARRAY['O-RAN'], '{"interface_success": ">95%", "message_parsing": ">99%", "protocol_compliance": ">98%"}'),
('O-RAN Performance Analysis', 'Analyze O-RAN system performance', 'oran', 'oran', ARRAY['O-RAN'], '{"throughput": ">80%", "latency": "<5ms", "reliability": ">99%"}');

-- O-RAN Interfaces Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('E1 Interface Test', 'Test E1 interface between CU-CP and CU-UP', 'oran', 'oran', ARRAY['E1'], '{"interface_success": ">95%", "message_handling": ">99%", "latency": "<1ms"}'),
('F1-C Interface Test', 'Test F1-C interface between CU and DU', 'oran', 'oran', ARRAY['F1-C'], '{"interface_success": ">95%", "control_plane": ">99%", "latency": "<2ms"}'),
('F1-U Interface Test', 'Test F1-U interface for user plane', 'oran', 'oran', ARRAY['F1-U'], '{"interface_success": ">95%", "user_plane": ">99%", "throughput": ">90%"}'),
('O1 Interface Test', 'Test O1 interface for management', 'oran', 'oran', ARRAY['O1'], '{"interface_success": ">95%", "management_success": ">98%", "monitoring": ">95%"}');

-- CU Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('CU-CP Performance Test', 'Test CU-CP control plane performance', 'oran', 'oran', ARRAY['CU-CP'], '{"cpu_usage": "<80%", "memory_usage": "<80%", "session_capacity": ">1000"}'),
('CU-UP Performance Test', 'Test CU-UP user plane performance', 'oran', 'oran', ARRAY['CU-UP'], '{"throughput": ">5 Gbps", "latency": "<1ms", "packet_loss": "<0.001%"}'),
('CU Load Balancing Test', 'Test CU load balancing mechanisms', 'oran', 'oran', ARRAY['CU'], '{"load_distribution": ">90%", "balancing_efficiency": ">95%", "failover_time": "<5s"}');

-- DU Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('DU Radio Performance Test', 'Test DU radio performance metrics', 'oran', 'oran', ARRAY['DU'], '{"radio_efficiency": ">90%", "coverage": ">95%", "interference": "<-100 dBm"}'),
('DU Resource Management Test', 'Test DU resource management', 'oran', 'oran', ARRAY['DU'], '{"resource_utilization": ">85%", "scheduling_efficiency": ">90%", "qos_guarantee": ">95%"}'),
('DU Power Management Test', 'Test DU power management and efficiency', 'oran', 'oran', ARRAY['DU'], '{"power_efficiency": ">80%", "power_consumption": "<500W", "thermal_management": ">95%"}');

-- ==============================================
-- NB-IoT TEST CASES
-- ==============================================

-- NB-IoT Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT Coverage Test', 'Test NB-IoT coverage and signal quality', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"coverage": ">90%", "signal_quality": ">-100 dBm", "penetration": ">20 dB"}'),
('NB-IoT Power Efficiency Test', 'Test NB-IoT power consumption and efficiency', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"power_consumption": "<100 mW", "battery_life": ">10 years", "efficiency": ">95%"}'),
('NB-IoT Capacity Test', 'Test NB-IoT system capacity and scalability', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"device_capacity": ">50,000", "connection_density": ">1000/km²", "throughput": ">250 kbps"}');

-- NB-IoT Call Flow Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT Attach Procedure', 'Test NB-IoT attach and registration', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"attach_success": ">95%", "attach_time": "<30s", "registration_success": ">98%"}'),
('NB-IoT Data Transmission', 'Test NB-IoT data transmission procedures', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"transmission_success": ">95%", "data_integrity": ">99%", "latency": "<10s"}'),
('NB-IoT Paging Test', 'Test NB-IoT paging and wake-up procedures', 'nbiot', 'nbiot', ARRAY['NB-IoT'], '{"paging_success": ">90%", "wake_up_time": "<5s", "power_efficiency": ">95%"}');

-- NB-IoT PHY Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT PHY Performance', 'Test NB-IoT physical layer performance', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'PHY'], '{"throughput": ">250 kbps", "error_rate": "<0.001", "coverage": ">20 dB"}'),
('NB-IoT Repetition Test', 'Test NB-IoT repetition mechanisms', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'PHY'], '{"repetition_efficiency": ">90%", "coverage_enhancement": ">20 dB", "latency_impact": "<50%"}');

-- NB-IoT MAC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT MAC Scheduling', 'Test NB-IoT MAC scheduling algorithms', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'MAC'], '{"scheduling_efficiency": ">90%", "fairness": ">0.8", "latency": "<10s"}'),
('NB-IoT HARQ Test', 'Test NB-IoT HARQ mechanisms', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'MAC'], '{"harq_success": ">95%", "retransmission_rate": "<10%", "reliability": ">99%"}');

-- NB-IoT RRC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT RRC Procedures', 'Test NB-IoT RRC procedures', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'RRC'], '{"procedure_success": ">95%", "procedure_time": "<30s", "state_management": ">98%"}'),
('NB-IoT Measurement Test', 'Test NB-IoT measurement procedures', 'nbiot', 'nbiot', ARRAY['NB-IoT', 'RRC'], '{"measurement_accuracy": ">95%", "reporting_delay": "<5s", "power_efficiency": ">90%"}');

-- ==============================================
-- C-V2X TEST CASES
-- ==============================================

-- V2X Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X Communication Range', 'Test V2X communication range and coverage', 'v2x', 'v2x', ARRAY['V2X'], '{"communication_range": ">300m", "coverage": ">90%", "reliability": ">95%"}'),
('V2X Latency Test', 'Test V2X communication latency', 'v2x', 'v2x', ARRAY['V2X'], '{"latency": "<100ms", "jitter": "<10ms", "reliability": ">99%"}'),
('V2X Security Test', 'Test V2X security mechanisms', 'v2x', 'v2x', ARRAY['V2X'], '{"security_level": ">99%", "authentication": ">99%", "integrity": ">99%"}');

-- PC5 Sidelink Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('PC5 Sidelink Performance', 'Test PC5 sidelink performance', 'v2x', 'v2x', ARRAY['PC5'], '{"throughput": ">10 Mbps", "latency": "<50ms", "reliability": ">95%"}'),
('PC5 Resource Allocation', 'Test PC5 resource allocation mechanisms', 'v2x', 'v2x', ARRAY['PC5'], '{"allocation_efficiency": ">90%", "collision_rate": "<5%", "fairness": ">0.8"}'),
('PC5 Interference Management', 'Test PC5 interference management', 'v2x', 'v2x', ARRAY['PC5'], '{"interference_rejection": ">20 dB", "sinr": ">10 dB", "capacity": ">80%"}');

-- V2X PHY Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X PHY Performance', 'Test V2X physical layer performance', 'v2x', 'v2x', ARRAY['V2X', 'PHY'], '{"throughput": ">10 Mbps", "error_rate": "<0.001", "coverage": ">300m"}'),
('V2X MIMO Test', 'Test V2X MIMO configurations', 'v2x', 'v2x', ARRAY['V2X', 'PHY'], '{"mimo_gain": ">3dB", "spatial_diversity": ">2", "beamforming": ">95%"}');

-- V2X MAC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X MAC Scheduling', 'Test V2X MAC scheduling algorithms', 'v2x', 'v2x', ARRAY['V2X', 'MAC'], '{"scheduling_efficiency": ">90%", "priority_handling": ">95%", "latency": "<50ms"}'),
('V2X Congestion Control', 'Test V2X congestion control mechanisms', 'v2x', 'v2x', ARRAY['V2X', 'MAC'], '{"congestion_detection": ">95%", "congestion_control": ">90%", "fairness": ">0.8"}');

-- ==============================================
-- NTN TEST CASES
-- ==============================================

-- NTN Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NTN Coverage Analysis', 'Test NTN coverage and connectivity', 'ntn', 'ntn', ARRAY['NTN'], '{"coverage": ">95%", "connectivity": ">90%", "availability": ">99%"}'),
('NTN Propagation Delay', 'Test NTN propagation delay characteristics', 'ntn', 'ntn', ARRAY['NTN'], '{"propagation_delay": "<600ms", "delay_variation": "<50ms", "compensation": ">95%"}'),
('NTN Doppler Effect', 'Test NTN Doppler shift compensation', 'ntn', 'ntn', ARRAY['NTN'], '{"doppler_compensation": ">95%", "frequency_stability": ">99%", "tracking_accuracy": ">90%"}');

-- SIB19 Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('SIB19 Content Analysis', 'Test SIB19 content and structure', 'ntn', 'ntn', ARRAY['NTN', 'SIB19'], '{"content_validity": ">99%", "structure_compliance": ">98%", "update_frequency": "<1s"}'),
('SIB19 Satellite Information', 'Test SIB19 satellite information accuracy', 'ntn', 'ntn', ARRAY['NTN', 'SIB19'], '{"satellite_info_accuracy": ">95%", "orbital_parameters": ">90%", "timing_info": ">99%"}');

-- NTN Timing Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NTN Timing Synchronization', 'Test NTN timing synchronization', 'ntn', 'ntn', ARRAY['NTN'], '{"synchronization_accuracy": ">99%", "timing_error": "<1μs", "stability": ">99%"}'),
('NTN Delay Compensation', 'Test NTN delay compensation mechanisms', 'ntn', 'ntn', ARRAY['NTN'], '{"compensation_accuracy": ">95%", "compensation_delay": "<100ms", "effectiveness": ">90%"}');

-- Doppler Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Doppler Shift Measurement', 'Test Doppler shift measurement accuracy', 'ntn', 'ntn', ARRAY['NTN'], '{"measurement_accuracy": ">95%", "measurement_resolution": "<1 Hz", "tracking_stability": ">90%"}'),
('Doppler Compensation', 'Test Doppler shift compensation', 'ntn', 'ntn', ARRAY['NTN'], '{"compensation_accuracy": ">95%", "compensation_range": ">±50 kHz", "residual_error": "<100 Hz"}');

-- ==============================================
-- UTILITIES TEST CASES
-- ==============================================

-- Report Generator Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Report Generation Test', 'Test automated report generation', 'utilities', 'reporting', ARRAY['REPORT'], '{"generation_success": ">95%", "generation_time": "<30s", "report_quality": ">90%"}'),
('Report Template Test', 'Test report template functionality', 'utilities', 'reporting', ARRAY['REPORT'], '{"template_usage": ">95%", "customization": ">90%", "output_format": ">95%"}');

-- Export Manager Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Data Export Test', 'Test data export functionality', 'utilities', 'export', ARRAY['EXPORT'], '{"export_success": ">95%", "export_time": "<60s", "data_integrity": ">99%"}'),
('Format Conversion Test', 'Test data format conversion', 'utilities', 'export', ARRAY['EXPORT'], '{"conversion_success": ">95%", "format_compatibility": ">98%", "data_preservation": ">99%"}');

-- ==============================================
-- REPORT TEMPLATES
-- ==============================================

INSERT INTO public.report_templates (name, description, template_type, template_config) VALUES
('Protocol Layer Analysis Report', 'Comprehensive protocol layer analysis report', 'protocol', '{"sections": ["PHY", "MAC", "RLC", "PDCP", "RRC", "NAS", "IMS"], "metrics": ["throughput", "latency", "error_rate", "efficiency"]}'),
('Core Network Performance Report', 'Core network performance analysis report', 'core_network', '{"sections": ["AMF", "SMF", "UPF", "AUSF", "UDM"], "metrics": ["performance", "capacity", "reliability", "security"]}'),
('O-RAN Compliance Report', 'O-RAN architecture compliance report', 'oran', '{"sections": ["interfaces", "performance", "compliance"], "metrics": ["interface_compliance", "performance_metrics", "architectural_compliance"]}'),
('NB-IoT Performance Report', 'NB-IoT system performance report', 'nbiot', '{"sections": ["coverage", "capacity", "power_efficiency"], "metrics": ["coverage", "capacity", "power_consumption", "battery_life"]}'),
('C-V2X Safety Report', 'C-V2X safety and performance report', 'v2x', '{"sections": ["communication", "safety", "security"], "metrics": ["latency", "reliability", "security_level", "coverage"]}'),
('NTN Connectivity Report', 'NTN connectivity and performance report', 'ntn', '{"sections": ["coverage", "timing", "doppler"], "metrics": ["coverage", "propagation_delay", "doppler_compensation", "synchronization"]}');

-- ==============================================
-- SAMPLE ANALYTICS DATA
-- ==============================================

-- Insert sample analytics data for dashboard (only if we have test executions)
-- This will be populated when test executions are created