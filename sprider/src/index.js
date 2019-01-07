const puppeteer = require('puppeteer')
// const moment = require('moment')
// const fs = require('fs')
// const startPicture = require('./startPicture')

;(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1024, height: 768 })

  await page.goto('https://airbox.edimaxcloud.com/', {
    waitUntil: 'networkidle2'
  })
  //gm-control-active
  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')
  await page.waitFor('.gm-control-active')

  const innerWidth = await page.evaluate(() => {
    return window.innerWidth
  })
  const innerHeight = await page.evaluate(() => {
    return window.innerHeight
  })

  await page.waitFor('#map_canvas')

  let plane = '#map_canvas'

  await page.waitFor(plane)

  const mouse = await page.mouse

  await mouse.move(innerWidth / 2, innerHeight / 2)
  await mouse.down()
  await mouse.move(0, 220, { steps: 100 })
  await mouse.up()
})()

// await page.click()

//const handlePlane = await page.$(plane)

//console.log('handlePlane', handlePlane)

//  const box = await handlePlane.boundingBox();
// await page.evaluate(handlePlane => {
//   // console.log('handlePlane', handlePlane)
//   handlePlane.setAttribute('will-change', 'transform')
//   handlePlane.style.transform = 'translate(-0px, -400px)'

// }, handlePlane)
/* eslint-disable */
//await mouse.move(box.x + box.width / 2, box.y + box.height / 2);
//await mouse.move(innerWidth.width / 2, innerHeight.height / 2);

//let plane = '.gm-style > div:nth-child(1) > div:nth-child(3) > div:nth-child(1)'
//  let plane = '.gm-style > div:nth-child(1) > div:nth-child(1)' //evaluate ok

//let plane = '.gm-style > div:nth-child(1)'
//let plane = '.gm-style > div:nth-child(1) > div:nth-child(3)'
//let plane = '#map_canvas'

// await page.click(plane)

//嘗試把一些plane 移除掉看能不能拿到 canvas
// await page.evaluate(handleBody => {
//   let dom = document.querySelector('.controls');
//   dom.parentNode.removeChild(dom)
//   let logo = document.querySelector('#logo');
//   logo.parentNode.removeChild(logo)

//   let mapinfo = document.querySelector('.mapinfo');
//   mapinfo.parentNode.removeChild(mapinfo)

//   let mapinfo2 = document.querySelector('.mapinfo2');
//   mapinfo2.parentNode.removeChild(mapinfo2)
// })

// console.log('test')
// const handleZoomOut=page.$("")

//console.log('test', result)
// const result = await page.click(buttomHandle)
// const html = await page.evaluate(obj => {
//   obj.click()
// }, buttomHandle);

//await buttomHandle.dispose();

//startPicture(page)
//await browser.close();
