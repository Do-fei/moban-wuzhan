import type { SceneId } from '../game/types'

type Cue = 'chime' | 'brake' | 'bell' | 'radio' | 'footstep'

type Ambient = {
  gain: GainNode
  stop: () => void
}

function makeNoiseBuffer(ctx: AudioContext, seconds = 3): AudioBuffer {
  const length = Math.floor(ctx.sampleRate * seconds)
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < length; i += 1) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = last * 3.2
  }
  return buffer
}

export class AudioEngine {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private ambient: Ambient | null = null
  private noise: AudioBuffer | null = null
  private volume = 0.55
  private muted = false
  private scene: SceneId = 'street'

  get active(): boolean {
    return Boolean(this.ctx) && !this.muted && this.volume > 0
  }

  async ensure(): Promise<void> {
    if (typeof window === 'undefined') return
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      this.ctx = new Ctor()
      this.master = this.ctx.createGain()
      this.master.gain.value = this.muted ? 0 : this.volume
      this.master.connect(this.ctx.destination)
      this.noise = makeNoiseBuffer(this.ctx)
    }
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume()
      } catch {
        // Browsers can reject resume without a direct gesture. A later click will retry.
      }
    }
    this.applyGain()
    this.switchAmbient(this.scene)
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))
    this.applyGain()
  }

  setMuted(muted: boolean): void {
    this.muted = muted
    this.applyGain()
  }

  setScene(scene: SceneId): void {
    this.scene = scene
    if (this.ctx) this.switchAmbient(scene)
  }

  private applyGain(): void {
    if (!this.ctx || !this.master) return
    const target = this.muted ? 0 : this.volume
    this.master.gain.setTargetAtTime(target, this.ctx.currentTime, 0.08)
  }

  private switchAmbient(scene: SceneId): void {
    if (!this.ctx || !this.master || !this.noise) return
    if (this.ambient) {
      const old = this.ambient
      old.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.35)
      window.setTimeout(() => old.stop(), 1400)
      this.ambient = null
    }
    if (this.muted || this.volume <= 0) return

    const ctx = this.ctx
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.connect(this.master)
    gain.gain.setTargetAtTime(0.85, ctx.currentTime, 1.1)

    const sources: AudioScheduledSourceNode[] = []
    const addOsc = (frequency: number, type: OscillatorType, level: number, detune = 0) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = type
      osc.frequency.value = frequency
      osc.detune.value = detune
      oscGain.gain.value = level
      osc.connect(oscGain).connect(gain)
      osc.start()
      sources.push(osc)
    }
    const addNoise = (
      type: BiquadFilterType,
      frequency: number,
      level: number,
      q = 0.7,
    ) => {
      if (!this.noise) return
      const source = ctx.createBufferSource()
      source.buffer = this.noise
      source.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = type
      filter.frequency.value = frequency
      filter.Q.value = q
      const noiseGain = ctx.createGain()
      noiseGain.gain.value = level
      source.connect(filter).connect(noiseGain).connect(gain)
      source.start()
      sources.push(source)
    }

    if (scene === 'bus' || scene === 'lost-bus') {
      addOsc(scene === 'lost-bus' ? 41 : 48, 'sine', 0.045, -6)
      addOsc(scene === 'lost-bus' ? 82 : 96, 'triangle', 0.012, 4)
      addNoise('lowpass', scene === 'lost-bus' ? 140 : 230, 0.035)
      addNoise('bandpass', 700, 0.006, 1.4)
    } else if (scene === 'street' || scene === 'ghost-stop') {
      addOsc(55, 'sine', 0.018, -9)
      addNoise('lowpass', 580, 0.05)
      addNoise('bandpass', 1200, 0.012, 1.8)
    } else if (scene === 'alley' || scene === 'courtyard' || scene === 'well') {
      addOsc(scene === 'well' ? 43 : 61, 'sine', 0.025, -5)
      addNoise('lowpass', scene === 'well' ? 320 : 460, 0.042)
      addNoise('highpass', 2800, 0.006)
    } else if (scene === 'return') {
      addOsc(73, 'triangle', 0.02, 7)
      addNoise('lowpass', 760, 0.045)
    } else if (scene === 'dawn' || scene === 'truth') {
      addOsc(scene === 'truth' ? 196 : 146, 'sine', 0.012, 2)
      addOsc(scene === 'truth' ? 294 : 220, 'sine', 0.006, -3)
      addNoise('lowpass', 900, 0.018)
    } else {
      addOsc(55, 'sine', 0.014)
      addNoise('lowpass', 500, 0.025)
    }

    this.ambient = {
      gain,
      stop: () => {
        for (const source of sources) {
          try {
            source.stop()
          } catch {
            // Already stopped.
          }
        }
        try {
          gain.disconnect()
        } catch {
          // Already disconnected.
        }
      },
    }
  }

  cue(cue: Cue): void {
    if (!this.ctx || !this.master || this.muted || this.volume <= 0) return
    const ctx = this.ctx
    const now = ctx.currentTime
    const output = ctx.createGain()
    output.gain.value = 0.5
    output.connect(this.master)

    if (cue === 'chime') {
      this.tone(660, 0.16, now, output, 'sine', 0.08)
      this.tone(880, 0.22, now + 0.15, output, 'sine', 0.055)
    } else if (cue === 'bell') {
      this.tone(196, 1.8, now, output, 'sine', 0.08)
      this.tone(392, 1.1, now, output, 'sine', 0.035)
      this.tone(523.25, 0.7, now + 0.02, output, 'triangle', 0.018)
    } else if (cue === 'brake') {
      this.noiseHit(now, 0.18, 420, 0.025, output)
    } else if (cue === 'radio') {
      this.noiseHit(now, 0.4, 1800, 0.018, output)
      this.tone(740, 0.05, now + 0.1, output, 'square', 0.012)
      this.tone(880, 0.05, now + 0.25, output, 'square', 0.01)
    } else {
      this.noiseHit(now, 0.12, 230, 0.032, output)
      this.noiseHit(now + 0.32, 0.1, 210, 0.02, output)
    }
  }

  private tone(
    frequency: number,
    duration: number,
    at: number,
    output: GainNode,
    type: OscillatorType,
    level: number,
  ): void {
    if (!this.ctx) return
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.value = frequency
    gain.gain.setValueAtTime(0, at)
    gain.gain.linearRampToValueAtTime(level, at + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)
    osc.connect(gain).connect(output)
    osc.start(at)
    osc.stop(at + duration + 0.05)
  }

  private noiseHit(
    at: number,
    duration: number,
    frequency: number,
    level: number,
    output: GainNode,
  ): void {
    if (!this.ctx || !this.noise) return
    const source = this.ctx.createBufferSource()
    const filter = this.ctx.createBiquadFilter()
    const gain = this.ctx.createGain()
    source.buffer = this.noise
    filter.type = 'bandpass'
    filter.frequency.value = frequency
    filter.Q.value = 0.8
    gain.gain.setValueAtTime(0, at)
    gain.gain.linearRampToValueAtTime(level, at + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, at + duration)
    source.connect(filter).connect(gain).connect(output)
    source.start(at)
    source.stop(at + duration + 0.02)
  }
}

export const audioEngine = new AudioEngine()
