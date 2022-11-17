const express = require('express')
const router = express.Router()
const cartRoutes = require('./carts/carts.routes')
const productRoutes = require('./products/products.routes')



router.use('/products/', productRoutes)
router.use('/carts/', cartRoutes)

module.exports = router