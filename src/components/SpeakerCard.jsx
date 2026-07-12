import { useState } from "react";
import Card from "./Card";
import Reveal from "./Reveal";
import ProfileModal from "./ProfileModal";

export default function SpeakerCard({ speaker, delay = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal delay={delay} className="group h-full">
        <Card
          as="button"
          type="button"
          onClick={() => setOpen(true)}
          className="overflow-hidden h-full w-full flex flex-col text-left cursor-pointer"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={speaker.photo}
              alt={`Portrait of ${speaker.name}`}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <h3 className="heading-md text-white">{speaker.name}</h3>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mt-1">
              {speaker.bio}
            </p>
            <p className="text-white/60 text-sm mt-3 leading-snug">"{speaker.talkTitle}"</p>
          </div>
        </Card>
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
