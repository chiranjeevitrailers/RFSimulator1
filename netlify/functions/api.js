// Netlify Edge Function for API endpoints
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

export const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    const { httpMethod, path, body } = event
    const route = path.replace('/.netlify/functions/api', '')

    switch (httpMethod) {
      case 'GET':
        if (route === '/test-suites') {
          return await getTestSuites()
        } else if (route === '/test-cases') {
          return await getTestCases(event.queryStringParameters)
        } else if (route === '/users') {
          return await getUsers()
        } else if (route.startsWith('/test-case/')) {
          const testCaseId = route.replace('/test-case/', '')
          return await getTestCase(testCaseId)
        }
        break

      case 'POST':
        if (route === '/execute-test') {
          return await executeTest(JSON.parse(body))
        } else if (route === '/update-user-status') {
          return await updateUserStatus(JSON.parse(body))
        } else if (route === '/delete-user') {
          return await deleteUser(JSON.parse(body))
        }
        break

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Route not found' })
    }
  } catch (error) {
    console.error('API function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

async function getTestSuites() {
  try {
    const { data, error } = await supabase
      .from('test_suites')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ testSuites: data })
    }
  } catch (error) {
    console.error('Get test suites error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch test suites' })
    }
  }
}

async function getTestCases(queryParams) {
  try {
    const { suite_id, limit = 50, offset = 0 } = queryParams || {}
    
    let query = supabase
      .from('test_case_instances')
      .select(`
        *,
        test_case_templates(*),
        test_suites(*)
      `)
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (suite_id) {
      query = query.eq('suite_id', suite_id)
    }

    const { data, error } = await supabase
      .from('test_case_instances')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false })

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ testCases: data })
    }
  } catch (error) {
    console.error('Get test cases error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch test cases' })
    }
  }
}

async function getTestCase(testCaseId) {
  try {
    const { data, error } = await supabase.rpc('get_test_case_with_details', {
      test_case_uuid: testCaseId
    })

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ testCase: data })
    }
  } catch (error) {
    console.error('Get test case error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch test case' })
    }
  }
}

async function getUsers() {
  try {
    const { data, error } = await supabase.rpc('get_all_users')

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ users: data })
    }
  } catch (error) {
    console.error('Get users error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to fetch users' })
    }
  }
}

async function executeTest({ testCaseId, userId, parameters }) {
  try {
    // Create execution record
    const { data: execution, error: executionError } = await supabase
      .from('executions')
      .insert({
        test_case_id: testCaseId,
        user_id: userId,
        status: 'running',
        parameters: parameters || {}
      })
      .select()
      .single()

    if (executionError) {
      throw executionError
    }

    // Simulate test execution (in real implementation, this would call the 5GLabX backend)
    const executionSteps = [
      {
        execution_id: execution.id,
        step_name: 'Initialize Test',
        status: 'completed',
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        result: { message: 'Test initialized successfully' }
      },
      {
        execution_id: execution.id,
        step_name: 'Execute Protocol Analysis',
        status: 'completed',
        start_time: new Date().toISOString(),
        end_time: new Date().toISOString(),
        result: { message: 'Protocol analysis completed', verdict: 'PASS' }
      }
    ]

    // Insert execution steps
    const { error: stepsError } = await supabase
      .from('execution_steps')
      .insert(executionSteps)

    if (stepsError) {
      throw stepsError
    }

    // Update execution status
    const { error: updateError } = await supabase
      .from('executions')
      .update({ 
        status: 'completed',
        end_time: new Date().toISOString()
      })
      .eq('id', execution.id)

    if (updateError) {
      throw updateError
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        execution,
        message: 'Test execution completed successfully' 
      })
    }
  } catch (error) {
    console.error('Execute test error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to execute test' })
    }
  }
}

async function updateUserStatus({ userId, status }) {
  try {
    const { data, error } = await supabase.rpc('update_user_status', {
      user_id: userId,
      new_status: status
    })

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: data,
        message: 'User status updated successfully' 
      })
    }
  } catch (error) {
    console.error('Update user status error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to update user status' })
    }
  }
}

async function deleteUser({ userId }) {
  try {
    const { data, error } = await supabase.rpc('delete_user', {
      user_id: userId
    })

    if (error) {
      throw error
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: data,
        message: 'User deleted successfully' 
      })
    }
  } catch (error) {
    console.error('Delete user error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to delete user' })
    }
  }
}