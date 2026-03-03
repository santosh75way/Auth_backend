import { Router } from "express";
import { asyncHandler } from "../common/helper/asyncHandler";
import { validateBody } from "../common/middleware/validate.middleware";
import { requireAuth } from "../common/middleware/auth.middleware";

import { forgotPasswordSchema, loginSchema, resetPasswordSchema, signupSchema } from "./auth.schema";
import {
  forgotPasswordController,
  loginController,
  logoutController,
  meController,
  refreshController,
  resetPasswordController,
  signupController,
} from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/signup", validateBody(signupSchema), asyncHandler(signupController));
authRoutes.post("/login", validateBody(loginSchema), asyncHandler(loginController));

authRoutes.post("/refresh", asyncHandler(refreshController));
authRoutes.post("/logout", asyncHandler(logoutController));

// protected profile
authRoutes.get("/me", requireAuth, asyncHandler(meController));

authRoutes.post(
  "/forgot-password",
  validateBody(forgotPasswordSchema),
  asyncHandler(forgotPasswordController),
);

authRoutes.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  asyncHandler(resetPasswordController),
);