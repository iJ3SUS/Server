import authController from '#src/controllers/authController'

const routes = (server, opts, done) => {

    server.post('/login', authController.login)

    server.post('/sync-logs', authController.logs)

    done()
}

export default routes



