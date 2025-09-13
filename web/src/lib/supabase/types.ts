export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'trial' | 'pro' | 'enterprise' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'trial' | 'pro' | 'enterprise' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'trial' | 'pro' | 'enterprise' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      plans: {
        Row: {
          id: string
          stripe_price_id: string
          name: string
          exec_limit: number | null
          fault_simulation: boolean
          created_at: string
        }
        Insert: {
          id?: string
          stripe_price_id: string
          name: string
          exec_limit?: number | null
          fault_simulation?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          stripe_price_id?: string
          name?: string
          exec_limit?: number | null
          fault_simulation?: boolean
          created_at?: string
        }
      }
      subscriptions: {
        Row: {
          user_id: string
          stripe_sub_id: string | null
          plan_id: string
          status: 'active' | 'canceled' | 'past_due'
          period_end: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          stripe_sub_id?: string | null
          plan_id: string
          status?: 'active' | 'canceled' | 'past_due'
          period_end?: string | null
          created_at?: string
        }
        Update: {
          user_id?: string
          stripe_sub_id?: string | null
          plan_id?: string
          status?: 'active' | 'canceled' | 'past_due'
          period_end?: string | null
          created_at?: string
        }
      }
      test_suites: {
        Row: {
          id: string
          name: string
          suite_type: 'functional' | 'mobility' | 'performance' | 'security' | 'ims' | 'qos' | 'oran' | 'nbiot' | 'ntn' | 'v2x' | 'interrat' | 'negative' | 'regression'
          description: string | null
          threegpp_release: string | null
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          suite_type: 'functional' | 'mobility' | 'performance' | 'security' | 'ims' | 'qos' | 'oran' | 'nbiot' | 'ntn' | 'v2x' | 'interrat' | 'negative' | 'regression'
          description?: string | null
          threegpp_release?: string | null
          created_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          suite_type?: 'functional' | 'mobility' | 'performance' | 'security' | 'ims' | 'qos' | 'oran' | 'nbiot' | 'ntn' | 'v2x' | 'interrat' | 'negative' | 'regression'
          description?: string | null
          threegpp_release?: string | null
          created_by?: string | null
          created_at?: string
        }
      }
      test_cases: {
        Row: {
          id: string
          suite_id: string
          title: string
          threegpp_ref: string | null
          description: string | null
          default_parameters: Json | null
          ue_parameters: Json | null
          network_parameters: Json | null
          expected_duration: number | null
          complexity: 'basic' | 'intermediate' | 'advanced'
          created_at: string
        }
        Insert: {
          id?: string
          suite_id: string
          title: string
          threegpp_ref?: string | null
          description?: string | null
          default_parameters?: Json | null
          ue_parameters?: Json | null
          network_parameters?: Json | null
          expected_duration?: number | null
          complexity?: 'basic' | 'intermediate' | 'advanced'
          created_at?: string
        }
        Update: {
          id?: string
          suite_id?: string
          title?: string
          threegpp_ref?: string | null
          description?: string | null
          default_parameters?: Json | null
          ue_parameters?: Json | null
          network_parameters?: Json | null
          expected_duration?: number | null
          complexity?: 'basic' | 'intermediate' | 'advanced'
          created_at?: string
        }
      }
      test_case_steps: {
        Row: {
          id: string
          case_id: string
          step_order: number
          layer: 'RRC' | 'NAS' | 'S1AP' | 'NGAP' | 'SIP' | 'Diameter' | 'F1AP' | 'E1AP' | 'E2AP' | 'GTP-U' | 'PC5' | 'Uu'
          direction: string
          message_type: string
          message_json: Json
          expected_params: Json | null
          correlation_keys: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          step_order: number
          layer: 'RRC' | 'NAS' | 'S1AP' | 'NGAP' | 'SIP' | 'Diameter' | 'F1AP' | 'E1AP' | 'E2AP' | 'GTP-U' | 'PC5' | 'Uu'
          direction: string
          message_type: string
          message_json: Json
          expected_params?: Json | null
          correlation_keys?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          step_order?: number
          layer?: 'RRC' | 'NAS' | 'S1AP' | 'NGAP' | 'SIP' | 'Diameter' | 'F1AP' | 'E1AP' | 'E2AP' | 'GTP-U' | 'PC5' | 'Uu'
          direction?: string
          message_type?: string
          message_json?: Json
          expected_params?: Json | null
          correlation_keys?: Json | null
          created_at?: string
        }
      }
      executions: {
        Row: {
          id: string
          case_id: string
          run_by: string
          status: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
          started_at: string
          finished_at: string | null
          fault_injected: boolean
          summary: Json | null
          parameters: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          case_id: string
          run_by: string
          status?: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
          started_at?: string
          finished_at?: string | null
          fault_injected?: boolean
          summary?: Json | null
          parameters?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          run_by?: string
          status?: 'QUEUED' | 'RUNNING' | 'PASSED' | 'FAILED' | 'CANCELLED'
          started_at?: string
          finished_at?: string | null
          fault_injected?: boolean
          summary?: Json | null
          parameters?: Json | null
          created_at?: string
        }
      }
      execution_steps: {
        Row: {
          id: string
          execution_id: string
          step_order: number | null
          layer: string | null
          direction: string | null
          message_type: string | null
          raw_log: string | null
          parsed_message: Json | null
          verdict: 'PASS' | 'FAIL' | 'INCONCLUSIVE' | null
          fault_type: string | null
          correlation_data: Json | null
          timestamp: string
        }
        Insert: {
          id?: string
          execution_id: string
          step_order?: number | null
          layer?: string | null
          direction?: string | null
          message_type?: string | null
          raw_log?: string | null
          parsed_message?: Json | null
          verdict?: 'PASS' | 'FAIL' | 'INCONCLUSIVE' | null
          fault_type?: string | null
          correlation_data?: Json | null
          timestamp?: string
        }
        Update: {
          id?: string
          execution_id?: string
          step_order?: number | null
          layer?: string | null
          direction?: string | null
          message_type?: string | null
          raw_log?: string | null
          parsed_message?: Json | null
          verdict?: 'PASS' | 'FAIL' | 'INCONCLUSIVE' | null
          fault_type?: string | null
          correlation_data?: Json | null
          timestamp?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Type helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Specific types
export type Profile = Tables<'profiles'>
export type Plan = Tables<'plans'>
export type Subscription = Tables<'subscriptions'>
export type TestSuite = Tables<'test_suites'>
export type TestCase = Tables<'test_cases'>
export type TestCaseStep = Tables<'test_case_steps'>
export type Execution = Tables<'executions'>
export type ExecutionStep = Tables<'execution_steps'>

// User type with profile
export interface User extends Profile {
  subscription?: Subscription & { plan: Plan }
}