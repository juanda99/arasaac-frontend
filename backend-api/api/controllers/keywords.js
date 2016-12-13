const Keywords = require('../models/Keyword')
module.exports = {
  getAll(req, res) {
    const locale = req.swagger.params.locale.value
    console.log(locale)
    Keywords.find({ locale }, (err, keywords) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      return res.json(keywords)
    })
  }
}
