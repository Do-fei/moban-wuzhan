import SceneArt from './SceneArt'
import { IconArrow, IconBook, IconInstall, IconSettings } from './Icons'

interface Props {
  hasAuto: boolean
  hasManual: boolean
  unlockedCount: number
  reduceMotion: boolean
  canInstall: boolean
  installed: boolean
  updateReady: boolean
  onStart: () => void
  onContinue: () => void
  onSettings: () => void
  onGallery: () => void
  onInstall: () => void
  onReload: () => void
}

export function TitleScreen({
  hasAuto,
  hasManual,
  unlockedCount,
  reduceMotion,
  canInstall,
  installed,
  updateReady,
  onStart,
  onContinue,
  onSettings,
  onGallery,
  onInstall,
  onReload,
}: Props) {
  return (
    <main className="title-screen">
      <SceneArt scene="title" reduceMotion={reduceMotion} />
      <div className="title-shade" />
      <div className="title-frame">
        <header className="title-kicker">
          <span className="kicker-line" />
          <span>深秋 · 北新桥 · 末班</span>
          <span className="kicker-line" />
        </header>

        <div className="title-lockup">
          <div className="title-mark" aria-hidden="true">
            <span>十</span>
            <span>三</span>
          </div>
          <h1>
            <span>末班</span>
            <span className="title-accent">无站</span>
          </h1>
          <p className="title-subtitle">北新桥夜行记</p>
          <p className="title-tagline">过了北新桥，别应名字。</p>
        </div>

        <nav className="title-actions" aria-label="开始">
          <button className="title-button is-main" onClick={onStart}>
            <span>
              开始游戏
              <small>新的末班车</small>
            </span>
            <IconArrow />
          </button>
          <button className="title-button" onClick={onContinue} disabled={!hasAuto}>
            <span>
              继续游戏
              <small>{hasAuto ? '从最近一次自动存档继续' : '还没有可继续的进度'}</small>
            </span>
            <IconArrow />
          </button>
          <div className="title-minor">
            <button className="text-button" onClick={onGallery}>
              <IconBook size={18} />
              结局图鉴
              <span className="count">{unlockedCount}/3</span>
            </button>
            <button className="text-button" onClick={onSettings}>
              <IconSettings size={18} />
              设置
            </button>
            {canInstall ? (
              <button className="text-button" onClick={onInstall}>
                <IconInstall size={18} />
                安装到桌面
              </button>
            ) : null}
          </div>
        </nav>

        <footer className="title-footer">
          <p>单周目约 25—35 分钟 · 6 章 · 3 个结局</p>
          <p className="fine-print">
            本作人物与事件均为虚构，借用了旧城传说与末班公交的意象，不构成地方史实。
            {installed ? ' · 已安装为应用' : hasManual ? ' · 手动存档可用' : ''}
          </p>
          {updateReady ? (
            <button className="update-note" onClick={onReload}>
              新版本已缓存，点击刷新进入
            </button>
          ) : null}
        </footer>
      </div>
      <div className="title-seal" aria-hidden="true">
        <span>井</span>
        <small>封</small>
      </div>
    </main>
  )
}
