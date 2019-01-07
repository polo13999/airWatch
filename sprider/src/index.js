const puppeteer = require('puppeteer')
const startPicture = require('./startPicture')

;(async () => {
  console.log('ready go')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    //headless: true,
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
    localStorage.setItem('savedLon', 120.57514462321315)
    localStorage.setItem('savedLat', 22.661415451784574)
    localStorage.setItem('savedZoom', 13)
    window.location.reload()
  })

  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')

  //開始照相
  await startPicture(page)
  // on	123.97314951812494	savedLat	22.197005304949897	savedZoom
})()
