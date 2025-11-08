
import type { CheckIn } from "generated/prisma/index.js";
import type { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-checkIn-validation-error.js";

interface ValidateCheckInUseCaseRequest{
    checkInId: string
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase{
    constructor(
        private checkInsRepository: PrismaCheckInsRepository,
    ) {}

    async execute({checkInId}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundError()
        }


        const distanceInMinutesFromCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        )
        // aqui eu estou pegando a diferenca em minutos entre a data atual e a data de criacao do check-in
        // diff = difference

        if (distanceInMinutesFromCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()
    
        await this.checkInsRepository.save(checkIn)

        return{
            checkIn,
        }
    }
}