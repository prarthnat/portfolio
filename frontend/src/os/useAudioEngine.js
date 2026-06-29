import { useCallback, useEffect, useRef } from "react";

/**
 * Single shared WebAudio engine. Drives:
 *   - UI clicks (FM bell + tiny pop) — always available
 *   - Music: track-specific chord-loop synth that the user explicitly starts.
 */
export function useAudioEngine({ playingTrack }) {
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const musicIntervalRef = useRef(null);
  const stepRef = useRef(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        ctxRef.current = new Ctx();
        masterRef.current = ctxRef.current.createGain();
        masterRef.current.gain.value = 0.18;
        masterRef.current.connect(ctxRef.current.destination);
      } catch (e) {
        return null;
      }
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  // ---------- Click sound: FM bell + tiny square pop ----------
  const click = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const master = masterRef.current;
    const t = ctx.currentTime;

    const car = ctx.createOscillator();
    const carGain = ctx.createGain();
    car.type = "sine";
    car.frequency.value = 1320;

    const mod = ctx.createOscillator();
    const modGain = ctx.createGain();
    mod.type = "sine";
    mod.frequency.value = 880;
    modGain.gain.value = 600;
    mod.connect(modGain).connect(car.frequency);

    carGain.gain.setValueAtTime(0.0001, t);
    carGain.gain.exponentialRampToValueAtTime(0.18, t + 0.005);
    carGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    car.connect(carGain).connect(master);
    mod.start(t);
    car.start(t);
    mod.stop(t + 0.18);
    car.stop(t + 0.18);

    const pop = ctx.createOscillator();
    const popG = ctx.createGain();
    pop.type = "square";
    pop.frequency.value = 220;
    popG.gain.setValueAtTime(0.0001, t);
    popG.gain.exponentialRampToValueAtTime(0.04, t + 0.002);
    popG.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    pop.connect(popG).connect(master);
    pop.start(t);
    pop.stop(t + 0.05);
  }, [getCtx]);

  // ---------- Music loop driven by playingTrack ----------
  useEffect(() => {
    if (musicIntervalRef.current) {
      clearInterval(musicIntervalRef.current);
      musicIntervalRef.current = null;
    }
    if (!playingTrack) return;
    const ctx = getCtx();
    if (!ctx) return;
    const master = masterRef.current;
    const { chords, bass, tempoMs } = playingTrack;
    stepRef.current = 0;

    musicIntervalRef.current = setInterval(() => {
      if (ctx.state === "closed") return;
      const s = stepRef.current;
      const bar = Math.floor(s / 8) % chords.length;
      const noteInBar = s % 8;
      const arp = chords[bar];
      const lead = arp[[0, 2, 1, 3, 2, 0, 3, 1][noteInBar]];
      const t = ctx.currentTime;

      // Lead — triangle
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = lead;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.14, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.32);

      // Sparkle on downbeat even notes
      if (noteInBar % 2 === 0) {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = "sine";
        o2.frequency.value = lead * 2;
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o2.connect(g2).connect(master);
        o2.start(t);
        o2.stop(t + 0.22);
      }

      // Bass on beats 0 and 4
      if (noteInBar === 0 || noteInBar === 4) {
        const b = ctx.createOscillator();
        const bg = ctx.createGain();
        b.type = "sine";
        b.frequency.value = bass[bar];
        bg.gain.setValueAtTime(0.0001, t);
        bg.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
        bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
        b.connect(bg).connect(master);
        b.start(t);
        b.stop(t + 0.55);
      }

      stepRef.current = s + 1;
    }, tempoMs);

    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
    };
  }, [playingTrack, getCtx]);

  return { click };
}
