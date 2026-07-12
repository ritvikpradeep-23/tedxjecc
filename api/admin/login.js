import { createSessionCookie } from "../../lib/auth.js";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    if (!process.env.ADMIN_PASSWORD) {
      res.status(500).json({ error: "Admin password is not configured on the server." });
      return;
    }

    const { password } = req.body || {};
    if (password !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ error: "Incorrect password." });
      return;
    }

    res.setHeader("Set-Cookie", createSessionCookie());
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
