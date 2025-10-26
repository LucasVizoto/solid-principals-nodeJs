import type { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUserMetricseUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case.js'

export async function metrics (request: FastifyRequest, reply: FastifyReply) {

    const getUserMetricsUseCase  = makeGetUserMetricseUseCase()
    
    const { checkInsCount} = await getUserMetricsUseCase.execute({
        userId: request.user.sub,
    })

    return reply.status(200).send({
        checkInsCount,
    })
}