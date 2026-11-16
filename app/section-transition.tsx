"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function SectionTransition({ children }: { children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = track.current;
    const header = document.querySelector<HTMLElement>(".site-header");
    const services = scene?.querySelector<HTMLElement>(".services-panel");
    const landing = scene?.querySelector<HTMLElement>(".section-transition__landing");
    if (!scene || !header || !services || !landing) return;
    const cards = Array.from(services.querySelectorAll<HTMLElement>(".services-deck__card"));
    scene.style.setProperty("--services-count", String(cards.length));

    const motion = matchMedia("(min-width: 621px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let headerHeight = 0;
    let distance = 0;
    let cardHeight = 1;

    function draw() {
      frame = 0;
      if (!scene!.hasAttribute("data-active")) return;
      const offset = headerHeight - scene!.getBoundingClientRect().top;
      const progress = clamp(offset / Math.max(1, distance));
      const serviceProgress = Math.max(0, (offset - distance) / cardHeight);
      const visibleCard = Math.min(cards.length - 1, Math.round(serviceProgress));
      scene!.style.setProperty("--shrink", String(clamp(progress / .42)));
      scene!.style.setProperty("--slide", String(clamp((progress - .20) / .72)));
      scene!.style.setProperty("--service-progress", String(serviceProgress));
      cards.forEach((card, index) => {
        card.inert = progress < .95 || index !== visibleCard;
      });
    }

    function measure() {
      headerHeight = header!.getBoundingClientRect().height;
      scene!.style.setProperty("--scene-header", headerHeight + "px");
      scene!.toggleAttribute("data-active", motion.matches);
      services!.id = motion.matches ? "" : "servicios";
      landing!.id = motion.matches ? "servicios" : "";
      distance = landing!.getBoundingClientRect().top - scene!.getBoundingClientRect().top;
      cardHeight = Math.max(1, cards[0]?.offsetHeight ?? 1);
      scene!.style.setProperty("--services-step", cardHeight + "px");
      if (!motion.matches) cards.forEach((card) => { card.inert = false; });
      draw();
    }

    function schedule() {
      if (!frame && motion.matches) frame = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    // Resolve a direct link once the sticky layout has been measured.
    if (motion.matches && location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      draw();
    }

    motion.addEventListener("change", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      motion.removeEventListener("change", measure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="section-transition" ref={track}>
      <div className="section-transition__landing" tabIndex={-1} />
      <div className="section-transition__stage">{children}</div>
    </div>
  );
}

