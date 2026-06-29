import React, { useEffect, useMemo, useRef, useState } from "react";
import PixelAvatar from "./PixelAvatar";
import { PROJECTS, GAMING, IDLE_THOUGHTS } from "./data";

const THOUGHTS = {
  computer: {
    head: "welcome ♡",
    body: "this is the whole portfolio. icons on the left, start menu bottom-left. resize windows by dragging the title bar.",
  },
  "ai-investor": {
    head: "AI Investor Dashboard",
    body: PROJECTS.find((p) => p.id === "ai-investor").why,
  },
  console: {
    head: "Arcade · Casino Backend",
    body: GAMING.why,
  },
  book: {
    head: "About Prarthna",
    body: "the long-form version of me. open if you want a recruiter-friendly read.",
  },
  contact: {
    head: "Say Hi",
    body: "i answer in under 24 hours. emails > forms, but the form here works too.",
  },
  dressup: {
    head: "dress-up.exe",
    body: "i obsess over UI the way I obsess over outfits. tiny easter egg.",
  },
  music: {
    head: "music.exe",
    body: "an actual chiptune mini-loop, made with WebAudio. press play. it loops so it's not annoying.",
  },
};

/**
 * Fixed bottom-right pixel character with a speech bubble.
 * Reacts to the active window id by surfacing the project's "why".
 */
export default function ThinkingCharacter({ activeId }) {
  const [idleIdx, setIdleIdx] = useState(0);
  const lastShownRef = useRef(null);

  useEffect(() => {
    if (activeId) return;
    const t = setInterval(
      () => setIdleIdx((i) => (i + 1) % IDLE_THOUGHTS.length),
      6500
    );
    return () => clearInterval(t);
  }, [activeId]);

  const thought = useMemo(() => {
    if (activeId && THOUGHTS[activeId]) {
      lastShownRef.current = activeId;
      return THOUGHTS[activeId];
    }
    return { head: "idle thought", body: IDLE_THOUGHTS[idleIdx] };
  }, [activeId, idleIdx]);

  return (
    <div
      data-testid="thinking-character"
      className="fixed bottom-20 right-4 z-[60] flex items-end gap-2 pointer-events-none no-select"
    >
      {/* Speech bubble */}
      <div
        data-testid="thought-bubble"
        className="relative bg-white border-[3px] border-black pp-shadow max-w-[260px] p-3 pointer-events-auto"
        style={{ animation: "ppFloat 5s ease-in-out infinite" }}
      >
        <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r-[3px] border-b-[3px] border-black rotate-45" />
        <div className="font-silk text-[11px] text-[#ff69b4] leading-tight">
          {thought.head}
        </div>
        <div className="font-vt text-[16px] leading-snug mt-1 text-black">
          {thought.body}
        </div>
      </div>

      {/* Character */}
      <div
        className="relative bg-[#fffdd0] border-[3px] border-black pp-shadow p-1 pointer-events-auto"
        style={{ animation: "ppBob 2.4s ease-in-out infinite" }}
      >
        <PixelAvatar variant="main" size={86} className="border-0 shadow-none" />
        <span
          aria-hidden
          className="absolute -top-3 -left-3 font-silk text-[12px] text-[#ff69b4]"
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          ✦
        </span>
        <span
          aria-hidden
          className="absolute top-1 -right-3 font-silk text-[10px] text-black"
        >
          ✧
        </span>
      </div>

      <style>{`
        @keyframes ppBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ppFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
      `}</style>
    </div>
  );
}
