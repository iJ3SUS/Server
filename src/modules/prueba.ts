import { route } from '@root/plugins/core/decorators/http'
import { injectable } from '@root/plugins/core/decorators/ioc'

@injectable()
class Prueba{

    @route('GET', 'pruebaXD')
    public async prueba(request :any, reply: any){
       
        return reply.send("OK")

    }

    @route('GET', 'pruebaXD2')
    public async prueba2(request :any, reply: any){
      
        return reply.send("OK2")
 
    }

}

export default Prueba
