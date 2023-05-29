import { Container, injectable, MetadataReader, inject   } from 'inversify'

import fp from 'fastify-plugin'

const plugin = (server : any, opts : any, done : any) => {

    const container = new Container()

    server.decorate('container', container)

    done()
}

const pluginDB = fp( plugin )

export default pluginDB
