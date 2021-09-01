const { Schema, model } = require('mongoose')
const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User' // importante para poder acceder a la relacion
  }]
})
/** Indica como tiene que transformar la función  toJson
 *  el documento recibido con mongoose
 */
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Note = model('Note', noteSchema)

module.exports = Note
