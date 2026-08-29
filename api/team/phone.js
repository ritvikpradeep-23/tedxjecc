import { getPhoneForSlug } from "../../lib/teamContacts.js";

// Public, no auth — this is what the "Show number" click on a Meet the Team
// card calls. The point isn't to gate it behind a login (it's a public
// team-directory number), just to keep it out of the page's raw HTML/JS so
// it isn't harvested by a plain scraper that never runs JS or clicks
// anything. Returns 404 rather than an empty string when nothing's on file,
// so the button can show "No number on file" instead of a blank reveal.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  if (!id) {
    res.status(400).json({ error: "id is required." });
    return;
  }

  const phone = getPhoneForSlug(id);
  if (!phone) {
    res.status(404).json({ error: "No number on file." });
    return;
  }

  res.status(200).json({ phone });
}
