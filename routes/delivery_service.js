const routes = require('express').Router()
const controller = require('../controller/controller_delivery_service')

routes.get('/', controller.get_all)
routes.post('/', controller.create)
routes.patch('/:id', controller.update)
routes.delete('/:id', controller.delete)

module.exports = routes