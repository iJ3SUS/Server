import { injectable } from '@root/plugins/core/decorators/ioc'
import { route } from '@root/plugins/core/decorators/http'

@injectable()
class ChilRepository {
    
}


@injectable()
class Repository {

    private child
 
    constructor(repositoryValue: ChilRepository) {
        this.child = repositoryValue
    }

    public exec() {

        console.log("EJECUTADO EN REPOSITORIO", this.child)

    }

}

@injectable()
class Prueba{

    // private repository
 
    // constructor(repositoryValue: Repository) {
 
    //     this.repository = repositoryValue
    // }

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
