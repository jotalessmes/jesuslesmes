"use client";

import { useEffect, useState } from "react";
import "./about-visuals.css";

const layers = [
  { x: 42, nodes: [55, 92, 129] },
  { x: 110, nodes: [38, 74, 110, 146] },
  { x: 178, nodes: [64, 120] },
];

const sample = `const web = crearWeb({
  diseño: "a medida",
  objetivo: "captar clientes",
});

publicar(web);`;
const stepDelay = 52;
const writeTime = sample.length * stepDelay;
const eraseStart = writeTime + 1400;
const cycleTime = eraseStart + sample.length * 27 + 450;

export function NeuralNetwork({ active }: { active: boolean }) {
  const [layer, setLayer] = useState(0);
  const [preview, setPreview] = useState<number>();
  const lit = preview ?? layer;

  return (
    <button
      className="about-neural"
      type="button"
      tabIndex={active ? 0 : -1}
      aria-label="Red neuronal interactiva. Pulsa para iluminar la siguiente capa"
      onPointerLeave={() => setPreview(undefined)}
      onClick={() => {
        setPreview(undefined);
        setLayer((current) => (current + 1) % layers.length);
      }}
    >
      <svg viewBox="0 0 220 184" aria-hidden="true">
        {layers.slice(0, -1).map((from, index) => {
          const to = layers[index + 1];
          return from.nodes.flatMap((y) => to.nodes.map((endY) => (
            <line key={`${from.x}-${y}-${endY}`} x1={from.x} y1={y} x2={to.x} y2={endY}
              data-lit={lit === index + 1} />
          )));
        })}
        {layers.map(({ x, nodes }, index) => (
          <g key={x} data-lit={lit === index}>
            {nodes.map((y) => <circle key={y} cx={x} cy={y} r={lit === index ? 7 : 5} />)}
          </g>
        ))}
        {layers.map(({ x }, index) => (
          <rect key={x} x={x - 28} y="22" width="56" height="142" fill="transparent"
            onPointerEnter={() => setPreview(index)} />
        ))}
      </svg>
      <span aria-hidden="true">Explora la red ↗</span>
      <span className="sr-only" aria-live={active ? "polite" : "off"}>{["Entrada", "Capa oculta", "Salida"][layer]}</span>
    </button>
  );
}

export function CodeLoop({ active }: { active: boolean }) {
  const [length, setLength] = useState(sample.length);

  useEffect(() => {
    if (!active) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const start = performance.now();
    const clock = window.setInterval(() => {
      if (motion.matches || document.hidden) {
        setLength(sample.length);
        return;
      }
      const elapsed = (performance.now() - start) % cycleTime;
      const count = elapsed < eraseStart
        ? Math.min(sample.length, Math.floor(elapsed / stepDelay))
        : Math.max(0, sample.length - Math.floor((elapsed - eraseStart) / 27));
      setLength(count);
    }, 35);
    return () => window.clearInterval(clock);
  }, [active]);

  return (
    <div className="about-code" aria-hidden="true">
      <div className="about-code__bar"><span /><span /><span /> <b>web.ts</b></div>
      <pre><code>{sample.slice(0, active ? length : sample.length)}</code><span className="about-code__caret" /></pre>
    </div>
  );
}
