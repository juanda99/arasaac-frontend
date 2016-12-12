var mongoose = require('mongoose')
var Schema = mongoose.Schema

var pictogramSearchSchema = new Schema({
  searchText: String, 
  lastSearch: { type : Date, default : Date.now },
  count: Number
})


// method based on http://stackoverflow.com/questions/28891165/using-weights-for-searching-in-mongoose
pictogramSearchSchema.statics.list = function(textSearch, cb) {
// Perform the query

  return this.find({ name: new RegExp(textSearch, 'i') }, cb)
}






var PictogramSearch = mongoose.model('PictogramSearch', pictogramSearchSchema)

module.exports = PictogramSearch
