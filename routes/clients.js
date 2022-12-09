import clientsController from '#src/controllers/clientsController'

const routes = (server, opts, done) => {

    server.post('/clients', clientsController.create)

    done()
    
}

export default routes



