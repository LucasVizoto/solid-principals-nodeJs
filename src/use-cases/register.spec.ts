import {expect, it, describe} from 'vitest'
import { RegisterUseCase } from './register.js'
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository.js'
import { compare } from 'bcryptjs'

describe('Register Use-Case', () =>{

    it('should hash user password upon registration', async () =>{
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email){
                return null
            },

            async create(data){
                return {
                    id: 'user-1',
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash,
                    created_at: new Date()
                }
            } 
        })

        const {user} = await registerUseCase.execute({
            name: 'Jhon Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
        
        const isPassowrdCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )
        //aqui eu faço a comparação se o valor que eu se assemelha ao hash
        
        expect(isPassowrdCorrectlyHashed).toBe(true)
    })

})