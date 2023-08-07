
import { route, injectable } from '@root/core/decorators'

@injectable()
class Usuarios {

    public all(){

        return [
            'usuarios1'
        ]
    }


}

@injectable()
export default class Prueba{ 

    constructor(private usuarios : Usuarios){

        this.usuarios = usuarios
    }

    @route('GET', 'all')
    public index (request : Request, reply : Reply) {


        const respuesta = this.usuarios.all()

        return reply.send(respuesta)
    }
}

export const prefix = 'usuarios'