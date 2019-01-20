const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const config = require('./config')
const mongoose = require('./mongoose')
const server = require('./apolloMiddle/server')

mongoose.connect(config.mongoURI)

require('./src/models')
require('./config/seed/index')

const port = process.env.PORT || 8080

const app = express()
//console.log('config', config)
//app.use(cors({ credentials: true, origin: config.origin }))

const corsOptions = {
  origin: config.origin,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS']
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.cookieKey],
    secure: config.production,
    path: '/'
  })
)

server.applyMiddleware({
  app,
  path: '/graphql',
  cors: corsOptions
})

app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`> ready on http://localhost:${port}`)
})
