import type { Express, Request, Response } from "express";
import { authRoutes } from "./auth/auth.routes";
import { prisma } from "../prisma/client";

export function registerRoutes(app: Express) {
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ ok: true });
  });

  app.get("/api/health/db", async (_req: Request, res: Response) => {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ ok: true, db: true });
  });

  app.use("/api/auth", authRoutes);
}