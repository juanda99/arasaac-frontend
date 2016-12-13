const mongoose = require('mongoose')
const Schema = mongoose.Schema

const keywordSchema = new Schema({
  locale: String,
  keyword: String
})

const Keyword = mongoose.model('Keyword', keywordSchema, 'keywords')

module.exports = Keyword
