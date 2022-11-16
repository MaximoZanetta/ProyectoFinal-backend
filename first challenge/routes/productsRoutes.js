const express = require('express')
const router = express.Router()

const Container = require('../controllers/productsController')
const productsController = new Container("data/products.json")


router
    .get('/', async (req,res)=>{
        const products = await productsController.getAll()
        if(!products) return res.send({result: 'Cant find the products'})
        res.send({data: products})
    })
    .get('/:id', async (req,res)=>{
        const id = req.params.id
        const product = await productsController.getOne(id)
        if(!product) return res.send({result: `Cant find the product with the id ${id}`})
        res.send({data: product})
    })
    .delete('/:id', async (req,res)=> {
        const id = req.params.id
        const productDeleted = await productsController.deleteOne(id)

        if(productDeleted === -1){
            return res.send({result: `Product with the id ${id} not found`})
        }
        res.send({result: `Product with id ${id} was deleted`,data: productDeleted})
    })
    .put('/:id',async (req,res)=>{
        const id = req.params.id
        const body = req.body
        console.log("que mierda dice el back",body);
        
        const productChanged = await productsController.updateOne(id,body)
        if(!productChanged) return res.send({result: `Cant find the product with the id ${id}`})
        res.send({data: productChanged})
    })
    .post('/',async (req,res)=>{
        const {name,description, url, price, stock} = req.body
        if(!name || !description || !url || !price || !stock) return res.send({result: 'Missing data...'})
        const newProduct = await productsController.createOne(name,description, url, price, stock)
        res.send({data: newProduct})
    })

module.exports = router