import { useEffect, useState } from "react";

// Perforation row with semi-circle "die-cut" notches bitten out of the
// card's left/right edges — two solid circles matching the page background,
// positioned to straddle the card border. Only reliable in a real browser
// (this is why the emailed version uses a plain dashed border instead).
function Perforation() {
  return (
    <div className="relative py-1" aria-hidden="true">
      <div className="border-t-2 border-dashed border-tedx-red mx-5" />
      <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-tedx-black" />
      <div className="absolute -right-[14px] top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-tedx-black" />
    </div>
  );
}

function TicketStub({ ticket }) {
  const { event } = ticket;
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <span className="font-display text-2xl font-bold text-white">
          TED<span className="text-tedx-red">x</span>JEC
        </span>
        <p className="text-white/60 text-sm mt-1">{event.themeName}</p>
      </div>

      <div className="relative overflow-visible rounded-2xl bg-tedx-charcoal border-2 border-tedx-red shadow-[0_0_50px_rgba(230,43,30,0.15)]">
        <div className="p-6">
          <span className="text-tedx-red text-[11px] font-bold uppercase tracking-widest">Admit One</span>
          <h1 className="font-display text-2xl font-bold text-white mt-1">{ticket.buyerName}</h1>
          <p className="text-white/60 text-sm mt-0.5">{ticket.tier} Ticket</p>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-1">
            <p className="text-white font-semibold text-sm">{event.date}</p>
            <p className="text-white/70 text-sm">{event.time}</p>
            <p className="text-white/70 text-sm">{event.venue}</p>
          </div>

          {ticket.checkedIn && (
            <div className="mt-4 rounded-lg bg-tedx-red/10 border border-tedx-red/40 text-tedx-red text-xs font-semibold uppercase tracking-wide text-center py-2">
              Checked In
            </div>
          )}
        </div>

        <Perforation />

        <div className="p-6 flex flex-col items-center text-center bg-tedx-black rounded-b-2xl">
          <img
            src={ticket.qrDataUrl}
            alt="Ticket QR code"
            width={160}
            height={160}
            className="rounded-lg border-4 border-white"
          />
          <p className="text-white/70 text-xs tracking-[0.2em] mt-3">#{ticket.shortId}</p>
          <p className="text-tedx-red text-xs font-bold uppercase tracking-wide mt-1">{ticket.tier}</p>
        </div>
      </div>

      <p className="text-white/40 text-xs text-center mt-6">
        Show this QR code at check-in. This ticket is valid for one entry.
      </p>
    </div>
  );
}

function StatusMessage({ title, body }) {
  return (
    <div className="w-full max-w-sm mx-auto text-center">
      <span className="font-display text-2xl font-bold text-white">
        TED<span className="text-tedx-red">x</span>JEC
      </span>
      <div className="mt-8 rounded-2xl bg-tedx-charcoal border border-white/10 p-8">
        <h1 className="text-white text-lg font-bold">{title}</h1>
        <p className="text-white/60 text-sm mt-2">{body}</p>
      </div>
    </div>
  );
}

export default function TicketView({ uuid }) {
  const [state, setState] = useState({ loading: true, status: null, ticket: null, error: false });

  useEffect(() => {
    fetch(`/api/tickets/${uuid}`)
      .then(async (res) => {
        if (res.status === 404) {
          setState({ loading: false, status: "not_found", ticket: null, error: false });
          return;
        }
        const data = await res.json();
        setState({ loading: false, status: data.status, ticket: data.ticket || null, error: false });
      })
      .catch(() => setState({ loading: false, status: null, ticket: null, error: true }));
  }, [uuid]);

  return (
    <div className="min-h-screen bg-tedx-black flex items-center justify-center px-6 py-16">
      {state.loading && <p className="text-white/50 text-sm">Loading your ticket…</p>}

      {!state.loading && state.error && (
        <StatusMessage title="Something went wrong" body="Please try refreshing the page." />
      )}

      {!state.loading && !state.error && state.status === "not_found" && (
        <StatusMessage title="Ticket not found" body="Double-check the link you were sent." />
      )}

      {!state.loading && !state.error && state.status === "pending" && (
        <StatusMessage
          title="Still pending verification"
          body="Your payment hasn't been confirmed yet — you'll get this ticket by email once it's approved."
        />
      )}

      {!state.loading && !state.error && state.status === "rejected" && (
        <StatusMessage
          title="Registration not approved"
          body="This registration wasn't approved. Contact the organizers if you think this is a mistake."
        />
      )}

      {!state.loading && !state.error && state.status === "approved" && state.ticket && (
        <TicketStub ticket={state.ticket} />
      )}
    </div>
  );
}
