const express = require('express')
const router = express.Router()
const cartController = require('../../controllers/cart.controller')

router
    .get('/', cartController.getCarts)
    .post('/', cartController.saveCart)
    .get('/:id/products', cartController.getOneCart)
    .delete('/:id', cartController.deleteCart)
    .delete('/:id/products/:idProd', cartController.removeProductFromCart)
    .post('/:id/products/:idProd', cartController.addProductToCart)

module.exports = router