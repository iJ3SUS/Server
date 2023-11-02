import fp from 'fastify-plugin'

const register = ( controller : any ) => {

    const dependencies = Reflect.getMetadata('design:paramtypes', controller)

    if(!dependencies) return []

    let result : any = []

    dependencies.forEach(( dependency : any ) => {

        result.push(dependency)

        result = [
            ...register( dependency ),
            ...result
        ]

    })

    return result
}

const plugin = (server : Server, opts : any, done : any) => {
    
    const dependencies = register( opts.controller )

    dependencies.forEach((dependency : any) => {
        server.container.bind(dependency).to(dependency)
    })
   
    const controller = server.container.resolve(opts.controller)

    if(controller._routes){

        controller._routes.forEach((route : any) => {

            // route.url =  route.url.startsWith("/") ? route.url : '/' + route.url
            
            let prefix = opts.prefix + route.url

            // prefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix

            // prefix =  prefix.startsWith("//") ? prefix.slice(1) : prefix

            const regex = /^\/+|\/+$/g;


            prefix = prefix.replace(regex, '')
            prefix = `/${prefix}`

            console.log("RUTA REGISTRADA: " + prefix)

            server.route({
                method: route.method,
                url: prefix,
                preHandler: route.preHandler,
                handler: controller[route.handler].bind(controller)
            })
            
        })
    }

    done()
    
}

const pluginDB = fp(plugin)

export default pluginDB

