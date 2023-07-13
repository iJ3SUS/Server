import 'module-alias/register'
import "reflect-metadata"

import "@root/core/types/global"

//SERVER
import server from '@root/core/plugins/server'

//PLUGINS
import db from '@root/core/plugins/fastify/db'
import ioc from '@root/core/plugins/fastify/ioc'
import module from '@root/core/plugins/fastify/module'
import validator from '@root/core/plugins/fastify/validator'

//MODULES
import test from '@root/modules/test/test'

server.addHook('onRequest', (request:any, reply:any, done:any) => {
    const startTime = performance.now();
    request.startTime = startTime;
    done();
});
  
server.addHook('onSend', (request:any, reply:any, response:any, done:any) => {
    const endTime = performance.now();
    const cpuTime = endTime - request.startTime;
    console.log(`La solicitud ${request.id} tomó ${cpuTime} milisegundos de tiempo de CPU.`);
    done();
});

// server.decorateRequest('all', null)

// server.addHook('preHandler', (request : Request, reply: Reply, done : any) => {
//     request.all = request.method == 'GET' ? request.query : request.body
//     done()
// })

server.register(ioc)

server.register(db, {
    uri: "mongodb://J3SUS:JANovember10@127.0.0.1:27017",
    database: "xPrueba"
})

server.register(validator)

server.register(module, {
    controller: test,
    prefix: 'test'
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