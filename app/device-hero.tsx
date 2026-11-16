"use client";

import { useState } from "react";
import { HeroTrailReveal } from "./negative-trail";

function ScreenDesign({ mobile = false }: { mobile?: boolean }) {
  return <span className={mobile ? "device-screen device-screen--mobile" : "device-screen"} />;
}

const title = <><span>Diseño</span><span>web</span></>;

export function DeviceHero() {
  const [pinned, setPinned] = useState(false);

  return (
    <section id="inicio" className="mono-hero" aria-label="Portada" tabIndex={-1}>
      <h1 className="mono-hero__title" aria-label="Diseño web">{title}</h1>
      <button
        type="button"
        className="hero-devices"
        aria-label="Vista del diseño en móvil"
        aria-pressed={pinned}
        onClick={() => setPinned((visible) => !visible)}
      >
        <span className="hero-devices__laptop" aria-hidden="true">
          <span className="hero-devices__lid"><ScreenDesign /></span>
          <span className="hero-devices__base" />
        </span>
        <span className="hero-devices__phone" aria-hidden="true"><ScreenDesign mobile /></span>
      </button>
      <div className="mono-hero__foot">
        <div className="mono-hero__signature">
          <p className="mono-hero__name">Jesús <span>Lesmes</span></p>
          <p>Diseño webs para conseguir clientes y software para simplificar tu trabajo.</p>
        </div>
        <p className="mono-hero__discover">Desliza para descubrir</p>
      </div>
      <HeroTrailReveal title={title} />
    </section>
  );
}
