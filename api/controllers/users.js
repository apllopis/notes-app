const usersRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const bcrypt = require('bcrypt')
const User = require('../models/User')
/** todas los path se referencia a partir de ('/api/users', xxxxx) */
usersRouter.post('/', userExtractor, async (request, response) => {
  const { body } = request
  const { username, name, password } = body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const newUser = new User({
    username,
    name,
    passwordHash
  })
  const savedUser = await newUser.save()
  response.json(savedUser)
})
usersRouter.get('/', userExtractor, async (request, response) => {
  const users = await User.find({ }).populate('notes', {
    content: 1,
    date: 1,
    important: 1,
    _id: 0

  })
  response.json(users)
})
usersRouter.get('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id

  try {
    const user = await User.findById(id).populate('notes', {
      content: 1,
      date: 1,
      important: 1,
      _id: 0

    })
    if (user) return response.json(user)
    response.status(404).end()
  } catch (error) {
    next(error)
  }
})
module.exports = usersRouter
