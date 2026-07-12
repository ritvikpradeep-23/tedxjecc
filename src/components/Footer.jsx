import { eventInfo, socialLinks } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="relative bg-tedx-black border-t border-white/10 px-6 py-14 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        <a href="#hero" className="font-display text-xl font-bold text-white">
          TED<span className="text-tedx-red">x</span>
          <span className="text-white">JECC</span>
        </a>

        <p className="text-white/50 text-sm max-w-md">{eventInfo.affiliation}</p>

        <a href={`mailto:${eventInfo.contactEmail}`} className="text-white/70 text-sm hover:text-tedx-red transition-colors">
          {eventInfo.contactEmail}
        </a>

        <div className="flex items-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-white/40 text-xs font-semibold uppercase tracking-wide hover:text-tedx-red transition-colors"
            >
              {social.label}
            </a>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 my-2" />

        <p className="text-white/30 text-xs">
          This independent TEDx event is operated under license from TED.
        </p>
        <p className="text-white/20 text-[11px] tracking-widest uppercase">
          TEDx · TEDx · TEDx
        </p>
      </div>
    </footer>
  );
}
