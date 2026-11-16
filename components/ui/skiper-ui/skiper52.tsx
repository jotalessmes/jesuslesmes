"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

export type ServicePanel = {
  src: string;
  alt: string;
  code: string;
  title: string;
  description: string;
  includes: string[];
};

export function Skiper52({
  images,
  className = "",
}: {
  images: ServicePanel[];
  className?: string;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className={`service-gallery ${className}`} role="list" aria-label="Servicios disponibles">
      {images.map((image, index) => {
        const active = activeImage === index;
        const detailsId = `service-gallery-details-${index}`;

        return (
          <motion.article
            key={image.code}
            role="listitem"
            className="service-gallery__item"
            data-active={active}
            style={{ flexBasis: 0, minWidth: 0 }}
            animate={{ flexGrow: active ? 2.35 : 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            onHoverStart={() => setActiveImage(index)}
            onFocusCapture={() => setActiveImage(index)}
          >
            <img className="service-gallery__image" src={image.src} alt="" aria-hidden="true" />
            <span className="service-gallery__shade" aria-hidden="true" />
            <span className="service-gallery__compact" aria-hidden="true">{image.code}</span>

            <div className="service-gallery__content" id={detailsId}>
              <div className="service-gallery__copy">
                <span className="service-gallery__code">{image.code}</span>
                <h3>{image.title}</h3>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      className="service-gallery__details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.25, delay: reduceMotion ? 0 : 0.08 }}
                    >
                      <p>{image.description}</p>
                      <ul>{image.includes.map((item) => <li key={item}>{item}</li>)}</ul>
                      <a href="#contacto" className="service-gallery__link">Hablemos de tu proyecto <span aria-hidden="true">↗</span></a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              type="button"
              className="service-gallery__toggle"
              aria-label={`${active ? "Detalles abiertos" : "Ver detalles"}: ${image.title}`}
              aria-expanded={active}
              aria-controls={detailsId}
              onClick={() => setActiveImage(index)}
            >
              <span>{active ? "Abierto" : "Ver detalles"}</span>
              <span aria-hidden="true">{active ? "−" : "+"}</span>
            </button>
          </motion.article>
        );
      })}
    </div>
  );
}

/** Skiper 52 — ExpandOnHover, adapted from the Skiper UI registry for service panels. */
