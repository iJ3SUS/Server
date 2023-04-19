import { validate } from '@root/util/controllers/decorators/validator'

class Controller {

    public server: any
     
    constructor(server:any){
        this.server = server
    }

    @validate('e')
    public browse (request:any, reply:any) {
        
        return reply.send(request.body)

    }

    public browse2 (request:any, reply:any) {
       
        return reply.send(request.body)

    } 
}

export default Controller