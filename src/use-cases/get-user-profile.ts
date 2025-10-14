import type { UserRepository } from "@/repositories/users-repository.js";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.js";
import { compare } from "bcryptjs";
import { ParseStatus } from "zod/v3";
import type { User } from "generated/prisma/index.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetProfileUseCaseRequest{
    userId: string
}

interface GetProfileUseCaseResponse {
    user: User
}

export class GetProfileUseCase{
    constructor(
        private userRepository: UserRepository,
    ) {}

    async execute({userId}: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse>{
        //buscar o usuário no banco pelo e-mail
        //compaarar se a senha salva no banco bate com a senha do param
        const user = await this.userRepository.findById(userId)

        if (!user){
            throw new ResourceNotFoundError()
        }

        return{
            user,
        }
    }
}