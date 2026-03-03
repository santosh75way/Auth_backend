import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ROUTES } from "../paths";

export function ProtectedRoute() {
  const location = useLocation();
  const isAuthenticated = useAppSelector((s) => s.auth.status === "authenticated");

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}