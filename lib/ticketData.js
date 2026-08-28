import { eventInfo, eventTheme } from "../src/data/siteData.js";
import { qrDataUrl } from "./qr.js";

// The one place that shapes a DB row into what the public is allowed to see.
// Deliberately excludes email, payment_screenshot_url, the internal numeric
// id, and is_test — api/tickets/[uuid].js and lib/email.js both go through
// this so that contract can't drift between the two.
export async function formatPublicTicket(order) {
  return {
    uuid: order.uuid,
    shortId: order.uuid.slice(0, 8).toUpperCase(),
    buyerName: order.buyer_name,
    tier: order.tier,
    price: order.price,
    checkedIn: Boolean(order.checked_in_at),
    checkedInAt: order.checked_in_at || null,
    qrDataUrl: await qrDataUrl(order.uuid),
    event: {
      name: eventInfo.name,
      themeName: eventTheme.name,
      date: eventInfo.date,
      time: eventInfo.time,
      venue: eventInfo.venue,
    },
  };
}
