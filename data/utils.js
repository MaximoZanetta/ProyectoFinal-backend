const fs = require('fs')

const saveToDataBase = (products) => {
    fs.writeFileSync('data/products.json',JSON.stringify(products, null, 2),{
        encoding: 'utf-8'    
    })
}


module.exports = {saveToDataBase}