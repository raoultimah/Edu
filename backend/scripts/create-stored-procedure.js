const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createStoredProcedure() {
  console.log('Creating stored procedure for table creation...');

  try {
    // Create a stored procedure that can create tables if they don't exist
    const { error } = await supabase.rpc('create_stored_procedure', {
      procedure_name: 'create_table_if_not_exists',
      procedure_definition: `
        CREATE OR REPLACE FUNCTION create_table_if_not_exists(
          table_name text,
          columns text
        ) RETURNS void AS $$
        BEGIN
          EXECUTE format('
            CREATE TABLE IF NOT EXISTS %I (
              %s
            );
          ', table_name, columns);
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });

    if (error) throw error;
    console.log('✅ Stored procedure created successfully!');
  } catch (error) {
    console.error('Error creating stored procedure:', error);
  }
}

createStoredProcedure();

