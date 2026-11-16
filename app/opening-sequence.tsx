"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import "./opening-sequence.css";

export function OpeningSequence() {
  const sequence = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = sequence.current;
    if (!element) return;

    element.toggleAttribute("data-play", !location.hash || location.hash === "#inicio");
    element.setAttribute("data-ready", "");
    const skipOnKeyboardFocus = (event: FocusEvent) => {
      if (event.target instanceof Element && event.target.matches(":focus-visible")) {
        element.removeAttribute("data-play");
      }
    };
    document.addEventListener("focusin", skipOnKeyboardFocus);
    return () => document.removeEventListener("focusin", skipOnKeyboardFocus);
  }, []);

  return (
    <div className="opening-sequence" ref={sequence} aria-hidden="true">
      <div className="opening-sequence__shutter opening-sequence__shutter--top" />
      <div className="opening-sequence__shutter opening-sequence__shutter--bottom" />
      <div className="opening-sequence__identity">
        <span className="opening-sequence__name">
          J<span className="opening-sequence__suffix">esús&nbsp;</span>L<span className="opening-sequence__suffix">esmes</span>
        </span>
        <span className="opening-sequence__label">
          <span>
            {Array.from("Diseño web", (letter, index) => (
              <span key={index} style={{ "--intro-letter": index } as CSSProperties}>{letter}</span>
            ))}
          </span>
        </span>
      </div>
      <span className="opening-sequence__line" />
    </div>
  );
}

