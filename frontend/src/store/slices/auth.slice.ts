import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, AuthStatus } from "../../types/auth.types";

type AuthState = {
    status: AuthStatus;
    user: AuthUser | null;
    accessToken: string | null;
    error: string | null;
    hasSignedUp: boolean;
};

const initialState: AuthState = {
    status: "idle",
    user: null,
    accessToken: null,
    error: null,
    hasSignedUp: false,
};

type SetSessionPayload = {
    user: AuthUser;
    accessToken: string;
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startAuth(state) {
            state.status = "authenticating";
            state.error = null;
        },
        setSession(state, action: PayloadAction<SetSessionPayload>) {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.status = "authenticated";
            state.error = null;
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.status = "unauthenticated";
            state.error = action.payload;
            state.user = null;
            state.accessToken = null;
        },
        clearSession(state) {
            state.status = "unauthenticated";
            state.user = null;
            state.accessToken = null;
            state.error = null;
        },
        markSignedUp(state) {
            state.hasSignedUp = true;
        },
    },
});

export const { startAuth, setSession, setAuthError, clearSession, markSignedUp } = authSlice.actions;

export default authSlice.reducer;