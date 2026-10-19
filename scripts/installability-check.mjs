import { chromium } from 'playwright-core'
const BASE = (process.env.BASE_URL ?? 'https://do-fei.github.io/moban-wuzhan/').replace(/\/?$/, '/')
const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
})
const context = await browser.newContext()
const page = await context.newPage()
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(async () => { await navigator.serviceWorker.ready })
await page.waitForTimeout(1500)
const cdp = await context.newCDPSession(page)
const installability = await cdp.send('Page.getInstallabilityErrors')
const manifest = await cdp.send('Page.getAppManifest')
console.log(JSON.stringify({
  url: BASE,
  installabilityErrors: installability.installabilityErrors ?? installability,
  manifestUrl: manifest.url,
  manifestErrors: manifest.errors,
  manifestData: manifest.data ? JSON.parse(manifest.data) : null,
}, null, 2))
await browser.close()
