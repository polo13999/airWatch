const express = require('express')
const next = require('next')
const helmet = require('helmet')

const routes = require('./src/routes.js')

let port = 3000
let dev = true
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'productionLocal'
) {
  port = 80
  dev = false
}

const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
  const server = express()
  server.use(helmet())
  server.get('*', (req, res) => handle(req, res))
  server.listen(port, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log(`> ready on http://localhost:${port}`)
  })
})
