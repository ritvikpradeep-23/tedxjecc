import { createClient } from "@libsql/client";

// Falls back to a local SQLite file when Turso env vars aren't set, so local
// dev works with zero setup. Production must set TURSO_DATABASE_URL /
// TURSO_AUTH_TOKEN — Vercel serverless functions can't persist a local file
// across invocations.
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

let ready;

async function addColumnIfMissing(table, column, definition) {
  try {
    await client.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (err) {
    if (!/duplicate column name/i.test(err.message)) throw err;
  }
}

async function migrate() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT NOT NULL,
      team TEXT NOT NULL,
      why TEXT NOT NULL,
      portfolio TEXT,
      shortlisted INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  await client.execute(`
    CREATE TABLE IF NOT EXISTS ticket_orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_name TEXT NOT NULL,
      email TEXT NOT NULL,
      tier TEXT NOT NULL,
      price TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  // Added for the expanded application form — idempotent so redeploys
  // against an existing database don't error on already-added columns.
  await addColumnIfMissing("applications", "availability", "TEXT");
  await addColumnIfMissing("applications", "prior_experience", "TEXT");
  await addColumnIfMissing("applications", "preferred_position", "TEXT");
  await addColumnIfMissing("applications", "tedx_experience", "TEXT");
  await addColumnIfMissing("applications", "scenario_response", "TEXT");
  await addColumnIfMissing("applications", "social_handle", "TEXT");
  await addColumnIfMissing("applications", "tools_experience", "TEXT");
  await addColumnIfMissing("applications", "spreadsheet_experience", "TEXT");
  await addColumnIfMissing("applications", "reference_name", "TEXT");
  await addColumnIfMissing("applications", "reference_contact", "TEXT");

  // Added for payment-verified ticketing (registration -> proof upload ->
  // admin approval -> QR ticket -> door check-in). `uuid` is generated at
  // registration time; readers must still gate on status === 'approved'
  // before treating a ticket as valid — see api/tickets/[uuid].js.
  await addColumnIfMissing("ticket_orders", "uuid", "TEXT");
  await addColumnIfMissing("ticket_orders", "status", "TEXT NOT NULL DEFAULT 'pending'");
  await addColumnIfMissing("ticket_orders", "payment_screenshot_url", "TEXT");
  await addColumnIfMissing("ticket_orders", "transaction_ref", "TEXT");
  await addColumnIfMissing("ticket_orders", "checked_in_at", "TEXT");
  await addColumnIfMissing("ticket_orders", "is_test", "INTEGER NOT NULL DEFAULT 0");
  await client.execute(
    "CREATE UNIQUE INDEX IF NOT EXISTS idx_ticket_orders_uuid ON ticket_orders(uuid)"
  );
}

export async function getDb() {
  if (!ready) ready = migrate();
  await ready;
  return client;
}
