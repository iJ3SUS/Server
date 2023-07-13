import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

declare global {

    interface Server extends FastifyInstance {
        db?: any,
        container?: any,
        validate?: any
    }

    interface Request extends FastifyRequest {
        server: Server,
        all?: any
    }

    interface Reply extends FastifyReply {

    }

    type ObjectSchema = {
        [key : string] : {
            [key : string] : any
        }
    }
    
    type Schema = {
        type: 'array' | 'string' | 'object'
        rules: ObjectSchema,
        messages?: any
    }
    

}


