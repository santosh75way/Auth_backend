export type PublicUser = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateUserInput = {
    name: string;
    email: string;
    passwordHash: string;
};