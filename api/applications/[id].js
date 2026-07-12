import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

export default async function handler(req, res) {
  try {
    if (!isAuthenticated(req)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { id } = req.query;
    const db = await getDb();

    if (req.method === "PATCH") {
      const { shortlisted } = req.body || {};
      await db.execute({
        sql: "UPDATE applications SET shortlisted = ? WHERE id = ?",
        args: [shortlisted ? 1 : 0, id],
      });
      res.status(200).json({ ok: true });
      return;
    }

    if (req.method === "DELETE") {
      await db.execute({ sql: "DELETE FROM applications WHERE id = ?", args: [id] });
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
