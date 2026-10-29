import type { Metadata } from "next";
import { Libre_Caslon_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CookieConsent from "@/app/components/CookieConsent";
// Vercel Analytics and Speed Insights
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const caslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-caslon",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

const SITE_URL = "https://bridgecapital.mx";
const SITE_DESCRIPTION =
  "Asesor en inversiones independiente en CDMX, registrado ante la CNBV y con asesores certificados por la AMIB. Gestión y asesoría de inversiones a largo plazo en empresas rentables.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bridge Capital | Asesor en Inversiones Independiente en CDMX",
    template: "%s | Bridge Capital",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Bridge Capital",
    title: "Bridge Capital | Asesor en Inversiones Independiente",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-bridge-capital.jpg",
        width: 1200,
        height: 630,
        alt: "Bridge Capital — Asesor en Inversiones Independiente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge Capital | Asesor en Inversiones Independiente",
    description: SITE_DESCRIPTION,
    images: ["/images/og-bridge-capital.jpg"],
  },
  robots: { index: true, follow: true },
  // Íconos: Next.js los toma de src/app/favicon.ico, icon.png y apple-icon.png.
};

// Datos estructurados: ayudan a Google a mostrar dirección, teléfono y tipo de negocio.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Bridge Capital",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-bridge-capital.svg`,
  image: `${SITE_URL}/images/og-bridge-capital.jpg`,
  description: SITE_DESCRIPTION,
  telephone: "+52-55-8852-2764",
  email: "contacto@bridgecapital.mx",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Avenida Insurgentes Sur 1431, Piso 10, Col. Insurgentes Mixcoac",
    addressLocality: "Benito Juárez",
    addressRegion: "Ciudad de México",
    postalCode: "03920",
    addressCountry: "MX",
  },
  areaServed: "MX",
  sameAs: [
    "https://mx.linkedin.com/company/bridgecapital-asesoresindependientes",
    "https://www.instagram.com/bridgecapital_mx",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${caslon.variable} h-full`}>
      <body className="font-sans flex flex-col min-h-screen antialiased bg-[var(--color-paper)] text-[var(--color-ink)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
        <CookieConsent />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
