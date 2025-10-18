import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms.js"
import { SearchGymsUseCase } from "../search-gym.js"
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository.js"

export function makeFetchNearbyGymsUseCase() {
        const gymsRepository = new PrismaGymsRepository()
        const useCase = new FetchNearbyGymsUseCase(gymsRepository)

        return useCase
}