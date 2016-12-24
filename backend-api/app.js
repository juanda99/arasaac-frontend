import config from './config'
const SwaggerExpress = require('swagger-express-mw')
const app = require('express')()
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
import mongoose from 'mongoose'

// const errorhandler = require('errorhandler')


const YAML = require('yamljs')
const swaggerDocument = YAML.load('./backend-api/api/swagger/swagger.yaml')


module.exports = app // for testing

const swaggerConfig = {
  appRoot: __dirname // required config,
}


app.use(morgan('dev'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => {
  if (err) { throw err }

  // install middleware
  swaggerExpress.register(app)

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`)
  }
})


mongoose.connect(config.databaseUrl)
const port = process.env.PORT || config.port

mongoose.connection.on('connected', () => {
  console.log(`Connected to database: ${config.databaseUrl}`)
  app.listen(port)
  console.log(`App running on port ${port}`)
})
mongoose.connection.on('error', (err) => {
  console.log(`Database connection error: ${err}`)
})
mongoose.connection.on('disconnected', () => console.log('Disconnected from database'))

process.on('SIGINT', () => mongoose.connection.close(() => {
  console.log('Finished App and disconnected from database')
  process.exit(0)
}))
