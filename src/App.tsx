import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  advanceLine,
  chooseOption,
  createNewGame,
  currentNode,
  isEndingComplete,
} from './game/engine'
import {
  SaveError,
  hasSave,
  loadGame,
  loadSaveMeta,
  loadSettings,
  loadUnlocks,
  saveGame,
  saveSettings,
  unlockEnding,
} from './game/save'
import story from './game/story'
import type {
  ClueId,
  EndingId,
  GameState,
  Settings,
  StoryOption,
  Unlocks,
} from './game/types'
import { audioEngine } from './audio/AudioEngine'
import { TitleScreen } from './components/TitleScreen'
import { GameScreen } from './components/GameScreen'
import { Modal, ConfirmDialog } from './components/Modal'
import { SettingsPanel } from './components/SettingsPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { CluePanel } from './components/CluePanel'
import { SavePanel } from './components/SavePanel'
import { MenuPanel } from './components/MenuPanel'
import { GalleryPanel } from './components/GalleryPanel'
import { useInstallPrompt } from './components/useInstallPrompt'

type ModalName = 'settings' | 'history' | 'clues' | 'saves' | 'menu' | 'gallery' | null
type ConfirmKind = 'new-game' | 'restart' | 'load-manual'
type Notice = { title: string; message: string }
type Toast = { id: number; text: string; tone: 'info' | 'clue' | 'error' }

const MODAL_TITLES: Record<Exclude<ModalName, null>, { title: string; eyebrow: string }> = {
  settings: { title: '设置', eyebrow: 'OPTIONS' },
  history: { title: '历史记录', eyebrow: 'THIS RUN' },
  clues: { title: '线索', eyebrow: 'EVIDENCE' },
  saves: { title: '存档', eyebrow: 'SAVE / LOAD' },
  menu: { title: '暂停', eyebrow: 'INTERMISSION' },
  gallery: { title: '结局图鉴', eyebrow: 'ENDINGS' },
}

