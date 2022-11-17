const { Schema }= require('mongoose');
const MongoContainer = require('../../containers/mongo.container');

const collection = 'carts'

const cartsSchema = new Schema({
    id: {type: Schema.Types.ObjectId},
    timestamp:{type: Date, default: Date.now},
    products: [{type: String}]
})

class CartsMongoDaos extends MongoContainer{
    constructor(){
        super(collection, cartsSchema)
    }

    async addProductToCart(idCart, idProd) {
        try {
            const updatedCart = await this.model.findByIdAndUpdate(idCart, {
                $push: {
                    products: [idProd]
                }
            })
            return updatedCart
        } catch (error) {
            console.log(error.message);
        }
    }

    async removeProductToCart(idCart, idProd){
        try {
            const updatedCart = await this.model.findByIdAndUpdate(idCart, {
                $pull: {
                    products: [idProd]
                }
            })
            return updatedCart
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CartsMongoDaos