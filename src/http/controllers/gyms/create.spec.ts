import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-athenticate-user.js'

describe('Create Gym (e2e)', () =>{

    beforeAll( async ()=>{
        await app.ready()
    })

    afterAll( async ()=>{
        await app.close()
    })

    it('should be able to create a Gym', async ()=>{

         const {token} = await createAndAuthenticateUser(app, true)

        const response = await request(app.server)
        .get('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'JavaScript Gym',
            description: 'Some description about JavaScript Gym',
            phone: '11999999999',
            latitude: -20.5107557,
            longitude: -47.0061818
        })

        expect(response.statusCode).toEqual(201)
        })
    })
