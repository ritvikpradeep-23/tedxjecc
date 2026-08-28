import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

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

    const { uuid } = req.body || {};
    if (!uuid) {
      res.status(200).json({ result: "invalid" });
      return;
    }

    const db = await getDb();
    const result = await db.execute({
      sql: "SELECT * FROM ticket_orders WHERE uuid = ?",
      args: [uuid],
    });
    const order = result.rows[0];

    // Gate on status, not mere existence — a pending/rejected order's QR
    // (which was never actually emailed, since only approvals get one) must
    // never scan as valid.
    if (!order || order.status !== "approved") {
      res.status(200).json({ result: "invalid" });
      return;
    }

    if (order.checked_in_at) {
      res.status(200).json({ result: "duplicate", checkedInAt: order.checked_in_at });
      return;
    }

    await db.execute({
      sql: "UPDATE ticket_orders SET checked_in_at = datetime('now') WHERE uuid = ?",
      args: [uuid],
    });
    res.status(200).json({ result: "success", buyerName: order.buyer_name, tier: order.tier });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
