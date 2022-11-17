const MongoContainer = require("../../containers/mongo.container");
const { Schema }= require('mongoose')

const collection = 'products'

const productsSchema = new Schema({
    id: { type: Schema.Types.ObjectId},
    timestamp: {type: Date, default: Date.now},
    title: {type: String},
    description: {type: String},
    img: {type: String},
    price: {type: Number},
    stock: {type: Number}
})

class ProductsMongoDaos extends MongoContainer{
    constructor(){
        super(collection, productsSchema)
    }
}

module.exports = ProductsMongoDaos