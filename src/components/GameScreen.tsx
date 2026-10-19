import { useCallback, useEffect, useRef, useState } from 'react'
import type { GameState, Settings, Story, StoryLine, StoryOption } from '../game/types'
import { currentNode, isChoiceOpen, isEndingComplete, visibleOptions } from '../game/engine'
import SceneArt from './SceneArt'
import {
  IconArrow,
  IconBook,
  IconChevron,
  IconClue,
  IconHistory,
  IconMenu,
  IconSound,
} from './Icons'

interface Props {
  story: Story
  game: GameState
  settings: Settings
  blocked: boolean
  endingUnlocked: boolean
  onAdvance: () => void
  onChoose: (option: StoryOption) => void
  onOpenHistory: () => void
  onOpenClues: () => void
  onOpenMenu: () => void
  onToggleMute: () => void
  onCue: (cue: NonNullable<StoryLine['cue']>) => void
  onTitle: () => void
  onGallery: () => void
  onRestart: () => void
}

const SPEED_MS: Record<Settings['textSpeed'], number> = {
  slow: 54,
  normal: 30,
  fast: 15,
  instant: 0,
}

export function GameScreen({
  story,
  game,
  settings,
  blocked,
  endingUnlocked,
  onAdvance,
  onChoose,
  onOpenHistory,
  onOpenClues,
  onOpenMenu,
  onToggleMute,
  onCue,
  onTitle,
  onGallery,
  onRestart,
}: Props) {
  const node = currentNode(game, story)
  const line = node.lines[game.lineIndex] as StoryLine | undefined
  const choiceOpen = isChoiceOpen(game, story)
  const endingComplete = isEndingComplete(game, story)
  const lastLine = node.lines[node.lines.length - 1]
  const [visibleCount, setVisibleCount] = useState(0)
  const [chapterVisible, setChapterVisible] = useState(true)
  const cuePlayed = useRef('')
  const previousChapter = useRef(game.chapter)

  const chars = line ? Array.from(line.text) : []
  const instant = settings.reduceMotion || settings.textSpeed === 'instant'
  const fullyVisible = !line || visibleCount >= chars.length

  useEffect(() => {
    if (!line) {
      setVisibleCount(0)
      return
    }
    setVisibleCount(instant ? chars.length : 0)
    if (instant) return
    let index = 0
    const delay = SPEED_MS[settings.textSpeed]
    const timer = window.setInterval(() => {
      index += 1
      setVisibleCount(index)
      if (index >= chars.length) window.clearInterval(timer)
    }, delay)
    return () => window.clearInterval(timer)
    // The line's identity is enough: text, speed and motion are read from the closure.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.nodeId, game.lineIndex, line?.text, instant, settings.textSpeed])

  useEffect(() => {
    if (!line?.cue || !fullyVisible) return
    const key = `${game.nodeId}:${game.lineIndex}`
    if (cuePlayed.current === key) return
    cuePlayed.current = key
    onCue(line.cue)
  }, [fullyVisible, game.lineIndex, game.nodeId, line, onCue])

  useEffect(() => {
    if (previousChapter.current !== game.chapter) {
      previousChapter.current = game.chapter
      setChapterVisible(true)
      const timer = window.setTimeout(() => setChapterVisible(false), 2400)
      return () => window.clearTimeout(timer)
    }
    const timer = window.setTimeout(() => setChapterVisible(false), 2800)
    return () => window.clearTimeout(timer)
  }, [game.chapter])

  const completeLine = useCallback(() => {
    if (line) setVisibleCount(Array.from(line.text).length)
  }, [line])

  const handleAdvance = useCallback(() => {
    if (blocked || choiceOpen || endingComplete) return
    if (line && !fullyVisible) {
      completeLine()
      return
    }
    onAdvance()
  }, [blocked, choiceOpen, endingComplete, line, fullyVisible, completeLine, onAdvance])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (blocked || choiceOpen || endingComplete) return
      const target = event.target as HTMLElement | null
      if (
        target?.closest(
          'button, a, input, textarea, select, summary, label, [contenteditable="true"], [role="slider"]',
        )
      ) {
        return
      }
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault()
        handleAdvance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [blocked, choiceOpen, endingComplete, handleAdvance])

  const options = visibleOptions(node, game)
  const ending = node.kind === 'ending' ? story.endings[node.ending] : null
  const endingClueCount = game.clues.length

  return (
    <main className={`game-screen${settings.reduceMotion ? ' reduce-motion' : ''}`} onClick={handleAdvance}>
      <SceneArt key={game.scene} scene={game.scene} reduceMotion={settings.reduceMotion} />
      <div className="game-shade" />

      <header className="game-hud" onClick={(event) => event.stopPropagation()}>
        <div className="hud-left">
          <p className="hud-brand">末班无站</p>
          <div className="hud-meta">
            <span className="chapter-chip">{story.chapters[game.chapter - 1]}</span>
            {node.place ? <span className="place-chip">{node.place}</span> : null}
          </div>
        </div>
        <div className="hud-right">
          <button className="icon-button" onClick={onOpenHistory} aria-label="历史记录" title="历史记录">
            <IconHistory />
          </button>
          <button className="icon-button clue-button" onClick={onOpenClues} aria-label={`线索，已发现 ${game.clues.length} 条`} title="线索">
            <IconClue />
            {game.clues.length > 0 ? <span className="icon-badge">{game.clues.length}</span> : null}
          </button>
          <button
            className="icon-button"
            onClick={onToggleMute}
            aria-label={settings.muted ? '取消静音' : '静音'}
            title={settings.muted ? '取消静音' : '静音'}
            aria-pressed={settings.muted}
          >
            <IconSound muted={settings.muted} />
          </button>
          <button className="icon-button" onClick={onOpenMenu} aria-label="菜单" title="菜单">
            <IconMenu />
          </button>
        </div>
      </header>

      {chapterVisible && !endingComplete ? (
        <div className="chapter-banner" aria-live="polite">
          <span>{story.chapters[game.chapter - 1]}</span>
        </div>
      ) : null}

      {endingComplete && ending ? (
        <section
          className="ending-panel"
          onClick={(event) => event.stopPropagation()}
          aria-labelledby="ending-title"
        >
          <div className="ending-ornament" aria-hidden="true">
            <span />
            <b><i>终</i></b>
            <span />
          </div>
          <p className="eyebrow">{ending.subtitle} · {endingUnlocked ? '已收录' : '正在收录'}</p>
          <h2 id="ending-title">{ending.title}</h2>
          <p className="ending-description">{ending.description}</p>
          <p className="ending-stats">
            本周目线索 {endingClueCount} / {Object.keys(story.clues).length} · 经过 {game.visited.length} 个场景节点
          </p>
          <div className="ending-actions">
            <button className="button is-primary" onClick={onRestart}>
              再走一次
              <IconArrow size={17} />
            </button>
            <button className="button" onClick={onGallery}>
              <IconBook size={17} />
              结局图鉴
            </button>
            <button className="button is-quiet" onClick={onTitle}>
              回到标题
            </button>
          </div>
          <p className="ending-hint">新周目会清空本周目线索，已解锁的结局会保留。</p>
        </section>
      ) : (
        <section
          className={`dialogue-shell${choiceOpen ? ' has-choices' : ''}`}
          onClick={(event) => {
            event.stopPropagation()
            handleAdvance()
          }}
          aria-label="故事文本"
        >
          <div className="dialogue-rail" aria-hidden="true">
            <span className="rail-index">{String(game.chapter).padStart(2, '0')}</span>
            <span className="rail-line" />
            <span className="rail-label">北新桥夜行</span>
          </div>

          <div className="dialogue-panel">
            {choiceOpen ? (
              <div className="choice-block">
                <div className="choice-context">
                  {lastLine?.speaker ? <span className="speaker">{lastLine.speaker}</span> : null}
                  <p>{lastLine?.text}</p>
                </div>
                <p className="choice-prompt">{node.kind === 'choice' ? node.prompt : ''}</p>
                <div className="choice-list" role="group" aria-label="选择">
                  {options.map((option, index) => (
                    <button
                      key={option.id}
                      className="choice-option"
                      onClick={(event) => {
                        event.stopPropagation()
                        onChoose(option)
                      }}
                    >
                      <span className="choice-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="choice-copy">
                        <span className="choice-label">{option.label}</span>
                        {option.hint ? <small>{option.hint}</small> : null}
                      </span>
                      <IconChevron size={18} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="speaker-row">
                  <span className={`speaker${line?.narration ? ' is-narration' : ''}`}>
                    {line?.speaker ?? (line?.narration ? '旁白' : '我')}
                  </span>
                  {line?.narration ? <span className="narration-mark">记忆</span> : null}
                </div>
                <div className="dialogue-text-wrap">
                  <p className="dialogue-text" aria-live="polite">
                    <span className="sr-only">{line?.text ?? ''}</span>
                    <span aria-hidden="true">
                      {line ? chars.slice(0, visibleCount).join('') : ''}
                      {!fullyVisible ? <span className="caret" /> : null}
                    </span>
                  </p>
                </div>
                <div className="dialogue-foot">
                  <span className="tap-hint">
                    {!fullyVisible ? '轻触显示整句' : '轻触继续'}
                    <span className="tap-dot" />
                  </span>
                  <span className="key-hint">空格 / Enter</span>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
