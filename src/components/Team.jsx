import { leadership, tier2Teams, tier3Teams } from "../data/siteData";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

// Flatten every seat — leadership, then each core and outreach team's head
// followed by its members — into one list for the grid.
function allPeople() {
  const list = leadership.members.map((p) => ({ ...p, group: "Leadership" }));
  [...tier2Teams, ...tier3Teams].forEach((team) => {
    list.push({ ...team.head, role: "Head", group: team.name });
    team.members.forEach((m) => list.push({ ...m, role: "Member", group: team.name }));
  });
  return list;
}

function PersonCard({ person, delay }) {
  const filled = person.name !== "TBD";
  return (
    <Reveal delay={delay} className="rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col gap-3">
      {person.photo ? (
        <img src={person.photo} alt={person.name} loading="lazy" className="w-16 h-16 rounded-xl object-cover" />
      ) : (
        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10" aria-hidden="true" />
      )}
      <div>
        <h3 className={filled ? "font-display font-bold text-white text-base" : "font-display font-bold text-white/35 italic text-base"}>
          {filled ? person.name : "To be announced"}
        </h3>
        <p className="text-tedx-red text-xs font-semibold uppercase tracking-wide mt-1">{person.group}</p>
        {person.role && <p className="text-white/50 text-xs mt-0.5">{person.role}</p>}
      </div>
    </Reveal>
  );
}

function PeopleGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {allPeople().map((person, i) => (
        <PersonCard key={`${person.group}-${person.role}-${i}`} person={person} delay={(i % 8) * 40} />
      ))}
    </div>
  );
}

export default function Team() {
  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="The Team"
        subtitle="Everyone behind TEDxJEC, organized across leadership and the core teams."
      />
      <PeopleGrid />
    </Section>
  );
}
