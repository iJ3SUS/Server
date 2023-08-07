import 'module-alias/register'
import "reflect-metadata"
import path from 'path'

import "@root/core/types/global"

import cors from '@fastify/cors'

import modules from '@root/core/utils/misc/recursive-modules'

import server from '@root/core/plugins/server'

import db from '@root/core/plugins/fastify/db'
import ioc from '@root/core/plugins/fastify/ioc'
import module from '@root/core/plugins/fastify/module'
import validator from '@root/core/plugins/fastify/validator'
import performance from '@root/core/plugins/fastify/performance'

server.register(cors, { 
    // put your options here
})

server.register(performance)

server.register(ioc)

server.register(db, {
    uri: "mongodb://J3SUS:JANovember10@127.0.0.1:27017",
    database: "xPrueba2"
})

server.register(validator)

const start = async () => {
    try {

        const controllers = await modules( path.join(__dirname, 'modules') )

        controllers.forEach(( i : any ) => {

            server.register(module, {
                controller: i.default,
                prefix: i.prefix
            })

        })

        await server.listen({ port: 3000 })

        console.log("SERVER ON!!!")

    } catch (err) {

        console.log(err)

        process.exit(0)

    }
}

start()