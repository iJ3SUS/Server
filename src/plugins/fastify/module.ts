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

const plugin = (server : any, opts : any, done : any) => {

    const dependencies = register( opts.controller )

    dependencies.forEach((dependency : any) => {
        server.container.bind(dependency).to(dependency)
    })
   
    const controller = server.container.resolve(opts.controller)

    if(controller._routes){

        controller._routes.forEach((route : any) => {

            server.route({
                method: route.method,
                url: '/' + route.url,
                handler: controller[route.handler].bind(controller)
            })
            
        })
    }

    done()
}

const pluginDB = fp( plugin )

export default pluginDB

