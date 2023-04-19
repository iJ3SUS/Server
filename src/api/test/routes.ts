import Controller from '@root/api/test/controller'

import { schemaStore } from '@root/api/test/schemas/test'

const routes = async (server:any, opts:any, done:any) => {

    const controller = new Controller(server)

    server.route({
        method: 'POST',
        url: '/',
        handler: controller.browse.bind(controller),
        config: {
            schema: schemaStore,
            permissions: [
                'module:create'
            ]
        }
    })

    done()

}

export default routes
