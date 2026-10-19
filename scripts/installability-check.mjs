import { mkdtempSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { chromium } from 'playwright-core'

const BASE = (process.env.BASE_URL ?? 'https://do-fei.github.io/moban-wuzhan/').replace(/\/?$/, '/')
const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean).find((candidate) => existsSync(candidate))

if (!CHROME) {
  console.error('未找到 Chrome/Chromium。请设置 CHROME_PATH。')
  process.exit(2)
}

const profile = mkdtempSync(path.join(tmpdir(), 'moban-pwa-'))
let browser
try {
  browser = await chromium.launchPersistentContext(profile, {
    executablePath: CHROME,
    headless: true,
    viewport: { width: 1280, height: 800 },
  })
  const page = browser.pages()[0] ?? (await browser.newPage())
  await page.addInitScript(() => {
    window.addEventListener('beforeinstallprompt', () => {
      window.__installPromptFired = true
    })
  })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.evaluate(async () => {
    if ('serviceWorker' in navigator) await navigator.serviceWorker.ready
  })
  await page.waitForTimeout(3000)

  const promptFired = await page.evaluate(() => Boolean(window.__installPromptFired))
  const cdp = await browser.newCDPSession(page)
  const { installabilityErrors } = await cdp.send('Page.getInstallabilityErrors')
  const standalone = await page.evaluate(() => matchMedia('(display-mode: standalone)').matches)

  const result = {
    url: BASE,
    installPromptFired: promptFired,
    installabilityErrors,
    standalone,
  }
  console.log(JSON.stringify(result, null, 2))

  if (!promptFired) {
    throw new Error('浏览器没有派发 beforeinstallprompt；安装入口不会出现。')
  }
  if (installabilityErrors.length > 0) {
    throw new Error(`PWA 安装性错误：${JSON.stringify(installabilityErrors)}`)
  }
  console.log('安装性检查通过：beforeinstallprompt 已派发，无安装性错误。')
} finally {
  if (browser) await browser.close()
  rmSync(profile, { recursive: true, force: true })
}
