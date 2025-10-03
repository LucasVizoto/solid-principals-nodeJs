import {expect, it, describe, beforeEach} from 'vitest'
import {InMemoryUsersRepository} from 'src/repositories/in-memory/in-memory-users-repository.js'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-in.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register Use-Case', () =>{
    
    beforeEach(()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInsRepository)
    })

    it('should be able to check in', async () =>{

        const {checkIn} = await sut.execute({
            gymId: 'gym-1',
            userId: 'user-1'
        })

        expect(checkIn.id).toEqual(expect.any(String))
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })


})