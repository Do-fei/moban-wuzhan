import assert from 'node:assert/strict'
import story from '../src/game/story'
import { advanceLine, createNewGame, enterNode } from '../src/game/engine'
import {
  KEYS,
  SaveError,
  hasSave,
  loadGame,
  loadSaveMeta,
  loadSettings,
  loadUnlocks,
  saveGame,
  saveSettings,
  saveUnlocks,
  unlockEnding,
} from '../src/game/save'
import type { GameState } from '../src/game/types'

class MemoryStorage {
  private data = new Map<string, string>()
  get length(): number {
    return this.data.size
  }
  clear(): void {
    this.data.clear()
  }
  getItem(key: string): string | null {
    return this.data.get(key) ?? null
  }
  key(index: number): string | null {
    return [...this.data.keys()][index] ?? null
  }
  removeItem(key: string): void {
    this.data.delete(key)
  }
  setItem(key: string, value: string): void {
    this.data.set(key, String(value))
  }
}

const storage = new MemoryStorage()
Object.defineProperty(globalThis, 'localStorage', { value: storage, configurable: true })
Object.defineProperty(globalThis, 'window', {
  value: { matchMedia: () => ({ matches: false }) },
  configurable: true,
})

function richState(): GameState {
  let state = createNewGame(story)
  state = enterNode(state, 'c3_radio', story)
  state = {
    ...state,
    flags: { askedDriver: true, returnedShoe: true, gotOff: true },
    clues: ['ticket', 'red-shoe', 'radio', 'sweater'],
    lineIndex: 2,
    history: [
      { id: 'test-1', kind: 'line', speaker: '老人', text: '过了北新桥，别应名字。', at: 1 },
      { id: 'test-2', kind: 'choice', text: '抽出来，借着窗外的光看清上面的字。', at: 2 },
    ],
  }
  return state
}

// Round-trip automatic save.
const state = richState()
assert.equal(saveGame('auto', state), true)
assert.equal(hasSave('auto'), true)
const loaded = loadGame('auto', story)
assert.ok(loaded)
assert.equal(loaded.state.nodeId, state.nodeId)
assert.equal(loaded.state.lineIndex, state.lineIndex)
assert.deepEqual(loaded.state.flags, state.flags)
assert.deepEqual(loaded.state.clues, state.clues)
assert.equal(loaded.state.history.length, 2)
assert.equal(loaded.state.history[1].kind, 'choice')
assert.ok(loadSaveMeta('auto')?.savedAt)
console.log('✓ 自动存档可完整恢复节点、变量、线索和历史')

// Manual save uses an independent slot.
assert.equal(saveGame('manual', state), true)
assert.ok(storage.getItem(KEYS.manual))
assert.ok(storage.getItem(KEYS.auto))
const manual = loadGame('manual', story)
assert.ok(manual)
assert.equal(manual.kind, 'manual')
console.log('✓ 自动存档与手动存档互不覆盖')

// Settings and unlocks survive a new run.
saveSettings({
  volume: 0.2,
  muted: true,
  fontSize: 'lg',
  textSpeed: 'instant',
  reduceMotion: true,
})
const settings = loadSettings()
assert.equal(settings.volume, 0.2)
assert.equal(settings.muted, true)
assert.equal(settings.fontSize, 'lg')
assert.equal(settings.textSpeed, 'instant')
assert.equal(settings.reduceMotion, true)

let unlocks = loadUnlocks()
unlocks = unlockEnding(unlocks, 'truth', ['ticket', 'radio', 'confession', 'sweater'])
unlocks = unlockEnding(unlocks, 'truth', ['ticket'])
assert.deepEqual(unlocks.endings, ['truth'])
assert.ok(unlocks.seenClues.includes('confession'))
assert.ok(unlocks.seenClues.includes('radio'))
const fresh = advanceLine(createNewGame(story), story)
saveGame('auto', fresh)
assert.equal(fresh.clues.length, 0)
assert.equal(Object.keys(fresh.flags).length, 0)
assert.deepEqual(loadUnlocks().endings, ['truth'])
assert.equal(loadSettings().fontSize, 'lg')
console.log('✓ 新周目清空当前状态，设置与已解锁结局保留')

// Corrupt save: throws a typed error, backs up the bad payload, and removes the slot.
storage.setItem(KEYS.auto, '{not valid json')
assert.throws(
  () => loadGame('auto', story),
  (error) => error instanceof SaveError && error.reason === 'corrupt',
)
assert.equal(storage.getItem(KEYS.auto), null)
assert.ok(storage.getItem(`${KEYS.auto}.unreadable`))
console.log('✓ 损坏存档被识别、备份并移除，不会静默读取')

// Incompatible version.
storage.setItem(
  KEYS.auto,
  JSON.stringify({ version: 99, kind: 'auto', savedAt: Date.now(), state }),
)
assert.throws(
  () => loadGame('auto', story),
  (error) => error instanceof SaveError && error.reason === 'incompatible',
)
assert.ok(storage.getItem(`${KEYS.auto}.unreadable`))
console.log('✓ 不兼容版本被友好拒绝')

// Missing node (e.g. old story data) is treated as corrupt.
storage.setItem(
  KEYS.auto,
  JSON.stringify({
    version: 1,
    kind: 'auto',
    savedAt: Date.now(),
    state: { ...state, nodeId: 'removed_node' },
  }),
)
assert.throws(
  () => loadGame('auto', story),
  (error) => error instanceof SaveError && error.reason === 'corrupt',
)
console.log('✓ 指向已删除节点的存档被拒绝')

// Unlocks survive malformed unlock storage.
storage.setItem(KEYS.unlocks, '{bad')
assert.deepEqual(loadUnlocks().endings, [])
saveUnlocks({ version: 1, endings: ['survive', 'lost'], seenClues: ['ticket'], updatedAt: Date.now() })
assert.deepEqual(loadUnlocks().endings, ['survive', 'lost'])
console.log('✓ 结局图鉴独立持久化，损坏时安全回退')

console.log('\n存档校验通过')
