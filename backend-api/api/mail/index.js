const User = require('../models/User')
const mongoose = require('mongoose')
const nev = require('email-verification')(mongoose)
const bcrypt = require('bcryptjs')

const myHasher = (password, tempUserData, insertTempUser, callback) => {
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) =>
       insertTempUser(hash, tempUserData, callback)
    )
  })
}

/* eslint no-template-curly-in-string: 0 */
nev.configure({
  verificationURL: 'http://localhost:8000/users/activate/${URL}',
  URLLength: 48,
  // mongo-stuff
  persistentUserModel: User,
  tempUserCollection: 'tempusers',
  emailFieldName: 'email',
  passwordFieldName: 'password',
  expirationTime: 86400, // 1 día
  // emailing options
  transportOptions: {
    service: 'Gmail',
    auth: {
      user: 'test696797518@gmail.com',
      pass: '696797518'
    }
  },
  verifyMailOptions: {
    from: 'Do Not Reply <test696797518@gmail.com>',
    subject: 'Please confirm account',
    html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
    text: 'Please confirm your account by clicking the following link: ${URL}'
  },
  shouldSendConfirmation: true,
  confirmMailOptions: {
    from: 'Do Not Reply <test696797518@gmail.com>',
    subject: 'Successfully verified!',
    html: '<p>Your account has been successfully verified.</p>',
    text: 'Your account has been successfully verified.'
  },
  hashingFunction: myHasher
}, (err, options) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(`configured: ${typeof options === 'object'}`)
})

nev.generateTempUserModel(User, (err, tempUserModel) => {
  if (err) {
    console.log(err)
    return
  }
  /* eslint prefer-template:0 */
  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'))
})

module.exports = nev
