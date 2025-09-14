-- 5GLabX Migration 010 - Extended schema for additional sidebar analysis tables
-- Created by AI assistant
--
-- NOTE: This migration is idempotent – each CREATE guards against existing objects.

-- Helper type
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================
-- Function to create a standard analysis table
-- =============================================================
CREATE OR REPLACE FUNCTION create_analysis_table(table_name text) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables WHERE table_name = table_name
  ) THEN
    EXECUTE format(
      $$CREATE TABLE IF NOT EXISTS %I (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          execution_id uuid NOT NULL REFERENCES test_executions(id) ON DELETE CASCADE,
          timestamp timestamptz NOT NULL DEFAULT now(),
          data jsonb,
          created_at timestamptz NOT NULL DEFAULT now()
      );$$,
      table_name
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- =============================================================
-- O-RAN extra tables
-- =============================================================
SELECT create_analysis_table('oran_performance');
SELECT create_analysis_table('oran_xapps');
SELECT create_analysis_table('oran_smo');

-- =============================================================
-- NB-IoT extra tables
-- =============================================================
SELECT create_analysis_table('nbiot_analytics');
SELECT create_analysis_table('nbiot_phy_layer');
SELECT create_analysis_table('nbiot_mac_layer');
SELECT create_analysis_table('nbiot_rrc_layer');
SELECT create_analysis_table('nbiot_testing');

-- =============================================================
-- V2X extra tables
-- =============================================================
SELECT create_analysis_table('v2x_analytics');
SELECT create_analysis_table('v2x_phy_layer');
SELECT create_analysis_table('v2x_mac_layer');
SELECT create_analysis_table('v2x_testing');
SELECT create_analysis_table('v2x_scenarios');

-- =============================================================
-- NTN extra tables
-- =============================================================
SELECT create_analysis_table('ntn_satellites');
SELECT create_analysis_table('ntn_analytics');
SELECT create_analysis_table('ntn_timing');
SELECT create_analysis_table('ntn_doppler');
SELECT create_analysis_table('ntn_scenarios');

-- =============================================================
-- Core-network / 4G Legacy extras
-- =============================================================
SELECT create_analysis_table('config_manager_analysis');
SELECT create_analysis_table('mme_analysis');
SELECT create_analysis_table('sgw_analysis');
SELECT create_analysis_table('pgw_analysis');

-- Cleanup helper
DROP FUNCTION IF EXISTS create_analysis_table(text);

-- =============================================================
-- RPC: export_execution_data(execution_id uuid, format text)
-- Returns bytea containing exported archive; simple CSV/JSON switch for now
-- =============================================================
CREATE OR REPLACE FUNCTION public.export_execution_data(p_execution_id uuid, p_format text DEFAULT 'json')
RETURNS bytea
LANGUAGE plpgsql
AS $$
DECLARE
  result bytea;
BEGIN
  IF p_format = 'json' THEN
    SELECT encode(convert_to(json_agg(row_to_json(t))::text, 'utf8'), 'base64')
      INTO result
      FROM (
        SELECT * FROM execution_logs WHERE execution_id = p_execution_id
      ) t;
  ELSIF p_format = 'csv' THEN
    SELECT encode(convert_to(
      (SELECT string_agg(row_to_csv(t), E'\n') FROM (
         SELECT * FROM execution_logs WHERE execution_id = p_execution_id
       ) t), 'utf8'), 'base64') INTO result;
  ELSE
    RAISE EXCEPTION 'Unsupported format %', p_format;
  END IF;
  RETURN result;
END;
$$;

COMMENT ON FUNCTION public.export_execution_data IS 'Export all execution_logs for a given execution as base64-encoded blob (json or csv).';