-- Comprehensive Test Cases Data for 5GLabX Platform
-- This migration populates the database with test cases for all features

-- ==============================================
-- PROTOCOL LAYER TEST CASES
-- ==============================================

-- PHY Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('5G PHY Downlink Analysis', 'Analyze 5G downlink physical layer performance', 'Protocol Layers', 'PHY Layer', ARRAY['PHY'], '{"throughput": ">100 Mbps", "error_rate": "<0.001", "latency": "<1ms"}'),
('5G PHY Uplink Analysis', 'Analyze 5G uplink physical layer performance', 'Protocol Layers', 'PHY Layer', ARRAY['PHY'], '{"throughput": ">50 Mbps", "error_rate": "<0.001", "power_efficiency": ">80%"}'),
('MIMO Configuration Test', 'Test MIMO antenna configuration and performance', 'Protocol Layers', 'PHY Layer', ARRAY['PHY'], '{"mimo_gain": ">3dB", "spatial_streams": 4, "beamforming": true}'),
('Beamforming Analysis', 'Analyze beamforming performance and accuracy', 'Protocol Layers', 'PHY Layer', ARRAY['PHY'], '{"beam_accuracy": ">95%", "sidelobe_suppression": ">20dB"}'),
('Channel Estimation Test', 'Test channel estimation algorithms', 'Protocol Layers', 'PHY Layer', ARRAY['PHY'], '{"estimation_error": "<0.1", "convergence_time": "<100ms"}');

-- MAC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('MAC Scheduling Algorithm', 'Test different MAC scheduling algorithms', 'Protocol Layers', 'MAC Layer', ARRAY['MAC'], '{"fairness_index": ">0.9", "throughput": ">80%", "latency": "<5ms"}'),
('HARQ Retransmission Test', 'Test HARQ retransmission mechanisms', 'Protocol Layers', 'MAC Layer', ARRAY['MAC'], '{"retransmission_rate": "<5%", "success_rate": ">95%", "delay": "<10ms"}'),
('Resource Block Allocation', 'Test dynamic resource block allocation', 'Protocol Layers', 'MAC Layer', ARRAY['MAC'], '{"utilization": ">85%", "fairness": ">0.8", "efficiency": ">90%"}'),
('Buffer Management Test', 'Test MAC buffer management and overflow handling', 'Protocol Layers', 'MAC Layer', ARRAY['MAC'], '{"buffer_overflow": "<1%", "queue_delay": "<20ms", "throughput": ">95%"}');

-- RLC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('RLC Acknowledged Mode', 'Test RLC AM mode with retransmissions', 'Protocol Layers', 'RLC Layer', ARRAY['RLC'], '{"reliability": ">99.9%", "latency": "<50ms", "throughput": ">90%"}'),
('RLC Unacknowledged Mode', 'Test RLC UM mode for real-time traffic', 'Protocol Layers', 'RLC Layer', ARRAY['RLC'], '{"latency": "<10ms", "jitter": "<2ms", "packet_loss": "<0.1%"}'),
('RLC Transparent Mode', 'Test RLC TM mode for control signaling', 'Protocol Layers', 'RLC Layer', ARRAY['RLC'], '{"latency": "<5ms", "reliability": ">99%", "overhead": "<5%"}'),
('RLC Segmentation Test', 'Test RLC segmentation and reassembly', 'Protocol Layers', 'RLC Layer', ARRAY['RLC'], '{"segmentation_efficiency": ">95%", "reassembly_success": ">99%"}');

-- PDCP Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('PDCP Ciphering Test', 'Test PDCP ciphering and deciphering', 'Protocol Layers', 'PDCP Layer', ARRAY['PDCP'], '{"ciphering_success": ">99.9%", "performance_impact": "<5%", "security_level": "AES-256"}'),
('PDCP Integrity Protection', 'Test PDCP integrity protection mechanisms', 'Protocol Layers', 'PDCP Layer', ARRAY['PDCP'], '{"integrity_check": ">99.9%", "tamper_detection": ">99%", "overhead": "<10%"}'),
('PDCP Compression Test', 'Test PDCP header compression', 'Protocol Layers', 'PDCP Layer', ARRAY['PDCP'], '{"compression_ratio": ">70%", "decompression_success": ">99%", "bandwidth_saving": ">60%"}'),
('PDCP Sequence Numbering', 'Test PDCP sequence number management', 'Protocol Layers', 'PDCP Layer', ARRAY['PDCP'], '{"sequence_accuracy": ">99.9%", "duplicate_detection": ">99%"}');

