import type { Gym, Prisma } from "generated/prisma/index.js";

export interface FindManyNearbyParams{
    latitude: number
    longitude: number
}

export interface GymsRepository {
    findById(id: string): Promise<Gym | null>
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
    searcMany(query: string, page: number): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}   