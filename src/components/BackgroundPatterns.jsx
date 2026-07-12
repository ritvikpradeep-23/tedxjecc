// Low-opacity decorative backgrounds evoking the "Beyond Boundaries" theme —
// grids fracturing, circles expanding, arrows breaking through lines. Strictly
// red/white/black via `currentColor` + opacity utilities on the wrapping element.

export function GridBreakPattern({ className = "" }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="gridBreakTop" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0H0V56" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <pattern id="gridBreakBottom" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="translate(20 0)">
          <path d="M56 0H0V56" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="270" fill="url(#gridBreakTop)" />
      <rect y="330" width="800" height="270" fill="url(#gridBreakBottom)" />
      <path d="M-40 300 L840 270" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M-40 340 L840 310" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

export function ExpandingCirclesPattern({ className = "" }) {
  const radii = [60, 120, 180, 240, 300, 360];
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {radii.map((r) => (
        <circle key={r} cx="400" cy="300" r={r} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function ArrowBreakPattern({ className = "" }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 800 120"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      <path d="M0 60H800" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {[160, 400, 640].map((x) => (
        <path
          key={x}
          d={`M${x - 22} 40 L${x} 60 L${x - 22} 80 M${x - 8} 40 L${x + 14} 60 L${x - 8} 80`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function HorizonGlow({ className = "" }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(to top, rgba(230,43,30,0.12), transparent 40%), radial-gradient(ellipse 70% 40% at 50% 100%, rgba(255,255,255,0.06), transparent 70%)",
      }}
    />
  );
}
