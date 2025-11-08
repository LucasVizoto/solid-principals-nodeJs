import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-athenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Check-In History (e2e)', () =>{

    beforeAll( async ()=>{
        await app.ready()
    })

    afterAll( async ()=>{
        await app.close()
    })

    it('should be able to list the history of Check-Ins', async ()=>{

        const {token} = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                description: 'Some description about JavaScript Gym',
                phone: '11999999999',
                latitude: -20.5107557,
                longitude: -47.0061818
            }
        })

        await prisma.checkIn.createMany({
            data:[
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                }
            ]
        })

        const response = await request(app.server)
        .get('/check-ins/history')
        .set('Authorization', `Bearer ${token}`)
        .send()



        expect(response.statusCode).toEqual(200)
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            })
        ])
    })
})
