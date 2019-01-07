const moment = require('moment')
const fs = require('fs')
const timer = 80000
const mkdirSync = async dirPath => {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

module.exports = function(page) {
  setInterval(async () => {
    let path = __dirname + '/history/' + moment().format('YYYYMMDD')
    await mkdirSync(__dirname + '/history')
    await mkdirSync(path)
    console.log('take picture smell')
    let file = `img${moment().format('HHmm')}.png`
    await page.screenshot({ path: `${path}/${file}`, fullPage: true })
  }, timer)
}
