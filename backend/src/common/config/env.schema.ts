import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(8080),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    CORS_ORIGIN: z.string().min(1),

    DATABASE_URL: z.string().min(1),

    JWT_ACCESS_SECRET: z.string().min(16),
    JWT_REFRESH_SECRET: z.string().min(16),

    JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().min(60).default(900),
    JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().min(60).default(1209600),

    COOKIE_NAME_REFRESH: z.string().min(1).default("refresh_token"),
    COOKIE_SECURE: z.coerce.boolean().default(false),
    COOKIE_SAMESITE: z.enum(["lax", "strict", "none"]).default("lax"),
    COOKIE_DOMAIN: z.string().optional(),
    SMTP_HOST: z.string().min(1),
    SMTP_PORT: z.coerce.number().int().min(1),
    SMTP_USER: z.string().min(1),
    SMTP_PASS: z.string().min(1),
    SMTP_FROM: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;