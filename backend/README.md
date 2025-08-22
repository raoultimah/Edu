# EDU-WISE BASIC Backend

This directory contains the backend components for the EDU-WISE BASIC school management system.

## Contents

- **scripts/**: Database setup and initialization scripts
  - `create-schema.js`: Creates the database tables and relationships
  - `create-sample-data.js`: Populates the database with sample data
  - `create-sql-functions.js`: Creates SQL helper functions
  - `create-stored-procedure.js`: Creates stored procedures
  - `run-all-setup.js`: Runs all setup scripts in the correct order
  - `setup-auth.js`: Sets up authentication and test users
  - `setup-database.js`: Sets up the database connection and configuration

## Setup

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

Create a `.env.local` file based on the `.env.example` file.

3. **Run the setup script**

```bash
npm run setup
```

This will:
- Create all necessary database tables
- Set up authentication
- Create SQL helper functions
- Create stored procedures
- Populate the database with sample data

## Available Scripts

- `npm run setup`: Run all setup scripts
- `npm run setup:schema`: Create database schema
- `npm run setup:functions`: Create SQL helper functions
- `npm run setup:procedures`: Create stored procedures
- `npm run setup:auth`: Set up authentication and test users
- `npm run setup:sample-data`: Populate the database with sample data
- `npm run setup:database`: Set up the database connection and configuration

## Test Users

The setup script creates the following test users:

- **Admin**: admin@edu-wise-basic.com / Admin@123
- **Teacher**: teacher@edu-wise-basic.com / Teacher@123
- **Parent**: parent@edu-wise-basic.com / Parent@123
- **Student**: student@edu-wise-basic.com / Student@123

