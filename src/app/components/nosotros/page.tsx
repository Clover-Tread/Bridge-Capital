import React from 'react';
import AboutHeroSection from '@/app/components/nosotros/AboutHeroSection';

export const metadata = {
  title: 'Nosotros - Bridge Capital',
  description: 'Socios estratégicos para tu patrimonio: seguro y en constante crecimiento.',
};

export default function NosotrosPage() {
  return (
    <>
      <AboutHeroSection />
      {/* <StatsSection /> */}
      {/* <CoreValuesSection /> */}
      {/* Más secciones de la página "Nosotros" irán aquí */}
    </>
  );
}