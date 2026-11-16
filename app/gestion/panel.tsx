"use client";

import { useActionState, useState, useTransition } from "react";
import { login, logout, manageReservation } from "../reservation-actions";
import { briefFields, plans, statuses } from "../../lib/reservations";

export type Order = {
  id: string; created_at: number; name: string; surname: string; email: string;
  company: string; domain: string; plan: keyof typeof plans; status: keyof typeof statuses;
  brief: Record<string, string>; quote: number | null; prototype: string; notes: string;
  owner_mail: number; welcome_mail: number; prototype_sent: string;
};
export type Payment = { id: string; reservation_id: string; amount: number; received_at: number };
const dateFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Madrid", year: "numeric", month: "2-digit", day: "2-digit" });
const date = (timestamp: number) => dateFormat.format(timestamp);
const euros = (amount: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount / 100);
const reference = (id: string) => id.slice(0, 8).toUpperCase();

export function AdminLogin() {
  const [state, submit, pending] = useActionState(login, {});
  return <main className="admin-shell admin-login">
    <a href="/">← Volver a la web</a>
    <h1>Gestión privada</h1>
    <form action={submit}>
      <label>Contraseña<input type="password" name="password" required maxLength={512} autoComplete="current-password" /></label>
      {state.error && <p role="alert">{state.error}</p>}
      <button className="booking-button" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
    </form>
  </main>;
}

