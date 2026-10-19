import type { ClueId, Story } from '../game/types'

interface Props {
  story: Story
  clues: ClueId[]
}

export function CluePanel({ story, clues }: Props) {
  const allClues = Object.values(story.clues)
  const remaining = allClues.length - clues.length
  return (
    <div className="clue-panel">
      <p className="panel-intro">
        你在这个周目里确认过的实物与证词。线索只在本周目有效；有些话，听漏了就得再坐一次末班车。
      </p>
      <div className="clue-count">
        <b>{String(clues.length).padStart(2, '0')}</b>
        <span>/ {String(allClues.length).padStart(2, '0')} 条线索</span>
      </div>
      {clues.length === 0 ? (
        <p className="empty-state">还什么都没有发现。先看看座椅缝、门墩和那台旧收音机。</p>
      ) : (
        <ul className="clue-list">
          {allClues
            .filter((clue) => clues.includes(clue.id))
            .map((clue, index) => (
              <li key={clue.id}>
                <span className="clue-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{clue.title}</h3>
                  <p>{clue.summary}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
      {remaining > 0 ? <p className="clue-remaining">还有 {remaining} 处没有被确认。</p> : <p className="clue-remaining">所有线索都已收齐。</p>}
    </div>
  )
}
