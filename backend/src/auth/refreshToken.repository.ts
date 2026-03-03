import { prisma } from "../../prisma/client";

export async function findValidRefreshTokenByHash(tokenHash: string) {
  const now = new Date();

  return prisma.refreshToken.findFirst({
    where: {
      tokenHash,
      revokedAt: null,
      expiresAt: { gt: now },
    },
  });
}

export async function revokeRefreshTokenById(id: string): Promise<void> {
  await prisma.refreshToken.update({
    where: { id },
    data: { revokedAt: new Date() },
  });
}

export async function revokeRefreshTokenByHash(tokenHash: string): Promise<void> {
  await prisma.refreshToken.updateMany({
    where: { tokenHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}