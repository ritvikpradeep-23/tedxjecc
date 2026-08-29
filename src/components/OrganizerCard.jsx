import { useState } from "react";
import Card from "./Card";
import Reveal from "./Reveal";
import ProfileModal from "./ProfileModal";

export default function OrganizerCard({ organizer, delay = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal delay={delay} className="h-full">
        <Card
          as="button"
          type="button"
          onClick={() => setOpen(true)}
          className="flex flex-col items-center text-center p-8 sm:p-10 h-full w-full cursor-pointer"
        >
          <img
            src={organizer.photo}
            alt={`Portrait of ${organizer.name}`}
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-tedx-red/70"
          />
          <h3 className="heading-lg text-white mt-6">{organizer.name}</h3>
          <span className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
            {organizer.role}
          </span>
          <p className="text-white/60 text-sm mt-4 max-w-xs">{organizer.description}</p>
        </Card>
      </Reveal>

      <ProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={{
          name: organizer.name,
          photo: organizer.photo,
          roleLabel: organizer.role,
          bio: organizer.longBio,
          linkedin: organizer.linkedin,
          whatsapp: organizer.whatsapp,
          email: organizer.email,
        }}
      />
    </>
  );
}
