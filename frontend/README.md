# Auth Practice (Frontend)

A complete, production-ready frontend authentication flow built with React, TypeScript, and Vite. This project demonstrates a robust architecture using Material-UI (MUI), Redux Toolkit for state management, React Router v7 for nested layouts and guards, and Zod & React Hook Form for type-safe validation.

## ✨ Features

- **Modern Architecture**: Clean separation of concerns (Layouts, Pages, Features, Components).
- **Authentication State**: Global state persistence via Redux Toolkit slices.
- **Strict Typing**: Full end-to-end type safety with TypeScript and Zod.
- **Route Guards**: Secure protected and public-only routing logic.
- **Premium UI**: Dark mode UI utilizing fully customized MUI components.

---

## 📂 Project Structure

```text
src/
├── app/               # App-level configurations
│   ├── providers/     # Global wraps (Theme, Redux Provider)
│   ├── store/         # Redux store initialization
│   └── theme/         # Material UI Customization
├── components/        # Reusable UI elements
│   ├── auth/          # Login Form
│   ├── common/        # Buttons, Inputs, Dialogs
│   └── navigation/    # Navbar, Sidebar
├── features/          # Domain-specific logic
│   └── auth/          # Authentication schemas (Zod)
├── hooks/             # Custom React Hooks
│   └── (useAppDispatch, useAppSelector)
├── layouts/           # Structural page wrappers
│   ├── AppLayout/     # Contains secure Navbar/Sidebar
│   └── PublicLayout/  # Public landing/login layouts
├── pages/             # Route top-level components
│   ├── Demo/
│   ├── Home/
│   ├── Login/
│   └── NotFound/
├── router/            # React Router v7 configuration
│   ├── guards/        # ProtectedRoute, PublicOnlyRoute
│   └── index.tsx      # route definitions
├── store/             # Redux architecture
│   └── slices/        # auth.slice.ts
└── types/             # Centralized application types
```

---

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode using Vite. Open [http://localhost:5173](http://localhost:5173) to view it in your browser. The page will instantly reload when you make edits (HMR).

### `npm run build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. It enforces absolute TypeScript strictness via `tsc -b`.

### `npm run lint`
Runs ESLint across the codebase to catch potential errors, unused variables, and enforce coding standards.

### `npm run preview`
Locally serves the production build. Useful for final checks before deployment.

---

## 🔒 Environment Variables

This project uses Vite, so environment variables must be prefixed with `VITE_`.

Create a `.env` file in the root directory (do not commit this file):

```env
# Example .env configuration
VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_ENV=development
```

- `VITE_API_URL`: The base URL pointing to the backend authentication microservice.
- `VITE_APP_ENV`: Used to toggle debugging tools or mock APIs in the codebase.

---

## 🧪 Testing

*Note: A test runner is not fully integrated yet, but the architecture is built to support Jest or Vitest.*

To run tests (once configured), the standard command will be:

### `npm run test`
Executes unit tests for Redux slices, pure utility functions, and Zod schemas.

### `npm run test:e2e`
Executes end-to-end tests (e.g., using Playwright or Cypress) to ensure the login flow, protective routes, and layout constraints work properly across the browser.

---

## 🧠 Non-Obvious Logic & Comments

### 1. Route Guards (`ProtectedRoute.tsx` & `PublicOnlyRoute.tsx`)
Because we are using React Router v7, route guarding is handled at the component level within layout nesting.
- **ProtectedRoute**: Listens to the `useAppSelector` for authentication status. If the user is `unauthenticated`, it immediately triggers a `<Navigate to="/login" replace />`.
- **PublicOnlyRoute**: Used for the Login page. If an *already authenticated* user magically browses to `/login`, this guard catches them and bounces them forward to `/home`. This prevents a logged-in user from seeing the login screen.

### 2. Form Validation (`schemas.ts`)
We use `Zod` to define the shape of our API payloads (`loginSchema`). We *infer* the TypeScript types directly from the schema (`z.infer<typeof loginSchema>`). This means our TypeScript interface and our runtime form validation logic are generated from the exact same source of truth, reducing bugs.

### 3. Redux Verbatim Imports (`useAppSelector.ts` / `auth.slice.ts`)
To comply with the strict `verbatimModuleSyntax` enforced by the modern TS compiler, we use `import type { PayloadAction }` when importing types from external libraries (like `@reduxjs/toolkit`). This ensures the bundler safely strips out types during the compilation build script without throwing an error.

### 4. Mock Authentication (`LoginForm.tsx`)
Currently, the `pretendLoginApi` simulates a real HTTP request with a `setTimeout` to show the loading states. In production, this function will be entirely replaced with an `axios.post()` or `fetch()` call pointing to the `VITE_API_URL`.
