# EDU-WISE BASIC School Management System

EDU-WISE BASIC is a comprehensive school management system built with Next.js for the frontend and NestJS for the backend, using Supabase for authentication and database operations.

## Features

- **User Management**: Create and manage user accounts with different roles (admin, teacher, student, parent)
- **Student Management**: Comprehensive student information management
- **Authentication**: Secure authentication using Supabase
- **Responsive UI**: Modern UI built with Next.js and Tailwind CSS
- **API Documentation**: Swagger documentation for the backend API

## Tech Stack

### Frontend
- Next.js 14
- React 18
- Tailwind CSS
- Supabase Client
- React Query
- React Hook Form
- Zod for validation
- Recharts for data visualization

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Supabase
- JWT Authentication
- Swagger for API documentation

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm (v8 or later)
- PostgreSQL (v14 or later)
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/raoultimah/Edu.git
cd Edu
git checkout complete
```

### 2. Environment Configuration

Create environment files for both frontend and backend:

```bash
# Copy the example environment file
cp eduwis-basic/.env.example eduwis-basic/.env
```

Edit the `.env` file and fill in your Supabase credentials and other configuration values:

```
# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=eduwis_basic

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=3600

# Application
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_JWT_SECRET=your_supabase_jwt_secret

# For frontend
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

Install all dependencies for the project:

```bash
cd eduwis-basic
npm run install:all
```

This will install dependencies for the root project, frontend, and backend.

### 4. Database Setup

Ensure your PostgreSQL server is running and create a database:

```bash
createdb eduwis_basic
```

The application will automatically create the necessary tables when it first runs.

### 5. Start the Development Servers

Start both frontend and backend development servers:

```bash
npm run dev
```

This will start:
- Frontend server at http://localhost:3001
- Backend server at http://localhost:3000
- API documentation at http://localhost:3000/api/docs

### 6. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3001
- API Documentation: http://localhost:3000/api/docs

## Project Structure

```
eduwis-basic/
├── backend/                # NestJS backend application
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── students/       # Students module
│   │   ├── users/          # Users module
│   │   ├── utils/          # Utility functions and services
│   │   ├── app.module.ts   # Main application module
│   │   └── main.ts         # Application entry point
│   └── package.json        # Backend dependencies
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # Next.js app directory
│   │   ├── components/     # React components
│   │   ├── lib/            # Utility functions and hooks
│   │   │   ├── hooks/      # Custom React hooks
│   │   │   └── supabase/   # Supabase client configuration
│   │   └── middleware.ts   # Next.js middleware for auth
│   └── package.json        # Frontend dependencies
└── package.json            # Root package.json with scripts
```

## Development Workflow

- **Frontend Development**: Make changes in the `frontend/src` directory
- **Backend Development**: Make changes in the `backend/src` directory
- **API Testing**: Use Swagger UI at http://localhost:3000/api/docs

## Deployment

### Backend Deployment

1. Build the backend:
```bash
cd eduwis-basic
npm run build:backend
```

2. Start the production server:
```bash
npm run start:backend
```

### Frontend Deployment

1. Build the frontend:
```bash
cd eduwis-basic
npm run build:frontend
```

2. Start the production server:
```bash
npm run start:frontend
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

