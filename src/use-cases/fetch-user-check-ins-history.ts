
import type { CheckIn } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/prisma/check-ins-repository.js";

interface FetchUserCheckInUseCaseRequest{
    userId: string
    page: number
}

interface FetchUserCheckInUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInUseCase{
    constructor(
        private checkInsRepository: CheckInsRepository,
    ) {}

    async execute({userId, page}: FetchUserCheckInUseCaseRequest): Promise<FetchUserCheckInUseCaseResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return{
            checkIns,
        }
    }
}