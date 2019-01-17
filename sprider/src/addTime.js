//assgin foldpath
// const childProcess = require("child_process")
// childProcess.spawn = require('cross-spawn')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
let lastFold = moment().format('YYYYMMDD')
const gm = require('gm')
const mkdirp = require('mkdirp')

/* eslint-disable */
if (process.argv[2]) {
  lastFold = process.argv[2]
  console.log('assign', lastFold)
}

const assignfold = path.join(__dirname, 'history/', lastFold)

const addTime = async file => {
  const source = path.join(__dirname, 'history/', lastFold, file)
  const destinetion = path.join(__dirname, 'history/', '../', 'des', lastFold)
  const destinetionFile = path.join(destinetion, file)
  console.log('destinetionFile', destinetionFile)

  const fontPath = path.join(__dirname, 'fonts/') + 'NotoSansCJKtc-Bold.otf'

  //console.log('destinetion', destinetion)
  let time = file.substr(3, 2) + ' : ' + file.substr(5, 2)
  const showText = lastFold + ' ' + time

  mkdirp(destinetion)
  try {
    await gm(source)
      .stroke('#ffffff')
      .font(fontPath, 10)
      .fontSize(30) //字体大小36
      .drawText(20, 400, showText)
      .write(destinetionFile, function(err) {
        if (!err) console.log('done')
      })
  } catch (err) {
    console.log('err', err)
  }
}

const getFilelist = async fold => {
  const result = await fs.readdirSync(fold)
  result.map(async v => await addTime(v))
}

getFilelist(assignfold)
