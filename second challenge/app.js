const express = require('express')
const app = express()
const apiRoutes = require('./routers/app.router')


//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//ROUTES
app.use('/api', apiRoutes)


module.exports = app