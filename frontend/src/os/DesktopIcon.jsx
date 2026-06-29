import React from "react";

const ICONS = {
  computer: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="2" y="3" width="28" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="5" y="6" width="22" height="14" fill="#ff8fab" />
      <rect x="7" y="8" width="2" height="2" fill="#fff" />
      <rect x="11" y="10" width="10" height="2" fill="#fff" />
      <rect x="11" y="14" width="14" height="2" fill="#fff" />
      <rect x="10" y="24" width="12" height="3" fill="#000" />
      <rect x="6" y="27" width="20" height="2" fill="#000" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="2" y="4" width="28" height="22" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="6" y="18" width="3" height="6" fill="#ff69b4" />
      <rect x="11" y="14" width="3" height="10" fill="#ff69b4" />
      <rect x="16" y="10" width="3" height="14" fill="#39ff14" />
      <rect x="21" y="6" width="3" height="18" fill="#39ff14" />
      <polyline points="6,20 11,16 16,12 21,8 26,6" stroke="#000" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  console: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="3" y="6" width="26" height="20" rx="2" fill="#ff8fab" stroke="#000" strokeWidth="2" />
      <rect x="6" y="9" width="14" height="9" fill="#000" />
      <rect x="7" y="10" width="12" height="7" fill="#39ff14" />
      <circle cx="24" cy="13" r="1.5" fill="#000" />
      <circle cx="24" cy="17" r="1.5" fill="#000" />
      <rect x="6" y="20" width="2" height="4" fill="#000" />
      <rect x="4" y="22" width="6" height="2" fill="#000" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="4" y="4" width="24" height="24" fill="#ff69b4" stroke="#000" strokeWidth="2" />
      <rect x="6" y="6" width="20" height="20" fill="#fff" />
      <rect x="15" y="6" width="2" height="20" fill="#000" />
      <rect x="8" y="10" width="5" height="1" fill="#000" />
      <rect x="8" y="13" width="5" height="1" fill="#000" />
      <rect x="8" y="16" width="5" height="1" fill="#000" />
      <rect x="19" y="10" width="5" height="1" fill="#000" />
      <rect x="19" y="13" width="5" height="1" fill="#000" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="3" y="6" width="26" height="18" fill="#fff" stroke="#000" strokeWidth="2" />
      <polyline points="3,6 16,18 29,6" stroke="#000" strokeWidth="2" fill="none" />
      <circle cx="26" cy="9" r="3" fill="#ff69b4" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  gallery: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="4" y="6" width="24" height="20" fill="#fff" stroke="#000" strokeWidth="2" />
      <circle cx="10" cy="13" r="2" fill="#ffd700" />
      <polygon points="6,22 13,15 18,20 22,16 27,22" fill="#ff8fab" stroke="#000" strokeWidth="1.5" />
    </svg>
  ),
  dressup: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <polygon points="10,6 22,6 26,12 22,14 22,26 10,26 10,14 6,12" fill="#ff69b4" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="9" r="1.5" fill="#000" />
    </svg>
  ),
  bin: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="8" y="9" width="16" height="18" fill="#fff" stroke="#000" strokeWidth="2" />
      <rect x="6" y="6" width="20" height="3" fill="#ff69b4" stroke="#000" strokeWidth="2" />
      <rect x="12" y="13" width="2" height="10" fill="#000" />
      <rect x="16" y="13" width="2" height="10" fill="#000" />
      <rect x="20" y="13" width="2" height="10" fill="#000" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <rect x="4" y="4" width="24" height="24" fill="#fff" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="16" r="9" fill="#ff8fab" stroke="#000" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" fill="#000" />
      <rect x="20" y="7" width="2" height="10" fill="#000" />
      <rect x="22" y="7" width="3" height="3" fill="#000" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 32 32" width="36" height="36" shapeRendering="crispEdges">
      <path d="M16 26 L4 14 Q4 8 10 8 Q13 8 16 12 Q19 8 22 8 Q28 8 28 14 Z" fill="#ff69b4" stroke="#000" strokeWidth="2" />
    </svg>
  ),
};

export function PixelIcon({ name }) {
  return ICONS[name] || ICONS.heart;
}

export default function DesktopIcon({ name, label, onOpen, testId, position }) {
  return (
    <button
      data-testid={testId}
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="absolute w-[88px] flex flex-col items-center gap-1 p-1 hover:bg-black/10 group focus:outline-none no-select"
      style={{ left: position?.x ?? 24, top: position?.y ?? 24 }}
    >
      <div className="icon-frame group-hover:bg-[#ffd1dc]">
        <PixelIcon name={name} />
      </div>
      <span
        className="font-silk text-[10px] text-center text-black bg-white/80 border-2 border-black px-1 leading-none whitespace-nowrap group-hover:bg-[#ff69b4]"
        style={{ textShadow: "1px 1px 0 #fff" }}
      >
        {label}
      </span>
    </button>
  );
}
