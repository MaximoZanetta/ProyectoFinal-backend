const {getFirestore} = require('firebase-admin/firestore')
const admin = require('firebase-admin');
const dbConfig = require('../../DB/dbConfig');


const connection = admin.initializeApp({
    credential: admin.credential.cert(dbConfig.firebase.credentials)
  });

class FirebaseContainer{
    constructor(collection){
        const db = getFirestore()
        this.query = db.collection(collection)
    }

    static async connect() {
        connection
        console.log('firebase connected');
    }

    async getAll(){
        const docRef = await this.query.get()
        const documents = docRef.docs
        return documents.map(document => {
            return {
                id: document.id,
                ...document.data()
            }
        })
    }

    async getOne(id){
        const docRef =  await this.query.get(id)
        const document = await docRef.get()
        return document.data()
    }

    async delete(id){
        const docRef = this.query.doc(id)
        return await docRef.delete()
    }

    async update(id, item){
        const docRef = this.query.doc(id)
        return await docRef.update(item) 
    }

    async save(item){
        const docRef = this.query.doc()
        return await docRef.set(item)
    }


}

module.exports = FirebaseContainer