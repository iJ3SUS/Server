import Fastify, { FastifyInstance as ServerInstance } from 'fastify'

const server : ServerInstance = Fastify({})

server.get('/', async (request, reply) => {
    return { pong: 'it worked!' }
})

const start = async () => {

    try {
        
        await server.listen({ port: 3000 })

        console.log('SERVER ON!!')

    } catch (err) {

        server.log.error(err)
        process.exit(1)

    }
}

start()