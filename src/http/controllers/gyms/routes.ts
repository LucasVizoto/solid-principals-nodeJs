import type { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt.js";

export async function gymRoutes(app: FastifyInstance){
    app.addHook('onRequest', verifyJWT)
}