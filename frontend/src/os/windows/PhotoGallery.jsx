import React from "react";
import PixelAvatar from "../PixelAvatar";

const POLAROIDS = [
  {
    id: "fashion-1",
    src: "https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=400&q=80",
    caption: "y2k bag day ♡",
    rotate: -4,
  },
  {
    id: "fashion-2",
    src: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&q=80",
    caption: "rhinestone era",
    rotate: 5,
  },
  {
    id: "fashion-3",
    src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    caption: "soft girl saturday",
    rotate: -2,
  },
  {
    id: "fashion-4",
    src: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
    caption: "tech goth tuesday",
    rotate: 6,
  },
];

function Polaroid({ src, caption, rotate, testId, children }) {
  return (
    <div
      data-testid={testId}
      className="bg-white border-[3px] border-black pp-shadow p-2 w-[180px]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div
        className="w-full h-[180px] border-2 border-black bg-[#ffd1dc] flex items-center justify-center overflow-hidden"
      >
        {children || (
          <img
            src={src}
            alt={caption}
            className="w-full h-full object-cover"
            style={{ imageRendering: "auto" }}
          />
        )}
      </div>
      <div className="font-silk text-[10px] text-center mt-2">{caption}</div>
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <div className="p-6 font-vt bg-[#ffd1dc] min-h-full">
      <div className="font-silk text-xl mb-2">★ scrapbook ★</div>
      <div className="text-base mb-4 text-[#444]">
        moodboard / fashion / cartoon-me — drag your eyes around the room.
      </div>
      <div className="flex flex-wrap gap-6 justify-center items-center py-6">
        <Polaroid testId="polaroid-avatar" caption="me, but pixel" rotate={-6}>
          <PixelAvatar variant="main" size={170} className="border-0 shadow-none" />
        </Polaroid>
        {POLAROIDS.map((p) => (
          <Polaroid key={p.id} testId={`polaroid-${p.id}`} {...p} />
        ))}
      </div>
    </div>
  );
}
