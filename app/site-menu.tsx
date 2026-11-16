"use client";

import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import "./site-menu.css";

const links = [
  ["Inicio", "#inicio"],
  ["Sobre mí", "#sobre-mi"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["Tarifas", "#tarifas"],
];

function MenuIcon() {
  return <span className="site-menu__icon" aria-hidden="true"><i /><i /><i /></span>;
}

export function SiteMenu() {
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);

  function openMenu() {
    dialog.current?.showModal();
    setOpen(true);
  }

  async function closeMenu(href?: string) {
    const menu = dialog.current;
    if (!menu?.open || closing.current) return;

    closing.current = true;
    const stairs = menu.querySelector(".site-menu__stairs");
    const target = href ? document.getElementById(href.slice(1)) : null;

    // Let the columns cover the viewport before moving the page behind them.
    await Promise.allSettled(stairs?.getAnimations({ subtree: true }).map((animation) => animation.finished) ?? []);
    if (target && href) {
      if (location.hash !== href) history.pushState(null, "", href);
      if (href === "#inicio") {
        window.scrollTo({ top: 0, behavior: "instant" });
      } else if (href === "#servicios" && !matchMedia("(prefers-reduced-motion: reduce), (max-height: 499px)").matches) {
        window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top + window.innerHeight * 2, behavior: "instant" });
      } else {
        target.scrollIntoView({ behavior: "instant" });
      }
    }

    menu.setAttribute("data-leaving", "");
    await Promise.allSettled(stairs?.getAnimations({ subtree: true }).map((animation) => animation.finished) ?? []);
    menu.close();
    menu.removeAttribute("data-leaving");
    closing.current = false;
    target?.focus({ preventScroll: true });
  }

  function selectSection(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void closeMenu(href);
  }

  return (
    <>
      <button
        type="button"
        className="site-menu__button"
        aria-label="Abrir menú"
        aria-haspopup="dialog"
        aria-controls="site-menu"
        aria-expanded={open}
        onClick={openMenu}
      >
        <MenuIcon />
      </button>
      <dialog
        id="site-menu"
        ref={dialog}
        className="site-menu"
        aria-label="Menú de navegación"
        onCancel={(event) => {
          event.preventDefault();
          void closeMenu();
        }}
        onClose={() => setOpen(false)}
      >
        <div className="site-menu__stairs" aria-hidden="true">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} style={{ "--step": index } as CSSProperties} />
          ))}
        </div>
        <button
          type="button"
          className="site-menu__button site-menu__button--close"
          aria-label="Cerrar menú"
          onClick={() => void closeMenu()}
        >
          <MenuIcon />
        </button>
        <nav className="site-menu__nav" aria-label="Navegación principal">
          {links.map(([label, href], index) => (
            <a key={href} href={href} style={{ "--step": index } as CSSProperties} onClick={(event) => selectSection(event, href)}>
              <span>{label}</span>
            </a>
          ))}
        </nav>
        <div className="site-pointer-trail" aria-hidden="true" />
      </dialog>
    </>
  );
}
