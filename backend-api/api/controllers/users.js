const User = require('../models/User')
const TempUser = require('../models/TempUser')
const nev = require('../mail')
module.exports = {
  // https://docs.mongodb.com/v3.0/reference/operator/query/text/
  search(req, res) {
    const q = req.query.q
    User.find({ $text: { $search: q } }, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Error en la búsqueda'
        })
      }
      return res.json(users)
    })
  },
  list(req, res) {
    User.find((err, Users) => {
      if (err) {
        return res.status(500).json({
          message: 'Error obteniendo los usuarios'
        })
      }
      return res.json(Users)
    })
  },
  show(req, res) {
    const id = req.params.id
    User.findOne({ _id: id }, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el usuario'
        })
      }
      if (!users) {
        return res.status(404).json({
          message: 'No tenemos a este usuario'
        })
      }
      return res.json(users)
    })
  },
  createUser(req, res) {
    const user = new TempUser(req.body)
    console.log(req.body)
    console.log(user)

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
        nev.sendVerificationEmail(newTempUser.email, URL, (error, info) => {
          console.log(info)
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
      return 'kk'
    })
  },
  update(req, res) {
    const id = req.params.id
    User.findOne({ _id: id }, (err, users) => {
      if (err) {
        return res.status(500).json({
          message: 'Se ha producido un error al guardar el usuario',
          error: err
        })
      }
      if (!users) {
        return res.status(404).json({
          message: 'No hemos encontrado la users'
        })
      }
      users.Nombre = req.body.nombre
      users.Descripción = req.body.descripcion
      users.Graduacion = req.body.graduacion
      users.Envase = req.body.envase
      users.Precio = req.body.precio
      users.save((err, users) => {
        if (err) {
          return res.status(500).json({
            message: 'Error al guardar la users'
          })
        }
        if (!users) {
          return res.status(404).json({
            message: 'No hemos encontrado la users'
          })
        }
        return res.json(users)
      })
    })
  },
  remove(req, res) {
    const id = req.params.id
    User.findByIdAndRemove(id, (err, users) => {
      if (err) {
        return res.json(500, {
          message: 'No hemos encontrado el usuario'
        })
      }
      return res.json(users)
    })
  }
}
