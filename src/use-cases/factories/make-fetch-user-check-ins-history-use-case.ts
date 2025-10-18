import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { FetchUserCheckInUseCase } from "../fetch-user-check-ins-history.js"

export function makeFetchUserCheckInsHistoryUseCase() {
        const checkInRepository = new PrismaCheckInsRepository()
        const useCase = new FetchUserCheckInUseCase(checkInRepository)

        return useCase
}