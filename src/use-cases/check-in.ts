
import type { CheckIn } from "generated/prisma/index.js";
import type { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import type { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinades.js";
import { MaxDistanceError } from "./errors/max-distance-error.js";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error.js";

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

    async execute({userId, gymId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {
                latitude: userLatitude,
                longitude: userLongitude,
            },
            {
                latitude: gym.latitude.toNumber(),
                longitude: gym.longitude.toNumber(),
            }
        )

        const MAX_DISTANCE_IN_KM = 0.1 //0.1 km = 100 metros

        if(distance > MAX_DISTANCE_IN_KM){ //0.1 km = 100 metros
            throw new MaxDistanceError()
        }


        if(checkInOnSameDay){
            throw new MaxNumberOfCheckInsError()
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