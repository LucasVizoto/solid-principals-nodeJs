import { prisma } from "@/lib/prisma.js"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest{
    name: string,
    email: string,
    password: string
}

export async function registerUseCase({
    name,
    email,
    password,
}:RegisterUseCaseRequest) {

    const password_hash = await hash(password, 6) //numero de rounds, quantidade de vezes que vai ser um hash gerado
    //vai ser gerado um hsh do próprio hash 6 vezes

    const userWithSameEmail = await prisma.user.findUnique({
        where:{
            email,
        },
    })

    if (userWithSameEmail){
        throw new Error('E-mail already exists.')
    }

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash,
        }
    })
}