function OrderDetail({ order, payments }: { order: Order; payments: Payment[] }) {
  const [state, submit, pending] = useActionState<{ error?: string; reference?: string }, FormData>(
    (previous, data) => manageReservation(order.id, previous, data), {},
  );
  return <section className="admin-detail" aria-label="Detalle de la solicitud">
    <h2>{order.name} {order.surname}</h2>
    <dl>
      <dt>Referencia</dt><dd>{reference(order.id)} · {date(order.created_at)}</dd>
      <dt>Correo</dt><dd><a href={`mailto:${order.email}`}>{order.email}</a></dd>
      <dt>Empresa</dt><dd>{order.company || "—"}</dd>
      <dt>Plan solicitado</dt><dd>{plans[order.plan]}</dd>
      <dt>Dominio</dt><dd>{order.domain || "—"}</dd>
      {briefFields.map(([key, label]) => <div key={key}><dt>{label}</dt><dd>{order.brief[key] || "—"}</dd></div>)}
    </dl>
    <form action={submit} className="admin-edit">
      <label>Estado<select name="status" defaultValue={order.status}>
        {Object.entries(statuses).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
      </select></label>
      <label>Presupuesto acordado (€)<input name="quote" inputMode="decimal" defaultValue={order.quote === null ? "" : order.quote / 100} /></label>
      <label>Enlace al prototipo<input name="prototype" type="url" defaultValue={order.prototype} maxLength={1000} /></label>
      <label>Notas privadas<textarea name="notes" rows={3} defaultValue={order.notes} maxLength={4000} /></label>
      <button className="booking-button" name="operation" value="save" disabled={pending}>Guardar cambios</button>
      <button name="operation" value="send" formNoValidate disabled={pending || !order.prototype || order.prototype === order.prototype_sent}>Enviar enlace guardado al cliente</button>
      {order.prototype_sent && <p>Último prototipo enviado: <a href={order.prototype_sent}>{order.prototype_sent}</a></p>}
    </form>
    <div>
      <h3>Cobros registrados · {euros(payments.reduce((sum, item) => sum + item.amount, 0))}</h3>
      {payments.length > 0 && <ul>{payments.map(item => <li key={item.id}>{date(item.received_at)} · {euros(item.amount)}</li>)}</ul>}
      <form action={submit} onSubmit={event => {
        event.currentTarget.querySelector<HTMLInputElement>("[name=payment_id]")!.value = crypto.randomUUID();
      }}>
        <input type="hidden" name="payment_id"  />
        <label>Nuevo cobro (€)<input name="amount" inputMode="decimal" required /></label>
        <button name="operation" value="payment" disabled={pending}>Registrar cobro</button>
      </form>
    </div>
    <form action={submit}>
      <p>Aviso a Jesús: {order.owner_mail ? "enviado" : "pendiente"} · Bienvenida: {order.welcome_mail ? "enviada" : "pendiente"}</p>
      {(!order.owner_mail || !order.welcome_mail) && <button name="operation" value="retry" disabled={pending}>Reintentar correos pendientes</button>}
    </form>
    {state.error && <p role="alert">{state.error}</p>}
    {state.reference && <p role="status">{state.reference}</p>}
  </section>;
}

function Dashboard({ orders, payments }: { orders: Order[]; payments: Payment[] }) {
  const [period, setPeriod] = useState("month");
  const [selectedDate, setSelectedDate] = useState(() => date(Date.now()));
  const [year, month] = selectedDate.split("-").map(Number);
  const count = period === "year" ? 12 : period === "month" ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 24;
  const prefix = selectedDate.slice(0, period === "year" ? 4 : period === "month" ? 7 : 10);
  const recentOrders = orders.filter(order => date(order.created_at).startsWith(prefix));
  const recentPayments = payments.filter(payment => date(payment.received_at).startsWith(prefix));
  const dueByOrder = new Map<string, number>();
  payments.forEach(payment => dueByOrder.set(payment.reservation_id, (dueByOrder.get(payment.reservation_id) ?? 0) + payment.amount));
  const due = orders.reduce((total, order) => total + Math.max(0, (order.quote ?? 0) - (dueByOrder.get(order.id) ?? 0)), 0);
  const bucket = (timestamp: number) => {
    const calendar = date(timestamp);
    if (period === "year") return Number(calendar.slice(5, 7)) - 1;
    if (period === "month") return Number(calendar.slice(8, 10)) - 1;
    return Number(new Intl.DateTimeFormat("es-ES", { timeZone: "Europe/Madrid", hour: "numeric", hourCycle: "h23" }).format(timestamp));
  };
  const groups = Array.from({ length: count }, (_, index) => ({
    orders: recentOrders.filter(order => bucket(order.created_at) === index).length,
    revenue: recentPayments.filter(payment => bucket(payment.received_at) === index).reduce((sum, item) => sum + item.amount, 0),
  }));
  return <section aria-labelledby="dashboard-title">
    <h2 id="dashboard-title">Resumen</h2>
    <div className="admin-controls">
      <label>Periodo<select value={period} onChange={event => setPeriod(event.target.value)}>
        <option value="day">Día</option><option value="month">Mes</option><option value="year">Año</option>
      </select></label>
      <label>Fecha de referencia<input type="date" value={selectedDate} onChange={event => event.target.value && setSelectedDate(event.target.value)} /></label>
    </div>
    <div className="admin-metrics">
      <div>Solicitudes del periodo<strong>{recentOrders.length}</strong></div>
      <div>Cobrado en el periodo<strong>{euros(recentPayments.reduce((sum, item) => sum + item.amount, 0))}</strong></div>
      <div>Pendiente de cobro total<strong>{euros(due)}</strong></div>
    </div>
    {(["orders", "revenue"] as const).map(series => {
      const maximum = Math.max(1, ...groups.map(item => item[series]));
      return <figure className="admin-chart" key={series}>
        <figcaption>{series === "orders" ? "Solicitudes" : "Cobros"} por {period === "year" ? "mes" : period === "month" ? "día" : "hora"}</figcaption>
        <div className="admin-bars">{groups.map((item, index) => {
          const label = `${period === "day" ? index + ":00" : index + 1} · ${series === "orders" ? item[series] : euros(item[series])}`;
          return <div key={index} title={label}><span style={{ height: `${100 * item[series] / maximum}%` }} /><small>{index % (count > 24 ? 3 : count === 24 ? 2 : 1) === 0 ? (period === "day" ? index : index + 1) : ""}</small></div>;
        })}</div>
        <details><summary>Ver datos de la gráfica</summary><ol start={period === "day" ? 0 : 1}>{groups.map((item, index) => <li key={index}>{series === "orders" ? item[series] : euros(item[series])}</li>)}</ol></details>
      </figure>;
    })}
  </section>;
}

export function AdminPanel({ orders, payments }: { orders: Order[]; payments: Payment[] }) {
  const [view, setView] = useState("board");
  const [selected, select] = useState<string>();
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const detail = orders.find(order => order.id === selected);
  const visible = orders.filter(order => `${order.name} ${order.surname} ${order.company} ${order.email} ${reference(order.id)} ${statuses[order.status]}`.toLowerCase().includes(filter.toLowerCase().trim()));

  function move(id: string, status: string) {
    if (pending || !orders.some(order => order.id === id && order.status !== status)) return;
    const data = new FormData();
    data.set("operation", "move");
    data.set("status", status);
    startTransition(async () => {
      const result = await manageReservation(id, {}, data);
      setError(result.error ?? "");
    });
  }

  return <main className="admin-shell">
    <header className="admin-header"><div><a href="/">← Volver a la web</a><h1>Gestión de reservas</h1></div>
      <form action={logout}><button>Cerrar sesión</button></form></header>
    <nav className="admin-controls" aria-label="Vistas de gestión">
      {[["board", "Tablero"], ["list", "Todos los pedidos"], ["dashboard", "Resumen y gráficas"]].map(([key, label]) =>
        <button key={key} aria-pressed={view === key} onClick={() => setView(key)}>{label}</button>)}
    </nav>
    {view === "dashboard" ? <Dashboard orders={orders} payments={payments} /> : <>
      <label>Buscar pedidos<input type="search" value={filter} onChange={event => setFilter(event.target.value)} /></label>
      {error && <p role="alert">{error}</p>}
      {view === "board" ? <div className="admin-board" aria-busy={pending}>
        {Object.entries(statuses).map(([key, label]) => <section key={key} className="admin-column"
          onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); move(event.dataTransfer.getData("text/plain"), key); }}>
          <h2>{label}</h2>
          {visible.filter(order => order.status === key).map(order => <article key={order.id} draggable
            onDragStart={event => event.dataTransfer.setData("text/plain", order.id)}>
            <button onClick={() => select(order.id)}><strong>{order.company || `${order.name} ${order.surname}`}</strong><br />{reference(order.id)} · Ver detalle</button>
            <label>Mover a<select value={order.status} disabled={pending} onChange={event => move(order.id, event.target.value)}>
              {Object.entries(statuses).map(([value, status]) => <option key={value} value={value}>{status}</option>)}
            </select></label>
          </article>)}
        </section>)}
      </div> : <div className="admin-table"><table>
        <thead><tr><th>Referencia</th><th>Cliente</th><th>Plan</th><th>Estado</th><th>Fecha</th></tr></thead>
        <tbody>{visible.map(order => <tr key={order.id}>
          <td><button onClick={() => select(order.id)}>{reference(order.id)} ↗</button></td>
          <td>{order.name} {order.surname}{order.company && ` · ${order.company}`}</td><td>{plans[order.plan]}</td>
          <td>{statuses[order.status]}</td><td>{date(order.created_at)}</td>
        </tr>)}</tbody>
      </table>{!visible.length && <p>No hay pedidos para esta búsqueda.</p>}</div>}
      {detail && <OrderDetail key={detail.id + detail.status + detail.prototype + detail.quote} order={detail} payments={payments.filter(item => item.reservation_id === detail.id)} />}
    </>}
  </main>;
}
