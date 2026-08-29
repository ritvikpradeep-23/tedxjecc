// Low-opacity decorative background evoking the "Beyond Boundaries" theme —
// concentric circles expanding outward. Strictly red/white/black via
// `currentColor` + opacity utilities on the wrapping element. Confined to
// the hero section only — see src/components/Hero.jsx.

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