-- RRC Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('RRC Connection Setup', 'Test RRC connection establishment', 'Protocol Layers', 'RRC Layer', ARRAY['RRC'], '{"setup_success": ">95%", "setup_time": "<2s", "failure_rate": "<5%"}'),
('RRC State Transitions', 'Test RRC state machine transitions', 'Protocol Layers', 'RRC Layer', ARRAY['RRC'], '{"transition_success": ">98%", "transition_time": "<1s", "state_consistency": ">99%"}'),
('RRC Handover Test', 'Test RRC handover procedures', 'Protocol Layers', 'RRC Layer', ARRAY['RRC'], '{"handover_success": ">95%", "handover_time": "<100ms", "data_loss": "<0.1%"}'),
('RRC Measurement Reporting', 'Test RRC measurement reporting', 'Protocol Layers', 'RRC Layer', ARRAY['RRC'], '{"reporting_accuracy": ">95%", "reporting_delay": "<200ms"}');

-- NAS Layer Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NAS Registration Procedure', 'Test NAS registration and deregistration', 'Protocol Layers', 'NAS Layer', ARRAY['NAS'], '{"registration_success": ">98%", "registration_time": "<5s", "security_establishment": ">99%"}'),
('NAS Authentication Test', 'Test NAS authentication procedures', 'Protocol Layers', 'NAS Layer', ARRAY['NAS'], '{"authentication_success": ">99%", "authentication_time": "<3s", "security_level": "5G-AKA"}'),
('NAS Service Request', 'Test NAS service request procedures', 'Protocol Layers', 'NAS Layer', ARRAY['NAS'], '{"service_success": ">95%", "service_time": "<2s", "qos_establishment": ">98%"}'),
('NAS Security Mode', 'Test NAS security mode procedures', 'Protocol Layers', 'NAS Layer', ARRAY['NAS'], '{"security_success": ">99%", "encryption_establishment": ">99%", "integrity_protection": ">99%"}');

-- IMS Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('IMS Registration Test', 'Test IMS registration procedures', 'Protocol Layers', 'IMS Layer', ARRAY['IMS'], '{"registration_success": ">95%", "registration_time": "<10s", "sip_response": "200 OK"}'),
('IMS Call Setup Test', 'Test IMS call establishment', 'Protocol Layers', 'IMS Layer', ARRAY['IMS'], '{"call_success": ">90%", "setup_time": "<5s", "media_establishment": ">95%"}'),
('IMS Session Management', 'Test IMS session management', 'Protocol Layers', 'IMS Layer', ARRAY['IMS'], '{"session_success": ">95%", "session_quality": ">4.0", "codec_negotiation": ">98%"}'),
('IMS Emergency Call Test', 'Test IMS emergency call procedures', 'Protocol Layers', 'IMS Layer', ARRAY['IMS'], '{"emergency_success": ">99%", "emergency_time": "<2s", "priority_handling": ">99%"}');

-- ==============================================
-- CORE NETWORK TEST CASES
-- ==============================================

-- AMF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('AMF Registration Test', 'Test AMF registration procedures', 'Core Network', 'AMF', ARRAY['AMF'], '{"registration_success": ">98%", "registration_time": "<3s", "context_establishment": ">99%"}'),
('AMF Mobility Management', 'Test AMF mobility management', 'Core Network', 'AMF', ARRAY['AMF'], '{"mobility_success": ">95%", "handover_time": "<100ms", "context_transfer": ">99%"}'),
('AMF Paging Test', 'Test AMF paging procedures', 'Core Network', 'AMF', ARRAY['AMF'], '{"paging_success": ">95%", "paging_delay": "<200ms", "paging_efficiency": ">90%"}'),
('AMF Security Management', 'Test AMF security context management', 'Core Network', 'AMF', ARRAY['AMF'], '{"security_success": ">99%", "key_management": ">99%", "authentication": ">99%"}');

