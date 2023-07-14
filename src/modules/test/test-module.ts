
import { route, injectable } from '@root/core/decorators'

import validator from '@root/core/middlewares/validator'
import pruebaSchema from '@root/modules/test/schemas/prueba'

@injectable() 
export default class Prueba{

    @route('POST', 'prueba', validator(pruebaSchema))
    public async prueba(request : Request, reply: Reply){

        return reply.send(request.body)

    }

}

export const prefix = 'test'
