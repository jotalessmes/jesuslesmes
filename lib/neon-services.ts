import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { createRealtime, rawSql } from "@neon/realtime/server";

export async function reservationFeed() {
  const { DATABASE_URL, NEON_REALTIME_SECRET, NEON_REALTIME_URL } = process.env;
  if (!DATABASE_URL || !NEON_REALTIME_SECRET || !NEON_REALTIME_URL) return undefined;
  const db = decodeURIComponent(new URL(DATABASE_URL).pathname.slice(1));
  const realtime = createRealtime({ db, secret: NEON_REALTIME_SECRET });
  const query = await realtime.seal({
    query: rawSql<{ total: number }>("SELECT count(*)::integer AS total FROM public.reservations"),
  });
  return { query, url: NEON_REALTIME_URL };
}

export async function storageReady() {
  const { AWS_ENDPOINT_URL_S3, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
  if (!AWS_ENDPOINT_URL_S3 || !AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) return false;
  const client = new S3Client({
    endpoint: AWS_ENDPOINT_URL_S3, region: AWS_REGION, forcePathStyle: true,
    credentials: { accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY },
  });
  try {
    await client.send(new ListObjectsV2Command({ Bucket: "assets", MaxKeys: 1 }), { abortSignal: AbortSignal.timeout(6000) });
    return true;
  } finally {
    client.destroy();
  }
}

export async function functionsReady() {
  const { NEON_FUNCTION_HOST_SUFFIX: suffix, NEON_BRANCH_ID: branch } = process.env;
  if (!suffix || !branch) return false;
  const url = new URL(`https://${branch}-hello.${suffix.replace(/^\./, "")}`);
  return (await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(6000) })).ok;
}

export async function availableModels() {
  const { NEON_AI_GATEWAY_BASE_URL, NEON_AI_GATEWAY_TOKEN } = process.env;
  if (!NEON_AI_GATEWAY_BASE_URL || !NEON_AI_GATEWAY_TOKEN) return null;
  const base = NEON_AI_GATEWAY_BASE_URL.replace(/\/$/, "").replace(/\/v1$/, "");
  const response = await fetch(base + "/v1/models", {
    headers: { Authorization: `Bearer ${NEON_AI_GATEWAY_TOKEN}` },
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) throw new Error("Catálogo IA no disponible");
  const body: { data?: unknown[] } = await response.json();
  return body.data?.length ?? 0;
}
