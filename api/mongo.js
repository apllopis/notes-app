const mongoose = require('mongoose')
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env
// const connectionString = process.env.MONGO_DB_URI
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI
/** Conexion a mongodb */

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true

})
  .then(() => {
    console.log('BBDD Notes conectada')
  }).catch(err => {
    console.log(err)
  })
// process.on('uncaughtException', error => {
//  console.error(error)
//  mongoose.disconnect()
// })
