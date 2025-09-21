import { prisma } from "@/lib/prisma.js";
import { Prisma } from "generated/prisma/index.js";
import type { AnyARecord } from "node:dns";

export class InMemoryUsersRepository{
    public users: any = []

    async create(data: Prisma.UserCreateInput){
        this.users.push(data)
    }
}
