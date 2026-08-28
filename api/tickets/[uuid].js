import { getDb } from "../../lib/db.js";
import { formatPublicTicket } from "../../lib/ticketData.js";

// Public, no auth — this is the link people open from their ticket email.
// Never returns email, payment_screenshot_url, the internal numeric id, or
// is_test. A pending/rejected order returns only its status, no ticket data
// — the leak-prevention gate lives here, not just at check-in.
export default async function handler(req, res) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { uuid } = req.query;
    const db = await getDb();
    const result = await db.execute({
      sql: "SELECT * FROM ticket_orders WHERE uuid = ?",
      args: [uuid],
    });
    const order = result.rows[0];

    if (!order) {
      res.status(404).json({ error: "Ticket not found." });
      return;
    }

    if (order.status !== "approved") {
      res.status(200).json({ status: order.status });
      return;
    }

    const ticket = await formatPublicTicket(order);
    res.status(200).json({ status: "approved", ticket });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
