import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { ROUTES } from "../paths";

export function LoginAccessRoute() {
    const isAuthenticated = useAppSelector((s) => s.auth.status === "authenticated");
    const hasSignedUp = useAppSelector((s) => s.auth.hasSignedUp);

    if (isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    if (!hasSignedUp) {
        return <Navigate to={ROUTES.SIGNUP} replace />;
    }

    return <Outlet />;
}
