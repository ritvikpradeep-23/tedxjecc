import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();

    if (req.method === "POST") {
      const { buyerName, email, tier, price } = req.body || {};
      if (!buyerName || !email || !tier || !price) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }
      await db.execute({
        sql: "INSERT INTO ticket_orders (buyer_name, email, tier, price) VALUES (?, ?, ?, ?)",
        args: [buyerName, email, tier, price],
      });
      res.status(201).json({ ok: true });
      return;
    }

    if (req.method === "GET") {
      if (!isAuthenticated(req)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const result = await db.execute("SELECT * FROM ticket_orders ORDER BY created_at DESC");
      res.status(200).json({ orders: result.rows });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
