import type { Prisma, Gym } from "generated/prisma/index.js";
import type { GymsRepository } from "../gyms-repository.js";

export class InMemoryGymRepository implements GymsRepository{
    
    public items: Gym[] = []
    
    async findById(id: string) {
        const gym = this.items.find((item) => item.id == id)

        if (!gym){
            return null
        }

        return gym
    }
}