import React from "react";
import { TRACKS } from "../data";

/**
 * Music player UI. Actual audio loop is driven by Desktop's WebAudio chiptune.
 * Props let the player toggle music globally.
 */
export default function MusicPlayer({ soundOn, onToggleSound, trackIdx, onPickTrack }) {
  const track = TRACKS[trackIdx] || TRACKS[0];

  return (
    <div className="p-4 sm:p-5 font-vt text-lg bg-[#ffd1dc] min-h-full">
      <div className="bg-black text-[#ff8fab] border-[3px] border-black p-3 pp-shadow">
        <div className="font-silk text-[11px] text-white flex items-center justify-between">
          <span>★ pinky player v0.3 ★</span>
          <span className="text-[#ff69b4] blink">{soundOn ? "● PLAY" : "■ STOP"}</span>
        </div>
        <div className="mt-2 grid grid-cols-[80px_1fr] gap-3 items-center">
          <div className="w-20 h-20 border-2 border-[#ff8fab] bg-[#1a0a12] flex items-center justify-center font-silk text-[10px] text-[#ff69b4]">
            CD ♡
          </div>
          <div>
            <div className="text-white text-[14px] font-silk">{track.title}</div>
            <div className="text-[#ff8fab] text-[12px]">{track.artist} — {track.duration}</div>
            {/* equalizer */}
            <div className="mt-2 flex items-end gap-1 h-6">
              {[3, 5, 2, 6, 4, 5, 3].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-[#ff69b4]"
                  style={{
                    height: `${h * 4 + (soundOn ? Math.random() * 6 : 0)}px`,
                    animation: soundOn ? `eq${i % 3} 0.${4 + i}s ease-in-out infinite alternate` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            data-testid="music-play"
            onClick={onToggleSound}
            className="pp-btn"
            style={{ background: soundOn ? "#ff69b4" : "#fff" }}
          >
            {soundOn ? "■ stop" : "▶ play"}
          </button>
          <button
            data-testid="music-prev"
            onClick={() => onPickTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)}
            className="pp-btn"
          >
            ↤ prev
          </button>
          <button
            data-testid="music-next"
            onClick={() => onPickTrack((trackIdx + 1) % TRACKS.length)}
            className="pp-btn"
          >
            ↦ next
          </button>
        </div>
      </div>

      <div className="mt-4 bg-white border-[3px] border-black pp-shadow">
        <div className="titlebar h-8 px-2 flex items-center font-silk text-[11px]">
          tracklist
        </div>
        <div>
          {TRACKS.map((t, i) => (
            <button
              key={t.id}
              data-testid={`music-track-${t.id}`}
              onClick={() => onPickTrack(i)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between border-b-2 border-dashed border-black/30 hover:bg-[#fff5fa] ${
                i === trackIdx ? "bg-[#ffd1dc]" : ""
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="font-silk text-[10px] w-6">{String(i + 1).padStart(2, "0")}</span>
                <span>{t.title}</span>
              </span>
              <span className="font-silk text-[10px] text-[#666]">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 font-silk text-[10px] text-[#444]">
        ♫ all sounds are synthesised live in your browser. no mp3s, no copyright drama.
      </div>

      <style>{`
        @keyframes eq0 { from { height: 4px } to { height: 22px } }
        @keyframes eq1 { from { height: 8px } to { height: 18px } }
        @keyframes eq2 { from { height: 6px } to { height: 24px } }
      `}</style>
    </div>
  );
}