export default function App() {
  const [screen, setScreen] = useState<'title' | 'game'>('title')
  const [game, setGameState] = useState<GameState | null>(null)
  const gameRef = useRef<GameState | null>(null)
  const [settings, setSettings] = useState<Settings>(() => loadSettings())
  const [unlocks, setUnlocks] = useState<Unlocks>(() => loadUnlocks())
  const [hasAuto, setHasAuto] = useState(() => hasSave('auto'))
  const [hasManual, setHasManual] = useState(() => hasSave('manual'))
  const [autoSavedAt, setAutoSavedAt] = useState<number | null>(() => loadSaveMeta('auto')?.savedAt ?? null)
  const [manualSavedAt, setManualSavedAt] = useState<number | null>(() => loadSaveMeta('manual')?.savedAt ?? null)
  const [modal, setModal] = useState<ModalName>(null)
  const [confirmKind, setConfirmKind] = useState<ConfirmKind | null>(null)
  const [notice, setNotice] = useState<Notice | null>(null)
  const [toast, setToast] = useState<Toast | null>(null)
  const [updateReady, setUpdateReady] = useState(false)
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' && !navigator.onLine)
  const toastSeq = useRef(0)
  const autoSaveWarned = useRef(false)
  const unlockedEndingRef = useRef('')
  const autoContinued = useRef(false)
  const installToastShown = useRef(false)
  const install = useInstallPrompt()

  const showToast = useCallback((text: string, tone: Toast['tone'] = 'info') => {
    toastSeq.current += 1
    setToast({ id: toastSeq.current, text, tone })
  }, [])

  const setRun = useCallback((next: GameState | null) => {
    gameRef.current = next
    setGameState(next)
  }, [])

  const persistAuto = useCallback(
    (next: GameState) => {
      const saved = saveGame('auto', next)
      if (saved) {
        setHasAuto(true)
        setAutoSavedAt(Date.now())
        autoSaveWarned.current = false
      } else if (!autoSaveWarned.current) {
        autoSaveWarned.current = true
        showToast('自动存档写入失败，请检查浏览器是否禁用了本地存储。', 'error')
      }
    },
    [showToast],
  )

  const announceClues = useCallback(
    (before: GameState, after: GameState) => {
      const gained = after.clues.filter((clue) => !before.clues.includes(clue))
      if (gained.length === 0) return
      const names = gained.map((clue) => story.clues[clue]?.title).filter(Boolean).join('、')
      showToast(`发现线索 · ${names}`, 'clue')
    },
    [showToast],
  )

  const commitRun = useCallback(
    (next: GameState) => {
      const before = gameRef.current
      setRun(next)
      persistAuto(next)
      if (before) announceClues(before, next)
      window.setTimeout(() => audioEngine.setScene(next.scene), 0)
    },
    [announceClues, persistAuto, setRun],
  )

  const startNewGame = useCallback(() => {
    void audioEngine.ensure()
    const next = createNewGame(story)
    unlockedEndingRef.current = ''
    setRun(next)
    persistAuto(next)
    setScreen('game')
    setModal(null)
    setConfirmKind(null)
    setNotice(null)
    setAutoSavedAt(Date.now())
    audioEngine.setScene(next.scene)
  }, [persistAuto, setRun])

  const requestNewGame = useCallback(() => {
    setNotice(null)
    if (hasAuto) {
      setModal(null)
      setConfirmKind('new-game')
      return
    }
    startNewGame()
  }, [hasAuto, startNewGame])

  const continueGame = useCallback(() => {
    try {
      const save = loadGame('auto', story)
      if (!save) {
        setHasAuto(false)
        showToast('没有找到可继续的自动存档。', 'error')
        return
      }
      void audioEngine.ensure().then(() => audioEngine.setScene(save.state.scene))
      setRun(save.state)
      setScreen('game')
      setAutoSavedAt(save.savedAt)
      setHasAuto(true)
      setNotice(null)
      setModal(null)
    } catch (error) {
      const message =
        error instanceof SaveError
          ? error.message
          : '读取自动存档时出现了未知错误。请重新开始，或检查浏览器的本地存储权限。'
      setHasAuto(false)
      setNotice({ title: '存档无法读取', message })
    }
  }, [setRun, showToast])

  const toggleMute = useCallback(() => {
    const next = { ...settings, muted: !settings.muted }
    setSettings(next)
    saveSettings(next)
    audioEngine.setMuted(next.muted)
    if (!next.muted) {
      void audioEngine.ensure()
      showToast('声音已开启', 'info')
    } else {
      showToast('已静音', 'info')
    }
  }, [settings, showToast])

  const updateSettings = useCallback((next: Settings) => {
    const shouldStartAudio = screen === 'game' && settings.muted && !next.muted
    setSettings(next)
    saveSettings(next)
    audioEngine.setVolume(next.volume)
    audioEngine.setMuted(next.muted)
    if (shouldStartAudio) void audioEngine.ensure()
  }, [screen, settings.muted])

  const advance = useCallback(() => {
    const current = gameRef.current
    if (!current) return
    const node = currentNode(current, story)
    if (node.kind === 'ending' && current.lineIndex >= node.lines.length) return
    const next = advanceLine(current, story)
    commitRun(next)
  }, [commitRun])

  const choose = useCallback(
    (option: StoryOption) => {
      const current = gameRef.current
      if (!current) return
      try {
        const next = chooseOption(current, option, story)
        commitRun(next)
      } catch (error) {
        console.error(error)
        showToast('这个选项当前不可用，已留在原节点。', 'error')
      }
    },
    [commitRun, showToast],
  )

  const saveManual = useCallback(() => {
    const current = gameRef.current
    if (!current) return
    if (saveGame('manual', current)) {
      setHasManual(true)
      setManualSavedAt(Date.now())
      showToast('已写入手动存档。', 'info')
    } else {
      showToast('手动存档写入失败，请检查浏览器存储空间。', 'error')
    }
  }, [showToast])

  const doLoadManual = useCallback(() => {
    try {
      const save = loadGame('manual', story)
      if (!save) {
        setHasManual(false)
        setNotice({ title: '没有手动存档', message: '这个存档位还是空的。请先在游戏菜单中写入手动存档。' })
        return
      }
      setRun(save.state)
      persistAuto(save.state)
      setScreen('game')
      setModal(null)
      setConfirmKind(null)
      setNotice(null)
      setManualSavedAt(save.savedAt)
      setHasManual(true)
      showToast('已读取手动存档。', 'info')
      void audioEngine.ensure().then(() => audioEngine.setScene(save.state.scene))
    } catch (error) {
      const message =
        error instanceof SaveError
          ? error.message
          : '读取手动存档时出现了未知错误。'
      setHasManual(false)
      setNotice({ title: '存档无法读取', message })
    }
  }, [persistAuto, setRun, showToast])

  const requestLoadManual = useCallback(() => {
    setModal(null)
    setConfirmKind('load-manual')
  }, [])

  const returnToTitle = useCallback(() => {
    setScreen('title')
    setModal(null)
    setConfirmKind(null)
    setRun(null)
  }, [setRun])

  const handleInstall = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    if (!install.canInstall) {
      setModal('settings')
      showToast('请按“安装与离线”中的说明手动添加到主屏幕。', 'info')
      return 'unavailable'
    }
    const result = await install.install()
    if (result === 'accepted') {
      showToast('安装请求已发送。安装完成后可从桌面图标离线启动。', 'info')
    } else if (result === 'dismissed') {
      showToast('已取消安装。你仍然可以在离线状态下使用浏览器游玩。', 'info')
    }
    return result
  }, [install, showToast])

  // Theme and reading preferences applied to the document.
  useEffect(() => {
    const root = document.documentElement
    root.dataset.fontSize = settings.fontSize
    root.dataset.reduceMotion = settings.reduceMotion ? 'true' : 'false'
    audioEngine.setVolume(settings.volume)
    audioEngine.setMuted(settings.muted)
  }, [settings.fontSize, settings.reduceMotion, settings.volume, settings.muted])

  useEffect(() => {
    audioEngine.setScene(game?.scene ?? 'street')
  }, [game?.scene])

  useEffect(() => {
    document.body.classList.toggle('has-modal', Boolean(modal || confirmKind || notice))
    return () => document.body.classList.remove('has-modal')
  }, [modal, confirmKind, notice])

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (confirmKind) setConfirmKind(null)
      else if (notice) setNotice(null)
      else if (modal) setModal(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirmKind, modal, notice])

  useEffect(() => {
    const onUpdate = () => {
      setUpdateReady(true)
      showToast('新版本已缓存，刷新页面后生效。', 'info')
    }
    const onOnline = () => {
      setOffline(false)
      showToast('网络已恢复。', 'info')
    }
    const onOffline = () => {
      setOffline(true)
      showToast('网络已断开，游戏继续使用本地缓存。', 'info')
    }
    window.addEventListener('pwa-update-ready', onUpdate)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('pwa-update-ready', onUpdate)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [showToast])

  useEffect(() => {
    if (install.justInstalled && !installToastShown.current) {
      installToastShown.current = true
      showToast('已安装为应用。现在可以断网启动。', 'info')
    }
  }, [install.justInstalled, showToast])

  // Unlock an ending only after the final line has actually been read.
  useEffect(() => {
    if (!game || screen !== 'game') return
    const node = currentNode(game, story)
    if (!isEndingComplete(game, story) || node.kind !== 'ending') return
    const key = `${node.id}:${game.lineIndex}`
    if (unlockedEndingRef.current === key) return
    unlockedEndingRef.current = key
    const isNewEnding = !unlocks.endings.includes(node.ending)
    const next = unlockEnding(unlocks, node.ending, game.clues)
    setUnlocks(next)
    if (isNewEnding) {
      showToast(`结局已收录 · ${story.endings[node.ending].title}`, 'clue')
    }
  }, [game, screen, showToast, unlocks])

  // PWA shortcut: /?continue=1 opens the most recent automatic save.
  useEffect(() => {
    if (autoContinued.current) return
    autoContinued.current = true
    const params = new URLSearchParams(window.location.search)
    if (params.get('continue') !== '1') return
    window.history.replaceState(null, '', window.location.pathname)
    if (hasAuto) continueGame()
    else showToast('没有找到可继续的自动存档。', 'info')
  }, [continueGame, hasAuto, showToast])

  const ending: EndingId | null = useMemo(() => {
    if (!game) return null
    const node = currentNode(game, story)
    return node.kind === 'ending' ? node.ending : null
  }, [game])

  const blocked = Boolean(modal || confirmKind || notice)

  const modalMeta = modal ? MODAL_TITLES[modal] : null

  const confirmCopy: Record<ConfirmKind, { title: string; eyebrow: string; body: string; confirm: string }> = {
    'new-game': {
      title: '开始新的末班车？',
      eyebrow: 'NEW RUN',
      body: '这会覆盖自动存档，并清空当前周目的线索、选择和历史记录。三个已解锁结局、设置与手动存档会保留。',
      confirm: '开始新周目',
    },
    restart: {
      title: '重新开始本周目？',
      eyebrow: 'RESTART',
      body: '当前周目的进度、线索与历史会被清空，自动存档会被新的开局覆盖。结局图鉴和手动存档不受影响。',
      confirm: '重新开始',
    },
    'load-manual': {
      title: '读取手动存档？',
      eyebrow: 'LOAD SAVE',
      body: '当前进度会被手动存档替换，自动存档也会同步为读档后的状态。读档后仍会继续自动保存。',
      confirm: '读取存档',
    },
  }

  const confirmData = confirmKind ? confirmCopy[confirmKind] : null

  return (
    <>
      {screen === 'title' || !game ? (
        <TitleScreen
          hasAuto={hasAuto}
          hasManual={hasManual}
          unlockedCount={unlocks.endings.length}
          reduceMotion={settings.reduceMotion}
          canInstall={install.canInstall}
          installed={install.installed}
          updateReady={updateReady}
          onStart={requestNewGame}
          onContinue={continueGame}
          onSettings={() => setModal('settings')}
          onGallery={() => setModal('gallery')}
          onInstall={() => void handleInstall()}
          onReload={() => window.location.reload()}
        />
      ) : (
        <GameScreen
          story={story}
          game={game}
          settings={settings}
          blocked={blocked}
          endingUnlocked={Boolean(ending && unlocks.endings.includes(ending))}
          onAdvance={advance}
          onChoose={choose}
          onOpenHistory={() => setModal('history')}
          onOpenClues={() => setModal('clues')}
          onOpenMenu={() => setModal('menu')}
          onToggleMute={toggleMute}
          onCue={(cue) => audioEngine.cue(cue)}
          onTitle={returnToTitle}
          onGallery={() => setModal('gallery')}
          onRestart={() => {
            setModal(null)
            setConfirmKind('restart')
          }}
        />
      )}

      {modal && modalMeta ? (
        <Modal
          title={modalMeta.title}
          eyebrow={modalMeta.eyebrow}
          wide={modal === 'settings' || modal === 'gallery' || modal === 'saves'}
          onClose={() => setModal(null)}
          footer={
            modal === 'settings' ? (
              <button className="button is-primary" onClick={() => setModal(null)}>
                完成
              </button>
            ) : modal === 'menu' ? null : (
              <button className="button is-quiet" onClick={() => setModal(null)}>
                关闭
              </button>
            )
          }
        >
          {modal === 'settings' ? (
            <SettingsPanel
              settings={settings}
              onChange={updateSettings}
              onInstall={handleInstall}
              canInstall={install.canInstall}
              installed={install.installed}
            />
          ) : null}
          {modal === 'history' ? <HistoryPanel history={game?.history ?? []} /> : null}
          {modal === 'clues' ? <CluePanel story={story} clues={(game?.clues ?? []) as ClueId[]} /> : null}
          {modal === 'saves' && game ? (
            <SavePanel
              game={game}
              autoSavedAt={autoSavedAt}
              manualSavedAt={manualSavedAt}
              hasManual={hasManual}
              onSaveManual={saveManual}
              onLoadManual={requestLoadManual}
            />
          ) : null}
          {modal === 'menu' ? (
            <MenuPanel
              onResume={() => setModal(null)}
              onSaves={() => setModal('saves')}
              onSettings={() => setModal('settings')}
              onHistory={() => setModal('history')}
              onClues={() => setModal('clues')}
              onTitle={returnToTitle}
              onRestart={() => {
                setModal(null)
                setConfirmKind('restart')
              }}
            />
          ) : null}
          {modal === 'gallery' ? <GalleryPanel story={story} unlocks={unlocks} /> : null}
        </Modal>
      ) : null}

      {confirmKind && confirmData ? (
        <ConfirmDialog
          title={confirmData.title}
          eyebrow={confirmData.eyebrow}
          body={<p>{confirmData.body}</p>}
          confirmLabel={confirmData.confirm}
          danger={confirmKind !== 'load-manual'}
          onCancel={() => setConfirmKind(null)}
          onConfirm={() => {
            if (confirmKind === 'load-manual') doLoadManual()
            else startNewGame()
          }}
        />
      ) : null}

      {notice ? (
        <Modal
          title={notice.title}
          eyebrow="SAVE NOTICE"
          onClose={() => setNotice(null)}
          footer={
            <button className="button is-primary" onClick={() => setNotice(null)}>
              知道了
            </button>
          }
        >
          <div className="prose prose-small">
            <p>{notice.message}</p>
            <p className="fine-print">
              坏档会被保存在浏览器的本地存储备份键中，不会被自动覆盖。开始新游戏可以创建一个干净的进度。
            </p>
            <button className="button is-quiet" onClick={requestNewGame}>
              开始新周目
            </button>
          </div>
        </Modal>
      ) : null}

      {toast ? (
        <div className={`toast is-${toast.tone}`} role="status" aria-live="polite">
          <span>{toast.text}</span>
          <button aria-label="关闭提示" onClick={() => setToast(null)}>
            ×
          </button>
        </div>
      ) : null}

      {offline ? <div className="offline-mark">离线 · 本地缓存</div> : null}
    </>
  )
}
