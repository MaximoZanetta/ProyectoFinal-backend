const FirebaseContainer = require("../../containers/firebase.container");

const collection = 'products'
class ProductsFirebaseDaos extends FirebaseContainer{
    constructor(){
        super(collection)
    }
}

module.exports = ProductsFirebaseDaos