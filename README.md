# EDU-WISE BASIC

A comprehensive school information management system built with Next.js and NestJS.

## 🚀 Features

- **Multi-tenant Architecture**: Support for multiple schools with data isolation
- **Role-Based Access Control**: Comprehensive RBAC system for different user types
- **Student Management**: Complete student lifecycle from registration to graduation
- **Academic Management**: Timetables, exams, marks, and promotions
- **Financial Management**: Fee collection, invoicing, and payment tracking
- **HR & Payroll**: Employee management and automated payroll processing
- **Automation**: Workflow automation for common school processes
- **Multi-channel Notifications**: SMS, email, and in-app notifications

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui
- **Backend**: NestJS with TypeScript, TypeORM, and PostgreSQL
- **Database**: PostgreSQL with Redis for caching and job queues
- **File Storage**: MinIO (development) / AWS S3 (production)
- **Authentication**: JWT-based with refresh tokens
- **API**: RESTful APIs with GraphQL support

## 📋 Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Rex
```

### 2. Start Infrastructure Services

```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- MinIO on ports 9000 (API) and 9001 (Console)

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env with your configuration
# Update database credentials, JWT secrets, etc.

# Start the backend
npm run start:dev
```

The backend will be available at `http://localhost:3001`

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

- **Database**: `DB_URL`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- **Redis**: `REDIS_URL`, `REDIS_HOST`, `REDIS_PORT`
- **JWT**: `JWT_SECRET`, `JWT_TTL`, `JWT_REFRESH_TTL`
- **File Storage**: `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET`, `S3_ENDPOINT`
- **Email**: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`
- **SMS**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`

### Database Setup

1. Create the database:
```sql
CREATE DATABASE eduwis_basic;
CREATE USER eduwis_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE eduwis_basic TO eduwis_user;
```

2. The application will automatically create tables and run migrations in development mode.

## 🚀 Development

### Available Scripts

**Backend:**
```bash
npm run start:dev      # Start in development mode
npm run build          # Build the application
npm run start:prod     # Start in production mode
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Run tests with coverage
```

**Frontend:**
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
npm run test           # Run tests
```

### Project Structure

```
eduwis-basic/
├── frontend/          # Next.js frontend application
├── backend/           # NestJS backend API
├── docs/              # Documentation and specifications
├── docker-compose.yml # Development infrastructure
└── README.md          # This file
```

## 📚 API Documentation

The API is available at `/api/v1` with the following main endpoints:

- **Auth**: `/auth/login`, `/auth/refresh`, `/auth/logout`
- **Students**: `/students`, `/students/:id`
- **Employees**: `/employees`, `/employees/:id`
- **Academics**: `/exams`, `/marks`, `/timetable`
- **Finance**: `/payments`, `/invoices`, `/fees`
- **HR**: `/payroll`, `/attendance`, `/tasks`

## 🔒 Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- Input validation and sanitization
- Rate limiting and CORS protection
- Helmet security headers
- SQL injection prevention

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
cd frontend
npm run test
```

## 📦 Deployment

### Production Environment

1. Set `NODE_ENV=production`
2. Use managed PostgreSQL and Redis services
3. Configure production file storage (AWS S3, etc.)
4. Set up proper SSL certificates
5. Configure monitoring and logging

### Docker Deployment

```bash
# Build and run with Docker
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `docs/` folder
- Review the API specifications

## 🔄 Roadmap

- [ ] Phase 1: Core Foundation (Authentication, Basic CRUD)
- [ ] Phase 2: Academic Features (Exams, Results, Promotions)
- [ ] Phase 3: Finance & HR (Payments, Payroll)
- [ ] Phase 4: Advanced Features (ML, Mobile Apps)

---

**Built with ❤️ for educational institutions**
