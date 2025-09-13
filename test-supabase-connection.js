// Test Supabase Connection
// Run this with: node test-supabase-connection.js

const { createClient } = require('@supabase/supabase-js');

// Test with local Supabase
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

async function testConnection() {
  console.log('🔍 Testing Supabase connection...');
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test 1: Check if we can connect
    console.log('📡 Testing basic connection...');
    const { data, error } = await supabase.from('test_case_templates').select('count').limit(1);
    
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Basic connection successful!');
    
    // Test 2: Check table counts
    console.log('📊 Checking database tables...');
    
    const tables = [
      'test_case_templates',
      'protocol_specifications', 
      'message_definitions',
      'ie_definitions'
    ];
    
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ ${table}: ${error.message}`);
        } else {
          console.log(`✅ ${table}: ${count} records`);
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`);
      }
    }
    
    // Test 3: Test authentication functions
    console.log('🔐 Testing authentication functions...');
    
    try {
      const { data, error } = await supabase.rpc('verify_admin_credentials', {
        username: 'admin',
        password: 'admin123'
      });
      
      if (error) {
        console.log('❌ Admin auth test failed:', error.message);
      } else {
        console.log('✅ Admin authentication function working');
      }
    } catch (err) {
      console.log('❌ Admin auth test error:', err.message);
    }
    
    return true;
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message);
    return false;
  }
}

// Run the test
testConnection().then(success => {
  if (success) {
    console.log('\n🎉 Supabase connection test completed successfully!');
    console.log('Your application should now work without the ERR_NAME_NOT_RESOLVED error.');
  } else {
    console.log('\n❌ Supabase connection test failed.');
    console.log('Please check:');
    console.log('1. Is Supabase running? (run: ./start-supabase.sh)');
    console.log('2. Are the migrations applied? (run: supabase db push)');
    console.log('3. Is the environment file correct? (check web/.env.local)');
  }
});