import {expect, it, describe, beforeEach} from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsUseCase } from './search-gym.js'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use-Case', () =>{
    
    beforeEach(async ()=>{
        gymsRepository = new InMemoryGymRepository()
        sut = new SearchGymsUseCase(gymsRepository)
        

    })


    it('should be able to search for gyms', async () =>{
        await gymsRepository.create({
            title: 'JavaScript Gym',
            description: null,
            phone: null,
            latitude: -20.5107557,
            longitude: -47.0061818
        })
        await gymsRepository.create({
            title: 'Python Gym',
            description: null,
            phone: null,
            latitude: -20.5107557,
            longitude: -47.0061818
        })

        const {gyms} = await sut.execute({
            query: 'JavaScript',
            page: 1
        })

        //console.log(checkIn.created_at)
        expect(gyms).toHaveLength(1) // aquie eu digo que basicamente que precisa ter um tamanho de dois itens
        expect(gyms).toEqual([
            expect.objectContaining({title: 'JavaScript Gym'}),
        ]) // aqui eu declaro que desejo que contenha um gym_id contendo os seguintes valores
    })

    it('should be able to fetch paginated gym search', async () =>{
        
        for (let i =1; i<=22; i++){
        await gymsRepository.create({
            title: `JavaScript Gym ${i}`,
            description: null,
            phone: null,
            latitude: -20.5107557,
            longitude: -47.0061818
        })
        }

        const {gyms} = await sut.execute({
            query: 'JavaScript',
            page: 2,
        })

        //console.log(checkIn.created_at)
        expect(gyms).toHaveLength(2) // aquie eu digo que basicamente que precisa ter um tamanho de dois itens
        expect(gyms).toEqual([
            expect.objectContaining({title: 'JavaScript Gym 21'}),
            expect.objectContaining({title: 'JavaScript Gym 22'}),
        ]) // aqui eu declaro que desejo que contenha um gym_id contendo os seguintes valores
    })


})