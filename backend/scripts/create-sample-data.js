const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function createSampleData() {
  console.log('Creating sample data for EDU-WISE BASIC...');

  try {
    // 1. Insert sample subjects
    const subjects = [
      { name: 'Mathematics', code: 'MATH101', description: 'Basic mathematics including algebra and geometry' },
      { name: 'English', code: 'ENG101', description: 'English language and literature' },
      { name: 'Science', code: 'SCI101', description: 'General science including physics, chemistry and biology' },
      { name: 'Social Studies', code: 'SOC101', description: 'History, geography and civics' },
      { name: 'Computer Science', code: 'CS101', description: 'Introduction to computer science and programming' }
    ];

    const { error: subjectsError, data: subjectsData } = await supabase
      .from('subjects')
      .upsert(subjects, { onConflict: 'code' })
      .select();

    if (subjectsError) throw subjectsError;
    console.log('✅ Sample subjects created:', subjectsData.length);

    // 2. Insert sample teachers
    const teachers = [
      { first_name: 'John', last_name: 'Smith', email: 'john.smith@edu-wise.com', phone: '1234567890', subject_id: subjectsData[0].id, qualification: 'M.Sc. Mathematics', joining_date: '2023-01-15' },
      { first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.johnson@edu-wise.com', phone: '2345678901', subject_id: subjectsData[1].id, qualification: 'M.A. English Literature', joining_date: '2023-02-10' },
      { first_name: 'Michael', last_name: 'Brown', email: 'michael.brown@edu-wise.com', phone: '3456789012', subject_id: subjectsData[2].id, qualification: 'Ph.D. Physics', joining_date: '2023-01-05' },
      { first_name: 'Emily', last_name: 'Davis', email: 'emily.davis@edu-wise.com', phone: '4567890123', subject_id: subjectsData[3].id, qualification: 'M.A. History', joining_date: '2023-03-20' },
      { first_name: 'David', last_name: 'Wilson', email: 'david.wilson@edu-wise.com', phone: '5678901234', subject_id: subjectsData[4].id, qualification: 'M.Sc. Computer Science', joining_date: '2023-02-25' }
    ];

    const { error: teachersError, data: teachersData } = await supabase
      .from('teachers')
      .upsert(teachers, { onConflict: 'email' })
      .select();

    if (teachersError) throw teachersError;
    console.log('✅ Sample teachers created:', teachersData.length);

    // 3. Insert sample classes
    const classes = [
      { name: 'Class 1A', grade: '1', section: 'A', teacher_id: teachersData[0].id, academic_year: '2023-2024' },
      { name: 'Class 2B', grade: '2', section: 'B', teacher_id: teachersData[1].id, academic_year: '2023-2024' },
      { name: 'Class 3C', grade: '3', section: 'C', teacher_id: teachersData[2].id, academic_year: '2023-2024' },
      { name: 'Class 4A', grade: '4', section: 'A', teacher_id: teachersData[3].id, academic_year: '2023-2024' },
      { name: 'Class 5B', grade: '5', section: 'B', teacher_id: teachersData[4].id, academic_year: '2023-2024' }
    ];

    const { error: classesError, data: classesData } = await supabase
      .from('classes')
      .upsert(classes)
      .select();

    if (classesError) throw classesError;
    console.log('✅ Sample classes created:', classesData.length);

    // 4. Insert sample students
    const students = [
      { first_name: 'Alice', last_name: 'Johnson', email: 'alice.j@example.com', admission_number: 'ST001', class_id: classesData[0].id, gender: 'Female', date_of_birth: '2017-05-12', parent_name: 'Robert Johnson', parent_phone: '1122334455', parent_email: 'robert.j@example.com' },
      { first_name: 'Bob', last_name: 'Smith', email: 'bob.s@example.com', admission_number: 'ST002', class_id: classesData[0].id, gender: 'Male', date_of_birth: '2017-08-23', parent_name: 'Mary Smith', parent_phone: '2233445566', parent_email: 'mary.s@example.com' },
      { first_name: 'Charlie', last_name: 'Brown', email: 'charlie.b@example.com', admission_number: 'ST003', class_id: classesData[1].id, gender: 'Male', date_of_birth: '2016-03-15', parent_name: 'James Brown', parent_phone: '3344556677', parent_email: 'james.b@example.com' },
      { first_name: 'Diana', last_name: 'Miller', email: 'diana.m@example.com', admission_number: 'ST004', class_id: classesData[1].id, gender: 'Female', date_of_birth: '2016-11-30', parent_name: 'Patricia Miller', parent_phone: '4455667788', parent_email: 'patricia.m@example.com' },
      { first_name: 'Edward', last_name: 'Davis', email: 'edward.d@example.com', admission_number: 'ST005', class_id: classesData[2].id, gender: 'Male', date_of_birth: '2015-07-08', parent_name: 'Jennifer Davis', parent_phone: '5566778899', parent_email: 'jennifer.d@example.com' },
      { first_name: 'Fiona', last_name: 'Wilson', email: 'fiona.w@example.com', admission_number: 'ST006', class_id: classesData[2].id, gender: 'Female', date_of_birth: '2015-09-17', parent_name: 'Michael Wilson', parent_phone: '6677889900', parent_email: 'michael.w@example.com' },
      { first_name: 'George', last_name: 'Taylor', email: 'george.t@example.com', admission_number: 'ST007', class_id: classesData[3].id, gender: 'Male', date_of_birth: '2014-04-22', parent_name: 'Elizabeth Taylor', parent_phone: '7788990011', parent_email: 'elizabeth.t@example.com' },
      { first_name: 'Hannah', last_name: 'Anderson', email: 'hannah.a@example.com', admission_number: 'ST008', class_id: classesData[3].id, gender: 'Female', date_of_birth: '2014-12-05', parent_name: 'William Anderson', parent_phone: '8899001122', parent_email: 'william.a@example.com' },
      { first_name: 'Ian', last_name: 'Thomas', email: 'ian.t@example.com', admission_number: 'ST009', class_id: classesData[4].id, gender: 'Male', date_of_birth: '2013-02-19', parent_name: 'Sarah Thomas', parent_phone: '9900112233', parent_email: 'sarah.t@example.com' },
      { first_name: 'Julia', last_name: 'Jackson', email: 'julia.j@example.com', admission_number: 'ST010', class_id: classesData[4].id, gender: 'Female', date_of_birth: '2013-06-27', parent_name: 'David Jackson', parent_phone: '0011223344', parent_email: 'david.j@example.com' }
    ];

    const { error: studentsError, data: studentsData } = await supabase
      .from('students')
      .upsert(students, { onConflict: 'admission_number' })
      .select();

    if (studentsError) throw studentsError;
    console.log('✅ Sample students created:', studentsData.length);

    // 5. Insert sample exams
    const exams = [
      { name: 'First Term Examination', start_date: '2023-09-15', end_date: '2023-09-25', academic_year: '2023-2024', description: 'First term examination for all classes' },
      { name: 'Mid-Term Assessment', start_date: '2023-11-10', end_date: '2023-11-15', academic_year: '2023-2024', description: 'Mid-term assessment for all classes' },
      { name: 'Second Term Examination', start_date: '2024-01-20', end_date: '2024-01-30', academic_year: '2023-2024', description: 'Second term examination for all classes' },
      { name: 'Final Examination', start_date: '2024-05-10', end_date: '2024-05-20', academic_year: '2023-2024', description: 'Final examination for all classes' }
    ];

    const { error: examsError, data: examsData } = await supabase
      .from('exams')
      .upsert(exams)
      .select();

    if (examsError) throw examsError;
    console.log('✅ Sample exams created:', examsData.length);

    // 6. Insert sample timetable entries
    const timetableEntries = [
      { class_id: classesData[0].id, subject_id: subjectsData[0].id, teacher_id: teachersData[0].id, day_of_week: 'Monday', start_time: '08:00:00', end_time: '09:00:00', room: 'Room 101' },
      { class_id: classesData[0].id, subject_id: subjectsData[1].id, teacher_id: teachersData[1].id, day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:00:00', room: 'Room 101' },
      { class_id: classesData[0].id, subject_id: subjectsData[2].id, teacher_id: teachersData[2].id, day_of_week: 'Monday', start_time: '10:30:00', end_time: '11:30:00', room: 'Room 101' },
      { class_id: classesData[1].id, subject_id: subjectsData[0].id, teacher_id: teachersData[0].id, day_of_week: 'Monday', start_time: '08:00:00', end_time: '09:00:00', room: 'Room 102' },
      { class_id: classesData[1].id, subject_id: subjectsData[1].id, teacher_id: teachersData[1].id, day_of_week: 'Monday', start_time: '09:00:00', end_time: '10:00:00', room: 'Room 102' },
      { class_id: classesData[1].id, subject_id: subjectsData[3].id, teacher_id: teachersData[3].id, day_of_week: 'Monday', start_time: '10:30:00', end_time: '11:30:00', room: 'Room 102' }
    ];

    const { error: timetableError, data: timetableData } = await supabase
      .from('timetable')
      .upsert(timetableEntries)
      .select();

    if (timetableError) throw timetableError;
    console.log('✅ Sample timetable entries created:', timetableData.length);

    // 7. Insert sample fees
    const fees = [
      { student_id: studentsData[0].id, fee_type: 'Tuition Fee', amount: 5000, due_date: '2023-09-05', payment_status: 'Paid', payment_date: '2023-09-03', payment_method: 'Bank Transfer', receipt_number: 'REC001', academic_year: '2023-2024', term: 'First Term' },
      { student_id: studentsData[1].id, fee_type: 'Tuition Fee', amount: 5000, due_date: '2023-09-05', payment_status: 'Paid', payment_date: '2023-09-04', payment_method: 'Cash', receipt_number: 'REC002', academic_year: '2023-2024', term: 'First Term' },
      { student_id: studentsData[2].id, fee_type: 'Tuition Fee', amount: 5500, due_date: '2023-09-05', payment_status: 'Paid', payment_date: '2023-09-02', payment_method: 'Bank Transfer', receipt_number: 'REC003', academic_year: '2023-2024', term: 'First Term' },
      { student_id: studentsData[3].id, fee_type: 'Tuition Fee', amount: 5500, due_date: '2023-09-05', payment_status: 'Unpaid', payment_date: null, payment_method: null, receipt_number: null, academic_year: '2023-2024', term: 'First Term' },
      { student_id: studentsData[4].id, fee_type: 'Tuition Fee', amount: 6000, due_date: '2023-09-05', payment_status: 'Paid', payment_date: '2023-09-01', payment_method: 'Credit Card', receipt_number: 'REC004', academic_year: '2023-2024', term: 'First Term' }
    ];

    const { error: feesError, data: feesData } = await supabase
      .from('fees')
      .upsert(fees)
      .select();

    if (feesError) throw feesError;
    console.log('✅ Sample fees created:', feesData.length);

    // 8. Insert sample expenses
    const expenses = [
      { category: 'Utilities', amount: 2500, date: '2023-08-05', description: 'Electricity bill for August', payment_method: 'Bank Transfer', reference_number: 'UTL001', approved_by: 'Principal' },
      { category: 'Supplies', amount: 1800, date: '2023-08-10', description: 'Stationery supplies', payment_method: 'Cash', reference_number: 'SUP001', approved_by: 'Principal' },
      { category: 'Maintenance', amount: 3500, date: '2023-08-15', description: 'Plumbing repairs', payment_method: 'Bank Transfer', reference_number: 'MNT001', approved_by: 'Principal' },
      { category: 'Salaries', amount: 25000, date: '2023-08-30', description: 'Staff salaries for August', payment_method: 'Bank Transfer', reference_number: 'SAL001', approved_by: 'Principal' }
    ];

    const { error: expensesError, data: expensesData } = await supabase
      .from('expenses')
      .upsert(expenses)
      .select();

    if (expensesError) throw expensesError;
    console.log('✅ Sample expenses created:', expensesData.length);

    // 9. Insert sample announcements
    const announcements = [
      { title: 'School Reopening', content: 'School will reopen on September 5th, 2023 for the new academic year.', published_date: '2023-08-20', expiry_date: '2023-09-10', target_audience: 'All' },
      { title: 'Parent-Teacher Meeting', content: 'Parent-Teacher meeting will be held on September 15th, 2023 from 10:00 AM to 2:00 PM.', published_date: '2023-09-01', expiry_date: '2023-09-16', target_audience: 'Parents' },
      { title: 'Sports Day', content: 'Annual Sports Day will be held on October 10th, 2023. All students are required to participate.', published_date: '2023-09-15', expiry_date: '2023-10-11', target_audience: 'Students' }
    ];

    const { error: announcementsError, data: announcementsData } = await supabase
      .from('announcements')
      .upsert(announcements)
      .select();

    if (announcementsError) throw announcementsError;
    console.log('✅ Sample announcements created:', announcementsData.length);

    console.log('✅ All sample data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
}

createSampleData();

