import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guía de Servicios de Inversión",
  description:
    "Guía de servicios de inversión de Bridge Capital conforme a la regulación de la CNBV.",
  alternates: { canonical: "/legal/guia-de-servicios-de-inversion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
