import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import BootScreen from "./BootScreen";
import ThinkingCharacter from "./ThinkingCharacter";
import InvestorDashboard from "./windows/InvestorDashboard";
import GamingConsole from "./windows/GamingConsole";
import SecretLifeBook from "./windows/SecretLifeBook";
import ContactWidget from "./windows/ContactWidget";
import DressUp from "./windows/DressUp";
import MyComputer from "./windows/MyComputer";
import MusicPlayer from "./windows/MusicPlayer";
import { PROFILE } from "./data";

const APPS = {
  computer: { title: "My Computer", icon: "computer", initial: { x: 160, y: 40, w: 560, h: 520 } },
  "ai-investor": {
    title: "AI Investor Dashboard",
    icon: "finance",
    initial: { x: 130, y: 60, w: 820, h: 560 },
  },
  console: {
    title: "Prarthna-Arcade",
    icon: "console",
    initial: { x: 170, y: 80, w: 820, h: 580 },
  },
  book: {
    title: "About Prarthna",
    icon: "book",
    initial: { x: 210, y: 50, w: 760, h: 560 },
  },
  contact: {
    title: "Contact ♡ Messenger",
    icon: "contact",
    initial: { x: 230, y: 80, w: 760, h: 540 },
  },
  music: {
    title: "Pinky Player",
    icon: "music",
    initial: { x: 260, y: 100, w: 620, h: 540 },
  },
  dressup: {
    title: "dress-up.exe",
    icon: "dressup",
    initial: { x: 290, y: 60, w: 720, h: 540 },
  },
};

const ICON_LAYOUT = [
  { id: "computer", label: "computer", name: "computer" },
  { id: "ai-investor", label: "investor", name: "finance" },
  { id: "console", label: "arcade", name: "console" },
  { id: "book", label: "about-me", name: "book" },
  { id: "contact", label: "contact", name: "contact" },
  { id: "music", label: "music", name: "music" },
  { id: "dressup", label: "dress-up", name: "dressup" },
  { id: "bin", label: "recycle bin", name: "bin" },
];

