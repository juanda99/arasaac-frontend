const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../../config')

function createToken(user) {
  return jwt.sign({ user: user.name, profile: user.profile }, config.jwtSecret, { expiresInMinutes: 60 * 5 })
}

module.exports = {
  createSession(req, res) {
    const user = req.swagger.params.username.value
    console.log(`user es :${user}`)
    const password = req.swagger.params.password.value
    User.findOne({ username: user }, (err, user) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }
      console.log(user)
      if (!user.authenticate(password)) {
        return res.status(401).send({ message: 'User unauthorized' })
      }
      res.status(201).send({ token: createToken(user) })
    })
  }
}
