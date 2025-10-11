import type { Gym } from "generated/prisma/index.js"
import type { GymsRepository } from "@/repositories/gyms-repository.js"

interface FetchNearbyGymsUseCaseRequest{
    userLatitude: number
    userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse{
    gyms: Gym []
}


export class FetchNearbyGymsUseCase{
    constructor(private gymsRespository:GymsRepository){}

    async execute({userLatitude, userLongitude }:FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {


        const gyms = await this.gymsRespository.findManyNearby(
              {latitude: userLatitude, longitude: userLongitude}
        )

        return {
            gyms,
        }
    }
}


