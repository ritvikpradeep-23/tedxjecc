import { featuredSpeakers, openCallSpeakers } from "../data/siteData";
import SpeakerCard from "./SpeakerCard";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Speakers() {
  return (
    <Section id="speakers" tone="black" container="wide" pattern="grid">
      <SectionHeading
        eyebrow="The Lineup"
        title="Speakers"
        subtitle="Ten voices, one stage — invited experts and campus talent, side by side."
      />

      <Reveal className="flex items-center gap-4 mb-10">
        <span className="text-tedx-red font-display font-bold text-lg">Featured Speakers</span>
        <div className="h-px flex-1 bg-gradient-to-r from-tedx-red/60 to-transparent" />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-20">
        {featuredSpeakers.map((speaker, i) => (
          <SpeakerCard key={speaker.name} speaker={speaker} delay={i * 80} />
        ))}
      </div>

      <Reveal className="flex items-center gap-4 mb-10">
        <span className="text-white font-display font-bold text-lg">Open Call Speakers</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {openCallSpeakers.map((speaker, i) => (
          <SpeakerCard key={speaker.name} speaker={speaker} delay={i * 80} />
        ))}
      </div>
    </Section>
  );
}
