import { qrPngBuffer } from "../../../lib/qr.js";

// Public, no auth, no DB lookup needed — the QR just encodes the UUID
// itself. This exists so the emailed ticket can reference a real hosted
// image URL instead of an inline base64 data URI, which Gmail and other
// clients block/strip in <img src>.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { uuid } = req.query;
  if (!uuid) {
    res.status(400).end();
    return;
  }

  try {
    const buffer = await qrPngBuffer(uuid);
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.status(200).send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message || "Could not generate QR code." });
  }
}
