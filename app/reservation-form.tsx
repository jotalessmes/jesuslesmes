"use client";

import { useActionState, useEffect, useState } from "react";
import { createReservation } from "./reservation-actions";
import { briefFields, plans } from "../lib/reservations";

export function ReservationForm() {
  const [result, submit, pending] = useActionState(createReservation, {});
  const [plan, setPlan] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const bind = (key: string) => ({
    name: key, value: values[key] ?? "",
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues(previous => ({ ...previous, [key]: event.target.value })),
  });

  useEffect(() => {
    function selectPlan(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest<HTMLElement>("[data-reservation-plan]");
      const selected = link?.dataset.reservationPlan;
      if (selected && Object.hasOwn(plans, selected)) setPlan(selected);
    }
    document.addEventListener("click", selectPlan);
    return () => document.removeEventListener("click", selectPlan);
  }, []);

  if (result.reference) {
    return <div className="booking-confirmation" role="status">
      <h3>Reserva recibida.</h3>
      <p>Tu referencia es <strong>{result.reference}</strong>. Revisaré tu idea y te contactaré por correo.</p>
    </div>;
  }

  return <form className="booking-form" action={submit}>
    <label>Nombre<input {...bind("name")} autoComplete="given-name" required maxLength={80} /></label>
    <label>Apellidos<input {...bind("surname")} autoComplete="family-name" required maxLength={100} /></label>
    <label>Correo electrónico<input {...bind("email")} type="email" autoComplete="email" required maxLength={254} /></label>
    <label>Empresa (opcional)<input {...bind("company")} autoComplete="organization" maxLength={150} /></label>
    <label>Plan<select name="plan" value={plan} onChange={event => setPlan(event.target.value)} required>
      <option value="" disabled>Selecciona un plan</option>
      {Object.entries(plans).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
    </select></label>
    <label>Dominio deseado (opcional)<input {...bind("domain")} placeholder="minegocio.es" maxLength={200} /></label>
    {briefFields.map(([key, label, max, required]) =>
      <label key={key} className={key === "purpose" || key === "problem" || key === "features" ? "booking-wide" : undefined}>
        {label}{!required && " (opcional)"}
        {key === "problem" || key === "features"
          ? <textarea {...bind(key)} rows={3} required={required} maxLength={max} />
          : <input {...bind(key)} required={required} maxLength={max} />}
      </label>
    )}
    <div hidden><label>Dejar vacío<input name="website_confirmation" tabIndex={-1} autoComplete="off" /></label></div>
    <p className="booking-wide booking-privacy">Usaré estos datos para revisar tu solicitud y responderte. La reserva no implica ningún pago.</p>
    {result.error && <p className="booking-wide booking-error" role="alert">{result.error}</p>}
    <button className="booking-button booking-wide" disabled={pending}>{pending ? "Enviando…" : "Enviar reserva ↗"}</button>
  </form>;
}
