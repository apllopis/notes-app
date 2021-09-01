const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/User')
loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: 'usuario o password inválido' })
  } else {
    const userForToken = {
      id: user._id,
      username: user.username
    }
    const token = jwt.sign(userForToken, process.env.FIRMA, { expiresIn: 60 * 60 * 3 })

    response.send({
      name: user.name,
      username: user.username,
      token
    })
  }
})
module.exports = loginRouter
