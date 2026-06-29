import React, { useEffect, useState } from "react";
import { PixelIcon } from "./DesktopIcon";

export default function Taskbar({
  windows,
  activeId,
  onFocus,
  onToggleStart,
  startOpen,
  theme,
  onThemeToggle,
}) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);
  const hh = time.getHours().toString().padStart(2, "0");
  const mm = time.getMinutes().toString().padStart(2, "0");
  const isDark = theme === "dark";

  return (
    <div
      data-testid="taskbar"
      className={`fixed bottom-0 left-0 right-0 h-14 border-t-[3px] border-black flex items-center gap-2 px-2 z-[9999] no-select ${
        isDark ? "bg-[#3a1226]" : "bg-[#ffb6c1]"
      }`}
      style={{ boxShadow: "0 -3px 0 0 rgba(0,0,0,0.15)" }}
    >
      <button
        type="button"
        data-testid="start-button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleStart();
        }}
        className={`pp-btn flex items-center gap-2 h-10 ${startOpen ? "bg-[#ff69b4]" : ""}`}
      >
        <span aria-hidden>♥</span>
        <span>start</span>
      </button>
      <div className="flex-1 flex items-center gap-1 overflow-x-auto h-10">
        {windows
          .filter((w) => !w.closed)
          .map((w) => (
            <button
              type="button"
              key={w.id}
              data-testid={`taskbar-item-${w.id}`}
              onClick={() => onFocus(w.id)}
              className={`pp-btn h-9 flex items-center gap-2 min-w-[120px] truncate ${
                activeId === w.id && !w.minimized ? "bg-[#ff69b4]" : ""
              } ${w.minimized ? "opacity-70" : ""}`}
            >
              <span className="scale-50 -ml-2">
                <PixelIcon name={w.icon} />
              </span>
              <span className="truncate">{w.title}</span>
            </button>
          ))}
      </div>
      <button
        type="button"
        data-testid="taskbar-theme"
        onClick={onThemeToggle}
        className="pp-btn h-9"
        title="toggle midnight pink"
      >
        {isDark ? "☾ midnight" : "☀ pastel"}
      </button>
      <div
        data-testid="taskbar-clock"
        className="h-10 px-3 flex items-center font-silk text-[12px] bg-white border-2 border-black"
      >
        {hh}:{mm}
      </div>
    </div>
  );
}
