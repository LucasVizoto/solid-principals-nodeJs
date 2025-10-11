import { Prisma, type Gym } from "generated/prisma/index.js";
import type { FindManyNearbyParams, GymsRepository } from "../gyms-repository.js";
import { randomUUID } from "crypto";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinades.js";

export class InMemoryGymRepository implements GymsRepository{
    
    public items: Gym[] = []
    
    async findById(id: string) {
        const gym = this.items.find((item) => item.id == id)

        if (!gym){
            return null
        }

        return gym
    }

    async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
        return this.items.filter(item =>{
            const distance = getDistanceBetweenCoordinates(
                {latitude: params.latitude, longitude: params.longitude},
                {latitude: item.latitude.toNumber(), longitude: item.longitude.toNumber()}
            )

            return distance < 10 // distancia em km
        })
    }

    async searcMany(query: string, page: number) {
        return this.items.filter((item) => item.title
        .includes(query))
        .slice((page -1) * 20, page * 20)
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            created_at: new Date(),
        }
        
        this.items.push(gym)
        
        return gym
    }
}