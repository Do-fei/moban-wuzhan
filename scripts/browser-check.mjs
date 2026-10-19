import { chromium } from 'playwright-core'
import { existsSync, mkdirSync } from 'node:fs'

const BASE = (process.env.BASE_URL ?? 'http://127.0.0.1:4173/').replace(/\/?$/, '/')
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

mkdirSync('docs/screenshots', { recursive: true })

const browser = await chromium.launch({ executablePath: CHROME, headless: true })
const errors = []
let checks = 0
function pass(message) {
  checks += 1
  console.log(`✓ ${message}`)
}
function watch(page, label) {
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`[${label}] console: ${message.text()}`)
  })
  page.on('pageerror', (error) => errors.push(`[${label}] pageerror: ${error.message}`))
}

async function seedFastSettings(page) {
  await page.evaluate(() => {
    localStorage.setItem(
      'moban-wuzhan.settings.v1',
      JSON.stringify({ volume: 0, muted: true, fontSize: 'md', textSpeed: 'instant', reduceMotion: true }),
    )
  })
}

async function clickAdvance(page) {
  await page.locator('.dialogue-shell').click({ force: true })
}

async function getRunState(page) {
  const place = await page.locator('.place-chip').first().textContent().catch(() => '')
  const chapter = await page.locator('.chapter-chip').first().textContent().catch(() => '')
  return { place: place?.trim() ?? '', chapter: chapter?.trim() ?? '' }
}

async function runPath(page, picks, label) {
  let pickIndex = 0
  await page.evaluate(() => (document.activeElement instanceof HTMLElement ? document.activeElement.blur() : undefined))
  for (let step = 0; step < 450; step += 1) {
    if (await page.locator('.ending-panel').count()) {
      if (pickIndex !== picks.length) {
        throw new Error(`${label}: 选项没有全部触发 (${pickIndex}/${picks.length})`)
      }
      return
    }
    const choices = page.locator('.choice-option')
    if ((await choices.count()) > 0) {
      if (pickIndex >= picks.length) {
        const labels = await choices.allTextContents()
        throw new Error(`${label}: 出现未预期的选择 ${labels.join(' | ')}`)
      }
      const target = choices.filter({ hasText: picks[pickIndex] })
      if ((await target.count()) !== 1) {
        const labels = await choices.allTextContents()
        throw new Error(`${label}: 找不到选项 "${picks[pickIndex]}"，当前选项：${labels.join(' | ')}`)
      }
      await target.click()
      pickIndex += 1
      await page.evaluate(() => (document.activeElement instanceof HTMLElement ? document.activeElement.blur() : undefined))
      await page.waitForTimeout(25)
      continue
    }
    await page.keyboard.press('Space')
    await page.waitForTimeout(12)
    if (step > 0 && step % 50 === 0) {
      const place = await page.locator('.place-chip').first().textContent().catch(() => '')
      console.log(`  … ${label} 已推进 ${step} 步（${place?.trim() || '结局段'}）`)
    }
  }
  throw new Error(`${label}: 流程超过 450 步仍未抵达结局`)
}

