// src/components/filosofia/PhilosophyIntroSection.tsx
import React from 'react';
import Image from 'next/image';

// Clases compartidas para la alineación del ancho con el Navbar
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl"; // Usa la misma que en tu Navbar
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

// --- ¡¡CRUCIAL!! ESTA ES LA CLASE DE PADDING-TOP ---
// Debe ser igual o ligeramente mayor que la altura total de tu Navbar flotante.
// USA EL MISMO VALOR QUE TE FUNCIONÓ BIEN EN HeroSection.tsx DE LA PÁGINA DE INICIO.
const CONTENT_PADDING_TOP_CLASS = 'pt-32'; // EJEMPLO, AJUSTA ESTE VALOR

const PhilosophyIntroSection = () => { // CAMBIA ESTO AL NOMBRE DE TU IMAGEN    // Asumiendo que está en public/images/
  const gradientStyle = 'linear-gradient(to bottom, rgba(217,217,217,1) 0%, rgba(217,217,217,0.7) 100%)'; // #D9D9D9 100% a 70%

  return (
    // 1. La sección ocupa min-h-screen. Su fondo (imagen + gradiente) será visible detrás del Navbar.
    <section 
      className="relative w-full min-h-screen flex flex-col items-center text-center overflow-hidden mt-[-7rem]"
      //  justify-center (opcional, si el contenido interno no usa flex-grow o es más corto que la sección)
    >
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/filosofia-inversion-hero-bg.jpg"
          alt="Filosofía de Inversión Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={75}
          priority 
        />
      </div>

      {/* Capa de Gradiente Overlay */}
      <div 
        className="absolute inset-0 z-0" // Encima de la imagen, debajo del texto
        style={{ background: gradientStyle }}
      />
      
      {/* Contenedor para el contenido de texto */}
      <div 
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS} {/* Padding superior para que el contenido quede debajo del Navbar */}
          pb-12 md:pb-16 lg:pb-20 {/* Padding inferior para el contenido */}
        `}
        // - z-10: Para estar encima del gradiente.
        // - flex-grow, justify-center, items-center: Ayudan a centrar el contenido dentro del espacio.
      >
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-[900] text-(--color-primary) leading-tight">
          {/* Texto oscuro para contrastar con el fondo gris claro del gradiente */}
          LO QUE HACEMOS
          <br className="hidden md:block" /> 
          ES FÁCIL DE ENTENDER.
          <br className="hidden md:block" /> 
          <span className="block text-2xl sm:text-3xl md:text-4xl font-[600] mt-1 md:mt-2">
            pero es difícil de ejecutar
          </span>
        </h1>
        {/* Si hubiera más contenido en esta sección introductoria (además del título), iría aquí */}
      </div>
    </section>
  );
};

export default PhilosophyIntroSection;