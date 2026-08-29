import { useState } from "react";
import { slugify } from "../data/siteData";
import ProfileModal from "./ProfileModal";
import Reveal from "./Reveal";

// Deliberately generic, obviously-a-placeholder lines — not fabricated
// personal statements. Swap in someone's real quote via a `quote` field on
// their entry in siteData.js and it wins over this automatically; until
// then, every confirmed member gets a stable (not re-randomized on every
// render) filler quote picked from this pool by a hash of their name.
const PLACEHOLDER_QUOTES = [
  "Still deciding what to be quoted on.",
  "Ask again once the event's actually happened.",
  "This quote is temporary. The enthusiasm is not.",
  "Working on something more interesting than this.",
  "Real quote pending — vibes are real though.",
  "Reserved for something quotable, eventually.",
];

function placeholderQuoteFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_QUOTES[hash % PLACEHOLDER_QUOTES.length];
}

// Editorial card for a confirmed Meet the Team member — same photo-left/
// text-right, no-card-chrome row as SpeakerCard. Clicking it opens the
// detail view (quote, full bio, LinkedIn, click-to-reveal phone) via the
// shared ProfileModal, same interaction pattern as Speakers.
export default function MemberCard({ person, delay = 0 }) {
  const [open, setOpen] = useState(false);
  const hasPhoto = Boolean(person.photo);
  const roleLabel = person.team ? `${person.role} · ${person.team}` : person.role;
  const bio = person.bio || person.longBio;

  return (
    <>
      <Reveal delay={delay}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group w-full flex items-center gap-4 sm:gap-5 py-4 text-left hover:bg-white/5 transition-colors duration-200 cursor-pointer rounded-lg px-2 -mx-2"
        >
          {hasPhoto ? (
            <img
              src={person.photo}
              alt={`Portrait of ${person.name}`}
              loading="lazy"
              className="w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-xl object-cover shrink-0"
            />
          ) : (
            <div className="w-14 h-14 sm:w-[58px] sm:h-[58px] rounded-xl bg-white/5 border border-white/10 shrink-0" aria-hidden="true" />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-base sm:text-lg truncate">{person.name}</h3>
            <p className="text-tedx-red text-xs font-semibold uppercase tracking-wide mt-0.5 truncate">{roleLabel}</p>
            {bio && <p className="text-white/50 text-sm mt-1 truncate">{bio}</p>}
          </div>
        </button>
      </Reveal>

      <ProfileModal
        isOpen={open}
        onClose={() => setOpen(false)}
        data={{
          name: person.name,
          photo: person.photo,
          roleLabel,
          quote: person.quote || placeholderQuoteFor(person.name),
          bio,
          linkedin: person.linkedin,
          whatsapp: person.whatsapp,
          email: person.email,
          phoneSlug: slugify(person.name),
        }}
      />
    </>
  );
}
