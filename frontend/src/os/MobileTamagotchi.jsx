import React, { useState } from "react";
import PixelAvatar from "./PixelAvatar";
import InvestorDashboard from "./windows/InvestorDashboard";
import GamingConsole from "./windows/GamingConsole";
import SecretLifeBook from "./windows/SecretLifeBook";
import ContactWidget from "./windows/ContactWidget";
import DressUp from "./windows/DressUp";
import MyComputer from "./windows/MyComputer";
import MusicPlayer from "./windows/MusicPlayer";
import { PROFILE, TRACKS } from "./data";
import { useAudioEngine } from "./useAudioEngine";

const APPS = [
  { id: "computer", label: "computer", emoji: "💻" },
  { id: "ai-investor", label: "investor", emoji: "📈" },
  { id: "console", label: "arcade", emoji: "🎮" },
  { id: "book", label: "book", emoji: "📖" },
  { id: "contact", label: "contact", emoji: "✉" },
  { id: "music", label: "music", emoji: "♬" },
  { id: "dressup", label: "dress-up", emoji: "👗" },
];

export default function MobileTamagotchi() {
  const [active, setActive] = useState(null);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playingId, setPlayingId] = useState(null);
  const playingTrack = TRACKS.find((t) => t.id === playingId) || null;
  useAudioEngine({ playingTrack });

  const renderApp = (id, open) => {
    switch (id) {
      case "computer":
        return <MyComputer onOpen={open} />;
      case "ai-investor":
        return <InvestorDashboard />;
      case "console":
        return <GamingConsole />;
      case "book":
        return <SecretLifeBook />;
      case "contact":
        return <ContactWidget />;
      case "music":
        return (
          <MusicPlayer
            trackIdx={trackIdx}
            onPickTrack={setTrackIdx}
            playingId={playingId}
            onPlay={setPlayingId}
            onStop={() => setPlayingId(null)}
          />
        );
      case "dressup":
        return <DressUp />;
      default:
        return null;
    }
  };

  return (
    <div
      data-testid="mobile-tamagotchi"
      className="min-h-screen w-full bg-[#ff8fab] flex flex-col items-center pt-6 pb-10 px-3 overflow-y-auto"
    >
      <div className="w-full max-w-[420px] bg-[#ff69b4] border-[4px] border-black pp-shadow-lg rounded-t-[60px] rounded-b-[24px] p-4 relative">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-2 bg-black rounded-full" />
        </div>
        <div className="font-silk text-[11px] text-center text-black mb-2">
          ★ prarthnagotchi v1.0 ★
        </div>

        <div className="bg-[#ffd1dc] border-[3px] border-black p-3 min-h-[460px]">
          {!active ? (
            <div>
              <div className="flex flex-col items-center gap-2">
                <PixelAvatar variant="main" size={140} />
                <div className="font-silk text-sm">{PROFILE.name.toLowerCase()}</div>
                <div className="text-center font-vt text-base text-[#444] px-2">
                  {PROFILE.tagline}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                {APPS.map((a) => (
                  <button
                    key={a.id}
                    data-testid={`mobile-app-${a.id}`}
                    onClick={() => setActive(a.id)}
                    className="bg-white border-[3px] border-black pp-shadow flex flex-col items-center gap-1 p-2 hover:bg-[#ff69b4]"
                  >
                    <span className="text-2xl" aria-hidden>
                      {a.emoji}
                    </span>
                    <span className="font-silk text-[9px]">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <button
                data-testid="mobile-back"
                onClick={() => setActive(null)}
                className="pp-btn mb-2"
              >
                ← home
              </button>
              <div className="bg-white border-[3px] border-black">
                {renderApp(active, setActive)}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-around mt-4">
          <button
            data-testid="tam-btn-A"
            onClick={() => setActive(null)}
            className="w-12 h-12 rounded-full bg-white border-[3px] border-black pp-shadow font-silk text-[10px]"
          >
            A
          </button>
          <button
            data-testid="tam-btn-B"
            onClick={() => setActive("contact")}
            className="w-12 h-12 rounded-full bg-[#ffd1dc] border-[3px] border-black pp-shadow font-silk text-[10px]"
          >
            B
          </button>
          <button
            data-testid="tam-btn-C"
            onClick={() => setActive("book")}
            className="w-12 h-12 rounded-full bg-white border-[3px] border-black pp-shadow font-silk text-[10px]"
          >
            C
          </button>
        </div>
      </div>
      <div className="font-silk text-[10px] mt-4 text-black/80 text-center">
        open on desktop for the full pixel OS
      </div>
    </div>
  );
}
