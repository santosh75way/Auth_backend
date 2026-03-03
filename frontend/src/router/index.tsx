import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./paths";

import { ProtectedRoute } from "./guards/ProtectedRoute";
import { LoginAccessRoute } from "./guards/LoginAccessRoute";

import { PublicLayout } from "../layouts/PublicLayout/PublicLayout";
import { AppLayout } from "../layouts/AppLayout/AppLayout";

import { DemoPage } from "../pages/Demo/DemoPage";
import { SignupPage } from "../pages/Signup/SignupPage";
import { LoginPage } from "../pages/Login/LoginPage";
import { HomePage } from "../pages/Home/HomePage";
import { NotFoundPage } from "../pages/NotFound/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.DEMO, element: <DemoPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      {
        element: <LoginAccessRoute />,
        children: [{ path: ROUTES.LOGIN, element: <LoginPage /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [{ path: ROUTES.HOME, element: <HomePage /> }],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);