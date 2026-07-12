import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import ApplicationsTable from "./ApplicationsTable";
import OrdersTable from "./OrdersTable";

export default function AdminApp() {
  const [status, setStatus] = useState("checking"); // checking | loggedOut | loggedIn
  const [applications, setApplications] = useState([]);
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.authenticated) loadData();
        else setStatus("loggedOut");
      })
      .catch(() => setStatus("loggedOut"));
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

  const totalRevenue = orders.reduce((sum, o) => sum + (parseInt(String(o.price).replace(/[^\d]/g, ""), 10) || 0), 0);

  return (
    <div className="min-h-screen bg-tedx-black px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-white text-2xl font-bold">TEDxJECC Admin</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-white/70 text-sm border border-white/20 rounded-lg px-4 py-2 hover:text-tedx-red hover:border-tedx-red/60 transition-colors cursor-pointer"
          >
            Log out
          </button>
        </div>

        <ApplicationsTable
          applications={applications}
          onToggleShortlist={handleToggleShortlist}
          onDelete={handleDeleteApplication}
        />
        <OrdersTable orders={orders} totalRevenue={totalRevenue} onDelete={handleDeleteOrder} />
      </div>
    </div>
  );
}
