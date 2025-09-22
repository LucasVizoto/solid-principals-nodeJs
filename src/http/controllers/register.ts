import type { FastifyRequest, FastifyReply } from 'fastify'
import {z} from 'zod'
import { RegisterUseCase } from '@/use-cases/register.js'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository.js'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error.js'

export async function register (request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    })

    const {name, email, password} = registerBodySchema.parse(request.body)
    
    try{
        
        const userRepository = new PrismaUserRepository()
        const registerUseCase = new RegisterUseCase(userRepository)
        
        await registerUseCase.execute({
            name,
            email,
            password
        })
    } catch (err){
        if(err instanceof UserAlreadyExistsError){
            return reply.status(409).send({message: err.message})
        }
        
        throw err
    }

    return reply.status(201).send()
}