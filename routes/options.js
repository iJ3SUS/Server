import optionsController from '#src/controllers/optionsController'

const routes = (server, opts, done) => {

    server.get('/options', optionsController.index)

    done()
}

export default routes



