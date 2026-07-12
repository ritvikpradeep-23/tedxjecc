import { useMemo, useState } from "react";

function Th({ label, sortKey, active, dir, onClick }) {
  const isActive = active === sortKey;
  return (
    <th className="px-4 py-3 cursor-pointer select-none whitespace-nowrap" onClick={() => onClick(sortKey)}>
      {label} {isActive ? (dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

function TruncatedCell({ text }) {
  if (!text) return <span className="text-white/30">—</span>;
  return (
    <span className="block max-w-[220px] truncate" title={text}>
      {text}
    </span>
  );
}

export default function ApplicationsTable({ applications, onToggleShortlist, onDelete }) {
  const [teamFilter, setTeamFilter] = useState("All");
  const [sortKey, setSortKey] = useState("created_at");
  const [sortDir, setSortDir] = useState("desc");

  const teams = useMemo(
    () => ["All", ...Array.from(new Set(applications.map((a) => a.team))).sort()],
    [applications]
  );

  const rows = useMemo(() => {
    const filtered = teamFilter === "All" ? applications : applications.filter((a) => a.team === teamFilter);
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [applications, teamFilter, sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const handleDelete = (a) => {
    if (window.confirm("Are you sure you want to delete this response? This cannot be undone.")) {
      onDelete(a.id);
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h2 className="text-white text-lg font-bold">Core Team Applications ({applications.length})</h2>
        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="bg-tedx-charcoal border border-white/15 text-white text-sm rounded-lg px-3 py-2"
        >
          {teams.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-tedx-charcoal text-white/60 uppercase text-xs">
            <tr>
              <Th label="Name" sortKey="name" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Department</th>
              <Th label="Team" sortKey="team" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 whitespace-nowrap">Position</th>
              <th className="px-4 py-3 whitespace-nowrap">Availability</th>
              <th className="px-4 py-3">Why</th>
              <th className="px-4 py-3">Prior Experience</th>
              <th className="px-4 py-3">TEDx Experience</th>
              <th className="px-4 py-3">Scenario Response</th>
              <th className="px-4 py-3 whitespace-nowrap">Social Handle</th>
              <th className="px-4 py-3">Tools Experience</th>
              <th className="px-4 py-3">Spreadsheet Experience</th>
              <th className="px-4 py-3 whitespace-nowrap">Portfolio</th>
              <th className="px-4 py-3 whitespace-nowrap">Reference</th>
              <Th label="Submitted" sortKey="created_at" active={sortKey} dir={sortDir} onClick={toggleSort} />
              <th className="px-4 py-3 whitespace-nowrap">Shortlisted</th>
              <th className="px-4 py-3 whitespace-nowrap">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((a) => (
              <tr key={a.id} className="text-white/80 align-top">
                <td className="px-4 py-3 whitespace-nowrap">{a.name}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.email}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.department}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.team}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.preferred_position || <span className="text-white/30">—</span>}</td>
                <td className="px-4 py-3 whitespace-nowrap">{a.availability || <span className="text-white/30">—</span>}</td>
                <td className="px-4 py-3"><TruncatedCell text={a.why} /></td>
                <td className="px-4 py-3"><TruncatedCell text={a.prior_experience} /></td>
                <td className="px-4 py-3"><TruncatedCell text={a.tedx_experience} /></td>
                <td className="px-4 py-3"><TruncatedCell text={a.scenario_response} /></td>
                <td className="px-4 py-3 whitespace-nowrap">{a.social_handle || <span className="text-white/30">—</span>}</td>
                <td className="px-4 py-3"><TruncatedCell text={a.tools_experience} /></td>
                <td className="px-4 py-3"><TruncatedCell text={a.spreadsheet_experience} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {a.portfolio ? (
                    <a href={a.portfolio} target="_blank" rel="noopener noreferrer" className="text-tedx-red underline">
                      Link
                    </a>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {a.reference_name ? (
                    <span title={a.reference_contact || ""}>{a.reference_name}</span>
                  ) : (
                    <span className="text-white/30">—</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{new Date(a.created_at).toLocaleString()}</td>
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={Boolean(a.shortlisted)}
                    onChange={(e) => onToggleShortlist(a.id, e.target.checked)}
                    className="w-4 h-4 accent-red-600 cursor-pointer"
                    aria-label={`Shortlist ${a.name}`}
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(a)}
                    className="text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wide cursor-pointer"
                    aria-label={`Delete application from ${a.name}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={18} className="px-4 py-6 text-center text-white/40">
                  No applications yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
