import { Resend } from "resend";
import { formatPublicTicket } from "./ticketData.js";

const SITE_URL =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://tedxjecc-website.vercel.app");

// Same movie-ticket layout/content/colors as the web ticket page
// (src/ticket/TicketView.jsx), but deliberately simpler CSS: a plain dashed
// border instead of the notch-cutout trick, no flexbox/grid. Email clients
// (Outlook especially) can't be trusted with either — keep this template
// block-and-inline-style only. Don't "fix" it to match the web version.
function buildTicketEmailHtml(ticket) {
  const { event } = ticket;
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px 16px;background:#0d0d0d;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:380px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:20px;">
        <span style="font-size:22px;font-weight:800;color:#ffffff;">TED<span style="color:#e62b1e;">x</span>JEC</span>
        <div style="color:#ffffff;opacity:0.65;font-size:13px;margin-top:4px;">${event.themeName}</div>
      </div>

      <div style="background:#1a1a1a;border:2px solid #e62b1e;border-radius:12px;overflow:hidden;">
        <div style="padding:24px 20px;">
          <div style="color:#e62b1e;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Admit One</div>
          <div style="color:#ffffff;font-size:20px;font-weight:800;margin-top:6px;">${ticket.buyerName}</div>
          <div style="color:#ffffff;opacity:0.6;font-size:13px;margin-top:2px;">${ticket.tier} Ticket</div>

          <div style="margin-top:18px;border-top:1px solid rgba(255,255,255,0.15);padding-top:14px;">
            <div style="color:#ffffff;font-size:14px;"><strong>${event.date}</strong></div>
            <div style="color:#ffffff;opacity:0.7;font-size:13px;margin-top:2px;">${event.time}</div>
            <div style="color:#ffffff;opacity:0.7;font-size:13px;margin-top:2px;">${event.venue}</div>
          </div>
        </div>

        <div style="border-top:2px dashed #e62b1e;"></div>

        <div style="padding:18px 20px;text-align:center;background:#0d0d0d;">
          <img src="${ticket.qrDataUrl}" width="140" height="140" alt="Ticket QR code" style="display:block;margin:0 auto;border:4px solid #ffffff;border-radius:8px;" />
          <div style="color:#ffffff;font-size:11px;letter-spacing:2px;margin-top:10px;">#${ticket.shortId}</div>
          <div style="color:#e62b1e;font-size:11px;font-weight:700;text-transform:uppercase;margin-top:2px;">${ticket.tier}</div>
        </div>
      </div>

      <div style="text-align:center;margin-top:20px;">
        <a href="${SITE_URL}/ticket/${ticket.uuid}" style="color:#e62b1e;font-size:13px;text-decoration:underline;">View your ticket online</a>
      </div>
      <p style="color:#ffffff;opacity:0.4;font-size:11px;text-align:center;margin-top:16px;">
        Show this QR code at check-in. This ticket is valid for one entry.
      </p>
    </div>
  </body>
</html>`;
}

// Never throws — email failure shouldn't block an approval action, which
// has already committed the DB state change by the time this runs. Callers
// surface the boolean so the admin UI can flag "approved, but email failed."
export async function sendTicketEmail(order) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping ticket email send.");
    return { sent: false, reason: "not_configured" };
  }

  try {
    const ticket = await formatPublicTicket(order);
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "TEDxJEC <onboarding@resend.dev>",
      to: order.email,
      subject: `Your TEDxJEC Ticket — ${order.tier}`,
      html: buildTicketEmailHtml(ticket),
    });
    return { sent: true };
  } catch (err) {
    console.error("Ticket email send failed:", err);
    return { sent: false, reason: err.message || "send_failed" };
  }
}
