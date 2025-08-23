const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createSchema() {
  console.log('Creating database schema for EDU-WISE BASIC...');

  try {
    // 1. Create students table
    const { error: studentsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'students',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        first_name text not null,
        last_name text not null,
        email text unique,
        phone text,
        address text,
        date_of_birth date,
        gender text,
        admission_number text unique,
        class_id uuid,
        parent_name text,
        parent_phone text,
        parent_email text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (studentsError) throw studentsError;
    console.log('✅ Students table created');

    // 2. Create classes table
    const { error: classesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'classes',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        grade text not null,
        section text,
        teacher_id uuid,
        academic_year text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (classesError) throw classesError;
    console.log('✅ Classes table created');

    // 3. Create teachers table
    const { error: teachersError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'teachers',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        first_name text not null,
        last_name text not null,
        email text unique,
        phone text,
        address text,
        subject_id uuid,
        qualification text,
        joining_date date,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (teachersError) throw teachersError;
    console.log('✅ Teachers table created');

    // 4. Create subjects table
    const { error: subjectsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'subjects',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        code text unique,
        description text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (subjectsError) throw subjectsError;
    console.log('✅ Subjects table created');

    // 5. Create exams table
    const { error: examsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'exams',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        name text not null,
        start_date date,
        end_date date,
        academic_year text,
        description text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (examsError) throw examsError;
    console.log('✅ Exams table created');

    // 6. Create exam_results table
    const { error: examResultsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'exam_results',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        student_id uuid references students(id),
        exam_id uuid references exams(id),
        subject_id uuid references subjects(id),
        marks numeric,
        grade text,
        remarks text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (examResultsError) throw examResultsError;
    console.log('✅ Exam Results table created');

    // 7. Create attendance table
    const { error: attendanceError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'attendance',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        student_id uuid references students(id),
        class_id uuid references classes(id),
        date date not null,
        status text not null,
        remarks text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (attendanceError) throw attendanceError;
    console.log('✅ Attendance table created');

    // 8. Create timetable table
    const { error: timetableError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'timetable',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        class_id uuid references classes(id),
        subject_id uuid references subjects(id),
        teacher_id uuid references teachers(id),
        day_of_week text not null,
        start_time time not null,
        end_time time not null,
        room text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (timetableError) throw timetableError;
    console.log('✅ Timetable table created');

    // 9. Create fees table
    const { error: feesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'fees',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        student_id uuid references students(id),
        fee_type text not null,
        amount numeric not null,
        due_date date,
        payment_date date,
        payment_status text,
        payment_method text,
        receipt_number text,
        academic_year text,
        term text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (feesError) throw feesError;
    console.log('✅ Fees table created');

    // 10. Create expenses table
    const { error: expensesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'expenses',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        category text not null,
        amount numeric not null,
        date date not null,
        description text,
        payment_method text,
        reference_number text,
        approved_by text,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (expensesError) throw expensesError;
    console.log('✅ Expenses table created');

    // 11. Create announcements table
    const { error: announcementsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'announcements',
      columns: `
        id uuid primary key default uuid_generate_v4(),
        title text not null,
        content text not null,
        published_date date not null,
        expiry_date date,
        target_audience text,
        created_by uuid,
        created_at timestamp with time zone default now(),
        updated_at timestamp with time zone default now()
      `
    });

    if (announcementsError) throw announcementsError;
    console.log('✅ Announcements table created');

    console.log('✅ All tables created successfully!');
  } catch (error) {
    console.error('Error creating schema:', error);
  }
}

createSchema();

