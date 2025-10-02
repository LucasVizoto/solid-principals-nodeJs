import {expect, it, describe, beforeEach} from 'vitest'
import {InMemoryUsersRepository} from 'src/repositories/in-memory/in-memory-users-repository.js'
import { RegisterUseCase } from './register.js'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error.js'

let userRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use-Case', () =>{
    
    beforeEach(()=>{
        userRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should hash user password upon registration', async () =>{

        const {user} = await sut.execute({
            name: 'Jhon Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
        //aqui eu digo basicamente que eu espero que o user id seja igual a qualquer string
    })



    it('should hash user password upon registration', async () =>{

        const {user} = await sut.execute({
            name: 'Jhon Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })
        
        const isPassowrdCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )
        //aqui eu faço a comparação se o valor que eu se assemelha ao hash
        
        expect(isPassowrdCorrectlyHashed).toBe(true)
    })


    it('should not be able to register with same email twice', async () =>{

        const email = 'johndoe@example.com'

        await sut.execute({
            name: 'Jhon Doe',
            email,
            password: '123456'
        })

        await expect(() =>
            sut.execute({
                name: 'Jhon Doe',
                email,
                password: '123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
        //neste rejects é basicamente o raises do python
        //eu espero que dÊ algum erro nessa execução e posso dizer até mesmo
        // qual dos meus erro que ele é, usando o isInstanceOf
    })

})