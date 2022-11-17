const CartsMongoDaos = require('../models/daos/carts/carts.daos.mongo')
const { errorResponse, successResponse } = require('../utils/api.utils')
const cartDaos = new CartsMongoDaos()

class CartController {
    async getCarts(req, res, next) {
        try {
            const carts = await cartDaos.getAll()
            if(!carts){
                return errorResponse()
            }
            return successResponse(carts)
        } catch (error) {
            next(error)
        }
    }

    async getOneCart(req, res, next) {
        const { id } = req.params
        try {
            const oneCart = await cartDaos.getById(id)
            if(!oneCart){
                return errorResponse()
            }
            return successResponse(oneCart)
        } catch (error) {
            next(error)
        }
    }

    async saveCart(req, res, next) {
        try {
            const newCart = cartDaos.save(req.body)
            return successResponse(newCart)
        } catch (error) {
            next(error)
        }
    }

    async deleteCart(req, res, next) {
        const { id } = req.params
        try {
            const deleted = await cartDaos.delete(id)
            if(!deleted){
                return errorResponse()
            }
            return successResponse(deleted)
        } catch (error) {
            next(error)
        }
    }

    async updateCart(req, res, next) {
        const { id } = req.params
        try {
            const updatedCart = cartDaos.update(id, req.body)
            if(!updatedCart){
                return errorResponse()
            }
            return successResponse(updatedCart)
        } catch (error) {
            next(error)
        }
    }

    async addProductToCart(req, res, next) {
        const { idCart, idProd } = req.params
        try {
            const productAdded = await cartDaos.addProductToCart(idCart, idProd)
            if(!productAdded) {
                return errorResponse()
            }
            return successResponse(productAdded)
        } catch (error) {
            next(error)
        }
    }

    async removeProductFromCart(req, res, next) {
        const { idCart, idProd } = req.params
        try {
            const removedProduct = await cartDaos.removeProductToCart(idCart, idProd)
            if(!removedProduct) {
                return errorResponse()
            }
            return successResponse(removedProduct)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CartController()