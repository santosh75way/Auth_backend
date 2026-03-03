import type { Response } from "express";
import { env } from "../common/config/env";

export function setRefreshCookie(res: Response, refreshToken: string) {
  res.cookie(env.COOKIE_NAME_REFRESH, refreshToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAMESITE,
    domain: env.COOKIE_DOMAIN,
    path: "/",
    maxAge: env.JWT_REFRESH_TTL_SECONDS * 1000,
  });
}

export function clearRefreshCookie(res: Response) {
  res.clearCookie(env.COOKIE_NAME_REFRESH, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAMESITE,
    domain: env.COOKIE_DOMAIN,
    path: "/",
  });
}