-- SMF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('SMF PDU Session Establishment', 'Test SMF PDU session establishment', 'Core Network', 'SMF', ARRAY['SMF'], '{"session_success": ">95%", "establishment_time": "<2s", "qos_establishment": ">98%"}'),
('SMF Session Management', 'Test SMF session management procedures', 'Core Network', 'SMF', ARRAY['SMF'], '{"management_success": ">98%", "session_modification": ">95%", "qos_modification": ">95%"}'),
('SMF UPF Selection', 'Test SMF UPF selection algorithms', 'Core Network', 'SMF', ARRAY['SMF'], '{"selection_success": ">95%", "selection_time": "<500ms", "load_balancing": ">90%"}'),
('SMF Policy Control', 'Test SMF policy control integration', 'Core Network', 'SMF', ARRAY['SMF'], '{"policy_success": ">95%", "policy_enforcement": ">98%", "qos_control": ">95%"}');

-- UPF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('UPF Packet Processing', 'Test UPF packet processing performance', 'Core Network', 'UPF', ARRAY['UPF'], '{"processing_latency": "<1ms", "throughput": ">10 Gbps", "packet_loss": "<0.001%"}'),
('UPF Traffic Steering', 'Test UPF traffic steering mechanisms', 'Core Network', 'UPF', ARRAY['UPF'], '{"steering_accuracy": ">99%", "steering_latency": "<100μs", "load_balancing": ">95%"}'),
('UPF QoS Enforcement', 'Test UPF QoS enforcement mechanisms', 'Core Network', 'UPF', ARRAY['UPF'], '{"qos_enforcement": ">98%", "bandwidth_guarantee": ">95%", "latency_guarantee": ">95%"}'),
('UPF Statistics Collection', 'Test UPF statistics and monitoring', 'Core Network', 'UPF', ARRAY['UPF'], '{"statistics_accuracy": ">99%", "collection_interval": "<1s", "reporting_delay": "<5s"}');

-- AUSF Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('AUSF Authentication Test', 'Test AUSF authentication procedures', 'Core Network', 'AUSF', ARRAY['AUSF'], '{"authentication_success": ">99%", "authentication_time": "<2s", "security_level": "5G-AKA"}'),
('AUSF Key Generation', 'Test AUSF key generation and distribution', 'Core Network', 'AUSF', ARRAY['AUSF'], '{"key_generation": ">99%", "key_distribution": ">99%", "key_security": ">99%"}'),
('AUSF Subscription Management', 'Test AUSF subscription data management', 'Core Network', 'AUSF', ARRAY['AUSF'], '{"subscription_success": ">99%", "data_consistency": ">99%", "access_control": ">99%"}');

-- UDM Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('UDM Subscription Data', 'Test UDM subscription data management', 'Core Network', 'UDM', ARRAY['UDM'], '{"data_retrieval": ">99%", "data_consistency": ">99%", "access_control": ">99%"}'),
('UDM Authentication Data', 'Test UDM authentication data management', 'Core Network', 'UDM', ARRAY['UDM'], '{"auth_data_success": ">99%", "data_security": ">99%", "key_management": ">99%"}'),
('UDM Policy Data', 'Test UDM policy data management', 'Core Network', 'UDM', ARRAY['UDM'], '{"policy_retrieval": ">99%", "policy_consistency": ">99%", "policy_enforcement": ">98%"}');

-- ==============================================
-- O-RAN TEST CASES
-- ==============================================

