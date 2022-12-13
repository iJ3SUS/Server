import clientsController from '#src/controllers/clientsController'

const routes = (server, opts, done) => {

    server.get('/clients', clientsController.browse)

    server.get('/clients/:id', clientsController.show)

    server.post('/clients', clientsController.create)

    server.put('/clients/:id', clientsController.update)

    done()

}

export default routes



