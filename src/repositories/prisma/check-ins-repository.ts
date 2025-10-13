import type { CheckIn, Prisma } from "generated/prisma/client.js";

export interface CheckInsRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    findById(checkInId: string): Promise<CheckIn | null>
    countByUserId(userId: string): Promise<number>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    save(checkIn: CheckIn): Promise<CheckIn>
}   