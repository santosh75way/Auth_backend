import jwt from "jsonwebtoken";
import { env } from "../common/config/env";
import { AppError } from "../common/types/appError";

type TokenKind = "access" | "refresh";

export type AuthTokenClaims = {
  sub: string; // user id
  email: string;
};

function signToken(kind: TokenKind, claims: AuthTokenClaims): string {
  const secret = kind === "access" ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET;
  const ttlSeconds = kind === "access" ? env.JWT_ACCESS_TTL_SECONDS : env.JWT_REFRESH_TTL_SECONDS;

  return jwt.sign(
    {
      sub: claims.sub,
      email: claims.email,
    },
    secret,
    { expiresIn: ttlSeconds },
  );
}

export function signAccessToken(claims: AuthTokenClaims): string {
  return signToken("access", claims);
}

export function signRefreshToken(claims: AuthTokenClaims): string {
  return signToken("refresh", claims);
}

export function verifyAccessToken(token: string): AuthTokenClaims {
  return verifyToken("access", token);
}

export function verifyRefreshToken(token: string): AuthTokenClaims {
  return verifyToken("refresh", token);
}

function verifyToken(kind: TokenKind, token: string): AuthTokenClaims {
  const secret = kind === "access" ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET;

  const decoded = jwt.verify(token, secret);

  if (typeof decoded !== "object" || decoded === null) {
    throw new AppError("Invalid token", 401, "INVALID_TOKEN");
  }

  const subValue = decoded.sub;
  const emailValue = decoded.email;

  if (typeof subValue !== "string" || typeof emailValue !== "string") {
    throw new AppError("Invalid token claims", 401, "INVALID_TOKEN_CLAIMS");
  }

  return { sub: subValue, email: emailValue };
}