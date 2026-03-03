import type { Request, Response } from "express";
import { login, signup } from "./auth.service";
import type { LoginBody, SignupBody } from "./auth.schema";
// import { setRefreshCookie } from "./cookies.service";
///////////////////////////
import type { ForgotPasswordBody, ResetPasswordBody } from "./auth.schema";
import { forgotPassword, resetPassword } from "./auth.service";
/////////////////////////

import { env } from "../common/config/env";
import { clearRefreshCookie, setRefreshCookie } from "./cookies.service";
import { refreshSession, logoutSession } from "./auth.service";
import { findUserById } from "../user/user.repository";
import { toPublicUser } from "../user/user.mapper";
import { AppError } from "../common/types/appError";

type SignupResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

type LoginResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
};
///////////////////////////
type RefreshResponse = {
  accessToken: string;
};
/////////////////////////////

export async function signupController(req: Request, res: Response) {
  const body = req.body as SignupBody;
  const user = await signup(body);

  const response: SignupResponse = { user };
  res.status(201).json(response);
}

export async function loginController(req: Request, res: Response) {
  const body = req.body as LoginBody;
  const result = await login(body);

  setRefreshCookie(res, result.refreshToken);

  const response: LoginResponse = {
    user: result.user,
    accessToken: result.accessToken,
  };

  res.status(200).json(response);
}

///////////////////////////////

export async function refreshController(req: Request, res: Response) {
  const token = req.cookies?.[env.COOKIE_NAME_REFRESH] as string | undefined;

  if (!token) {
    throw new AppError("Missing refresh token", 401, "NO_REFRESH_TOKEN");
  }

  const result = await refreshSession({ refreshToken: token });
  setRefreshCookie(res, result.refreshToken);

  const response: RefreshResponse = { accessToken: result.accessToken };
  res.status(200).json(response);
}

export async function logoutController(req: Request, res: Response) {
  const token = req.cookies?.[env.COOKIE_NAME_REFRESH] as string | undefined;

  if (token) {
    await logoutSession({ refreshToken: token });
  }

  clearRefreshCookie(res);
  res.status(204).send();
}

type MeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function meController(req: Request, res: Response) {
  if (!req.auth) {
    throw new AppError("Unauthorized", 401, "AUTH_REQUIRED");
  }

  const user = await findUserById(req.auth.userId);
  if (!user) {
    throw new AppError("User not found", 404, "USER_NOT_FOUND");
  }

  const response: MeResponse = { user: toPublicUser(user) };
  res.status(200).json(response);
}


/////////////////////
type ForgotPasswordResponse = { message: string };
type ResetPasswordResponse = { message: string };

export async function forgotPasswordController(req: Request, res: Response) {
  const body = req.body as ForgotPasswordBody;
  const result = await forgotPassword(body);

  const response: ForgotPasswordResponse = { message: result.message };
  res.status(200).json(response);
}

export async function resetPasswordController(req: Request, res: Response) {
  const body = req.body as ResetPasswordBody;
  const result = await resetPassword(body);

  const response: ResetPasswordResponse = { message: result.message };
  res.status(200).json(response);
}