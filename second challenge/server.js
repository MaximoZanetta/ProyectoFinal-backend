const app = require('./app')
const PORT = process.env.PORT || 8080
const envConfig = require('./config')


const DATASOURCE_BY_ENV ={
    mongo: require('./models/containers/mongo.container'),
    firebase: require('./models/containers/firebase.container')
}
const datasource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]
console.log(datasource);

app.listen(PORT,()=> {
    datasource.connect()
    console.log(`Server is running on port ${PORT}`);
    console.log(`connected to ${envConfig.DATASOURCE}`);
})