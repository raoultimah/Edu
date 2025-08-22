const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function runAllSetup() {
  console.log('🚀 Starting EDU-WISE BASIC database setup...');
  
  try {
    // 1. Create SQL functions
    console.log('\n📦 Creating SQL functions...');
    await execPromise('node scripts/create-sql-functions.js');
    
    // 2. Setup database schema
    console.log('\n📦 Setting up database schema...');
    await execPromise('node scripts/setup-database.js');
    
    // 3. Create sample data
    console.log('\n📦 Creating sample data...');
    await execPromise('node scripts/create-sample-data.js');
    
    // 4. Setup authentication
    console.log('\n📦 Setting up authentication...');
    await execPromise('node scripts/setup-auth.js');
    
    console.log('\n✅ All setup scripts completed successfully!');
    console.log('\n🎉 EDU-WISE BASIC is now ready for testing!');
    console.log('\nYou can now run the application with:');
    console.log('npm run dev');
    console.log('\nAccess the application at: http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error running setup scripts:', error);
  }
}

runAllSetup();

