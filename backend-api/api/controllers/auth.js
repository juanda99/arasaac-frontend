const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../../config')

function createToken(user) {
  return jwt.sign({ user: user.name, profile: user.profile }, config.jwtSecret, { expiresInMinutes: 60 * 5 })
}

const authUserByPassword = (req, res) => {
  // return res.status(200).json({ prueba: 'A ver si funciona' })
  const username = req.swagger.params.username.value
  console.log(`user es :${username}`)
  const password = req.swagger.params.password.value
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }
    if (!user.authenticate(password)) {
      return res.status(401).send({ message: 'User unauthorized' })
    }
    return res.status(201).send({ token: createToken(user) })
  })
}


module.exports = {
  authUserByPassword
}
