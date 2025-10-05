
import type { CheckIn } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/prisma/check-ins-repository.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface CheckInUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase{
    constructor(
        private checkInsRepository: CheckInsRepository,
        private gymsRepository: GymsRepository,
    ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        //calculate distance between user and gym


        if(checkInOnSameDay){
            throw new Error('User has already checked in today.')
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId,
        })
        return{
            checkIn,
        }
    }
}