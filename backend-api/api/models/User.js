const mongoose = require('mongoose')
const crypto = require('crypto')  // TODO: cahnge to bcrypt

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
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, default: '' },
  // salt: { type: String, default: '' },
  // authToken: { type: String, default: '' },
  signupDate: { type: Date, default: Date.now },
  lastlogin: { type: Date, default: Date.now },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {}
})

const validatePresenceOf = (value) => value && value.length

/**
 * Virtuals
 */
/*
userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

  */

/**
 * Validations
 */

// the below 5 validations only apply if you are signing up traditionally

userSchema.path('name').validate(function (name) {
  if (this.skipValidation()) return true
  return name.length
}, 'Name cannot be blank')

userSchema.path('email').validate(function (email) {
  if (this.skipValidation()) return true
  return email.length
}, 'Email cannot be blank')

userSchema.path('email').validate(function (email, fn) {
  const User = mongoose.model('User')
  if (this.skipValidation()) fn(true)

  // Check only when it is a new user or when email field is modified
  if (this.isNew || this.isModified('email')) {
    User.find({ email }).exec((err, users) => {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')

userSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true
  return username.length
}, 'Username cannot be blank')

userSchema.path('hashed_password').validate(function (hashed_password) {
  if (this.skipValidation()) return true
  return hashed_password.length && this._password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

userSchema.pre('save', (next) => {
  let user = this
  if (!user.isModified('password') return next()
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.password=hash
    next()
  });  
})

/**
 * Methods
 */

userSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt() {
    return `${Math.round((new Date().valueOf() * Math.random()))}`
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },

  /**
   * Validation is not required if using OAuth
   */

  skipValidation() {
    return ~oAuthTypes.indexOf(this.provider)
  }
}

/**
 * Statics
 */

userSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load(options, cb) {
    options.select = options.select || 'name username'
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb)
  }
}

const User = mongoose.model('User', userSchema, 'users')

module.exports = User

