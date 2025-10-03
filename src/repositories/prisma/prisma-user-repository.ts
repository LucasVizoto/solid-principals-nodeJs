import { prisma } from "@/lib/prisma.js";
import { Prisma, type User } from "generated/prisma/index.js";
import type { UserRepository } from "../interfaces/users-repository.js";

export class PrismaUserRepository implements UserRepository{
    findById(userId: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where:{
                email,
            },
        })

        return user
    }

    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data,
    })

    return user
    }
}