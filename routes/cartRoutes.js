const express = require('express')
const router = express.Router()

const Container = require('../controllers/cartController')
const cartController = new Container('data/cart.json')

router
    .get('/', async (req,res)=> {
        const arrayCarts = await cartController.allCarts()
        res.send({data: arrayCarts})
    })
    .post('/', async (req,res)=> {
        const newCartId = await cartController.createCart()
        res.send({data: `${newCartId}`})
    })
    .get('/:id/products', async (req,res)=> {
        const id = req.params.id
        const productsInTheCart = await cartController.getProducts(id)
        if(!productsInTheCart) return res.send({result: `Cant find the id of the cart`})
        res.send({data: productsInTheCart})
    })
    .delete('/:id', async (req,res)=>{
        const id = req.params.id;
        const deletedCart = await cartController.deleteCart(id)
        if(deletedCart === -1) return res.send({result: `Cant find the cart`})
        res.send({data: `Deleting cart by id ${id}`})
    })
    .delete('/:id/products/:idProd',async (req,res)=>{
        const idCart = req.params.id
        const idProd = req.params.idProd
        const productDeleted = await cartController.deleteProduct(idCart, idProd)
        if(productDeleted === undefined) return res.send({result: 'Cant find the cart'})
        if(productDeleted === -1) return res.send({result: 'Cant find the product'})
        res.send({data: `Deleting product by id ${idProd} and id of the cart ${idCart}`})
    })
    // .post('/:idCart/products', async (req,res)=>{
    //     const idCart = req.params.idCart
    //     const idProd = req.params.idProd
    //     const cart = await cartController.addProductToCart(idCart, idProd)

    //     res.send('FOR PUT PRODUCTS IN THE CART BY THE ID OF THE PRODCUT')
    // })
    .post('/:idCart/products/:idProd', async (req,res)=>{
        const idCart = req.params.idCart
        const idProd = req.params.idProd
        const cart = await cartController.addProductToCart(idCart, idProd)
        if(cart === undefined) return res.send({result: 'Cart id or product id not defined'})
        
        res.send({data: cart})
    })

module.exports = router