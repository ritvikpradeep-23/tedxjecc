import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";
import { sendTicketEmail } from "../../lib/email.js";

export default async function handler(req, res) {
  try {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.query;
    const db = await getDb();

    if (req.method === "DELETE") {
      await db.execute({ sql: "DELETE FROM ticket_orders WHERE id = ?", args: [id] });
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "PATCH") {
      const { status, checkedIn } = req.body || {};

      // Manual override for the check-in dashboard — lets an admin correct a
      // missed/mistaken scan by hand. Uses the same datetime('now') format
      // the scanner's own checkin.js writes, so sorting/display never sees
      // two different timestamp shapes.
      if (checkedIn !== undefined) {
        await db.execute({
          sql: checkedIn
            ? "UPDATE ticket_orders SET checked_in_at = datetime('now') WHERE id = ?"
            : "UPDATE ticket_orders SET checked_in_at = NULL WHERE id = ?",
          args: [id],
        });
        res.status(200).json({ ok: true });
        return;
      }

      if (status !== "approved" && status !== "rejected") {
        res.status(400).json({ error: "status must be 'approved' or 'rejected'." });
        return;
      }

      await db.execute({
        sql: "UPDATE ticket_orders SET status = ? WHERE id = ?",
        args: [status, id],
      });

      if (status !== "approved") {
        res.status(200).json({ ok: true, emailSent: false });
        return;
      }

      const result = await db.execute({ sql: "SELECT * FROM ticket_orders WHERE id = ?", args: [id] });
      const order = result.rows[0];
      const emailResult = order ? await sendTicketEmail(order) : { sent: false };
      res.status(200).json({ ok: true, emailSent: emailResult.sent });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
