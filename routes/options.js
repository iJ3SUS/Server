import optionsController from '#src/controllers/optionsController'

const routes = (server, opts, done) => {

    server.get('/options', optionsController.index)

    server.post('/options', optionsController.create)

    done()
}

export default routes



