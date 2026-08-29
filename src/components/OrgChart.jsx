import { leadership, tier2Teams, tier3Teams } from "../data/siteData";
import Reveal from "./Reveal";

function SeatPill({ label, filled, highlight }) {
  return (
    <div
      className={
        highlight
          ? "rounded-lg border border-tedx-red/40 bg-tedx-red/5 px-3 py-2 flex items-center justify-between gap-3"
          : "px-1"
      }
    >
      <span className={filled ? "text-sm text-white" : "text-sm text-white/35 italic"}>{label}</span>
    </div>
  );
}

// Leadership has no head/member hierarchy in the data — it's three flat
// seats (two Co-Organizers, one Staff Advisor) with equal standing, not one
// head plus reports. Rendered as its own block of highlighted seats rather
// than forcing a head/member split that doesn't reflect how the tier
// actually works.
function LeadershipBlock() {
  return (
    <Reveal className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h4 className="font-display font-bold text-white text-base mb-4">Leadership</h4>
      <div className="flex flex-col gap-2.5">
        {leadership.members.map((person, i) => {
          const filled = person.name !== "TBD";
          return (
            <SeatPill
              key={i}
              highlight
              filled={filled}
              label={filled ? `${person.name} — ${person.role}` : `${person.role} — open`}
            />
          );
        })}
      </div>
    </Reveal>
  );
}

function DepartmentBlock({ team }) {
  const headFilled = team.head.name !== "TBD";

  return (
    <Reveal className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <h4 className="font-display font-bold text-white text-base mb-4">{team.name}</h4>

      <div className="rounded-lg border border-tedx-red/40 bg-tedx-red/5 px-3 py-2 flex items-center justify-between gap-3 mb-3">
        <span className={headFilled ? "text-sm font-semibold text-white" : "text-sm text-white/35 italic"}>
          {headFilled ? team.head.name : "Head — open"}
        </span>
        {headFilled && <span className="text-tedx-red text-[10px] font-bold uppercase tracking-wide shrink-0">Head</span>}
      </div>

      <div className="pl-4 border-l border-white/10 flex flex-col gap-2">
        {team.members.map((member, i) => {
          const filled = member.name !== "TBD";
          return (
            <p key={i} className={filled ? "text-sm text-white/80" : "text-sm text-white/35 italic"}>
              {filled ? member.name : "Member — open"}
            </p>
          );
        })}
      </div>
    </Reveal>
  );
}

// Read-only structural view — no apply actions here, that's what the Open
// Roles stubs in the People tab are for.
export default function OrgChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LeadershipBlock />
      {[...tier2Teams, ...tier3Teams].map((team) => (
        <DepartmentBlock key={team.id} team={team} />
      ))}
    </div>
  );
}
