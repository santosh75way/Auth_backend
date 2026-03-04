import { useEffect } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import { apiRefresh, apiMe } from "../services/auth.service";
import { setSession, startAuth, clearSession } from "../store/slices/auth.slice";

export function useAuthInitializer() {
    const dispatch = useAppDispatch();
    const authStatus = useAppSelector((s) => s.auth.status);

    useEffect(() => {
        // Only attempt recovery on initial load when idle
        if (authStatus !== "idle") return;

        const attemptRecovery = async () => {
            dispatch(startAuth());
            try {
                const { accessToken } = await apiRefresh();
                const user = await apiMe(accessToken);
                dispatch(setSession({ user, accessToken }));
            } catch (e) {
                // Suppress error - it just means no valid refresh cookie exists
                dispatch(clearSession());
            }
        };

        attemptRecovery();
    }, [authStatus, dispatch]);

    // Return the status so the caller can conditionally render loading states
    return {
        status: authStatus,
        isLoading: authStatus === "idle" || authStatus === "authenticating",
    };
}
