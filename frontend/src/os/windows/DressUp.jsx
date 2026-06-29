import React, { useState } from "react";
import PixelAvatar from "../PixelAvatar";
import { OUTFITS } from "../data";

export default function DressUp() {
  const [active, setActive] = useState("y2k");
  const outfit = OUTFITS.find((o) => o.id === active);

  return (
    <div className="p-6 font-vt bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-xl mb-1">dress-up.exe ♡</div>
      <div className="text-base text-[#444] mb-4">
        a little fashion easter egg. tap an outfit, change the vibe.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="border-[3px] border-black pp-shadow flex flex-col items-center justify-end p-6 min-h-[300px] relative"
          style={{ background: outfit.color }}
        >
          <div className="absolute top-3 left-3 font-silk text-[10px] bg-white border-2 border-black px-2 py-1">
            now wearing · {outfit.name}
          </div>
          <div className="text-7xl" aria-hidden>
            {outfit.emoji}
          </div>
          <PixelAvatar variant="main" size={180} />
        </div>
        <div className="bg-white border-[3px] border-black pp-shadow p-4">
          <div className="font-silk text-[12px] mb-3">wardrobe</div>
          <div className="grid grid-cols-2 gap-3">
            {OUTFITS.map((o) => (
              <button
                key={o.id}
                data-testid={`outfit-${o.id}`}
                onClick={() => setActive(o.id)}
                className={`border-[3px] border-black pp-shadow p-3 flex flex-col items-center gap-2 font-silk text-[10px] ${
                  active === o.id ? "translate-x-[2px] translate-y-[2px] shadow-none" : ""
                }`}
                style={{ background: o.color }}
              >
                <span className="text-2xl">{o.emoji}</span>
                {o.name}
              </button>
            ))}
          </div>
          <div className="mt-4 bg-[#fffdd0] border-2 border-black p-3 text-base">
            ★ fashion girl theorem: outfit = first impression. UI = second. <br />
            i obsess over both.
          </div>
        </div>
      </div>
    </div>
  );
}
