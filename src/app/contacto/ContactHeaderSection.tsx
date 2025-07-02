// src/components/contacto/ContactHeaderSection.tsx
import React from "react";
import Image from "next/image"; // Actualizado a next/image

const SHARED_MAX_WIDTH_CLASS = "max-w-screen-xl";
const SHARED_HORIZONTAL_PADDING_CLASSES = "px-4 sm:px-6 lg:px-8";

const CONTENT_PADDING_TOP_CLASS = "pt-32 md:pt-0";

const ContactHeaderSection = () => {
  const backgroundImageFilename = "bridge.jpg";
  const imagePath = `/images/${backgroundImageFilename}`;

  return (
    <section className="-mt-[7rem] relative w-full min-h-[80vh] md:min-h-[100vh] flex flex-col items-center text-center overflow-hidden">
      {/* Capa de Imagen de Fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={imagePath}
          alt="Sala de juntas - Contacto Bridge Capital"
          fill
          style={{ objectFit: "cover" }} // Reemplaza objectFit="cover"
          quality={80}
          priority
          className="blur-sm" // Simplificado de blur-[5px]
        />
      </div>

      {/* --- SOLUCIÓN: Overlay de Gradiente --- */}
      {/* Este gradiente oscurece la parte superior (para la navbar) y se desvanece hacia abajo. */}
      <div className="absolute top-0 left-0 right-0 h-1/3 -z-0 bg-gradient-to-b from-black/10 to-transparent"></div>

      <div
        className={`
          relative mx-auto ${SHARED_MAX_WIDTH_CLASS} ${SHARED_HORIZONTAL_PADDING_CLASSES}
          z-10 flex flex-col justify-center items-center flex-grow 
          w-full 
          ${CONTENT_PADDING_TOP_CLASS} 
          pb-12 md:pb-16 lg:pb-20 
        `}>
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-[900] text-[#1d1d1b] leading-tight drop-shadow-md">
          {/* Añadido drop-shadow para mejorar legibilidad */}
          Suma Nuestra Experiencia a Tu Estrategia Financiera.
        </h1>
      </div>
    </section>
  );
};

export default ContactHeaderSection;
