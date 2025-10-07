import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import {expect, it, describe, beforeEach} from 'vitest'
import { CreateGymUseCase } from './create-gym.js'


let userRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Use-Case', () =>{
    
    beforeEach(()=>{
        userRepository = new InMemoryGymRepository()
        sut = new CreateGymUseCase(userRepository)
    })

    it('should be able to create gym', async () =>{

        const {gym} = await sut.execute({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -20.5107557,
            longitude: -47.0061818
        })

        expect(gym.id).toEqual(expect.any(String))
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })
})