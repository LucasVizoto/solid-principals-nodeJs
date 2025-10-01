import type { FastifyRequest, FastifyReply } from 'fastify'
import {z} from 'zod'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository.js'
import { AuthenticateUseCase } from '@/use-cases/authenticate.js'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error.js'

export async function authenticate (request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {email, password} = authenticateBodySchema.parse(request.body)
    
    try{
        
        const userRepository = new PrismaUserRepository()
        const authenticateUseCase = new AuthenticateUseCase(userRepository)
        
        await authenticateUseCase.execute({
            email,
            password
        })
    } catch (err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message: err.message})
        }
        
        throw err
    }

    return reply.status(200).send()
}