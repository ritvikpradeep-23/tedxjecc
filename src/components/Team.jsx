import { useState } from "react";
import { confirmedMembers, openRoles } from "../data/siteData";
import ProfileModal from "./ProfileModal";
import OpenRoleStub from "./OpenRoleStub";
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

function ConfirmedMemberRow({ person, onOpen }) {
  const hasPhoto = Boolean(person.photo);
  const roleLabel = person.team ? `${person.role} · ${person.team}` : person.role;

  return (
    <button
      type="button"
      onClick={() => onOpen(person)}
      className="w-full flex items-center gap-4 py-3.5 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer rounded-lg px-2 -mx-2"
    >
      {hasPhoto && (
        <img
          src={person.photo}
          alt={`Portrait of ${person.name}`}
          className="w-11 h-11 rounded-full object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-white text-sm sm:text-base truncate">{person.name}</p>
        <p className="text-white/50 text-xs sm:text-sm mt-0.5 truncate">{roleLabel}</p>
      </div>
    </button>
  );
}

export default function Team() {
  const [selected, setSelected] = useState(null);
  const totalOpenSeats = openRoles.reduce((sum, r) => sum + r.count, 0);

  return (
    <Section id="team" tone="black" container="wide">
      <SectionHeading
        eyebrow="Behind the Curtain"
        title="The Team"
        subtitle="A 23-person core team, organized across three tiers of leadership and execution."
      />

      <PartLabel eyebrow="Confirmed" title="Meet the Team" />
      <Reveal className="mb-20 max-w-2xl mx-auto">
        {confirmedMembers.length > 0 ? (
          <div className="divide-y divide-white/10">
            {confirmedMembers.map((person, i) => (
              <ConfirmedMemberRow key={`${person.name}-${i}`} person={person} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm text-center py-6">
            No confirmed members yet — check back soon.
          </p>
        )}
      </Reveal>

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

      <ProfileModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        data={
          selected && {
            name: selected.name,
            photo: selected.photo,
            roleLabel: selected.team ? `${selected.role} · ${selected.team}` : selected.role,
            bio: selected.bio || selected.longBio,
            linkedin: selected.linkedin,
            whatsapp: selected.whatsapp,
            email: selected.email,
          }
        }
      />
    </Section>
  );
}
