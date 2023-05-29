
const route = (method : string, url : string ) => {

    return function(target : any, handler : any, descriptor : PropertyDescriptor) {

        if(target._routes){

            let route = target._routes.findIndex((i : any) => i.handler == handler && i.method == method)

            if(route != -1){
                target._routes[route] = {
                    method: method,
                    url: url,
                    handler: handler
                }
            }else{
                target._routes.push({
                    method: method,
                    url: url,
                    handler: handler
                })
            }

        }else{
            target._routes = [
                {
                    method: method,
                    url: url,
                    handler: handler
                }
            ]
        }

        return descriptor
      
    }

}

export {
    route
}