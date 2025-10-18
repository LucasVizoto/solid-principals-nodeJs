import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js"
import { GetUserMetricsUseCase } from "../get-user-metrics.js"

export function makeGetUserMetricseUseCase() {
        const checkInRepository = new PrismaCheckInsRepository()
        const useCase = new GetUserMetricsUseCase(checkInRepository)

        return useCase
}