import { pluginDB } from '#src/plugins/database'
import optionsRoutes from '#src/routes/options'
import clientsRoutes from '#src/routes/clients'
import cors from '@fastify/cors'
import fastify from 'fastify'

const server = fastify({
    //http2: true,
    //logger: true
})

server.register( cors )

server.register( pluginDB )

server.register( optionsRoutes )
server.register( clientsRoutes )

server.get('/', async (request, reply) => {

    reply.send({
        name: 'Hello Word'
    })

})

server.listen({ port: process.env.SERVER_PORT }, (err) => {

    console.log('Server on...')

    if (err) {
        server.log.error(err)
        process.exit(1)
    }

})
