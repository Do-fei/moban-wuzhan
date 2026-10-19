import { webkit, devices } from 'playwright-core'

const BASE = (process.env.BASE_URL ?? 'https://do-fei.github.io/moban-wuzhan/').replace(/\/?$/, '/')
const browser = await webkit.launch({ headless: true })
const context = await browser.newContext({
  ...devices['iPhone 13'],
  locale: 'zh-CN',
})
const page = await context.newPage()
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))

let checks = 0
const pass = (message) => {
  checks += 1
  console.log(`✓ ${message}`)
}

async function overflow() {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
}

async function tapAdvance() {
  await page.locator('.dialogue-shell').tap({ position: { x: 120, y: 120 }, force: true })
}

async function runPath(picks) {
  let index = 0
  for (let step = 0; step < 450; step += 1) {
    if (await page.locator('.ending-panel').count()) return
    const choices = page.locator('.choice-option')
    if ((await choices.count()) > 0) {
      const target = choices.filter({ hasText: picks[index] })
      if ((await target.count()) !== 1) {
        throw new Error(`找不到选项 ${picks[index]}，当前：${(await choices.allTextContents()).join(' | ')}`)
      }
      await target.tap()
      index += 1
      await page.waitForTimeout(30)
      continue
    }
    await tapAdvance()
    await page.waitForTimeout(12)
  }
  throw new Error('WebKit 流程超时')
}

try {
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.title-screen')
  await page.screenshot({ path: 'docs/screenshots/iphone-webkit-title.jpg', type: 'jpeg', quality: 82 })
  if ((await overflow()) > 1) throw new Error('iPhone WebKit 标题页横向溢出')
  pass('WebKit（iPhone 13 视口）标题页正常，无横向溢出')

  const sw = await page.evaluate(async (base) => {
    if (!('serviceWorker' in navigator)) return { supported: false }
    const registration = await navigator.serviceWorker.ready
    return {
      supported: true,
      active: registration.active?.state,
      controller: Boolean(navigator.serviceWorker.controller),
      scope: registration.scope,
      manifest: (await fetch(`${base}manifest.webmanifest`)).ok,
    }
  }, BASE)
  if (!sw.supported || sw.active !== 'activated' || !sw.manifest) throw new Error(`WebKit Service Worker 异常：${JSON.stringify(sw)}`)
  pass('WebKit 中 Service Worker 激活、Manifest 可读取')

  await page.evaluate(() => {
    localStorage.setItem('moban-wuzhan.settings.v1', JSON.stringify({ volume: 0, muted: true, fontSize: 'md', textSpeed: 'instant', reduceMotion: true }))
  })
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /开始游戏/ }).tap()
  await page.waitForSelector('.game-screen')
  await page.waitForTimeout(250)
  await page.screenshot({ path: 'docs/screenshots/iphone-webkit-game.jpg', type: 'jpeg', quality: 82 })
  if ((await overflow()) > 1) throw new Error('iPhone WebKit 游戏页横向溢出')
  pass('WebKit 游戏阅读界面正常，正文无横向溢出')

  await page.getByRole('button', { name: '菜单' }).tap()
  await page.getByRole('button', { name: /设置/ }).tap()
  await page.waitForSelector('.settings')
  await page.screenshot({ path: 'docs/screenshots/iphone-webkit-settings.jpg', type: 'jpeg', quality: 82 })
  await page.getByRole('button', { name: '完成' }).tap()
  pass('WebKit 设置面板可打开和操作')

  const picksTruth = ['问一句', '抽出来', '捡起来', '跟下车', '把红线拨开', '按住老人的手', '咬住舌尖', '回到井边']
  await runPath(picksTruth)
  await page.waitForSelector('.ending-panel')
  const endingTitle = await page.locator('#ending-title').innerText()
  if (endingTitle !== '把名字还给井') throw new Error(`WebKit 结局错误：${endingTitle}`)
  await page.screenshot({ path: 'docs/screenshots/iphone-webkit-ending.jpg', type: 'jpeg', quality: 82 })
  pass('WebKit 可从开头玩到真相结局')

  await context.setOffline(true)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.ending-panel, .title-screen', { timeout: 10000 })
  await page.waitForFunction(() => (document.body.textContent ?? '').includes('末班无站'), null, { timeout: 10000 })
  pass('WebKit 断网刷新仍可启动游戏')
  await context.setOffline(false)

  if (errors.length) {
    throw new Error(`WebKit 控制台错误：\n${errors.join('\n')}`)
  }
  console.log(`\nWebKit 检查通过：${checks} 项，0 个控制台错误。`)
} finally {
  await browser.close()
}
