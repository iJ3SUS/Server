
import { injectable } from '@root/core/decorators/ioc'
import { route } from '@root/core/decorators/http'

import validator from '@root/core/middlewares/validator'
import pruebaSchema from '@root/modules/test/schemas/prueba'


@injectable() 
class Prueba{

    @route('POST', 'prueba', validator(pruebaSchema))
    public async prueba(request : Request, reply: Reply){

        return reply.send(request.body)

    }

}


export default Prueba
