const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''

  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.FIRMA)

  if (!token || !decodedToken.id) {
    return response.status(498).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
