import { ReservationForm } from "./reservation-form";
import "./reservations.css";

export function ReservationSection() {
  return <>
    <section id="reserva" className="booking-section" aria-labelledby="booking-title" tabIndex={-1}>
      <div className="booking-heading">
        <h2 id="booking-title">Realiza tu reserva.</h2>
        <p>Cuéntame qué quieres crear y qué necesita tu negocio. Con estos detalles podré valorar el alcance y plantearte un primer prototipo.</p>
      </div>
      <ReservationForm />
    </section>
    <footer className="booking-footer">
      <p>© {new Date().getFullYear()} Jesús Lesmes</p>
      <p>Diseño web y software a medida</p>
      <a href="#inicio">Volver arriba ↑</a>
    </footer>
  </>;
}