-- O-RAN Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('O-RAN Architecture Validation', 'Validate O-RAN architecture compliance', 'O-RAN Analysis', 'O-RAN Overview', ARRAY['O-RAN'], '{"compliance": ">95%", "interface_compatibility": ">98%", "performance": ">90%"}'),
('O-RAN Interface Testing', 'Test O-RAN interface implementations', 'O-RAN Analysis', 'O-RAN Overview', ARRAY['O-RAN'], '{"interface_success": ">95%", "message_parsing": ">99%", "protocol_compliance": ">98%"}'),
('O-RAN Performance Analysis', 'Analyze O-RAN system performance', 'O-RAN Analysis', 'O-RAN Overview', ARRAY['O-RAN'], '{"throughput": ">80%", "latency": "<5ms", "reliability": ">99%"}');

-- O-RAN Interfaces Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('E1 Interface Test', 'Test E1 interface between CU-CP and CU-UP', 'O-RAN Analysis', 'Interfaces', ARRAY['E1'], '{"interface_success": ">95%", "message_handling": ">99%", "latency": "<1ms"}'),
('F1-C Interface Test', 'Test F1-C interface between CU and DU', 'O-RAN Analysis', 'Interfaces', ARRAY['F1-C'], '{"interface_success": ">95%", "control_plane": ">99%", "latency": "<2ms"}'),
('F1-U Interface Test', 'Test F1-U interface for user plane', 'O-RAN Analysis', 'Interfaces', ARRAY['F1-U'], '{"interface_success": ">95%", "user_plane": ">99%", "throughput": ">90%"}'),
('O1 Interface Test', 'Test O1 interface for management', 'O-RAN Analysis', 'Interfaces', ARRAY['O1'], '{"interface_success": ">95%", "management_success": ">98%", "monitoring": ">95%"}');

-- CU Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('CU-CP Performance Test', 'Test CU-CP control plane performance', 'O-RAN Analysis', 'CU Analysis', ARRAY['CU-CP'], '{"cpu_usage": "<80%", "memory_usage": "<80%", "session_capacity": ">1000"}'),
('CU-UP Performance Test', 'Test CU-UP user plane performance', 'O-RAN Analysis', 'CU Analysis', ARRAY['CU-UP'], '{"throughput": ">5 Gbps", "latency": "<1ms", "packet_loss": "<0.001%"}'),
('CU Load Balancing Test', 'Test CU load balancing mechanisms', 'O-RAN Analysis', 'CU Analysis', ARRAY['CU'], '{"load_distribution": ">90%", "balancing_efficiency": ">95%", "failover_time": "<5s"}');

-- DU Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('DU Radio Performance Test', 'Test DU radio performance metrics', 'O-RAN Analysis', 'DU Analysis', ARRAY['DU'], '{"radio_efficiency": ">90%", "coverage": ">95%", "interference": "<-100 dBm"}'),
('DU Resource Management Test', 'Test DU resource management', 'O-RAN Analysis', 'DU Analysis', ARRAY['DU'], '{"resource_utilization": ">85%", "scheduling_efficiency": ">90%", "qos_guarantee": ">95%"}'),
('DU Power Management Test', 'Test DU power management and efficiency', 'O-RAN Analysis', 'DU Analysis', ARRAY['DU'], '{"power_efficiency": ">80%", "power_consumption": "<500W", "thermal_management": ">95%"}');

-- ==============================================
-- NB-IoT TEST CASES
-- ==============================================

-- NB-IoT Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT Coverage Test', 'Test NB-IoT coverage and signal quality', 'NB-IoT Analysis', 'NB-IoT Overview', ARRAY['NB-IoT'], '{"coverage": ">90%", "signal_quality": ">-100 dBm", "penetration": ">20 dB"}'),
('NB-IoT Power Efficiency Test', 'Test NB-IoT power consumption and efficiency', 'NB-IoT Analysis', 'NB-IoT Overview', ARRAY['NB-IoT'], '{"power_consumption": "<100 mW", "battery_life": ">10 years", "efficiency": ">95%"}'),
('NB-IoT Capacity Test', 'Test NB-IoT system capacity and scalability', 'NB-IoT Analysis', 'NB-IoT Overview', ARRAY['NB-IoT'], '{"device_capacity": ">50,000", "connection_density": ">1000/km²", "throughput": ">250 kbps"}');

