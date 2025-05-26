// src/components/servicios/ServicesIntroSection.tsx
import React from 'react';

const ServicesIntroSection = () => {
  console.log("Renderizando ServicesIntroSection");
  return (
    <section className="py-12 md:py-16 bg-gray-50 text-center"> {/* Un fondo ligeramente diferente para distinguirla */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
          Conoce Nuestros Servicios
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          Descubre cómo adaptamos cada servicio para responder precisamente a tus expectativas.
        </p>
        {/* Las tres imágenes que aparecen en el PDF podrían ir aquí o como parte de las secciones de abajo */}
      </div>
    </section>
  );
};

export default ServicesIntroSection;