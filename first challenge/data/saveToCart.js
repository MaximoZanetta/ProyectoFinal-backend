const fs = require('fs')

const saveToDataBase = (cart) => {
    fs.writeFileSync('data/cart.json',JSON.stringify(cart, null, 2),{
        encoding: 'utf-8'    
    })
}

module.exports = {saveToDataBase}