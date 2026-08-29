import { leadership, tier2Teams, tier3Teams, tierLabels } from "../data/siteData";
import OrganizerCard from "./OrganizerCard";
import TeamBlock from "./TeamBlock";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

function TierLabel({ eyebrow, title }) {
  return (
    <Reveal className="flex items-center gap-4 mb-8">
      <div className="flex flex-col">
        <span className="caption-label">{eyebrow}</span>
        <span className="text-white font-display font-bold text-xl mt-1">{title}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
    </Reveal>
  );
}

export default function Team() {
  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="Meet the Team"
        subtitle="A 23-person core team, organized across three tiers of leadership and execution."
      />

      <TierLabel eyebrow="Tier 1" title={tierLabels.tier1} />
      <Reveal className="mb-20">
        <p className="text-white/55 text-sm max-w-2xl mb-8">{leadership.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leadership.members.map((person, i) => (
            <OrganizerCard key={`${person.name}-${i}`} organizer={person} delay={i * 100} />
          ))}
        </div>
      </Reveal>

      <TierLabel eyebrow="Tier 2" title={tierLabels.tier2} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {tier2Teams.map((team, i) => (
          <TeamBlock key={team.id} team={team} index={i} />
        ))}
      </div>

      <TierLabel eyebrow="Tier 3" title={tierLabels.tier3} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tier3Teams.map((team, i) => (
          <TeamBlock key={team.id} team={team} index={i} compact />
        ))}
      </div>
    </Section>
  );
}
