// Netlify Edge Function for Authentication
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
    const route = path.replace('/.netlify/functions/auth', '')

    switch (httpMethod) {
      case 'POST':
        if (route === '/admin-login') {
          return await handleAdminLogin(JSON.parse(body))
        } else if (route === '/user-login') {
          return await handleUserLogin(JSON.parse(body))
        } else if (route === '/user-signup') {
          return await handleUserSignup(JSON.parse(body))
        }
        break

      case 'GET':
        if (route === '/verify-session') {
          return await handleVerifySession(event.headers.authorization)
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
    console.error('Auth function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

async function handleAdminLogin({ username, password }) {
  try {
    const { data, error } = await supabase.rpc('verify_admin_credentials', {
      username,
      password
    })

    if (error) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    if (data) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          success: true, 
          userType: 'admin',
          message: 'Admin login successful' 
        })
      }
    } else {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }
  } catch (error) {
    console.error('Admin login error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Login failed' })
    }
  }
}

async function handleUserLogin({ email, password }) {
  try {
    const { data, error } = await supabase.rpc('verify_user_credentials', {
      email,
      password
    })

    if (error || !data || data.length === 0) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid credentials' })
      }
    }

    const user = data[0]
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        user: {
          id: user.user_id,
          email: user.email,
          fullName: user.full_name,
          role: user.role,
          status: user.status
        },
        userType: 'user',
        message: 'User login successful' 
      })
    }
  } catch (error) {
    console.error('User login error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Login failed' })
    }
  }
}

async function handleUserSignup({ email, password, fullName }) {
  try {
    const { data, error } = await supabase.rpc('create_user', {
      user_email: email,
      user_password: password,
      user_full_name: fullName
    })

    if (error) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: error.message })
      }
    }

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        userId: data,
        message: 'User created successfully' 
      })
    }
  } catch (error) {
    console.error('User signup error:', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Signup failed' })
    }
  }
}

async function handleVerifySession(authorization) {
  try {
    if (!authorization) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'No authorization header' })
      }
    }

    // In a real implementation, you would verify the JWT token here
    // For now, we'll return a simple verification
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Session valid' 
      })
    }
  } catch (error) {
    console.error('Session verification error:', error)
    return {
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Invalid session' })
    }
  }
}