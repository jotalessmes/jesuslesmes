import "./pricing-section.css";

const plans = [
  {number:"01", slug:"esencial", name:"Landing\nEsencial", tag:"PARA EMPEZAR", price:"150 €", note:"pago único · desde", intro:"Tu negocio online, claro y preparado para recibir consultas.", features:["Una página con hasta 5 secciones", "Diseño adaptado a móvil", "Formulario o enlace a WhatsApp", "SEO técnico básico y publicación", "Una ronda de cambios"]},
  {number:"02", slug:"avanzada", name:"Landing\nAvanzada", tag:"PARA IR MÁS ALLÁ", price:"300 €", note:"pago único · desde", intro:"Una experiencia con más contenido e interacciones para tu marca.", features:["Una página con hasta 8 secciones", "Diseño personalizado y animaciones", "Formulario e integración acordada", "SEO técnico básico y analítica", "Dos rondas de cambios"]},
  {number:"03", slug:"software", name:"Software\na medida", tag:"PARA TU FORMA DE TRABAJAR", price:"A medida", note:"presupuesto personalizado", intro:"Una herramienta adaptada a los procesos de tu negocio.", features:["Definición de necesidades y alcance", "Diseño de la interfaz", "Funciones e integraciones acordadas", "Pruebas y publicación", "Entrega por fases según proyecto"]},
];
export function PricingSection() {
 return <section id="tarifas" className="pricing" aria-labelledby="pricing-title" tabIndex={-1}>
  <div className="pricing__head"><div><p>UNA INVERSIÓN EN TU IDEA / 03 OPCIONES</p><h2 id="pricing-title">Tarifas<span>.</span></h2></div><p>Elige el punto de partida.<br/>Construyamos algo que funcione. ↘</p></div>
  <div className="pricing__cards">{plans.map(plan=><article key={plan.number} className={plan.number === "02" ? "pricing-card pricing-card--featured" : "pricing-card"}><div className="pricing-card__top"><span>{plan.number} / {plan.tag}</span><span>{plan.number === "02" ? "DESTACADA ✦" : "↗"}</span></div><h3>{plan.name.split("\n").map((line,index)=><span key={line}>{index>0&&<br/>}{line}</span>)}</h3><p className="pricing-card__intro">{plan.intro}</p><div className="pricing-card__price"><strong>{plan.price}</strong><span>{plan.note}</span></div><ul>{plan.features.map(item=><li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul><a className="pricing-card__action booking-button" href="#reserva" data-reservation-plan={plan.slug}>Realizar reserva <span aria-hidden="true">↗</span></a></article>)}</div>
  <p className="pricing__note">Precios orientativos sujetos al alcance acordado. Dominio, alojamiento, servicios de terceros y mantenimiento se presupuestan aparte. Impuestos aplicables según presupuesto. Textos e imágenes facilitados por el cliente.</p>
 </section>;
}
