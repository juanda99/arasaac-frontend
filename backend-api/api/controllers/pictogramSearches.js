var PictogramSearches = require('../models/PictogramSearches')
//based on http://stackoverflow.com/questions/28891165/using-weights-for-searching-in-mongoose
module.exports = {
  show: function(req, res) {
    var searchText = req.params.searchText
    // return res.json(searchText)
    PictogramSearches.list(searchText, function(err, regs){
      if(err) {
        return res.status(500).json({
          message: 'Se ha producido un error al obtener el listado'
        })
      }
      if(!regs) {
        return res.status(404).json( {
          message: 'No tenemos ese registro'
        })
      }
      return res.json(regs.map(function(reg) {return reg.nombre}))
    })
  }
}
