"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import "./services-section.css";

function TransitionStripe({ entrance, progress, index }: { entrance: MotionValue<number>; progress: MotionValue<number>; index: number }) {
 const scaleX = useTransform([entrance, progress], ([enter, exit]: number[]) => {
   const delay = index / 16 * .28;
   const close = Math.min(1, Math.max(0, (enter - delay) / .55));
   const open = Math.min(1, Math.max(0, (exit - .22 - delay * .4) / .13));
   return close * (1 - open);
 });
 return <motion.div className="signature-transition__stripe" style={{scaleX, originX: 0}} />;
}

function LandingDemo() {
  return <div className="demo-frame" aria-label="Demostración animada de una landing page"><div className="demo-bar">● ● ● <span>estudioforma.es</span></div><div className="landing-window"><div className="landing-scroll"><div className="landing-page"><small>ESTUDIO FORMA <span>INTERIORISMO ↗</span></small><h4>Espacios para<br/>vivir mejor.</h4><p>Diseñamos lugares que se sienten como en casa.</p><b>HABLEMOS DE TU PROYECTO ↗</b></div><div className="landing-next"><small>01 / NUESTRO ESTUDIO</small><h4>Cada espacio cuenta una historia.</h4><p>Diseño pensado para las personas.</p></div></div></div><div className="laptop-base"/></div>;
}
function SoftwareDemo() {
  return <div className="software-demo" aria-label="Demostración animada de una aplicación de reservas"><div className="software-bar">● ● ● <span>MI NEGOCIO / RESERVAS</span></div><div className="software-content"><div className="calendar"><small>JUNIO 2026 <span>‹ &nbsp; ›</span></small><div className="calendar-grid">{["L","M","X","J","V","S","D",...Array.from({length:30},(_,i)=>String(i+1))].map((d,i)=><span className={i===19?"selected":""} key={i}>{d}</span>)}</div></div><div className="booking-demo"><small>RESERVA ONLINE</small><h4>Tu próxima cita.</h4><p>Selecciona día y hora</p><div className="demo-time">13 JUN · 10:00</div><div className="demo-confirm">CONFIRMAR RESERVA ↗</div><div className="demo-success">✓ &nbsp; Reserva confirmada</div></div></div></div>;
}
export function ServicesSection() {
 const ref=useRef<HTMLElement>(null); const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:["start start","end end"]});
 const x=useTransform(scrollYProgress,[0.70,0.93],["105%","0%"]);
 const {scrollYProgress: entrance}=useScroll({target:ref,offset:["start start","start -100vh"]});
 const transitionExit=useTransform(scrollYProgress, [0.3125, 1], [0, 1]);
 const signatureOpacity=useTransform([entrance,transitionExit], ([enter, exit]: number[]) => Math.min(1, Math.max(0, (enter - .65) / .25)) * (1 - Math.min(1, Math.max(0, (exit - .12) / .12))));
 const signatureClip=useTransform(entrance,[.65,.97],["inset(0 100% 0 0)","inset(0 0% 0 0)"]);
 const serviceOpacity=useTransform(transitionExit,[.14,.20],[0,1]);
 return <section id="servicios" ref={ref} className="services-section" aria-labelledby="services-title" tabIndex={-1}>
  <div className="services-stage">
   {!reduced && <div className="signature-transition" aria-hidden="true">{Array.from({length:16},(_,i)=><TransitionStripe key={i} index={i} entrance={entrance} progress={transitionExit} />)}<motion.div className="signature-transition__mark" style={{opacity:signatureOpacity}}><motion.span style={{clipPath:signatureClip}}>Jesús Lesmes</motion.span><small>DISEÑO WEB & SOFTWARE</small></motion.div></div>}
   <motion.div className="services-content" style={reduced?undefined:{opacity:serviceOpacity}}><header><h2 id="services-title">Servicios<span>.</span></h2><span>DESLIZA PARA DESCUBRIR &nbsp; ↓</span></header>
   <div className="service-stack">
    <article id="landing-pages" className="service-panel landing-panel"><div className="service-copy"><small>01 / PRESENCIA DIGITAL</small><h3>Landing<br/>pages<span>.</span></h3><p>Una página diseñada para presentar tu negocio, conectar con tus clientes y convertir visitas en oportunidades.</p><div className="service-tags">DISEÑO A MEDIDA · MÓVIL · CONTACTO</div><button disabled>Reservar una llamada ↗</button></div><LandingDemo/></article>
    <motion.article id="software-a-medida" className="service-panel software-panel" style={reduced?undefined:{x}}><div className="service-copy"><small>02 / HERRAMIENTAS A MEDIDA</small><h3>Soluciones<br/>software<span>.</span></h3><p>Aplicaciones adaptadas a tu negocio para gestionar reservas, organizar clientes y automatizar tu trabajo.</p><div className="service-tags">RESERVAS · PANELES · AUTOMATIZACIÓN</div><button disabled>Reservar una llamada ↗</button></div><SoftwareDemo/></motion.article>
   </div></motion.div>
  </div>
 </section>;
}
