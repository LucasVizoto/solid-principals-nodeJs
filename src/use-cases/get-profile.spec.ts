import {expect, it, describe, beforeEach} from 'vitest'
import {InMemoryUsersRepository} from 'src/repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'
import { GetProfileUseCase } from './get-user-profile.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'

let userRepository: InMemoryUsersRepository
let sut: GetProfileUseCase
//sut = system under test

describe('Get User Profile Use-Case', () =>{

    beforeEach(()=> {
        userRepository = new InMemoryUsersRepository()
        sut = new GetProfileUseCase(userRepository) 
    })

    it('should be able to get user profile', async () =>{


        const createdUser = await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const {user} = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String))
        expect(user.name).toEqual('John Doe')
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })

    it('should not be able to get user profile with wrong id', async () =>{


       await expect(() =>
            sut.execute({
                'userId': 'non-existing-id'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })
})