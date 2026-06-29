import React, { useState } from "react";
import { BOOK_CHAPTERS } from "../data";
import PixelAvatar from "../PixelAvatar";

export default function SecretLifeBook() {
  const [chapter, setChapter] = useState(0);
  const ch = BOOK_CHAPTERS[chapter];

  return (
    <div className="p-4 sm:p-6 font-vt text-lg bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-2xl sm:text-3xl text-center text-black">
        The Secret Life of Prarthna
      </div>
      <div className="font-vt text-center text-[#444] -mt-1">
        a less secret · a technical · an all-about-me anthology
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 items-start">
        <div className="flex flex-col items-center gap-2">
          <PixelAvatar variant="book" size={150} />
          <div className="font-silk text-[10px] text-center">our protagonist ♡</div>
        </div>

        <div
          className="bg-[#fffdd0] border-[3px] border-black pp-shadow p-5 min-h-[320px] relative"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 28px, rgba(0,0,0,0.08) 28px 29px)",
          }}
        >
          <div className="font-silk text-[14px] mb-3">{ch.title}</div>
          <div className="space-y-3">
            {ch.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="absolute top-3 right-3 font-silk text-[10px] text-[#999]">
            pg. {chapter + 1} / {BOOK_CHAPTERS.length}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          data-testid="book-prev"
          className="pp-btn"
          onClick={() => setChapter((c) => Math.max(0, c - 1))}
          disabled={chapter === 0}
        >
          ← prev page
        </button>
        <div className="flex gap-1">
          {BOOK_CHAPTERS.map((_, i) => (
            <button
              key={i}
              data-testid={`book-page-${i}`}
              onClick={() => setChapter(i)}
              className={`w-3 h-3 border-2 border-black ${
                chapter === i ? "bg-[#ff69b4]" : "bg-white"
              }`}
              aria-label={`page ${i + 1}`}
            />
          ))}
        </div>
        <button
          data-testid="book-next"
          className="pp-btn"
          onClick={() =>
            setChapter((c) => Math.min(BOOK_CHAPTERS.length - 1, c + 1))
          }
          disabled={chapter === BOOK_CHAPTERS.length - 1}
        >
          next page →
        </button>
      </div>
    </div>
  );
}
