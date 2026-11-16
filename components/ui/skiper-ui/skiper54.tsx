import type { CSSProperties } from "react";
import { CornerLink } from "@/app/ui";

export type ServiceSlide = {
  src: string;
  title: string;
  description: string;
  includes?: string[];
};

// Skiper UI 54's clip-path reveal, driven by the page scroll.
export function Skiper54({ slides }: { slides: ServiceSlide[] }) {
  return (
    <div className="services-deck">
      {slides.map((slide, index) => {
        const Heading = index === 0 ? "h2" : "h3";

        return (
          <article
            key={slide.title}
            className="services-deck__card"
            style={{ "--card-index": index } as CSSProperties}
          >
            <img className="services-deck__photo" src={slide.src} alt="" width={724} height={724} />
            <div className="services-deck__copy">
              <Heading>{slide.title}</Heading>
              <p>{slide.description}</p>
              {slide.includes && <ul>{slide.includes.map((item) => <li key={item}>{item}</li>)}</ul>}
              {index === slides.length - 1 && <CornerLink href="#contacto">Cuéntame tu idea</CornerLink>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
