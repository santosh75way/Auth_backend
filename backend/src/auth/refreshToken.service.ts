import { createHash, randomBytes } from "crypto";
import { prisma } from "../../prisma/client";

export function hashToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

export function makeOpaqueToken(): string {
  // used later for password reset if needed; safe random
  return randomBytes(32).toString("hex");
}

export async function saveRefreshToken(params: {
  userId: string;
  refreshToken: string;
  expiresAt: Date;
}): Promise<void> {
  const tokenHash = hashToken(params.refreshToken);

  await prisma.refreshToken.create({
    data: {
      userId: params.userId,
      tokenHash,
      expiresAt: params.expiresAt,
    },
  });
}