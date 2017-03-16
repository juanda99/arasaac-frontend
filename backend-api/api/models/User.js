const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
]

const userSchema = new Schema({
  name: { type: String, default: '' },
  surname: { type: String },
  email: { type: String, unique: true, lowercase: true },
  username: { type: String },
  password: { type: String },
  locale: { type: String, default: 'es-ES' },
  signupDate: { type: Date, default: Date.now },
  lastlogin: { type: Date, default: Date.now },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
})


/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

userSchema.path('name').validate((name) => {
  if (this.skipValidation()) return true
  return name.length
}, 'Name cannot be blank')

userSchema.path('email').validate((email) => {
  if (this.skipValidation()) return true
  return email.length
}, 'Email cannot be blank')

userSchema.path('email').validate((email, fn) => {
  const User = mongoose.model('User')
  if (this.skipValidation()) fn(true)

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email }).exec((err, users) => {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')

userSchema.path('username').validate((username) => {
  if (this.skipValidation()) return true
  return username.length
}, 'Username cannot be blank')


/**
 * Methods
 */

/* eslint no-bitwise: 0  */
userSchema.methods = {
  authenticate(plainText) {
    return bcrypt.compareSync(plainText, this.password)
  },
  // validation isn't required using OAuth
  skipValidation() {
    return ~oAuthTypes.indexOf(this.provider)
  }
}


const User = mongoose.model('User', userSchema, 'users')

module.exports = User

