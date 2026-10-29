// src/app/servicios/page.tsx
import React from 'react';
import ServicesIntroSection from '@/app/servicios/ServicesIntroSection'; // Crearemos este componente a continuación
import InvestmentAdvisorySection from './InvestmentAdvisorySection';
import CTASection from './CTASection';

export const metadata = { // Metadata específica para esta página
  title: 'Servicios de Inversión',
  description: 'Descubre cómo adaptamos cada servicio para responder precisamente a tus expectativas.',
  alternates: { canonical: '/servicios' },
};

export default function ServiciosPage() {
  return (
    <>
      <ServicesIntroSection />
      <InvestmentAdvisorySection />
      <CTASection />
    </>
  );
}