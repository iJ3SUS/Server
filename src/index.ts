import 'module-alias/register'

//SERVER
import server from '@root/plugins/server'

//PLUGINS
import validator from '@root/plugins/fastify/validator'
import db from '@root/plugins/fastify/db'

//ROUTES
import testRoutes from '@root/api/test/routes'

server.register(db, {
    uri: "mongodb://J3SUS:12345678@127.0.0.1:27017",
    database: "xPrueba"
})

server.register(validator, { 
    removeAdditional: 'all',
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
})

server.register(testRoutes, {
    prefix: 'test'
})

server.get('/', async (request:any, reply:any) => {
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