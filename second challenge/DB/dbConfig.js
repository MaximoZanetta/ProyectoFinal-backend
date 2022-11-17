
const envConfig = require('../config')

module.exports = {
    mongo: {
        uri: `mongodb+srv://${envConfig.DB_NAME}:${envConfig.DB_PASSWORD}@coderhouse.dgibzrf.mongodb.net/?retryWrites=true&w=majority`
    },
    firebase: {
        credentials: `${envConfig.FIREBASE_CREDENTIALS}`
    }
}