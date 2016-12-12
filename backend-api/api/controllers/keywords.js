var Keywords = require('../models/Keyword')
module.exports = {
  getAll: function(req, res) {
    var locale = req.swagger.params.locale.value
    console.log(locale)
    Keywords.find({locale: locale}, (err, keywords) => {
      if(err) {
        return res.status(500).json({error: err.message})
      }
      return res.json(keywords)
    })
  }
}
