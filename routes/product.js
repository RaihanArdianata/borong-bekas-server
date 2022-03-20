const routes = require('express').Router()
const controller = require('../controller/controller_product')
const upload = require('../helper/multer')
const sharp = require('../helper/sharp')

routes.get('/', controller.get_all)
routes.get('/my-product', controller.get_by_user)
routes.post('/', upload.single('product_image'), sharp, controller.create)
routes.patch('/:id', upload.single('product_image'), sharp, controller.update)
routes.delete('/:id', controller.delete)

module.exports = routes