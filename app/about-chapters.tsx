"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { CodeLoop, NeuralNetwork } from "./about-visuals";
import "./about-chapters.css";

const chapters = [
  {
    title: "Jesús Lesmes",
    image: "/hero/jesus.webp",
    alt: "Retrato de Jesús Lesmes",
    description: "Tengo 21 años. Estudio Ingeniería Informática, juego al balonmano y desarrollo webs y software para negocios.",
  },
  {
    title: "Ingeniería e IA",
    Visual: NeuralNetwork,
    description: "Curso cuarto de Ingeniería Informática, con especialidad en Computación e Inteligencia Artificial. Me interesa entender cómo funcionan los sistemas y aplicar lo que aprendo a problemas concretos.",
  },
  {
    title: "Balonmano",
    image: "/hero/jesus-balonmano-composicion.webp",
    alt: "Jesús Lesmes con el balón en dos momentos de un partido de balonmano",
    description: "Juego en el Córdoba de Balonmano. Entrenar y competir me ha enseñado a ser constante y a tomar decisiones en equipo bajo presión.",
  },
  {
    title: "Diseño y software",
    Visual: CodeLoop,
    description: "Diseño landing pages para presentar una oferta y facilitar el contacto. También desarrollo herramientas web a medida para simplificar tareas de un negocio.",
  },
];

function chapterStep(strip: HTMLDivElement) {
  return (strip.scrollWidth - strip.clientWidth) / (chapters.length - 1);
}

function layoutRoute(rail: HTMLDivElement, svg: SVGSVGElement, path: SVGPathElement) {
  const origin = rail.getBoundingClientRect();
  const points = Array.from(rail.querySelectorAll(".about-section__frame"), (frame) => {
    const bounds = frame.getBoundingClientRect();
    return {
      x: bounds.left - origin.left + bounds.width / 2,
      y: bounds.top - origin.top + bounds.height * .74,
    };
  });
  const [first, ...rest] = points;
  if (!first) return;

  let route = `M ${first.x} ${first.y}`;
  let previous = first;
  for (const point of rest) {
    const middle = (previous.x + point.x) / 2;
    route += ` C ${middle} ${previous.y}, ${middle} ${point.y}, ${point.x} ${point.y}`;
    previous = point;
  }
  svg.setAttribute("viewBox", `0 0 ${origin.width} ${origin.height}`);
  path.setAttribute("d", route);
}

export function AboutChapters() {
  const track = useRef<HTMLElement>(null);
  const section = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const route = useRef<SVGSVGElement>(null);
  const line = useRef<SVGPathElement>(null);
  const travel = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const scene = track.current;
    const content = section.current;
    const strip = viewport.current;
    const gallery = rail.current;
    const svg = route.current;
    const path = line.current;
    if (!scene || !content || !strip || !gallery || !svg || !path) return;

    const motion = matchMedia("(prefers-reduced-motion: no-preference)");

    function draw() {
      if (!scene || !strip || !travel.current) return;
      const offset = -scene.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1, offset / travel.current));
      strip.scrollLeft = progress * chapterStep(strip) * (chapters.length - 1);
    }

    function measure() {
      if (!scene || !content || !gallery || !svg || !path) return;
      const fits = content.offsetHeight <= window.innerHeight + 2;
      travel.current = motion.matches && fits ? Math.round(window.innerHeight * .57 * (chapters.length - 1)) : 0;
      scene.style.setProperty("--about-travel", `${travel.current}px`);
      scene.toggleAttribute("data-scroll-linked", travel.current > 0);
      layoutRoute(gallery, svg, path);
      draw();
    }

    const resize = new ResizeObserver(measure);
    resize.observe(gallery);
    measure();
    motion.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", draw, { passive: true });
    return () => {
      resize.disconnect();
      motion.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", draw);
    };
  }, []);

  function goTo(index: number) {
    const strip = viewport.current;
    const scene = track.current;
    if (!scene || !strip || index < 0 || index >= chapters.length) return;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (travel.current) {
      const start = window.scrollY + scene.getBoundingClientRect().top;
      const offset = travel.current * index / (chapters.length - 1);
      window.scrollTo({ top: start + offset, behavior });
    } else {
      strip.scrollTo({ left: chapterStep(strip) * index, behavior });
    }
  }

  function updateChapters(strip: HTMLDivElement) {
    const position = strip.scrollLeft / Math.max(1, chapterStep(strip));
    setActive(Math.round(position));
    const progress = Math.max(0, Math.min(1, position / (chapters.length - 1)));
    line.current?.setAttribute("stroke-dashoffset", String(1 - progress));
    rail.current?.querySelectorAll<HTMLElement>(".about-section__panel").forEach((panel, index) => {
      const distance = Math.max(-1, Math.min(1, index - position));
      panel.style.setProperty("--distance", String(distance));
      panel.style.setProperty("--emphasis", String(1 - Math.abs(distance)));
    });
  }

  return (
    <section id="sobre-mi" className="about-track" ref={track} aria-label="Sobre mí" tabIndex={-1}>
      <div className="about-section" ref={section}>
        <div id="about-chapters" className="about-section__viewport" ref={viewport} tabIndex={0}
          role="region" aria-label="Recorrido horizontal por mis facetas" aria-describedby="about-scroll-hint"
          onScroll={({ currentTarget }) => updateChapters(currentTarget)}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return;
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            event.preventDefault();
            goTo(active + (event.key === "ArrowRight" ? 1 : -1));
          }}>
          <div className="about-section__rail" ref={rail} style={{ "--chapter-intervals": chapters.length - 1 } as CSSProperties}>
            <svg className="about-section__route" ref={route} aria-hidden="true">
              <path ref={line} pathLength="1" strokeDasharray="1 1" strokeDashoffset="1" />
            </svg>
            {chapters.map(({ title, image, alt, description, Visual }, index) => (
              <article className="about-section__panel" key={title} data-current={active === index}
                aria-labelledby={`about-chapter-${index}`}>
                <div className="about-section__frame">
                  <div className={Visual ? "about-section__image about-section__image--interactive" : "about-section__image"}>
                    {Visual
                      ? <Visual active={active === index} />
                      : <img src={image} alt={alt} loading="eager" />}
                  </div>
                  <h2 id={`about-chapter-${index}`}>{title}</h2>
                </div>
                <div className="about-section__copy">
                  <p>{description}</p>
                  {index === chapters.length - 1 && (
                    <a className="about-section__link" href="#servicios" tabIndex={active === index ? 0 : -1}>Ver servicios <span aria-hidden="true">↘</span></a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="about-section__hint" id="about-scroll-hint">
          <span className="about-section__hint-vertical">Sigue bajando para ver más ↓</span>
          <span className="about-section__hint-horizontal">Desliza en horizontal ↔</span>
        </p>
      </div>
    </section>
  );
}
