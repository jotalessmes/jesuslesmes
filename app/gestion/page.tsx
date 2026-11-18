import type { Metadata } from "next";
import { adminAuthenticated } from "../../lib/reservations-auth";
import { reservationsDb } from "../../lib/reservations-db";
import { neonAdminEnabled } from "../../lib/neon-admin-auth";
import { reservationFeed } from "../../lib/neon-services";
import { NeonFeed } from "./neon-feed";
import type { Order, Payment } from "./panel";
import { AdminPanel, AdminLogin } from "./panel";
import "../reservations.css";

export const metadata: Metadata = {
  title: "Gestión de reservas",
  robots: { index: false, follow: false },
};

export default async function ManagementPage() {
  if (!await adminAuthenticated()) return <AdminLogin neonLogin={neonAdminEnabled()} />;
  const db = await reservationsDb();
  const [orders, payments] = await db.transaction([
    db`SELECT * FROM reservations ORDER BY created_at DESC`,
    db`SELECT * FROM payments ORDER BY received_at DESC`,
  ], { isolationLevel: "RepeatableRead", readOnly: true });
  const orderList: Order[] = orders.map(row => ({
    id: String(row.id), created_at: Number(row.created_at),
    name: String(row.name), surname: String(row.surname),
    email: String(row.email), company: String(row.company),
    domain: String(row.domain), plan: row.plan as Order["plan"],
    status: row.status as Order["status"], brief: JSON.parse(String(row.brief)),
    quote: row.quote === null ? null : Number(row.quote),
    prototype: String(row.prototype), notes: String(row.notes),
    owner_mail: Number(row.owner_mail), welcome_mail: Number(row.welcome_mail),
    prototype_sent: String(row.prototype_sent),
  }));
  const paymentList: Payment[] = payments.map(row => ({
    id: String(row.id), reservation_id: String(row.reservation_id),
    amount: Number(row.amount), received_at: Number(row.received_at),
  }));
  const feed = await reservationFeed().catch(() => undefined);
  return <>
    {feed && <NeonFeed feed={feed} total={orderList.length} />}
    <AdminPanel orders={orderList} payments={paymentList} />
  </>;
}
