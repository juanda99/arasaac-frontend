const User = require('../models/User')
const service = require('../services')

const signIn = (req, res) => {
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

const signUp = (req, res) => {
  const User = new User({
    username: req.swagger.params.username.value,
    password: req.swagger.params.password.value
  })

  User.save((err) => {
    if (err) res.sendStatus(500).json({error: `Error creating new user: ${err}`}) 
    return res.status(201).json({token: service.createToken(User)})

  })


}


module.exports = {
  signIn,

  signUp
}
