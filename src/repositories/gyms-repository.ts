import type { Gym, Prisma } from "generated/prisma/index.js";

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}