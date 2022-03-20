const routes = require('express').Router()
const controller = require('../controller/controller_transaction')

routes.get('/', controller.getAllTransaction)
routes.get('/my-transaction', controller.getMyTransaction)
routes.post('/', controller.createTransaction)

module.exports = routes