-- NB-IoT Call Flow Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT Attach Procedure', 'Test NB-IoT attach and registration', 'NB-IoT Analysis', 'NB-IoT Call Flow', ARRAY['NB-IoT'], '{"attach_success": ">95%", "attach_time": "<30s", "registration_success": ">98%"}'),
('NB-IoT Data Transmission', 'Test NB-IoT data transmission procedures', 'NB-IoT Analysis', 'NB-IoT Call Flow', ARRAY['NB-IoT'], '{"transmission_success": ">95%", "data_integrity": ">99%", "latency": "<10s"}'),
('NB-IoT Paging Test', 'Test NB-IoT paging and wake-up procedures', 'NB-IoT Analysis', 'NB-IoT Call Flow', ARRAY['NB-IoT'], '{"paging_success": ">90%", "wake_up_time": "<5s", "power_efficiency": ">95%"}');

-- NB-IoT PHY Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT PHY Performance', 'Test NB-IoT physical layer performance', 'NB-IoT Analysis', 'NB-IoT PHY', ARRAY['NB-IoT', 'PHY'], '{"throughput": ">250 kbps", "error_rate": "<0.001", "coverage": ">20 dB"}'),
('NB-IoT Repetition Test', 'Test NB-IoT repetition mechanisms', 'NB-IoT Analysis', 'NB-IoT PHY', ARRAY['NB-IoT', 'PHY'], '{"repetition_efficiency": ">90%", "coverage_enhancement": ">20 dB", "latency_impact": "<50%"}');

-- NB-IoT MAC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT MAC Scheduling', 'Test NB-IoT MAC scheduling algorithms', 'NB-IoT Analysis', 'NB-IoT MAC', ARRAY['NB-IoT', 'MAC'], '{"scheduling_efficiency": ">90%", "fairness": ">0.8", "latency": "<10s"}'),
('NB-IoT HARQ Test', 'Test NB-IoT HARQ mechanisms', 'NB-IoT Analysis', 'NB-IoT MAC', ARRAY['NB-IoT', 'MAC'], '{"harq_success": ">95%", "retransmission_rate": "<10%", "reliability": ">99%"}');

-- NB-IoT RRC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NB-IoT RRC Procedures', 'Test NB-IoT RRC procedures', 'NB-IoT Analysis', 'NB-IoT RRC', ARRAY['NB-IoT', 'RRC'], '{"procedure_success": ">95%", "procedure_time": "<30s", "state_management": ">98%"}'),
('NB-IoT Measurement Test', 'Test NB-IoT measurement procedures', 'NB-IoT Analysis', 'NB-IoT RRC', ARRAY['NB-IoT', 'RRC'], '{"measurement_accuracy": ">95%", "reporting_delay": "<5s", "power_efficiency": ">90%"}');

-- ==============================================
-- C-V2X TEST CASES
-- ==============================================

-- V2X Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X Communication Range', 'Test V2X communication range and coverage', 'C-V2X Analysis', 'V2X Overview', ARRAY['V2X'], '{"communication_range": ">300m", "coverage": ">90%", "reliability": ">95%"}'),
('V2X Latency Test', 'Test V2X communication latency', 'C-V2X Analysis', 'V2X Overview', ARRAY['V2X'], '{"latency": "<100ms", "jitter": "<10ms", "reliability": ">99%"}'),
('V2X Security Test', 'Test V2X security mechanisms', 'C-V2X Analysis', 'V2X Overview', ARRAY['V2X'], '{"security_level": ">99%", "authentication": ">99%", "integrity": ">99%"}');

-- PC5 Sidelink Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('PC5 Sidelink Performance', 'Test PC5 sidelink performance', 'C-V2X Analysis', 'PC5 Sidelink', ARRAY['PC5'], '{"throughput": ">10 Mbps", "latency": "<50ms", "reliability": ">95%"}'),
('PC5 Resource Allocation', 'Test PC5 resource allocation mechanisms', 'C-V2X Analysis', 'PC5 Sidelink', ARRAY['PC5'], '{"allocation_efficiency": ">90%", "collision_rate": "<5%", "fairness": ">0.8"}'),
('PC5 Interference Management', 'Test PC5 interference management', 'C-V2X Analysis', 'PC5 Sidelink', ARRAY['PC5'], '{"interference_rejection": ">20 dB", "sinr": ">10 dB", "capacity": ">80%"}');

