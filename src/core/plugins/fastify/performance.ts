import fp from 'fastify-plugin'

const plugin = (server : Server, opts : any, done : any) => {

    server.addHook('onRequest', (request:any, reply:any, done:any) => {
        const startTime = performance.now()
        request.startTime = startTime
        done()
    })
      
    server.addHook('onSend', (request:any, reply:any, response:any, done:any) => {
        const endTime = performance.now()
        const cpuTime = endTime - request.startTime
        console.log(`La solicitud ${request.id} tomó ${cpuTime} milisegundos de tiempo de CPU.`)
        done()
    })

    done()
}

const pluginDB = fp( plugin )

export default pluginDB

