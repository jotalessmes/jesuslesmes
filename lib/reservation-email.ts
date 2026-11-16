import { createHash } from "node:crypto";

const owner = "jesus.lesmes@outlook.com";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

function template(title: string, content: string) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#eee;color:#111;font-family:Arial,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff">
    <tr><td style="background:#111;color:#fff;padding:24px 28px;font-size:14px;letter-spacing:2px">JESÚS LESMES · DISEÑO WEB Y SOFTWARE</td></tr>
    <tr><td style="padding:28px;font-size:16px;line-height:1.6"><h1 style="font-size:30px;line-height:1.1;margin:0 0 20px">${title}</h1>${content}</td></tr>
    </table></td></tr></table></body></html>`;
}

export async function sendReservationEmail(kind: "welcome" | "owner" | "prototype", details: {
  id: string; name: string; company: string; email: string; plan: string; prototype?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATIONS_EMAIL_FROM;
  if (!apiKey || !from) return false;

  const name = escapeHtml(details.name);
  const company = details.company ? ` para <strong>${escapeHtml(details.company)}</strong>` : "";
  const reference = details.id.slice(0, 8).toUpperCase();
  const messages = {
    welcome: ["Hemos recibido tu reserva", `<p>Hola, ${name}.</p><p>He recibido tu solicitud${company} y revisaré los detalles para preparar el siguiente paso. Te escribiré a este correo.</p><p><strong>Plan:</strong> ${escapeHtml(details.plan)}<br><strong>Referencia:</strong> ${reference}</p><p>Gracias,<br>Jesús Lesmes</p>`],
    owner: ["Nueva solicitud de reserva", `<p>${name}${company} ha enviado una solicitud.</p><p><strong>Plan:</strong> ${escapeHtml(details.plan)}<br><strong>Referencia:</strong> ${reference}</p><p>Consulta el formulario completo en el panel privado.</p>`],
    prototype: ["Tu prototipo está listo", `<p>Hola, ${name}.</p><p>Ya puedes revisar el prototipo de tu proyecto${company}.</p><p><a style="display:inline-block;background:#111;color:#fff;padding:12px 18px" href="${escapeHtml(details.prototype ?? "")}">Ver prototipo ↗</a></p><p>Cuéntame qué te parece respondiendo a este correo.</p>`],
  };
  const [subject, content] = messages[kind];
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `${details.id}-${kind}-${createHash("sha256").update(details.prototype ?? "").digest("hex")}`,
      },
      body: JSON.stringify({
        from, to: [kind === "owner" ? owner : details.email],
        reply_to: kind === "owner" ? details.email : owner,
        subject, html: template(subject, content),
      }),
      signal: AbortSignal.timeout(6500),
    });
    if (!response.ok) console.error("Correo de reservas rechazado", kind, response.status);
    return response.ok;
  } catch {
    console.error("No se pudo conectar con el servicio de correo de reservas", kind);
    return false;
  }
}
