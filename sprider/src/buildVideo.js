const util = require('util')
const exec = util.promisify(require('child_process').exec)
const fs = require('fs')
const moment = require('moment')
console.log('build video')
const mkdirSync = async dirPath => {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
const mkexec = async date => {
  console.log('start transfer')
  await mkdirSync('videos')
  const cmdstr = `ffmpeg -r 20 -f image2 -s 1920x1080  -i '${__dirname}/history/${date}/img%*.png' -vcodec libx264 -crf 25  -pix_fmt yuv420p  ./videos/${date}.mp4 -y`
  console.log('cmdstr', cmdstr)
  await exec(cmdstr)
  console.log('end transfer')
}

let date = moment().format('YYYYMMDD')
mkexec(date)
