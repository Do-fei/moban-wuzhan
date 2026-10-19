import type { EndingId, Story, Unlocks } from '../game/types'

interface Props {
  story: Story
  unlocks: Unlocks
}

const ORDER: EndingId[] = ['survive', 'lost', 'truth']

export function GalleryPanel({ story, unlocks }: Props) {
  const unlocked = new Set(unlocks.endings)
  return (
    <div className="gallery-panel">
      <p className="panel-intro">
        结局会在读者抵达终章并读完最后一句后收录。解锁记录与设置保存在本机，开始新周目不会清除。
      </p>
      <div className="gallery-progress">
        <span>收录进度</span>
        <div className="gallery-track">
          {ORDER.map((id) => (
            <span key={id} className={unlocked.has(id) ? 'is-filled' : ''} />
          ))}
        </div>
        <b>{unlocked.size} / 3</b>
      </div>
      <div className="ending-grid">
        {ORDER.map((id, index) => {
          const ending = story.endings[id]
          const isUnlocked = unlocked.has(id)
          return (
            <article key={id} className={`ending-card${isUnlocked ? ' is-unlocked' : ' is-locked'}`}>
              <div className="ending-card-top">
                <span className="ending-index">0{index + 1}</span>
                <span>{isUnlocked ? ending.subtitle : '未解锁'}</span>
              </div>
              {isUnlocked ? (
                <>
                  <h3>{ending.title}</h3>
                  <p>{ending.description}</p>
                  <div className="ending-card-foot">已收录</div>
                </>
              ) : (
                <>
                  <h3>？？？</h3>
                  <p>这条夜路还没有走到尽头。继续故事，或者带着不同的判断再坐一次末班车。</p>
                  <div className="ending-card-foot">未收录</div>
                </>
              )}
            </article>
          )
        })}
      </div>
      <p className="fine-print">
        已见过的线索 {unlocks.seenClues.length} / {Object.keys(story.clues).length}。图鉴只记录结局与见闻，不提供直达结局的按钮。
      </p>
    </div>
  )
}
