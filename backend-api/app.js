import config from './config'
const SwaggerExpress = require('swagger-express-mw')
const app = require('express')()
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')

// const errorhandler = require('errorhandler')


const YAML = require('yamljs')
const swaggerDocument = YAML.load('./backend-api/api/swagger/swagger.yaml')


module.exports = app // for testing

const swaggerConfig = {
  appRoot: __dirname // required config,
}

/* bbdd configuration in its own file*/
require('./db')


app.use(morgan('dev'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)


  const port = process.env.PORT || config.port
  app.listen(port)
  console.log(`App running on port ${port}`)

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`)
  }
})
