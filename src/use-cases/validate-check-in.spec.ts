import {expect, it, describe, beforeEach, vi, afterEach} from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository.js'
import { ValidateCheckInUseCase } from './validate-check-in.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { LateCheckInValidationError } from './errors/late-checkIn-validation-error.js'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate CheckIn Use-Case', () =>{
    
    beforeEach(async ()=>{
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidateCheckInUseCase(checkInsRepository)
        
        vi.useFakeTimers() //aqui eu estou falando para o vitest usar um relogio falso
    })

    afterEach(()=>{
        vi.useRealTimers() //aqui eu estou falando para o vitest voltar a usar o relogio real
    })

    it('should be able to validate the check-in', async () =>{

        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
        })


        const {checkIn} = await sut.execute({
            checkInId: createdCheckIn.id,
        })

        //console.log(checkIn.created_at)
        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })

    it('should not be able to validate an inexistent check-in', async () =>{
        expect(()=>
            sut.execute({
                checkInId: 'inexistent-check-in-id',
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError)

    })

    it('should not be able to validate the check-in after 20 minutes of its creation', async () =>{
        vi.setSystemTime(new Date(2023, 0, 1,13, 40))
        
        const createdCheckIn = await checkInsRepository.create({
            gym_id: 'gym-1',
            user_id: 'user-1',
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs) //aqui eu estou avançando o relogio em 21 minutos
        // o calculo é 1000 milisegundos * 60 segundos * 21 minutos


        await expect(()=>
            sut.execute({
                checkInId: createdCheckIn.id,
            }),
        ).rejects.toBeInstanceOf(LateCheckInValidationError)

    })
    

})