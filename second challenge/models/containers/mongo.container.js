const mongoose = require('mongoose')
const dbConfig = require('../../DB/dbConfig')



class MongoContainer {
    constructor(collection, schema){
        this.model = mongoose.model(collection,schema)
    }

    static async connect() {
        await mongoose.connect(dbConfig.mongo.uri)
    }

    static async disconnect() {
        await mongoose.disconnect()
    }

    async getAll(filter= {}) {
        return await this.model.find(filter, {__v: 0}).lean()
    }

    async getById(id) {
        return await this.model.findOne({_id: id})
    }

    async save(item) {
        const newItem = new this.model(item)
        return await newItem.save()
    }

    async update(id, changes){
        const newItem = await this.model.updateOne({_id: id},{
            ...changes
        })
        return newItem
    }

    async delete(id) {
        const deleted = await this.model.deleteOne({_id: id})
        return deleted
    }
}

module.exports = MongoContainer