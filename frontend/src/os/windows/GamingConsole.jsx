import React, { useState } from "react";
import { GAMING, PROJECTS } from "../data";
import PixelAvatar from "../PixelAvatar";

const CARTRIDGES = [
  { id: "ratcode", color: "#ff69b4" },
  { id: "mnist", color: "#39ff14" },
  { id: "bookstore", color: "#ffd700" },
];

export default function GamingConsole() {
  const [selected, setSelected] = useState("ratcode");
  const proj = PROJECTS.find((p) => p.id === selected);

  return (
    <div className="p-4 sm:p-6 font-vt text-lg bg-[#ffd1dc]">
      <div className="bg-black border-[3px] border-black p-4 pp-shadow text-[#39ff14] font-silk text-[11px] leading-relaxed">
        <div className="flex items-center justify-between">
          <span>★ prarthna-arcade · v2.0 ★</span>
          <span className="blink">●REC</span>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div className="bg-[#0a0a0a] border-2 border-[#ff8fab] p-3 min-h-[180px]">
            <div className="text-[#ff8fab]">{">"} now playing:</div>
            <div className="mt-1 text-white text-[14px]">{proj.name}</div>
            <div className="mt-2 text-[#ff8fab]/80 text-[10px]">{proj.role}</div>
            <div className="mt-3 text-white text-[10px] leading-snug font-vt text-base">
              {proj.blurb}
            </div>
            <div className="mt-3 flex gap-2 flex-wrap">
              {proj.live && (
                <a
                  data-testid={`arcade-live-${proj.id}`}
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="pp-btn"
                >
                  play live →
                </a>
              )}
              <a
                data-testid={`arcade-code-${proj.id}`}
                href={proj.github}
                target="_blank"
                rel="noreferrer"
                className="pp-btn"
              >
                view code
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <PixelAvatar variant="gamer" size={140} />
            <div className="font-vt text-[#ff8fab] text-base">insert coin to continue ♡</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="font-silk text-[12px] mb-2">select cartridge:</div>
        <div className="flex gap-3 flex-wrap">
          {CARTRIDGES.map((c) => {
            const p = PROJECTS.find((x) => x.id === c.id);
            const active = selected === c.id;
            return (
              <button
                key={c.id}
                data-testid={`cartridge-${c.id}`}
                onClick={() => setSelected(c.id)}
                className={`relative w-32 h-20 border-[3px] border-black pp-shadow flex flex-col items-center justify-center font-silk text-[10px] text-center px-2 ${
                  active ? "translate-x-[2px] translate-y-[2px] shadow-none" : ""
                }`}
                style={{ background: c.color }}
              >
                <span className="bg-black text-white px-1 py-0.5 text-[8px] mb-1">cartridge</span>
                {p.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 bg-white border-[3px] border-black p-4 pp-shadow">
        <div className="font-silk text-[12px] text-[#ff69b4]">
          ★ achievement unlocked · {GAMING.studio} · {GAMING.title}
        </div>
        <div className="font-vt text-[#444] text-base mb-3">{GAMING.duration}</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {GAMING.titles.map((t) => (
            <span
              key={t}
              className="font-silk text-[10px] bg-[#ffd1dc] border-2 border-black px-2 py-1"
            >
              {t}
            </span>
          ))}
        </div>
        <ul className="list-disc list-inside space-y-1">
          {GAMING.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
