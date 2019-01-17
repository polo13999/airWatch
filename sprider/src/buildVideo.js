const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')
const moment = require('moment')
/* eslint-disable */
console.log('build video')
const mkdirSync = async dirPath => {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
const mkexec = async date => {
  await mkdirSync('videos')
  const cmdstr = `ffmpeg -r 20 -f image2 -s 1920x1080  -i '${__dirname}/des/${date}/img%*.png' -vcodec libx264 -crf 25  -pix_fmt yuv420p  ./videos/${date}.mp4 -y`
  try {
    await exec(cmdstr)
  } catch (err) {
    console.log('something err', err)
  }
  console.log('finish')
}

let date = moment().format('YYYYMMDD')

if (process.argv[2]) {
  date = process.argv[2]
}
mkexec(date)
