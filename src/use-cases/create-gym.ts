import type { Gym } from "generated/prisma/index.js"
import type { GymsRepository } from "@/repositories/gyms-repository.js"

interface CreateGymUseCaseRequest{
    title: string,
    description: string | null, // ? significa undefined e null poderia de fato ser apenas nulo, nada
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse{
    gym: Gym
}


export class CreateGymUseCase{
    constructor(private gymsRespository:GymsRepository){}

    async execute({title, description, phone, latitude, longitude }:CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {


        const gym = await this.gymsRespository.create({
            title, 
            description, 
            phone, 
            latitude, 
            longitude
        })

        return {
            gym,
        }
    }
}


