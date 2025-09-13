-- Comprehensive Protocol Data Seed
-- This migration populates the database with complete protocol specifications, messages, and IEs

-- Insert protocol specifications
INSERT INTO protocol_specifications (id, protocol_name, threegpp_release, specification_number, section_reference, description) VALUES
  ('800e8400-e29b-41d4-a716-446655440001', 'RRC', 'Release 15', 'TS 36.331', '5.3.3', 'Radio Resource Control protocol'),
  ('800e8400-e29b-41d4-a716-446655440002', 'NAS', 'Release 15', 'TS 24.301', '5.1', 'Non-Access Stratum protocol'),
  ('800e8400-e29b-41d4-a716-446655440003', 'S1AP', 'Release 15', 'TS 36.413', '8.2', 'S1 Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440004', 'NGAP', 'Release 15', 'TS 38.413', '8.2', 'NG Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440005', 'SIP', 'Release 15', 'TS 24.229', '5.1', 'Session Initiation Protocol'),
  ('800e8400-e29b-41d4-a716-446655440006', 'DIAMETER', 'Release 15', 'TS 29.229', '6.1', 'Diameter protocol'),
  ('800e8400-e29b-41d4-a716-446655440007', 'F1AP', 'Release 15', 'TS 38.473', '8.2', 'F1 Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440008', 'E1AP', 'Release 15', 'TS 38.463', '8.2', 'E1 Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440009', 'E2AP', 'Release 15', 'TS 38.463', '8.2', 'E2 Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440010', 'GTP-U', 'Release 15', 'TS 29.281', '4.1', 'GPRS Tunnelling Protocol User plane'),
  ('800e8400-e29b-41d4-a716-446655440011', 'GTP-C', 'Release 15', 'TS 29.274', '7.1', 'GPRS Tunnelling Protocol Control plane'),
  ('800e8400-e29b-41d4-a716-446655440012', 'PC5', 'Release 15', 'TS 36.331', '5.10', 'PC5 interface protocol'),
  ('800e8400-e29b-41d4-a716-446655440013', 'X2AP', 'Release 15', 'TS 36.423', '8.2', 'X2 Application Protocol'),
  ('800e8400-e29b-41d4-a716-446655440014', 'XnAP', 'Release 15', 'TS 38.423', '8.2', 'Xn Application Protocol');

-- Insert RRC message definitions
INSERT INTO message_definitions (id, protocol_id, message_name, message_code, direction, category, description, threegpp_reference, criticality) VALUES
  ('900e8400-e29b-41d4-a716-446655440001', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionRequest', 0, 'UL', 'RRC', 'RRC Connection Request message', 'TS 36.331 5.3.3.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440002', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionSetup', 1, 'DL', 'RRC', 'RRC Connection Setup message', 'TS 36.331 5.3.3.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440003', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionSetupComplete', 2, 'UL', 'RRC', 'RRC Connection Setup Complete message', 'TS 36.331 5.3.3.3', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440004', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReject', 3, 'DL', 'RRC', 'RRC Connection Reject message', 'TS 36.331 5.3.3.4', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440005', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReestablishmentRequest', 4, 'UL', 'RRC', 'RRC Connection Reestablishment Request message', 'TS 36.331 5.3.7.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440006', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReestablishment', 5, 'DL', 'RRC', 'RRC Connection Reestablishment message', 'TS 36.331 5.3.7.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440007', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReestablishmentComplete', 6, 'UL', 'RRC', 'RRC Connection Reestablishment Complete message', 'TS 36.331 5.3.7.3', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440008', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReestablishmentReject', 7, 'DL', 'RRC', 'RRC Connection Reestablishment Reject message', 'TS 36.331 5.3.7.4', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440009', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionRelease', 8, 'DL', 'RRC', 'RRC Connection Release message', 'TS 36.331 5.3.8', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440010', '800e8400-e29b-41d4-a716-446655440001', 'RRCConnectionReleaseComplete', 9, 'UL', 'RRC', 'RRC Connection Release Complete message', 'TS 36.331 5.3.8', 'reject');

