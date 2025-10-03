import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository.js"
import { AuthenticateUseCase } from "../authenticate.js"

export function makeAuthenticateUseCase() {
        const userRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(userRepository)

        return authenticateUseCase
}