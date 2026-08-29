import { useEffect, useMemo, useState } from "react";
import AdminLogin from "../admin/AdminLogin";

const POLL_INTERVAL_MS = 1000;

function Th({ label, sortKey, active, dir, onClick }) {
  const isActive = active === sortKey;
  return (
    <th className="px-4 py-3 cursor-pointer select-none whitespace-nowrap" onClick={() => onClick(sortKey)}>
      {label} {isActive ? (dir === "asc" ? "▲" : "▼") : ""}
    </th>
  );
}

function Dashboard({ onSessionExpired }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all | checked_in | not_checked_in
  const [sortKey, setSortKey] = useState("buyer_name");
  const [sortDir, setSortDir] = useState("asc");
  const [togglingId, setTogglingId] = useState(null);

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders", { credentials: "include" });
      if (res.status === 401) {
        onSessionExpired();
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      // Transient hiccup — next poll retries, no need to surface.
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") loadOrders();
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const attendees = useMemo(() => orders.filter((o) => o.status === "approved"), [orders]);
  const checkedInCount = useMemo(() => attendees.filter((o) => o.checked_in_at).length, [attendees]);

  const rows = useMemo(() => {
    let filtered = attendees;
    if (filter === "checked_in") {
      filtered = filtered.filter((o) => o.checked_in_at);
    } else if (filter === "not_checked_in") {
      filtered = filtered.filter((o) => !o.checked_in_at);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter((o) => o.buyer_name.toLowerCase().includes(q));
    }
    return [...filtered].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [attendees, filter, search, sortKey, sortDir]);

  const handleToggleCheckedIn = async (order) => {
    setTogglingId(order.id);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ checkedIn: !order.checked_in_at }),
      });
      if (res.status === 401) {
        onSessionExpired();
        return;
      }
      await loadOrders();
    } finally {
      setTogglingId(null);
    }
  };

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="min-h-screen bg-tedx-black px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-white text-xl font-bold">TEDx JEC Check-In Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Updates automatically as people are scanned in.</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-tedx-red leading-none">
              {checkedInCount} <span className="text-white/40 text-2xl font-bold">/ {attendees.length}</span>
            </p>
            <p className="text-white/50 text-xs uppercase tracking-wide mt-1">Checked In</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name…"
            className="flex-1 min-w-[200px] rounded-lg bg-tedx-charcoal border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:border-tedx-red focus:ring-tedx-red"
          />
          <div className="flex rounded-lg border border-white/15 overflow-hidden">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide cursor-pointer ${
                filter === "all" ? "bg-tedx-red text-white" : "bg-tedx-charcoal text-white/60 hover:text-white"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("checked_in")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide cursor-pointer ${
                filter === "checked_in" ? "bg-tedx-red text-white" : "bg-tedx-charcoal text-white/60 hover:text-white"
              }`}
            >
              Checked In
            </button>
            <button
              type="button"
              onClick={() => setFilter("not_checked_in")}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wide cursor-pointer ${
                filter === "not_checked_in" ? "bg-tedx-red text-white" : "bg-tedx-charcoal text-white/60 hover:text-white"
              }`}
            >
              Not Yet Checked In
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-tedx-charcoal text-white/60 uppercase text-xs">
              <tr>
                <Th label="Name" sortKey="buyer_name" active={sortKey} dir={sortDir} onClick={toggleSort} />
                <Th label="Tier" sortKey="tier" active={sortKey} dir={sortDir} onClick={toggleSort} />
                <Th label="Checked In" sortKey="checked_in_at" active={sortKey} dir={sortDir} onClick={toggleSort} />
                <th className="px-4 py-3 whitespace-nowrap">Check-In Time</th>
                <th className="px-4 py-3 whitespace-nowrap">Manual Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((o) => (
                <tr key={o.id} className="text-white/80">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {o.buyer_name}
                    {Boolean(o.is_test) && <span className="text-white/30 text-xs"> · TEST</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{o.tier}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {o.checked_in_at ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-tedx-red/15 text-tedx-red">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/10 text-white/50">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/60">
                    {o.checked_in_at ? new Date(o.checked_in_at).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleToggleCheckedIn(o)}
                      disabled={togglingId === o.id}
                      className="text-xs font-semibold uppercase tracking-wide rounded-lg border border-white/20 px-3 py-1.5 text-white/70 hover:text-white hover:border-white/50 disabled:opacity-40 cursor-pointer"
                    >
                      {togglingId === o.id ? "…" : o.checked_in_at ? "Undo Check-In" : "Mark Checked In"}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/40">
                    No attendees match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn

  useEffect(() => {
    document.title = "TEDx JEC Check-In Dashboard";
  }, []);

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setStatus(data.authenticated ? "loggedIn" : "loggedOut"))
      .catch(() => setStatus("loggedOut"));
  }, []);

  if (status === "checking") {
    return <div className="min-h-screen bg-tedx-black text-white/60 flex items-center justify-center">Loading…</div>;
  }

  if (status === "loggedOut") {
    return <AdminLogin onSuccess={() => setStatus("loggedIn")} />;
  }

  return <Dashboard onSessionExpired={() => setStatus("loggedOut")} />;
}
