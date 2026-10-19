import type { Settings } from '../game/types'
import { IconInstall } from './Icons'

interface Props {
  settings: Settings
  onChange: (next: Settings) => void
  onInstall: () => Promise<'accepted' | 'dismissed' | 'unavailable'>
  canInstall: boolean
  installed: boolean
  compact?: boolean
}

const SPEEDS: Array<{ value: Settings['textSpeed']; label: string; note: string }> = [
  { value: 'slow', label: '慢', note: '适合慢慢读' },
  { value: 'normal', label: '中', note: '默认' },
  { value: 'fast', label: '快', note: '利落' },
  { value: 'instant', label: '瞬显', note: '整句出现' },
]

const SIZES: Array<{ value: Settings['fontSize']; label: string }> = [
  { value: 'sm', label: '小' },
  { value: 'md', label: '中' },
  { value: 'lg', label: '大' },
]

export function SettingsPanel({ settings, onChange, onInstall, canInstall, installed, compact = false }: Props) {
  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <div className={`settings${compact ? ' is-compact' : ''}`}>
      <section className="settings-section">
        <div className="section-heading">
          <span>声音</span>
          <span className="section-note">只在点击后播放</span>
        </div>
        <label className="range-row">
          <span>音量</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.volume}
            onChange={(event) => update('volume', Number(event.target.value))}
            aria-label="音量"
          />
          <output>{Math.round(settings.volume * 100)}%</output>
        </label>
        <label className="switch-row">
          <span>
            静音
            <small>关闭环境低鸣与报站提示</small>
          </span>
          <input
            type="checkbox"
            checked={settings.muted}
            onChange={(event) => update('muted', event.target.checked)}
          />
          <span className="switch" aria-hidden="true" />
        </label>
      </section>

      <section className="settings-section">
        <div className="section-heading">
          <span>文字</span>
          <span className="section-note">立即生效</span>
        </div>
        <div className="field-row">
          <span className="field-label">字号</span>
          <div className="segmented" role="group" aria-label="字号">
            {SIZES.map((size) => (
              <button
                key={size.value}
                className={settings.fontSize === size.value ? 'is-active' : ''}
                aria-pressed={settings.fontSize === size.value}
                onClick={() => update('fontSize', size.value)}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>
        <div className="field-row is-stacked">
          <span className="field-label">显示速度</span>
          <div className="speed-grid" role="group" aria-label="文字显示速度">
            {SPEEDS.map((speed) => (
              <button
                key={speed.value}
                className={settings.textSpeed === speed.value ? 'is-active' : ''}
                aria-pressed={settings.textSpeed === speed.value}
                onClick={() => update('textSpeed', speed.value)}
              >
                <b>{speed.label}</b>
                <small>{speed.note}</small>
              </button>
            ))}
          </div>
        </div>
        <label className="switch-row">
          <span>
            减少动态效果
            <small>关闭雾气、雨丝和界面过渡</small>
          </span>
          <input
            type="checkbox"
            checked={settings.reduceMotion}
            onChange={(event) => update('reduceMotion', event.target.checked)}
          />
          <span className="switch" aria-hidden="true" />
        </label>
      </section>

      <section className="settings-section install-section">
        <div className="section-heading">
          <span>安装与离线</span>
          <span className="section-note">PWA</span>
        </div>
        {installed ? (
          <p className="install-note">当前已在独立窗口中运行。断网后仍可从桌面图标启动并游玩全部剧情。</p>
        ) : (
          <>
            {canInstall ? (
              <button
                className="button is-primary install-button"
                onClick={() => {
                  void onInstall().then((result) => {
                    if (result === 'dismissed') window.dispatchEvent(new CustomEvent('install-dismissed'))
                  })
                }}
              >
                <IconInstall />
                安装到桌面
              </button>
            ) : (
              <p className="install-note">
                当前浏览器没有提供程序化安装按钮。这不影响离线游玩。请按下方对应平台的说明手动添加到主屏幕或应用列表。
              </p>
            )}
            <details className="install-help">
              <summary>查看各平台安装方式</summary>
              <div className="install-help-body">
                <p>
                  <b>Android · Chrome / Edge</b>
                  <br />
                  打开浏览器菜单（⋮），选择“安装应用”或“添加到主屏幕”。若只看到“添加到主屏幕”，仍会以浏览器快捷方式打开。
                </p>
                <p>
                  <b>iPhone / iPad · Safari</b>
                  <br />
                  点击底部“分享”按钮，选择“添加到主屏幕”。iOS 不提供网页内的安装弹窗，必须通过分享菜单操作。
                </p>
                <p>
                  <b>桌面 Chrome / Edge</b>
                  <br />
                  地址栏右侧出现安装图标时可直接点击；也可打开浏览器菜单，选择“安装”。安装入口通常只在 localhost 或 HTTPS 下出现。
                </p>
                <p className="fine-print">
                  首次安装并成功打开一次后，Service Worker 会缓存全部游戏资源。之后关闭网络再刷新或从桌面启动，仍可游玩。若开发预览没有注册 Service Worker，请使用生产构建与预览服务器检查离线。
                </p>
              </div>
            </details>
          </>
        )}
      </section>
    </div>
  )
}
