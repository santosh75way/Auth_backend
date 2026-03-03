import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Registered email is required")
    .email("Enter a valid email address"),
});
/////////////////////////////////////
export const resetPasswordSchema = z.object({
  token: z.string().trim().min(20, "Reset token is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupBody = z.infer<typeof signupSchema>;
export type LoginBody = z.infer<typeof loginSchema>;
export type ForgotPasswordBody = z.infer<typeof forgotPasswordSchema>;
///////////////////////////////
export type ResetPasswordBody = z.infer<typeof resetPasswordSchema>;