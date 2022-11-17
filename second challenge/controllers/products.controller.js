//import daosProduct

const { ProductsDao } = require('../models/daos/app.daos')
const { errorResponse, successResponse } = require('../utils/api.utils')
let productsDaos = new ProductsDao()




class ProductController{

    async getAll(req, res, next) {
        try {
            const products = await productsDaos.getAll()
            if(!products){
                const errorMsg = errorResponse()
                return res.json(errorMsg)
            }
            return successResponse(products)
            
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const oneProduct = await productsDaos.getById(id)
            if(!oneProduct){
                return errorResponse()
            }
            return successResponse(oneProduct)
        } catch (error) {
            next(error)
        }
    }

    async deleteOne(req, res, next) {
        const { id } = req.params
        try {
            const deleted = await productsDaos.delete(id)
            if(!deleted){
                return errorResponse()
            }
            return successResponse(deleted)
            
        } catch (error) {
            next(error)
        }
    }

    async updateOne(req, res, next) {
        const { id } = req.params
        try {
            const newProduct = await productsDaos.update(id, req.body)
            if(!newProduct){
                return errorResponse()
            }
            return successResponse(newProduct)
        } catch (error) {
            next(error)
        }
    }

    async save(req, res, next) {
        try {
            const newProduct = await this.save(req.body)
            return successResponse(newProduct)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController()