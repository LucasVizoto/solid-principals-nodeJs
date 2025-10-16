import {expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository.js'
import { CheckInUseCase } from './check-in.js'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error.js'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymRepository
let sut: CheckInUseCase

describe('CheckIn Use-Case', () =>{
    
    beforeEach(async ()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)
        
        await gymsRepository.create({
            id: 'gym-1',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: 0,
            longitude: 0
        })

        vi.useFakeTimers() //aqui eu estou falando para o vitest usar um relogio falso
    })

    afterEach(()=>{
        vi.useRealTimers() //aqui eu estou falando para o vitest voltar a usar o relogio real
    })

    it('should be able to check in', async () =>{


        //vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) //aqui eu estou setando a data do relogio falso para 20 de janeiro de 2022 as 8 horas da manha

        const {checkIn} = await sut.execute({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 0,
            userLongitude: 0,
        })

        //console.log(checkIn.created_at)
        expect(checkIn.id).toEqual(expect.any(String))
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })
    
    //fluxo de tdd 
    // red - green - refactor
    //eu tenho um erro ao tentar relizar o teste na aplicaçã0 (RED)
    //eu escrevo o codigo para fazer o teste passar (Green)
    //depois eu refatoro o codigo (Refactor)

    it('should not be able to check in twice in the same day', async () =>{
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        
        await sut.execute({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 0,
            userLongitude: 0,
        })

        await expect(sut.execute({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
        //estou aguardando que a promisse rejeitasse e levantasse um erro, que basicament
        //significa que o usuario nao pode fazer check-in duas vezes no mesmo dia
    })

    it('should be able to check in twice in different days', async () =>{
        
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
        
        await sut.execute({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 0,
            userLongitude: 0,
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            gymId: 'gym-1',
            userId: 'user-1',
            userLatitude: 0,
            userLongitude: 0,
        })

        expect(checkIn.id).toEqual(expect.any(String))
        //estou aguardando que a promisse rejeitasse e levantasse um erro, que basicament
        //significa que o usuario nao pode fazer check-in duas vezes no mesmo dia
    })

    it('should not be able to check in on distant gym', async () =>{


        gymsRepository.items.push({
            id: 'gym-02',
            title: 'JavaScript Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-20.533949),
            longitude: new Decimal(-47.3765211)
        })

        //vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)) //aqui eu estou setando a data do relogio falso para 20 de janeiro de 2022 as 8 horas da manha
        
        // ,

        await expect(()=>
            sut.execute({
                gymId: 'gym-2',
                userId: 'user-1',
                userLatitude: -20.5107557,
                userLongitude: -47.0061818,
            }),
        ).rejects.toBeInstanceOf(Error)

    })
})