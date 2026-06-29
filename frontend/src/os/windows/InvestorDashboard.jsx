import React, { useState } from "react";
import { PROJECTS } from "../data";

function PixelBars() {
  // Pastel pink + neon green bars for portfolio performance
  const heights = [40, 60, 55, 80, 70, 95, 85];
  return (
    <div className="flex items-end gap-2 h-32 p-2 bg-white border-[3px] border-black pp-shadow">
      {heights.map((h, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="w-6 border-2 border-black"
            style={{
              height: `${h}%`,
              background:
                i % 2 === 0
                  ? "repeating-linear-gradient(to top, #ff69b4 0 4px, #ff8fab 4px 8px)"
                  : "repeating-linear-gradient(to top, #39ff14 0 4px, #b6ff8f 4px 8px)",
            }}
          />
          <span className="font-silk text-[8px]">d{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default function InvestorDashboard() {
  const proj = PROJECTS.find((p) => p.id === "ai-investor");
  const [tip, setTip] = useState(0);
  const tips = [
    "tip ♡ diversify before you diva-fy.",
    "tip ♡ index funds are unproblematic exes — boring but reliable.",
    "tip ♡ if you can't explain it to your inner 14 year old, don't buy it.",
    "tip ♡ small consistent investments > one heroic dump.",
  ];

  return (
    <div className="p-4 sm:p-6 font-vt text-lg">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="font-silk text-[14px] text-[#ff69b4]">{proj.badge}</div>
          <h2 className="font-silk text-2xl sm:text-3xl">{proj.name}</h2>
        </div>
        <a
          data-testid="investor-github-link"
          href={proj.github}
          target="_blank"
          rel="noreferrer"
          className="pp-btn"
        >
          view code →
        </a>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <p>{proj.blurb}</p>
          <p className="text-[#444]">{proj.story}</p>
          <div className="bg-[#ffd1dc] border-[3px] border-black p-3 pp-shadow">
            <div className="font-silk text-[12px] mb-2">role · {proj.role}</div>
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span
                  key={t}
                  className="font-silk text-[10px] bg-white border-2 border-black px-2 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="font-silk text-[12px]">simulated portfolio ↑</div>
          <PixelBars />
          <div className="bg-black text-[#ff8fab] border-[3px] border-black p-3 font-vt text-base">
            <div className="font-silk text-[10px] text-[#ff69b4] mb-1">daily insight</div>
            {tips[tip]}
            <button
              data-testid="investor-tip-next"
              className="pp-btn block mt-2"
              onClick={() => setTip((t) => (t + 1) % tips.length)}
            >
              next tip →
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t-2 border-dashed border-black pt-3 font-silk text-[10px] text-[#666]">
        ★ ingenium hackathon &apos;25 — semifinalist ★ built solo + with team, won hearts (and rounds)
      </div>
    </div>
  );
}
