import fastify from "fastify";
import { appRoutes } from "./http/routes.js";
import { ZodError } from "zod";
import { issue } from "node_modules/zod/v4/core/util.cjs";
import { env } from "./env/index.js";

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply)=>{
    if (error instanceof ZodError){
        return reply
        .status(400)
        .send({message: 'Validation error.', issues: error.format()})
    }
    if (env.NODE_ENV !== "production"){
        console.error(error)
    } else{
        // TODO: Here we shoul log to an external tool like Datadog
    }

    return reply.status(500).send({message: 'Internal Server Error'})
})