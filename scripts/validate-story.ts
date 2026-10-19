import assert from 'node:assert/strict'
import story from '../src/game/story'
import {
  applyEffects,
  enterNode,
  matchesCondition,
  resolveNext,
  visibleOptions,
} from '../src/game/engine'
import type { ClueId, EndingId, GameState, StoryNode } from '../src/game/types'

const endings = new Set<EndingId>(['survive', 'lost', 'truth'])
const allNodeIds = new Set(Object.keys(story.nodes))
const reachedNodes = new Set<string>()
const reachedEndings = new Set<EndingId>()
const usedOptions = new Set<string>()
const conditionFlags = new Set<string>()
const setFlags = new Set<string>()
const conditionClues = new Set<string>()
const maxDepth = 400

interface PathResult {
  ending: EndingId
  choices: string[]
  nodes: string[]
  chineseChars: number
  totalChars: number
}

const paths: PathResult[] = []

function chineseCount(text: string): number {
  return (text.match(/[\u4e00-\u9fff]/g) ?? []).length
}

function stateKey(state: GameState): string {
  return `${state.nodeId}|${Object.keys(state.flags).sort().join(',')}|${[...state.clues].sort().join(',')}`
}

function recordCondition(condition: StoryNode extends never ? never : Parameters<typeof matchesCondition>[1]): void {
  if (!condition) return
  for (const flag of [
    ...(condition.allFlags ?? []),
    ...(condition.anyFlags ?? []),
    ...(condition.noneFlags ?? []),
  ]) {
    conditionFlags.add(flag)
  }
  for (const clue of [
    ...(condition.allClues ?? []),
    ...(condition.anyClues ?? []),
    ...(condition.noneClues ?? []),
  ]) {
    conditionClues.add(clue)
  }
}

// Static validation.
assert.ok(story.chapters.length >= 5, '至少需要五个章节')
assert.equal(story.endings.survive.order, 1)
assert.equal(story.endings.lost.order, 2)
assert.equal(story.endings.truth.order, 3)
assert.equal(Object.keys(story.endings).length, 3, '必须且只能有三个正式结局')
assert.ok(story.nodes[story.start], '起始节点必须存在')

const allClueIds = new Set(Object.keys(story.clues))
const textCorpus: string[] = []

for (const [nodeId, node] of Object.entries(story.nodes)) {
  assert.equal(node.id, nodeId, `节点键与稳定 ID 不一致：${nodeId}`)
  assert.ok(node.chapter >= 1 && node.chapter <= story.chapters.length, `${nodeId} 章节越界`)
  for (const line of node.lines) {
    textCorpus.push(line.text)
    if (line.cue) {
      assert.ok(
        ['chime', 'brake', 'bell', 'radio', 'footstep'].includes(line.cue),
        `${nodeId} 含有未知音效`,
      )
    }
  }
  for (const clue of node.kind === 'ending' ? [] : (node.effects?.addClues ?? [])) {
    assert.ok(allClueIds.has(clue), `${nodeId} 引用未知线索 ${clue}`)
  }
  for (const flag of node.kind === 'ending' ? [] : (node.effects?.setFlags ?? [])) setFlags.add(flag)

  if (node.kind === 'dialogue') {
    const nexts = typeof node.next === 'string' ? [{ next: node.next }] : node.next
    assert.ok(nexts.length > 0, `${nodeId} 没有后继节点`)
    for (const transition of nexts) {
      assert.ok(allNodeIds.has(transition.next), `${nodeId} 指向缺失节点 ${transition.next}`)
      recordCondition(transition.when)
    }
  } else if (node.kind === 'choice') {
    assert.ok(node.options.length >= 2, `${nodeId} 至少需要两个选项`)
    for (const option of node.options) {
      assert.ok(option.id && option.label, `${nodeId} 选项缺少稳定 ID 或文本`)
      assert.ok(allNodeIds.has(option.next), `${nodeId} 的选项指向缺失节点 ${option.next}`)
      for (const clue of option.effects?.addClues ?? []) {
        assert.ok(allClueIds.has(clue), `${nodeId} 的选项引用未知线索 ${clue}`)
      }
      for (const flag of option.effects?.setFlags ?? []) setFlags.add(flag)
      recordCondition(option.when)
    }
  } else {
    assert.ok(endings.has(node.ending), `${nodeId} 的结局 ID 无效`)
  }
}

for (const flag of conditionFlags) {
  assert.ok(setFlags.has(flag), `条件引用了从未设置的变量：${flag}`)
}
for (const clue of conditionClues) {
  assert.ok(allClueIds.has(clue), `条件引用了未知线索：${clue}`)
}
assert.ok(!textCorpus.join('').match(/待补充|此处插入|TODO|占位/, '正文中出现了占位文本'))

