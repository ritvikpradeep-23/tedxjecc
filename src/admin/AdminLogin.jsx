import { useState } from "react";

export default function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
        setLoading(false);
        return;
      }
      onSuccess();
    } catch {
      setError("Could not reach the server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tedx-black flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-tedx-charcoal border border-white/10 rounded-xl p-8">
        <h1 className="text-white text-xl font-bold mb-1">TEDxJEC Admin</h1>
        <p className="text-white/50 text-sm mb-6">Enter the admin password to continue.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full rounded-lg bg-tedx-black border border-white/15 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:border-tedx-red focus:ring-tedx-red"
        />
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-tedx-red text-white font-semibold py-2.5 text-sm disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Checking…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
