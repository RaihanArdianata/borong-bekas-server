const routes = require('express').Router()
const user = require('./user.js')
const product = require('./product.js')
const transaction = require('./transaction')
const delivery_service = require('./delivery_service')
const payment_method = require('./payment_method')
// const customer = require('./customer.js')
const {autentication} = require('../middleware/autentication.js')

routes.use('/user', user)
// routes.use('/customer', customer)
routes.use(autentication)
routes.use('/product', product)
routes.use('/transaction', transaction)
routes.use('/delivery-service', delivery_service)
routes.use('/payment-methods', payment_method)

module.exports = routes