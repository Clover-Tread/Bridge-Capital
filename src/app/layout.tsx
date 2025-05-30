import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CookieConsent from "@/app/components/CookieConsent";

// Configura Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Bridge Capital",
  description: "Tu socio independiente para alcanzar metas financieras.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable}`}>
      <body className={`font-sans flex flex-col min-h-screen`}>
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
