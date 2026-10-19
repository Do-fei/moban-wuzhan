import type {
  ClueId,
  Condition,
  Effects,
  GameState,
  HistoryEntry,
  Story,
  StoryNode,
  StoryOption,
} from './types'

export const SAVE_VERSION = 1 as const
const HISTORY_LIMIT = 600

export function matchesCondition(state: GameState, condition?: Condition): boolean {
  if (!condition) return true
  const { flags, clues } = state
  if (condition.allFlags?.some((flag) => !flags[flag])) return false
  if (condition.anyFlags && !condition.anyFlags.some((flag) => flags[flag])) return false
  if (condition.noneFlags?.some((flag) => flags[flag])) return false
  if (condition.allClues?.some((clue) => !clues.includes(clue))) return false
  if (condition.anyClues && !condition.anyClues.some((clue) => clues.includes(clue))) return false
  if (condition.noneClues?.some((clue) => clues.includes(clue))) return false
  return true
}

export function applyEffects(state: GameState, effects?: Effects): GameState {
  if (!effects) return state
  const flags = { ...state.flags }
  for (const flag of effects.setFlags ?? []) flags[flag] = true
  for (const flag of effects.clearFlags ?? []) delete flags[flag]
  const clues = [...state.clues]
  for (const clue of effects.addClues ?? []) {
    if (!clues.includes(clue)) clues.push(clue)
  }
  return { ...state, flags, clues }
}

export function resolveNext(node: StoryNode, state: GameState): string {
  if (node.kind !== 'dialogue') {
    throw new Error(`Node ${node.id} does not have a story transition`)
  }
  if (typeof node.next === 'string') return node.next
  for (const transition of node.next) {
    if (matchesCondition(state, transition.when)) return transition.next
  }
  throw new Error(`No matching transition from ${node.id}`)
}

export function visibleOptions(node: StoryNode, state: GameState): StoryOption[] {
  if (node.kind !== 'choice') return []
  return node.options.filter((option) => matchesCondition(state, option.when))
}

function historyId(nodeId: string, index: number, kind: 'line' | 'choice'): string {
  return `${nodeId}:${index}:${kind}`
}

function pushHistory(state: GameState, entry: HistoryEntry): HistoryEntry[] {
  if (state.history.some((item) => item.id === entry.id)) return state.history
  return [...state.history, entry].slice(-HISTORY_LIMIT)
}

function appendCurrentLine(state: GameState, node: StoryNode): GameState {
  const line = node.lines[state.lineIndex]
  if (!line) return state
  const entry: HistoryEntry = {
    id: historyId(node.id, state.lineIndex, 'line'),
    kind: 'line',
    speaker: line.speaker,
    text: line.text,
    at: Date.now(),
  }
  return { ...state, history: pushHistory(state, entry) }
}

export function enterNode(state: GameState, nodeId: string, story: Story): GameState {
  const node = story.nodes[nodeId]
  if (!node) throw new Error(`Unknown story node: ${nodeId}`)
  let next: GameState = {
    ...state,
    nodeId,
    lineIndex: 0,
    chapter: node.chapter,
    scene: node.scene,
    visited: state.visited.includes(nodeId) ? state.visited : [...state.visited, nodeId],
    updatedAt: Date.now(),
  }
  if (node.kind !== 'ending') next = applyEffects(next, node.effects)
  return appendCurrentLine(next, node)
}

export function createNewGame(story: Story): GameState {
  const now = Date.now()
  return enterNode(
    {
      nodeId: story.start,
      lineIndex: 0,
      chapter: 1,
      scene: 'street',
      flags: {},
      clues: [],
      visited: [],
      history: [],
      startedAt: now,
      updatedAt: now,
    },
    story.start,
    story,
  )
}

export function advanceLine(state: GameState, story: Story): GameState {
  const node = story.nodes[state.nodeId]
  if (!node) return state
  if (state.lineIndex < node.lines.length - 1) {
    const next = {
      ...state,
      lineIndex: state.lineIndex + 1,
      updatedAt: Date.now(),
    }
    return appendCurrentLine(next, node)
  }
  if (state.lineIndex === node.lines.length - 1) {
    if (node.kind === 'choice') {
      return { ...state, lineIndex: node.lines.length, updatedAt: Date.now() }
    }
    if (node.kind === 'ending') {
      return { ...state, lineIndex: node.lines.length, updatedAt: Date.now() }
    }
    const nextId = resolveNext(node, state)
    return enterNode(state, nextId, story)
  }
  return state
}

export function chooseOption(
  state: GameState,
  option: StoryOption,
  story: Story,
): GameState {
  const node = story.nodes[state.nodeId]
  if (!node || node.kind !== 'choice') throw new Error('Current node is not a choice')
  if (!visibleOptions(node, state).some((item) => item.id === option.id)) {
    throw new Error(`Choice ${option.id} is not available`)
  }
  const entry: HistoryEntry = {
    id: historyId(node.id, state.lineIndex, 'choice'),
    kind: 'choice',
    text: `${node.prompt} ${option.label}`,
    at: Date.now(),
  }
  let next: GameState = {
    ...state,
    history: pushHistory(state, entry),
    updatedAt: Date.now(),
  }
  next = applyEffects(next, option.effects)
  return enterNode(next, option.next, story)
}

export function currentNode(state: GameState, story: Story): StoryNode {
  const node = story.nodes[state.nodeId]
  if (!node) throw new Error(`State points to missing node: ${state.nodeId}`)
  return node
}

export function isChoiceOpen(state: GameState, story: Story): boolean {
  const node = currentNode(state, story)
  return node.kind === 'choice' && state.lineIndex >= node.lines.length
}

export function isEndingComplete(state: GameState, story: Story): boolean {
  const node = currentNode(state, story)
  return node.kind === 'ending' && state.lineIndex >= node.lines.length
}

export function hasTruthClues(state: GameState): boolean {
  return (
    state.clues.includes('ticket') &&
    state.clues.includes('radio') &&
    state.clues.includes('confession') &&
    state.clues.includes('sweater')
  )
}

export function clueTitle(id: ClueId, story: Story): string {
  return story.clues[id]?.title ?? id
}
