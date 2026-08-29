const containers = {
  narrow: "max-w-3xl",
  normal: "max-w-6xl",
  wide: "max-w-7xl",
};

const tones = {
  black: "bg-tedx-black",
  charcoal: "bg-tedx-charcoal",
};

export default function Section({ id, tone = "black", container = "normal", className = "", children }) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 px-6 overflow-hidden ${tones[tone]} ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" />
      <div className={`relative z-10 ${containers[container]} mx-auto`}>{children}</div>
    </section>
  );
}