// Dynamic branch exploration. Every reachable state is explored with its actual flags/clues.
function walk(state: GameState, choices: string[], nodes: string[], chineseChars: number, totalChars: number, depth: number): void {
  assert.ok(depth < maxDepth, '剧情分支超过最大深度，可能存在循环')
  const node = story.nodes[state.nodeId]
  assert.ok(node, `状态指向缺失节点 ${state.nodeId}`)
  reachedNodes.add(node.id)
  const nextNodes = [...nodes, node.id]
  let nodeText = ''
  for (const line of node.lines) nodeText += line.text
  const nextChinese = chineseChars + chineseCount(nodeText)
  const nextTotal = totalChars + nodeText.length

  if (node.kind === 'ending') {
    reachedEndings.add(node.ending)
    paths.push({
      ending: node.ending,
      choices,
      nodes: nextNodes,
      chineseChars: nextChinese,
      totalChars: nextTotal,
    })
    return
  }

  if (node.kind === 'choice') {
    const options = visibleOptions(node, state)
    assert.ok(options.length > 0, `${node.id} 在当前状态下没有可见选项`)
    for (const option of options) {
      usedOptions.add(`${node.id}:${option.id}`)
      const nextState = enterNode(applyEffects(state, option.effects), option.next, story)
      walk(nextState, [...choices, `${node.id}:${option.id}:${option.label}`], nextNodes, nextChinese, nextTotal, depth + 1)
    }
    return
  }

  const nextId = resolveNext(node, state)
  const nextState = enterNode(state, nextId, story)
  walk(nextState, choices, nextNodes, nextChinese, nextTotal, depth + 1)
}

const startState = {
  nodeId: story.start,
  lineIndex: 0,
  chapter: 1,
  scene: 'street' as const,
  flags: {},
  clues: [],
  visited: [],
  history: [],
  startedAt: 0,
  updatedAt: 0,
}
walk(startState, [], [], 0, 0, 0)

// Structural graph checks.
const unreachable = [...allNodeIds].filter((id) => !reachedNodes.has(id))
assert.deepEqual(unreachable, [], `存在不可达节点：${unreachable.join(', ')}`)
assert.deepEqual([...reachedEndings].sort(), ['lost', 'survive', 'truth'], '三个结局必须全部可达')

for (const node of Object.values(story.nodes)) {
  if (node.kind !== 'choice') continue
  for (const option of node.options) {
    assert.ok(usedOptions.has(`${node.id}:${option.id}`), `选项不可达：${node.id}/${option.id}`)
  }
}

// Every ending must be reached through at least one complete, finite path.
const endingsReached = new Map<EndingId, PathResult[]>()
for (const path of paths) {
  const list = endingsReached.get(path.ending) ?? []
  list.push(path)
  endingsReached.set(path.ending, list)
}
for (const ending of endings) {
  assert.ok((endingsReached.get(ending)?.length ?? 0) > 0, `结局 ${ending} 不可达`)
}

const allChars = paths.map((path) => path.chineseChars)
const shortest = paths.reduce((a, b) => (a.chineseChars <= b.chineseChars ? a : b))
const longest = paths.reduce((a, b) => (a.chineseChars >= b.chineseChars ? a : b))
const choiceCounts = paths.map((path) => path.choices.length)
const minChoices = Math.min(...choiceCounts)
const maxChoices = Math.max(...choiceCounts)

assert.ok(shortest.chineseChars >= 6000, `最短路线只有 ${shortest.chineseChars} 个汉字，低于目标`)
assert.ok(longest.chineseChars <= 9600, `最长路线 ${longest.chineseChars} 个汉字，可能超出阅读时长目标`)
assert.ok(minChoices >= 6 && maxChoices <= 9, `单条路线的有意义选择应为 6—9 次，实际 ${minChoices}—${maxChoices}`)

console.log('剧情图校验通过')
console.log(`节点 ${allNodeIds.size} 个，可达 ${reachedNodes.size} 个；完整路线 ${paths.length} 条`)
console.log(`单路线汉字数 ${Math.min(...allChars)}—${Math.max(...allChars)}，选择数 ${minChoices}—${maxChoices}`)
console.log(`最短路线：${shortest.ending} / ${shortest.choices.length} 次选择 / ${shortest.chineseChars} 汉字`)
console.log(`最长路线：${longest.ending} / ${longest.choices.length} 次选择 / ${longest.chineseChars} 汉字`)
console.log('\n最长路线选择：')
for (const choice of longest.choices) console.log(`  → ${choice}`)
console.log('\n最短路线选择：')
for (const choice of shortest.choices) console.log(`  → ${choice}`)
console.log('最短路线节点：', shortest.nodes.join(' → '))

for (const ending of ['survive', 'lost', 'truth'] as EndingId[]) {
  const candidates = endingsReached.get(ending) ?? []
  const sample = candidates[0]
  console.log(`\n[${ending}] ${story.endings[ending].title}`)
  for (const choice of sample.choices) console.log(`  → ${choice}`)
  console.log(`  ${sample.chineseChars} 汉字 / ${sample.nodes.length} 节点`)
}
