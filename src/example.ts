import path from 'path'

import server from './index'

import modules from './core/utils/misc/recursive-modules'

import module from './core/plugins/fastify/module'

import ioc from './core/plugins/fastify/ioc'

server.register(ioc)

const start = async () => {

    const controllers = await modules( path.join(__dirname, 'modules') )

    controllers.forEach(( i : any ) => {

        server.register(module, {
            controller: i.default,
            prefix: i.prefix
        })

    })

    await server.listen({ port: 3000 })

}

start()