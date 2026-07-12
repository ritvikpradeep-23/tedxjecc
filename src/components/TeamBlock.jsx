import { useState } from "react";
import Card from "./Card";
import Reveal from "./Reveal";
import ProfileModal from "./ProfileModal";

function PersonCard({ person, label, size = "md", onOpen }) {
  const isHead = size === "lg";
  return (
    <button
      type="button"
      onClick={() => onOpen(person)}
      className="group flex flex-col items-center text-center rounded-xl p-3 -m-3 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 cursor-pointer"
    >
      <img
        src={person.photo}
        alt={`Portrait of ${person.name}, ${label.toLowerCase()}`}
        className={`rounded-full object-cover border-2 transition-all duration-300 group-hover:scale-105 ${
          isHead
            ? "w-24 h-24 sm:w-28 sm:h-28 border-tedx-red group-hover:shadow-[0_0_25px_rgba(230,43,30,0.4)]"
            : "w-16 h-16 sm:w-20 sm:h-20 border-white/20 group-hover:border-tedx-red/60 group-hover:shadow-[0_0_18px_rgba(230,43,30,0.3)]"
        }`}
      />
      <p className={`font-semibold text-white mt-3 ${isHead ? "text-base" : "text-sm"}`}>
        {person.name}
      </p>
      <span
        className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${
          isHead ? "text-tedx-red" : "text-white/45"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export default function TeamBlock({ team, index, compact = false }) {
  const tone = index % 2 === 0 ? "charcoal" : "black";
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Reveal className="h-full">
        <Card tone={tone} hover={false} className="p-6 sm:p-8 h-full">
          <div className="mb-8">
            <h3 className="heading-lg text-white">{team.name}</h3>
            <p className="text-white/55 text-sm mt-1">{team.description}</p>
          </div>

          {compact ? (
            <div className="flex flex-col items-center gap-8">
              <PersonCard person={team.head} label="Head" size="lg" onOpen={setSelected} />
              <div className="w-full h-px bg-white/10" />
              <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-xs">
                {team.members.map((member) => (
                  <PersonCard key={member.name} person={member} label="Member" size="sm" onOpen={setSelected} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">
              <PersonCard person={team.head} label="Head" size="lg" onOpen={setSelected} />
              <div className="hidden lg:block w-px self-stretch bg-white/10" />
              <div className="grid grid-cols-3 gap-5 sm:gap-8">
                {team.members.map((member) => (
                  <PersonCard key={member.name} person={member} label="Member" size="sm" onOpen={setSelected} />
                ))}
              </div>
            </div>
          )}
        </Card>
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
