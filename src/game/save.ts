import type {
  ClueId,
  EndingId,
  GameState,
  HistoryEntry,
  SaveFile,
  SceneId,
  Settings,
  Story,
  Unlocks,
} from './types'

export const KEYS = {
  auto: 'moban-wuzhan.save.auto.v1',
  manual: 'moban-wuzhan.save.manual.v1',
  settings: 'moban-wuzhan.settings.v1',
  unlocks: 'moban-wuzhan.unlocks.v1',
} as const

const SCENES: SceneId[] = [
  'title',
  'street',
  'bus',
  'ghost-stop',
  'alley',
  'courtyard',
  'well',
  'return',
  'lost-bus',
  'dawn',
  'truth',
]

const ENDINGS: EndingId[] = ['survive', 'lost', 'truth']

export const DEFAULT_SETTINGS: Settings = {
  volume: 0.55,
  muted: false,
  fontSize: 'md',
  textSpeed: 'normal',
  reduceMotion: false,
}

export class SaveError extends Error {
  constructor(
    message: string,
    public readonly reason: 'missing' | 'corrupt' | 'incompatible' | 'unavailable',
  ) {
    super(message)
    this.name = 'SaveError'
  }
}

function getStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null
    return localStorage
  } catch {
    return null
  }
}

function readRaw(key: string): string | null {
  const storage = getStorage()
  if (!storage) return null
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function writeRaw(key: string, value: string): boolean {
  const storage = getStorage()
  if (!storage) return false
  try {
    storage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

function removeRaw(key: string): void {
  const storage = getStorage()
  try {
    storage?.removeItem(key)
  } catch {
    // Storage may be blocked. Nothing useful to do.
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function parseHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) throw new Error('history is not an array')
  return value.map((item, index) => {
    if (!isObject(item)) throw new Error(`history entry ${index} is invalid`)
    const { id, kind, speaker, text, at } = item
    if (typeof id !== 'string' || (kind !== 'line' && kind !== 'choice')) {
      throw new Error(`history entry ${index} has an invalid identity`)
    }
    if (typeof text !== 'string' || typeof at !== 'number') {
      throw new Error(`history entry ${index} has invalid content`)
    }
    if (speaker !== undefined && typeof speaker !== 'string') {
      throw new Error(`history entry ${index} has an invalid speaker`)
    }
    return { id, kind, text, at, ...(speaker ? { speaker } : {}) }
  })
}

function parseState(value: unknown, story: Story): GameState {
  if (!isObject(value)) throw new Error('state is not an object')
  const {
    nodeId,
    lineIndex,
    chapter,
    scene,
    flags,
    clues,
    visited,
    history,
    startedAt,
    updatedAt,
  } = value

  if (typeof nodeId !== 'string' || !story.nodes[nodeId]) {
    throw new Error(`unknown node: ${String(nodeId)}`)
  }
  const node = story.nodes[nodeId]
  if (
    typeof lineIndex !== 'number' ||
    !Number.isInteger(lineIndex) ||
    lineIndex < 0 ||
    lineIndex > node.lines.length
  ) {
    throw new Error('line index is out of range')
  }
  if (typeof chapter !== 'number' || !Number.isInteger(chapter)) {
    throw new Error('chapter is invalid')
  }
  if (typeof scene !== 'string' || !SCENES.includes(scene as SceneId)) {
    throw new Error('scene is invalid')
  }
  if (!isObject(flags) || Object.values(flags).some((flag) => typeof flag !== 'boolean')) {
    throw new Error('flags are invalid')
  }
  if (!isStringArray(clues) || clues.some((clue) => !(clue in story.clues))) {
    throw new Error('clues are invalid')
  }
  if (!isStringArray(visited)) throw new Error('visited nodes are invalid')
  if (visited.some((id) => typeof id !== 'string')) throw new Error('visited node id is invalid')

  const cleanHistory = parseHistory(history)
  if (typeof startedAt !== 'number' || typeof updatedAt !== 'number') {
    throw new Error('timestamps are invalid')
  }
  return {
    nodeId,
    lineIndex,
    chapter,
    scene: scene as SceneId,
    flags: flags as Record<string, boolean>,
    clues: clues as ClueId[],
    visited,
    history: cleanHistory,
    startedAt,
    updatedAt,
  }
}

function parseSave(value: unknown, kind: 'auto' | 'manual', story: Story): SaveFile {
  if (!isObject(value)) throw new Error('save is not an object')
  if (value.version !== 1) throw new Error('save version is not supported')
  if (value.kind !== kind) throw new Error('save kind does not match its slot')
  if (typeof value.savedAt !== 'number') throw new Error('save timestamp is invalid')
  return {
    version: 1,
    kind,
    savedAt: value.savedAt,
    state: parseState(value.state, story),
  }
}


export function loadSaveMeta(kind: 'auto' | 'manual'): { savedAt: number; chapter: number; nodeId: string } | null {
  const raw = readRaw(KEYS[kind])
  if (!raw) return null
  try {
    const value: unknown = JSON.parse(raw)
    if (!isObject(value) || value.version !== 1 || !isObject(value.state)) return null
    const state = value.state
    if (
      typeof value.savedAt !== 'number' ||
      typeof state.chapter !== 'number' ||
      typeof state.nodeId !== 'string'
    ) {
      return null
    }
    return { savedAt: value.savedAt, chapter: state.chapter, nodeId: state.nodeId }
  } catch {
    return null
  }
}

export function saveGame(kind: 'auto' | 'manual', state: GameState): boolean {
  const save: SaveFile = {
    version: 1,
    kind,
    savedAt: Date.now(),
    state,
  }
  return writeRaw(KEYS[kind], JSON.stringify(save))
}

export function loadGame(kind: 'auto' | 'manual', story: Story): SaveFile | null {
  const key = KEYS[kind]
  const raw = readRaw(key)
  if (!raw) return null
  try {
    return parseSave(JSON.parse(raw), kind, story)
  } catch (error) {
    writeRaw(`${key}.unreadable`, raw)
    removeRaw(key)
    const reason = error instanceof Error && /version/.test(error.message) ? 'incompatible' : 'corrupt'
    throw new SaveError(
      reason === 'incompatible'
        ? '这份存档来自不同版本，已经不能继续读取。坏档已另存备份。'
        : '这份存档已经损坏，无法继续读取。坏档已另存备份。',
      reason,
    )
  }
}

export function deleteSave(kind: 'auto' | 'manual'): void {
  removeRaw(KEYS[kind])
}

export function hasSave(kind: 'auto' | 'manual'): boolean {
  return readRaw(KEYS[kind]) !== null
}

export function loadSettings(): Settings {
  const raw = readRaw(KEYS.settings)
  if (!raw) {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return { ...DEFAULT_SETTINGS, reduceMotion: prefersReduced }
  }
  try {
    const value: unknown = JSON.parse(raw)
    if (!isObject(value)) return { ...DEFAULT_SETTINGS }
    const volume =
      typeof value.volume === 'number' && value.volume >= 0 && value.volume <= 1
        ? value.volume
        : DEFAULT_SETTINGS.volume
    const muted = typeof value.muted === 'boolean' ? value.muted : DEFAULT_SETTINGS.muted
    const fontSize =
      value.fontSize === 'sm' || value.fontSize === 'md' || value.fontSize === 'lg'
        ? value.fontSize
        : DEFAULT_SETTINGS.fontSize
    const textSpeed =
      value.textSpeed === 'slow' ||
      value.textSpeed === 'normal' ||
      value.textSpeed === 'fast' ||
      value.textSpeed === 'instant'
        ? value.textSpeed
        : DEFAULT_SETTINGS.textSpeed
    const reduceMotion =
      typeof value.reduceMotion === 'boolean' ? value.reduceMotion : DEFAULT_SETTINGS.reduceMotion
    return { volume, muted, fontSize, textSpeed, reduceMotion }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings: Settings): void {
  writeRaw(KEYS.settings, JSON.stringify(settings))
}

export function loadUnlocks(): Unlocks {
  const empty: Unlocks = { version: 1, endings: [], seenClues: [], updatedAt: Date.now() }
  const raw = readRaw(KEYS.unlocks)
  if (!raw) return empty
  try {
    const value: unknown = JSON.parse(raw)
    if (!isObject(value) || value.version !== 1) return empty
    const endings = isStringArray(value.endings)
      ? value.endings.filter((item): item is EndingId => ENDINGS.includes(item as EndingId))
      : []
    const seenClues = isStringArray(value.seenClues)
      ? value.seenClues.filter((item): item is ClueId => Boolean(item))
      : []
    const updatedAt = typeof value.updatedAt === 'number' ? value.updatedAt : Date.now()
    return { version: 1, endings: [...new Set(endings)], seenClues: [...new Set(seenClues)], updatedAt }
  } catch {
    return empty
  }
}

export function saveUnlocks(unlocks: Unlocks): void {
  writeRaw(KEYS.unlocks, JSON.stringify(unlocks))
}

export function unlockEnding(
  unlocks: Unlocks,
  ending: EndingId,
  clues: ClueId[],
): Unlocks {
  const next: Unlocks = {
    ...unlocks,
    endings: unlocks.endings.includes(ending)
      ? unlocks.endings
      : [...unlocks.endings, ending],
    seenClues: [...new Set([...unlocks.seenClues, ...clues])],
    updatedAt: Date.now(),
  }
  saveUnlocks(next)
  return next
}

export function clearUnlocksForTesting(): void {
  removeRaw(KEYS.unlocks)
}
