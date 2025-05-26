// src/app/servicios/page.tsx
import React from 'react';
import ServicesIntroSection from '@/app/components/servicios/ServicesIntroSection'; // Crearemos este componente a continuación

export const metadata = { // Metadata específica para esta página
  title: 'Servicios - Bridge Capital',
  description: 'Descubre cómo adaptamos cada servicio para responder precisamente a tus expectativas.',
};

export default function ServiciosPage() {
  console.log("Renderizando /servicios page"); // Para ver en la terminal del servidor
  return (
    <>
      <ServicesIntroSection />
      {/* Aquí añadiremos más secciones de la página "Servicios" más adelante */}
    </>
  );
}