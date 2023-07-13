
const route = (method : string, url : string, ...middlewares : any[] ) => {

    return function(target : any, handler : string, descriptor : PropertyDescriptor) {

        const router = {
            method: method,
            url: url,
            preHandler: middlewares,
            handler: handler
        }

        if(target._routes){

            let routeIndex = target._routes.findIndex((i : any) => i.handler == handler && i.method == method)

            if(routeIndex != -1){
                target._routes[routeIndex] = router
            }else{
                target._routes.push( router )
            }

        }else{
            target._routes = [ router ]
        }

        return descriptor
      
    }

}

export {
    route
}