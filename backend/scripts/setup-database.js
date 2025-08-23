const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Setting up database for EDU-WISE BASIC...');

  try {
    // 1. Enable the necessary extensions
    const { error: extensionsError } = await supabase.rpc('enable_extensions', {
      extensions: ['uuid-ossp', 'pg_stat_statements']
    });

    if (extensionsError) {
      console.error('Error enabling extensions:', extensionsError);
      console.log('Continuing with setup...');
    } else {
      console.log('✅ Extensions enabled');
    }

    // 2. Create tables directly using SQL
    // Students table
    const { error: studentsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS students (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT UNIQUE,
          phone TEXT,
          address TEXT,
          date_of_birth DATE,
          gender TEXT,
          admission_number TEXT UNIQUE,
          class_id UUID,
          parent_name TEXT,
          parent_phone TEXT,
          parent_email TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (studentsError) {
      console.error('Error creating students table:', studentsError);
    } else {
      console.log('✅ Students table created');
    }

    // Classes table
    const { error: classesError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS classes (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          grade TEXT NOT NULL,
          section TEXT,
          teacher_id UUID,
          academic_year TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (classesError) {
      console.error('Error creating classes table:', classesError);
    } else {
      console.log('✅ Classes table created');
    }

    // Teachers table
    const { error: teachersError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS teachers (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          email TEXT UNIQUE,
          phone TEXT,
          address TEXT,
          subject_id UUID,
          qualification TEXT,
          joining_date DATE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (teachersError) {
      console.error('Error creating teachers table:', teachersError);
    } else {
      console.log('✅ Teachers table created');
    }

    // Subjects table
    const { error: subjectsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS subjects (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          code TEXT UNIQUE,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (subjectsError) {
      console.error('Error creating subjects table:', subjectsError);
    } else {
      console.log('✅ Subjects table created');
    }

    // Exams table
    const { error: examsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS exams (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          start_date DATE,
          end_date DATE,
          academic_year TEXT,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (examsError) {
      console.error('Error creating exams table:', examsError);
    } else {
      console.log('✅ Exams table created');
    }

    // Exam Results table
    const { error: examResultsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS exam_results (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          student_id UUID REFERENCES students(id),
          exam_id UUID REFERENCES exams(id),
          subject_id UUID REFERENCES subjects(id),
          marks NUMERIC,
          grade TEXT,
          remarks TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (examResultsError) {
      console.error('Error creating exam_results table:', examResultsError);
    } else {
      console.log('✅ Exam Results table created');
    }

    // Attendance table
    const { error: attendanceError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS attendance (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          student_id UUID REFERENCES students(id),
          class_id UUID REFERENCES classes(id),
          date DATE NOT NULL,
          status TEXT NOT NULL,
          remarks TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (attendanceError) {
      console.error('Error creating attendance table:', attendanceError);
    } else {
      console.log('✅ Attendance table created');
    }

    // Timetable table
    const { error: timetableError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS timetable (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          class_id UUID REFERENCES classes(id),
          subject_id UUID REFERENCES subjects(id),
          teacher_id UUID REFERENCES teachers(id),
          day_of_week TEXT NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          room TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (timetableError) {
      console.error('Error creating timetable table:', timetableError);
    } else {
      console.log('✅ Timetable table created');
    }

    // Fees table
    const { error: feesError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS fees (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          student_id UUID REFERENCES students(id),
          fee_type TEXT NOT NULL,
          amount NUMERIC NOT NULL,
          due_date DATE,
          payment_date DATE,
          payment_status TEXT,
          payment_method TEXT,
          receipt_number TEXT,
          academic_year TEXT,
          term TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (feesError) {
      console.error('Error creating fees table:', feesError);
    } else {
      console.log('✅ Fees table created');
    }

    // Expenses table
    const { error: expensesError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS expenses (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          category TEXT NOT NULL,
          amount NUMERIC NOT NULL,
          date DATE NOT NULL,
          description TEXT,
          payment_method TEXT,
          reference_number TEXT,
          approved_by TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (expensesError) {
      console.error('Error creating expenses table:', expensesError);
    } else {
      console.log('✅ Expenses table created');
    }

    // Announcements table
    const { error: announcementsError } = await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS announcements (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          published_date DATE NOT NULL,
          expiry_date DATE,
          target_audience TEXT,
          created_by UUID,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (announcementsError) {
      console.error('Error creating announcements table:', announcementsError);
    } else {
      console.log('✅ Announcements table created');
    }

    console.log('✅ Database setup completed!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();

