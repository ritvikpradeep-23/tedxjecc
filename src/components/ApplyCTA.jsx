import { APPLY_FORM_URL } from "../data/siteData";

// Single shared control for every "apply" entry point on the site (each Open
// Roles stub, the "See All Open Roles" button, and the Join Us CTA). Reads
// the one APPLY_FORM_URL config value — when it's unset, every one of these
// renders disabled with a "coming soon" note; the moment it's set, every one
// re-enables and opens the Google Form in a new tab. No per-location wiring.
export default function ApplyCTA({ label = "Apply for this role", size = "sm", className = "" }) {
  const sizeClasses =
    size === "lg"
      ? "text-sm font-semibold tracking-wide uppercase px-8 py-3 rounded-full"
      : "text-sm font-semibold";

  if (!APPLY_FORM_URL) {
    return (
      <span className={`inline-flex flex-col items-end gap-1 ${className}`}>
        <span
          aria-disabled="true"
          className={`inline-flex items-center gap-2 text-white/30 cursor-not-allowed select-none ${
            size === "lg" ? `${sizeClasses} border border-white/15` : sizeClasses
          }`}
        >
          {label} →
        </span>
        <span className="text-white/30 text-[10px] uppercase tracking-wide">Applications opening soon</span>
      </span>
    );
  }

  return (
    <a
      href={APPLY_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-tedx-red hover:text-white transition-colors duration-200 ${
        size === "lg" ? `${sizeClasses} bg-tedx-red text-white border border-tedx-red hover:bg-tedx-red-dark hover:border-tedx-red-dark` : sizeClasses
      } ${className}`}
    >
      {label} →
    </a>
  );
}
