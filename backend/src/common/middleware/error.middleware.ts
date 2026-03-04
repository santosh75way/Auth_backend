import type { NextFunction, Request, Response } from "express";
import { AppError } from "../types/appError";

type ErrorBody = {
    message: string;
    code?: string;
};

export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        const body: ErrorBody = {
            message: err.message,
            ...(err.code !== undefined && { code: err.code }),
        };
        res.status(err.status).json(body);
        return;
    }

    // Fallback (don’t leak internals)
    res.status(500).json({ message: "Internal server error" });
}