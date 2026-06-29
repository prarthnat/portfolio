import React from "react";
import { TRACKS } from "../data";

/**
 * "I am..." music player. Plays a chiptune cover of each track in-browser via
 * the shared audio engine (parent owns playingId). Also links out to YouTube/Spotify.
 */
export default function MusicPlayer({ trackIdx, onPickTrack, playingId, onPlay, onStop }) {
  const track = TRACKS[trackIdx] || TRACKS[0];
  const isPlaying = playingId === track.id;

  return (
    <div className="p-4 sm:p-5 font-vt text-lg bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-2xl text-black">i am...</div>
      <div className="font-vt text-base text-[#444] -mt-1 mb-3">
        a playlist where each song is a trait. press play — your browser plays a
        chiptune cover. press the link to hear the original.
      </div>

      <div className="bg-black text-[#ff8fab] border-[3px] border-black p-3 pp-shadow">
        <div className="font-silk text-[11px] text-white flex items-center justify-between">
          <span>★ now selected ★</span>
          <span className={`text-[#ff69b4] ${isPlaying ? "blink" : ""}`}>
            {isPlaying ? "● PLAYING (chiptune)" : "■ STOPPED"}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-[80px_1fr] gap-3 items-center">
          <div className="w-20 h-20 border-2 border-[#ff8fab] bg-[#1a0a12] flex items-center justify-center font-silk text-[10px] text-[#ff69b4] text-center px-1">
            CD
            <br />
            #{trackIdx + 1}
          </div>
          <div>
            <div className="font-silk text-[10px] text-[#ff69b4] uppercase">{track.trait}</div>
            <div className="text-white text-[18px] font-silk mt-0.5">{track.title}</div>
            <div className="text-[#ff8fab] text-[14px]">{track.artist} — {track.duration}</div>
            <div className="mt-2 flex items-end gap-1 h-6">
              {[3, 5, 2, 6, 4, 5, 3, 4, 6, 3].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-[#ff69b4]"
                  style={{
                    height: `${h * 4}px`,
                    animation: isPlaying
                      ? `eq${i % 3} 0.${4 + i}s ease-in-out infinite alternate`
                      : "none",
                    opacity: isPlaying ? 1 : 0.35,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 text-[12px] text-white/80 italic">{track.note}</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {isPlaying ? (
            <button
              type="button"
              data-testid="music-stop"
              onClick={onStop}
              className="pp-btn"
              style={{ background: "#ff8fab" }}
            >
              ■ stop
            </button>
          ) : (
            <button
              type="button"
              data-testid="music-play"
              onClick={() => onPlay(track.id)}
              className="pp-btn"
              style={{ background: "#ff69b4" }}
            >
              ▶ play in browser
            </button>
          )}
          <a
            data-testid="music-youtube"
            href={track.youtube}
            target="_blank"
            rel="noreferrer"
            className="pp-btn"
          >
            ↗ YouTube
          </a>
          <a
            data-testid="music-spotify"
            href={track.spotify}
            target="_blank"
            rel="noreferrer"
            className="pp-btn"
          >
            ♫ Spotify
          </a>
          <button
            type="button"
            data-testid="music-prev"
            onClick={() => onPickTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)}
            className="pp-btn"
          >
            ↤ prev
          </button>
          <button
            type="button"
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
          tracklist · i am ___
        </div>
        <div>
          {TRACKS.map((t, i) => (
            <button
              type="button"
              key={t.id}
              data-testid={`music-track-${t.id}`}
              onClick={() => onPickTrack(i)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between border-b-2 border-dashed border-black/30 hover:bg-[#fff5fa] ${
                i === trackIdx ? "bg-[#ffd1dc]" : ""
              }`}
            >
              <span className="flex items-center gap-2 min-w-0">
                <span className="font-silk text-[10px] w-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-silk text-[10px] text-[#ff69b4] uppercase whitespace-nowrap">
                  {t.trait}
                </span>
                <span className="text-[#444] truncate">· {t.title} — {t.artist}</span>
              </span>
              <span className="font-silk text-[10px] text-[#666] shrink-0 ml-2">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 font-silk text-[10px] text-[#444]">
        playlist curated by prarthna. each trait = a song you would queue if you met me.
      </div>

      <style>{`
        @keyframes eq0 { from { height: 4px } to { height: 22px } }
        @keyframes eq1 { from { height: 8px } to { height: 18px } }
        @keyframes eq2 { from { height: 6px } to { height: 24px } }
      `}</style>
    </div>
  );
}
