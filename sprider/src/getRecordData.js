const puppeteer = require('puppeteer')

;(async () => {
  console.log('ready go')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
    //headless: false,
    // userDataDir: './tempDir',
  })
  const page = await browser.newPage()
  const page2 = await browser.newPage()
  await page.on('response', async response => {
    const req = response.request()
    //util.debuglog(req.method, response.status, req.url)
    if (typeof req.url() === 'string') {
      //.test('deveics')) {
      let temp = req.url()
      if (/device/g.test(temp)) {
        await page2.goto(temp, { waitUntil: 'networkidle2' })
        const result = await page2.content()
        //抓到資料
        console.log('content', result)
      }
    }
  })

  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto('https://airbox.edimaxcloud.com/', {
    waitUntil: 'networkidle2'
  })

  await page.waitFor('.bootbox-close-button')
  await page.click('.bootbox-close-button')
  await page.waitFor('.gm-control-active')
})()
