import { useEffect, useRef } from 'react'
import type { HistoryEntry } from '../game/types'

interface Props {
  history: HistoryEntry[]
}

export function HistoryPanel({ history }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' })
  }, [])

  if (history.length === 0) {
    return <p className="empty-state">还没有留下读过的文字。故事开始后，对白和选择都会出现在这里。</p>
  }

  return (
    <div className="history-list">
      <p className="panel-intro">按阅读顺序记录本周目已经显示的对白和选择，刷新或读取存档后会一起恢复。</p>
      {history.map((entry) =>
        entry.kind === 'choice' ? (
          <div className="history-choice" key={entry.id}>
            <span>选择</span>
            <p>{entry.text}</p>
          </div>
        ) : (
          <article className={`history-line${entry.speaker ? '' : ' is-narration'}`} key={entry.id}>
            <span className="history-speaker">{entry.speaker ?? '旁白'}</span>
            <p>{entry.text}</p>
          </article>
        ),
      )}
      <div ref={bottomRef} />
    </div>
  )
}
