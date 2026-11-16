import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type LinkProps = { children: ReactNode; href: string; className?: string };

// Skiper UI · Skiper40 / Link000. The CSS underline travels left to right.
export function SkiperLink({ href, children, className = "" }: LinkProps) {
  return <a href={href} className={`skiper-link ${className}`}>{children}</a>;
}

// Vengeance UI · Corner Button, adapted to a navigational anchor.
export function CornerLink({ href, children, className = "" }: LinkProps) {
  return (
    <a href={href} className={`corner-link ${className}`}>
      <span className="corner-marks" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
