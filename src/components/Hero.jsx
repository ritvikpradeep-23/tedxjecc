import { eventInfo, eventTheme } from "../data/siteData";
import Button from "./Button";
import Reveal from "./Reveal";
import { ExpandingCirclesPattern } from "./BackgroundPatterns";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-tedx-black px-6"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 25%, rgba(230,43,30,0.24), transparent 70%), radial-gradient(ellipse 40% 40% at 80% 85%, rgba(255,255,255,0.06), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.035]" />
      <ExpandingCirclesPattern className="text-tedx-red/[0.09]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto pt-28 pb-16">
        <Reveal>
          <p className="text-xs sm:text-sm tracking-[0.4em] text-white/50 uppercase mb-6">
            x = independently organized TED event
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="heading-hero">
            <span className="text-white">TED</span>
            <span className="text-tedx-red">x</span>
            <br />
            <span className="text-white">JECC</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-col items-center gap-2 relative">
            <div className="absolute -inset-x-10 -inset-y-4 bg-tedx-red/10 blur-2xl rounded-full -z-10" />
            <span className="caption-label">Theme</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              {eventTheme.name}
            </h2>
            <p className="text-white/65 text-sm sm:text-base max-w-md mt-1">{eventTheme.oneLiner}</p>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-10 text-lg sm:text-xl text-white/80 font-medium max-w-xl">
            {eventInfo.tagline}
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-white/60 text-sm sm:text-base">
            <span>{eventInfo.date}</span>
            <span className="hidden sm:inline text-tedx-red">•</span>
            <span>{eventInfo.time}</span>
            <span className="hidden sm:inline text-tedx-red">•</span>
            <span>{eventInfo.venue}</span>
          </div>
        </Reveal>

        <Reveal delay={480}>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Button as="a" href="#tickets" variant="primary">
              Get Tickets
            </Button>
            <Button as="a" href="#speakers" variant="secondary">
              Meet the Speakers
            </Button>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white/40">
          <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
