import React from "react";
import { PROFILE, FUN_FACTS } from "../data";

export default function MyComputer({ onOpen }) {
  const drives = [
    { id: "ai-investor", label: "(C:) projects", note: "open AI Investor + more" },
    { id: "console", label: "(G:) games", note: "casino backend lore", iconName: "console" },
    { id: "book", label: "(D:) about-me.txt", note: "read the book", iconName: "book" },
    { id: "gallery", label: "(E:) scrapbook", note: "fashion + cartoon" },
    { id: "contact", label: "(F:) inbox", note: "say hi" },
  ];

  return (
    <div className="p-5 font-vt bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-xl mb-1">my pixel computer ♡</div>
      <div className="text-[#444] mb-4">
        welcome, {PROFILE.handle}. system: PrarthnaOS · uptime: 21 years · mood: focused + glittery.
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {drives.map((d) => (
          <button
            key={d.id}
            data-testid={`drive-${d.id}`}
            onClick={() => onOpen(d.id)}
            className="bg-white border-[3px] border-black pp-shadow p-3 flex flex-col items-start gap-1 hover:bg-[#fff5fa]"
          >
            <span className="font-silk text-[12px]">{d.label}</span>
            <span className="text-[#444]">{d.note}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 bg-black text-[#ff8fab] border-[3px] border-black p-4 pp-shadow">
        <div className="font-silk text-[11px] mb-2 text-white">★ trivia.exe</div>
        <ul className="list-disc list-inside space-y-1">
          {FUN_FACTS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
