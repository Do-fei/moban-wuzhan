import { IconBook, IconClue, IconHistory, IconSave, IconSettings } from './Icons'

interface Props {
  onResume: () => void
  onSaves: () => void
  onSettings: () => void
  onHistory: () => void
  onClues: () => void
  onTitle: () => void
  onRestart: () => void
}

export function MenuPanel({ onResume, onSaves, onSettings, onHistory, onClues, onTitle, onRestart }: Props) {
  return (
    <div className="menu-panel">
      <p className="panel-intro">自动存档已经在后台写入。可以在这里检查存档、调整阅读设置，或返回标题。</p>
      <div className="menu-grid">
        <button className="menu-button" onClick={onResume}>
          <span className="menu-icon"><IconBook /></span>
          <span><b>继续阅读</b><small>回到刚才那一句</small></span>
        </button>
        <button className="menu-button" onClick={onSaves}>
          <span className="menu-icon"><IconSave /></span>
          <span><b>存档</b><small>自动与手动存档</small></span>
        </button>
        <button className="menu-button" onClick={onHistory}>
          <span className="menu-icon"><IconHistory /></span>
          <span><b>历史记录</b><small>本周目的对白与选择</small></span>
        </button>
        <button className="menu-button" onClick={onClues}>
          <span className="menu-icon"><IconClue /></span>
          <span><b>线索</b><small>已经确认的旧物与证词</small></span>
        </button>
        <button className="menu-button" onClick={onSettings}>
          <span className="menu-icon"><IconSettings /></span>
          <span><b>设置</b><small>声音、字号与显示速度</small></span>
        </button>
        <button className="menu-button" onClick={onTitle}>
          <span className="menu-icon">←</span>
          <span><b>回到标题</b><small>当前进度已自动保存</small></span>
        </button>
      </div>
      <button className="text-button danger-text" onClick={onRestart}>重新开始本周目</button>
    </div>
  )
}
