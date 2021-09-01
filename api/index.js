
/** dotenv tiene que ser la primera instrucción */
require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
const loginRouter = require('./controllers/login')
/** API */

const PORT = process.env.PORT
const app = express()

/** Middlewares */
app.use(cors())
app.use(express.json())
/** sirve la app como páginas estáticas desde el puerto 3001 */
app.use(express.static('../app/build'))

/*************
 * Callbacks *
 *************/

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
/** página no encontrada */
app.use(notFound)
/** manejo de errores */
app.use(handleError)

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
module.exports = { app, server }
