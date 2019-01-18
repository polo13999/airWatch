switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./remoteProd')
    break
  case 'productionLocal':
    module.exports = require('./localProd')
    break
  case 'test':
    module.exports = require('./test')
    break
  default:
    module.exports = require('./dev')
}
