import type { FastifyInstance } from "fastify";
import { register } from "./register.js";
import { authenticate } from "./authenticate.js";
import { profile } from "./profile.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";
import { refresh } from "./refresh.js";

export async function usersRoutes(app: FastifyInstance){
    app.post('/users', register)
    app.post('/sessios', authenticate)
    
    /** Token */
    app.patch('/token/refresh', refresh)
    
    /** Autenticated */
    app.get('/me',{onRequest: [verifyJWT]}, profile)
}