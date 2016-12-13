const User = require('../models/User')
const mongoose = require('mongoose')
const nev = require('email-verification')(mongoose)
const TempUser = require('../models/TempUser')
const bcrypt = require('bcryptjs')

const myHasher = function (password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) =>
       insertTempUser(hash, tempUserData, callback)
    )
  })
}

nev.configure({
  verificationURL: 'http://localhost:4000/users/activate/${URL}',
  URLLength: 48,
  // mongo-stuff
  persistentUserModel: User,
  tempUserModel: TempUser,
  tempUserCollection: 'tempusers',
  emailFieldName: 'email',
  passwordFieldName: 'password',
  URLFieldName: 'GENERATED_VERIFYING_URL',
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

module.exports = nev
