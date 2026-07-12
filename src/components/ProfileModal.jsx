import { useEffect } from "react";
import { createPortal } from "react-dom";

const ICON_PATHS = {
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  whatsapp:
    "M17.47 14.38c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.32-1.43-.86-.76-1.44-1.7-1.61-1.99-.17-.29-.02-.44.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38 0 1.4 1.02 2.76 1.16 2.95.14.19 2.01 3.07 4.87 4.3.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33zM12.02 2C6.5 2 2.02 6.48 2.02 12c0 1.83.49 3.55 1.34 5.03L2 22l5.11-1.34A9.94 9.94 0 0 0 12.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2z",
  email:
    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
};

function ContactIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-tedx-red hover:border-tedx-red/60 transition-colors duration-200"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={ICON_PATHS[icon]} />
      </svg>
    </a>
  );
}

export default function ProfileModal({ isOpen, data, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${data.name} profile`}
    >
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-[page-fade-in_0.25s_ease]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full sm:max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-tedx-charcoal border border-white/10 shadow-[0_0_60px_rgba(230,43,30,0.18)] animate-[modal-in_0.3s_cubic-bezier(0.16,1,0.3,1)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/15 flex items-center justify-center text-white/70 hover:text-tedx-red hover:border-tedx-red/60 transition-colors z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          <img
            src={data.photo}
            alt={`Portrait of ${data.name}`}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-tedx-red/70"
          />
          <h3 className="heading-lg text-white mt-5">{data.name}</h3>
          {data.roleLabel && (
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest mt-1">
              {data.roleLabel}
            </span>
          )}

          {data.bio && (
            <p className="text-white/65 text-sm sm:text-base mt-5 leading-relaxed max-w-md">{data.bio}</p>
          )}

          {data.talkTitle && (
            <div className="mt-6 w-full rounded-xl bg-tedx-black/50 border border-white/10 p-4 text-left">
              <span className="caption-label">Talk</span>
              <p className="font-display text-lg font-bold text-white mt-1">"{data.talkTitle}"</p>
              {data.talkDescription && (
                <p className="text-white/60 text-sm mt-2 leading-snug">{data.talkDescription}</p>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 mt-7">
            {data.linkedin && (
              <ContactIcon href={data.linkedin} label={`${data.name} on LinkedIn`} icon="linkedin" />
            )}
            {data.whatsapp && (
              <ContactIcon href={data.whatsapp} label={`Message ${data.name} on WhatsApp`} icon="whatsapp" />
            )}
            {data.email && (
              <ContactIcon href={`mailto:${data.email}`} label={`Email ${data.name}`} icon="email" />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
