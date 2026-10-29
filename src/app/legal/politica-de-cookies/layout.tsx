import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Qué cookies usa el sitio de Bridge Capital y cómo puedes administrarlas.",
  alternates: { canonical: "/legal/politica-de-cookies" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
