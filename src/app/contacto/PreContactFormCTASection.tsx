import React from 'react';
import Image from 'next/image';

// Clases compartidas
const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";


const CONTENT_PADDING_TOP_CLASS = 'pt-16'; // EJEMPLO, AJUSTA ESTE VALOR SI ES NECESARIO

const PreContactFormCTASection = () => {
  const backgroundImageFilename = 'llamando.jpg'; // <-- CAMBIA ESTO AL NOMBRE DE TU IMAGEN
  const imagePath = `/images/${backgroundImageFilename}`;

  // Color #79242F con 80% opacidad
  const overlayColor = 'rgba(121,36,47,0.8)';

  return (
    <section 
      className="relative w-full py-12 md:py-20 text-white overflow-hidden" 
      // El padding vertical (py-*) define la altura de esta sección alrededor del contenido
    >
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 -z-20">
        <Image
          src={imagePath} 
          alt="Fondo Contacto Bridge Capital"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>

      {/* Capa de Overlay de Color */}
      <div 
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Contenedor para el contenido de texto */}
      <div 
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-0 flex flex-col justify-center items-center text-center
          ${CONTENT_PADDING_TOP_CLASS} {/* Solo si es la primera sección bajo el Navbar */}
        `}
      >
        <h2 className="text-3xl leading-tight md:max-w-4xl">
          <span className="text-white font-[800] md:text-6xl">
            ¿No encontraste respuesta a tus dudas?
          </span>
          <br /> 
          <span className="text-white font-[600] inline-block mt-5">
            Ponte en contacto con nosotros.
          </span>
        </h2>
        {/* El subtítulo "Iniciemos una Conversación Estratégica." irá con el formulario */}
      </div>
    </section>
  );
};

export default PreContactFormCTASection;