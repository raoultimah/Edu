const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createSQLFunctions() {
  console.log('Creating SQL functions for EDU-WISE BASIC...');

  try {
    // 1. Create a function to enable extensions
    const { error: enableExtensionsError } = await supabase.rpc('create_sql_function', {
      function_name: 'enable_extensions',
      function_definition: `
        CREATE OR REPLACE FUNCTION enable_extensions(extensions text[])
        RETURNS void AS $$
        DECLARE
          ext text;
        BEGIN
          FOREACH ext IN ARRAY extensions
          LOOP
            EXECUTE format('CREATE EXTENSION IF NOT EXISTS %I;', ext);
          END LOOP;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });

    if (enableExtensionsError) {
      console.error('Error creating enable_extensions function:', enableExtensionsError);
    } else {
      console.log('✅ enable_extensions function created');
    }

    // 2. Create a function to execute SQL
    const { error: executeSqlError } = await supabase.rpc('create_sql_function', {
      function_name: 'execute_sql',
      function_definition: `
        CREATE OR REPLACE FUNCTION execute_sql(sql text)
        RETURNS void AS $$
        BEGIN
          EXECUTE sql;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });

    if (executeSqlError) {
      console.error('Error creating execute_sql function:', executeSqlError);
    } else {
      console.log('✅ execute_sql function created');
    }

    // 3. Create a function to create SQL functions
    const { error: createSqlFunctionError } = await supabase.rpc('create_sql_function', {
      function_name: 'create_sql_function',
      function_definition: `
        CREATE OR REPLACE FUNCTION create_sql_function(function_name text, function_definition text)
        RETURNS void AS $$
        BEGIN
          EXECUTE function_definition;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });

    if (createSqlFunctionError) {
      console.error('Error creating create_sql_function function:', createSqlFunctionError);
    } else {
      console.log('✅ create_sql_function function created');
    }

    // 4. Create a function to create stored procedures
    const { error: createStoredProcedureError } = await supabase.rpc('create_sql_function', {
      function_name: 'create_stored_procedure',
      function_definition: `
        CREATE OR REPLACE FUNCTION create_stored_procedure(procedure_name text, procedure_definition text)
        RETURNS void AS $$
        BEGIN
          EXECUTE procedure_definition;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `
    });

    if (createStoredProcedureError) {
      console.error('Error creating create_stored_procedure function:', createStoredProcedureError);
    } else {
      console.log('✅ create_stored_procedure function created');
    }

    console.log('✅ SQL functions created successfully!');
  } catch (error) {
    console.error('Error creating SQL functions:', error);
  }
}

createSQLFunctions();

