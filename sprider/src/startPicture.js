const moment = require('moment')
const fs = require('fs')

const timer = 10000
const mkdirSync = async dirPath => {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

module.exports = function(page) {
  setInterval(async () => {
    let path = 'history/' + moment().format('YYYYMMDD')
    await mkdirSync('history')
    await mkdirSync(path)
    console.log('take picture smell')
    await page.screenshot({ path: `${path}/${moment().format('HH-mm')}.png` })
  }, timer)
}
