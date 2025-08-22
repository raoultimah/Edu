const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupAuth() {
  console.log('Setting up authentication for EDU-WISE BASIC...');

  try {
    // 1. Create admin user
    const { data: adminUser, error: adminError } = await supabase.auth.signUp({
      email: 'admin@edu-wise-basic.com',
      password: 'Admin@123',
      options: {
        data: {
          role: 'admin',
          first_name: 'System',
          last_name: 'Administrator'
        }
      }
    });

    if (adminError) {
      console.error('Error creating admin user:', adminError);
    } else {
      console.log('✅ Admin user created:', adminUser.user.email);
    }

    // 2. Create teacher user
    const { data: teacherUser, error: teacherError } = await supabase.auth.signUp({
      email: 'teacher@edu-wise-basic.com',
      password: 'Teacher@123',
      options: {
        data: {
          role: 'teacher',
          first_name: 'Demo',
          last_name: 'Teacher'
        }
      }
    });

    if (teacherError) {
      console.error('Error creating teacher user:', teacherError);
    } else {
      console.log('✅ Teacher user created:', teacherUser.user.email);
    }

    // 3. Create parent user
    const { data: parentUser, error: parentError } = await supabase.auth.signUp({
      email: 'parent@edu-wise-basic.com',
      password: 'Parent@123',
      options: {
        data: {
          role: 'parent',
          first_name: 'Demo',
          last_name: 'Parent'
        }
      }
    });

    if (parentError) {
      console.error('Error creating parent user:', parentError);
    } else {
      console.log('✅ Parent user created:', parentUser.user.email);
    }

    // 4. Create student user
    const { data: studentUser, error: studentError } = await supabase.auth.signUp({
      email: 'student@edu-wise-basic.com',
      password: 'Student@123',
      options: {
        data: {
          role: 'student',
          first_name: 'Demo',
          last_name: 'Student'
        }
      }
    });

    if (studentError) {
      console.error('Error creating student user:', studentError);
    } else {
      console.log('✅ Student user created:', studentUser.user.email);
    }

    console.log('✅ Authentication setup completed!');
    console.log('\nTest Users:');
    console.log('1. Admin: admin@edu-wise-basic.com / Admin@123');
    console.log('2. Teacher: teacher@edu-wise-basic.com / Teacher@123');
    console.log('3. Parent: parent@edu-wise-basic.com / Parent@123');
    console.log('4. Student: student@edu-wise-basic.com / Student@123');
    console.log('\nNote: You may need to confirm these users in your Supabase dashboard if email confirmation is enabled.');
  } catch (error) {
    console.error('Error setting up authentication:', error);
  }
}

setupAuth();

