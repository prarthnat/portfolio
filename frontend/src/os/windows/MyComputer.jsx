import React from "react";
import { PROFILE } from "../data";

export default function MyComputer({ onOpen }) {
  const drives = [
    { id: "ai-investor", label: "(C:) projects", note: "AI investor dashboard & more" },
    { id: "console", label: "(G:) arcade", note: "casino backend, ML, code tools" },
    { id: "book", label: "(D:) about-me", note: "read the long form" },
    { id: "music", label: "(M:) music", note: "i am... playlist" },
    { id: "contact", label: "(F:) inbox", note: "send a message" },
    { id: "dressup", label: "(X:) dress-up", note: "tiny easter egg" },
  ];

  const stats = [
    ["education", "B.Tech IT · CGPA 9.38/10 · A D Patel Institute of Technology"],
    ["focus", "full-stack web · backend systems · ML basics"],
    ["last role", "Software Dev Intern, Biziverse · Partner Dashboard (ERP/CRM)"],
    ["previous", "Web Dev Intern, Bilions — 6mo · casino-game backend (Node + Python)"],
    ["recognition", "Ingenium Hackathon '25 · Semifinalist"],
  ];

  return (
    <div className="p-5 font-vt bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-xl mb-1">my pixel computer</div>
      <div className="text-[#444] mb-4">
        welcome, {PROFILE.handle}. system: PrarthnaOS · last login: just now.
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {drives.map((d) => (
          <button
            key={d.id}
            data-testid={`drive-${d.id}`}
            onClick={() => onOpen(d.id)}
            className="bg-white border-[3px] border-black pp-shadow p-3 flex flex-col items-start gap-1 hover:bg-[#fff5fa] text-left"
          >
            <span className="font-silk text-[12px]">{d.label}</span>
            <span className="text-[#444]">{d.note}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 bg-black text-[#ff8fab] border-[3px] border-black p-4 pp-shadow">
        <div className="font-silk text-[11px] mb-2 text-white">★ system info</div>
        <div className="space-y-1">
          {stats.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr] gap-3">
              <span className="font-silk text-[10px] text-[#ff69b4] uppercase">{k}</span>
              <span className="text-white">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
