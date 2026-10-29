import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marco General de Actuación",
  description:
    "Marco general de actuación de Bridge Capital como asesor en inversiones independiente.",
  alternates: { canonical: "/legal/marco-general-de-actuacion" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
