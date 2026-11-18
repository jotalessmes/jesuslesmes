import { neon } from "@neondatabase/serverless";

let database: ReturnType<typeof initialize> | undefined;

async function initialize() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Configura DATABASE_URL para las reservas.");
  }

  const sql = neon(url);
  await sql.transaction([
    sql`SELECT pg_advisory_xact_lock(16304016)`,
    sql`CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY, created_at BIGINT NOT NULL, name TEXT NOT NULL,
      surname TEXT NOT NULL, email TEXT NOT NULL, company TEXT NOT NULL,
      plan TEXT NOT NULL, domain TEXT NOT NULL, brief TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'waiting', quote INTEGER,
      prototype TEXT NOT NULL DEFAULT '', notes TEXT NOT NULL DEFAULT '',
      owner_mail INTEGER NOT NULL DEFAULT 0, welcome_mail INTEGER NOT NULL DEFAULT 0,
      prototype_sent TEXT NOT NULL DEFAULT ''
    )`,
    sql`CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY, reservation_id TEXT NOT NULL REFERENCES reservations(id),
      amount INTEGER NOT NULL, received_at BIGINT NOT NULL
    )`,
    sql`CREATE TABLE IF NOT EXISTS request_limits (
      bucket TEXT PRIMARY KEY, expires BIGINT NOT NULL, hits INTEGER NOT NULL
    )`,
  ]);
  return sql;
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
  const [, result] = await db.transaction([
    db`DELETE FROM request_limits WHERE expires <= ${now} AND bucket <> ${key}`,
    db`INSERT INTO request_limits VALUES (${key}, ${now + windowMs}, 1)
       ON CONFLICT(bucket) DO UPDATE
       SET hits = CASE WHEN request_limits.expires <= ${now} THEN 1 ELSE request_limits.hits + 1 END,
           expires = CASE WHEN request_limits.expires <= ${now} THEN EXCLUDED.expires ELSE request_limits.expires END
       WHERE request_limits.expires <= ${now} OR request_limits.hits < ${max}
       RETURNING hits`,
  ]);
  return result.length > 0;
}
