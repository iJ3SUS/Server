import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'

declare global {

    interface Server extends FastifyInstance {
        db?: any,
        container?: any,
        validate?: any
    }

    interface IRequest extends FastifyRequest {
        server: Server,
        all?: any
    }

    interface IReply extends FastifyReply {

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


