import ApplyCTA from "./ApplyCTA";
import Reveal from "./Reveal";

// A dashed-border "ticket stub" for one still-unfilled role — deliberately
// echoing the site's own ticket visual language (see src/ticket/TicketView.jsx's
// Perforation component, same die-cut-notch trick, applied to the left/right
// edges here instead of top/bottom).
export default function OpenRoleStub({ tierLabel, team, role, count, description, delay = 0 }) {
  const title = team ? `${team} — ${role}` : role;

  return (
    <Reveal delay={delay} className="h-full">
      <div className="relative h-full rounded-xl border-2 border-dashed border-white/25 bg-white/[0.03] px-6 py-5">
        <div aria-hidden="true" className="absolute -left-[11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-tedx-black" />
        <div aria-hidden="true" className="absolute -right-[11px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-tedx-black" />

        <span
          className="absolute top-4 right-5 -rotate-6 text-[10px] font-black uppercase tracking-widest text-tedx-red border-2 border-tedx-red rounded px-2 py-0.5 select-none"
          aria-hidden="true"
        >
          Open
        </span>

        <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">{tierLabel}</p>
        <h4 className="font-display font-bold text-white text-base sm:text-lg mt-1.5 pr-14 leading-snug">
          {title}
        </h4>
        {count > 1 && <p className="text-white/40 text-xs mt-0.5">{count} seats open</p>}

        <p className="text-white/60 text-sm mt-3 leading-relaxed">{description}</p>

        <div className="mt-5 flex justify-end">
          <ApplyCTA label="Apply for this role" />
        </div>
      </div>
    </Reveal>
  );
}
