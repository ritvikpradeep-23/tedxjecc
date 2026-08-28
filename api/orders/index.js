import crypto from "node:crypto";
import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";
import { uploadPaymentScreenshot, ScreenshotTooLargeError } from "../../lib/screenshotStorage.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();

    if (req.method === "POST") {
      const { buyerName, email, tier, price, screenshotBase64, transactionRef } = req.body || {};
      if (!buyerName || !email || !tier || !price || !screenshotBase64) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }

      const uuid = crypto.randomUUID();

      let screenshotUrl;
      try {
        screenshotUrl = await uploadPaymentScreenshot(screenshotBase64, uuid);
      } catch (err) {
        if (err instanceof ScreenshotTooLargeError) {
          res.status(400).json({ error: err.message });
          return;
        }
        // A real upload failure (not just a missing local-dev token — that
        // case doesn't throw, see screenshotStorage.js) — never accept an
        // order with no payment proof attached.
        console.error("Screenshot upload failed:", err);
        res.status(500).json({ error: "Could not save your payment screenshot. Please try again." });
        return;
      }

      await db.execute({
        sql: `INSERT INTO ticket_orders
          (buyer_name, email, tier, price, uuid, status, payment_screenshot_url, transaction_ref)
          VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`,
        args: [buyerName, email, tier, price, uuid, screenshotUrl, transactionRef || null],
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
