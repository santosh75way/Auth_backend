import { AppError } from "../common/types/appError";
import { createUser, findUserByEmail } from "../user/user.repository";
import { toPublicUser } from "../user/user.mapper";
import { hashPassword, verifyPassword } from "./password.service";
import type { SignupBody, LoginBody, ForgotPasswordBody, ResetPasswordBody } from "./auth.schema";
import type { PublicUser } from "../common/types/user.types";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./token.service";
import { env } from "../common/config/env";
import { saveRefreshToken, makeOpaqueToken, hashToken } from "./refreshToken.service";
import {
  findValidRefreshTokenByHash,
  revokeRefreshTokenByHash,
  revokeRefreshTokenById,
} from "./refreshToken.repository";
import { createPasswordResetToken, findValidPasswordResetTokenByHash, markPasswordResetTokenUsed } from "./passwordReset.rpository";
import { sendPasswordResetEmail } from "./email.service";
import { updateUserPasswordHash } from "../user/user.repository";
import type { Response } from "express";
import { clearRefreshCookie, setRefreshCookie } from "./cookies.service";

// ─── Signup ──────────────────────────────────────────────────────────────────

export async function signup(input: SignupBody): Promise<PublicUser> {
  const email = input.email.trim().toLowerCase();
  const name = input.name.trim();

  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AppError("Email is already registered", 409, "EMAIL_TAKEN");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await createUser({
    name,
    email,
    passwordHash,
  });

  return toPublicUser(user);
}

// ─── Login ───────────────────────────────────────────────────────────────────

export type LoginResult = {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
};

export async function login(input: LoginBody): Promise<LoginResult> {
  const email = input.email.trim().toLowerCase();

  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("User not registered, please sign up first", 401, "INVALID_CREDENTIALS");
  }

  const ok = await verifyPassword(input.password, user.passwordHash);
  if (!ok) {
    throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
  }

  const claims = { sub: user.id, email: user.email };

  const accessToken = signAccessToken(claims);
  const refreshToken = signRefreshToken(claims);

  const expiresAt = new Date(Date.now() + env.JWT_REFRESH_TTL_SECONDS * 1000);
  await saveRefreshToken({ userId: user.id, refreshToken, expiresAt });

  return {
    user: toPublicUser(user),
    accessToken,
    refreshToken,
  };
}

// ─── Refresh Session ─────────────────────────────────────────────────────────

export type RefreshResult = {
  accessToken: string;
  refreshToken: string;
};

export async function refreshSession(params: {
  refreshToken: string;
}): Promise<RefreshResult> {
  const claims = verifyRefreshToken(params.refreshToken);

  const tokenHash = hashToken(params.refreshToken);
  const dbToken = await findValidRefreshTokenByHash(tokenHash);

  if (!dbToken) {
    throw new AppError("Refresh token is invalid", 401, "INVALID_REFRESH");
  }

  // Rotate: revoke old token
  await revokeRefreshTokenById(dbToken.id);

  const newRefreshToken = signRefreshToken({ sub: claims.sub, email: claims.email });
  const newAccessToken = signAccessToken({ sub: claims.sub, email: claims.email });

  const expiresAt = new Date(Date.now() + env.JWT_REFRESH_TTL_SECONDS * 1000);
  await saveRefreshToken({
    userId: claims.sub,
    refreshToken: newRefreshToken,
    expiresAt,
  });

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
}

// ─── Logout ──────────────────────────────────────────────────────────────────

export async function logoutSession(params: { refreshToken: string }): Promise<void> {
  const tokenHash = hashToken(params.refreshToken);
  await revokeRefreshTokenByHash(tokenHash);
}

// ─── Forgot Password ─────────────────────────────────────────────────────────

export type ForgotPasswordResult = {
  message: string;
};

export async function forgotPassword(input: ForgotPasswordBody): Promise<ForgotPasswordResult> {
  const email = input.email.trim().toLowerCase();

  // Always return the same generic response to prevent email enumeration attacks.
  const generic: ForgotPasswordResult = {
    message: "If the account exists, a password reset email has been sent.",
  };

  const user = await findUserByEmail(email);
  if (!user) {
    return generic;
  }

  const rawToken = makeOpaqueToken();
  const tokenHash = hashToken(rawToken);

  // 15-minute reset window
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await createPasswordResetToken({
    userId: user.id,
    tokenHash,
    expiresAt,
  });

  const resetLink = `${env.FRONTEND_URL}/reset-password?token=${rawToken}`;

  try {
    await sendPasswordResetEmail({ toEmail: user.email, resetLink });
  } catch (err) {
    // In development, surface SMTP errors so they are visible and debuggable.
    // In production, keep the response generic to avoid leaking internals.
    if (env.NODE_ENV === "development") {
      console.error("[forgotPassword] SMTP error:", err);
      throw err; // bubble up → API returns 500 with real message during dev
    }
  }

  return generic;
}

// ─── Reset Password ──────────────────────────────────────────────────────────

export type ResetPasswordResult = {
  message: string;
};

export async function resetPassword(input: ResetPasswordBody): Promise<ResetPasswordResult> {
  const rawToken = input.token.trim();
  const tokenHash = hashToken(rawToken);

  const tokenRow = await findValidPasswordResetTokenByHash(tokenHash);
  if (!tokenRow) {
    throw new AppError("Reset token is invalid or expired", 400, "RESET_TOKEN_INVALID");
  }

  const newHash = await hashPassword(input.newPassword);

  await updateUserPasswordHash({ userId: tokenRow.userId, passwordHash: newHash });
  await markPasswordResetTokenUsed(tokenRow.id);

  return { message: "Password updated successfully" };
}