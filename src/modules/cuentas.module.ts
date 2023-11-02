
import { route, injectable } from '../core/decorators'

@injectable()
export default class Prueba{ 


    @route('GET', '/all/:id')
    async index (request : any, reply : any) {

        return reply.send( "OK" )

    }

    @route('GET', '/')
    async index2 (request : any, reply : any) {

        return reply.send( "HOME" )

    }

}

export const prefix = 'cuentas'