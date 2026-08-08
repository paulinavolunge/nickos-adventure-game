import { useCallback } from "react";
import { useSave } from "./progress";

type Sound = "tap" | "good" | "oops" | "heart" | "fanfare";

const NOTES: Record<Sound, number[]> = {
  tap: [660],
  good: [660, 880],
  oops: [330, 262],
  heart: [784, 988, 1175],
  fanfare: [523, 659, 784, 1047],
};

/** Tiny WebAudio chimes — no asset downloads, respects the sound setting. */
export function useSfx() {
  const { data } = useSave();
  const enabled = data.settings.sound;

  return useCallback(
    (sound: Sound) => {
      if (!enabled || typeof window === "undefined") return;
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return;
      try {
        const ctx = new Ctx();
        NOTES[sound].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.value = freq;
          const start = ctx.currentTime + i * 0.09;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.26);
          osc.connect(gain).connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.3);
        });
        setTimeout(() => ctx.close(), 900);
      } catch {
        /* audio unavailable */
      }
    },
    [enabled],
  );
}
