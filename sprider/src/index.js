const puppeteer = require('puppeteer')
const startPicture = require('./startPicture')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false
    // userDataDir: './tempDir',
  })
  const page = await browser.newPage()

  let currentScreen = await page.evaluate(() => {
    return {
      width: window.screen.availWidth,
      height: window.screen.availHeight
    }
  })
  await page.setViewport(currentScreen)

  await page.goto('https://airbox.edimaxcloud.com/', {
    waitUntil: 'networkidle2'
  })
  //gm-control-active
  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')
  await page.waitFor('.gm-control-active')

  await page.evaluate(() => {
    localStorage.setItem('savedLon', 120.63515381443676)
    localStorage.setItem('savedLat', 22.486272096736997)
    localStorage.setItem('savedZoom', 11)
    window.location.reload()
  })
  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')

  //開始照相
  await startPicture(page)
  // on	123.97314951812494	savedLat	22.197005304949897	savedZoom
})()
