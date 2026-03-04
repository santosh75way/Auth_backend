import { envSchema, type Env } from "./env.schema";

export const env: Env = envSchema.parse({
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,

    CORS_ORIGIN: process.env.CORS_ORIGIN,

    DATABASE_URL: process.env.DATABASE_URL,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

    JWT_ACCESS_TTL_SECONDS: process.env.JWT_ACCESS_TTL_SECONDS,
    JWT_REFRESH_TTL_SECONDS: process.env.JWT_REFRESH_TTL_SECONDS,

    COOKIE_NAME_REFRESH: process.env.COOKIE_NAME_REFRESH,
    COOKIE_SECURE: process.env.COOKIE_SECURE,
    COOKIE_SAMESITE: process.env.COOKIE_SAMESITE,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    FRONTEND_URL: process.env.FRONTEND_URL,
});