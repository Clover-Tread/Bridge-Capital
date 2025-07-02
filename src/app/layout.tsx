import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CookieConsent from "@/app/components/CookieConsent";
import CustomCursor from "./CustomCursor";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Bridge Capital",
  description: "Tu socio independiente para alcanzar metas financieras.",
  icons: {
    icon: [
      // Cuando el navegador está en tema "light", mostramos el favicon oscuro:
      {
        url: "/favicon/dark/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/dark/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: dark)",
      },
      // Cuando el navegador está en tema "dark", mostramos el favicon claro:
      {
        url: "/favicon/light/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/light/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
        media: "(prefers-color-scheme: light)",
      },
      // Fallback genérico (si no hay preferencia de color o no soporta la consulta):
      {
        url: "/favicon/light/favicon-32x32.png",
        type: "image/png",
      },
    ],
    apple: [
      // El Apple Touch Icon suele ser estático, pero si deseas invertido también lo puedes hacer:
      {
        url: "/favicon/light/apple-touch-icon-152x152.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  // manifest: '/site.webmanifest', // Si tienes un manifest
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} h-full`}>
      <body className={`font-sans flex flex-col min-h-screen antialiased`}>
        <CustomCursor />
        <Navbar />
        <main className="flex-grow w-full">{children}</main>
        <Footer />
        <CookieConsent
          variant="small" // o "default"
          // demo={true} // Ponlo en true para probarlo incluso si ya aceptaste
          // onAcceptCallback={() => console.log("Cookies aceptadas!")}
          // onDeclineCallback={() => console.log("Cookies declinadas!")}
        />
      </body>
    </html>
  );
}
