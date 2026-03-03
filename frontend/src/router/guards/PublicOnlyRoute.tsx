import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ROUTES } from "../paths";

export function PublicOnlyRoute() {
    const isAuthenticated = useAppSelector((s) => s.auth.status === "authenticated");

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return <Outlet />;
}