//NATIVE
import fs from 'fs'

//ROUTES
import optionsRoutes from '#src/routes/options'
import clientsRoutes from '#src/routes/clients'
import authRoutes from '#src/routes/auth'

//PLUGINS
import { pluginDB } from '#src/plugins/database'
import logs from '#src/plugins/logs'
import cors from '@fastify/cors'

//CORE
import fastify from 'fastify'

if ( !fs.existsSync('logs') ){
    fs.mkdirSync('logs')
}

const server = fastify({
    logger: {
        level: 'error',
        file: 'logs/log.txt'
    }
})

server.register( cors )
server.register( logs )
server.register( pluginDB )

server.register( optionsRoutes )
server.register( clientsRoutes )
server.register( authRoutes )

server.get('/', async (request, reply) => {

    reply.send('Exegol...')

})

server.listen({ port: process.env.SERVER_PORT }, (err) => {

    console.log('Server on...')

    if (err) {
        server.log.error(err)
        process.exit(1)
    }

})
