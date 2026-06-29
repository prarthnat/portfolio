import React from "react";

/**
 * Pixel avatar of Prarthna. Tries to load AI-generated images from /avatars/avatar_main.png
 * with graceful SVG fallback if not yet generated.
 */
export default function PixelAvatar({ variant = "main", size = 160, className = "" }) {
  const src = `/avatars/avatar_${variant}.png`;
  const [errored, setErrored] = React.useState(false);

  if (!errored) {
    return (
      <img
        data-testid={`pixel-avatar-${variant}`}
        src={src}
        alt="pixel avatar of Prarthna"
        width={size}
        height={size}
        onError={() => setErrored(true)}
        className={`border-[3px] border-black pp-shadow bg-[#ffd1dc] ${className}`}
        style={{ imageRendering: "pixelated", objectFit: "cover" }}
      />
    );
  }

  // SVG fallback — chibi sprite, pastel pink, brown skin, dark hair, dimples
  return (
    <svg
      data-testid={`pixel-avatar-${variant}-fallback`}
      viewBox="0 0 32 32"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={`border-[3px] border-black pp-shadow bg-[#ffd1dc] ${className}`}
    >
      {/* hair back */}
      <rect x="6" y="6" width="20" height="18" fill="#3a1d12" />
      {/* face */}
      <rect x="9" y="9" width="14" height="14" fill="#a06a44" />
      {/* hair top */}
      <rect x="6" y="6" width="20" height="5" fill="#2a140a" />
      <rect x="7" y="11" width="2" height="6" fill="#2a140a" />
      <rect x="23" y="11" width="2" height="6" fill="#2a140a" />
      {/* eyes */}
      <rect x="12" y="14" width="2" height="2" fill="#0a0a0a" />
      <rect x="18" y="14" width="2" height="2" fill="#0a0a0a" />
      <rect x="12" y="14" width="1" height="1" fill="#fff" />
      <rect x="18" y="14" width="1" height="1" fill="#fff" />
      {/* dimples */}
      <rect x="11" y="19" width="1" height="1" fill="#7a4a30" />
      <rect x="20" y="19" width="1" height="1" fill="#7a4a30" />
      {/* lips */}
      <rect x="14" y="19" width="4" height="2" fill="#ff69b4" />
      <rect x="15" y="20" width="2" height="1" fill="#ff8fab" />
      {/* body / pink top */}
      <rect x="9" y="23" width="14" height="7" fill="#ff8fab" />
      <rect x="9" y="23" width="14" height="1" fill="#ff69b4" />
      {/* heart */}
      <rect x="15" y="26" width="2" height="1" fill="#fff" />
      <rect x="14" y="27" width="4" height="1" fill="#fff" />
      <rect x="15" y="28" width="2" height="1" fill="#fff" />
    </svg>
  );
}
