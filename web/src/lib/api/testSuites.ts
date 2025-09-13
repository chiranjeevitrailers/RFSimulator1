import { supabase } from '../supabase/client'
import type { TestSuite, TestCase } from '../supabase/types'

export interface TestSuiteFilters {
  suiteType?: string
  complexity?: string
  search?: string
  threegppRelease?: string
}

export interface TestCaseFilters {
  suiteId?: string
  complexity?: string
  search?: string
  threegppRef?: string
}

export class TestSuitesAPI {
  // Get all test suites
  static async getTestSuites(filters?: TestSuiteFilters): Promise<TestSuite[]> {
    try {
      let query = supabase
        .from('test_suites')
        .select('*')
        .order('name')

      if (filters?.suiteType) {
        query = query.eq('suite_type', filters.suiteType)
      }

      if (filters?.threegppRelease) {
        query = query.eq('threegpp_release', filters.threegppRelease)
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting test suites:', error)
      throw error
    }
  }

  // Get test suite by ID
  static async getTestSuite(suiteId: string): Promise<TestSuite | null> {
    try {
      const { data, error } = await supabase
        .from('test_suites')
        .select('*')
        .eq('id', suiteId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') { // Not found
          return null
        }
        throw error
      }

      return data
    } catch (error) {
      console.error('Error getting test suite:', error)
      throw error
    }
  }

  // Get test cases for a suite
  static async getTestCases(suiteId: string, filters?: TestCaseFilters): Promise<TestCase[]> {
    try {
      let query = supabase
        .from('test_cases')
        .select('*')
        .eq('suite_id', suiteId)
        .order('title')

      if (filters?.complexity) {
        query = query.eq('complexity', filters.complexity)
      }

      if (filters?.threegppRef) {
        query = query.eq('threegpp_ref', filters.threegppRef)
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      const { data, error } = await query

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting test cases:', error)
      throw error
    }
  }

  // Get test case by ID
  static async getTestCase(testCaseId: string): Promise<TestCase | null> {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .select(`
          *,
          test_suites (
            name,
            suite_type,
            description
          )
        `)
        .eq('id', testCaseId)
        .single()

      if (error) {
        if (error.code === 'PGRST116') { // Not found
          return null
        }
        throw error
      }

      return data
    } catch (error) {
      console.error('Error getting test case:', error)
      throw error
    }
  }

  // Get test case steps
  static async getTestCaseSteps(testCaseId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('test_case_steps')
        .select('*')
        .eq('case_id', testCaseId)
        .order('step_order')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting test case steps:', error)
      throw error
    }
  }

  // Search test cases across all suites
  static async searchTestCases(query: string, filters?: TestCaseFilters): Promise<TestCase[]> {
    try {
      let dbQuery = supabase
        .from('test_cases')
        .select(`
          *,
          test_suites (
            name,
            suite_type
          )
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%,threegpp_ref.ilike.%${query}%`)
        .order('title')

      if (filters?.complexity) {
        dbQuery = dbQuery.eq('complexity', filters.complexity)
      }

      if (filters?.threegppRef) {
        dbQuery = dbQuery.eq('threegpp_ref', filters.threegppRef)
      }

      const { data, error } = await dbQuery

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error searching test cases:', error)
      throw error
    }
  }

  // Get test suite statistics
  static async getTestSuiteStats(): Promise<any> {
    try {
      const { data: suites, error: suitesError } = await supabase
        .from('test_suites')
        .select('suite_type')

      if (suitesError) throw suitesError

      const { data: cases, error: casesError } = await supabase
        .from('test_cases')
        .select('complexity')

      if (casesError) throw casesError

      // Count by suite type
      const suiteTypeCounts = suites?.reduce((acc: any, suite: any) => {
        acc[suite.suite_type] = (acc[suite.suite_type] || 0) + 1
        return acc
      }, {}) || {}

      // Count by complexity
      const complexityCounts = cases?.reduce((acc: any, testCase: any) => {
        acc[testCase.complexity] = (acc[testCase.complexity] || 0) + 1
        return acc
      }, {}) || {}

      return {
        totalSuites: suites?.length || 0,
        totalTestCases: cases?.length || 0,
        suiteTypeCounts,
        complexityCounts
      }
    } catch (error) {
      console.error('Error getting test suite stats:', error)
      throw error
    }
  }

  // Get popular test cases
  static async getPopularTestCases(limit: number = 10): Promise<TestCase[]> {
    try {
      // This would typically be based on execution count, but for now we'll get recent test cases
      const { data, error } = await supabase
        .from('test_cases')
        .select(`
          *,
          test_suites (
            name,
            suite_type
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting popular test cases:', error)
      throw error
    }
  }

  // Get test cases by complexity
  static async getTestCasesByComplexity(complexity: 'basic' | 'intermediate' | 'advanced'): Promise<TestCase[]> {
    try {
      const { data, error } = await supabase
        .from('test_cases')
        .select(`
          *,
          test_suites (
            name,
            suite_type
          )
        `)
        .eq('complexity', complexity)
        .order('title')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting test cases by complexity:', error)
      throw error
    }
  }
}

export default TestSuitesAPI