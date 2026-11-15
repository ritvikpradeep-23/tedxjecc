import { leadership, tier2Teams, tier3Teams } from "../data/siteData";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

function Avatar({ photo, name, size = "w-12 h-12" }) {
  return photo ? (
    <img src={photo} alt={name} loading="lazy" className={`${size} rounded-lg object-cover shrink-0`} />
  ) : (
    <div className={`${size} rounded-lg bg-white/5 border border-white/10 shrink-0`} aria-hidden="true" />
  );
}

function Name({ name, className = "" }) {
  const filled = name !== "TBD";
  return (
    <span
      className={`${className} ${
        filled ? "text-white font-semibold" : "text-white/35 italic"
      }`}
    >
      {filled ? name : "To be announced"}
    </span>
  );
}

// Leadership: one row of seats, each with its own role label.
function LeadershipCard() {
  return (
    <Reveal className="rounded-2xl border border-tedx-red/30 bg-tedx-red/[0.04] p-6">
      <p className="text-tedx-red text-[11px] font-bold uppercase tracking-[0.2em] mb-5">Leadership</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {leadership.members.map((person, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-black/30 border border-white/10 p-3">
            <Avatar photo={person.photo} name={person.name} />
            <div className="min-w-0">
              <Name name={person.name} className="block text-sm truncate" />
              <span className="block text-white/50 text-[11px] uppercase tracking-wide mt-0.5">{person.role}</span>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

// One team as a tree: the head sits at the top, members hang off a vertical
// connector line beneath.
function TeamTree({ team }) {
  return (
    <Reveal className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 flex flex-col">
      <h4 className="font-display font-bold text-white text-lg">{team.name}</h4>
      <div className="h-px w-10 bg-tedx-red mt-2 mb-5" />

      <div className="flex items-center gap-3 rounded-xl bg-tedx-red/5 border border-tedx-red/30 p-3">
        <Avatar photo={team.head.photo} name={team.head.name} />
        <div className="min-w-0">
          <Name name={team.head.name} className="block text-sm truncate" />
          <span className="block text-tedx-red text-[11px] font-bold uppercase tracking-wide mt-0.5">Head</span>
        </div>
      </div>

      {team.members.length > 0 && (
        <div className="ml-5 mt-3 pl-5 border-l border-white/15 flex flex-col gap-2.5">
          {team.members.map((member, i) => (
            <div key={i} className="relative flex items-center gap-3 rounded-lg p-2">
              <span className="absolute -left-5 top-1/2 w-5 h-px bg-white/15" aria-hidden="true" />
              <Avatar photo={member.photo} name={member.name} size="w-9 h-9" />
              <Name name={member.name} className="text-sm truncate" />
            </div>
          ))}
        </div>
      )}
    </Reveal>
  );
}

export default function Team() {
  const teams = [...tier2Teams, ...tier3Teams];

  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="The Team"
        subtitle="Everyone behind TEDxJEC Cheruthuruthy, organized across leadership and the core teams."
      />

      <div className="flex flex-col gap-6">
        <LeadershipCard />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => (
            <TeamTree key={team.id} team={team} />
          ))}
        </div>
      </div>
    </Section>
  );
}
