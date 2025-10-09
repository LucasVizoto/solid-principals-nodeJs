import {expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { FetchUserCheckInUseCase } from './fetch-user-check-ins-history.js'
import { check } from 'zod'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInUseCase

describe('Fetch user CheckIns history Use-Case', () =>{
    
    beforeEach(async ()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new FetchUserCheckInUseCase(checkInsRepository)
        

    })


    it('should be able to fetch check-in history', async () =>{
        await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
        })
        await checkInsRepository.create({
            gym_id: 'gym-2',
            user_id: 'user-1',
        })

        const {checkIns} = await sut.execute({
            userId: 'user-1',
            page: 1
        })

        //console.log(checkIn.created_at)
        expect(checkIns).toHaveLength(2) // aquie eu digo que basicamente que precisa ter um tamanho de dois itens
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-1'}),
            expect.objectContaining({gym_id: 'gym-2'}),
        ]) // aqui eu declaro que desejo que contenha um gym_id contendo os seguintes valores
    })

    it('should be able to fetch paginated check-in history', async () =>{
        
        for (let i =1; i<=22; i++){
            await checkInsRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-1',
            })
        }

        const {checkIns} = await sut.execute({
            userId: 'user-1',
            page: 2,
        })

        //console.log(checkIn.created_at)
        expect(checkIns).toHaveLength(2) // aquie eu digo que basicamente que precisa ter um tamanho de dois itens
        expect(checkIns).toEqual([
            expect.objectContaining({gym_id: 'gym-21'}),
            expect.objectContaining({gym_id: 'gym-22'}),
        ]) // aqui eu declaro que desejo que contenha um gym_id contendo os seguintes valores
    })


})