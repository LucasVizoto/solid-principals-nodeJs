import {expect, it, describe, beforeEach} from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { SearchGymsUseCase } from './search-gym.js'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use-Case', () =>{
    
    beforeEach(async ()=>{
        gymsRepository = new InMemoryGymRepository()
        sut = new FetchNearbyGymsUseCase(gymsRepository)
        

    })


    it('should be able to fetch nearby gyms', async () =>{
        await gymsRepository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -20.5107557,
            longitude: -47.0061818
        })
        await gymsRepository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude:-20.6837792,
            longitude: -47.3612433
        })

        const {gyms} = await sut.execute({
            userLatitude: -20.5107557,
            userLongitude: -47.0061818,
        })

        //console.log(checkIn.created_at)
        expect(gyms).toHaveLength(1) // aquie eu digo que basicamente que precisa ter um tamanho de dois itens
        expect(gyms).toEqual([
            expect.objectContaining({title: 'Near Gym'}),
        ]) // aqui eu declaro que desejo que contenha um gym_id contendo os seguintes valores
    })

})