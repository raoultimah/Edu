/**
 * EDU-WISE BASIC Backend Entry Point
 * 
 * This file serves as the main entry point for the backend services.
 * It can be expanded to include API endpoints, middleware, and other server functionality.
 */

require('dotenv').config({ path: '.env.local' });
const { supabase } = require('./utils/supabase');
const databaseController = require('./controllers/database');

// Log startup information
console.log('Starting EDU-WISE BASIC Backend...');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);

/**
 * Initialize the backend
 */
async function initialize() {
  try {
    // Test database connection
    const connectionTest = await databaseController.testConnection();
    
    if (connectionTest.success) {
      console.log('✅ Database connection successful');
    } else {
      console.error('❌ Database connection failed:', connectionTest.error);
    }
    
    // Additional initialization steps can be added here
    
    console.log('✅ Backend initialization complete');
  } catch (error) {
    console.error('❌ Backend initialization failed:', error);
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initialize();
}

module.exports = {
  initialize,
  supabase,
  databaseController
};

