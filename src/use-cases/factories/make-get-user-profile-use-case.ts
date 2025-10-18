import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository.js"
import { AuthenticateUseCase } from "../authenticate.js"

export function makeGetUserProfileUseCase() {
        const userRepository = new PrismaUserRepository()
        const useCase = new AuthenticateUseCase(userRepository)

        return useCase
}