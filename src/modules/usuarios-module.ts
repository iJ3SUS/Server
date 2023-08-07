
import { route, injectable } from '@root/core/decorators'

@injectable()
export default class Prueba{

    @route('GET', 'prueba2')
    public async prueba(request : Request, reply: Reply){

        return reply.send("OK")

    }

}

export const prefix = 'dddd'
