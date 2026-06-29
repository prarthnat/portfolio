import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import BootScreen from "./BootScreen";
import InvestorDashboard from "./windows/InvestorDashboard";
import GamingConsole from "./windows/GamingConsole";
import SecretLifeBook from "./windows/SecretLifeBook";
import ContactWidget from "./windows/ContactWidget";
import PhotoGallery from "./windows/PhotoGallery";
import DressUp from "./windows/DressUp";
import MyComputer from "./windows/MyComputer";
import { PROFILE } from "./data";

const APPS = {
  computer: { title: "My Computer", icon: "computer", initial: { x: 60, y: 40, w: 560, h: 520 } },
  "ai-investor": {
    title: "AI Investor Dashboard",
    icon: "finance",
    initial: { x: 120, y: 60, w: 820, h: 560 },
  },
  console: {
    title: "Prarthna-Arcade",
    icon: "console",
    initial: { x: 160, y: 80, w: 820, h: 580 },
  },
  book: {
    title: "The Secret Life of Prarthna",
    icon: "book",
    initial: { x: 200, y: 50, w: 760, h: 560 },
  },
  contact: {
    title: "Contact ♡ Messenger",
    icon: "contact",
    initial: { x: 220, y: 80, w: 760, h: 540 },
  },
  gallery: {
    title: "Scrapbook · Photo Gallery",
    icon: "gallery",
    initial: { x: 140, y: 70, w: 780, h: 560 },
  },
  dressup: {
    title: "dress-up.exe",
    icon: "dressup",
    initial: { x: 250, y: 60, w: 720, h: 540 },
  },
};

const ICON_LAYOUT = [
  { id: "computer", label: "my computer", name: "computer" },
  { id: "ai-investor", label: "AI investor", name: "finance" },
  { id: "console", label: "arcade", name: "console" },
  { id: "book", label: "about-me book", name: "book" },
  { id: "contact", label: "contact ♡", name: "contact" },
  { id: "gallery", label: "scrapbook", name: "gallery" },
  { id: "dressup", label: "dress-up", name: "dressup" },
  { id: "bin", label: "recycle bin", name: "bin" },
];

function useChiptune(enabled) {
  const ctxRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    if (!ctxRef.current) {
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        ctxRef.current = new Ctx();
      } catch (e) {
        return;
      }
    }
    const ctx = ctxRef.current;
    // simple 4-note pastel loop
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5 E5 G5 C6
    let step = 0;
    const interval = setInterval(() => {
      if (!enabled || ctx.state === "closed") return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = notes[step % notes.length];
      g.gain.value = 0.025;
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.18);
      step += 1;
    }, 380);
    return () => clearInterval(interval);
  }, [enabled]);

  const click = useCallback(() => {
    if (!enabled || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.value = 880;
    g.gain.value = 0.04;
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.05);
  }, [enabled]);

  return click;
}

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState([]); // {id, title, icon, minimized, closed}
  const [zCounter, setZCounter] = useState(10);
  const [zMap, setZMap] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const click = useChiptune(soundOn);

  const openApp = useCallback(
    (id) => {
      click();
      setStartOpen(false);
      if (id === "bin") return; // easter egg: do nothing or open empty later
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
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: false } : w))
      );
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
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
      );
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

  // Auto-open My Computer once booted
  useEffect(() => {
    if (booted) {
      openApp("computer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted]);

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

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
      {/* Floating fashion decor stickers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-6 right-10 font-silk text-[10px] text-black/40 rotate-[-6deg]">
          ★ prarthnaOS ★
        </div>
        <div className="absolute bottom-24 left-10 font-silk text-[10px] text-black/30 rotate-[8deg]">
          ♡ build · ship · dress-up · repeat ♡
        </div>
      </div>

      {/* Desktop icons grid (left column) */}
      <div className="absolute top-4 left-3 grid grid-cols-1 gap-3">
        {ICON_LAYOUT.map((it, i) => (
          <DesktopIcon
            key={it.id}
            name={it.name}
            label={it.label}
            testId={`icon-${it.id}`}
            onOpen={() => openApp(it.id)}
            position={{ x: 0, y: i * 104 }}
          />
        ))}
      </div>

      {/* Open windows */}
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
            {renderAppBody(w.id, openApp)}
          </Window>
        ))}

      {/* Start menu */}
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
            ♡ thanks for booting prarthnaOS
          </div>
        </div>
      )}

      <Taskbar
        windows={windows}
        activeId={activeId}
        onFocus={focusWin}
        onToggleStart={() => {
          click();
          setStartOpen((s) => !s);
        }}
        startOpen={startOpen}
        onSoundToggle={() => setSoundOn((s) => !s)}
        soundOn={soundOn}
      />
    </div>
  );
}

function iconChar(name) {
  return (
    { computer: "💻", finance: "₿", console: "🎮", book: "📖", contact: "✉", gallery: "📸", dressup: "👗", bin: "🗑" }[name] ||
    "★"
  );
}

function renderAppBody(id, openApp) {
  switch (id) {
    case "computer":
      return <MyComputer onOpen={openApp} />;
    case "ai-investor":
      return <InvestorDashboard />;
    case "console":
      return <GamingConsole />;
    case "book":
      return <SecretLifeBook />;
    case "contact":
      return <ContactWidget />;
    case "gallery":
      return <PhotoGallery />;
    case "dressup":
      return <DressUp />;
    default:
      return null;
  }
}
