const express = require('express')
const router = express.Router()
const productsControllers = require('../../controllers/products.controller')

router.get('/', productsControllers.getAll)
router.get('/:id', productsControllers.getOne)
router.delete('/:id', productsControllers.deleteOne)
router.post('/', productsControllers.save)
router.put('/:id', productsControllers.updateOne)


module.exports = router