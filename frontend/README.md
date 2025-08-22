# EDU-WISE BASIC Frontend

This directory contains the frontend components for the EDU-WISE BASIC school management system.

## Contents

- **src/**: Source code for the Next.js application
  - `app/`: Next.js app directory with pages and routes
  - `components/`: Reusable UI components
  - `context/`: React context providers
  - `lib/`: Utility functions and libraries
  - `middleware.ts`: Next.js middleware for authentication
  - `types/`: TypeScript type definitions

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Create a `.env.local` file based on the `.env.example` file.

3. **Start the development server**

```bash
npm run dev
```

4. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues

## Features

The frontend includes:

- **Dashboard**: Overview of key metrics and statistics
- **Student Management**: Manage student information and performance
- **Teacher Management**: Manage teacher profiles and assignments
- **Class Management**: Organize classes and subjects
- **Exam Management**: Create and manage exams and results
- **Finance Management**: Track fees and expenses
- **Communication**: Enable communication between users
- **User Authentication**: Secure login and role-based access control

## Technologies Used

- Next.js
- React
- Tailwind CSS
- TypeScript
- Supabase Client SDK

