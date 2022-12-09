import fp from 'fastify-plugin'
import { MongoClient } from "mongodb";
import env from '#src/plugins/env'

const uri = `mongodb://${env.DATABASE_USER}:${env.DATABASE_PASS}@${env.DATABASE_HOST}:${env.DATABASE_PORT}`;

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 3500
})

const connect = async () => {

    try {
 
        await client.connect()

    } catch(error) {

        console.log('No database connected')

    }

}

const plugin = (server, opts, done) => {

    connect()

    server.decorateRequest('db', null)

    server.addHook('onRequest', async (request, reply) => {

        return request.db = client.db(env.DATABASE_NAME)

    })

    done()

}

const pluginDB = fp( plugin )

export {
    client,
    pluginDB
} 
