const dotenv = require('dotenv')
dotenv.config()

const DB_PASSWORD =process.env.DB_PASSWORD
const DATASOURCE = process.env.DATASOURCE
const DB_NAME = process.env.DB_NAME
const FIREBASE_CREDENTIALS = process.env.FIREBASE_CREDENTIALS



module.exports = {
    DB_PASSWORD,
    DATASOURCE,
    DB_NAME,
    FIREBASE_CREDENTIALS
}