# EDU-WISE BASIC - School Management System

EDU-WISE BASIC is a comprehensive school management system designed for basic education institutions. It provides a complete solution for managing students, academics, examinations, timetables, and finances.

## Features

- **Student Management**: Comprehensive student profiles, attendance tracking, and performance monitoring.
- **Academic Management**: Curriculum planning, class scheduling, and subject management.
- **Timetable Management**: Create and manage class schedules, teacher assignments, and room allocations.
- **Examination System**: Exam creation, grading, result analysis, and report card generation.
- **Finance Management**: Fee collection, expense tracking, and financial reporting.
- **Communication**: Announcements, notifications, and parent-teacher communication.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
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

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase URL and anon key

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The application uses the following main tables:

- `users`: User accounts and authentication
- `students`: Student information and profiles
- `guardians`: Parent/guardian information
- `classes`: Class levels and sections
- `subjects`: Subject information
- `teachers`: Teacher profiles and assignments
- `timetables`: Class schedules
- `exams`: Examination details
- `exam_results`: Student examination results
- `fees`: Fee structure and categories
- `payments`: Payment records and receipts

## Deployment

The application can be easily deployed to Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Set the environment variables
4. Deploy

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

