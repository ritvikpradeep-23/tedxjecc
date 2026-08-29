import { useState } from "react";
import { confirmedMembers, openRoles } from "../data/siteData";
import MemberCard from "./MemberCard";
import OpenRoleStub from "./OpenRoleStub";
import OrgChart from "./OrgChart";
import ApplyCTA from "./ApplyCTA";
import SectionHeading from "./SectionHeading";
import Section from "./Section";
import Reveal from "./Reveal";

function PartLabel({ eyebrow, title }) {
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

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wide rounded-full cursor-pointer transition-colors duration-200 ${
        active ? "bg-tedx-red text-white" : "bg-transparent text-white/50 border border-white/15 hover:text-white hover:border-white/40"
      }`}
    >
      {children}
    </button>
  );
}

function PeopleTab() {
  const totalOpenSeats = openRoles.reduce((sum, r) => sum + r.count, 0);

  return (
    <>
      <PartLabel eyebrow="Confirmed" title="Meet the Team" />
      <div className="mb-20 max-w-2xl mx-auto">
        {confirmedMembers.length > 0 ? (
          <div className="divide-y divide-white/10">
            {confirmedMembers.map((person, i) => (
              <MemberCard key={`${person.name}-${i}`} person={person} delay={i * 40} />
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm text-center py-6">
            No confirmed members yet — check back soon.
          </p>
        )}
      </div>

      <PartLabel eyebrow={`${totalOpenSeats} seats`} title="Open Roles" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {openRoles.map((openRole, i) => (
          <OpenRoleStub
            key={`${openRole.tierLabel}-${openRole.team}-${openRole.role}`}
            {...openRole}
            delay={i * 60}
          />
        ))}
      </div>

      <Reveal className="flex justify-center mt-12">
        <ApplyCTA label="See All Open Roles" size="lg" />
      </Reveal>
    </>
  );
}

export default function Team() {
  const [tab, setTab] = useState("people"); // people | org

  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="The Team"
        subtitle="A 23-person core team, organized across three tiers of leadership and execution."
      />

      <Reveal className="flex justify-center gap-3 mb-14">
        <TabButton active={tab === "people"} onClick={() => setTab("people")}>
          People
        </TabButton>
        <TabButton active={tab === "org"} onClick={() => setTab("org")}>
          Org Chart
        </TabButton>
      </Reveal>

      {tab === "people" ? <PeopleTab /> : <OrgChart />}
    </Section>
  );
}
