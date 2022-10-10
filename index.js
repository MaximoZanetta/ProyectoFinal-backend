const express = require('express')
const app = express()
const path = require('path')
const productsRoutes = require('./routes/productsRoutes')
const cartRoutes = require('./routes/cartRoutes')

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))


app.use('/api/products', productsRoutes)
app.use('/api/cart', cartRoutes)



app.listen(PORT, ()=>{
    console.log('server is up and running');
})