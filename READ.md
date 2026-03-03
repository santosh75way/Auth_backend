AUTH MODULE – FULL STACK PROJECT
=================================

Professional authentication system built with:

Frontend:
- React + Vite + TypeScript
- MUI
- React Router v7
- Redux Toolkit
- Zod validation

Backend:
- Node + Express + TypeScript
- Prisma + PostgreSQL
- JWT (Access + Refresh)
- Refresh token in httpOnly cookie
- Nodemailer (SMTP)
- Zod validation

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------

root/
  frontend/
  backend/
  README.md

------------------------------------------------------------
ARCHITECTURE OVERVIEW
------------------------------------------------------------

Authentication Strategy:
- Access token (short lived) returned in response body
- Refresh token (long lived) stored in httpOnly cookie
- Refresh token stored hashed in DB
- Token rotation on refresh
- Password reset using secure reset tokens

Security:
- Passwords hashed with bcrypt
- Tokens signed with JWT
- Zod validation on frontend and backend
- Generic forgot-password response (prevents user enumeration)
- CORS configured with credentials
- No sensitive data returned in responses

------------------------------------------------------------
FRONTEND (React + Vite)
------------------------------------------------------------

Location:
frontend/

Tech:
- React
- TypeScript (strict)
- MUI
- Redux Toolkit
- React Router v7
- Axios

Environment File:
frontend/.env

Example:

VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Auth Module
VITE_APP_ENV=development

Run Frontend:

cd frontend
npm install
npm run dev

Runs at:
http://localhost:5173

------------------------------------------------------------
BACKEND (Node + Express)
------------------------------------------------------------

Location:
backend/

Tech:
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Nodemailer SMTP

Environment File:
backend/.env

Example:

PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth_db?schema=public"

JWT_ACCESS_SECRET="change_me_access_secret"
JWT_REFRESH_SECRET="change_me_refresh_secret"
JWT_ACCESS_TTL_SECONDS=900
JWT_REFRESH_TTL_SECONDS=1209600

COOKIE_NAME_REFRESH=refresh_token
COOKIE_SECURE=false
COOKIE_SAMESITE=lax

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Auth App <no-reply@yourapp.com>"

Run Backend:

cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init_auth
npm run dev

Runs at:
http://localhost:8080

------------------------------------------------------------
API LIST
------------------------------------------------------------

Base URL:
http://localhost:8080

POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password

------------------------------------------------------------
HOW FRONTEND CONNECTS TO BACKEND
------------------------------------------------------------

- Axios baseURL = VITE_API_BASE_URL
- axios must use withCredentials: true
- Backend CORS must allow:
  origin: http://localhost:5173
  credentials: true
- Refresh token stored in httpOnly cookie
- Access token sent via Authorization header

------------------------------------------------------------
AUTH FLOW
------------------------------------------------------------

Signup:
Frontend → /signup → POST /api/auth/signup
Redirect to /login

Login:
Frontend → POST /api/auth/login
Receive:
  - accessToken
  - refresh_token cookie
Store accessToken in Redux
Redirect to /home

Protected Route:
Frontend sends:
Authorization: Bearer <accessToken>

If expired:
Frontend calls:
POST /api/auth/refresh
Gets new accessToken

Logout:
POST /api/auth/logout
Cookie cleared
Redux cleared
Redirect to /

Forgot Password:
POST /api/auth/forgot-password
User receives email
Reset password using token

------------------------------------------------------------
DEVELOPMENT WORKFLOW
------------------------------------------------------------

1. Start PostgreSQL
2. Start Backend
3. Start Frontend
4. Open http://localhost:5173

------------------------------------------------------------
COMMON ISSUES
------------------------------------------------------------

Cookies not set:
- Ensure backend CORS uses credentials: true
- Ensure frontend axios uses withCredentials: true
- Ensure origins match exactly

Prisma init error:
Use Node 20 LTS

Email not sending:
Check SMTP credentials
Use App Password for Gmail

------------------------------------------------------------
PRODUCTION NOTES
------------------------------------------------------------

In production:

Backend:
- COOKIE_SECURE=true
- COOKIE_SAMESITE=none (if cross-domain)
- Use HTTPS
- Use strong JWT secrets

Frontend:
- VITE_API_BASE_URL=https://api.yourdomain.com

------------------------------------------------------------
END
------------------------------------------------------------