import { useState } from "react";
import { leadership, tier2Teams, tier3Teams, tierLabels } from "../data/siteData";
import TeamRoleRow from "./TeamRoleRow";
import TeamBlock from "./TeamBlock";
import ProfileModal from "./ProfileModal";
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
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="Meet the Team"
        subtitle="A 23-person core team, organized across three tiers of leadership and execution."
      />

      <TierLabel eyebrow="Tier 1" title={tierLabels.tier1} />
      <Reveal className="mb-20">
        <p className="text-white/55 text-sm max-w-2xl mb-6">{leadership.description}</p>
        <div className="max-w-2xl mx-auto divide-y divide-white/10">
          {leadership.members.map((person, i) => (
            <TeamRoleRow key={`${person.name}-${i}`} person={person} role={person.role} onOpen={setSelectedLeader} />
          ))}
        </div>
      </Reveal>

      <TierLabel eyebrow="Tier 2" title={tierLabels.tier2} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-10 mb-20">
        {tier2Teams.map((team) => (
          <TeamBlock key={team.id} team={team} />
        ))}
      </div>

      <TierLabel eyebrow="Tier 3" title={tierLabels.tier3} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-10">
        {tier3Teams.map((team) => (
          <TeamBlock key={team.id} team={team} />
        ))}
      </div>

      <ProfileModal
        isOpen={Boolean(selectedLeader)}
        onClose={() => setSelectedLeader(null)}
        data={
          selectedLeader && {
            name: selectedLeader.name,
            photo: selectedLeader.photo,
            roleLabel: selectedLeader.role,
            bio: selectedLeader.longBio,
            linkedin: selectedLeader.linkedin,
            whatsapp: selectedLeader.whatsapp,
            email: selectedLeader.email,
          }
        }
      />
    </Section>
  );
}
