import type { NextFunction, Request, Response } from "express";
import { AppError } from "../types/appError";
import { verifyAccessToken } from "../../auth/token.service";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");

  if (!header) {
    next(new AppError("Missing Authorization header", 401, "AUTH_REQUIRED"));
    return;
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    next(new AppError("Invalid Authorization header", 401, "INVALID_AUTH_HEADER"));
    return;
  }

  const claims = verifyAccessToken(token);
  req.auth = { userId: claims.sub, email: claims.email };

  next();
}