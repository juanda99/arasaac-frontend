const SwaggerExpress = require('swagger-express-mw')
const app = require('express')()
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')

import config from './config'
const errorhandler = require('errorhandler')


var YAML = require('yamljs')
const swaggerDocument = YAML.load('./api/swagger/swagger.yaml')


module.exports = app // for testing

var swaggerConfig = {
  appRoot: __dirname // required config,
}

/*bbdd configuration in its own file*/
require('./db')



app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


SwaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)



  var port = process.env.PORT || config.port
  app.listen(port)
  console.log('App running on port ' + port)

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott')
  }
})
