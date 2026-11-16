"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Point = { x: number; y: number };
type Mark = Point & { born: number; radius: number };
const lifetime = 610;

function circle(x: number, y: number, radius: number) {
  const r = radius.toFixed(1);
  return `M${(x - radius).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${2 * Number(r)} 0a${r} ${r} 0 1 0 ${-2 * Number(r)} 0Z`;
}

export function SitePointerTrail() {
  const ribbon = useRef<SVGPathElement>(null);
  const localRibbon = useRef<SVGUseElement>(null);
  const deviceMask = useRef<SVGPathElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const trace = ribbon.current;
    const localTrace = localRibbon.current;
    const mask = deviceMask.current;
    if (!hero || !trace || !localTrace || !mask) return;

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const surfaces = hero.querySelectorAll<HTMLElement>(".hero-devices__lid, .hero-devices__base, .hero-devices__phone");
    const marks: Mark[] = [];
    let last: Point | undefined;
    let frame = 0;
    let scrollQuietAt = 0;

    function draw(time: number) {
      frame = 0;
      while (marks.length && time - marks[0].born >= lifetime) marks.shift();
      if (motion.matches) {
        marks.length = 0;
        last = undefined;
      }

      trace.setAttribute("d", marks.map((mark) => {
        const age = Math.max(0, (time - mark.born) / lifetime);
        return circle(mark.x, mark.y, mark.radius * Math.pow(1 - age, .68));
      }).join(""));

      if (!marks.length) return;
      updateDeviceMask();
      frame = requestAnimationFrame(draw);
    }

    function updateDeviceMask() {
      if (!hero || !localTrace || !mask) return;
      const origin = hero.getBoundingClientRect();
      if (origin.bottom <= 0 || origin.top >= window.innerHeight || getComputedStyle(hero).visibility === "hidden") return;

      localTrace.setAttribute("transform", `translate(${-origin.left} ${-origin.top})`);
      const boxes: string[] = [];
      surfaces.forEach((surface) => {
        if (surface.classList.contains("hero-devices__phone") && Number(getComputedStyle(surface).opacity) < .35) return;
        const { left, top, width, height } = surface.getBoundingClientRect();
        boxes.push(`M${left - origin.left} ${top - origin.top}h${width}v${height}h${-width}Z`);
      });
      mask.setAttribute("d", boxes.join(""));
    }

    function markRadius() {
      return Math.min(58, Math.max(32, window.innerWidth * .036));
    }

    function stamp(start: Point, end: Point, born: number) {
      const distance = Math.hypot(end.x - start.x, end.y - start.y);
      const steps = Math.min(30, Math.max(1, Math.ceil(distance / 8)));
      const radius = markRadius();

      for (let step = 1; step <= steps; step++) {
        const progress = step / steps;
        marks.push({
          x: start.x + (end.x - start.x) * progress,
          y: start.y + (end.y - start.y) * progress,
          born,
          radius,
        });
      }
      if (marks.length > 160) marks.splice(0, marks.length - 160);
    }

    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || motion.matches || performance.now() < scrollQuietAt) return;
      const point = { x: event.clientX, y: event.clientY };
      const start = last ?? point;
      if (last && Math.hypot(point.x - start.x, point.y - start.y) < 4) return;
      stamp(start, point, performance.now());
      last = point;
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) last = undefined;
    }

    function pauseDuringScroll() {
      scrollQuietAt = performance.now() + 140;
      last = undefined;
      if (!marks.length) return;
      marks.length = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      trace?.setAttribute("d", "");
    }

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("scroll", pauseDuringScroll, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("scroll", pauseDuringScroll, true);
    };
  }, []);

  return (
    <>
      <svg className="mono-hero__clip-defs" width="0" height="0" aria-hidden="true">
        <defs>
          <path id="pointer-trail-shape" ref={ribbon} d="" />
          <clipPath id="site-pointer-trail"><use href="#pointer-trail-shape" /></clipPath>
          <clipPath id="hero-pointer-trail"><use href="#pointer-trail-shape" ref={localRibbon} /></clipPath>
          <clipPath id="hero-pointer-devices"><path ref={deviceMask} d="" /></clipPath>
        </defs>
      </svg>
      <div className="site-pointer-trail" aria-hidden="true" />
    </>
  );
}

export function HeroTrailReveal({ title }: { title: ReactNode }) {
  return (
    <div className="mono-hero__reveal" aria-hidden="true">
      <div className="mono-hero__reveal-devices">
        <div className="mono-hero__title">{title}</div>
      </div>
    </div>
  );
}
