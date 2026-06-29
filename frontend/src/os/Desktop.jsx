import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Window from "./Window";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "./Taskbar";
import BootScreen from "./BootScreen";
import ThinkingCharacter from "./ThinkingCharacter";
import DesktopWidgets from "./DesktopWidgets";
import InvestorDashboard from "./windows/InvestorDashboard";
import GamingConsole from "./windows/GamingConsole";
import SecretLifeBook from "./windows/SecretLifeBook";
import ContactWidget from "./windows/ContactWidget";
import DressUp from "./windows/DressUp";
import MyComputer from "./windows/MyComputer";
import MusicPlayer from "./windows/MusicPlayer";
import RecycleBin from "./windows/RecycleBin";
import { PROFILE, TRACKS } from "./data";
import { useAudioEngine } from "./useAudioEngine";

const APPS = {
  computer: { title: "My Computer", icon: "computer", initial: { x: 160, y: 40, w: 560, h: 520 } },
  "ai-investor": { title: "AI Investor Dashboard", icon: "finance", initial: { x: 200, y: 60, w: 820, h: 560 } },
  console: { title: "Prarthna-Arcade", icon: "console", initial: { x: 220, y: 80, w: 820, h: 580 } },
  book: { title: "About Prarthna", icon: "book", initial: { x: 240, y: 50, w: 760, h: 560 } },
  contact: { title: "Contact ♡ Messenger", icon: "contact", initial: { x: 260, y: 80, w: 760, h: 540 } },
  music: { title: "i am... · music", icon: "music", initial: { x: 280, y: 100, w: 660, h: 600 } },
  dressup: { title: "dress-up.exe", icon: "dressup", initial: { x: 300, y: 60, w: 720, h: 540 } },
  bin: { title: "Recycle Bin", icon: "bin", initial: { x: 320, y: 80, w: 640, h: 500 } },
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

export default function Desktop() {
  const [booted, setBooted] = useState(false);
  const [windows, setWindows] = useState([]);
  const [zCounter, setZCounter] = useState(10);
  const [zMap, setZMap] = useState({});
  const [startOpen, setStartOpen] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("prarthnaos-theme") || "light"
  );
  const isDark = theme === "dark";
  const autoOpenedRef = useRef(false);

  const playingTrack = useMemo(
    () => TRACKS.find((t) => t.id === playingId) || null,
    [playingId]
  );
  const { click } = useAudioEngine({ playingTrack });

  useEffect(() => {
    localStorage.setItem("prarthnaos-theme", theme);
  }, [theme]);

  const openApp = useCallback((id) => {
    click();
    setStartOpen(false);
    const meta = APPS[id];
    if (!meta) return;
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        return prev.map((w) =>
          w.id === id ? { ...w, minimized: false, closed: false } : w
        );
      }
      return [
        ...prev,
        { id, title: meta.title, icon: meta.icon, minimized: false, closed: false },
      ];
    });
    setZCounter((c) => {
      const next = c + 1;
      setZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
  }, [click]);

  const focusWin = useCallback((id) => {
    setZCounter((c) => {
      const next = c + 1;
      setZMap((m) => ({ ...m, [id]: next }));
      return next;
    });
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: false } : w)));
  }, []);

  const closeWin = useCallback((id) => {
    click();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, closed: true } : w)));
  }, [click]);

  const minimizeWin = useCallback((id) => {
    click();
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)));
  }, [click]);

  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.closed && !w.minimized);
    if (visible.length === 0) return null;
    let top = visible[0];
    for (const w of visible) {
      if ((zMap[w.id] || 0) > (zMap[top.id] || 0)) top = w;
    }
    return top.id;
  }, [windows, zMap]);

  // Auto-open My Computer once, after boot — guarded by ref to prevent loop
  useEffect(() => {
    if (booted && !autoOpenedRef.current) {
      autoOpenedRef.current = true;
      openApp("computer");
    }
  }, [booted, openApp]);

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />;

  const bgStyle = isDark
    ? {
        backgroundImage:
          "radial-gradient(ellipse at top, #3a1226 0%, #1a0814 60%, #0a0309 100%), radial-gradient(circle at 12% 18%, rgba(255,143,171,0.45) 0 2px, transparent 3px), radial-gradient(circle at 78% 60%, rgba(255,105,180,0.35) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(255,209,220,0.25) 0 2px, transparent 3px)",
        backgroundSize: "auto, 180px 180px, 180px 180px, 180px 180px",
        backgroundColor: "#1a0814",
      }
    : {
        backgroundImage:
          "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.4) 0 2px, transparent 3px), radial-gradient(circle at 78% 60%, rgba(255,255,255,0.3) 0 2px, transparent 3px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.25) 0 2px, transparent 3px)",
        backgroundSize: "180px 180px",
        backgroundColor: "#ffd1dc",
      };

  return (
    <div
      data-testid="desktop"
      data-theme={theme}
      className={`relative w-screen h-screen overflow-hidden pp-cursor crt no-select ${
        isDark ? "theme-dark" : ""
      }`}
      style={bgStyle}
      onClick={() => setStartOpen(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute top-6 left-1/2 -translate-x-1/2 font-silk text-[10px] rotate-[-2deg] ${
            isDark ? "text-[#ff8fab]/70" : "text-black/40"
          }`}
        >
          ★ prarthnaOS ★
        </div>
        <div
          className={`absolute bottom-24 left-32 font-silk text-[10px] rotate-[8deg] ${
            isDark ? "text-[#ff8fab]/50" : "text-black/30"
          }`}
        >
          build · ship · repeat
        </div>
      </div>

      <div className="absolute top-4 left-3 grid grid-cols-1 gap-3 z-[4]">
        {ICON_LAYOUT.map((it, i) => (
          <DesktopIcon
            key={it.id}
            name={it.name}
            label={it.label}
            testId={`icon-${it.id}`}
            onOpen={() => openApp(it.id)}
            position={{ x: 0, y: i * 96 }}
            dark={isDark}
          />
        ))}
      </div>

      <DesktopWidgets
        dark={isDark}
        playingId={playingId}
        onStop={() => {
          click();
          setPlayingId(null);
        }}
        onOpenMusic={() => openApp("music")}
      />

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
              trackIdx,
              setTrackIdx,
              click,
              playingId,
              setPlayingId,
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
                type="button"
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
        theme={theme}
        onThemeToggle={() => {
          click();
          setTheme((t) => (t === "light" ? "dark" : "light"));
        }}
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
          trackIdx={ctx.trackIdx}
          onPickTrack={(i) => {
            ctx.click();
            ctx.setTrackIdx(i);
          }}
          playingId={ctx.playingId}
          onPlay={(id) => {
            ctx.click();
            ctx.setPlayingId(id);
          }}
          onStop={() => {
            ctx.click();
            ctx.setPlayingId(null);
          }}
        />
      );
    case "dressup":
      return <DressUp />;
    case "bin":
      return <RecycleBin />;
    default:
      return null;
  }
}
