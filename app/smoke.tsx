"use client";

import { useEffect, useRef } from "react";

type Puff = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  born: number;
  life: number;
  phase: number;
  turn: number;
  stamp: HTMLCanvasElement;
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function makeStamp() {
  const canvas = document.createElement("canvas");
  const size = 96;
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const pixels = ctx.createImageData(size, size);
  const layers = [5, 9, 17].map((side) => ({
    side,
    values: Float32Array.from({ length: side * side }, () => Math.random()),
  }));

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      const radius = Math.hypot((u - .5) * 2, (v - .5) * 2);
      const noise = layers.reduce((sum, { side, values }, i) => {
        const sx = u * (side - 1);
        const sy = v * (side - 1);
        const ix = Math.floor(sx);
        const iy = Math.floor(sy);
        const tx = sx - ix;
        const ty = sy - iy;
        const blend = (t: number) => t * t * (3 - 2 * t);
        return sum + mix(
          mix(values[iy * side + ix], values[iy * side + ix + 1], blend(tx)),
          mix(values[(iy + 1) * side + ix], values[(iy + 1) * side + ix + 1], blend(tx)),
          blend(ty),
        ) * [0.55, 0.29, 0.16][i];
      }, 0);
      const opacity = Math.pow(Math.max(0, 1 - radius), 1.25) *
        Math.pow(Math.max(0, (noise - .2) / .8), 1.45) * 1.5;
      pixels.data.set([158, 204, 187, Math.min(255, opacity * 255)], (y * size + x) * 4);
    }
  }

  ctx.putImageData(pixels, 0, 0);
  return canvas;
}

export function Smoke() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stamps: HTMLCanvasElement[] = [];
    const puffs: Puff[] = [];
    let w = 0, h = 0, scale = 1, frame = 0, lastTime = 0;
    let previous: { x: number; y: number } | undefined;
    let targetX = 0, targetY = 0, x = 0, y = 0;

    function resize() {
      w = hero!.clientWidth;
      h = hero!.clientHeight;
      scale = Math.min(1.5, window.devicePixelRatio || 1);
      canvas!.width = Math.round(w * scale);
      canvas!.height = Math.round(h * scale);
      ctx!.setTransform(scale, 0, 0, scale, 0, 0);
      previous = undefined;
      puffs.length = 0;
    }

    function draw(time: number) {
      const dt = lastTime ? Math.min((time - lastTime) / 16.67, 2.5) : 1;
      lastTime = time;
      ctx!.clearRect(0, 0, w, h);
      for (let i = puffs.length - 1; i >= 0; i--) {
        const puff = puffs[i];
        const age = (time - puff.born) / puff.life;
        if (age >= 1) {
          puffs.splice(i, 1);
          continue;
        }
        const angle = puff.phase + age * 5;
        puff.x += (puff.vx * (1 - age) + Math.cos(angle) * 1.1) * dt;
        puff.y += (puff.vy * (1 - age) + Math.sin(angle) * 1.1 - .4) * dt;
        const size = puff.size * (0.85 + age * 1.7);
        ctx!.save();
        ctx!.translate(puff.x, puff.y);
        ctx!.rotate(puff.phase + puff.turn * age);
        ctx!.globalAlpha = Math.min(1, Math.max(0, age) * 19) * Math.pow(1 - Math.max(0, age), 1.65) * .68;
        ctx!.drawImage(puff.stamp, -size * .5, -size * .4, size, size * .8);
        ctx!.restore();
      }
      const damping = 1 - Math.pow(.89, dt);
      x = mix(x, targetX, damping);
      y = mix(y, targetY, damping);
      hero!.style.setProperty("--portrait-x", x * 18 + "px");
      hero!.style.setProperty("--portrait-y", y * 12 + "px");
      hero!.style.setProperty("--portrait-turn", x * 9 + "deg");
      frame = 0;
      if (puffs.length || Math.abs(x - targetX) + Math.abs(y - targetY) > .002) requestDraw();
      else lastTime = 0;
    }

    function requestDraw() {
      if (!frame) {

        frame = requestAnimationFrame(draw);
      }
    }

    function move(event: PointerEvent) {
      if (preference.matches || event.pointerType === "touch") return;
      if (!stamps.length) stamps = Array.from({ length: 7 }, makeStamp);
      const rect = hero!.getBoundingClientRect();
      const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      targetX = (point.x / w - .5) * 2;
      targetY = (point.y / h - .5) * 2;
      const start = previous ?? point;
      const dx = point.x - start.x;
      const dy = point.y - start.y;
      const distance = Math.hypot(dx, dy);

      if (!previous || distance >= 4) {
        const count = Math.min(18, Math.max(1, Math.ceil(distance / 11)));
        const now = performance.now();
        for (let i = 1; i <= count; i++) {
          const fraction = i / count;
          puffs.push({
            x: mix(start.x, point.x, fraction) + random(-12, 12),
            y: mix(start.y, point.y, fraction) + random(-12, 12),
            vx: random(-1.4, 1.4) + dx / Math.max(distance, 8) * 1.8,
            vy: random(-1.4, .7) + dy / Math.max(distance, 8) * 1.8,
            size: random(58, 130),
            born: now,
            life: random(780, 1550),
            phase: random(0, Math.PI * 2),
            turn: random(-2.1, 2.1),
            stamp: stamps[Math.floor(Math.random() * stamps.length)],
          });
        }
        if (puffs.length > 200) puffs.splice(0, puffs.length - 200);
        previous = point;
      }
      requestDraw();
    }

    function leave() {
      previous = undefined;
      targetX = targetY = 0;
      if (!preference.matches) requestDraw();
    }

    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = undefined;
      puffs.length = 0;
      ctx!.clearRect(0, 0, w, h);
      x = y = targetX = targetY = 0;
      for (const property of ["--portrait-x", "--portrait-y", "--portrait-turn"]) {
        hero!.style.removeProperty(property);
      }
    }

    const observer = new ResizeObserver(resize);
    resize();
    observer.observe(hero);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    preference.addEventListener("change", reset);
    return () => {
      reset();
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      preference.removeEventListener("change", reset);
    };
  }, []);

  return <canvas ref={ref} className="hero__smoke" aria-hidden="true" />;
}


