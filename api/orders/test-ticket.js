import crypto from "node:crypto";
import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

// Lets an admin generate one fake, already-approved registration (no
// payment, no upload, no email) so the check-in scanner can be tested end
// to end before any real registrations exist. Flagged is_test=1 so it never
// counts toward revenue and is clearly badged in the admin tables.
export default async function handler(req, res) {
  try {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { tier, price, buyerName } = req.body || {};
    if (!tier || !price) {
      res.status(400).json({ error: "tier and price are required." });
      return;
    }

    const uuid = crypto.randomUUID();
    const stamp = Date.now().toString().slice(-5);
    const name = buyerName?.trim() || `Test Attendee ${stamp}`;

    const db = await getDb();
    await db.execute({
      sql: `INSERT INTO ticket_orders
        (buyer_name, email, tier, price, uuid, status, is_test)
        VALUES (?, ?, ?, ?, ?, 'approved', 1)`,
      args: [name, `test-${stamp}@example.com`, tier, price, uuid],
    });

    res.status(201).json({ ok: true, uuid, ticketUrl: `/ticket/${uuid}` });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
