import fp from 'fastify-plugin'
import { MongoClient, ObjectId } from "mongodb";
import env from '#src/plugins/env'

const uri = env.URI_MONGODB

const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 3500
})

const connect = async () => {

    try {
 
        await client.connect()

    } catch(error) {

        console.log('No database connected')
        console.log(error)

    }

}

const plugin = (server, opts, done) => {

    connect()

    server.decorateRequest('db', null)

    server.addHook('onRequest', async (request, reply) => {

        request.db = client.db(env.DATABASE_NAME)
        request.objectId = ObjectId

        return 

    })

    done()

}

const pluginDB = fp( plugin )

export {
    client,
    pluginDB
} 
