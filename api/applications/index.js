import { getDb } from "../../lib/db.js";
import { isAuthenticated } from "../../lib/auth.js";

export default async function handler(req, res) {
  try {
    const db = await getDb();

    if (req.method === "POST") {
      const {
        name,
        email,
        department,
        team,
        why,
        portfolio,
        availability,
        priorExperience,
        preferredPosition,
        tedxExperience,
        scenarioResponse,
        socialHandle,
        toolsExperience,
        spreadsheetExperience,
        referenceName,
        referenceContact,
      } = req.body || {};

      if (!name || !email || !department || !team || !why || !availability || !preferredPosition || !scenarioResponse) {
        res.status(400).json({ error: "Missing required fields." });
        return;
      }

      await db.execute({
        sql: `INSERT INTO applications (
          name, email, department, team, why, portfolio,
          availability, prior_experience, preferred_position, tedx_experience,
          scenario_response, social_handle, tools_experience, spreadsheet_experience,
          reference_name, reference_contact
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          name,
          email,
          department,
          team,
          why,
          portfolio || null,
          availability,
          priorExperience || null,
          preferredPosition,
          tedxExperience || null,
          scenarioResponse,
          socialHandle || null,
          toolsExperience || null,
          spreadsheetExperience || null,
          referenceName || null,
          referenceContact || null,
        ],
      });
      res.status(201).json({ ok: true });
      return;
    }

    if (req.method === "GET") {
      if (!isAuthenticated(req)) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const result = await db.execute("SELECT * FROM applications ORDER BY created_at DESC");
      res.status(200).json({ applications: result.rows });
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(400).json({ error: err.message || "Invalid request." });
  }
}
