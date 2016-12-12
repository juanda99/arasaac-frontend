var mongoose = require('mongoose')
const crypto = require('crypto')

var Schema = mongoose.Schema

const oAuthTypes = [
  'github',
  'twitter',
  'facebook',
  'google',
  'linkedin'
]

const userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' },
  provider: { type: String, default: '' },
  password: { type: String, default: '' },
  authToken: { type: String, default: '' },
  lastlogin: { type : Date, default : Date.now },
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  linkedin: {},
  GENERATED_VERIFYING_URL: {type: String}
})

const validatePresenceOf = value => value && value.length


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
    User.find({ email: email }).exec(function (err, users) {
      fn(!err && users.length === 0)
    })
  } else fn(true)
}, 'Email already exists')

userSchema.path('username').validate(function (username) {
  if (this.skipValidation()) return true
  return username.length
}, 'Username cannot be blank')

userSchema.path('password').validate(function (password) {
  if (this.skipValidation()) return true
  return password.length
}, 'Password cannot be blank')


/**
 * Pre-save hook
 */

userSchema.pre('save', function (next) {
  if (!this.isNew) return next()

  if (!validatePresenceOf(this.password) && !this.skipValidation()) {
    next(new Error('Invalid password'))
  } else {
    next()
  }
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

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
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

  skipValidation: function () {
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

  load: function (options, cb) {
    options.select = options.select || 'name username'
    return this.findOne(options.criteria)
      .select(options.select)
      .exec(cb)
  }
}


var TempUser = mongoose.model('TempUser', userSchema)

module.exports = TempUser

