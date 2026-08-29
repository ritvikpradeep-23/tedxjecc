import { useState } from "react";
import Reveal from "./Reveal";
import ProfileModal from "./ProfileModal";
import TeamRoleRow from "./TeamRoleRow";

export default function TeamBlock({ team }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Reveal>
        <h3 className="heading-lg text-white">{team.name}</h3>
        <p className="text-white/55 text-sm mt-1 mb-4">{team.description}</p>
        <div className="divide-y divide-white/10">
          <TeamRoleRow person={team.head} role="Head" onOpen={setSelected} />
          {team.members.map((member, i) => (
            <TeamRoleRow key={`${member.name}-${i}`} person={member} role="Member" onOpen={setSelected} />
          ))}
        </div>
      </Reveal>

      <ProfileModal
        isOpen={Boolean(selected)}
        onClose={() => setSelected(null)}
        data={
          selected && {
            name: selected.name,
            photo: selected.photo,
            roleLabel: `${selected.role} · ${selected.team}`,
            bio: selected.bio,
            linkedin: selected.linkedin,
            whatsapp: selected.whatsapp,
            email: selected.email,
          }
        }
      />
    </>
  );
}
