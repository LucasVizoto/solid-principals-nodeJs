
import type { CheckIn } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/prisma/check-ins-repository.js";

interface GetUserMetricsUseCaseRequest{
    userId: string
}

interface GetUserMetricsUseCaseResponse {
    checkInsCount: number
}

export class GetUserMetricsUseCase{
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({userId,}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return{
            checkInsCount,
        }
    }
}