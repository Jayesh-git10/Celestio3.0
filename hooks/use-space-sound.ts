"use client";

import { useCallback, useRef } from "react";

/**
 * A custom hook to synthesize subtle "Space UI" sound effects 
 * using the Web Audio API. 
 * Features:
 * - 'hover': A short, high-frequency "blip"
 * - 'click': A resonant "pulse"
 * - 'shimmer': A rising frequency "reveal"
 */
export function useSpaceSound() {
  const audioContext = useRef<AudioContext | null>(null);

  const initContext = useCallback(() => {
    if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext.current.state === 'suspended') {
        audioContext.current.resume();
    }
  }, []);

  const playHover = useCallback(() => {
    initContext();
    const ctx = audioContext.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, [initContext]);

  const playClick = useCallback(() => {
    initContext();
    const ctx = audioContext.current!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  }, [initContext]);

  return { playHover, playClick };
}