-- V2X PHY Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X PHY Performance', 'Test V2X physical layer performance', 'C-V2X Analysis', 'V2X PHY', ARRAY['V2X', 'PHY'], '{"throughput": ">10 Mbps", "error_rate": "<0.001", "coverage": ">300m"}'),
('V2X MIMO Test', 'Test V2X MIMO configurations', 'C-V2X Analysis', 'V2X PHY', ARRAY['V2X', 'PHY'], '{"mimo_gain": ">3dB", "spatial_diversity": ">2", "beamforming": ">95%"}');

-- V2X MAC Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('V2X MAC Scheduling', 'Test V2X MAC scheduling algorithms', 'C-V2X Analysis', 'V2X MAC', ARRAY['V2X', 'MAC'], '{"scheduling_efficiency": ">90%", "priority_handling": ">95%", "latency": "<50ms"}'),
('V2X Congestion Control', 'Test V2X congestion control mechanisms', 'C-V2X Analysis', 'V2X MAC', ARRAY['V2X', 'MAC'], '{"congestion_detection": ">95%", "congestion_control": ">90%", "fairness": ">0.8"}');

-- ==============================================
-- NTN TEST CASES
-- ==============================================

-- NTN Overview Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NTN Coverage Analysis', 'Test NTN coverage and connectivity', 'NTN Analysis', 'NTN Overview', ARRAY['NTN'], '{"coverage": ">95%", "connectivity": ">90%", "availability": ">99%"}'),
('NTN Propagation Delay', 'Test NTN propagation delay characteristics', 'NTN Analysis', 'NTN Overview', ARRAY['NTN'], '{"propagation_delay": "<600ms", "delay_variation": "<50ms", "compensation": ">95%"}'),
('NTN Doppler Effect', 'Test NTN Doppler shift compensation', 'NTN Analysis', 'NTN Overview', ARRAY['NTN'], '{"doppler_compensation": ">95%", "frequency_stability": ">99%", "tracking_accuracy": ">90%"}');

-- SIB19 Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('SIB19 Content Analysis', 'Test SIB19 content and structure', 'NTN Analysis', 'SIB19 Analysis', ARRAY['NTN', 'SIB19'], '{"content_validity": ">99%", "structure_compliance": ">98%", "update_frequency": "<1s"}'),
('SIB19 Satellite Information', 'Test SIB19 satellite information accuracy', 'NTN Analysis', 'SIB19 Analysis', ARRAY['NTN', 'SIB19'], '{"satellite_info_accuracy": ">95%", "orbital_parameters": ">90%", "timing_info": ">99%"}');

-- NTN Timing Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('NTN Timing Synchronization', 'Test NTN timing synchronization', 'NTN Analysis', 'Timing & Delay', ARRAY['NTN'], '{"synchronization_accuracy": ">99%", "timing_error": "<1μs", "stability": ">99%"}'),
('NTN Delay Compensation', 'Test NTN delay compensation mechanisms', 'NTN Analysis', 'Timing & Delay', ARRAY['NTN'], '{"compensation_accuracy": ">95%", "compensation_delay": "<100ms", "effectiveness": ">90%"}');

-- Doppler Analysis Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Doppler Shift Measurement', 'Test Doppler shift measurement accuracy', 'NTN Analysis', 'Doppler Analysis', ARRAY['NTN'], '{"measurement_accuracy": ">95%", "measurement_resolution": "<1 Hz", "tracking_stability": ">90%"}'),
('Doppler Compensation', 'Test Doppler shift compensation', 'NTN Analysis', 'Doppler Analysis', ARRAY['NTN'], '{"compensation_accuracy": ">95%", "compensation_range": ">±50 kHz", "residual_error": "<100 Hz"}');

-- ==============================================
-- UTILITIES TEST CASES
-- ==============================================

