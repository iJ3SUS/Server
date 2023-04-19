
function validate(schema: string) {
   
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
    
        const method = descriptor.value
        
        descriptor.value = function(this: any, request:any, reply:any ){

            const { schema } = reply.context.config
            

            const isValid = false

            if(!isValid){

                return reply.send(['PRUEBA PURBEA'])

            }

            return method.call(this, request, reply)
        }

        return descriptor;
    }
}



export {
    validate
}