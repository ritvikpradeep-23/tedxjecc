import { useEffect } from "react";
import { createPortal } from "react-dom";

// A lean image viewer modeled on ProfileModal's portal/backdrop/Escape
// pattern, written as its own component rather than stretching ProfileModal
// (which is shaped around a person's profile, not a plain image) to fit.
export default function ScreenshotLightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return;
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
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/85" onClick={onClose} aria-hidden="true" />
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/15 flex items-center justify-center text-white/70 hover:text-tedx-red hover:border-tedx-red/60 transition-colors z-10 cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <img
        src={src}
        alt="Payment screenshot, enlarged"
        className="relative max-w-full max-h-[85vh] rounded-lg border border-white/10"
      />
    </div>,
    document.body
  );
}
