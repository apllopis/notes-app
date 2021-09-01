/* eslint-disable no-unused-vars */
const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/Note')
const User = require('../models/User')

notesRouter.get('/', userExtractor, async (request, response) => {
  const notes = await Note.find({ }).populate('user', {
    username: 1,
    _id: 0
  })
  response.json(notes)
})

notesRouter.get('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id

  try {
    const note = await Note.findById(id).populate('user', {
      username: 1,
      _id: 0
    })
    if (note) return response.json(note)
    response.status(404).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id
  const { userId } = request
  try {
    const note = await Note.findByIdAndDelete(id)
    if (note) return response.json(note).status(204).end()
    response.status(404).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id

  const note = request.body
  const { userId } = request
  const noteEdit = {

    content: note.content,
    date: new Date(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  try {
    const result = await Note.findByIdAndUpdate(id, noteEdit, { new: true })
    response.json(result).status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body
  if (!content) {
    return response
      .status(400)
      .json({
        error: 'El campo content no puede estar vacío'
      })
      .end()
  }
  const { userId } = request
  /*
  const authorization = request.get('authorization')

  let token = null
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.substring(7)
  }
  let decodedToken = { }
  try {
    decodedToken = jwt.verify(token, process.env.FIRMA)
  } catch (error) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const { id: userId } = decodedToken
  */
  const user = await User.findById(userId)
  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user._id
  })
  try {
    const savedNewNote = await newNote.save()
    user.notes = user.notes.concat(savedNewNote._id)
    await user.save()
    response.json(savedNewNote).status(201)
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
