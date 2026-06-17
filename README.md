# Payroll Management System

A full-stack payroll app: a React (Create React App + Tailwind CSS) frontend and an
Express + MongoDB (Mongoose) backend organized in an MVC structure.

## Structure

```
payroll ms/
├── package.json            # root orchestrator (runs both apps via concurrently)
├── backend/
│   ├── server.js           # entry: load env → connect DB → listen
│   ├── .env                # PORT, MONGO_URI, JWT_SECRET, CORS_ORIGIN
│   └── src/
│       ├── app.js          # express app (middlewares, routes, error handlers)
│       ├── config/db.js
│       ├── models/         # User, Employee, Payroll, Attendance, Leave
│       ├── controllers/
│       ├── middlewares/    # authMiddleware (JWT)
│       └── routes/
└── frontend/
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── public/index.html   # has <div id="root">
    └── src/
        ├── App.js          # router + AuthProvider + Layout
        ├── api/axios.js    # axios instance (attaches auth token, retries)
        ├── context/AuthContext.jsx
        ├── hooks/useAuth.js
        ├── components/      # Navbar, Sidebar, EmployeeForm, PayrollTable, layout/Layout
        └── pages/           # Dashboard, Employees, Payroll, Payslips, Attendance, Leaves, Reports, Profile, Login
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local `mongodb://localhost:27017/payroll` by default)

## Setup

```bash
# from the project root — installs root, backend, and frontend deps
npm run install:all
```

Then set backend secrets in `backend/.env` (copy from `backend/.env.example`).

## Running

```bash
# run backend (nodemon) + frontend together
npm run dev

# or production-style
npm start
```

- Backend API: http://localhost:5000
- Frontend:   http://localhost:3000 (proxies `/api/*` to the backend)

## API routes

| Resource    | Base path           |
|-------------|---------------------|
| Auth        | `/api/auth`         |
| Employees   | `/api/employees`    |
| Payroll     | `/api/payroll`      |
| Attendance  | `/api/attendance`   |
| Leaves      | `/api/leaves`       |
