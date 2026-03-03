export type AuthStatus =
    | "idle"
    | "authenticating"
    | "authenticated"
    | "unauthenticated";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
};

export type AuthSession = {
    user: AuthUser;
    accessToken: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

export type LoginResponse = AuthSession;