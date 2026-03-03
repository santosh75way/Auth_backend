import type { User } from "@prisma/client";
import { prisma } from "../../prisma/client";
import type { CreateUserInput } from "../common/types/user.types";

export async function findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { email },
    });
}

export async function findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
        where: { id },
    });
}

export async function createUser(input: CreateUserInput): Promise<User> {
    return prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            passwordHash: input.passwordHash,
        },
    });
}
//////////////////
export async function updateUserPasswordHash(params: {
  userId: string;
  passwordHash: string;
}): Promise<void> {
  await prisma.user.update({
    where: { id: params.userId },
    data: { passwordHash: params.passwordHash },
  });
}