import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de privacidad de Bridge Capital, asesor en inversiones independiente.",
  alternates: { canonical: "/legal/politica-de-privacidad" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
