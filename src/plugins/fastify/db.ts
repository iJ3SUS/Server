import { MongoClient, ObjectId } from "mongodb";
import fp from 'fastify-plugin'

const plugin = (server:any, opts:any, done:any) => {

    const client = new MongoClient(opts.uri, {
        serverSelectionTimeoutMS: 3500
    })

    const util = {
        objectId: ObjectId
    }

    const db = client.db(opts.database)

    server.decorate('db', db)

    server.decorate('util', util)

    done()
}

const pluginDB = fp( plugin )

export default pluginDB

