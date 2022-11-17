const envConfig = require('../../config')

let ProductsDao;
let CartDao;
console.log('viene para aca?');
switch(envConfig.DATASOURCE) {
    case "mongo": 
        console.log('si');
        ProductsDao = require('./products/products.daos.mongo');
        CartDao = require('./carts/carts.daos.mongo');
        break;
    case "firebase":
        ProductsDao = require('./products/products.daos.firebase');
        CartDao = require('./carts/carts.daos.firebase');
        break;
    default:
        throw new Error('invalid datasource');
}

module.exports = {
    ProductsDao,
    CartDao
}