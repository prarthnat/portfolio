import React, { useState } from "react";

const TRASH = [
  {
    name: "imposter_syndrome.txt",
    size: "0 KB",
    body:
      "draft 1: am I really qualified for this role?\nresolved. (turns out — yes.)",
  },
  {
    name: "monday_morning.ico",
    size: "12 KB",
    body: "broken icon. throw it away. mondays are fine actually.",
  },
  {
    name: "lipgloss.dll",
    size: "0.4 MB",
    body: "deprecated dependency. replaced by chapstick.exe.",
  },
  {
    name: "bad_variable_names.js",
    size: "2 KB",
    body:
      "// const a = 1; const b = 2;\n// fixed. now they're called `totalSpins` and `bonusMultiplier`.",
  },
  {
    name: "weekend_homework.zip",
    size: "16 MB",
    body: "submitted. graded. forgotten.",
  },
  {
    name: "overthinking_v3_final_FINAL.docx",
    size: "0 KB",
    body:
      "we don't talk about v3 final FINAL. ship the v1, get the feedback, iterate.",
  },
];

export default function RecycleBin() {
  const [items, setItems] = useState(TRASH);
  const [open, setOpen] = useState(null);
  const [confettiKey, setConfettiKey] = useState(0);

  const empty = () => {
    setItems([]);
    setOpen(null);
    setConfettiKey((k) => k + 1);
  };

  const restore = () => {
    setItems(TRASH);
    setOpen(null);
  };

  return (
    <div className="p-5 font-vt bg-[#ffd1dc] min-h-full relative">
      {confettiKey > 0 && (
        <div
          key={confettiKey}
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-[14px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-20px",
                color: ["#ff69b4", "#39ff14", "#ffd700", "#fff"][i % 4],
                animation: `bin-fall 1.4s ease-in ${i * 0.04}s 1 forwards`,
                fontFamily: "Silkscreen, monospace",
              }}
            >
              ★
            </span>
          ))}
        </div>
      )}

      <div className="font-silk text-xl mb-1">recycle bin</div>
      <div className="text-[#444] mb-4">
        {items.length} item{items.length === 1 ? "" : "s"} · drag-and-drop unavailable, but
        click to peek.
      </div>

      <div className="flex gap-2 mb-3">
        <button
          type="button"
          data-testid="bin-empty"
          onClick={empty}
          disabled={items.length === 0}
          className="pp-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ✕ empty bin
        </button>
        <button
          type="button"
          data-testid="bin-restore"
          onClick={restore}
          disabled={items.length === TRASH.length}
          className="pp-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↶ restore all
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border-[3px] border-black pp-shadow p-6 text-center">
          <div className="font-silk text-[12px] text-[#ff69b4] mb-2">
            ★ bin is sparkly clean ★
          </div>
          <div>nothing here. press restore if you miss the mess.</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((it) => (
            <button
              type="button"
              key={it.name}
              data-testid={`bin-item-${it.name.replace(/[^a-z0-9]/gi, "-")}`}
              onClick={() => setOpen(it)}
              className="bg-white border-[3px] border-black pp-shadow p-3 flex flex-col items-start gap-1 hover:bg-[#fff5fa] text-left"
            >
              <div className="text-2xl" aria-hidden>
                📄
              </div>
              <div className="font-silk text-[10px] truncate w-full">{it.name}</div>
              <div className="font-silk text-[8px] text-[#666]">{it.size}</div>
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          data-testid="bin-preview"
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[80] p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="bg-white border-[3px] border-black pp-shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="titlebar h-8 flex items-center justify-between px-2 font-silk text-[11px]">
              <span>👀 {open.name}</span>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="pp-btn !p-0 w-6 h-6 bg-[#ff8fab]"
                data-testid="bin-preview-close"
              >
                ✕
              </button>
            </div>
            <div className="p-4 font-vt whitespace-pre-line">{open.body}</div>
            <div className="px-4 pb-3 font-silk text-[10px] text-[#666]">
              ★ note from prarthna · deleted but archived for self-reflection
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bin-fall {
          to { transform: translateY(420px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
