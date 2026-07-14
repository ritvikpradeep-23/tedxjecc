import { useState } from "react";
import { eventInfo, ticketTiers } from "../data/siteData";
import Button from "./Button";
import Card from "./Card";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className="text-tedx-red shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TicketCard({ tier, delay }) {
  const [stage, setStage] = useState("idle"); // idle | form | submitting | done | error
  const [buyer, setBuyer] = useState({ name: "", email: "" });
  const [fieldError, setFieldError] = useState("");

  const mailtoHref = (name) => {
    const subject = encodeURIComponent(`TEDxJEC Ticket Request — ${tier.name}`);
    const body = encodeURIComponent(
      `Hi TEDxJEC team,\n\nI'd like to reserve a ${tier.name} ticket (${tier.price}).\n\nName: ${name}\nDepartment & Year:\nPhone:\n`
    );
    return `mailto:${eventInfo.contactEmail}?subject=${subject}&body=${body}`;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!buyer.name.trim()) {
      setFieldError("Please enter your name.");
      return;
    }
    if (!EMAIL_PATTERN.test(buyer.email)) {
      setFieldError("Enter a valid email address.");
      return;
    }
    setFieldError("");
    setStage("submitting");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerName: buyer.name, email: buyer.email, tier: tier.name, price: tier.price }),
      });
      if (!res.ok) throw new Error("Request failed");
      window.location.href = mailtoHref(buyer.name);
      setStage("done");
    } catch {
      setStage("error");
    }
  };

  return (
    <Reveal delay={delay}>
      <Card accent={tier.recommended} className="relative p-8 flex flex-col h-full">
        {tier.recommended && (
          <span className="absolute -top-3.5 left-8 bg-tedx-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-[0_0_20px_rgba(230,43,30,0.5)]">
            Recommended
          </span>
        )}
        <h3 className="heading-lg text-white">{tier.name}</h3>
        <p className="mt-3 text-4xl font-black text-tedx-red">{tier.price}</p>

        <ul className="mt-6 flex flex-col gap-3 flex-1">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2.5 text-white/75 text-sm">
              <CheckIcon />
              {perk}
            </li>
          ))}
        </ul>

        {stage === "done" && (
          <div className="mt-8 rounded-lg bg-tedx-red/10 border border-tedx-red/40 text-white text-sm text-center py-3 px-4">
            Request started — check your email app to send it!
          </div>
        )}

        {stage === "idle" && (
          <Button
            type="button"
            variant={tier.recommended ? "primary" : "secondary"}
            className="mt-8 w-full"
            onClick={() => setStage("form")}
          >
            Buy Ticket
          </Button>
        )}

        {(stage === "form" || stage === "submitting" || stage === "error") && (
          <form onSubmit={handleConfirm} className="mt-8 flex flex-col gap-3">
            <input
              value={buyer.name}
              onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
              placeholder="Your full name"
              className="w-full rounded-lg bg-tedx-black border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:border-tedx-red focus:ring-tedx-red"
            />
            <input
              type="email"
              value={buyer.email}
              onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-tedx-black border border-white/15 text-white placeholder-white/30 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:border-tedx-red focus:ring-tedx-red"
            />
            {fieldError && (
              <p className="text-red-400 text-xs" role="alert">
                {fieldError}
              </p>
            )}
            {stage === "error" && (
              <p className="text-red-400 text-xs" role="alert">
                Something went wrong saving your order. Please try again.
              </p>
            )}
            <div className="flex gap-2">
              <Button
                type="submit"
                variant={tier.recommended ? "primary" : "secondary"}
                disabled={stage === "submitting"}
                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {stage === "submitting" ? "Confirming…" : "Confirm"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setStage("idle")}
                className="!px-5"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </Card>
    </Reveal>
  );
}

export default function Tickets() {
  return (
    <Section id="tickets" tone="charcoal" container="narrow">
      <SectionHeading
        eyebrow="Get In"
        title="Tickets"
        subtitle="Simple pricing. One unforgettable day of ideas."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {ticketTiers.map((tier, i) => (
          <TicketCard key={tier.id} tier={tier} delay={i * 120} />
        ))}
      </div>

      <Reveal className="text-center mt-10">
        <p className="text-white/55 text-sm">Only 100–120 seats available</p>
      </Reveal>
    </Section>
  );
}