// ----- Audio engine -----------------------------------------------------------
// "Expensive" UI click: tiny FM bell — short attack, quick decay, two-osc.
// Music: arpeggiated triangle melody over soft sine bass, F-Am-Bb-C kawaii loop.
function useAudio(enabled) {
  const ctxRef = useRef(null);
  const masterRef = useRef(null);
  const intervalRef = useRef(null);
  const stepRef = useRef(0);

  // Lazy init context on first interaction
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

  // ----- Music loop -----
  useEffect(() => {
    if (!enabled) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    const ctx = getCtx();
    if (!ctx) return;
    const master = masterRef.current;

    // F major - A minor - Bb major - C major (4 bars). 8 notes per bar.
    const chords = [
      [349.23, 440.0, 523.25, 698.46], // F4 A4 C5 F5
      [440.0, 523.25, 659.25, 880.0], // A4 C5 E5 A5
      [466.16, 587.33, 698.46, 932.33], // Bb4 D5 F5 Bb5
      [523.25, 659.25, 783.99, 1046.5], // C5 E5 G5 C6
    ];
    const bassNotes = [87.31, 110.0, 116.54, 130.81]; // F2 A2 Bb2 C3

    stepRef.current = 0;
    intervalRef.current = setInterval(() => {
      if (!enabled || ctx.state === "closed") return;
      const s = stepRef.current;
      const bar = Math.floor(s / 8) % chords.length;
      const noteInBar = s % 8;
      const arp = chords[bar];
      const note = arp[[0, 2, 1, 3, 2, 0, 3, 1][noteInBar]];

      // Lead — triangle with soft envelope
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = note;
      const t = ctx.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.28);

      // Tiny second voice an octave up at lower volume for sparkle
      if (noteInBar % 2 === 0) {
        const o2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        o2.type = "sine";
        o2.frequency.value = note * 2;
        g2.gain.setValueAtTime(0.0001, t);
        g2.gain.exponentialRampToValueAtTime(0.04, t + 0.01);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o2.connect(g2).connect(master);
        o2.start(t);
        o2.stop(t + 0.2);
      }

      // Bass — sine on bar downbeat (note 0 and 4)
      if (noteInBar === 0 || noteInBar === 4) {
        const b = ctx.createOscillator();
        const bg = ctx.createGain();
        b.type = "sine";
        b.frequency.value = bassNotes[bar];
        bg.gain.setValueAtTime(0.0001, t);
        bg.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        bg.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
        b.connect(bg).connect(master);
        b.start(t);
        b.stop(t + 0.5);
      }

      stepRef.current = s + 1;
    }, 230); // ~130 bpm-ish

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, getCtx]);

  // ----- Click sound: two-osc FM bell, quick decay -----
  const click = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const master = masterRef.current;
    const t = ctx.currentTime;

    // Carrier
    const car = ctx.createOscillator();
    const carGain = ctx.createGain();
    car.type = "sine";
    car.frequency.value = 1320;

    // Modulator
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

    // Tiny pop layer for "expensive" tactility
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

  return { click };
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState([]);
  const [zCounter, setZCounter] = useState(10);
  const [zMap, setZMap] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const { click } = useAudio(soundOn);

  const openApp = useCallback(
    (id) => {
      click();
      setStartOpen(false);
      if (id === "bin") return;
      const meta = APPS[id];
      if (!meta) return;
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id);
        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, closed: false } : w
          );
        }
        return [...prev, { id, title: meta.title, icon: meta.icon, minimized: false, closed: false }];
      });
      setZCounter((c) => c + 1);
      setZMap((m) => ({ ...m, [id]: zCounter + 1 }));
    },
    [click, zCounter]
  );

  const focusWin = useCallback(
    (id) => {
      setZCounter((c) => c + 1);
      setZMap((m) => ({ ...m, [id]: zCounter + 1 }));
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
    },
    [zCounter]
  );

  const closeWin = useCallback(
    (id) => {
      click();
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, closed: true } : w)));
    },
    [click]
  );

  const minimizeWin = useCallback(
    (id) => {
      click();
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
    },
    [click]
  );

  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.closed && !w.minimized);
    if (visible.length === 0) return null;
    let top = visible[0];
    for (const w of visible) {
      if ((zMap[w.id] || 0) > (zMap[top.id] || 0)) top = w;
    }
    return top.id;
  }, [windows, zMap]);

  useEffect(() => {
    if (booted) openApp("computer");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  return (
    <div
      data-testid="desktop"
      className="relative w-screen h-screen overflow-hidden bg-[#ffd1dc] pp-cursor crt no-select"
      style={{
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.4) 0 2px, transparent 3px), radial-gradient(circle at 78% 60%, rgba(255,255,255,0.3) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0 2px, transparent 3px)",
        backgroundSize: "180px 180px",
      }}
      onClick={() => setStartOpen(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-6 right-10 font-silk text-[10px] text-black/40 rotate-[-6deg]">
          ★ prarthnaOS ★
        </div>
        <div className="absolute bottom-24 left-10 font-silk text-[10px] text-black/30 rotate-[8deg]">
          build · ship · repeat
        </div>
      </div>

      <div className="absolute top-4 left-3 grid grid-cols-1 gap-3">
        {ICON_LAYOUT.map((it, i) => (
          <DesktopIcon
            key={it.id}
            name={it.name}
            label={it.label}
            testId={`icon-${it.id}`}
            onOpen={() => openApp(it.id)}
            position={{ x: 0, y: i * 96 }}
          />
        ))}
      </div>

      {windows
        .filter((w) => !w.closed && !w.minimized)
        .map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            icon={iconChar(w.icon)}
            initial={APPS[w.id].initial}
            zIndex={zMap[w.id] || 10}
            onFocus={focusWin}
            onClose={closeWin}
            onMinimize={minimizeWin}
            testId={`window-${w.id}`}
          >
            {renderAppBody(w.id, {
              openApp,
              soundOn,
              setSoundOn,
              trackIdx,
              setTrackIdx,
              click,
            })}
          </Window>
        ))}

      {startOpen && (
        <div
          data-testid="start-menu"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-14 left-2 bg-white border-[3px] border-black pp-shadow w-72 z-[9999]"
        >
          <div className="titlebar p-2 font-silk text-[12px]">
            {PROFILE.name.toLowerCase()}.exe
          </div>
          <div className="p-2 space-y-1">
            {ICON_LAYOUT.filter((x) => x.id !== "bin").map((it) => (
              <button
                key={it.id}
                data-testid={`start-${it.id}`}
                onClick={() => openApp(it.id)}
                className="w-full text-left pp-btn flex items-center gap-2"
              >
                <span>{iconChar(it.name)}</span>
                <span>{it.label}</span>
              </button>
            ))}
            <a
              data-testid="start-resume"
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="w-full block pp-btn"
            >
              ⇣ download resume.pdf
            </a>
          </div>
          <div className="p-2 border-t-2 border-dashed border-black font-silk text-[10px] bg-[#ffd1dc]">
            ♡ thank you for visiting
          </div>
        </div>
      )}

      <ThinkingCharacter activeId={activeId} />

      <Taskbar
        windows={windows}
        activeId={activeId}
        onFocus={focusWin}
        onToggleStart={() => {
          click();
          setStartOpen((s) => !s);
        }}
        startOpen={startOpen}
        onSoundToggle={() => {
          click();
          setSoundOn((s) => !s);
        }}
        soundOn={soundOn}
      />
    </div>
  );
}

function iconChar(name) {
  return (
    {
      computer: "💻",
      finance: "₿",
      console: "🎮",
      book: "📖",
      contact: "✉",
      music: "♬",
      dressup: "👗",
      bin: "🗑",
    }[name] || "★"
  );
}

function renderAppBody(id, ctx) {
  switch (id) {
    case "computer":
      return <MyComputer onOpen={ctx.openApp} />;
    case "ai-investor":
      return <InvestorDashboard />;
    case "console":
      return <GamingConsole />;
    case "book":
      return <SecretLifeBook />;
    case "contact":
      return <ContactWidget />;
    case "music":
      return (
        <MusicPlayer
          soundOn={ctx.soundOn}
          onToggleSound={() => {
            ctx.click();
            ctx.setSoundOn((s) => !s);
          }}
          trackIdx={ctx.trackIdx}
          onPickTrack={(i) => {
            ctx.click();
            ctx.setTrackIdx(i);
          }}
        />
      );
    case "dressup":
      return <DressUp />;
    default:
      return null;
  }
}
