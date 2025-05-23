// src/app/layout.tsx
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google'; // Importa Montserrat
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Configura Montserrat
const montserrat = Montserrat({
  subsets: ['latin'], // Subconjuntos de caracteres a cargar
  weight: ['300', '400', '500', '600', '700', '800', '900'], // Especifica los grosores que usarás
  display: 'swap', // Estrategia de visualización de la fuente
  variable: '--font-montserrat', // Opcional: Define una variable CSS para la fuente
});

export const metadata: Metadata = {
  title: 'Bridge Capital',
  description: 'Tu socio independiente para alcanzar metas financieras.',
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
          <main className="flex-grow">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}