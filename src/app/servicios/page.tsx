// src/app/servicios/page.tsx
import React from 'react';
import ServicesIntroSection from '@/app/servicios/ServicesIntroSection'; // Crearemos este componente a continuación
import InvestmentAdvisorySection from './InvestmentAdvisorySection';
import CTASection from './CTASection';

export const metadata = { // Metadata específica para esta página
  title: 'Servicios - Bridge Capital',
  description: 'Descubre cómo adaptamos cada servicio para responder precisamente a tus expectativas.',
};

export default function ServiciosPage() {
  console.log("Renderizando /servicios page"); // Para ver en la terminal del servidor
  return (
    <>
      <ServicesIntroSection />
      <InvestmentAdvisorySection />
      <CTASection />
    </>
  );
}