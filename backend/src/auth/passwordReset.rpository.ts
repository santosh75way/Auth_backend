import { prisma } from "../../prisma/client";

export async function createPasswordResetToken(params: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}): Promise<void> {
  await prisma.passwordResetToken.create({
    data: {
      userId: params.userId,
      tokenHash: params.tokenHash,
      expiresAt: params.expiresAt,
    },
  });
}

export async function findValidPasswordResetTokenByHash(tokenHash: string) {
  const now = new Date();

  return prisma.passwordResetToken.findFirst({
    where: {
      tokenHash,
      usedAt: null,
      expiresAt: { gt: now },
    },
  });
}

export async function markPasswordResetTokenUsed(id: string): Promise<void> {
  await prisma.passwordResetToken.update({
    where: { id },
    data: { usedAt: new Date() },
  });
}