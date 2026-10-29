import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description:
    "Aviso de privacidad de Bridge Capital: cómo recabamos, usamos y protegemos tus datos personales conforme a la LFPDPPP.",
  alternates: { canonical: "/legal/aviso-de-privacidad" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
