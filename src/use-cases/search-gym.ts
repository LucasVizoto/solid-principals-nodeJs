import type { Gym } from "generated/prisma/index.js"
import type { GymsRepository } from "@/repositories/gyms-repository.js"

interface SearchGymsUseCaseRequest{
    query: string
    page: number
}

interface SearchGymsUseCaseResponse{
    gyms: Gym []
}


export class SearchGymsUseCase{
    constructor(private gymsRespository:GymsRepository){}

    async execute({query, page }:SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {


        const gyms = await this.gymsRespository.searcMany(
           query, 
           page
        )

        return {
            gyms,
        }
    }
}


