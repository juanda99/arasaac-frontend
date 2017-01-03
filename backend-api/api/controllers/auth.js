const User = require('../models/User')
const service = require('../services')
const nev = require('../mail')

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
    return res.status(201).send({ token: service.createToken(user) })
  })
}

const signUp = (req, res) => {
  const user = new User(req.swagger.params.user.value)
  /* eslint consistent-return: 0 */
  nev.createTempUser(user, (err, existingPersistentUser, newTempUser) => {
    if (err) {
      return res.status(400).json(err)
    }
    // user already exists in persistent collection
    if (existingPersistentUser) {
      return res.json({
        msg: 'You have already signed up and confirmed your account. Did you forget your password?'
      })
    }
    // new user created
    if (newTempUser) {
      const URL = newTempUser[nev.options.URLFieldName]
      nev.sendVerificationEmail(newTempUser.email, URL, (error /* , info*/) => {
        // console.log(info)
        if (error) {
          return res.status(500).json({ msg: 'ERROR: sending verification email FAILED' })
        }
        return res.status(200).json({ message: 'An email has been sent to you. Please check it to verify your account.' })
      })

    // user already exists in temporary collection!
    } else {
      return res.status(409).json({
        message: 'You have already signed up. Please check your email to verify your account.' })
    }
  })
}

const sendVerificationEmail = (req, res) => {
  const user = new User(req.swagger.params.user.value)
  nev.resendVerificationEmail(user.email, (err, userFound) => {
    if (err) {
      return res.status(404).send('ERROR: resending verification email FAILED')
    }
    if (userFound) {
      res.json({
        msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
      })
    } else {
      res.json({
        msg: 'Your verification code has expired. Please sign up again.'
      })
    }
  })
}

const emailVerification = (req, res) => {
  const url = req.params.URL
  nev.confirmTempUser(url, (err1, user) => {
    if (user) {
      nev.sendConfirmationEmail(user.email, (err2, info) => {
        if (err2) {
          return res.status(404).send('ERROR: sending confirmation email FAILED')
        }
        res.json({
          msg: 'CONFIRMED!',
          info
        })
      })
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED')
    }
  })
}


module.exports = {
  signIn,
  signUp,
  sendVerificationEmail,
  emailVerification
}
