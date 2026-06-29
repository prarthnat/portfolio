import React, { useEffect, useState } from "react";

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(t);
          setTimeout(onDone, 350);
          return 100;
        }
        return p + 4 + Math.floor(Math.random() * 6);
      });
    }, 120);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div
      data-testid="boot-screen"
      className="fixed inset-0 boot-bg flex flex-col items-center justify-center z-[10000]"
    >
      <div className="font-silk text-[#ff8fab] text-2xl sm:text-4xl mb-6 text-center">
        <span className="text-white">prarthna</span>OS
      </div>
      <div className="font-vt text-xl text-white/90 mb-8 text-center max-w-[80vw]">
        loading <span className="blink">_</span> please wait while we boot the dream PC ♡
      </div>
      <div className="w-72 sm:w-96 h-6 border-2 border-[#ff8fab] bg-black relative">
        <div
          className="h-full bg-[#ff69b4]"
          style={{
            width: `${Math.min(100, progress)}%`,
            backgroundImage:
              "repeating-linear-gradient(45deg, #ff69b4 0 6px, #ff8fab 6px 12px)",
          }}
        />
      </div>
      <div className="font-vt text-[#ff8fab] mt-3 text-sm">
        {Math.min(100, progress)}% — installing lipgloss.dll
      </div>
      <div className="absolute bottom-6 font-vt text-[#ff8fab] text-xs opacity-70">
        © 2026 prarthna industries · all rights reserved (and resented if you don&apos;t hire her)
      </div>
    </div>
  );
}
