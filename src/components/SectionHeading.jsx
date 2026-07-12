import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col ${alignment} max-w-2xl mb-14 gap-4`}>
      {eyebrow && <span className="caption-label">{eyebrow}</span>}
      <h2 className="heading-xl text-white">{title}</h2>
      {subtitle && <p className="text-white/65 text-base sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
