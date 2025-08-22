# EDU-WISE BASIC School Management System

EDU-WISE BASIC is a comprehensive school management system designed to streamline administrative tasks, enhance communication, and improve the overall educational experience for schools.

## Project Structure

The project is organized into two main directories:

- **frontend/**: Contains the Next.js web application
- **backend/**: Contains database setup scripts and server-side logic

## Features

- **Student Management**: Track student information, attendance, and performance
- **Teacher Management**: Manage teacher profiles, assignments, and schedules
- **Class Management**: Organize classes, subjects, and timetables
- **Exam Management**: Create and manage exams, record results, and generate reports
- **Finance Management**: Track fees, expenses, and generate financial reports
- **Communication**: Enable communication between teachers, students, and parents
- **Dashboard**: Visualize key metrics and statistics

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/raoultimah/Edu.git
cd Edu
```

2. **Set up environment variables**

Create `.env.local` files in both the frontend and backend directories based on the provided examples.

3. **Set up the database**

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Run the database setup script
npm run setup
```

4. **Start the frontend application**

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

5. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Users

The setup script creates the following test users:

- **Admin**: admin@edu-wise-basic.com / Admin@123
- **Teacher**: teacher@edu-wise-basic.com / Teacher@123
- **Parent**: parent@edu-wise-basic.com / Parent@123
- **Student**: student@edu-wise-basic.com / Student@123

## Technologies Used

- **Frontend**:
  - Next.js
  - React
  - Tailwind CSS
  - TypeScript

- **Backend**:
  - Supabase
  - PostgreSQL
  - Node.js

