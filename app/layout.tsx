import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource-variable/bitcount-prop-single";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diseño y desarrollo web para negocios",
  description: "Diseño y desarrollo webs a medida para profesionales y pequeños negocios.",
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={GeistSans.variable}>
      <body>{children}</body>
    </html>
  );
}

