import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-athenticate-user.js'
import { prisma } from '@/lib/prisma.js'

describe('Create CheckIn (e2e)', () =>{

    beforeAll( async ()=>{
        await app.ready()
    })

    afterAll( async ()=>{
        await app.close()
    })

    it('should be able to create a CheckIn', async ()=>{

         const {token} = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data:{
                title: 'JavaScript Gym',
                description: 'Some description about JavaScript Gym',
                phone: '11999999999',
                latitude: -20.5107557,
                longitude: -47.0061818
            }
        })

        const response = await request(app.server)
        .post(`/gyms/${gym.id}/check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            latitude: -20.5107557,
            longitude: -47.0061818
        })



        expect(response.statusCode).toEqual(201)
        })
    })
