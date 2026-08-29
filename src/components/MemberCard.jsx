import { slugify } from "../data/siteData";
import PhoneReveal from "./PhoneReveal";
import Reveal from "./Reveal";

// Editorial card for a confirmed Meet the Team member — same photo-left/
// text-right, no-card-chrome layout family as SpeakerCard, but every field
// (bio, LinkedIn, phone) degrades gracefully when it isn't filled in yet:
// no bio line, no LinkedIn link, "No number on file" instead of a phone.
export default function MemberCard({ person, delay = 0 }) {
  const hasPhoto = Boolean(person.photo);
  const roleLabel = person.team ? `${person.role} · ${person.team}` : person.role;
  const bio = person.bio || person.longBio;

  return (
    <Reveal delay={delay}>
      <div className="flex items-start gap-4 sm:gap-5 py-4">
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
          <h3 className="font-display font-bold text-white text-base sm:text-lg">{person.name}</h3>
          <p className="text-tedx-red text-xs font-semibold uppercase tracking-wide mt-0.5">{roleLabel}</p>
          {bio && <p className="text-white/60 text-sm mt-1.5 leading-relaxed">{bio}</p>}
          <div className="flex items-center gap-4 mt-2.5">
            {person.linkedin && (
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-tedx-red text-xs font-semibold uppercase tracking-wide"
              >
                LinkedIn
              </a>
            )}
            <PhoneReveal slug={slugify(person.name)} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
