import { DateTime } from 'luxon'
import fp from 'fastify-plugin'

const plugin = (server, opts, done) => {

    server.addHook('onResponse', async (request, reply) => {

        const payload = {
            type: 'REQUEST',
            url: request.url,
            method: request.method,
            params: request.params,
            body: request.body,
            query: request.query,
            date: DateTime.now().setZone('America/Bogota').toISO()
        }

        try {
            await request.db.collection('reports_logs').insertOne(payload)
        } catch (error) {
            console.log(error)
        }

    })

    done()

}

const pluginLog = fp( plugin )

export default pluginLog

