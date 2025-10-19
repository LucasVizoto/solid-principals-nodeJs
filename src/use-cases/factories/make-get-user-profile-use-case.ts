import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository.js"
import { GetProfileUseCase } from "../get-user-profile.js"

export function makeGetUserProfileUseCase() {
        const userRepository = new PrismaUserRepository()
        const useCase = new GetProfileUseCase(userRepository)

        return useCase
}