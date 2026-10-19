export type SceneId =
  | 'title'
  | 'street'
  | 'bus'
  | 'ghost-stop'
  | 'alley'
  | 'courtyard'
  | 'well'
  | 'return'
  | 'lost-bus'
  | 'dawn'
  | 'truth'

export type EndingId = 'survive' | 'lost' | 'truth'

export type ClueId =
  | 'ticket'
  | 'red-shoe'
  | 'doorstone'
  | 'radio'
  | 'sweater'
  | 'confession'
  | 'name'

export interface Clue {
  id: ClueId
  title: string
  summary: string
}

export interface StoryLine {
  speaker?: string
  text: string
  /** Rendered in the quieter narration voice. */
  narration?: boolean
  /** A small, non-animated sound cue played after the line appears. */
  cue?: 'chime' | 'brake' | 'bell' | 'radio' | 'footstep'
}

export interface Condition {
  allFlags?: string[]
  anyFlags?: string[]
  noneFlags?: string[]
  allClues?: ClueId[]
  anyClues?: ClueId[]
  noneClues?: ClueId[]
}

export interface Effects {
  setFlags?: string[]
  clearFlags?: string[]
  addClues?: ClueId[]
}

export interface StoryOption {
  id: string
  label: string
  hint?: string
  next: string
  effects?: Effects
  /** Hidden when the condition is not met. At least one option must remain. */
  when?: Condition
}

export interface ConditionalNext {
  when?: Condition
  next: string
}

export interface DialogueNode {
  kind: 'dialogue'
  id: string
  chapter: number
  scene: SceneId
  lines: StoryLine[]
  /** A single successor, or the first matching conditional successor. */
  next: string | ConditionalNext[]
  effects?: Effects
  /** Optional scene-specific semantic hint shown in the corner. */
  place?: string
}

export interface ChoiceNode {
  kind: 'choice'
  id: string
  chapter: number
  scene: SceneId
  lines: StoryLine[]
  prompt: string
  options: StoryOption[]
  effects?: Effects
  place?: string
}

export interface EndingNode {
  kind: 'ending'
  id: string
  chapter: number
  scene: SceneId
  ending: EndingId
  lines: StoryLine[]
  place?: string
}

export type StoryNode = DialogueNode | ChoiceNode | EndingNode

export interface Story {
  title: string
  subtitle: string
  start: string
  chapters: string[]
  nodes: Record<string, StoryNode>
  clues: Record<ClueId, Clue>
  endings: Record<
    EndingId,
    {
      title: string
      subtitle: string
      description: string
      order: number
    }
  >
}

export interface HistoryEntry {
  id: string
  kind: 'line' | 'choice'
  speaker?: string
  text: string
  at: number
}

export interface RunFlags {
  [key: string]: boolean
}

export interface GameState {
  nodeId: string
  /** Index of the currently displayed line. Equal to lines.length means a choice prompt is open. */
  lineIndex: number
  chapter: number
  scene: SceneId
  flags: RunFlags
  clues: ClueId[]
  visited: string[]
  history: HistoryEntry[]
  startedAt: number
  updatedAt: number
}

export interface SaveFile {
  version: 1
  kind: 'auto' | 'manual'
  savedAt: number
  state: GameState
}

export interface Settings {
  volume: number
  muted: boolean
  fontSize: 'sm' | 'md' | 'lg'
  textSpeed: 'slow' | 'normal' | 'fast' | 'instant'
  reduceMotion: boolean
}

export interface Unlocks {
  version: 1
  endings: EndingId[]
  seenClues: ClueId[]
  updatedAt: number
}