-- Insert NAS message definitions
INSERT INTO message_definitions (id, protocol_id, message_name, message_code, direction, category, description, threegpp_reference, criticality) VALUES
  ('900e8400-e29b-41d4-a716-446655440011', '800e8400-e29b-41d4-a716-446655440002', 'AttachRequest', 0x41, 'UL', 'NAS', 'Attach Request message', 'TS 24.301 5.5.1.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440012', '800e8400-e29b-41d4-a716-446655440002', 'AttachAccept', 0x42, 'DL', 'NAS', 'Attach Accept message', 'TS 24.301 5.5.1.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440013', '800e8400-e29b-41d4-a716-446655440002', 'AttachReject', 0x44, 'DL', 'NAS', 'Attach Reject message', 'TS 24.301 5.5.1.3', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440014', '800e8400-e29b-41d4-a716-446655440002', 'AttachComplete', 0x43, 'UL', 'NAS', 'Attach Complete message', 'TS 24.301 5.5.1.4', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440015', '800e8400-e29b-41d4-a716-446655440002', 'DetachRequest', 0x45, 'BIDIRECTIONAL', 'NAS', 'Detach Request message', 'TS 24.301 5.5.2.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440016', '800e8400-e29b-41d4-a716-446655440002', 'DetachAccept', 0x46, 'BIDIRECTIONAL', 'NAS', 'Detach Accept message', 'TS 24.301 5.5.2.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440017', '800e8400-e29b-41d4-a716-446655440002', 'TrackingAreaUpdateRequest', 0x48, 'UL', 'NAS', 'Tracking Area Update Request message', 'TS 24.301 5.5.3.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440018', '800e8400-e29b-41d4-a716-446655440002', 'TrackingAreaUpdateAccept', 0x49, 'DL', 'NAS', 'Tracking Area Update Accept message', 'TS 24.301 5.5.3.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440019', '800e8400-e29b-41d4-a716-446655440002', 'TrackingAreaUpdateReject', 0x4A, 'DL', 'NAS', 'Tracking Area Update Reject message', 'TS 24.301 5.5.3.3', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440020', '800e8400-e29b-41d4-a716-446655440002', 'TrackingAreaUpdateComplete', 0x4B, 'UL', 'NAS', 'Tracking Area Update Complete message', 'TS 24.301 5.5.3.4', 'reject');

-- Insert S1AP message definitions
INSERT INTO message_definitions (id, protocol_id, message_name, message_code, direction, category, description, threegpp_reference, criticality) VALUES
  ('900e8400-e29b-41d4-a716-446655440021', '800e8400-e29b-41d4-a716-446655440003', 'InitialUEMessage', 0, 'UL', 'S1AP', 'Initial UE Message', 'TS 36.413 8.2.1', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440022', '800e8400-e29b-41d4-a716-446655440003', 'DownlinkNASTransport', 1, 'DL', 'S1AP', 'Downlink NAS Transport', 'TS 36.413 8.2.2', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440023', '800e8400-e29b-41d4-a716-446655440003', 'UplinkNASTransport', 2, 'UL', 'S1AP', 'Uplink NAS Transport', 'TS 36.413 8.2.3', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440024', '800e8400-e29b-41d4-a716-446655440003', 'InitialContextSetupRequest', 3, 'DL', 'S1AP', 'Initial Context Setup Request', 'TS 36.413 8.2.4', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440025', '800e8400-e29b-41d4-a716-446655440003', 'InitialContextSetupResponse', 4, 'UL', 'S1AP', 'Initial Context Setup Response', 'TS 36.413 8.2.5', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440026', '800e8400-e29b-41d4-a716-446655440003', 'InitialContextSetupFailure', 5, 'UL', 'S1AP', 'Initial Context Setup Failure', 'TS 36.413 8.2.6', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440027', '800e8400-e29b-41d4-a716-446655440003', 'UEContextReleaseRequest', 6, 'UL', 'S1AP', 'UE Context Release Request', 'TS 36.413 8.2.7', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440028', '800e8400-e29b-41d4-a716-446655440003', 'UEContextReleaseCommand', 7, 'DL', 'S1AP', 'UE Context Release Command', 'TS 36.413 8.2.8', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440029', '800e8400-e29b-41d4-a716-446655440003', 'UEContextReleaseComplete', 8, 'UL', 'S1AP', 'UE Context Release Complete', 'TS 36.413 8.2.9', 'reject'),
  ('900e8400-e29b-41d4-a716-446655440030', '800e8400-e29b-41d4-a716-446655440003', 'HandoverRequired', 9, 'UL', 'S1AP', 'Handover Required', 'TS 36.413 8.2.10', 'reject');

-- Insert comprehensive IE definitions for RRC messages
INSERT INTO ie_definitions (id, message_id, ie_name, ie_id, ie_type, ie_format, presence, description, threegpp_reference, range_constraints, enum_values) VALUES
  -- RRCConnectionRequest IEs
  ('a00e8400-e29b-41d4-a716-446655440001', '900e8400-e29b-41d4-a716-446655440001', 'ue-Identity', 0, 'MANDATORY', 'CHOICE', 'mandatory', 'UE Identity', 'TS 36.331 6.2.2', '{}', '{"s-TMSI": "0x00000000-0xFFFFFFFF", "randomValue": "0x00000000-0xFFFFFFFF"}'),
  ('a00e8400-e29b-41d4-a716-446655440002', '900e8400-e29b-41d4-a716-446655440001', 'establishmentCause', 1, 'MANDATORY', 'ENUMERATED', 'mandatory', 'Establishment Cause', 'TS 36.331 6.2.2', '{}', '{"emergency": 0, "highPriorityAccess": 1, "mt-Access": 2, "mo-Signalling": 3, "mo-Data": 4, "mo-VoiceCall": 5, "mo-VideoCall": 6, "mo-SMS": 7, "mps-PriorityAccess": 8, "mcs-PriorityAccess": 9}'),
  ('a00e8400-e29b-41d4-a716-446655440003', '900e8400-e29b-41d4-a716-446655440001', 'spare', 2, 'MANDATORY', 'BIT_STRING', 'mandatory', 'Spare bits', 'TS 36.331 6.2.2', '{"size": 1}', '{}'),

  -- RRCConnectionSetup IEs
  ('a00e8400-e29b-41d4-a716-446655440004', '900e8400-e29b-41d4-a716-446655440002', 'rrc-TransactionIdentifier', 0, 'MANDATORY', 'INTEGER', 'mandatory', 'RRC Transaction Identifier', 'TS 36.331 6.2.2', '{"min": 0, "max": 3}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440005', '900e8400-e29b-41d4-a716-446655440002', 'radioResourceConfigDedicated', 1, 'MANDATORY', 'SEQUENCE', 'mandatory', 'Radio Resource Config Dedicated', 'TS 36.331 6.2.2', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440006', '900e8400-e29b-41d4-a716-446655440002', 'srb-ToAddModList', 2, 'OPTIONAL', 'SEQUENCE_OF', 'optional', 'SRB To Add Mod List', 'TS 36.331 6.2.2', '{"maxItems": 2}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440007', '900e8400-e29b-41d4-a716-446655440002', 'drb-ToAddModList', 3, 'OPTIONAL', 'SEQUENCE_OF', 'optional', 'DRB To Add Mod List', 'TS 36.331 6.2.2', '{"maxItems": 8}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440008', '900e8400-e29b-41d4-a716-446655440002', 'drb-ToReleaseList', 4, 'OPTIONAL', 'SEQUENCE_OF', 'optional', 'DRB To Release List', 'TS 36.331 6.2.2', '{"maxItems": 8}', '{}'),

  -- RRCConnectionSetupComplete IEs
  ('a00e8400-e29b-41d4-a716-446655440009', '900e8400-e29b-41d4-a716-446655440003', 'rrc-TransactionIdentifier', 0, 'MANDATORY', 'INTEGER', 'mandatory', 'RRC Transaction Identifier', 'TS 36.331 6.2.2', '{"min": 0, "max": 3}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440010', '900e8400-e29b-41d4-a716-446655440003', 'selectedPLMN-Identity', 1, 'MANDATORY', 'INTEGER', 'mandatory', 'Selected PLMN Identity', 'TS 36.331 6.2.2', '{"min": 1, "max": 6}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440011', '900e8400-e29b-41d4-a716-446655440003', 'dedicatedInfoNAS', 2, 'MANDATORY', 'OCTET_STRING', 'mandatory', 'Dedicated Info NAS', 'TS 36.331 6.2.2', '{"minLength": 1, "maxLength": 1024}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440012', '900e8400-e29b-41d4-a716-446655440003', 'registeredMME', 3, 'OPTIONAL', 'SEQUENCE', 'optional', 'Registered MME', 'TS 36.331 6.2.2', '{}', '{}');

-- Insert comprehensive IE definitions for NAS messages
INSERT INTO ie_definitions (id, message_id, ie_name, ie_id, ie_type, ie_format, presence, description, threegpp_reference, range_constraints, enum_values) VALUES
  -- AttachRequest IEs
  ('a00e8400-e29b-41d4-a716-446655440013', '900e8400-e29b-41d4-a716-446655440011', 'EPS attach type', 0, 'MANDATORY', 'ENUMERATED', 'mandatory', 'EPS Attach Type', 'TS 24.301 9.9.3.4', '{}', '{"EPS_ATTACH": 1, "EPS_EMERGENCY_ATTACH": 2, "EPS_COMBINED_ATTACH": 3, "EPS_COMBINED_ATTACH_IMSI": 4}'),
  ('a00e8400-e29b-41d4-a716-446655440014', '900e8400-e29b-41d4-a716-446655440011', 'NAS key set identifier', 1, 'MANDATORY', 'ENUMERATED', 'mandatory', 'NAS Key Set Identifier', 'TS 24.301 9.9.3.21', '{}', '{"native": 0, "mapped": 1}'),
  ('a00e8400-e29b-41d4-a716-446655440015', '900e8400-e29b-41d4-a716-446655440011', 'EPS mobile identity', 2, 'MANDATORY', 'CHOICE', 'mandatory', 'EPS Mobile Identity', 'TS 24.301 9.9.3.12', '{}', '{"IMSI": "0x0000000000000000-0xFFFFFFFFFFFFFFFF", "GUTI": "0x0000000000000000-0xFFFFFFFFFFFFFFFF", "IMEI": "0x0000000000000000-0xFFFFFFFFFFFFFFFF"}'),
  ('a00e8400-e29b-41d4-a716-446655440016', '900e8400-e29b-41d4-a716-446655440011', 'UE network capability', 3, 'MANDATORY', 'OCTET_STRING', 'mandatory', 'UE Network Capability', 'TS 24.301 9.9.3.34', '{"minLength": 4, "maxLength": 15}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440017', '900e8400-e29b-41d4-a716-446655440011', 'ESM message container', 4, 'MANDATORY', 'OCTET_STRING', 'mandatory', 'ESM Message Container', 'TS 24.301 9.9.3.10', '{"minLength": 1, "maxLength": 1024}', '{}'),

  -- AttachAccept IEs
  ('a00e8400-e29b-41d4-a716-446655440018', '900e8400-e29b-41d4-a716-446655440012', 'EPS attach result', 0, 'MANDATORY', 'ENUMERATED', 'mandatory', 'EPS Attach Result', 'TS 24.301 9.9.3.5', '{}', '{"EPS_ONLY": 1, "COMBINED_ATTACH": 2, "EPS_ATTACH_IMSI": 3}'),
  ('a00e8400-e29b-41d4-a716-446655440019', '900e8400-e29b-41d4-a716-446655440012', 'T3412 value', 1, 'MANDATORY', 'ENUMERATED', 'mandatory', 'T3412 Value', 'TS 24.301 9.9.3.30', '{}', '{"6_minutes": 0, "12_minutes": 1, "18_minutes": 2, "24_minutes": 3, "30_minutes": 4, "36_minutes": 5, "42_minutes": 6, "48_minutes": 7}'),
  ('a00e8400-e29b-41d4-a716-446655440020', '900e8400-e29b-41d4-a716-446655440012', 'GUTI', 2, 'MANDATORY', 'CHOICE', 'mandatory', 'GUTI', 'TS 24.301 9.9.3.12', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440021', '900e8400-e29b-41d4-a716-446655440012', 'Location area identification', 3, 'OPTIONAL', 'SEQUENCE', 'optional', 'Location Area Identification', 'TS 24.301 9.9.3.22', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440022', '900e8400-e29b-41d4-a716-446655440012', 'MS identity', 4, 'OPTIONAL', 'CHOICE', 'optional', 'MS Identity', 'TS 24.301 9.9.3.12', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440023', '900e8400-e29b-41d4-a716-446655440012', 'EMM cause', 5, 'OPTIONAL', 'ENUMERATED', 'optional', 'EMM Cause', 'TS 24.301 9.9.3.9', '{}', '{"ILLEGAL_UE": 3, "PEI_NOT_ACCEPTED": 5, "ILLEGAL_ME": 6, "GPRS_SERVICES_NOT_ALLOWED": 7, "GPRS_SERVICES_AND_NON_GPRS_SERVICES_NOT_ALLOWED": 8, "MS_IDENTITY_CANNOT_BE_DERIVED_BY_THE_NETWORK": 9, "IMPLICITLY_DETACHED": 10, "PLMN_NOT_ALLOWED": 11, "TRACKING_AREA_NOT_ALLOWED": 12, "ROAMING_NOT_ALLOWED_IN_THIS_TRACKING_AREA": 13, "NO_SUITABLE_CELLS_IN_TRACKING_AREA": 15, "MSC_TEMPORARILY_NOT_REACHABLE": 16, "NETWORK_FAILURE": 17, "MAC_FAILURE": 20, "SYNCH_FAILURE": 21, "CONGESTION": 22, "UE_SECURITY_CAPABILITIES_MISMATCH": 23, "SECURITY_MODE_REJECTED_UNSPECIFIED": 24, "NOT_AUTHORIZED_FOR_THIS_CSG": 25, "NON_EPS_AUTHENTICATION_UNACCEPTABLE": 26, "CS_SERVICE_TEMPORARILY_NOT_AVAILABLE": 39, "NO_EPS_BEARER_CONTEXT_ACTIVATED": 40, "SERVICE_OPTION_NOT_SUPPORTED": 33, "REQUESTED_SERVICE_OPTION_NOT_SUBSCRIBED": 34, "SERVICE_OPTION_TEMPORARILY_OUT_OF_ORDER": 35, "PTI_ALREADY_IN_USE": 36, "REGULAR_DEACTIVATION": 37, "EPS_QOS_NOT_ACCEPTED": 38, "NETWORK_FAILURE": 17, "REQUESTED_APN_NOT_SUPPORTED_IN_CURRENT_RAT_AND_PLMN_COMBINATION": 43, "SERVICE_OPTION_NOT_SUPPORTED": 33, "REQUESTED_SERVICE_OPTION_NOT_SUBSCRIBED": 34, "SERVICE_OPTION_TEMPORARILY_OUT_OF_ORDER": 35, "PTI_ALREADY_IN_USE": 36, "REGULAR_DEACTIVATION": 37, "EPS_QOS_NOT_ACCEPTED": 38, "NETWORK_FAILURE": 17, "REQUESTED_APN_NOT_SUPPORTED_IN_CURRENT_RAT_AND_PLMN_COMBINATION": 43}');

-- Insert comprehensive IE definitions for S1AP messages
INSERT INTO ie_definitions (id, message_id, ie_name, ie_id, ie_type, ie_format, presence, description, threegpp_reference, range_constraints, enum_values) VALUES
  -- InitialUEMessage IEs
  ('a00e8400-e29b-41d4-a716-446655440024', '900e8400-e29b-41d4-a716-446655440021', 'eNB-UE-S1AP-ID', 0, 'MANDATORY', 'INTEGER', 'mandatory', 'eNB UE S1AP ID', 'TS 36.413 9.2.3.4', '{"min": 0, "max": 16777215}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440025', '900e8400-e29b-41d4-a716-446655440021', 'NAS-PDU', 8, 'MANDATORY', 'OCTET_STRING', 'mandatory', 'NAS PDU', 'TS 36.413 9.2.3.8', '{"minLength": 1, "maxLength": 1024}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440026', '900e8400-e29b-41d4-a716-446655440021', 'TAI', 67, 'MANDATORY', 'SEQUENCE', 'mandatory', 'Tracking Area Identity', 'TS 36.413 9.2.3.17', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440027', '900e8400-e29b-41d4-a716-446655440021', 'EUTRAN-CGI', 100, 'MANDATORY', 'SEQUENCE', 'mandatory', 'E-UTRAN Cell Global Identifier', 'TS 36.413 9.2.3.6', '{}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440028', '900e8400-e29b-41d4-a716-446655440021', 'RRC-Establishment-Cause', 101, 'MANDATORY', 'ENUMERATED', 'mandatory', 'RRC Establishment Cause', 'TS 36.413 9.2.3.12', '{}', '{"emergency": 0, "highPriorityAccess": 1, "mt-Access": 2, "mo-Signalling": 3, "mo-Data": 4, "mo-VoiceCall": 5, "mo-VideoCall": 6, "mo-SMS": 7, "mps-PriorityAccess": 8, "mcs-PriorityAccess": 9}'),
  ('a00e8400-e29b-41d4-a716-446655440029', '900e8400-e29b-41d4-a716-446655440021', 'S-TMSI', 102, 'OPTIONAL', 'OCTET_STRING', 'optional', 'S-TMSI', 'TS 36.413 9.2.3.16', '{"length": 5}', '{}'),

  -- DownlinkNASTransport IEs
  ('a00e8400-e29b-41d4-a716-446655440030', '900e8400-e29b-41d4-a716-446655440022', 'eNB-UE-S1AP-ID', 0, 'MANDATORY', 'INTEGER', 'mandatory', 'eNB UE S1AP ID', 'TS 36.413 9.2.3.4', '{"min": 0, "max": 16777215}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440031', '900e8400-e29b-41d4-a716-446655440022', 'MME-UE-S1AP-ID', 1, 'MANDATORY', 'INTEGER', 'mandatory', 'MME UE S1AP ID', 'TS 36.413 9.2.3.7', '{"min": 0, "max": 16777215}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440032', '900e8400-e29b-41d4-a716-446655440022', 'NAS-PDU', 8, 'MANDATORY', 'OCTET_STRING', 'mandatory', 'NAS PDU', 'TS 36.413 9.2.3.8', '{"minLength": 1, "maxLength": 1024}', '{}'),
  ('a00e8400-e29b-41d4-a716-446655440033', '900e8400-e29b-41d4-a716-446655440022', 'HandoverRestrictionList', 9, 'OPTIONAL', 'SEQUENCE', 'optional', 'Handover Restriction List', 'TS 36.413 9.2.3.5', '{}', '{}');

-- Insert fault injection templates
INSERT INTO fault_injection_templates (id, template_name, fault_type, description, injection_point, fault_parameters, severity_level) VALUES
  ('b00e8400-e29b-41d4-a716-446655440001', 'Message Drop', 'dropped_message', 'Drop a specific protocol message', 'message_transmission', '{"messageType": "RRCConnectionRequest", "dropRate": 0.1}', 'high'),
  ('b00e8400-e29b-41d4-a716-446655440002', 'IE Corruption', 'bad_ie', 'Corrupt an information element', 'ie_processing', '{"ieName": "establishmentCause", "corruptionType": "invalid_value"}', 'medium'),
  ('b00e8400-e29b-41d4-a716-446655440003', 'Timer Expiry', 'timer_expiry', 'Simulate timer expiry', 'timer_management', '{"timerName": "T3412", "expiryTime": 300}', 'medium'),
  ('b00e8400-e29b-41d4-a716-446655440004', 'KPI Degradation', 'kpi_degradation', 'Simulate performance degradation', 'performance_monitoring', '{"kpiName": "throughput", "degradationFactor": 0.5}', 'low'),
  ('b00e8400-e29b-41d4-a716-446655440005', 'Authentication Failure', 'auth_failure', 'Simulate authentication failure', 'security_processing', '{"failureType": "mac_failure", "retryCount": 3}', 'high'),
  ('b00e8400-e29b-41d4-a716-446655440006', 'Handover Failure', 'handover_failure', 'Simulate handover failure', 'mobility_management', '{"failureType": "target_cell_unavailable", "retryCount": 2}', 'high'),
  ('b00e8400-e29b-41d4-a716-446655440007', 'Resource Exhaustion', 'resource_exhaustion', 'Simulate resource exhaustion', 'resource_management', '{"resourceType": "bearer", "exhaustionLevel": 0.9}', 'medium'),
  ('b00e8400-e29b-41d4-a716-446655440008', 'Network Congestion', 'network_congestion', 'Simulate network congestion', 'network_management', '{"congestionLevel": 0.8, "affectedServices": ["data", "voice"]}', 'medium');

-- Insert test case tags
INSERT INTO test_case_tags (id, tag_name, tag_category, description) VALUES
  ('c00e8400-e29b-41d4-a716-446655440001', 'basic', 'complexity', 'Basic complexity test cases'),
  ('c00e8400-e29b-41d4-a716-446655440002', 'intermediate', 'complexity', 'Intermediate complexity test cases'),
  ('c00e8400-e29b-41d4-a716-446655440003', 'advanced', 'complexity', 'Advanced complexity test cases'),
  ('c00e8400-e29b-41d4-a716-446655440004', 'functional', 'type', 'Functional test cases'),
  ('c00e8400-e29b-41d4-a716-446655440005', 'mobility', 'type', 'Mobility test cases'),
  ('c00e8400-e29b-41d4-a716-446655440006', 'performance', 'type', 'Performance test cases'),
  ('c00e8400-e29b-41d4-a716-446655440007', 'security', 'type', 'Security test cases'),
  ('c00e8400-e29b-41d4-a716-446655440008', 'ims', 'type', 'IMS test cases'),
  ('c00e8400-e29b-41d4-a716-446655440009', 'oran', 'type', 'O-RAN test cases'),
  ('c00e8400-e29b-41d4-a716-446655440010', 'nbiot', 'type', 'NB-IoT test cases'),
  ('c00e8400-e29b-41d4-a716-446655440011', 'ntn', 'type', 'NTN test cases'),
  ('c00e8400-e29b-41d4-a716-446655440012', 'v2x', 'type', 'V2X test cases'),
  ('c00e8400-e29b-41d4-a716-446655440013', 'rrc', 'protocol', 'RRC protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440014', 'nas', 'protocol', 'NAS protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440015', 's1ap', 'protocol', 'S1AP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440016', 'ngap', 'protocol', 'NGAP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440017', 'sip', 'protocol', 'SIP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440018', 'diameter', 'protocol', 'Diameter protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440019', 'f1ap', 'protocol', 'F1AP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440020', 'e1ap', 'protocol', 'E1AP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440021', 'e2ap', 'protocol', 'E2AP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440022', 'gtp-u', 'protocol', 'GTP-U protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440023', 'gtp-c', 'protocol', 'GTP-C protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440024', 'pc5', 'protocol', 'PC5 protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440025', 'x2ap', 'protocol', 'X2AP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440026', 'xnap', 'protocol', 'XnAP protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440027', 'e2sm', 'protocol', 'E2SM protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440028', 'o1', 'protocol', 'O1 protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440029', 'a1', 'protocol', 'A1 protocol test cases'),
  ('c00e8400-e29b-41d4-a716-446655440030', 'e1', 'protocol', 'E1 protocol test cases');