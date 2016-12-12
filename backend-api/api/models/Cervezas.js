var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cervezaSchema = new Schema({
  Nombre: String, 
  Descripción: String, 
  Graduacion: String,
  Envase: String,
  Precio: String 
})

var Cerveza = mongoose.model('Cerveza', cervezaSchema)

/*

Esto da error en update y create:
cervezaSchema.pre('save', function (next) {
  var self = this
  Cerveza.count({cerveza: self.name}, function (err, count) {
    if (count>0){
      next(new Error('¡Ya existe esta cerveza!'))
    }else{                
      next()
    }
  })
}) 

*/

module.exports = Cerveza
