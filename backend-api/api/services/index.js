const jwt = require('jsonwebtoken')
const config = require('../../config')

const createToken = (user) => (
  jwt.sign({ user: user.name, profile: user.profile }, config.jwtSecret, { expiresInMinutes: 60 * 5 })
)

module.exports = createToken
