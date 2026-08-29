import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { eventInfo, ticketTiers } from "../data/siteData";
import Button from "./Button";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { compressImage } from "../utils/compressImage";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Union of every tier's perks, in first-seen order — stays in sync
// automatically if perks ever change, no hardcoded feature list to drift.
const FEATURES = ticketTiers.reduce((list, tier) => {
  tier.perks.forEach((perk) => {
    if (!list.includes(perk)) list.push(perk);
  });
  return list;
}, []);

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-tedx-red" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ComparisonTable() {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 sm:gap-x-8 mb-10">
      <div />
      {ticketTiers.map((tier) => (
        <div key={tier.id} className="text-center min-w-[76px]">
          <p className="font-display font-bold text-white text-sm sm:text-base">{tier.name}</p>
          <p className="text-tedx-red font-black text-lg sm:text-2xl mt-0.5">{tier.price}</p>
        </div>
      ))}
      {FEATURES.map((feature) => (
        <FeatureRow key={feature} feature={feature} />
      ))}
    </div>
  );
}

function FeatureRow({ feature }) {
  return (
    <>
      <p className="text-white/70 text-sm py-3 border-t border-white/10">{feature}</p>
      {ticketTiers.map((tier) => (
        <div key={tier.id} className="flex justify-center items-center py-3 border-t border-white/10">
          {tier.perks.includes(feature) ? <CheckIcon /> : <span className="text-white/25">—</span>}
        </div>
      ))}
    </>
  );
}

function priceDigits(price) {
  return (price.match(/\d+/g) || []).join("");
}

function PaymentQr({ tier }) {
  const [qrSrc, setQrSrc] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const upiLink = `upi://pay?pa=${encodeURIComponent(eventInfo.upiId)}&pn=${encodeURIComponent(
      eventInfo.name
    )}&am=${encodeURIComponent(priceDigits(tier.price))}&cu=INR&tn=${encodeURIComponent(
      `Ticket-${tier.name}`
    )}`;
    QRCode.toDataURL(upiLink, { margin: 1, width: 220, color: { dark: "#0d0d0d", light: "#ffffff" } })
      .then((src) => !cancelled && setQrSrc(src))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [tier]);

  if (!qrSrc) {
    return <div className="w-40 h-40 rounded-lg bg-white/10 animate-pulse" />;
  }
  return <img src={qrSrc} alt="UPI payment QR code" width={160} height={160} className="rounded-lg border-4 border-white" />;
}

// The registration flow itself — name/email, then UPI QR + screenshot
// upload, then a pending-verification message. Logic is unchanged from
// before this restyle: same fields, same /api/orders call, same validation.
function TicketFlow({ tier, onCancel }) {
  const [stage, setStage] = useState("form"); // form | payment | pending
  const [buyer, setBuyer] = useState({ name: "", email: "" });
  const [screenshot, setScreenshot] = useState(null); // { file, previewUrl }
  const [fieldError, setFieldError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleNameEmailNext = (e) => {
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
    setStage("payment");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshot({ file, previewUrl: URL.createObjectURL(file) });
    setFieldError("");
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    if (!screenshot) {
      setFieldError("Please attach a screenshot of your payment.");
      return;
    }
    setFieldError("");
    setSubmitting(true);
    try {
      const screenshotBase64 = await compressImage(screenshot.file);
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: buyer.name,
          email: buyer.email,
          tier: tier.name,
          price: tier.price,
          screenshotBase64,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      setStage("pending");
    } catch (err) {
      setFieldError(err.message || "Something went wrong submitting your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {stage === "pending" && (
        <div className="rounded-lg bg-tedx-red/10 border border-tedx-red/40 text-white text-sm text-center py-4 px-4">
          Your ticket is pending verification — you'll receive your digital ticket by email once confirmed.
        </div>
      )}

      {stage === "form" && (
        <form onSubmit={handleNameEmailNext} className="flex flex-col gap-3">
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
          <div className="flex gap-2">
            <Button type="submit" variant={tier.recommended ? "primary" : "secondary"} className="flex-1">
              Continue to Payment
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel} className="!px-5">
              Cancel
            </Button>
          </div>
        </form>
      )}

      {stage === "payment" && (
        <form onSubmit={handleSubmitPayment} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3 rounded-lg bg-tedx-black border border-white/10 p-4 text-center">
            <PaymentQr tier={tier} />
            <p className="text-white/70 text-xs">
              Scan to pay <span className="text-white font-bold">{tier.price}</span> via UPI
            </p>
            <p className="text-white/40 text-[11px] break-all">{eventInfo.upiId}</p>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-white/60 mb-2 block" htmlFor={`screenshot-${tier.id}`}>
              Upload payment screenshot
            </label>
            <input
              id={`screenshot-${tier.id}`}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-xs text-white/70 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-tedx-red file:text-white file:text-xs file:font-semibold file:uppercase file:cursor-pointer cursor-pointer"
            />
            {screenshot && (
              <img
                src={screenshot.previewUrl}
                alt="Payment screenshot preview"
                className="mt-3 max-h-32 rounded-lg border border-white/15 mx-auto"
              />
            )}
          </div>

          {fieldError && (
            <p className="text-red-400 text-xs" role="alert">
              {fieldError}
            </p>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              variant={tier.recommended ? "primary" : "secondary"}
              disabled={submitting}
              className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit for Verification"}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setStage("form")} className="!px-5">
              Back
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function Tickets() {
  const [activeTierId, setActiveTierId] = useState(null);
  const activeTier = ticketTiers.find((t) => t.id === activeTierId) || null;

  return (
    <Section id="tickets" tone="charcoal" container="narrow">
      <SectionHeading
        eyebrow="Get In"
        title="Tickets"
        subtitle="Simple pricing. One unforgettable day of ideas."
      />

      <ComparisonTable />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        {ticketTiers.map((tier) => (
          <Button
            key={tier.id}
            type="button"
            variant={tier.recommended ? "primary" : "secondary"}
            onClick={() => setActiveTierId(tier.id)}
          >
            Register — {tier.name}
          </Button>
        ))}
      </div>

      {activeTier && (
        <Reveal className="mt-10 max-w-md mx-auto">
          <TicketFlow key={activeTier.id} tier={activeTier} onCancel={() => setActiveTierId(null)} />
        </Reveal>
      )}

      <Reveal className="text-center mt-10">
        <p className="text-white/55 text-sm">Only 100–120 seats available</p>
      </Reveal>
    </Section>
  );
}
