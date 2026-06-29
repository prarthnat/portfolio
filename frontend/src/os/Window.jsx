import React, { useEffect, useRef, useState } from "react";

/**
 * Draggable, focusable, closeable retro Window component.
 */
export default function Window({
  id,
  title,
  icon,
  initial = { x: 80, y: 60, w: 720, h: 480 },
  zIndex,
  onFocus,
  onClose,
  onMinimize,
  testId,
  children,
}) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y });
  const [size] = useState({ w: initial.w, h: initial.h });
  const [maximized, setMaximized] = useState(false);
  const dragRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const clamp = () => {
      setPos((p) => ({
        x: Math.max(0, Math.min(p.x, window.innerWidth - 80)),
        y: Math.max(0, Math.min(p.y, window.innerHeight - 80)),
      }));
    };
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, []);

  // Drag from the dedicated handle ONLY (so titlebar buttons never trigger drag/capture)
  const onHandleDown = (e) => {
    if (maximized) return;
    dragging.current = true;
    const rect = dragRef.current.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    onFocus?.(id);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onHandleMove = (e) => {
    if (!dragging.current) return;
    const nx = Math.max(0, Math.min(window.innerWidth - 120, e.clientX - offset.current.x));
    const ny = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - offset.current.y));
    setPos({ x: nx, y: ny });
  };
  const onHandleUp = () => {
    dragging.current = false;
  };

  const style = maximized
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 56px)" }
    : { left: pos.x, top: pos.y, width: size.w, height: size.h };

  const stopAll = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      ref={dragRef}
      data-testid={testId || `window-${id}`}
      className="absolute bg-white border-[3px] border-black pp-shadow-lg flex flex-col no-select"
      style={{ ...style, zIndex }}
      onMouseDown={() => onFocus?.(id)}
    >
      <div
        className="titlebar h-9 flex items-center justify-between px-2"
        onDoubleClick={(e) => {
          if (e.target.closest && e.target.closest("button")) return;
          setMaximized((m) => !m);
        }}
      >
        {/* Drag handle = only the title text region */}
        <div
          data-testid={`window-drag-${id}`}
          className="flex items-center gap-2 font-silk text-[12px] text-black flex-1 h-full cursor-move pr-2"
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={onHandleUp}
        >
          <span aria-hidden>{icon || "♥"}</span>
          <span data-testid={`window-title-${id}`}>{title}</span>
        </div>

        {/* Buttons live outside the drag area entirely */}
        <div className="flex items-center gap-1" onPointerDown={stopAll} onMouseDown={stopAll}>
          <button
            type="button"
            data-testid={`window-min-${id}`}
            className="w-6 h-6 bg-white border-2 border-black font-silk text-[10px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize?.(id);
            }}
            aria-label="minimize"
          >
            _
          </button>
          <button
            type="button"
            data-testid={`window-max-${id}`}
            className="w-6 h-6 bg-white border-2 border-black font-silk text-[10px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setMaximized((m) => !m);
            }}
            aria-label="maximize"
          >
            □
          </button>
          <button
            type="button"
            data-testid={`window-close-${id}`}
            className="w-6 h-6 bg-[#ff8fab] border-2 border-black font-silk text-[10px] hover:bg-[#ff69b4] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose?.(id);
            }}
            aria-label="close"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto win-body">{children}</div>
    </div>
  );
}
