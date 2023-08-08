
import Fastify from 'fastify'

const server : any = Fastify({ 
    logger: {
        // level: 'info',
        //file: './src/logs/log.txt' // Will use pino.destination()
    }
})

export default server