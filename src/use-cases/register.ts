import { prisma } from "@/lib/prisma.js"
import type { UserRepository } from "@/repositories/interfaces/users-repository.js"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest{
    name: string,
    email: string,
    password: string
}

//solid

// d - Dependency Invertion  (caso de uso depemde do meu repo)
//neste caso queremos inverter, pois o caso de uso instancia a 
// dependencia diretamenteo ao inves do caso de uso instanciar a dependencia, eu recebo elas como param

export class RegisterUseCase{
    constructor(private userRepository:UserRepository){}

    async execute({name, email, password }:RegisterUseCaseRequest) {

        const password_hash = await hash(password, 6) //numero de rounds, quantidade de vezes que vai ser um hash gerado
        //vai ser gerado um hsh do próprio hash 6 vezes

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if (userWithSameEmail){
            throw new Error('E-mail already exists.')
        }

        await this.userRepository.create({
            name,
            email,
            password_hash,
        })
    }
}


