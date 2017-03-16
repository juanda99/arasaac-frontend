const PictogramSearches = require('../models/PictogramSearches')
// based on http://stackoverflow.com/questions/28891165/using-weights-for-searching-in-mongoose
module.exports = {
  show(req, res) {
    const searchText = req.params.searchText
    // return res.json(searchText)
    PictogramSearches.list(searchText, (err, regs) => {
      if (err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el listado'
        })
      }
      if (!regs) {
        return res.status(404).json({
          message: 'No tenemos ese registro'
        })
      }
      return res.json(regs.map((reg) => reg.nombre))
    })
  }
}
