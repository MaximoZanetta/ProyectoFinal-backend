const { promises: fs } = require('fs')
const { saveToDataBase } = require('../data/saveToCart')
const Container = require('../controllers/productsController')
const productsController = new Container("data/products.json")

class CartContainer {
    constructor(path){
        this.path = path
    }

    //RETURN THE ARRAY OF CARTS
    async allCarts() {
        const ArrayCarts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(ArrayCarts)
    }

    //CREATE A CART AND RETURN THE ID
    async createCart() {
        const ArrayCart = await this.allCarts()
        const newCart = {
            id: ArrayCart.length + 1,
            timestamp: Date.now(),
            products: []
        }
        //ADD TO DATA BASE
        ArrayCart.push(newCart)
        saveToDataBase(ArrayCart)
        return newCart.id
    }

    //PUT THE ID OF THE CART AND SHOW ALL THE PRODUCTS IN THERE
    async getProducts(id) {
        const ArrayCart = await this.allCarts()
        const findCart = ArrayCart.find(cart => cart.id === +id)
        if(!findCart) return findCart
        return findCart.products
    }


    //GET THE ARRAY OF CARTS AND DELETE ONE BY ID
    async deleteCart(id) {
        const ArrayCart = await this.allCarts()
        const findIndex = ArrayCart.findIndex(cart => cart.id === +id)
        if(findIndex === -1) return findIndex
        ArrayCart.splice(findIndex, 1)
        saveToDataBase(ArrayCart)
        return findIndex
    }


    //DELETE PRODUCT OF THE CART: FIRST GET THE ARRAYOFCARTS, THEN FIND THE CART BY IDCART, FIND THE PRODUCT IN THAT CART AND DELETE IT
    async deleteProduct(idCart, idProd) {
        const ArrayCart = await this.allCarts()
        const findCart = ArrayCart.find(cart => cart.id === +idCart)
        if(findCart === undefined) return findCart
        const findProd = findCart.products.findIndex(prod => prod.id === +idProd)
        console.log(findProd);
        if(findProd === -1) return findProd
        findCart.products.splice(findProd,1)
        saveToDataBase(ArrayCart)
        return findProd
    }

    //ADD PRODUCT TO CART, WE HAVE TO FIND THE CART BY ID AND THEN PUT THE PRODUCT IN THE CART
    async addProductToCart(idCart, idProd) {
        const ArrayCart = await this.allCarts()
        const findCart = ArrayCart.find(cart => cart.id === +idCart)
        if(findCart === undefined) return findCart
        const productToAdd = await productsController.getOne(idProd)
        if(productToAdd === undefined) return productToAdd
        findCart.products.push(productToAdd)
        saveToDataBase(ArrayCart)
        console.log('nuevo array', ArrayCart);
        return findCart
    }
}

module.exports = CartContainer