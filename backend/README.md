Auth Backend (Node + Express + TypeScript)

Backend for a professional Auth module with:
- Signup / Login / Logout
- Access + Refresh token (refresh stored in httpOnly cookie)
- Refresh token stored hashed in DB
- Forgot password + Reset password via email (SMTP with Nodemailer)
- Zod validation (same rules as frontend)
- Prisma + PostgreSQL

------------------------------------------------------------
TECH STACK
------------------------------------------------------------
- Node.js + Express
- TypeScript (strict mode)
- Prisma + PostgreSQL
- Zod validation
- JWT (access + refresh)
- Nodemailer (SMTP email sending)

------------------------------------------------------------
PROJECT STRUCTURE
------------------------------------------------------------
backend/
  prisma/
    schema.prisma
  src/
    auth/
    common/
    prisma/
    users/
    app.ts
    index.ts
    routes.ts
  .env
  .env.example
  package.json
  tsconfig.json

------------------------------------------------------------
REQUIREMENTS
------------------------------------------------------------
- Node.js 20 LTS recommended
- PostgreSQL running locally

Note:
Prisma CLI may fail on non-LTS Node versions.
Use Node 20 LTS for stability.

------------------------------------------------------------
ENVIRONMENT SETUP
------------------------------------------------------------
1) Copy .env.example to .env

2) Configure required values:

PORT=8080
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth_db?schema=public"

JWT_ACCESS_SECRET="change_me_access_secret_123456"
JWT_REFRESH_SECRET="change_me_refresh_secret_123456"
JWT_ACCESS_TTL_SECONDS=900
JWT_REFRESH_TTL_SECONDS=1209600

COOKIE_NAME_REFRESH=refresh_token
COOKIE_SECURE=false
COOKIE_SAMESITE=lax
COOKIE_DOMAIN=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="Auth App <no-reply@yourapp.com>"

------------------------------------------------------------
INSTALL
------------------------------------------------------------
npm install

------------------------------------------------------------
DATABASE (PRISMA)
------------------------------------------------------------
Generate Prisma client:
npx prisma generate

Run migration:
npx prisma migrate dev --name init_auth

Open Prisma Studio (optional):
npx prisma studio

------------------------------------------------------------
RUN SERVER
------------------------------------------------------------
Development:
npm run dev

Server runs at:
http://localhost:8080

Health check:
GET http://localhost:8080/api/health
GET http://localhost:8080/api/health/db

Production:
npm run build
npm start

------------------------------------------------------------
CORS + FRONTEND CONNECTION
------------------------------------------------------------
Backend must allow:
CORS_ORIGIN=http://localhost:5173
credentials: true

Frontend must use:
axios withCredentials: true
VITE_API_BASE_URL=http://localhost:8080

------------------------------------------------------------
API LIST
------------------------------------------------------------

Base URL:
http://localhost:8080

1) Signup
POST /api/auth/signup
Body:
{
  "name": "Demo",
  "email": "demo@site.com",
  "password": "password123"
}

Response:
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
}

------------------------------------------------------------

2) Login
POST /api/auth/login
Body:
{
  "email": "demo@site.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "accessToken": "..."
}

Also sets refresh_token cookie (httpOnly).

------------------------------------------------------------

3) Refresh
POST /api/auth/refresh
Body: none

Uses refresh token from httpOnly cookie.

Response:
{
  "accessToken": "..."
}

------------------------------------------------------------

4) Logout
POST /api/auth/logout
Body: none

Revokes refresh token and clears cookie.
Response: 204 No Content

------------------------------------------------------------

5) Me (Protected)
GET /api/auth/me

Header:
Authorization: Bearer <accessToken>

Response:
{
  "user": { ... }
}

------------------------------------------------------------

6) Forgot Password
POST /api/auth/forgot-password
Body:
{
  "email": "demo@site.com"
}

Response:
{
  "message": "If the account exists, a password reset email has been sent."
}

------------------------------------------------------------

7) Reset Password
POST /api/auth/reset-password
Body:
{
  "token": "<token-from-email>",
  "newPassword": "newPassword123"
}

Response:
{
  "message": "Password updated successfully"
}

------------------------------------------------------------
SECURITY NOTES
------------------------------------------------------------
- Passwords are stored as bcrypt hash only.
- Refresh tokens are stored hashed in DB.
- Reset tokens are stored hashed and expire automatically.
- API never returns password fields.
- Zod validates all request bodies.
- Centralized error handling with AppError.
- Generic message for forgot-password to prevent user enumeration.

------------------------------------------------------------
TROUBLESHOOTING
------------------------------------------------------------

Prisma init error:
If you see "isError is not a function",
use Node 20 LTS.

Cookies not being set:
- Backend must use credentials: true in CORS
- Frontend must use withCredentials: true
- Ensure CORS_ORIGIN matches frontend origin exactly