-- Report Generator Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Report Generation Test', 'Test automated report generation', 'Utilities', 'Report Generator', ARRAY['REPORT'], '{"generation_success": ">95%", "generation_time": "<30s", "report_quality": ">90%"}'),
('Report Template Test', 'Test report template functionality', 'Utilities', 'Report Generator', ARRAY['REPORT'], '{"template_usage": ">95%", "customization": ">90%", "output_format": ">95%"}');

-- Export Manager Test Cases
INSERT INTO public.test_cases (name, description, category, subcategory, protocol_stack, expected_output) VALUES
('Data Export Test', 'Test data export functionality', 'Utilities', 'Export Manager', ARRAY['EXPORT'], '{"export_success": ">95%", "export_time": "<60s", "data_integrity": ">99%"}'),
('Format Conversion Test', 'Test data format conversion', 'Utilities', 'Export Manager', ARRAY['EXPORT'], '{"conversion_success": ">95%", "format_compatibility": ">98%", "data_preservation": ">99%"}');

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

-- Insert sample analytics data for dashboard
INSERT INTO public.analytics_dashboard (execution_id, metric_name, metric_value, metric_unit, category, subcategory) VALUES
-- Protocol Layer Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'PHY Throughput', 150.5, 'Mbps', 'Protocol Layers', 'PHY Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'MAC Efficiency', 92.3, '%', 'Protocol Layers', 'MAC Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'RLC Reliability', 99.8, '%', 'Protocol Layers', 'RLC Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'PDCP Compression', 75.2, '%', 'Protocol Layers', 'PDCP Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'RRC Success Rate', 96.5, '%', 'Protocol Layers', 'RRC Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'NAS Authentication', 99.2, '%', 'Protocol Layers', 'NAS Layer'),
((SELECT id FROM public.test_executions LIMIT 1), 'IMS Call Success', 94.8, '%', 'Protocol Layers', 'IMS Layer'),

-- Core Network Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'AMF Registration', 98.1, '%', 'Core Network', 'AMF'),
((SELECT id FROM public.test_executions LIMIT 1), 'SMF Session Success', 95.7, '%', 'Core Network', 'SMF'),
((SELECT id FROM public.test_executions LIMIT 1), 'UPF Throughput', 8.5, 'Gbps', 'Core Network', 'UPF'),
((SELECT id FROM public.test_executions LIMIT 1), 'AUSF Authentication', 99.5, '%', 'Core Network', 'AUSF'),
((SELECT id FROM public.test_executions LIMIT 1), 'UDM Data Access', 99.1, '%', 'Core Network', 'UDM'),

-- O-RAN Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'O-RAN Compliance', 97.3, '%', 'O-RAN Analysis', 'O-RAN Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'E1 Interface Latency', 0.8, 'ms', 'O-RAN Analysis', 'Interfaces'),
((SELECT id FROM public.test_executions LIMIT 1), 'CU Performance', 89.2, '%', 'O-RAN Analysis', 'CU Analysis'),
((SELECT id FROM public.test_executions LIMIT 1), 'DU Efficiency', 91.7, '%', 'O-RAN Analysis', 'DU Analysis'),

-- NB-IoT Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'NB-IoT Coverage', 93.5, '%', 'NB-IoT Analysis', 'NB-IoT Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'NB-IoT Power Efficiency', 96.8, '%', 'NB-IoT Analysis', 'NB-IoT Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'NB-IoT Capacity', 45000, 'devices', 'NB-IoT Analysis', 'NB-IoT Overview'),

-- C-V2X Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'V2X Latency', 45.2, 'ms', 'C-V2X Analysis', 'V2X Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'V2X Reliability', 98.9, '%', 'C-V2X Analysis', 'V2X Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'PC5 Throughput', 12.3, 'Mbps', 'C-V2X Analysis', 'PC5 Sidelink'),

-- NTN Metrics
((SELECT id FROM public.test_executions LIMIT 1), 'NTN Coverage', 96.1, '%', 'NTN Analysis', 'NTN Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'NTN Propagation Delay', 280.5, 'ms', 'NTN Analysis', 'NTN Overview'),
((SELECT id FROM public.test_executions LIMIT 1), 'Doppler Compensation', 97.8, '%', 'NTN Analysis', 'Doppler Analysis');