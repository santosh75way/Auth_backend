import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";
import { AppError } from "../types/appError";

type ZodSchema<T> = z.ZodType<T>;

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(", ");
      next(new AppError(message, 400, "VALIDATION_ERROR"));
      return;
    }

    // Express types define req.body loosely; we assign validated data safely.
    req.body = result.data;
    next();
  };
}