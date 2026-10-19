import type { GameState } from '../game/types'
import { story } from '../game/story'
import { IconSave } from './Icons'

interface Props {
  game: GameState
  autoSavedAt: number | null
  manualSavedAt: number | null
  hasManual: boolean
  onSaveManual: () => void
  onLoadManual: () => void
}

function formatTime(value: number | null): string {
  if (!value) return '尚无记录'
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return '时间未知'
  }
}

export function SavePanel({ game, autoSavedAt, manualSavedAt, hasManual, onSaveManual, onLoadManual }: Props) {
  const chapterName = story.chapters[game.chapter - 1] ?? '未知章节'
  return (
    <div className="save-panel">
      <p className="panel-intro">
        自动存档在每次推进对白和做出选择后写入。手动存档位与本轮自动进度相互独立，可用来保存一个想回看的节点。
      </p>
      <div className="save-slot is-auto">
        <div className="save-slot-head">
          <span className="slot-tag">自动</span>
          <span className="slot-time">{formatTime(autoSavedAt)}</span>
        </div>
        <h3>{chapterName}</h3>
        <p>{story.nodes[game.nodeId]?.place ?? '当前进度'} · 已发现 {game.clues.length} 条线索</p>
        <span className="slot-status">持续写入中</span>
      </div>
      <div className="save-slot">
        <div className="save-slot-head">
          <span className="slot-tag">手动 01</span>
          <span className="slot-time">{hasManual ? formatTime(manualSavedAt) : '空存档位'}</span>
        </div>
        <h3>{hasManual ? '已保存的进度' : '一个空的存档位'}</h3>
        <p>{hasManual ? '读取后会回到保存时的对白、变量和线索。' : '写入当前节点，最多保留一份。'}</p>
        <div className="save-actions">
          <button className="button is-primary" onClick={onSaveManual}>
            <IconSave size={17} />
            {hasManual ? '覆盖手动存档' : '写入手动存档'}
          </button>
          <button className="button is-quiet" onClick={onLoadManual} disabled={!hasManual}>
            读取手动存档
          </button>
        </div>
      </div>
      <p className="fine-print">
        存档包含版本号。若存档损坏或来自不兼容版本，游戏会保留一份坏档备份，并给出提示，不会静默覆盖。
      </p>
    </div>
  )
}
