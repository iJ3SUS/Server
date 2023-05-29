
import fp from 'fastify-plugin'
import ajv from 'ajv'

const plugin = (server:any, opts:any, done:any) => {

    const validator: any = new ajv(opts)

    server.decorate('validator', validator)

    done()
 
}

const validation = fp( plugin )

export default validation
