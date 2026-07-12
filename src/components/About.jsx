import { eventTheme } from "../data/siteData";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="theme" tone="charcoal" container="narrow" pattern="circles">
      <Reveal className="text-center">
        <span className="caption-label">This Year's Theme</span>
        <h2 className="heading-xl text-white mt-4">{eventTheme.name}</h2>
        <p className="body-text mt-6 max-w-xl mx-auto">{eventTheme.description}</p>

        <p className="text-white/55 text-sm sm:text-base mt-5 max-w-lg mx-auto leading-relaxed">
          Talks span multiple disciplines under this theme — technology, art, social impact,
          science, and personal growth all share the same stage.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {eventTheme.disciplines.map((discipline) => (
            <span
              key={discipline}
              className="px-4 py-1.5 rounded-full border border-tedx-red/40 bg-tedx-red/10 text-white text-xs font-semibold uppercase tracking-wide"
            >
              {discipline}
            </span>
          ))}
        </div>

        <div className="w-16 h-px bg-white/15 mx-auto my-12" />

        <span className="caption-label">What is TEDx?</span>
        <h3 className="heading-lg text-white mt-4">x = independently organized event</h3>
        <p className="text-white/60 text-sm sm:text-base mt-5 max-w-lg mx-auto leading-relaxed">
          In the spirit of ideas worth spreading, TEDx is a program of local, self-organized
          events that bring people together to share a TED-like experience. At an independently
          organized TEDx event, TEDTalks video and live speakers combine to spark deep discussion
          and connection at the community level.
        </p>
      </Reveal>
    </Section>
  );
}
