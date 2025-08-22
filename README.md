# EDU-WISE BASIC School Management System

EDU-WISE BASIC is a comprehensive school management system built with Next.js, Tailwind CSS, and Supabase. It provides a modern, responsive interface for managing all aspects of a school's operations.

## Features

- **Modern UI Design**: Clean, responsive interface built with Tailwind CSS
- **Authentication**: Secure login and registration with Supabase Auth
- **Dashboard**: Comprehensive overview of school metrics
- **Student Management**: Track student information, attendance, and performance
- **Academic Management**: Manage classes, subjects, and curriculum
- **Examination System**: Create exams, record results, and generate reports
- **Finance Management**: Track fees, payments, and expenses
- **Timetable Management**: Create and manage class schedules
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **UI Components**: Radix UI, Framer Motion
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Forms**: React Hook Form, Zod
- **Charts**: ApexCharts, Recharts

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edu-wise-basic.git
   cd edu-wise-basic
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up the database:
   ```bash
   node scripts/run-all-setup.js
   ```
   This will:
   - Create necessary SQL functions
   - Set up the database schema
   - Create sample data
   - Set up authentication with test users

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Users

After running the setup script, the following test users will be available:

1. **Admin**: admin@edu-wise-basic.com / Admin@123
2. **Teacher**: teacher@edu-wise-basic.com / Teacher@123
3. **Parent**: parent@edu-wise-basic.com / Parent@123
4. **Student**: student@edu-wise-basic.com / Student@123

Note: You may need to confirm these users in your Supabase dashboard if email confirmation is enabled.

## Database Schema

The system uses the following main tables:

- **students**: Student information
- **classes**: Class information
- **teachers**: Teacher information
- **subjects**: Subject information
- **exams**: Examination details
- **exam_results**: Student exam results
- **attendance**: Student attendance records
- **timetable**: Class schedules
- **fees**: Student fee records
- **expenses**: School expense records
- **announcements**: School announcements

## Testing Workflow

1. Start with the landing page at `/`
2. Test authentication by logging in with one of the test users
3. Explore the dashboard and each module:
   - Students management
   - Finance management
   - Academic planning
   - Examination management
   - Timetable management
4. Test data entry and retrieval in each module
5. Test responsive design on different device sizes

## Customization

- **Branding**: Update colors and logos in the Tailwind configuration
- **Content**: Modify text content in the page components
- **Features**: Add or remove features by modifying the relevant components

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [Radix UI](https://www.radix-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

