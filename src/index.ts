import 'module-alias/register'
import "reflect-metadata"

//SERVER
import server from '@root/plugins/server'

//PLUGINS
import validator from '@root/plugins/fastify/validator'
import db from '@root/plugins/fastify/db'
import ioc from '@root/plugins/fastify/ioc'
import module from '@root/plugins/fastify/module'

//MODULES
import prueba from '@root/modules/prueba'

server.register(db, {
    uri: "mongodb://J3SUS:12345678@127.0.0.1:27017",
    database: "xPrueba"
})

server.register(ioc)

server.register(module, {
    controller: prueba
})

// server.register(validator, { 
//     removeAdditional: 'all',
//     useDefaults: true,
//     coerceTypes: true,
//     allErrors: true
// })

// server.register(testRoutes, {
//     prefix: 'test'
// })

server.get('/', async (request : any, reply : any) => {
    return { pong: 'pong pong' }
})

const start = async () => {
    try {
        
        await server.listen({ port: 3000 })

        console.log("SERVER ON!!!")

    } catch (err) {
        server.log.error(err)
    }
}

start()