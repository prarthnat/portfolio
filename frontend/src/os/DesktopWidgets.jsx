import React, { useEffect, useState } from "react";
import { STICKY_NOTE, TRACKS } from "./data";

function PixelClock({ dark }) {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = t.getHours().toString().padStart(2, "0");
  const mm = t.getMinutes().toString().padStart(2, "0");
  const ss = t.getSeconds().toString().padStart(2, "0");
  const day = t.toLocaleDateString(undefined, { weekday: "long" }).toLowerCase();
  const date = t.toLocaleDateString(undefined, { day: "numeric", month: "short" }).toLowerCase();
  return (
    <div
      data-testid="widget-clock"
      className="bg-black text-[#ff8fab] border-[3px] border-black pp-shadow p-3 font-silk text-[10px]"
    >
      <div className="text-white">★ clock</div>
      <div className="text-[28px] leading-none mt-1 text-[#ff69b4]">
        {hh}:{mm}
        <span className="text-[14px] text-[#ff8fab]">:{ss}</span>
      </div>
      <div className="mt-1 text-[#ff8fab]">{day} · {date}</div>
    </div>
  );
}

function PixelCalendar() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const todayDate = today.getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  return (
    <div data-testid="widget-calendar" className="bg-white border-[3px] border-black pp-shadow p-3 font-vt">
      <div className="font-silk text-[10px] text-[#ff69b4]">
        ★ {today.toLocaleDateString(undefined, { month: "long" }).toLowerCase()} {y}
      </div>
      <div className="grid grid-cols-7 gap-0.5 mt-2 text-center font-silk text-[8px]">
        {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
          <div key={`h${i}`} className="text-[#666]">{d}</div>
        ))}
        {cells.map((c, i) => (
          <div
            key={i}
            className={`text-[9px] py-0.5 ${
              c === todayDate
                ? "bg-[#ff69b4] text-white border border-black"
                : c
                ? "text-black"
                : ""
            }`}
          >
            {c || ""}
          </div>
        ))}
      </div>
    </div>
  );
}

function StickyNote() {
  return (
    <div
      data-testid="widget-sticky"
      className="border-[3px] border-black pp-shadow p-3 font-vt text-[15px] leading-snug whitespace-pre-line relative"
      style={{
        background: "#fffdd0",
        transform: "rotate(-2deg)",
        boxShadow: "4px 4px 0 #000",
        backgroundImage:
          "repeating-linear-gradient(transparent 0 22px, rgba(0,0,0,0.08) 22px 23px)",
      }}
    >
      <div className="font-silk text-[10px] text-[#ff69b4] mb-1">★ post-it</div>
      {STICKY_NOTE.body}
      <span
        aria-hidden
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#ff8fab] border border-black"
        style={{ transform: "translateX(-50%) rotate(-3deg)" }}
      />
    </div>
  );
}

function NowPlayingMini({ playingId, onStop, onOpenMusic }) {
  const track = TRACKS.find((t) => t.id === playingId);
  return (
    <div
      data-testid="widget-nowplaying"
      className="bg-[#1a0814] text-[#ff8fab] border-[3px] border-black pp-shadow p-3 font-silk text-[10px]"
    >
      <div className="text-white flex items-center justify-between">
        <span>♬ now playing</span>
        <span className={`text-[#ff69b4] ${track ? "blink" : ""}`}>
          {track ? "● ON" : "■ off"}
        </span>
      </div>
      {track ? (
        <>
          <div className="mt-2 text-white text-[12px]">{track.title}</div>
          <div className="text-[#ff8fab]">{track.artist}</div>
          <div className="mt-2 flex gap-1">
            <button
              type="button"
              data-testid="widget-stop"
              onClick={onStop}
              className="pp-btn flex-1"
            >
              ■ stop
            </button>
            <button
              type="button"
              data-testid="widget-open-music"
              onClick={onOpenMusic}
              className="pp-btn flex-1"
            >
              open
            </button>
          </div>
        </>
      ) : (
        <button
          type="button"
          data-testid="widget-open-music"
          onClick={onOpenMusic}
          className="pp-btn w-full mt-2"
        >
          open playlist
        </button>
      )}
    </div>
  );
}

export default function DesktopWidgets({ dark, playingId, onStop, onOpenMusic }) {
  return (
    <aside
      data-testid="desktop-widgets"
      className="hidden lg:flex absolute right-4 top-4 w-[220px] flex-col gap-4 pointer-events-auto z-[5]"
    >
      <PixelClock dark={dark} />
      <NowPlayingMini playingId={playingId} onStop={onStop} onOpenMusic={onOpenMusic} />
      <PixelCalendar />
      <StickyNote />
    </aside>
  );
}
