import { PrismaClient } from "@prisma/client";

type PrismaGlobal = {
  prismaClient?: PrismaClient;
};

const prismaGlobal: PrismaGlobal = globalThis as PrismaGlobal;

export const prisma =
  prismaGlobal.prismaClient ??
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  prismaGlobal.prismaClient = prisma;
}