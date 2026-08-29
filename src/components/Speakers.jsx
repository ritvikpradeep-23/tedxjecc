import { featuredSpeakers, openCallSpeakers } from "../data/siteData";
import SpeakerCard from "./SpeakerCard";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Speakers() {
  return (
    <Section id="speakers" tone="black" container="wide">
      <SectionHeading
        title="Speakers"
        subtitle="Ten voices, one stage — invited experts and campus talent, side by side."
      />

      <Reveal className="text-center italic text-white/45 text-sm sm:text-base max-w-xl mx-auto -mt-8 mb-14">
        Sample lineup shown for illustration — confirmed speakers announced closer to the event.
      </Reveal>

      <Reveal className="flex items-center gap-4 mb-6">
        <span className="text-tedx-red font-display font-bold text-lg">Featured Speakers</span>
        <div className="h-px flex-1 bg-gradient-to-r from-tedx-red/60 to-transparent" />
      </Reveal>

      <div className="divide-y divide-white/10 max-w-3xl mx-auto mb-16">
        {featuredSpeakers.map((speaker, i) => (
          <SpeakerCard key={speaker.name} speaker={speaker} delay={i * 60} />
        ))}
      </div>

      <Reveal className="flex items-center gap-4 mb-6">
        <span className="text-white font-display font-bold text-lg">Open Call Speakers</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
      </Reveal>

      <div className="divide-y divide-white/10 max-w-3xl mx-auto">
        {openCallSpeakers.map((speaker, i) => (
          <SpeakerCard key={speaker.name} speaker={speaker} delay={i * 60} />
        ))}
      </div>
    </Section>
  );
}
