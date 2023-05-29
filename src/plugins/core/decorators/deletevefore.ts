

const route = (method: string, url: string ) => {

    return function(target : any, methodName : any, descriptor : PropertyDescriptor) {

        if(target.routes){

            let route = target.routes.findIndex( (i:any) => i.handler == methodName)

            if(route){
                target.routes[route] = {
                    method: method,
                    url: url,
                    handler: methodName
                }
            }else{
                target.route.push({
                    method: method,
                    url: url,
                    handler: methodName
                })
            }

        }else{
            target.routes = [
                {
                    method: method,
                    url: url,
                    handler: methodName
                }
            ]
        }

        //const method = descriptor.value
        // descriptor.value = function(this: any, request:any, reply:any ){

        //     const constructorProps = Object.getOwnPropertyNames(this);

        //     console.log(constructorProps)

        //     return method.call(this, request, reply)
        // }

        // console.log(`Decorador de función: ${parametro}`)
        // console.log(`Método: ${methodName}`)

        return descriptor;

      
    }

}


// const router = (parametro: string) => {

//     return function <T extends { new (...args: any[]): {} }>(target: T): T {

//         console.log(target)
       
//         return target

//          // class newClass extends target{

//         //     constructor(...args: any[]){


//         //         console.log(...args)

//         //         super(...args)
//         //     }
//         // }
//         //return newClass as T
//     }
// }

// const route = (method: string, url: string ) => {

//     return function(target : any, methodName : any, descriptor : PropertyDescriptor) {

//         if(target.routes){

//             let route = target.routes.findIndex( (i:any) => i.handler == methodName)

//             if(route){
//                 target.routes[route] = {
//                     method: method,
//                     url: url,
//                     handler: methodName
//                 }
//             }else{
//                 target.route.push({
//                     method: method,
//                     url: url,
//                     handler: methodName
//                 })
//             }

//         }else{
//             target.routes = [
//                 {
//                     method: method,
//                     url: url,
//                     handler: methodName
//                 }
//             ]
//         }

//         //const method = descriptor.value
//         // descriptor.value = function(this: any, request:any, reply:any ){

//         //     const constructorProps = Object.getOwnPropertyNames(this);

//         //     console.log(constructorProps)

//         //     return method.call(this, request, reply)
//         // }

//         // console.log(`Decorador de función: ${parametro}`)
//         // console.log(`Método: ${methodName}`)

//         return descriptor;

      
//     }

// }

export {
    route
}