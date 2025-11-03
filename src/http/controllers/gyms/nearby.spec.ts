import request from 'supertest'
import {app} from '@/app.js'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-athenticate-user.js'
import { title } from 'process'

describe('Nearby Gym (e2e)', () =>{

    beforeAll( async ()=>{
        await app.ready()
    })

    afterAll( async ()=>{
        await app.close()
    })

    it('should be able to list nearby Gyms', async ()=>{

         const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
        .get('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'JavaScript Gym',
            description: 'Some description about JavaScript Gym',
            phone: '11999999999',
            latitude: -20.5107557,
            longitude: -47.0061818
        })
        await request(app.server)
        .get('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Python Gym',
            description: 'Some description about JavaScript Gym',
            phone: '11999999999',
            latitude:-20.6837792,
            longitude: -47.3612433
        })

        const response = await request(app.server)
        .get('/gyms/nearby')
        .set('Authorization', `Bearer ${token}`)
        .query({
            latitude: -20.5107557,
            longitude: -47.0061818,
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({title: 'JavaScript Gym'}),
        ])
        })
    })
