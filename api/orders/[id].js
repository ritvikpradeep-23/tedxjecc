import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

export default async function handler(req, res) {
  try {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.method !== "DELETE") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { id } = req.query;
    const db = await getDb();
    await db.execute({ sql: "DELETE FROM ticket_orders WHERE id = ?", args: [id] });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
