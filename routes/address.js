const routes = require('express').Router()
const controller = require('../controller/controller_address')

routes.get('/', controller.get_all)
routes.get('/my-address', controller.get_by_user)
routes.post('/', controller.create)
routes.patch('/:id', controller.update)
routes.delete('/:id', controller.delete)

module.exports = routes