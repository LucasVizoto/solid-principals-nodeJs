import type { Prisma, User } from "generated/prisma/index.js"

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    create (data: Prisma.UserCreateInput): Promise<User>
}