const FirebaseContainer = require("../../containers/firebase.container");
const { FieldValue } = require('firebase-admin/firestore')

const collection = 'carts'
class CartFirebaseDaos extends FirebaseContainer{
    constructor(){
        super(collection)
    }

    async save() {
        const docRef = this.query.doc()
        const products = []
        return await docRef.set({
            products,
            timestamp: FieldValue.serverTimestamp()
        })
    }
    
    async addProductToCart(idCart, idProd) {
        const docRef = this.query.doc(idCart)
        return await docRef.update({ products: FieldValue.arrayUnion(idProd)})
    }

    async removeProductFromCart(idCart, idProd) {
        const docRef = this.query.doc(idCart)
        return await docRef.update({ products: FieldValue.arrayRemove(idProd)})
    }
}

module.exports = CartFirebaseDaos