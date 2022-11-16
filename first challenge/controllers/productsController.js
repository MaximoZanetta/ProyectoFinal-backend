// const fs = require('fs')
const {promises: fs} = require('fs')
const {saveToDataBase} = require('../data/utils')

class ProductConatainer {
    constructor(path) {
        this.path = path
    }

    //GET ALL THE PRODUCTS
    async getAll() {     
       const products = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(products)
        

    }


    //GET ONE PRODUCT BY ID
    async getOne(id) {
        const products = await this.getAll()
        const getById = products.find(product => product.id === +id)
        return getById
    }


    //DELETE ONDE PRODUCT BY ID
    async deleteOne(id) {
        const products = await this.getAll()
        const findIndex = products.findIndex(product => product.id === +id)
        if(findIndex === -1){
            return findIndex
        }
        products.splice(findIndex, 1)
        saveToDataBase(products)

        return products
    }


    //UPDATE ONE PRODUCT BY ID
    async updateOne(id, changes) {
        const products = await this.getAll()
        const findIndex = products.findIndex(product => product.id === +id)
        // console.log(findProduct);
        const newProduct = {
            ...products[findIndex],
            ...changes
        }
        
        products[findIndex] = newProduct
        saveToDataBase(products)
        return newProduct
        // console.log(newProduct);
    }


    //CREATE ONE PRODUCT
    async createOne(name,description,price,url,stock) {
        const products = await this.getAll()
        const newProduct = {
            id: products.length + 1,
            timestamp: Date.now(),
            name,
            description,
            url,
            price,
            stock
        }
        products.push(newProduct)
        saveToDataBase(products)
        return newProduct
    }
}

module.exports = ProductConatainer