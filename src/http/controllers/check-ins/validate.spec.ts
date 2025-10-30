import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-athenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Validate CheckIn (e2e)', () =>{

    beforeAll( async ()=>{
        await app.ready()
    })

    afterAll( async ()=>{
        await app.close()
    })

    it('should be able to validate a CheckIn', async ()=>{

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

        let checkIn = await prisma.checkIn.create({
            data: {
                gym_id: gym.id,
                user_id: user.id,
            }
        })

        const response = await request(app.server)
        .patch(`/check-ins/${checkIn.id}/validate`)
        .set('Authorization', `Bearer ${token}`)
        .send()



        expect(response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where:{
                id: checkIn.id
            },
        })
        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})
