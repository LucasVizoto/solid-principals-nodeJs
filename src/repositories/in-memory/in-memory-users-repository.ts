import type { User, Prisma } from "generated/prisma/index.js";
import type { UserRepository } from "../interfaces/users-repository.js";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UserRepository{
    
    public items: User[] = []
    
    async findById(userId: string): Promise<User | null> {
        const user = this.items.find((item) => item.id == userId)

        if (!user){
            return null
        }

        return user
    }


    async findByEmail(email: string){
        const user = this.items.find(item => item.email == email)

        if (!user){
            return null
        }

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }

}
// const registerUseCase = new RegisterUseCase({
//     async findByEmail(email){
//         return null
//     },

//     async create(data){

//     } 
// })