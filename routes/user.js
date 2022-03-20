const routes = require('express').Router()
const controller = require('../controller/controller_user.js')

routes.post('/login', controller.login)
routes.post('/register', controller.register)
routes.post('/login-seller', controller.loginSeller)
routes.post('/register-seller', controller.registerSeller)
routes.patch('/:id', controller.update)
routes.delete('/:id', controller.delete)

module.exports = routes