import { createClient } from "@libsql/client";

let database: ReturnType<typeof initialize> | undefined;

async function initialize() {
  const url = process.env.RESERVATIONS_DB_URL;
  if (!url || (process.env.VERCEL && url.startsWith("file:"))) {
    throw new Error("Configura una base de datos persistente para las reservas.");
  }

  const db = createClient({ url, authToken: process.env.RESERVATIONS_DB_TOKEN });
  await db.batch([
    `CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY, created_at INTEGER NOT NULL, name TEXT NOT NULL,
      surname TEXT NOT NULL, email TEXT NOT NULL, company TEXT NOT NULL,
      plan TEXT NOT NULL, domain TEXT NOT NULL, brief TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'waiting', quote INTEGER,
      prototype TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
      owner_mail INTEGER NOT NULL DEFAULT 0, welcome_mail INTEGER NOT NULL DEFAULT 0,
      prototype_sent TEXT NOT NULL DEFAULT ''
    )`,
    `CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY, reservation_id TEXT NOT NULL REFERENCES reservations(id),
      amount INTEGER NOT NULL, received_at INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS request_limits (
      bucket TEXT PRIMARY KEY, expires INTEGER NOT NULL, hits INTEGER NOT NULL
    )`,
  ], "write");
  return db;
}

export function reservationsDb() {
  return database ??= initialize().catch((error) => {
    database = undefined;
    throw error;
  });
}

export async function allowRequest(key: string, max: number, windowMs: number) {
  const db = await reservationsDb();
  const now = Date.now();
  const [, result] = await db.batch([
    { sql: "DELETE FROM request_limits WHERE expires <= ?", args: [now] },
    {
      sql: `INSERT INTO request_limits VALUES (?, ?, 1)
            ON CONFLICT(bucket) DO UPDATE SET hits = hits + 1
            WHERE hits < ? RETURNING hits`,
      args: [key, now + windowMs, max],
    },
  ], "write");
  return result.rows.length > 0;
}
