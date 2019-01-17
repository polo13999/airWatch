const puppeteer = require('puppeteer')
const startPicture = require('./startPicture')
/* eslint-disable */
;(async () => {
  console.log('ready go')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    //headless: false
    // userDataDir: './tempDir',
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  // let currentScreen = await page.evaluate(() => {
  //   return {
  //     width: window.screen.availWidth,
  //     height: window.screen.availHeight
  //   }
  // })
  // await page.setViewport(currentScreen)

  await page.goto('https://airbox.edimaxcloud.com/', {
    waitUntil: 'networkidle2'
  })
  //gm-control-active
  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')
  await page.waitFor('.gm-control-active')

  await page.evaluate(() => {
    localStorage.setItem('savedLon', 120.57514462321315)
    localStorage.setItem('savedLat', 22.661415451784574)
    localStorage.setItem('savedZoom', 11)
    //window.location.reload()
  })
  await page.goto('https://airbox.edimaxcloud.com/', {
    waitUntil: 'networkidle2'
  })
  await page.waitFor(3000)
  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')

  await page.waitFor(1000)
  await page.evaluate(() => {
    document
      .querySelector(
        'body > nav > ul > form > div > table > tbody > tr:nth-child(3) > td:nth-child(2) > div > div > span.bootstrap-switch-handle-off.bootstrap-switch-default'
      )
      .click()
  })
  //開始照相
  console.log('test')
  await startPicture(page)
  // on	123.97314951812494	savedLat	22.197005304949897	savedZoom
})()
