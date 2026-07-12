const tones = {
  charcoal: "bg-tedx-charcoal",
  black: "bg-tedx-black",
  transparent: "bg-transparent",
};

export default function Card({
  as: Tag = "div",
  tone = "charcoal",
  hover = true,
  accent = false,
  className = "",
  children,
  ...props
}) {
  const border = accent ? "border-2 border-tedx-red" : "border border-white/10";
  const hoverFx = hover
    ? "transition-all duration-300 hover:border-tedx-red/60 hover:shadow-[0_0_30px_rgba(230,43,30,0.22)] hover:-translate-y-1"
    : "transition-colors duration-300";

  return (
    <Tag className={`rounded-2xl ${tones[tone]} ${border} ${hoverFx} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
