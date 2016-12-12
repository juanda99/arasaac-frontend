var mongoose = require('mongoose')
var Schema = mongoose.Schema

var keywordSchema = new Schema({
  locale: String, 
  keyword: String
})

var Keyword = mongoose.model('Keyword', keywordSchema, 'keywords')

module.exports = Keyword
