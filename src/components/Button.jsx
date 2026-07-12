const variants = {
  primary:
    "bg-tedx-red text-white border border-tedx-red hover:bg-tedx-red-dark hover:border-tedx-red-dark hover:shadow-[0_0_25px_rgba(230,43,30,0.5)] active:scale-95",
  secondary:
    "bg-transparent text-white border border-white/70 hover:border-tedx-red hover:text-tedx-red hover:shadow-[0_0_20px_rgba(230,43,30,0.25)] active:scale-95",
  ghost:
    "bg-transparent text-tedx-red border border-tedx-red/60 hover:bg-tedx-red/10 active:scale-95",
};

export default function Button({
  as: Tag = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-tedx-red focus-visible:ring-offset-2 focus-visible:ring-offset-tedx-black ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
