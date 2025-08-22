# EDU-WISE BASIC

A modern, full-stack school information system built with Next.js 14 and Supabase.

## Features

- **Authentication System**: JWT-based authentication with role-based access control
- **Academic Structure Management**: Manage academic years, terms, classes, and sections
- **Student Management**: Comprehensive student information management
- **Teacher Management**: Teacher profiles and subject assignments
- **Attendance System**: Track student and teacher attendance
- **Examination System**: Create and manage exams, record marks, and generate report cards
- **Finance Module**: Fee management, payments, and financial reporting
- **Real-time Updates**: Live data updates using Supabase's real-time capabilities
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Functions)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: Supabase Auth with JWT
- **Deployment**: Vercel (Frontend), Supabase (Backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
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
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── (dashboard)/      # Dashboard and protected routes
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
│   ├── ui/               # UI components (buttons, inputs, etc.)
│   └── layouts/          # Layout components
├── lib/                  # Utility functions and hooks
│   ├── supabase/         # Supabase client configuration
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── context/              # React context providers
└── types/                # TypeScript type definitions
```

## Database Schema

The application uses a PostgreSQL database with the following main tables:

- `academic_years`: Academic year records
- `terms`: Term/semester records
- `classes`: Class/grade records
- `sections`: Section records for each class
- `subjects`: Subject records
- `subject_assignments`: Teacher-subject-class assignments
- `students`: Student records
- `guardians`: Parent/guardian relationships
- `employees`: Staff and teacher records
- `attendance`: Attendance records
- `exams`: Examination records
- `marks`: Student marks/grades
- `fees`: Fee structure records
- `payments`: Payment records

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