async function startNewFromTitle(page) {
  await page.getByRole('button', { name: /开始游戏/ }).click()
  const confirm = page.getByRole('button', { name: '开始新周目' })
  if (await confirm.count()) await confirm.click()
  await page.waitForSelector('.game-screen')
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  watch(page, 'desktop')
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.waitForSelector('.title-screen')
  await page.screenshot({ path: 'docs/screenshots/title-desktop.jpg', type: 'jpeg', quality: 82 })
  pass('标题页正常加载')

  const sw = await page.evaluate(async (base) => {
    const registration = await navigator.serviceWorker.ready
    return {
      active: registration.active?.state,
      controller: Boolean(navigator.serviceWorker.controller),
      caches: await caches.keys(),
      manifest: await fetch(`${base}manifest.webmanifest`).then((response) => response.ok),
      icon192: (await fetch(`${base}icons/icon-192.png`)).status,
      icon512: (await fetch(`${base}icons/icon-512.png`)).status,
      maskable: (await fetch(`${base}icons/maskable-512.png`)).status,
    }
  }, BASE)
  if (sw.active !== 'activated') throw new Error('Service Worker 未激活')
  if (!sw.controller) throw new Error('Service Worker 未接管页面')
  if (!sw.caches.some((name) => name.startsWith('moban-wuzhan-'))) throw new Error('未找到 PWA 缓存')
  if (!sw.manifest || sw.icon192 !== 200 || sw.icon512 !== 200 || sw.maskable !== 200) {
    throw new Error('Manifest 或图标请求失败')
  }
  pass('Service Worker 已激活并接管，Manifest 与三枚图标可访问')

  await seedFastSettings(page)
  await page.reload({ waitUntil: 'networkidle' })
  await startNewFromTitle(page)
  await page.waitForTimeout(250)
  await page.screenshot({ path: 'docs/screenshots/game-desktop.jpg', type: 'jpeg', quality: 82 })
  pass('可以从标题页进入游戏')

  const firstText = await page.locator('.sr-only').first().textContent()
  if (!firstText?.includes('电台的走廊')) throw new Error('首句剧情不正确')
  if (!(await page.locator('.chapter-chip').innerText()).includes('第一章')) throw new Error('章节提示缺失')
  pass('阅读界面显示章节、场景、说话人和正文')

  // Open history and verify it has text, then close.
  await page.getByRole('button', { name: '历史记录' }).click()
  await page.waitForSelector('.history-list')
  if ((await page.locator('.history-line').count()) < 1) throw new Error('历史记录为空')
  await page.locator('.modal-head .icon-button').click()
  pass('历史记录可以打开并包含已读文本')

  // Open settings and verify controls.
  await page.getByRole('button', { name: '菜单' }).click()
  await page.getByRole('button', { name: /设置/ }).click()
  await page.waitForSelector('.settings')
  if (!(await page.getByLabel('音量').count())) throw new Error('缺少音量控件')
  await page.getByRole('button', { name: '大' }).click()
  await page.getByRole('button', { name: '完成' }).click()
  const fontSize = await page.evaluate(() => document.documentElement.dataset.fontSize)
  if (fontSize !== 'lg') throw new Error('字号设置未生效')
  pass('设置面板可以调整音量、字号与显示速度')

  const picksTruth = ['问一句', '抽出来', '捡起来', '跟下车', '把红线拨开', '按住老人的手', '咬住舌尖', '回到井边']
  await runPath(page, picksTruth, 'truth')
  await page.waitForSelector('.ending-panel')
  const truthTitle = await page.locator('#ending-title').innerText()
  if (truthTitle !== '把名字还给井') throw new Error(`真相结局标题错误：${truthTitle}`)
  await page.screenshot({ path: 'docs/screenshots/ending-truth.jpg', type: 'jpeg', quality: 82 })
  await page.getByRole('button', { name: '历史记录' }).click()
  await page.waitForSelector('.history-list')
  const chosen = await page.locator('.history-choice').count()
  if (chosen < 8) throw new Error(`历史记录中的选择数量不足：${chosen}`)
  await page.locator('.modal-head .icon-button').click()
  pass('真相结局《把名字还给井》可从正常流程抵达，历史记录包含所有选择')

  // Auto save exists and reload restores terminal state.
  const beforeReload = await page.evaluate(() => localStorage.getItem('moban-wuzhan.save.auto.v1'))
  if (!beforeReload) throw new Error('没有自动存档')
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForSelector('.title-screen')
  await page.getByRole('button', { name: /继续游戏/ }).click()
  await page.waitForSelector('.ending-panel')
  if ((await page.locator('#ending-title').innerText()) !== '把名字还给井') throw new Error('刷新后结局恢复失败')
  pass('刷新后可从自动存档恢复结局状态')

  const unlockCount = await page.evaluate(() => {
    const raw = localStorage.getItem('moban-wuzhan.unlocks.v1')
    return raw ? JSON.parse(raw).endings.length : 0
  })
  if (unlockCount < 1) throw new Error('结局图鉴未记录')
  pass('结局已写入本地图鉴')

  // New run must clear state but preserve ending unlock.
  await page.getByRole('button', { name: '回到标题' }).click()
  await page.waitForSelector('.title-screen')
  await page.getByRole('button', { name: /结局图鉴/ }).click()
  await page.waitForSelector('.gallery-panel')
  if ((await page.locator('.ending-card.is-unlocked').count()) < 1) throw new Error('图鉴未显示已解锁结局')
  await page.locator('.modal-head .icon-button').click()
  await startNewFromTitle(page)
  const cleared = await page.evaluate(() => {
    const raw = localStorage.getItem('moban-wuzhan.save.auto.v1')
    const save = JSON.parse(raw ?? 'null')
    return save?.state?.clues?.length
  })
  if (cleared !== 0) throw new Error('新周目未清空线索')
  const unlockedAfter = await page.evaluate(() => JSON.parse(localStorage.getItem('moban-wuzhan.unlocks.v1') ?? '{}').endings?.length ?? 0)
  if (unlockedAfter < 1) throw new Error('新周目清除了结局图鉴')
  pass('新周目清空本周目状态并保留已解锁结局')

  // Survive route.
  const picksSurvive = ['问一句', '抽出来', '捡起来', '跟下车', '把红线拨开', '按住老人的手', '咬住舌尖', '朝槐树胡同的灯跑']
  await runPath(page, picksSurvive, 'survive')
  await page.waitForSelector('.ending-panel')
  const surviveTitle = await page.locator('#ending-title').innerText()
  if (surviveTitle !== '槐树胡同的灯') throw new Error(`生还结局标题错误：${surviveTitle}`)
  await page.screenshot({ path: 'docs/screenshots/ending-survive.jpg', type: 'jpeg', quality: 82 })
  pass('生还结局《槐树胡同的灯》可从正常流程抵达')

  // Lost route.
  await page.getByRole('button', { name: '回到标题' }).click()
  await page.waitForSelector('.title-screen')
  await startNewFromTitle(page)
  const picksLost = ['问一句', '抽出来', '捡起来', '跟下车', '把红线拨开', '按住老人的手', '应一声']
  await runPath(page, picksLost, 'lost')
  await page.waitForSelector('.ending-panel')
  const lostTitle = await page.locator('#ending-title').innerText()
  if (lostTitle !== '第十三排乘客') throw new Error(`迷失结局标题错误：${lostTitle}`)
  await page.screenshot({ path: 'docs/screenshots/ending-lost.jpg', type: 'jpeg', quality: 82 })
  pass('迷失结局《第十三排乘客》可从正常流程抵达')

  const finalUnlocks = await page.evaluate(() => JSON.parse(localStorage.getItem('moban-wuzhan.unlocks.v1') ?? '{}').endings?.sort())
  if (!finalUnlocks || finalUnlocks.length !== 3) throw new Error(`三结局图鉴未全部点亮：${finalUnlocks}`)
  await page.getByRole('button', { name: /结局图鉴/ }).click()
  await page.waitForSelector('.gallery-panel')
  await page.screenshot({ path: 'docs/screenshots/gallery-desktop.jpg', type: 'jpeg', quality: 82 })
  await page.locator('.modal-head .icon-button').click()
  pass('三结局图鉴全部点亮')

  // Manual save and load through the UI.
  await page.getByRole('button', { name: '回到标题' }).click()
  await page.waitForSelector('.title-screen')
  await startNewFromTitle(page)
  for (let i = 0; i < 8; i += 1) await clickAdvance(page)
  await page.getByRole('button', { name: '菜单' }).click()
  await page.getByRole('button', { name: /存档/ }).click()
  await page.getByRole('button', { name: /写入手动存档/ }).click()
  if (!(await page.locator('.toast').innerText()).includes('手动存档')) throw new Error('手动存档提示缺失')
  await page.locator('.modal-head .icon-button').click()
  const savedTitle = await getRunState(page)
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /继续游戏/ }).click()
  await page.waitForSelector('.game-screen')
  const restored = await getRunState(page)
  if (restored.place !== savedTitle.place) throw new Error(`自动存档位置不一致：${savedTitle.place} / ${restored.place}`)
  pass('推进过程中会产生自动存档，刷新后可继续到相同位置')

  // Offline reload: SW must serve the shell and game assets.
  await page.waitForTimeout(300)
  await context.setOffline(true)
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForSelector('.game-screen, .title-screen', { timeout: 10000 })
  await page.waitForFunction(() => (document.body.textContent ?? '').includes('末班无站'), null, { timeout: 10000 })
  const offlineTitle = await page.title()
  if (!offlineTitle.includes('末班无站')) throw new Error('离线刷新未加载应用')
  const shellText = await page.locator('body').textContent()
  if (!shellText?.includes('末班无站')) throw new Error('离线页面内容不完整')
  await page.screenshot({ path: 'docs/screenshots/offline.jpg', type: 'jpeg', quality: 82 })
  pass('断网刷新仍可加载应用壳与本地资源')
  await context.setOffline(false)

  await context.close()

  // Mobile viewport.
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  })
  const mobilePage = await mobile.newPage()
  watch(mobilePage, 'mobile')
  await mobilePage.goto(BASE, { waitUntil: 'networkidle' })
  await mobilePage.waitForSelector('.title-screen')
  await mobilePage.screenshot({ path: 'docs/screenshots/title-mobile.jpg', type: 'jpeg', quality: 82 })
  const overflowTitle = await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (overflowTitle > 1) throw new Error(`手机标题页横向溢出 ${overflowTitle}px`)
  await seedFastSettings(mobilePage)
  await mobilePage.reload({ waitUntil: 'networkidle' })
  await mobilePage.getByRole('button', { name: /开始游戏/ }).click()
  await mobilePage.waitForSelector('.game-screen')
  await mobilePage.waitForTimeout(250)
  await mobilePage.screenshot({ path: 'docs/screenshots/game-mobile.jpg', type: 'jpeg', quality: 82 })
  const overflowGame = await mobilePage.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (overflowGame > 1) throw new Error(`手机游戏页横向溢出 ${overflowGame}px`)
  await mobilePage.getByRole('button', { name: '历史记录' }).click()
  await mobilePage.waitForSelector('.modal-card')
  const historyOverflow = await mobilePage.evaluate(() => {
    const card = document.querySelector('.modal-card')
    return card ? card.scrollWidth - card.clientWidth : 0
  })
  if (historyOverflow > 1) throw new Error(`手机历史面板横向溢出 ${historyOverflow}px`)
  await mobilePage.screenshot({ path: 'docs/screenshots/history-mobile.jpg', type: 'jpeg', quality: 82 })
  await mobilePage.locator('.modal-head .icon-button').click()
  await mobilePage.getByRole('button', { name: '菜单' }).click()
  await mobilePage.getByRole('button', { name: /设置/ }).click()
  await mobilePage.waitForSelector('.settings')
  const settingsOverflow = await mobilePage.evaluate(() => {
    const card = document.querySelector('.modal-card')
    return card ? card.scrollWidth - card.clientWidth : 0
  })
  if (settingsOverflow > 1) throw new Error(`手机设置面板横向溢出 ${settingsOverflow}px`)
  await mobilePage.screenshot({ path: 'docs/screenshots/settings-mobile.jpg', type: 'jpeg', quality: 82 })
  pass('390×844 手机尺寸下设置面板可正常使用')
  await mobilePage.getByRole('button', { name: '完成' }).click()
  for (let i = 0; i < 40; i += 1) {
    if ((await mobilePage.locator('.choice-option').count()) >= 2) break
    await clickAdvance(mobilePage)
    await mobilePage.waitForTimeout(20)
  }
  const optionCount = await mobilePage.locator('.choice-option').count()
  if (optionCount < 2) throw new Error('手机端未出现选择项')
  await mobilePage.screenshot({ path: 'docs/screenshots/choices-mobile.jpg', type: 'jpeg', quality: 82 })
  const optionOverflow = await mobilePage.evaluate(() => {
    const list = document.querySelector('.choice-list')
    const panel = document.querySelector('.dialogue-panel')
    return {
      list: list ? list.scrollWidth - list.clientWidth : 0,
      panel: panel ? panel.getBoundingClientRect().right - window.innerWidth : 0,
    }
  })
  if (optionOverflow.list > 1 || optionOverflow.panel > 1) throw new Error(`手机选项横向溢出 ${JSON.stringify(optionOverflow)}`)
  pass('390×844 手机尺寸下正文、历史与选项无横向溢出')

  await mobile.close()

  if (errors.length) {
    console.error('\n浏览器控制台错误：')
    for (const error of errors) console.error(error)
    process.exitCode = 1
  } else {
    console.log(`\n浏览器检查通过：${checks} 项，0 个控制台错误。`)
  }
} finally {
  await browser.close()
}
