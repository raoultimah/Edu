# EDU-WISE BASIC

A comprehensive school management system for educational institutions.

## Project Overview

EDU-WISE BASIC is a modern school management system designed to streamline administrative tasks, enhance communication between teachers, students, and parents, and provide comprehensive tools for educational institutions.

## Features

- User management with role-based access control
- Student information management
- Teacher and staff management
- Course and curriculum management
- Attendance tracking
- Grade and assessment management
- Parent portal
- Administrative dashboard
- Reporting and analytics

## Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Zustand for state management
- React Query for data fetching
- Supabase for authentication

### Backend
- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- JWT authentication
- Swagger for API documentation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if running locally)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/eduwis-basic.git
cd eduwis-basic
```

2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Using Docker (recommended)
```bash
docker-compose up -d
```

4. Without Docker (local development)

Frontend:
```bash
cd frontend
npm install
npm run dev
```

Backend:
```bash
cd backend
npm install
npm run start:dev
```

## Development

### Project Structure

```
eduwis-basic/
├── frontend/                          # React/Next.js Frontend
│   ├── public/                        # Static assets
│   └── src/                           # Source code
│       ├── app/                       # Next.js 13+ App Router
│       ├── components/                # Reusable components
│       ├── hooks/                     # Custom React hooks
│       ├── lib/                       # Utility functions
│       ├── types/                     # TypeScript types
│       └── store/                     # State management
├── backend/                           # NestJS Backend
│   ├── src/                           # Source code
│   │   ├── auth/                      # Authentication module
│   │   ├── users/                     # Users module
│   │   └── [other modules]            # Feature modules
│   ├── database/                      # Database migrations
│   ├── config/                        # Configuration
│   └── tests/                         # Tests
└── [other directories]
```

## API Documentation

API documentation is available at `http://localhost:3000/api/docs` when the backend is running.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

