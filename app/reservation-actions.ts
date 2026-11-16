"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { plans, statuses, briefFields } from "../lib/reservations";
import { reservationsDb, allowRequest } from "../lib/reservations-db";
import { adminAuthenticated, endSession, passwordMatches, requestKey, startSession } from "../lib/reservations-auth";
import { sendReservationEmail } from "../lib/reservation-email";

const field = (data: FormData, key: string) => String(data.get(key) ?? "").trim();
const emailPattern = /^[a-z0-9._%+\-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i;
type FormResult = { error?: string; reference?: string };

export async function createReservation(_: FormResult, data: FormData): Promise<FormResult> {
  const name = field(data, "name"), surname = field(data, "surname");
  const company = field(data, "company"), email = field(data, "email").toLowerCase();
  const domain = field(data, "domain"), plan = field(data, "plan");
  const brief = Object.fromEntries(briefFields.map(([key]) => [key, field(data, key)]));
  if (field(data, "website_confirmation")) return { error: "No se pudo enviar la solicitud." };
  if (!name || !surname || name.length > 80 || surname.length > 100 || company.length > 150 ||
      email.length > 254 || !emailPattern.test(email) || domain.length > 200 || !Object.hasOwn(plans, plan) ||
      briefFields.some(([key, , max, required]) => brief[key].length > max || (required && !brief[key]))) {
    return { error: "Revisa los campos obligatorios, el correo y el plan." };
  }
  const id = randomUUID();
  try {
    if (!await allowRequest("reservation:" + await requestKey(), 5, 3_600_000)) {
      return { error: "Has enviado varias solicitudes. Inténtalo más tarde." };
    }
    const db = await reservationsDb();
    await db.execute({
      sql: "INSERT INTO reservations (id,created_at,name,surname,email,company,plan,domain,brief) VALUES (?,?,?,?,?,?,?,?,?)",
      args: [id, Date.now(), name, surname, email, company, plan, domain, JSON.stringify(brief)],
    });
  } catch (error) {
    console.error("No se pudo guardar la reserva", error instanceof Error ? error.name : "");
    return { error: "No se ha podido guardar la reserva. Inténtalo más tarde." };
  }
  try { await deliverInitialEmails(id); }
  catch { console.error("No se pudo actualizar el estado de los correos"); }
  revalidatePath("/gestion");
  return { reference: id.slice(0, 8).toUpperCase() };
}

async function deliverInitialEmails(id: string) {
  const db = await reservationsDb();
  const [row] = (await db.execute({ sql: "SELECT * FROM reservations WHERE id = ?", args: [id] })).rows;
  if (!row) return false;
  const details = { id, name: String(row.name), company: String(row.company), email: String(row.email), plan: plans[String(row.plan) as keyof typeof plans] };
  const delivered = await Promise.all((["owner", "welcome"] as const).map(async (kind) => {
    const column = kind === "owner" ? "owner_mail" : "welcome_mail";
    if (row[column]) return true;
    if (!await sendReservationEmail(kind, details)) return false;
    await db.execute({ sql: `UPDATE reservations SET ${column} = 1 WHERE id = ?`, args: [id] });
    return true;
  }));
  return delivered.every(Boolean);
}

export async function login(_: FormResult, data: FormData): Promise<FormResult> {
  try {
    const password = data.get("password");
    if (!await allowRequest("login:" + await requestKey(), 8, 15 * 60_000) ||
        typeof password !== "string" || password.length > 512 || !passwordMatches(password)) {
      return { error: "Acceso incorrecto o demasiados intentos." };
    }
    await startSession();
  } catch {
    return { error: "El panel no está disponible. Revisa su configuración." };
  }
  redirect("/gestion");
}

export async function logout() {
  await endSession();
  redirect("/gestion");
}

function readAmount(value: string) {
  if (!/^\d{1,7}([.,]\d{1,2})?$/.test(value)) return null;
  return Math.round(Number(value.replace(",", ".")) * 100);
}

export async function manageReservation(id: string, _: FormResult, data: FormData): Promise<FormResult> {
  if (!await adminAuthenticated()) return { error: "Vuelve a iniciar sesión." };
  const operation = field(data, "operation");
  try {
    const db = await reservationsDb();
    if (operation === "retry") {
      if (!await deliverInitialEmails(id)) {
        revalidatePath("/gestion");
        return { error: "Quedan correos pendientes. Revisa la configuración del remitente o inténtalo más tarde." };
      }
    } else if (operation === "send") {
      const [row] = (await db.execute({sql: "SELECT * FROM reservations WHERE id = ?", args: [id]})).rows;
      if (!row?.prototype || row.prototype === row.prototype_sent) return { error: "Guarda un enlace nuevo antes de enviarlo." };
      if (!await sendReservationEmail("prototype", { id, name: String(row.name), company: String(row.company), email: String(row.email), plan: "", prototype: String(row.prototype) })) {
        return { error: "No se pudo enviar el correo del prototipo." };
      }
      await db.execute({ sql: "UPDATE reservations SET status = 'sent', prototype_sent = ? WHERE id = ? AND prototype = ?", args: [row.prototype, id, row.prototype] });
    } else if (operation === "payment") {
      const amount = readAmount(field(data, "amount"));
      const requestId = field(data, "payment_id");
      if (!amount || !/^[a-f\d-]{36}$/.test(requestId)) return { error: "Indica un cobro mayor que cero." };
      await db.execute({
        sql: "INSERT INTO payments (id,reservation_id,amount,received_at) VALUES (?,?,?,?) ON CONFLICT(id) DO NOTHING",
        args: [requestId, id, amount, Date.now()],
      });
    } else if (operation === "save" || operation === "move") {
      const status = field(data, "status");
      if (!Object.hasOwn(statuses, status)) return { error: "Estado desconocido." };
      if (operation === "move") {
        await db.execute({ sql: "UPDATE reservations SET status = ? WHERE id = ?", args: [status, id] });
      } else {
        const notes = field(data, "notes"), prototype = field(data, "prototype");
        const rawQuote = field(data, "quote"), quote = rawQuote ? readAmount(rawQuote) : null;
        if (notes.length > 4000 || prototype.length > 1000 || (rawQuote && quote === null)) {
          return { error: "Revisa el presupuesto, las notas y el enlace." };
        }
        if (prototype && URL.parse(prototype)?.protocol !== "https:") return { error: "El prototipo necesita un enlace HTTPS." };
        await db.execute({ sql: "UPDATE reservations SET status=?, quote=?, notes=?, prototype=? WHERE id=?", args: [status, quote, notes, prototype, id] });
      }
    } else {
      return { error: "Acción desconocida." };
    }
    revalidatePath("/gestion");
    return { reference: "Actualizado" };
  } catch {
    return { error: "No se pudo completar la acción. Inténtalo de nuevo." };
  }
}
