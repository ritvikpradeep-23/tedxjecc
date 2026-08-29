import { useState } from "react";
import Reveal from "./Reveal";
import ProfileModal from "./ProfileModal";

export default function SpeakerCard({ speaker, delay = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal delay={delay}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group w-full flex items-center gap-4 sm:gap-5 py-4 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer rounded-lg px-2 -mx-2"
        >
          <img
            src={speaker.photo}
            alt={`Portrait of ${speaker.name}`}
            loading="lazy"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="heading-md text-white truncate">{speaker.name}</h3>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mt-0.5 truncate">
              {speaker.bio}
            </p>
            <p className="text-white/60 text-sm mt-1 italic truncate">"{speaker.talkTitle}"</p>
          </div>
        </button>
      </Reveal>

      <ProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={{
          name: speaker.name,
          photo: speaker.photo,
          roleLabel: speaker.bio,
          bio: speaker.longBio,
          linkedin: speaker.linkedin,
          whatsapp: speaker.whatsapp,
          email: speaker.email,
          talkTitle: speaker.talkTitle,
          talkDescription: speaker.talkDescription,
        }}
      />
    </>
  );
}
