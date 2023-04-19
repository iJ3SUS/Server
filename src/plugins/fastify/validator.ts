
import fp from 'fastify-plugin'
import ajv from 'ajv'

import IServer from '@root/interfaces/server'

const plugin = (server:IServer, opts:any, done:any) => {

    const validator: any = new ajv(opts)

    server.decorate('validator', validator)

    done()
 
}

const validation = fp( plugin )

export default validation
