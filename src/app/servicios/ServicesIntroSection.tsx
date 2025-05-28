import React from 'react';
import Image from 'next/image';

// Estas deben ser las mismas que usas en Navbar.tsx y otras secciones
// para consistencia en el ancho del contenido.
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl"; 
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";


const CONTENT_PADDING_TOP_CLASS = 'pt- 32 md:pt-16';

const ServicesIntroSection = () => {
  const gradientStyle = 'linear-gradient(to bottom, rgba(252,252,252,0) 0%, rgba(252,252,252,1) 100%)';

  return (
    <section 
      className="mt-[-7rem] relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden"
    >
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/servicios-bg.jpg"
          alt="Fondo de la sección de Servicios de Bridge Capital"
          layout="fill"
          objectFit="cover" 
          quality={100} 
          priority
        />
      </div>

      {/* Capa de Gradiente Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ background: gradientStyle }}
      />
      
      {/* Contenedor para el contenido de texto */}
      <div 
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS}
          pb-12 md:pb-16 lg:pb-20
        `}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[900] text-(--color-primary) mb-4">
          {/* Texto oscuro para contrastar con el fondo FCFCFC del gradiente */}
          Conoce Nuestros Servicios
        </h1>
        <p className="text-lg md:text-2xl text-(-color-primary) max-w-3xl mx-auto">
          Descubre cómo adaptamos cada servicio para responder precisamente a tus expectativas.
        </p>
      </div>
    </section>
  );
};

export default ServicesIntroSection;