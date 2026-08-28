import { useEffect, useRef, useState } from "react";
import AdminLogin from "./AdminLogin";
import ApplicationsTable from "./ApplicationsTable";
import PendingTicketsTable from "./PendingTicketsTable";
import OrdersTable from "./OrdersTable";
import { ticketTiers } from "../data/siteData";

const POLL_INTERVAL_MS = 12000;

export default function AdminApp() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn
  const [applications, setApplications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [testTier, setTestTier] = useState(ticketTiers[0]?.id || "");
  const [testTicketUrl, setTestTicketUrl] = useState(null);
  const [generatingTest, setGeneratingTest] = useState(false);
  const [reviewNotice, setReviewNotice] = useState(null); // { type: 'error'|'success', text }
  const statusRef = useRef(status);
  statusRef.current = status;

  const loadData = async () => {
    try {
      const [appsRes, ordersRes] = await Promise.all([
        fetch("/api/applications", { credentials: "include" }),
        fetch("/api/orders", { credentials: "include" }),
      ]);
      if (appsRes.status === 401 || ordersRes.status === 401) {
        setStatus("loggedOut");
        return;
      }
      const appsData = await appsRes.json();
      const ordersData = await ordersRes.json();
      setApplications(appsData.applications || []);
      setOrders(ordersData.orders || []);
      setStatus("loggedIn");
    } catch {
      setStatus("loggedOut");
    }
  };

  // Refetches orders only (lighter than loadData) so the "Checked In" column
  // updates live as volunteers scan people in at the door, without the
  // admin needing to manually refresh. Paused while the tab isn't visible.
  const pollOrders = async () => {
    if (statusRef.current !== "loggedIn" || document.visibilityState !== "visible") return;
    try {
      const res = await fetch("/api/orders", { credentials: "include" });
      if (res.status === 401) {
        setStatus("loggedOut");
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
    } catch {
      // Transient network hiccup — next poll will retry, no need to surface.
    }
  };

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) loadData();
        else setStatus("loggedOut");
      })
      .catch(() => setStatus("loggedOut"));
  }, []);

  useEffect(() => {
    const interval = setInterval(pollOrders, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const handleToggleShortlist = async (id, shortlisted) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, shortlisted: shortlisted ? 1 : 0 } : a)));
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ shortlisted }),
    });
  };

  const handleDeleteApplication = async (id) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    await fetch(`/api/applications/${id}`, { method: "DELETE", credentials: "include" });
  };

  const handleDeleteOrder = async (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    await fetch(`/api/orders/${id}`, { method: "DELETE", credentials: "include" });
  };

  const handleReviewOrder = async (id, reviewStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: reviewStatus } : o)));
    setReviewNotice(null);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: reviewStatus }),
      });
      const data = await res.json().catch(() => ({}));
      if (reviewStatus === "approved") {
        setReviewNotice(
          data.emailSent
            ? { type: "success", text: "Approved — ticket email sent." }
            : { type: "error", text: "Approved, but the ticket email failed to send. Check Resend setup, then resend manually if needed." }
        );
      }
    } catch {
      if (reviewStatus === "approved") {
        setReviewNotice({ type: "error", text: "Approved, but couldn't confirm whether the email sent — check your connection." });
      }
    }
    loadData();
  };

  const handleGenerateTestTicket = async () => {
    const tier = ticketTiers.find((t) => t.id === testTier);
    if (!tier) return;
    setGeneratingTest(true);
    setTestTicketUrl(null);
    try {
      const res = await fetch("/api/orders/test-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tier: tier.name, price: tier.price }),
      });
      const data = await res.json();
      if (res.ok) {
        setTestTicketUrl(data.ticketUrl);
        loadData();
      }
    } finally {
      setGeneratingTest(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setStatus("loggedOut");
    setApplications([]);
    setOrders([]);
  };

  if (status === "checking") {
    return <div className="min-h-screen bg-tedx-black text-white/60 flex items-center justify-center">Loading…</div>;
  }

  if (status === "loggedOut") {
    return <AdminLogin onSuccess={loadData} />;
  }

  const pendingOrders = orders.filter((o) => o.status === "pending" || !o.status);
  const realOrders = orders.filter((o) => !o.is_test);
  const totalRevenue = realOrders.reduce(
    (sum, o) => sum + (parseInt(String(o.price).replace(/[^\d]/g, ""), 10) || 0),
    0
  );

  return (
    <div className="min-h-screen bg-tedx-black px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white text-2xl font-bold">TEDxJEC Admin</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-white/70 text-sm border border-white/20 rounded-lg px-4 py-2 hover:text-tedx-red hover:border-tedx-red/60 transition-colors cursor-pointer"
          >
            Log out
          </button>
        </div>

        <section className="mb-16 bg-tedx-charcoal border border-white/10 rounded-lg p-5">
          <h2 className="text-white text-sm font-bold uppercase tracking-wide mb-3">Test the check-in scanner</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={testTier}
              onChange={(e) => setTestTier(e.target.value)}
              className="bg-tedx-black border border-white/15 text-white text-sm rounded-lg px-3 py-2"
            >
              {ticketTiers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={handleGenerateTestTicket}
              disabled={generatingTest}
              className="bg-tedx-red text-white text-xs font-semibold uppercase tracking-wide rounded-lg px-4 py-2 disabled:opacity-50 cursor-pointer"
            >
              {generatingTest ? "Generating…" : "Generate Test Ticket"}
            </button>
            {testTicketUrl && (
              <a
                href={testTicketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tedx-red text-sm underline break-all"
              >
                Open test ticket → {window.location.origin}{testTicketUrl}
              </a>
            )}
          </div>
        </section>

        {reviewNotice && (
          <div
            className={`mb-6 rounded-lg border p-4 text-sm flex items-center justify-between gap-4 ${
              reviewNotice.type === "error"
                ? "bg-red-500/10 border-red-500/40 text-red-300"
                : "bg-tedx-red/10 border-tedx-red/40 text-white"
            }`}
          >
            <span>{reviewNotice.text}</span>
            <button
              type="button"
              onClick={() => setReviewNotice(null)}
              className="text-white/50 hover:text-white cursor-pointer shrink-0"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        <PendingTicketsTable orders={pendingOrders} onReview={handleReviewOrder} />

        <ApplicationsTable
          applications={applications}
          onToggleShortlist={handleToggleShortlist}
          onDelete={handleDeleteApplication}
        />
        <OrdersTable
          orders={orders}
          totalRevenue={totalRevenue}
          onDelete={handleDeleteOrder}
          onResendEmail={(id) => handleReviewOrder(id, "approved")}
        />
      </div>
    </div>
  );
}
