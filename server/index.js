const express = require('express')


const app = express()

let env = process.env.NODE_ENV || 'development'

let settings = require('./config/settings')[env]
require('./config/database')(settings)
require('./config/express')(app)
require('./config/routes')(app)


app.listen(settings.port, () => {
  console.log(`Server running on port ${settings.port}...`)
})
