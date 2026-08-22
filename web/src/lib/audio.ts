"use client";

/**
 * Procedural Web Audio API Sound Engine (0 KB asset footprint).
 * Synthesizes ultra-subtle, tactile haptic micro-sounds on the fly.
 */

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const SOUND_STORAGE_KEY = "portfolio_sound_fx_enabled";

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }

  return audioCtx;
}

export function initSoundState(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const saved = localStorage.getItem(SOUND_STORAGE_KEY);
    soundEnabled = saved !== null ? saved === "true" : true;
  } catch {
    soundEnabled = true;
  }
  return soundEnabled;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, String(enabled));
      window.dispatchEvent(new CustomEvent("sound_state_change", { detail: enabled }));
    } catch {}
  }
}

export function toggleSound(): boolean {
  const next = !soundEnabled;
  setSoundEnabled(next);
  if (next) {
    playTick();
  }
  return next;
}

/**
 * Micro Mechanical Tick — Crisp haptic click for navigation and buttons.
 */
export function playTick(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  filter.type = "bandpass";
  filter.frequency.setValueAtTime(1400, now);
  filter.Q.setValueAtTime(3.0, now);

  osc.type = "triangle";
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.02);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.028);
}

/**
 * Micro Hover Whispering Tick — Ultra subtle for project card hover.
 */
export function playHover(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(1800, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.015);

  gain.gain.setValueAtTime(0.012, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.02);
}

/**
 * Success Harmonic Chime — Soothing major chord resolution (e.g. copied email, completed task).
 */
export function playSuccess(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Pristine crystal chord)

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + idx * 0.035;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0.0, noteStart);
    gain.gain.linearRampToValueAtTime(0.03, noteStart + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.3);
  });
}

/**
 * High-Tech Inference Pulse — High-frequency computational chirp for live ONNX ML inference.
 */
export function playInference(): void {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Modulation oscillator (FM synth effect)
  const carrier = ctx.createOscillator();
  const mod = ctx.createOscillator();
  const modGain = ctx.createGain();
  const masterGain = ctx.createGain();

  carrier.type = "sine";
  carrier.frequency.setValueAtTime(440, now);
  carrier.frequency.exponentialRampToValueAtTime(880, now + 0.08);

  mod.type = "sawtooth";
  mod.frequency.setValueAtTime(120, now);
  modGain.gain.setValueAtTime(250, now);
  modGain.gain.exponentialRampToValueAtTime(10, now + 0.08);

  mod.connect(carrier.frequency);

  masterGain.gain.setValueAtTime(0.035, now);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

  carrier.connect(masterGain);
  masterGain.connect(ctx.destination);

  mod.start(now);
  carrier.start(now);

  mod.stop(now + 0.13);
  carrier.stop(now + 0.13);
}
