import { useState } from "react";

// Never renders the number itself until clicked -- it's fetched from
// /api/team/phone on demand, not baked into the page or the JS bundle (see
// lib/teamContacts.js). A plain-text scrape of the page gets nothing; a
// click gets the number.
export default function PhoneReveal({ slug }) {
  const [state, setState] = useState("idle"); // idle | loading | revealed | unavailable
  const [phone, setPhone] = useState("");

  const reveal = async () => {
    setState("loading");
    try {
      const res = await fetch(`/api/team/phone?id=${encodeURIComponent(slug)}`);
      if (!res.ok) {
        setState("unavailable");
        return;
      }
      const data = await res.json();
      setPhone(data.phone);
      setState("revealed");
    } catch {
      setState("unavailable");
    }
  };

  if (state === "revealed") {
    return (
      <a href={`tel:${phone}`} className="text-white/70 text-xs font-semibold uppercase tracking-wide">
        {phone}
      </a>
    );
  }

  if (state === "unavailable") {
    return <span className="text-white/30 text-xs uppercase tracking-wide">No number on file</span>;
  }

  return (
    <button
      type="button"
      onClick={reveal}
      disabled={state === "loading"}
      className="text-white/50 hover:text-tedx-red text-xs font-semibold uppercase tracking-wide cursor-pointer disabled:opacity-50"
    >
      {state === "loading" ? "Loading…" : "Show number"}
    </button>
  );
}
